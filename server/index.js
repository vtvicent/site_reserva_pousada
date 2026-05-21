import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rooms } from "../src/data/rooms.js";

const app = express();
const port = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

app.use(cors());
app.use(express.json());

app.get("/api/pousada", (_req, res) => {
  res.json({
    name: "Pousada Santo Inácio",
    city: "Taperoá - PB",
    location: "Posto de combustível em Taperoá - PB",
    phone: "(83) 99871-0819",
    whatsapp: "5583998710819",
    rooms: rooms.length,
  });
});

app.get("/api/quartos", (_req, res) => {
  res.json(rooms);
});

app.use(express.static(path.join(rootDir, "dist")));

app.use((_req, res) => {
  res.sendFile(path.join(rootDir, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor da Pousada Santo Inácio rodando em http://localhost:${port}`);
});
