"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Beroep } from "../lib/types";

interface SearchBarProps {
  beroepen: Beroep[];
  onSelect: (b: Beroep | null, query: string) => void;
}

export default function SearchBar({ beroepen, onSelect }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(beroepen, {
      keys: ["naamNl", "naamFr", "keywords", "categorie"],
      threshold: 0.3,
    });
  }, [beroepen]);

  const results = useMemo(() => {
      if (!input) return [];
      return fuse.search(input).map(r => r.item);
  }, [input, fuse]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#800000] outline-none"
        placeholder="Zoek een beroep (bijv. kok, arts, timmerman)..."
        value={input}
        onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {/* Resultaten Dropdown */}
      {isOpen && input.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-xl mt-1 z-50 max-h-96 overflow-y-auto">
            {results.length === 0 ? (
                <div className="p-4 text-gray-500">Geen resultaten gevonden.</div>
            ) : (
                results.map((beroep) => (
                    <button
                        key={beroep.id}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b last:border-0 transition-colors"
                        onClick={() => {
                            setInput(beroep.naamNl);
                            onSelect(beroep, beroep.naamNl);
                            setIsOpen(false);
                        }}
                    >
                        <div className="font-bold text-[#800000]">{beroep.naamNl}</div>
                        <div className="text-sm text-gray-600">{beroep.naamFr}</div>
                    </button>
                ))
            )}
        </div>
      )}
    </div>
  );
}
