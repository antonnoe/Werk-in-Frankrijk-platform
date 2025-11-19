"use client";

import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import BeroepResult from "../components/BeroepResult";
import SectorButtons from "../components/SectorButtons";
import { Beroep } from "../lib/types";
import beroepenData from "../data/beroepen.json";

export default function HomePage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null);
  const [query, setQuery] = useState("");

  // ⭐ Filter beroepen op sector (indien gekozen)
  const sectorFiltered: Beroep[] = useMemo(() => {
    if (!selectedSector) return beroepenData as Beroep[];
    return (beroepenData as Beroep[]).filter((b) =>
      b.sectoren?.includes(selectedSector)
    );
  }, [selectedSector]);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-red-900 mb-6">
        Werk in Frankrijk – Beroepenchecker
      </h1>

      {/* ⭐ Sector knoppen */}
      <SectorButtons
        selected={selectedSector}
        onSelect={setSelectedSector}
      />

      {/* ⭐ Zoekbalk */}
      <div className="mt-6">
        <SearchBar
          beroepen={sectorFiltered}
          onSelect={(b, q) => {
            setSelectedBeroep(b);
            setQuery(q);
          }}
        />
      </div>

      {/* ⭐ Resultaat */}
      <div className="mt-6">
        {selectedBeroep ? (
          <BeroepResult beroep={selectedBeroep} />
        ) : query.length > 0 ? (
          <p className="text-gray-600 mt-4">
            Geen beroep gevonden dat past bij: <strong>{query}</strong>
          </p>
        ) : (
          <p className="text-gray-500 mt-4">
            Selecteer een sector of gebruik de zoekbalk.
          </p>
        )}
      </div>
    </main>
  );
}
