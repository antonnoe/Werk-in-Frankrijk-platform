"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Beroep } from "../lib/types";

interface SearchBarProps {
  beroepen: Beroep[];
  onSelect: (b: Beroep | null, q: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function SearchBar({
  beroepen,
  onSelect,
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(beroepen, {
      keys: ["naamNl", "naamFr", "categorie", "keywords"],
      threshold: 0.3,
    });
  }, [beroepen]);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return fuse.search(searchQuery).map((r) => r.item);
  }, [searchQuery, fuse]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        placeholder="Zoek een beroep..."
        className="w-full border rounded px-3 py-2"
        onFocus={() => setOpen(true)}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {open && results.length > 0 && (
        <div
          className="absolute mt-1 w-full bg-white border rounded shadow-lg overflow-y-auto z-20"
          style={{ maxHeight: "400px" }}
        >
          {results.map((b) => (
            <div
              key={b.id}
              onClick={() => {
                onSelect(b, searchQuery);
                setOpen(false);
              }}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
            >
              <strong>{b.naamNl}</strong>
              <div className="text-xs text-gray-500">{b.categorie}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
