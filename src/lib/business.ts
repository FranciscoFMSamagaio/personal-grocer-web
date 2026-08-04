export const BUSINESS = {
  name: "X",
  phone: "351934984880",
  area: "Gaia",
  serviceFee: "Y",
  minimumOrder: "Y",
  extraDistance: "Y",
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message?.trim() || "Olá, gostava de fazer uma encomenda de supermercado."
  );
  return `https://wa.me/${BUSINESS.phone}?text=${text}`;
}
