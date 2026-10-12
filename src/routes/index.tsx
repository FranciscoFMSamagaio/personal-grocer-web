import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  BUSINESS,
  PRICING,
  estimateFee,
  euros,
  whatsappLink,
} from "@/lib/business";
import {
  MessageCircle,
  HandCoins,
  MapPin,
  Check,
  Leaf,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "X - Entregas de Supermercado ao Domicílio",
      },
      {
        name: "description",
        content:
          "Fazemos as tuas compras de supermercado em Gaia e entregamos-te em casa. Serviço de personal shopper rápido e de confiança.",
      },
      {
        property: "og:title",
        content: "X - Entregas de Supermercado ao Domicílio",
      },
      {
        property: "og:description",
        content:
          "Fazemos as tuas compras de supermercado em Gaia e entregamos-te em casa.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://projectprada.netlify.app/whatsapp-preview-20260819.png",
      },
      {
        property: "og:image:secure_url",
        content: "https://projectprada.netlify.app/whatsapp-preview-20260819.png",
      },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://projectprada.netlify.app/whatsapp-preview-20260819.png",
      },
    ],
  }),
  component: Index,
});

// IMPORTANTE: Substitui estes dados pelos teus antes de publicar.

const WHATSAPP_LINK = whatsappLink();

const pct = (n: number) => `${Math.round(n * 100)}%`;

function WhatsAppLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center justify-center gap-2.5 rounded-full text-center font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-bold uppercase tracking-[0.08em] text-fresh">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2.5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
      {children}
    </h2>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[20px] border border-border bg-background p-7">
      <div className="text-5xl font-extrabold leading-none text-fresh">{step}</div>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function PriceCard({
  title,
  days,
  fixed,
  percent,
  dark = false,
}: {
  title: string;
  days: string;
  fixed: number;
  percent: number;
  dark?: boolean;
}) {
  const muted = dark ? "text-[#c9ccd4]" : "text-muted-foreground";
  return (
    <div
      className={[
        "rounded-3xl p-8",
        dark ? "bg-foreground text-white" : "border border-border bg-card",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[22px] font-bold">{title}</h3>
        <span
          className={[
            "whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-bold",
            dark ? "bg-[#f6c98e] text-foreground" : "bg-fresh-light text-fresh-dark",
          ].join(" ")}
        >
          {days}
        </span>
      </div>
      <div
        className={[
          "mt-6 flex items-baseline justify-between gap-3 border-b pb-4",
          dark ? "border-white/15" : "border-border",
        ].join(" ")}
      >
        <span className={muted}>Compras até {euros(PRICING.threshold)}</span>
        <span className="text-4xl font-extrabold tracking-tight">{euros(fixed)}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className={muted}>Acima de {euros(PRICING.threshold)}</span>
        <span className="text-4xl font-extrabold tracking-tight">
          {pct(percent)}
          <span className={["text-[15px] font-medium", muted].join(" ")}>
            {" "}
            do total
          </span>
        </span>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl px-3.5 py-3",
        highlight ? "bg-[#fdf0e1] text-[#8a4700]" : "bg-background",
      ].join(" ")}
    >
      <div className={["text-sm", highlight ? "" : "text-muted-foreground"].join(" ")}>
        {label}
      </div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}

function Calculator() {
  const [weekend, setWeekend] = useState(false);
  const [total, setTotal] = useState(40);
  const [km, setKm] = useState(3);
  const [manyItems, setManyItems] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const fee = estimateFee({ weekend, total, km, manyItems, urgent });
  const day = weekend ? PRICING.weekends : PRICING.weekdays;
  const lines = [
    {
      label:
        total <= PRICING.threshold ? "Taxa base" : `Taxa base (${pct(day.percent)})`,
      value: euros(fee.base),
    },
    ...(fee.distance > 0 ? [{ label: "Distância", value: `+${euros(fee.distance)}` }] : []),
    ...(manyItems
      ? [{ label: `Mais de ${PRICING.manyItems.over} artigos`, value: `+${euros(PRICING.manyItems.fee)}` }]
      : []),
    ...(urgent ? [{ label: "Urgente", value: `+${euros(PRICING.urgent)}` }] : []),
  ];

  const toggle = (active: boolean) =>
    [
      "min-h-11 rounded-full px-5 text-[15px] font-bold transition-colors",
      active ? "bg-fresh-dark text-white" : "text-foreground hover:bg-fresh-light/60",
    ].join(" ");

  return (
    <div className="flex flex-wrap gap-10 rounded-[28px] bg-fresh-light p-6 sm:p-10">
      <div className="min-w-0 flex-[999_1_420px]">
        <h2 className="text-3xl font-extrabold tracking-tight text-fresh-dark">
          Quanto vou pagar?
        </h2>
        <p className="mt-2 text-fresh-dark">Simula a taxa da tua encomenda.</p>

        <div className="mt-7">
          <div className="mb-2.5 text-[15px] font-bold">Dia da entrega</div>
          <div className="inline-flex gap-1 rounded-full bg-white p-1">
            <button type="button" className={toggle(!weekend)} onClick={() => setWeekend(false)}>
              Dia útil
            </button>
            <button type="button" className={toggle(weekend)} onClick={() => setWeekend(true)}>
              Fim de semana
            </button>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="calc-total" className="mb-2 flex justify-between text-[15px] font-bold">
            <span>Valor das compras</span>
            <span>{euros(total)}</span>
          </label>
          <input
            id="calc-total"
            type="range"
            min={10}
            max={200}
            step={5}
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            className="w-full accent-fresh"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="calc-km" className="mb-2 flex justify-between text-[15px] font-bold">
            <span>Distância</span>
            <span>{km} km</span>
          </label>
          <input
            id="calc-km"
            type="range"
            min={0}
            max={40}
            step={1}
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            className="w-full accent-fresh"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
          <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[15px] font-medium">
            <input
              type="checkbox"
              checked={manyItems}
              onChange={(e) => setManyItems(e.target.checked)}
              className="h-5 w-5 accent-fresh"
            />
            Mais de {PRICING.manyItems.over} artigos
          </label>
          <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[15px] font-medium">
            <input
              type="checkbox"
              checked={urgent}
              onChange={(e) => setUrgent(e.target.checked)}
              className="h-5 w-5 accent-fresh"
            />
            Entrega urgente
          </label>
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_300px] flex-col rounded-[22px] bg-white p-7">
        <div className="text-[15px] text-muted-foreground">Taxa estimada</div>
        <div className="mt-1 text-5xl font-extrabold tracking-tight sm:text-6xl">
          {euros(fee.total)}
        </div>
        <div className="mt-5 flex flex-grow flex-col gap-2.5 text-[15px]">
          {lines.map((l) => (
            <div
              key={l.label}
              className="flex justify-between gap-3 border-b border-dashed border-border pb-2.5"
            >
              <span className="text-muted-foreground">{l.label}</span>
              <span className="font-bold">{l.value}</span>
            </div>
          ))}
        </div>
        <WhatsAppLink className="mt-6 bg-citrus-dark px-5 py-4 text-white">
          Encomendar pelo WhatsApp
        </WhatsAppLink>
        <p className="mt-3 text-center text-[13px] text-muted-foreground">
          Valor indicativo. A taxa final é confirmada por mensagem.
        </p>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Leaf, label: "Frescura garantida" },
  { icon: Clock, label: "Horário combinado" },
  { icon: HandCoins, label: "Pagamento simples" },
  { icon: MapPin, label: `Serviço local em ${BUSINESS.area}` },
];

