"use client";

import React from "react";

interface SectorButtonsProps {
  selectedSector: string | null;
  onSelect: (sector: string | null) => void;
}

// De hardcoded lijst voor de UI (komt overeen met je JSON data straks)
const SECTOREN = [
  "Horeca",
  "Toerisme",
  "Bouw",
  "Zorg",
  "Techniek",
  "Transport",
  "Dienstverlening",
  "Groen",
  "IT",
  "Onderwijs"
];

export default function SectorButtons({
  selectedSector,
  onSelect,
}: SectorButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
          selectedSector === null
            ? "bg-[#800000] text-white border-[#800000]"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
        }`}
      >
        Alle sectoren
      </button>

      {SECTOREN.map((sector) => (
        <button
          key={sector}
          onClick={() => onSelect(sector.toLowerCase())}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selectedSector === sector.toLowerCase()
              ? "bg-[#800000] text-white border-[#800000]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {sector}
        </button>
      ))}
    </div>
  );
}
