"use client";

import { useState } from "react";
import { Beroep } from "../lib/types";

interface SearchBarProps {
  beroepen: Beroep[];
  onSelect: (beroep: Beroep | null, query: string) => void;
}

export default function SearchBar({ beroepen, onSelect }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const filtered =
    input.length === 0
      ? []
      : beroepen.filter((b) =>
          b.naam_nl.toLowerCase().includes(input.toLowerCase())
        );

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <input
        className="w-full rounded border border-gray-300 p-3 shadow-sm text-lg"
        placeholder="Zoek een beroep..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
      />

      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded shadow-lg max-h-72 overflow-auto z-20">
          {filtered.map((b) => (
            <button
              key={b.id}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                onSelect(b, b.naam_nl);
                setInput(b.naam_nl);
                setOpen(false);
              }}
            >
              {b.naam_nl} <span className="text-gray-500">({b.naam_fr})</span>
            </button>
          ))}
        </div>
      )}

      {input.length > 0 && (
        <button
          className="absolute right-3 top-3 text-gray-500"
          onClick={() => {
            setInput("");
            onSelect(null, "");
            setOpen(false);
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
