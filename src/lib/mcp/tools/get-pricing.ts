import { defineTool } from "@lovable.dev/mcp-js";
import { BUSINESS } from "@/lib/business";

export default defineTool({
  name: "get_pricing",
  title: "Preços do serviço",
  description:
    "Devolve a taxa de serviço e entrega, o valor mínimo de compra e a zona de entrega.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const pricing = {
      service_fee: BUSINESS.serviceFee,
      minimum_order: BUSINESS.minimumOrder,
      delivery_area: BUSINESS.area,
      note: "O valor das compras em si é pago à parte, conforme combinado por WhatsApp.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(pricing, null, 2) }],
      structuredContent: pricing,
    };
  },
});