function Index() {
  const farLabel = `+${euros(PRICING.distance.at(-1)?.fee ?? 0)} + ${euros(PRICING.farPerKm)}/km`;

  return (
    <main className="min-h-screen bg-background pb-24 font-sans text-foreground antialiased sm:pb-0">
      {/* Barra de topo */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5">
          <a href="#topo" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-[10px]" />
            <span className="text-xl font-extrabold">{BUSINESS.name}</span>
          </a>
          <nav className="flex items-center gap-6 text-[15px] font-medium">
            <a href="#precos" className="hidden sm:inline">
              Preços
            </a>
            <a href="#como" className="hidden sm:inline">
              Como funciona
            </a>
            <WhatsAppLink className="bg-citrus-dark px-4.5 py-2.5 text-white">
              Encomendar
            </WhatsAppLink>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        id="topo"
        className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-14 px-6 pb-20 pt-14 sm:pt-18"
      >
        <div className="min-w-0 flex-[1_1_460px]">
          <span className="inline-flex items-center gap-2 rounded-full bg-fresh-light px-3.5 py-1.5 text-sm font-bold text-fresh-dark">
            <MapPin className="h-3.5 w-3.5" />
            Entregas em {BUSINESS.area}
          </span>
          <h1 className="mt-5 text-[40px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-[56px]">
            As tuas compras do supermercado,{" "}
            <span className="text-fresh">à porta de casa.</span>
          </h1>
          <p className="mt-5 max-w-[520px] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Mandas a lista pelo WhatsApp, eu faço as compras com cuidado e
            entrego no horário combinado.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <WhatsAppLink className="bg-citrus-dark px-6.5 py-4 text-[17px] text-white">
              <MessageCircle className="h-5 w-5" />
              Enviar lista pelo WhatsApp
            </WhatsAppLink>
            <a
              href="#calculadora"
              className="inline-flex items-center rounded-full border-[1.5px] border-[#d9d5c7] bg-white px-5.5 py-4 text-[17px] font-bold"
            >
              Calcular preço
            </a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-muted-foreground">
            {[
              `Desde ${euros(PRICING.weekdays.fixed)} por entrega`,
              "Horário combinado contigo",
              "Pagamento simples e transparente",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-fresh" strokeWidth={2.5} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Conversa de exemplo */}
        <div className="flex min-w-0 flex-[1_1_380px] justify-center" aria-hidden="true">
          <div className="w-full max-w-[400px] rounded-[28px] bg-[#e9e4d6] p-3.5 shadow-[0_30px_60px_-30px_rgba(35,38,46,0.35)]">
            <div className="overflow-hidden rounded-[18px] bg-white">
              <div className="flex items-center gap-3 bg-fresh-dark px-4.5 py-3.5 text-white">
                <img src="/logo.png" alt="" className="h-9 w-9 rounded-full" />
                <div>
                  <div className="text-[15px] font-bold">
                    {BUSINESS.name} · Compras ao domicílio
                  </div>
                  <div className="text-xs opacity-85">online</div>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 bg-[#f3efe4] p-4.5 text-[15px] leading-snug">
                <div className="max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-[#dcf3d2] px-3.5 py-2.5">
                  Olá! Para amanhã à tarde:
                  <br />• 2 L leite meio-gordo
                  <br />• Pão de forma
                  <br />• 1 kg bananas
                  <br />• Iogurtes naturais (pack 4)
                </div>
                <div className="max-w-[80%] self-start rounded-[14px_14px_14px_4px] bg-white px-3.5 py-2.5">
                  Combinado! Que hora te dá mais jeito?
                </div>
                <div className="max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-[#dcf3d2] px-3.5 py-2.5">
                  Entre as 18h e as 19h
                </div>
                <div className="max-w-[80%] self-start rounded-[14px_14px_14px_4px] bg-white px-3.5 py-2.5">
                  Perfeito, até amanhã
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como" className="scroll-mt-16 border-y border-border bg-card">
        <div className="mx-auto max-w-[1120px] px-6 py-20">
          <Eyebrow>Como funciona</Eyebrow>
          <H2>Três passos, zero complicações.</H2>
          <div className="mt-11 grid gap-5 sm:grid-cols-3">
            <StepCard
              step={1}
              title="Envias a lista"
              description="Pelo WhatsApp, com ou sem marcas preferidas."
            />
            <StepCard
              step={2}
              title="Compro por ti"
              description="Escolho os produtos com o cuidado que terias tu."
            />
            <StepCard
              step={3}
              title="Entrego em casa"
              description={`À tua porta, na zona de ${BUSINESS.area}, no horário que combinámos.`}
            />
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="mx-auto max-w-[1120px] scroll-mt-16 px-6 pb-10 pt-22">
        <Eyebrow>Preços</Eyebrow>
        <H2>Uma taxa. Compras e entrega incluídas.</H2>
        <p className="mt-3 text-lg text-muted-foreground">
          Pagas o valor do talão mais a taxa de serviço.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <PriceCard
            title="Dias úteis"
            days="Seg – Sex"
            fixed={PRICING.weekdays.fixed}
            percent={PRICING.weekdays.percent}
          />
          <PriceCard
            title="Fins de semana"
            days="Sáb – Dom"
            fixed={PRICING.weekends.fixed}
            percent={PRICING.weekends.percent}
            dark
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card px-8 py-7">
            <h3 className="text-lg font-bold">Distância</h3>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {PRICING.distance.map((d) => (
                <Tile key={d.overKm} label={`Mais de ${d.overKm} km`} value={`+${euros(d.fee)}`} />
              ))}
              <Tile label={`Mais de ${PRICING.farKm} km`} value={farLabel} />
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card px-8 py-7">
            <h3 className="text-lg font-bold">Extras</h3>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Tile
                label={`Mais de ${PRICING.manyItems.over} artigos`}
                value={`+${euros(PRICING.manyItems.fee)}`}
              />
              <Tile label="Entrega urgente" value={`+${euros(PRICING.urgent)}`} highlight />
            </div>
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section id="calculadora" className="mx-auto max-w-[1120px] scroll-mt-16 px-6 pb-22 pt-10">
        <Calculator />
      </section>

      {/* Quem somos */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-12 px-6 py-20">
          <div className="min-w-0 flex-[1_1_420px]">
            <Eyebrow>Quem somos</Eyebrow>
            <H2>Um serviço local, feito por uma pessoa.</H2>
            <p className="mt-4.5 text-lg leading-relaxed text-muted-foreground">
              Sou eu que faço as compras e a entrega, em {BUSINESS.area}. Assim
              sei que recebes exactamente o que pediste, com a mesma atenção
              que terias se fosses tu ao supermercado.
            </p>
          </div>
          <div className="grid min-w-0 flex-[1_1_420px] grid-cols-2 gap-3.5">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-[18px] border border-border bg-background p-5.5">
                <Icon className="h-6.5 w-6.5 text-fresh" />
                <div className="mt-3 font-bold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-[1120px] px-6 py-20">
        <div className="rounded-[32px] bg-fresh-dark px-6 py-16 text-center text-white sm:px-10">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-[44px]">
            Pronto para poupar a ida ao supermercado?
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-lg leading-relaxed text-white/85">
            Manda a tua lista e combinamos tudo por mensagem. É o contacto mais
            rápido.
          </p>
          <WhatsAppLink className="mt-8 bg-white px-7.5 py-4 text-[17px] font-extrabold text-fresh-dark">
            <MessageCircle className="h-5 w-5" />
            Enviar lista pelo WhatsApp
          </WhatsAppLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-3 px-6 py-7 text-sm text-muted-foreground">
          <span>
            <strong className="text-foreground">{BUSINESS.name}</strong> ·
            Entregas de supermercado ao domicílio em {BUSINESS.area}
          </span>
          <span>
            © {new Date().getFullYear()} {BUSINESS.name}
          </span>
        </div>
      </footer>

      {/* Botão fixo no telemóvel */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 p-3 backdrop-blur-md sm:hidden">
        <WhatsAppLink className="w-full bg-citrus-dark px-5 py-4 text-base text-white">
          <MessageCircle className="h-5 w-5" />
          Enviar lista pelo WhatsApp
        </WhatsAppLink>
      </div>
    </main>
  );
}
