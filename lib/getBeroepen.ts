// /lib/getBeroepen.ts
// PRO-release: converteert JSON automatisch naar camelCase + veilig typen

import { Beroep } from "./types";
import beroepenJson from "../data/beroepen.json";

// Utility: snake_case -> camelCase
function toCamelCase(key: string): string {
  return key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

// Utility: normalise een beroep-object
function normalizeBeroep(raw: any): Beroep {
  const normalized: any = {};

  for (const key of Object.keys(raw)) {
    const camelKey = toCamelCase(key);
    normalized[camelKey] = raw[key];
  }

  return normalized as Beroep;
}

// Publieke functie om alle beroepen op te halen
export function getBeroepen(): Beroep[] {
  try {
    if (!Array.isArray(beroepenJson)) {
      console.error("❌ DATA FOUT: beroepen.json is geen array.");
      return [];
    }

    return beroepenJson.map((b: any) => normalizeBeroep(b));
  } catch (err) {
    console.error("❌ FOUT bij laden van beroepen:", err);
    return [];
  }
}
