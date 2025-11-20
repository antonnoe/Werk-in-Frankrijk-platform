"use client";

import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import BeroepResult from "../components/BeroepResult";
import SectorButtons from "../components/SectorButtons";
import rawData from "../data/beroepen.json";
import { Beroep } from "../lib/types";

const beroepenData = rawData as unknown as Beroep[];

export default function HomePage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Filter op sector
  const sectorFiltered = useMemo(() => {
    if (!selectedSector) return beroepenData;
    return beroepenData.filter((b) => 
      b.sectoren && b.sectoren.includes(selectedSector)
    );
  }, [selectedSector]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 min-h-screen bg-[#f8f9fa]">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#800000] mb-3 tracking-tight">
          Werk in Frankrijk
        </h1>
        <p className="text-lg text-gray-600">
            Officiële informatie over beroepseisen, diploma's en regelgeving.
        </p>
      </div>

      {/* Sector Knoppen */}
      <SectorButtons
        selectedSector={selectedSector}
        onSelect={(sec) => {
            setSelectedSector(sec);
            setSelectedBeroep(null); // Reset resultaat bij wisselen sector
        }}
      />

      {/* Zoekbalk (Sticky effect optioneel, nu gewoon clean) */}
      <div className="mt-8 mb-6">
        <SearchBar
          beroepen={sectorFiltered}
          searchQuery={searchQuery}          // We geven de state door
          setSearchQuery={setSearchQuery}    // We geven de controle door
          onSelect={(b) => {
             setSelectedBeroep(b);
             // SearchQuery wordt al geleegd in de SearchBar component zelf
          }}
        />
      </div>

      {/* Resultaat Weergave */}
      <div className="mt-8">
        {selectedBeroep ? (
          <BeroepResult beroep={selectedBeroep} />
        ) : (
            // Welkomst / Lege staat
           !searchQuery && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
                  <p className="text-gray-400 mb-2">Selecteer een sector of zoek een beroep</p>
                  <p className="text-sm text-gray-300">
                      {sectorFiltered.length} beroepen in huidige selectie
                  </p>
              </div>
           )
        )}
      </div>
    </main>
  );
}
