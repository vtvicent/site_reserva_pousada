import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Rooms from "./pages/Rooms.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/quartos", label: "Quartos" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

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
    </div>
  );
}
