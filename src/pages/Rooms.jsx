import React from "react";
import ReservationForm from "../components/ReservationForm.jsx";
import RoomCard from "../components/RoomCard.jsx";
import { rooms } from "../data/rooms.js";

export default function Rooms() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Quartos</p>
        <h1>Quartos simples, arejados e limpos para descanso em Taperoá.</h1>
        <p>
          A confirmação final é feita diretamente pelo atendimento da pousada.
          Todos os quartos estão configurados como disponíveis para pré-reserva.
        </p>
      </section>

      <section className="rooms-summary" aria-label="Resumo dos valores">
        <div>
          <span>Individual</span>
          <strong>R$ 50,00</strong>
          <small>Quarto de solteiro</small>
        </div>
        <div>
          <span>Casal ou 2 pessoas</span>
          <strong>R$ 80,00</strong>
          <small>Conforme disponibilidade</small>
        </div>
        <div>
          <span>Quarto 07</span>
          <strong>Sob consulta</strong>
          <small>Capacidade para até 3 pessoas</small>
        </div>
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
            e a necessidade de cada hóspede ou empresa.
          </p>
        </div>
        <ReservationForm />
      </section>
    </>
  );
}
