// /components/SearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { getBeroepen } from "../lib/getBeroepen";
import { Beroep } from "../lib/types";

interface SearchBarProps {
  onSelect: (b: Beroep | null) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Beroep[]>([]);
  const [allBeroepen, setAllBeroepen] = useState<Beroep[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setAllBeroepen(getBeroepen());
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      onSelect(null);
      return;
    }

    const q = query.toLowerCase();

    const filtered = allBeroepen.filter((b) => {
      const naamNl = b.naamNl?.toLowerCase() || "";
      const naamFr = b.naamFr?.toLowerCase() || "";
      const keywords = b.keywords?.join(" ").toLowerCase() || "";
      return (
        naamNl.includes(q) ||
        naamFr.includes(q) ||
        keywords.includes(q)
      );
    });

    setResults(filtered.slice(0, 12));
    setShowDropdown(true);
  }, [query, allBeroepen, onSelect]);

  // Tooltip SVG
  const InfoIcon = () => (
    <svg
      className="w-4 h-4 inline-block ml-1 text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );

  // Tooltip wrapper
  const Tooltip = ({ text }: { text: string }) => (
    <span className="relative group cursor-help">
      <InfoIcon />
      <span className="
        absolute left-1/2 top-full mt-1 w-max max-w-xs
        -translate-x-1/2 px-3 py-2 rounded-md shadow-lg
        bg-black text-white text-xs opacity-0
        group-hover:opacity-100 group-focus-within:opacity-100
        transition-opacity
        z-50
      ">
        {text}
      </span>
    </span>
  );

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 relative">
      <label className="block font-semibold text-gray-800 mb-1">
        Zoek een beroep in Frankrijk
        <Tooltip text="Typ een Nederlands of Frans beroep, of een trefwoord." />
      </label>

      <input
        type="text"
        className="
          w-full border border-gray-300 rounded-md px-4 py-3
          focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900
          text-lg shadow-sm
        "
        placeholder="Bijv. kok, gîte, tuinman, masseur, verpleegkundige…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <ul
          className="
            absolute z-40 left-0 right-0 bg-white border border-gray-300 
            rounded-md mt-1 shadow-lg max-h-64 overflow-y-auto
          "
        >
          {results.map((b) => (
            <li
              key={b.id}
              onClick={() => {
                setQuery(b.naamNl || "");
                setShowDropdown(false);
                onSelect(b);
              }}
              className="
                px-4 py-3 border-b border-gray-100 cursor-pointer
                hover:bg-gray-100 transition-colors
              "
            >
              <div className="font-medium">
                {b.naamNl}
              </div>
              <div className="text-sm text-gray-600">{b.naamFr}</div>

              <div className="flex gap-2 mt-1 flex-wrap">
                {b.categorie && (
                  <span className="text-xs px-2 py-1 bg-red-900 text-white rounded">
                    {b.categorie}
                  </span>
                )}
                {b.taalvereiste && (
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                    Taal: {b.taalvereiste}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
