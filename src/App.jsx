import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const WHATSAPP_NUMBER = "5583998710819";
const FLOATING_WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Tudo bem? Gostaria de consultar disponibilidade na Pousada Santo Inácio."
)}`;

const navItems = [
  { to: "/", label: "Início" },
  { to: "/quartos", label: "Quartos" },
  { to: "/#localizacao", label: "Localização" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return null;
}

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem("site-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    window.localStorage.setItem("site-theme", theme);
  }, [theme]);

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Pousada Santo Inácio">
          <img src="/santo-inacio-logo.png" alt="Logo da Pousada Santo Inácio" />
          <span>
            <strong>Pousada Santo Inácio</strong>
            <small>Taperoá - PB</small>
          </span>
        </NavLink>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
            <span>{isDark ? "Claro" : "Escuro"}</span>
          </button>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quartos" element={<Rooms />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/santo-inacio-logo.png" alt="Logo da Pousada Santo Inácio" />
          <div>
            <strong>Pousada Santo Inácio</strong>
            <span>Hospedagem simples, segura e estratégica em Taperoá - PB.</span>
          </div>
        </div>
        <nav className="footer-links" aria-label="Links do rodapé">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/quartos">Quartos</NavLink>
          <NavLink to="/#localizacao">Como chegar</NavLink>
          <NavLink to="/contato">Contato</NavLink>
        </nav>
        <div className="footer-contact">
          <span>WhatsApp: (83) 99871-0819</span>
          <span>Endereço: posto de combustível em Taperoá - PB</span>
          <a href={FLOATING_WHATSAPP_LINK} target="_blank" rel="noreferrer">Reservar pelo WhatsApp</a>
          <span>Instagram: informe o perfil oficial para adicionar o link</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={FLOATING_WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar disponibilidade pelo WhatsApp"
      >
        <span aria-hidden="true">☎</span>
        <strong>Consultar</strong>
      </a>
    </div>
  );
}
