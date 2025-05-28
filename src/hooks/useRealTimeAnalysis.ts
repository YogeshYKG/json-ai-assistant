// # Hook for real-time JSON analysis

import { useEffect, useState } from "react";
import { parseJson } from "../services/api";
import { IJsonData } from "../types/IJsonData";

export const useRealTimeAnalysis = (json: string) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const analyze = async () => {
      try {
        const result = await parseJson(json);
        setErrors(result.errors || []);
        setSuggestions(result.suggestions || []);
      } catch (error) {
        setErrors(["Invalid JSON"]);
      }
    };
    const timer = setTimeout(analyze, 500); // Debounce for performance
    return () => clearTimeout(timer);
  }, [json]);

  return { errors, suggestions };
};