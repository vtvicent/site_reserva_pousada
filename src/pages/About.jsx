export default function About() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Sobre</p>
        <h1>Uma pousada simples, funcional e próxima de quem viaja.</h1>
        <p>
          A Pousada Santo Inácio atende quem precisa descansar com praticidade
          em Taperoá, especialmente caminhoneiros, viajantes, trabalhadores e
          equipes terceirizadas.
        </p>
      </section>

      <section className="about-layout">
        <div className="about-photo">
          <img src="/santo-inacio-logo.png" alt="Marca da Pousada Santo Inácio" />
        </div>
        <div className="about-text">
          <h2>Hospedagem objetiva no caminho.</h2>
          <p>
            Localizada em um posto de combustível, a pousada foi pensada para
            oferecer uma estadia direta, acessível e sem complicação.
          </p>
          <p>
            A estrutura conta com 11 quartos simples e foco no essencial:
            descanso, localização conveniente e atendimento rápido para quem
            precisa seguir viagem com tranquilidade.
          </p>
        </div>
      </section>

      <section className="audience-strip">
        <span>Caminhoneiros</span>
        <span>Viajantes</span>
        <span>Trabalhadores</span>
        <span>Empresas terceirizadas</span>
      </section>
    </>
  );
}
