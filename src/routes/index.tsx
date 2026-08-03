import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  ShoppingBasket,
  Truck,
  HandCoins,
  MapPin,
  CheckCircle2,
  Leaf,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Compras em Casa - Entregas de Supermercado ao Domicílio",
      },
      {
        name: "description",
        content:
          "Fazemos as tuas compras de supermercado em Lisboa e entregamos-te em casa. Serviço de personal shopper rápido e de confiança.",
      },
      {
        property: "og:title",
        content: "Compras em Casa - Entregas de Supermercado ao Domicílio",
      },
      {
        property: "og:description",
        content:
          "Fazemos as tuas compras de supermercado em Lisboa e entregamos-te em casa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANTE: Substitui estes dados pelos teus antes de publicar.
const BUSINESS = {
  name: "Compras em Casa",
  phone: "351912345678", // substituir pelo teu número com indicativo 351
  area: "Gaia",
  serviceFee: "5,00 €",
  minimumOrder: "30,00 €",
  extraDistance: "2,00 €",
};

const WHATSAPP_TEXT = encodeURIComponent(
  "Olá, gostava de fazer uma encomenda de supermercado."
);
const WHATSAPP_LINK = `https://wa.me/${BUSINESS.phone}?text=${WHATSAPP_TEXT}`;

function WhatsAppButton({
  size = "default",
  className = "",
}: {
  size?: "default" | "large";
  className?: string;
}) {
  const large = size === "large";
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]",
        large
          ? "bg-citrus px-6 py-4 text-base shadow-citrus/30 w-full sm:w-auto"
          : "bg-citrus px-5 py-3 text-sm shadow-citrus/25",
        className,
      ].join(" ")}
    >
      <MessageCircle className={large ? "h-5 w-5" : "h-4 w-4"} />
      Contactar via WhatsApp
    </a>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={["px-4 py-16 sm:py-20", className].join(" ")}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

function StepCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fresh-light text-fresh-dark">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-fresh" />
        <div>
          <p className="font-medium text-foreground">{label}</p>
          {note ? (
            <p className="text-xs leading-relaxed text-muted-foreground">{note}</p>
          ) : null}
        </div>
      </div>
      <p className="shrink-0 text-lg font-bold text-fresh sm:text-right">
        {value}
      </p>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background pb-28 font-sans text-foreground antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-fresh-light/40 to-background px-4 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-fresh text-primary-foreground shadow-lg shadow-fresh/20">
            <ShoppingBasket className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {BUSINESS.name}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Fazemos as tuas compras de supermercado e entregamos-te em casa.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton size="large" />
          </div>
        </div>
      </section>

      {/* Quem somos / Como funciona */}
      <Section id="como-funciona">
        <div className="text-center">
          <span className="inline-block rounded-full bg-fresh-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fresh-dark">
            Como funciona
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            O teu personal shopper no supermercado
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Não tens stock em casa? Não precisas. Nós compramos tudo no
            supermercado por ti — produtos frescos, marcas que gostas e
            alternativas quando algo falta.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StepCard
            icon={MessageCircle}
            title="Envias a lista"
            description="Manda-nos a tua lista por WhatsApp, com ou sem marcas preferidas."
          />
          <StepCard
            icon={ShoppingBasket}
            title="Compramos por ti"
            description="Seleccionamos os produtos com cuidado, como se fossem para nós."
          />
          <StepCard
            icon={Truck}
            title="Entregamos em casa"
            description="Levamos as compras à tua porta na zona de Lisboa, no horário combinado."
          />
        </div>

        <div className="mt-10 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-8">
          <h3 className="text-xl font-semibold text-foreground">Quem somos</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Somos um serviço local de entregas de supermercado em{" "}
            <strong className="text-foreground">{BUSINESS.area}</strong>. O
            próprio dono do negócio trata pessoalmente das compras e da
            entrega, para garantir que recebes exactamente o que pediste — com
            a mesma atenção que terias se fosses tu ao supermercado.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
              <Leaf className="h-5 w-5 text-fresh" />
              <span className="text-sm font-medium text-secondary-foreground">
                Frescura garantida
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
              <Clock className="h-5 w-5 text-fresh" />
              <span className="text-sm font-medium text-secondary-foreground">
                Entrega no horário combinado
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
              <HandCoins className="h-5 w-5 text-fresh" />
              <span className="text-sm font-medium text-secondary-foreground">
                Pagamento simples e transparente
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
              <MapPin className="h-5 w-5 text-fresh" />
              <span className="text-sm font-medium text-secondary-foreground">
                Serviço local em {BUSINESS.area}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Preços */}
      <Section id="precos" className="bg-secondary/50">
        <div className="text-center">
          <span className="inline-block rounded-full bg-fresh-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fresh-dark">
            Preços
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simples e sem surpresas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Pagas apenas pela taxa de serviço e entrega. O valor das compras é
            pago à parte, conforme combinarmos.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          <PriceRow
            label="Taxa de serviço + entrega"
            value={BUSINESS.serviceFee}
            note="Por encomenda, dentro da zona de entrega."
          />
          <PriceRow
            label="Valor mínimo de compra"
            value={BUSINESS.minimumOrder}
            note="Encomendas abaixo deste valor podem não ser aceites."
          />
          <PriceRow
            label="Zona de entrega e custos extra"
            value={`+ ${BUSINESS.extraDistance}`}
            note={`Entregamos em ${BUSINESS.area}. Zonas mais afastadas podem ter um custo extra de ${BUSINESS.extraDistance}.`}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Nota:</strong> o valor das
            compras em si é pago à parte — reembolsado por transferência ou na
            entrega, conforme o modelo que combinarmos. Enviamos-te sempre o
            resumo do supermercado antes de pagares.
          </p>
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contacto">
        <div className="rounded-3xl bg-gradient-to-br from-fresh to-leaf p-8 text-center text-primary-foreground shadow-xl shadow-fresh/15 sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <MessageCircle className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Faz a tua encomenda pelo WhatsApp
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-foreground/90">
            É o contacto mais rápido. Manda-nos a tua lista e combinamos tudo por
            mensagem.
          </p>
          <div className="mt-8">
            <WhatsAppButton
              size="large"
              className="mx-auto bg-white text-fresh-dark hover:bg-white/95"
            />
          </div>
          <p className="mt-4 text-sm text-primary-foreground/80">
            Resposta em breve, normalmente no mesmo dia.
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold text-foreground">{BUSINESS.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Entregas de supermercado ao domicílio em {BUSINESS.area}.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BUSINESS.name}. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp button (mobile) / compact action (desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:bottom-6 sm:left-auto sm:right-6 sm:p-0">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-citrus px-5 py-4 text-base font-semibold text-accent-foreground shadow-2xl shadow-citrus/30 transition-transform hover:scale-[1.02] active:scale-[0.98] whatsapp-pulse sm:hidden"
        >
          <MessageCircle className="h-5 w-5" />
          Contactar via WhatsApp
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar via WhatsApp"
          className="hidden h-14 w-14 items-center justify-center rounded-full bg-citrus text-accent-foreground shadow-2xl shadow-citrus/30 transition-transform hover:scale-110 active:scale-95 whatsapp-pulse sm:flex"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
    </main>
  );
}
