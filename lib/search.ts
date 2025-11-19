// /lib/search.ts
"use client";

import Fuse from "fuse.js";
import type { Beroep } from "./types";

export function searchBeroepen(beroepen: Beroep[], query: string): Beroep[] {
  if (!query.trim()) return [];

  const fuse = new Fuse(beroepen, {
    keys: [
      "naamNl",
      "naamFr",
      "categorie",
      "omschrijving",
      "keywords"
    ],
    threshold: 0.3,
  });

  return fuse.search(query).map(result => result.item);
}
