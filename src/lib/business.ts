export const BUSINESS = {
  name: "X",
  phone: "351934984880",
  area: "Gaia",
};

// Taxa de serviço: valor fixo até ao limite, percentagem do valor total acima.
export const PRICING = {
  threshold: 50,
  weekdays: { fixed: 6, percent: 0.1 },
  weekends: { fixed: 10, percent: 0.15 },
  // Acima de `overKm` soma `fee`; acima de farKm soma ainda farPerKm por km extra.
  distance: [
    { overKm: 5, fee: 1 },
    { overKm: 10, fee: 3 },
    { overKm: 20, fee: 5 },
  ],
  farKm: 25,
  farPerKm: 0.2,
  manyItems: { over: 30, fee: 2 },
  urgent: 5,
};

export function euros(value: number) {
  const s = value.toFixed(2).replace(".", ",").replace(/,00$/, "");
  return `${s} €`;
}

export function estimateFee({
  weekend,
  total,
  km,
  manyItems,
  urgent,
}: {
  weekend: boolean;
  total: number;
  km: number;
  manyItems: boolean;
  urgent: boolean;
}) {
  const day = weekend ? PRICING.weekends : PRICING.weekdays;
  const base = total <= PRICING.threshold ? day.fixed : total * day.percent;
  let distance = 0;
  for (const tier of PRICING.distance) if (km > tier.overKm) distance = tier.fee;
  if (km > PRICING.farKm) distance += (km - PRICING.farKm) * PRICING.farPerKm;
  const extras =
    (manyItems ? PRICING.manyItems.fee : 0) + (urgent ? PRICING.urgent : 0);
  return { base, distance, total: base + distance + extras };
}

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message?.trim() || "Olá, gostava de fazer uma encomenda de supermercado."
  );
  return `https://wa.me/${BUSINESS.phone}?text=${text}`;
}
