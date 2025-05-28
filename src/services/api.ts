import { IJsonData } from "../types/IJsonData";

export const parseJson = async (json: string): Promise<IJsonData> => {
  try {
    const parsed = JSON.parse(json);
    return { raw: json, parsed, errors: [] };
  } catch (error) {
    return { raw: json, parsed: null, errors: ["Invalid JSON syntax"] };
  }
};

// Placeholder for AI API (e.g., https://x.ai/api)
export const getAiSuggestions = async (json: string) => {
  // Mock response; replace with real API call
  return { fixes: [], explanation: "No suggestions available" };
};