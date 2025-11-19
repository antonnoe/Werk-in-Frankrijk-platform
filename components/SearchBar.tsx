"use client";

import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Beroep } from "../lib/types";

interface SearchBarProps {
  beroepen: Beroep[];
  onSelect: (b: Beroep | null, q: string) => void;
}

export default function SearchBar({ beroepen, onSelect }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Beroep[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fuse.js options for fuzzy search
  const fuse = new Fuse(beroepen, {
    keys: ["naamNl", "naamFr", "categorie", "keywords"],
    threshold: 0.35,
  });

  useEffect(() => {
    if (!input.trim()) {
      setResults([]);
      onSelect(null, "");
      return;
    }

    const search = fuse.search(input).map((r) => r.item);
    setResults(search);
  }, [input, beroepen]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setIsOpen(true);
        }}
        placeholder="Zoek een beroep…"
        className="w-full border border-gray-400 rounded-lg px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-700"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-72 overflow-y-auto z-50">
          {results.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setInput(b.naamNl);
                setIsOpen(false);
                onSelect(b, b.naamNl);
              }}
              className="block w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0"
            >
              <div className="font-semibold">{b.naamNl}</div>
              <div className="text-sm text-gray-600">{b.naamFr}</div>
            </button>
          ))}
        </div>
      )}

      {isOpen && input && results.length === 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow px-4 py-3 text-gray-600 text-sm">
          Geen resultaten gevonden…
        </div>
      )}
    </div>
  );
}
