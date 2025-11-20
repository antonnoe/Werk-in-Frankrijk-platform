"use client";

import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import BeroepResult from "../components/BeroepResult";
import SectorButtons from "../components/SectorButtons";
// Importeer de JSON direct, maar cast het naar het juiste type voor veiligheid
import rawData from "../data/beroepen.json";
import { Beroep } from "../lib/types";

// Forceer TypeScript om de JSON als Beroep[] te zien
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

  // 2. Reset functie
  const handleReset = () => {
    setSelectedSector(null);
    setSelectedBeroep(null);
    setSearchQuery("");
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-[#800000] mb-2 text-center">
        Werk in Frankrijk
      </h1>
      <p className="text-center text-gray-600 mb-8">Beroepenchecker & Regelgeving</p>

      {/* Sector Knoppen */}
      <SectorButtons
        selectedSector={selectedSector}
        onSelect={(sec) => {
            setSelectedSector(sec);
            setSelectedBeroep(null);
        }}
      />

      {/* Zoekbalk - Let op: we geven GEEN searchQuery props door als de SearchBar die niet ondersteunt */}
      <div className="mt-6 relative">
        <SearchBar
          beroepen={sectorFiltered}
          onSelect={(b, queryText) => {
             setSelectedBeroep(b);
             if(queryText) setSearchQuery(queryText);
          }}
        />
      </div>

      {/* Reset Knop (alleen tonen als er iets geselecteerd is) */}
      {(selectedSector || selectedBeroep) && (
          <div className="text-center mt-4">
              <button 
                onClick={handleReset}
                className="text-sm text-gray-500 underline hover:text-[#800000]"
              >
                  Zoek opnieuw / Reset filters
              </button>
          </div>
      )}

      {/* Resultaat Weergave */}
      <div className="mt-8">
        {selectedBeroep ? (
          <BeroepResult beroep={selectedBeroep} />
        ) : (
          <div className="text-center text-gray-400 mt-10">
             {sectorFiltered.length} beroepen beschikbaar in deze selectie.
          </div>
        )}
      </div>
    </main>
  );
}
