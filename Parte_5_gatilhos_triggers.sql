-- ============================================================
-- PARTE 5: GATILHOS (TRIGGERS)
-- Sistema de Gerenciamento Academico
-- Banco: MySQL
-- ============================================================

USE sistema_gerenciamento_academico;

DELIMITER $$

-- ------------------------------------------------------------
-- Limpeza dos triggers, caso o script seja executado novamente
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_AtualizarStatusAutomaticamente_BI$$
DROP TRIGGER IF EXISTS trg_AtualizarStatusAutomaticamente_BU$$
DROP TRIGGER IF EXISTS trg_AtualizarContagemVagas$$
DROP TRIGGER IF EXISTS trg_AuditoriaAluno$$
DROP TRIGGER IF EXISTS trg_AtualizarHistoricoAutomaticamente$$

DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Alunos_AI$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Alunos_AU$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Alunos_AD$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Matriculas_AI$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Matriculas_AU$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Matriculas_AD$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Turmas_AI$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Turmas_AU$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Turmas_AD$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Disciplinas_AI$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Disciplinas_AU$$
DROP TRIGGER IF EXISTS trg_LogOperacoesGerais_Disciplinas_AD$$

-- ------------------------------------------------------------
-- 5. trg_AtualizarStatusAutomaticamente_BI
-- Tipo: BEFORE INSERT
-- Tabela: Matriculas
-- Regra:
--   Antes de inserir uma matricula com status 'Cursando',
--   verifica se o aluno ja possui 6 disciplinas cursando.
--   Se possuir, registra a tentativa no log e bloqueia a operacao.
-- Observacao:
--   Em bancos transacionais como MySQL/InnoDB, o log inserido antes
--   do SIGNAL pode ser desfeito junto com a operacao bloqueada.
-- ------------------------------------------------------------
CREATE TRIGGER trg_AtualizarStatusAutomaticamente_BI
BEFORE INSERT ON Matriculas
FOR EACH ROW
BEGIN
    DECLARE v_TotalCursando INT DEFAULT 0;

    IF NEW.Status = 'Cursando' THEN
        SELECT COUNT(*)
        INTO v_TotalCursando
        FROM Matriculas
        WHERE ID_Aluno = NEW.ID_Aluno
          AND Status = 'Cursando';

        IF v_TotalCursando >= 6 THEN
            INSERT INTO LogsSistema (
                Usuario,
                Acao,
                TabelaAfetada,
                DataHora,
                Descricao
            )
            VALUES (
                'Sistema',
                'BLOQUEIO_MATRICULA',
                'Matriculas',
                NOW(),
                CONCAT(
                    'Tentativa bloqueada: aluno ID ',
                    NEW.ID_Aluno,
                    ' ja possui 6 disciplinas com status Cursando.'
                )
            );

            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Aluno nao pode cursar mais de 6 disciplinas ao mesmo tempo.';
        END IF;
    END IF;
END$$

-- ------------------------------------------------------------
-- 5. trg_AtualizarStatusAutomaticamente_BU
-- Tipo: BEFORE UPDATE
-- Tabela: Matriculas
-- Regra:
--   Antes de atualizar uma matricula para 'Cursando',
--   verifica se o aluno ja atingiu o limite de 6 disciplinas.
-- ------------------------------------------------------------
CREATE TRIGGER trg_AtualizarStatusAutomaticamente_BU
BEFORE UPDATE ON Matriculas
FOR EACH ROW
BEGIN
    DECLARE v_TotalCursando INT DEFAULT 0;

    IF NEW.Status = 'Cursando' AND OLD.Status <> 'Cursando' THEN
        SELECT COUNT(*)
        INTO v_TotalCursando
        FROM Matriculas
        WHERE ID_Aluno = NEW.ID_Aluno
          AND Status = 'Cursando'
          AND ID_Matricula <> OLD.ID_Matricula;

        IF v_TotalCursando >= 6 THEN
            INSERT INTO LogsSistema (
                Usuario,
                Acao,
                TabelaAfetada,
                DataHora,
                Descricao
            )
            VALUES (
                'Sistema',
                'BLOQUEIO_STATUS',
                'Matriculas',
                NOW(),
                CONCAT(
                    'Tentativa bloqueada: aluno ID ',
                    NEW.ID_Aluno,
                    ' ja possui 6 disciplinas com status Cursando.'
                )
            );

            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Aluno nao pode cursar mais de 6 disciplinas ao mesmo tempo.';
        END IF;
    END IF;
END$$

-- ------------------------------------------------------------
-- 1. trg_AtualizarContagemVagas
-- Tipo: AFTER INSERT
-- Tabela: Matriculas
-- Acao:
--   Ao inserir uma matricula, incrementa automaticamente
--   o campo VagasOcupadas da turma correspondente.
-- ------------------------------------------------------------
CREATE TRIGGER trg_AtualizarContagemVagas
AFTER INSERT ON Matriculas
FOR EACH ROW
BEGIN
    UPDATE Turmas
    SET VagasOcupadas = VagasOcupadas + 1
    WHERE ID_Turma = NEW.ID_Turma;
END$$

