import { defineTool } from "@lovable.dev/mcp-js";
import { BUSINESS, whatsappLink } from "@/lib/business";

export default defineTool({
  name: "get_business_info",
  title: "Informação do negócio",
  description:
    "Devolve a informação pública do serviço de compras e entregas ao domicílio: nome, zona de entrega, como funciona e contacto de WhatsApp.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: BUSINESS.name,
      area: BUSINESS.area,
      concept:
        "Serviço de personal shopper: o cliente envia a lista de compras, nós compramos no supermercado e entregamos em casa. Não há stock próprio.",
      how_it_works: [
        "O cliente envia a lista de compras por WhatsApp.",
        "Fazemos as compras no supermercado, com atenção à frescura e às marcas preferidas.",
        `Entregamos em casa na zona de ${BUSINESS.area}, no horário combinado.`,
      ],
      whatsapp: whatsappLink(),
      ordering: "Todas as encomendas são feitas manualmente por WhatsApp — não existe carrinho nem checkout online.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
