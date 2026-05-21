import ReservationForm from "../components/ReservationForm.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { rooms } from "../data/rooms.js";

export default function Rooms() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Quartos</p>
        <h1>Quartos simples para descanso, pernoite e viagens de passagem.</h1>
        <p>
          Todos os quartos estão marcados como disponíveis. A confirmação final
          é feita diretamente pelo atendimento da pousada no WhatsApp.
        </p>
      </section>

      <section className="rooms-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </section>

      <section className="content-band two-columns">
        <div>
          <p className="eyebrow">Consulta rápida</p>
          <h2>Escolha um quarto ou solicite a melhor opção disponível.</h2>
          <p>
            A equipe confirma o quarto conforme o período, o número de pessoas
            e a necessidade de cada hóspede.
          </p>
        </div>
        <ReservationForm />
      </section>
    </>
  );
}
