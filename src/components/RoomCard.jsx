import { Link } from "react-router-dom";
import React from "react";

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-card-visual">
        <img src="/santo-inacio-logo.png" alt={`Identidade visual da Pousada Santo Inácio no ${room.name}`} />
        <span>Quarto {room.id}</span>
      </div>
      <div className="room-card-top">
        <span className="room-number">{room.id}</span>
        <span className="status-pill available">Disponível</span>
      </div>
      <h3>{room.name}</h3>
      <p>{room.description}</p>
      <div className="room-meta">
        <span>{room.bedType}</span>
        <span>Até {room.capacity} pessoa{room.capacity > 1 ? "s" : ""}</span>
      </div>
      <div className="room-price">
        <span>Diária</span>
        <strong>{room.price}</strong>
      </div>
      <strong className="room-tag">{room.tag}</strong>
      <Link className="secondary-button" to={`/contato?quarto=${room.id}`}>
        Reservar
      </Link>
    </article>
  );
}
