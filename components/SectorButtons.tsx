"use client";

import React from "react";

interface SectorButtonsProps {
  selectedSector: string | null;
  onSelect: (sector: string | null) => void;
}

// Hier koppelen we het 'Label' (Mooi) aan de 'Value' (JSON data match)
// Dit zorgt dat de filter altijd 100% werkt.
const SECTOREN = [
  { label: "Horeca & Voeding", value: "horeca" },
  { label: "Toerisme & Verblijf", value: "toerisme" },
  { label: "Bouw & Techniek", value: "bouw" },
  { label: "Zorg & Welzijn", value: "zorg" },
  { label: "Handel & Retail", value: "commerce" }, // <--- NIEUW!
  { label: "Transport & Logistiek", value: "transport" }, // <--- NIEUW!
  { label: "Dienstverlening", value: "dienstverlening" },
  { label: "Landbouw & Groen", value: "agrarisch" },
  { label: "IT & Digitaal", value: "it" },
  { label: "Onderwijs", value: "onderwijs" },
  { label: "Kunst & Creatief", value: "creatief" }, // <--- NIEUW!
  { label: "Juridisch & Financieel", value: "administratif-juridique" }
];

export default function SectorButtons({
  selectedSector,
  onSelect,
}: SectorButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
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
          key={sector.value}
          onClick={() => onSelect(sector.value)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selectedSector === sector.value
              ? "bg-[#800000] text-white border-[#800000]"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {sector.label}
        </button>
      ))}
    </div>
  );
}
