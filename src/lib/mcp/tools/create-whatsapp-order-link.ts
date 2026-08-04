import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { whatsappLink } from "@/lib/business";

export default defineTool({
  name: "create_whatsapp_order_link",
  title: "Criar link de encomenda WhatsApp",
  description:
    "Cria um link de WhatsApp pré-preenchido com a lista de compras, para o cliente enviar a encomenda numa conversa.",
  inputSchema: {
    items: z
      .array(z.string())
      .describe("Lista de produtos a encomendar, um por linha."),
    notes: z
      .string()
      .optional()
      .describe("Notas opcionais, por exemplo horário de entrega preferido."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ items, notes }) => {
    const list = items.map((item) => item.trim()).filter(Boolean);
    if (list.length === 0) {
      throw new ToolError("É necessário indicar pelo menos um produto.");
    }
    const message = [
      "Olá, gostava de fazer uma encomenda de supermercado:",
      ...list.map((item) => `- ${item}`),
      ...(notes?.trim() ? ["", `Notas: ${notes.trim()}`] : []),
    ].join("\n");

    const url = whatsappLink(message);
    return {
      content: [{ type: "text", text: url }],
      structuredContent: { url, items: list },
    };
  },
});
