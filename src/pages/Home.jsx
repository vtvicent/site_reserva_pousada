import { Link } from "react-router-dom";
import React from "react";
import ReservationForm from "../components/ReservationForm.jsx";

const WHATSAPP_RESERVATION_LINK =
  "https://wa.me/5583998710819?text=Ol%C3%A1!%20Tudo%20bem%3F%20Gostaria%20de%20fazer%20uma%20pr%C3%A9-reserva%20na%20Pousada%20Santo%20In%C3%A1cio.";
const MAP_LINK = "https://maps.app.goo.gl/vMqn6w6E2WBDL5cR6";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-brand-title" aria-label="Pousada Santo Inácio">
              <span className="halo-mark" aria-hidden="true" />
              <span className="brand-kicker">Pousada</span>
              <span className="brand-main">Santo Inácio</span>
              <span className="brand-location">Taperoá - Paraíba</span>
              <span className="brand-subtitle">Comodidade e preço baixo 24h pertinho de você.</span>
            </div>
            <p>
              Uma opção prática para viajantes em trânsito, caminhoneiros,
              trabalhadores regionais e equipes terceirizadas que precisam de
              descanso limpo, localização estratégica e atendimento ágil.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#reserva">
                <span className="button-icon" aria-hidden="true">☎</span>
                Reservar pelo WhatsApp
              </a>
              <Link className="text-button" to="/quartos">
                Ver quartos
              </Link>
            </div>
            <div className="hero-badges" aria-label="Diferenciais da pousada">
              <span>Atendimento direto com o proprietário</span>
              <span>Localização em posto de combustível</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-info" aria-label="Informações rápidas">
        <div>
          <span className="info-icon" aria-hidden="true">◷</span>
          <strong>Check-in flexível</strong>
          <span>Praticidade para quem chega da estrada em horários variados.</span>
        </div>
        <div>
          <span className="info-icon" aria-hidden="true">▰</span>
          <strong>Estacionamento amplo</strong>
          <span>Localização conveniente em posto, com acesso fácil para veículos grandes.</span>
        </div>
      </section>

      <section className="business-band">
        <div>
          <p className="eyebrow">Para empresas</p>
          <h2>Hospedagem para equipes terceirizadas e contratos recorrentes.</h2>
        </div>
        <p>
          Atendemos trabalhadores em deslocamento, equipes de obras, prestadores
          de serviço e empresas que precisam de hospedagem simples, previsível e
          com atendimento direto.
        </p>
      </section>

      <section id="reserva" className="content-band two-columns">
        <div>
          <p className="eyebrow">Pré-reserva rápida</p>
          <h2>Envie os dados da hospedagem pelo WhatsApp.</h2>
          <p>
            Ao enviar o formulário, o WhatsApp será aberto com uma mensagem pronta
            para a pousada confirmar disponibilidade, valores e condições.
          </p>
        </div>
        <ReservationForm />
      </section>

      <section id="localizacao" className="location-tourism-section">
        <div className="section-heading">
          <p className="eyebrow">Localização e conheça Taperoá</p>
          <h2>Onde Estamos</h2>
          <p>Localização estratégica no coração do Cariri Paraibano</p>
        </div>

        <div className="location-grid">
          <div className="map-card location-map-fallback">
            <div className="map-pin" aria-hidden="true">⌖</div>
            <h3>Pousada Santo Inácio</h3>
            <p>Posto de combustível em Taperoá - PB</p>
            <span>Toque no botão abaixo para abrir a rota no Google Maps.</span>
            <a className="primary-button" href={MAP_LINK} target="_blank" rel="noreferrer">
              Abrir Rota no Google Maps
            </a>
          </div>

          <div className="location-copy glass-panel">
            <h3>Praticidade para quem está em trânsito.</h3>
            <p>
              A Pousada Santo Inácio está localizada em posto de combustível,
              com fácil acesso pela rodovia e estrutura pensada para quem precisa
              descansar com segurança, rapidez e comodidade.
            </p>
            <p>
              É uma opção ideal para viajantes, caminhoneiros, representantes
              comerciais, equipes de trabalho e turistas que desejam uma parada
              estratégica em Taperoá-PB.
            </p>
            <a className="text-link" href={MAP_LINK} target="_blank" rel="noreferrer">
              Abrir localização no Google Maps
            </a>
          </div>
        </div>

        <div className="taperoa-panel">
          <div className="taperoa-copy glass-panel">
            <p className="eyebrow">Conheça Taperoá - PB</p>
            <h2>Descubra Taperoá, o coração cultural do Cariri Paraibano</h2>
            <p>
              Localizada no coração do Cariri Paraibano, Taperoá é um destino
              que reúne cultura, história, tradição e as belas paisagens do
              sertão nordestino.
            </p>
            <p>
              Reconhecida como uma das cidades mais importantes da cultura
              paraibana, Taperoá possui forte ligação com o escritor Ariano
              Suassuna, autor de obras consagradas como O Auto da Compadecida e
              A Pedra do Reino. A cidade serviu de inspiração para diversos
              cenários e elementos presentes em suas histórias, tornando-se
              referência para admiradores da literatura e da cultura nordestina.
            </p>
            <p>
              Seu centro histórico preserva construções tradicionais, igrejas,
              praças e espaços culturais que ajudam a contar a trajetória do
              povo sertanejo. Entre os destaques está o Memorial Ariano Suassuna
              e os roteiros turísticos inspirados em sua obra.
            </p>
            <p>
              Taperoá também mantém vivas as tradições populares através do
              forró, repentistas, violeiros, grupos folclóricos, apresentações
              culturais e festas que celebram a identidade do sertão. A
              gastronomia regional encanta visitantes com pratos típicos como
              carne de sol, rubacão, buchada e outras especialidades nordestinas.
            </p>
            <p>
              Além da riqueza cultural, a cidade oferece tranquilidade,
              hospitalidade e paisagens marcantes da caatinga paraibana. O pôr
              do sol sertanejo, a simplicidade acolhedora do povo e o clima
              autêntico fazem de Taperoá um destino ideal para quem deseja viver
              experiências genuínas no Nordeste.
            </p>
          </div>

          <div className="tourism-cards">
            <article className="tourism-card">
              <span>📖</span>
              <h3>Terra de Ariano Suassuna</h3>
              <p>Berço cultural que inspirou grandes obras da literatura brasileira.</p>
            </article>
            <article className="tourism-card">
              <span>🎭</span>
              <h3>Cultura Nordestina</h3>
              <p>Tradições populares, música, dança e manifestações folclóricas.</p>
            </article>
            <article className="tourism-card">
              <span>🌅</span>
              <h3>Beleza do Sertão</h3>
              <p>Paisagens únicas do Cariri Paraibano e pôr do sol inesquecível.</p>
            </article>
            <article className="tourism-card">
              <span>🍴</span>
              <h3>Gastronomia Regional</h3>
              <p>Sabores autênticos da culinária típica nordestina.</p>
            </article>
          </div>
        </div>

        <div className="tourism-cta">
          <a className="primary-button" href={WHATSAPP_RESERVATION_LINK} target="_blank" rel="noreferrer">
            <span className="button-icon" aria-hidden="true">☎</span>
            Reservar Minha Hospedagem
          </a>
        </div>
      </section>
    </>
  );
}
