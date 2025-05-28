export interface IJsonData {
  raw: string; // Raw JSON string from Editor
  parsed: Record<string, any> | null; // Parsed JSON object
  errors?: string[]; // Validation errors
}