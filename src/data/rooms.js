export const rooms = Array.from({ length: 11 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    id: number,
    name: `Quarto ${number}`,
    status: "disponivel",
    capacity: index % 3 === 0 ? 1 : 2,
    description:
      index % 3 === 0
        ? "Quarto simples para descanso individual, ideal para pernoite e parada rápida."
        : "Quarto simples para viajantes em trânsito, com foco em conforto básico e praticidade.",
  };
});
