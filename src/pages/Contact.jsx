import { useSearchParams } from "react-router-dom";
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
          Para reservas, dúvidas ou confirmação de disponibilidade, entre em
          contato pelo WhatsApp. O atendimento confirma o quarto disponível e os
          detalhes da hospedagem.
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
              <dd>Atendimento 24h, mediante confirmação pelo WhatsApp</dd>
            </div>
          </dl>
          <a className="primary-button full" href={WHATSAPP_DIRECT} target="_blank" rel="noreferrer">
            Abrir WhatsApp
          </a>
        </div>

        <div className="contact-form-wrap">
          <h2>Reservar pelo WhatsApp</h2>
          <ReservationForm selectedRoom={selectedRoom} />
        </div>
      </section>
    </>
  );
}
