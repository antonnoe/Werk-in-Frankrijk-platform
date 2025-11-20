"use client";

import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import BeroepResult from "../components/BeroepResult";
import SectorButtons from "../components/SectorButtons";
import rawData from "../data/beroepen.json";
import { Beroep } from "../lib/types";

const beroepenData = rawData as unknown as Beroep[];

type FilterType = "alles" | "loondienst" | "ondernemer";

export default function HomePage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("alles");

  // 1. Filter logica (Sector + Type)
  const filteredList = useMemo(() => {
    let data = beroepenData;

    // Stap A: Filter op sector
    if (selectedSector) {
      data = data.filter((b) => 
        b.sectoren && b.sectoren.map(s => s.toLowerCase()).includes(selectedSector.toLowerCase())
      );
    }

    // Stap B: Filter op type (Loondienst vs Ondernemer)
    if (filterType === "ondernemer") {
      data = data.filter(b => b.autoentrepreneurMogelijk === true);
    } else if (filterType === "loondienst") {
      // We nemen aan: als AE niet mogelijk is, is het loondienst, 
      // OF als het expliciet loondienst is (maar vaak kunnen beide, dus dit is een zachte filter)
      // Voor nu: toon alles behalve pure business-only, of simpelweg alles.
      // Een strikte filter zou zijn:
      // data = data.filter(b => !b.autoentrepreneurMogelijk); 
      // Maar veel beroepen kunnen beide. Laten we filteren op wat 'typisch' is of gewoon alles tonen.
    }

    return data;
  }, [selectedSector, filterType]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 min-h-screen bg-[#f8f9fa]">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#800000] mb-3 tracking-tight">
          Werk in Frankrijk
        </h1>
        <p className="text-lg text-gray-600">
            De gids voor beroepen, inschrijvingen (CMA/URSSAF) en diploma-eisen.
        </p>
      </div>

      {/* Sector Knoppen */}
      <SectorButtons
        selectedSector={selectedSector}
        onSelect={(sec) => {
            setSelectedSector(sec);
            setSelectedBeroep(null); 
        }}
      />

      {/* Type Filter (Loondienst / Ondernemer) */}
      <div className="flex justify-center gap-4 mb-6 text-sm">
          <button 
            onClick={() => setFilterType("alles")}
            className={`px-4 py-1 rounded-full border ${filterType === 'alles' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
          >
            Alles
          </button>
          <button 
            onClick={() => setFilterType("ondernemer")}
            className={`px-4 py-1 rounded-full border ${filterType === 'ondernemer' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}`}
          >
            Zelfstandig / Auto-entrepreneur
          </button>
      </div>

      {/* Zoekbalk */}
      <div className="mb-8">
        <SearchBar
          beroepen={filteredList}
          searchQuery={searchQuery}          
          setSearchQuery={setSearchQuery}    
          onSelect={(b) => setSelectedBeroep(b)}
        />
      </div>

      {/* Resultaat Weergave */}
      <div className="mt-8">
        {selectedBeroep ? (
          <BeroepResult beroep={selectedBeroep} />
        ) : (
           // Nieuw: Toon lijst als er een sector is gekozen maar nog geen specifiek beroep
           selectedSector && !searchQuery ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4">
                  {filteredList.map(b => (
                      <div 
                        key={b.id}
                        onClick={() => setSelectedBeroep(b)}
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#800000] cursor-pointer shadow-sm hover:shadow-md transition-all"
                      >
                          <h3 className="font-bold text-[#800000]">{b.naamNl}</h3>
                          <p className="text-sm text-gray-500 italic">{b.naamFr}</p>
                          <div className="flex gap-2 mt-2 text-xs">
                              {b.autoentrepreneurMogelijk && (
                                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">Ondernemer</span>
                              )}
                              {b.registratieInstantie && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">{b.registratieInstantie}</span>
                              )}
                          </div>
                      </div>
                  ))}
                  {filteredList.length === 0 && (
                      <p className="text-center text-gray-500 col-span-2">Geen beroepen gevonden in deze categorie.</p>
                  )}
              </div>
           ) : (
              !searchQuery && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
                    <p className="text-gray-400 mb-2">Selecteer een sector hierboven om te beginnen</p>
                </div>
              )
           )
        )}
      </div>
    </main>
  );
}
