export const BUSINESS = {
  name: "X",
  phone: "351934984880",
  area: "Gaia",
};

// Taxa de serviço: valor fixo até ao limite, percentagem do valor total acima.
export const PRICING = {
  threshold: "50 €",
  weekdays: { upTo: "6 €", above: "10%" },
  weekends: { upTo: "10 €", above: "15%" },
  distance: [
    { label: "Mais de 5 km", value: "+1 €" },
    { label: "Mais de 10 km", value: "+3 €" },
    { label: "Mais de 20 km", value: "+5 €" },
    { label: "Mais de 25 km", value: "+5 € + 0,20 €/km" },
  ],
  extras: [
    { label: "Mais de 30 artigos", value: "+2 €" },
    { label: "Entrega urgente", value: "+5 €" },
  ],
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message?.trim() || "Olá, gostava de fazer uma encomenda de supermercado."
  );
  return `https://wa.me/${BUSINESS.phone}?text=${text}`;
}
