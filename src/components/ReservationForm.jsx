import React, { useMemo, useState } from "react";
import { rooms } from "../data/rooms.js";

const WHATSAPP_NUMBER = "5583998710819";

const initialForm = {
  name: "",
  checkIn: "",
  checkOut: "",
  guests: "1",
  room: "",
  message: "",
};

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function buildMessage(form) {
  return [
    "Olá! Tudo bem?",
    "Gostaria de fazer uma pré-reserva na Pousada Santo Inácio.",
    "",
    `Nome: ${form.name || "Não informado"}`,
    `Entrada: ${formatDate(form.checkIn) || "Não informada"}`,
    `Saída: ${formatDate(form.checkOut) || "Não informada"}`,
    `Pessoas: ${form.guests || "Não informado"}`,
    `Quarto: ${form.room || "A combinar"}`,
    `Mensagem: ${form.message || "Tenho interesse em confirmar disponibilidade, valor e melhor opção de quarto para esse período."}`,
    "",
    "Fico no aguardo da confirmação.",
    "Muito obrigado pela atenção!",
  ].join("\n");
}

export default function ReservationForm({ selectedRoom = "" }) {
  const [form, setForm] = useState({ ...initialForm, room: selectedRoom });
  const today = useMemo(getToday, []);

  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent(buildMessage(form));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Nome do cliente</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Ex.: João"
          autoComplete="name"
          required
        />
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="checkIn">Check-in</label>
          <input
            id="checkIn"
            name="checkIn"
            type="date"
            min={today}
            value={form.checkIn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="checkOut">Check-out</label>
          <input
            id="checkOut"
            name="checkOut"
            type="date"
            min={form.checkIn || today}
            value={form.checkOut}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="guests">Número de pessoas</label>
          <input
            id="guests"
            name="guests"
            type="number"
            min="1"
            max="6"
            value={form.guests}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="room">Quarto desejado</label>
          <select id="room" name="room" value={form.room} onChange={handleChange}>
            <option value="">A combinar</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="message">Mensagem rápida</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Ex.: Chego à noite e preciso de uma opção prática para descanso."
          rows="3"
        />
      </div>

      <button className="primary-button full" type="submit">
        <span className="button-icon" aria-hidden="true">☎</span>
        Reservar agora pelo WhatsApp
      </button>

      <p className="form-note">Pré-reserva sem cadastro. A confirmação é feita diretamente pelo WhatsApp.</p>
    </form>
  );
}
