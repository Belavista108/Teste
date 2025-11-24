import { GoogleGenAI } from "@google/genai";
import { Product, User } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  private modelId = 'gemini-2.5-flash';

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getChatResponse(
    message: string, 
    products: Product[], 
    user: User,
    history: { role: 'user' | 'model'; text: string }[]
  ): Promise<string> {
    
    // Prepare product context
    const productList = products.map(p => 
      `- ${p.name} (ID: ${p.id}): R$ ${p.price.toFixed(2)} | Categoria: ${p.category} | ${p.description}`
    ).join('\n');

    const systemInstruction = `
      Você é um assistente virtual inteligente para o "Portal do Cliente B2B".
      Seu objetivo é ajudar o cliente, Sr(a). ${user.name} da empresa ${user.company}, a encontrar produtos, tirar dúvidas sobre o catálogo e sugerir compras.
      
      Regras:
      1. Use um tom profissional, porém amigável e prestativo.
      2. Você tem acesso à lista de produtos abaixo. Use essas informações para responder sobre preços, especificações e disponibilidade.
      3. Se o cliente pedir uma recomendação, analise o contexto e sugira itens da lista.
      4. O limite de crédito do cliente é R$ ${user.creditLimit.toFixed(2)}, e ele já usou R$ ${user.usedCredit.toFixed(2)}. Avise se uma compra sugerida pode exceder o limite restante.
      5. Responda em Português do Brasil.
      6. Formate a resposta usando Markdown para melhor leitura (negrito para preços e nomes de produtos).

      Catálogo de Produtos Disponíveis:
      ${productList}
    `;

    try {
      // Create chat history format compatible with SDK if needed, 
      // but for generateContent we often just append context or use chat session.
      // Here we use generateContent for simplicity with system instructions in config.
      
      const chat = this.ai.chats.create({
        model: this.modelId,
        config: {
          systemInstruction: systemInstruction,
        },
        history: history.map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
        }))
      });

      const result = await chat.sendMessage({ message: message });
      return result.text || "Desculpe, não consegui processar sua solicitação no momento.";
      
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Ocorreu um erro ao conectar com o assistente inteligente. Por favor, tente novamente mais tarde.";
    }
  }
}

export const geminiService = new GeminiService();