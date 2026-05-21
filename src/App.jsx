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

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Pousada Santo Inácio">
          <img src="/santo-inacio-logo.png" alt="" />
          <span>
            <strong>Pousada Santo Inácio</strong>
            <small>Taperoá - PB</small>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
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
        <strong>Pousada Santo Inácio</strong>
        <span>Hospedagem simples, atendimento direto e reserva pelo WhatsApp em Taperoá - PB.</span>
      </footer>
    </div>
  );
}
