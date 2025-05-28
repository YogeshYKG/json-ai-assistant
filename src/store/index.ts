import { create } from "zustand";
import { IJsonData } from "../types/IJsonData";

interface State {
  jsonData: IJsonData;
  setJsonData: (raw: string) => void;
  settings: { theme: "light" | "dark" };
  setSettings: (settings: Partial<State["settings"]>) => void;
}

export const useStore = create<State>((set) => ({
  jsonData: { raw: "", parsed: null },
  setJsonData: (raw) => set((state) => ({
    jsonData: { ...state.jsonData, raw, parsed: JSON.parse(raw) || null },
  })),
  settings: { theme: "dark" },
  setSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
}));