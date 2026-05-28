import { Link } from "react-router-dom";
import React from "react";
import ReservationForm from "../components/ReservationForm.jsx";

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
    </>
  );
}
