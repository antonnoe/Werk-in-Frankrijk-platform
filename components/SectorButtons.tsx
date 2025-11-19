"use client";

import React from "react";
import { cn } from "../lib/utils";

interface Sector {
  id: string;
  label: string;
}

interface SectorButtonsProps {
  sectors: Sector[];
  selectedSector: string | null;
  onSelect: (sectorId: string | null) => void;
}

export default function SectorButtons({
  sectors,
  selectedSector,
  onSelect,
}: SectorButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-2 rounded-full border text-sm font-medium",
          selectedSector === null
            ? "bg-red-900 text-white border-red-900"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
        )}
      >
        Alle sectoren
      </button>

      {sectors.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={cn(
            "px-4 py-2 rounded-full border text-sm font-medium transition",
            selectedSector === s.id
              ? "bg-red-900 text-white border-red-900"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
