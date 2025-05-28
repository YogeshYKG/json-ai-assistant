// # Hook for accessing JSON state

import { useStore } from "../store";

export const useJsonState = () => {
  const { jsonData, setJsonData, settings, setSettings } = useStore();

  return {
    jsonData,
    setJsonData: (data: string) => setJsonData(data),
    settings,
    toggleTheme: () => setSettings({ ...settings, theme: settings.theme === "dark" ? "light" : "dark" }),
  };
};