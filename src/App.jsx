import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const FLOATING_WHATSAPP_LINK =
  "https://wa.me/5583998710819?text=Ol%C3%A1!%20Tudo%20bem%3F%20Gostaria%20de%20falar%20com%20a%20Pousada%20Santo%20In%C3%A1cio%20sobre%20hospedagem.";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/quartos", label: "Quartos" },
  { to: "/#localizacao", label: "Localização da Pousada" },
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
          <img src="/santo-inacio-logo.png" alt="" />
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
        <div>
          <strong>Pousada Santo Inácio</strong>
          <span>Hospedagem simples, segura e estratégica em Taperoá - PB.</span>
        </div>
        <div>
          <span>WhatsApp: (83) 99871-0819</span>
          <span>Endereço: posto de combustível em Taperoá - PB</span>
          <span>CNPJ: disponível no atendimento</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={FLOATING_WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Pousada Santo Inácio pelo WhatsApp"
      >
        <span aria-hidden="true">☎</span>
        <strong>WhatsApp</strong>
      </a>
    </div>
  );
}