-- ------------------------------------------------------------
-- 2. trg_AuditoriaAluno
-- Tipo: AFTER UPDATE
-- Tabela: Alunos
-- Regra:
--   Se o email do aluno for alterado, registra a mudanca
--   na tabela LogsSistema.
-- ------------------------------------------------------------
CREATE TRIGGER trg_AuditoriaAluno
AFTER UPDATE ON Alunos
FOR EACH ROW
BEGIN
    IF OLD.Email <> NEW.Email THEN
        INSERT INTO LogsSistema (
            Usuario,
            Acao,
            TabelaAfetada,
            DataHora,
            Descricao
        )
        VALUES (
            'Sistema',
            'ALTERACAO_EMAIL_ALUNO',
            'Alunos',
            NOW(),
            CONCAT(
                'Aluno ID ',
                NEW.ID_Aluno,
                ' alterou email de ',
                OLD.Email,
                ' para ',
                NEW.Email,
                '.'
            )
        );
    END IF;
END$$

-- ------------------------------------------------------------
-- 4. trg_AtualizarHistoricoAutomaticamente
-- Tipo: AFTER UPDATE
-- Tabela: Matriculas
-- Regra:
--   Quando o status da matricula for alterado para 'Aprovado',
--   insere automaticamente um registro no HistoricoAluno.
-- ------------------------------------------------------------
CREATE TRIGGER trg_AtualizarHistoricoAutomaticamente
AFTER UPDATE ON Matriculas
FOR EACH ROW
BEGIN
    IF OLD.Status <> 'Aprovado' AND NEW.Status = 'Aprovado' THEN
        IF NEW.NotaFinal IS NULL THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Para aprovar uma matricula, informe a NotaFinal.';
        END IF;

        INSERT INTO HistoricoAluno (
            ID_Aluno,
            ID_Disciplina,
            NotaFinal,
            Status,
            DataConclusao
        )
        SELECT
            NEW.ID_Aluno,
            t.ID_Disciplina,
            NEW.NotaFinal,
            NEW.Status,
            CURDATE()
        FROM Turmas t
        WHERE t.ID_Turma = NEW.ID_Turma;
    END IF;
END$$

-- ------------------------------------------------------------
-- 3. trg_LogOperacoesGerais
-- Tipo: AFTER INSERT, UPDATE, DELETE
-- Acao:
--   Como MySQL exige um trigger por evento e por tabela,
--   os triggers abaixo registram operacoes gerais nas principais
--   tabelas do sistema: Alunos, Matriculas, Turmas e Disciplinas.
-- ------------------------------------------------------------

-- Logs gerais da tabela Alunos
CREATE TRIGGER trg_LogOperacoesGerais_Alunos_AI
AFTER INSERT ON Alunos
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'INSERT', 'Alunos', NOW(), CONCAT('Registro inserido. ID_Aluno: ', NEW.ID_Aluno));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Alunos_AU
AFTER UPDATE ON Alunos
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'UPDATE', 'Alunos', NOW(), CONCAT('Registro atualizado. ID_Aluno: ', NEW.ID_Aluno));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Alunos_AD
AFTER DELETE ON Alunos
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'DELETE', 'Alunos', NOW(), CONCAT('Registro removido. ID_Aluno: ', OLD.ID_Aluno));
END$$

-- Logs gerais da tabela Matriculas
CREATE TRIGGER trg_LogOperacoesGerais_Matriculas_AI
AFTER INSERT ON Matriculas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'INSERT', 'Matriculas', NOW(), CONCAT('Registro inserido. ID_Matricula: ', NEW.ID_Matricula));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Matriculas_AU
AFTER UPDATE ON Matriculas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'UPDATE', 'Matriculas', NOW(), CONCAT('Registro atualizado. ID_Matricula: ', NEW.ID_Matricula));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Matriculas_AD
AFTER DELETE ON Matriculas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'DELETE', 'Matriculas', NOW(), CONCAT('Registro removido. ID_Matricula: ', OLD.ID_Matricula));
END$$

-- Logs gerais da tabela Turmas
CREATE TRIGGER trg_LogOperacoesGerais_Turmas_AI
AFTER INSERT ON Turmas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'INSERT', 'Turmas', NOW(), CONCAT('Registro inserido. ID_Turma: ', NEW.ID_Turma));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Turmas_AU
AFTER UPDATE ON Turmas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'UPDATE', 'Turmas', NOW(), CONCAT('Registro atualizado. ID_Turma: ', NEW.ID_Turma));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Turmas_AD
AFTER DELETE ON Turmas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'DELETE', 'Turmas', NOW(), CONCAT('Registro removido. ID_Turma: ', OLD.ID_Turma));
END$$

-- Logs gerais da tabela Disciplinas
CREATE TRIGGER trg_LogOperacoesGerais_Disciplinas_AI
AFTER INSERT ON Disciplinas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'INSERT', 'Disciplinas', NOW(), CONCAT('Registro inserido. ID_Disciplina: ', NEW.ID_Disciplina));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Disciplinas_AU
AFTER UPDATE ON Disciplinas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'UPDATE', 'Disciplinas', NOW(), CONCAT('Registro atualizado. ID_Disciplina: ', NEW.ID_Disciplina));
END$$

CREATE TRIGGER trg_LogOperacoesGerais_Disciplinas_AD
AFTER DELETE ON Disciplinas
FOR EACH ROW
BEGIN
    INSERT INTO LogsSistema (Usuario, Acao, TabelaAfetada, DataHora, Descricao)
    VALUES ('Sistema', 'DELETE', 'Disciplinas', NOW(), CONCAT('Registro removido. ID_Disciplina: ', OLD.ID_Disciplina));
END$$

DELIMITER ;
