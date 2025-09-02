import { GoogleGenAI, Type } from "@google/genai";
import type { ReceiptData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully,
  // perhaps disabling the feature or showing a clear error message.
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    vendorName: {
      type: Type.STRING,
      description: "The name of the store or vendor.",
    },
    transactionDate: {
      type: Type.STRING,
      description: "The date of the transaction in YYYY-MM-DD format.",
    },
    totalAmount: {
      type: Type.NUMBER,
      description: "The final total amount of the receipt.",
    },
    items: {
      type: Type.ARRAY,
      description: "A list of items purchased.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the purchased item.",
          },
          price: {
            type: Type.NUMBER,
            description: "The price of the single item.",
          },
          quantity: {
            type: Type.INTEGER,
            description: "The quantity of the item purchased.",
          },
        },
        required: ["name", "price", "quantity"]
      },
    },
  },
  required: ["vendorName", "transactionDate", "totalAmount", "items"],
};


export async function* extractReceiptDataStream(receiptText: string): AsyncGenerator<string> {
  try {
    const prompt = `
      Extract the vendor name, transaction date, total amount, and a list of all purchased items from the following receipt text.
      For the date, format it as YYYY-MM-DD. If a year is not present, assume the current year.
      If a value is not found, use a sensible default (e.g., empty string for vendor, null for total, empty array for items).
      Ensure the output is a valid JSON object matching the provided schema.

      Receipt Text:
      """
      ${receiptText}
      """
    `;

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    for await (const chunk of responseStream) {
        yield chunk.text;
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('SAFETY')) {
        throw new Error('The request was blocked due to safety settings. Please check your input.');
    }
    throw new Error("Failed to stream data from the AI. The API may be unavailable or the request timed out.");
  }
};