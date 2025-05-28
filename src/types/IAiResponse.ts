export interface IAiResponse {
  fixes: { line: number; suggestion: string }[]; // AI-suggested fixes
  explanation: string; // Markdown explanation for fixes
}