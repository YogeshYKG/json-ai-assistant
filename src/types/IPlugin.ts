export interface IPlugin {
  id: string; // Unique plugin ID
  name: string; // Display name (e.g., "Custom Validator")
  type: "sidebar" | "toolbar"; // Where plugin appears
  action: () => void; // Plugin functionality
}