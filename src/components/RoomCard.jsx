import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-card-top">
        <span className="room-number">{room.id}</span>
        <span className="status-pill available">Disponível</span>
      </div>
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <span className="capacity">Até {room.capacity} pessoa{room.capacity > 1 ? "s" : ""}</span>
      <Link className="secondary-button" to={`/contato?quarto=${room.id}`}>
        Reservar este quarto
      </Link>
    </article>
  );
}
