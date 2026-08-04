import { defineMcp } from "@lovable.dev/mcp-js";
import getBusinessInfo from "./tools/get-business-info";
import getPricing from "./tools/get-pricing";
import createWhatsappOrderLink from "./tools/create-whatsapp-order-link";

export default defineMcp({
  name: "seu-super-amigo",
  title: "Seu Super Amigo",
  version: "0.1.0",
  instructions:
    "Tools do serviço de compras de supermercado e entrega ao domicílio. Usa `get_business_info` para saber como funciona e a zona de entrega, `get_pricing` para taxas e valor mínimo, e `create_whatsapp_order_link` para gerar um link de WhatsApp já preenchido com a lista de compras. As encomendas são sempre finalizadas manualmente por WhatsApp.",
  tools: [getBusinessInfo, getPricing, createWhatsappOrderLink],
});
