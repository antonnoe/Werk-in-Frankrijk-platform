"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Beroep } from "../lib/types";
import { X, Search } from "lucide-react"; // Zorg dat je lucide-react hebt, anders verwijder deze import en iconen

interface SearchBarProps {
  beroepen: Beroep[];
  onSelect: (b: Beroep | null, query: string) => void;
  searchQuery: string;              // Nieuw: we ontvangen de tekst van de parent
  setSearchQuery: (q: string) => void; // Nieuw: we kunnen de tekst updaten
}

export default function SearchBar({ 
  beroepen, 
  onSelect, 
  searchQuery, 
  setSearchQuery 
}: SearchBarProps) {
  
  const [isOpen, setIsOpen] = useState(false);

  // Configureer de zoekmachine (Fuse.js)
  const fuse = useMemo(() => {
    return new Fuse(beroepen, {
      keys: ["naamNl", "naamFr", "keywords", "categorie"],
      threshold: 0.3,
    });
  }, [beroepen]);

  // Bereken resultaten live
  const results = useMemo(() => {
      if (!searchQuery || searchQuery.trim() === "") return [];
      return fuse.search(searchQuery).map(r => r.item);
  }, [searchQuery, fuse]);

  // Functie om te wissen
  const handleClear = () => {
    setSearchQuery("");
    onSelect(null, "");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Input Veld */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
            type="text"
            className="w-full pl-10 pr-10 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#800000] focus:border-[#800000] outline-none transition-all text-lg"
            placeholder="Zoek een beroep (bijv. timmerman, arts)..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
        />
        {/* Kruisje (alleen zichtbaar als er tekst is) */}
        {searchQuery.length > 0 && (
            <button 
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#800000] transition-colors"
            >
                <X className="h-6 w-6" />
            </button>
        )}
      </div>

      {/* Resultaten Dropdown (Nu 2x zo hoog: max-h-96) */}
      {isOpen && searchQuery.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-2xl mt-2 z-50 max-h-96 overflow-y-auto">
            {results.length === 0 ? (
                <div className="p-4 text-gray-500 text-center italic">Geen beroepen gevonden. Probeer een andere term.</div>
            ) : (
                results.map((beroep) => (
                    <button
                        key={beroep.id}
                        className="w-full text-left p-4 hover:bg-red-50 border-b border-gray-100 last:border-0 transition-colors group"
                        onClick={() => {
                            // Hier zorgen we dat het zoekveld leeg wordt na selectie, zoals je vroeg
                            setSearchQuery(""); 
                            onSelect(beroep, ""); 
                            setIsOpen(false);
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-900 group-hover:text-[#800000] text-lg">
                                {beroep.naamNl}
                            </span>
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {beroep.categorie}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">{beroep.naamFr}</div>
                    </button>
                ))
            )}
        </div>
      )}
    </div>
  );
}
