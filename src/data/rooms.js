export const rooms = Array.from({ length: 11 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  const isSingle = index % 3 === 0;
  const capacity = number === "07" ? 3 : isSingle ? 1 : 2;

  return {
    id: number,
    name: `Quarto ${number}`,
    status: "disponivel",
    capacity,
    price: capacity === 1 ? "R$ 50,00" : capacity === 2 ? "R$ 80,00" : "Sob consulta",
    bedType: number === "07" ? "3 camas de solteiro" : isSingle ? "1 cama de solteiro" : index % 2 === 0 ? "2 camas de solteiro" : "1 cama de casal",
    tag: index % 2 === 0 ? "Ideal para caminhoneiros" : "Contrato comercial disponível",
    description: isSingle
      ? "Quarto simples, arejado e limpo para pernoite individual."
      : "Quarto simples para descanso em trânsito, com conforto básico e boa localização.",
  };
});
