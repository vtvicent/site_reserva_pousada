import { Link } from "react-router-dom";
import ReservationForm from "../components/ReservationForm.jsx";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Taperoá - Paraíba</p>
            <h1>Pousada Santo Inácio</h1>
            <p>
              Hospedagem prática para quem está em trânsito, com atendimento direto,
              localização estratégica em posto de combustível e reserva rápida pelo WhatsApp.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#reserva">
                Reservar pelo WhatsApp
              </a>
              <Link className="text-button" to="/quartos">
                Ver quartos
              </Link>
            </div>
            <div className="hero-badges" aria-label="Diferenciais da pousada">
              <span>Atendimento 24h</span>
              <span>11 quartos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-info" aria-label="Informações rápidas">
        <div>
          <strong>11 quartos</strong>
          <span>Estrutura objetiva para descanso e pernoite.</span>
        </div>
        <div>
          <strong>Localização prática</strong>
          <span>Situada em posto de combustível em Taperoá - PB.</span>
        </div>
        <div>
          <strong>Reserva direta</strong>
          <span>Atendimento rápido pelo WhatsApp da pousada.</span>
        </div>
      </section>

      <section id="reserva" className="content-band two-columns">
        <div>
          <p className="eyebrow">Reserva rápida</p>
          <h2>Informe os dados da hospedagem e aguarde a confirmação.</h2>
          <p>
            Ao enviar o formulário, o WhatsApp será aberto com uma mensagem pronta
            para a pousada confirmar a disponibilidade e finalizar o atendimento.
          </p>
        </div>
        <ReservationForm />
      </section>
    </>
  );
}
