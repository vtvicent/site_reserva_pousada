import { Link } from "react-router-dom";
import React from "react";
import ReservationForm from "../components/ReservationForm.jsx";

const WHATSAPP_RESERVATION_LINK =
  "https://wa.me/5583998710819?text=Ol%C3%A1!%20Tudo%20bem%3F%20Gostaria%20de%20consultar%20disponibilidade%20na%20Pousada%20Santo%20In%C3%A1cio.";
const COMPANY_WHATSAPP_LINK =
  "https://wa.me/5583998710819?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20hospedagem%20de%20empresa%20ou%20equipe%20na%20Pousada%20Santo%20In%C3%A1cio.";
const MAP_LINK = "https://maps.app.goo.gl/vMqn6w6E2WBDL5cR6";
const MAP_EMBED =
  "https://www.google.com/maps?q=Pousada%20Santo%20In%C3%A1cio%20Tapero%C3%A1%20PB&output=embed";

const benefits = [
  ["Localização estratégica", "Em posto de combustível, facilitando a chegada e a saída."],
  ["Estacionamento", "Acesso prático para veículos grandes e viajantes em trânsito."],
  ["Conforto essencial", "Quartos simples, arejados e pensados para uma boa noite de descanso."],
  ["Atendimento direto", "Consulta de disponibilidade e confirmação pelo WhatsApp."],
  ["Para viajantes", "Uma parada objetiva para quem está seguindo viagem pelo Cariri."],
  ["Para empresas", "Hospedagem para equipes terceirizadas e contratos recorrentes."],
];

const galleryImages = [
  {
    src: "/hero-pousada-real.png",
    alt: "Fachada e posto onde fica localizada a Pousada Santo Inácio em Taperoá PB",
    label: "Localização da pousada",
  },
  {
    src: "/hero-pousada-destaque.webp",
    alt: "Banner da Pousada Santo Inácio com identidade visual em vermelho e dourado",
    label: "Identidade visual",
  },
  {
    src: "/santo-inacio-logo.png",
    alt: "Logo da Pousada Santo Inácio",
    label: "Marca da pousada",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Hospedagem em Taperoá-PB</p>
            <div className="hero-brand-title" aria-label="Pousada Santo Inácio">
              <span className="halo-mark" aria-hidden="true" />
              <span className="brand-kicker">Pousada</span>
              <h1 className="brand-main">Santo Inácio</h1>
              <span className="brand-location">Taperoá - PB</span>
              <span className="brand-subtitle">Comodidade e preço justo para quem está em trânsito.</span>
            </div>
            <p>
              Hospedagem simples, segura e sem burocracia para viajantes,
              caminhoneiros, trabalhadores regionais e equipes terceirizadas.
            </p>
            <div className="hero-actions">
              <a className="primary-button hero-primary" href={WHATSAPP_RESERVATION_LINK} target="_blank" rel="noreferrer">
                <span className="button-icon" aria-hidden="true">☎</span>
                Reservar pelo WhatsApp
              </a>
              <Link className="text-button" to="/quartos">
                Ver quartos
              </Link>
            </div>
            <div className="hero-badges" aria-label="Diferenciais da pousada">
              <span>Atendimento direto</span>
              <span>Localização em posto de combustível</span>
              <span>Ideal para viajantes e empresas</span>
            </div>
          </div>

          <aside className="hero-reservation-card" aria-label="Consulta rápida pelo WhatsApp">
            <strong>Pré-reserva rápida</strong>
            <span>Informe datas, pessoas e quarto desejado. A confirmação é feita pelo atendimento.</span>
            <a className="primary-button full" href="#reserva">Consultar disponibilidade</a>
          </aside>
        </div>
      </section>

      <section className="quick-info benefits-grid" aria-label="Benefícios da pousada">
        {benefits.map(([title, text]) => (
          <div key={title}>
            <span className="info-icon" aria-hidden="true">✓</span>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </section>

      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Galeria</p>
            <h2 id="gallery-title">Conheça a identidade e a localização da pousada.</h2>
          </div>
          <a className="text-link dark-link" href={WHATSAPP_RESERVATION_LINK} target="_blank" rel="noreferrer">
            Falar com a pousada
          </a>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <figure key={image.src} className="gallery-card">
              <img src={image.src} alt={image.alt} loading="lazy" />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="business-band company-section">
        <div>
          <p className="eyebrow">Hospedagem para empresas</p>
          <h2>Estadia prática para equipes terceirizadas e contratos recorrentes.</h2>
        </div>
        <div>
          <p>
            Atendemos trabalhadores em deslocamento, equipes de obras, prestadores
            de serviço e empresas que precisam de hospedagem simples, previsível e
            com atendimento direto.
          </p>
          <a className="primary-button company-button" href={COMPANY_WHATSAPP_LINK} target="_blank" rel="noreferrer">
            Solicitar orçamento
          </a>
        </div>
      </section>

      <section id="reserva" className="content-band two-columns reservation-section">
        <div>
          <p className="eyebrow">Reservas</p>
          <h2>Envie os dados da hospedagem pelo WhatsApp.</h2>
          <p>
            O formulário abre uma mensagem pronta no WhatsApp para a pousada
            confirmar disponibilidade, valores e condições. Nenhuma reserva é
            salva automaticamente no site.
          </p>
        </div>
        <ReservationForm />
      </section>

      <section id="localizacao" className="location-tourism-section">
        <div className="section-heading">
          <p className="eyebrow">Localização</p>
          <h2>Onde Estamos</h2>
          <p>Taperoá-PB, no coração do Cariri Paraibano.</p>
        </div>

        <div className="location-grid">
          <div className="map-card">
            <iframe
              className="map-embed"
              title="Mapa da Pousada Santo Inácio em Taperoá PB"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <div className="location-map-fallback">
              <div className="map-pin" aria-hidden="true">⌖</div>
              <h3>Pousada Santo Inácio</h3>
              <p>Posto de combustível em Taperoá - PB</p>
              <span>Toque no botão abaixo para abrir a rota no Google Maps.</span>
              <a className="primary-button" href={MAP_LINK} target="_blank" rel="noreferrer">
                Como chegar
              </a>
            </div>
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
            <a className="primary-button map-button" href={MAP_LINK} target="_blank" rel="noreferrer">
              Como chegar
            </a>
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
