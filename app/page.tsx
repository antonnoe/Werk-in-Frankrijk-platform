"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BeroepResult from "../components/BeroepResult";
import { Beroep } from "../lib/types";
import { getBeroepen } from "../lib/getBeroepen";
import { searchBeroepen } from "../lib/search";
import SectorButtons from "../components/SectorButtons";
import { sectors } from "../lib/sectors";

export default function HomePage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null);

  const beroepen = getBeroepen();

  // Sectorfilter
  const sectorFiltered =
    selectedSector === null
      ? beroepen
      : beroepen.filter((b) => b.categorie === selectedSector);

  // Zoekfilter
  const searchResults =
    query.trim().length > 0
      ? searchBeroepen(sectorFiltered, query)
      : sectorFiltered;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-red-900">
        Beroepenchecker Frankrijk
      </h1>

      {/* Sector-knoppen */}
      <SectorButtons
        sectors={sectors}
        selectedSector={selectedSector}
        onSelect={setSelectedSector}
      />

      {/* Zoekbalk */}
      <SearchBar
        beroepen={sectorFiltered}
        onSelect={(b, q) => {
          setSelectedBeroep(b);
          setQuery(q);
        }}
        searchQuery={query}
        setSearchQuery={setQuery}
      />

      {/* Resultaten */}
      <div className="mt-6">
        {selectedBeroep ? (
          <BeroepResult beroep={selectedBeroep} />
        ) : (
          <p className="text-gray-600 text-sm">
            {searchResults.length} beroepen gevonden
          </p>
        )}
      </div>
    </div>
  );
}
