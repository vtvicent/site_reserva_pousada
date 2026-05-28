import { useSearchParams } from "react-router-dom";
import React from "react";
import ReservationForm from "../components/ReservationForm.jsx";

const WHATSAPP_DIRECT = "https://wa.me/5583998710819";

export default function Contact() {
  const [params] = useSearchParams();
  const selectedRoom = params.get("quarto") || "";

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Contato</p>
        <h1>Fale diretamente com a Pousada Santo Inácio.</h1>
        <p>
          Para reservas, dúvidas, hospedagem de equipes ou confirmação de
          disponibilidade, entre em contato pelo WhatsApp.
        </p>
      </section>

      <section className="contact-layout">
        <div className="contact-panel">
          <h2>Informações</h2>
          <dl>
            <div>
              <dt>Telefone e WhatsApp</dt>
              <dd>(83) 99871-0819</dd>
            </div>
            <div>
              <dt>Localização</dt>
              <dd>Posto de combustível em Taperoá - PB</dd>
            </div>
            <div>
              <dt>Atendimento</dt>
              <dd>Atendimento direto, mediante confirmação pelo WhatsApp</dd>
            </div>
            <div>
              <dt>CNPJ</dt>
              <dd>Disponível no atendimento</dd>
            </div>
          </dl>
          <a className="primary-button full" href={WHATSAPP_DIRECT} target="_blank" rel="noreferrer">
            <span className="button-icon" aria-hidden="true">☎</span>
            Abrir WhatsApp
          </a>
        </div>

        <div className="contact-form-wrap">
          <h2>Pré-reserva pelo WhatsApp</h2>
          <ReservationForm selectedRoom={selectedRoom} />
        </div>
      </section>
    </>
  );
}
