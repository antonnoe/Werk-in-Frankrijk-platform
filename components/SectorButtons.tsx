"use client";

interface SectorButtonsProps {
  selectedSector: string | null;
  onSelect: (sector: string | null) => void;
}

const SECTOREN = [
  "Toerisme & Verblijf",
  "Horeca (Restauration)",
  "Gezondheidszorg & Zorgverlening",
  "(Para)medisch & Zorgberoepen",
  "Bouw & Renovatie",
  "Installatie & Techniek",
  "Landbouw & Groene sector",
  "Dienstverlening & Ambachten",
  "Zakelijke dienstverlening",
  "Onderwijs & Cultuur",
];

export default function SectorButtons({
  selectedSector,
  onSelect,
}: SectorButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {SECTOREN.map((sector) => {
        const active = selectedSector === sector;

        return (
          <button
            key={sector}
            onClick={() => onSelect(active ? null : sector)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              active
                ? "bg-[#800000] text-white border-[#800000]"
                : "bg-white text-[#800000] border-[#800000]"
            }`}
          >
            {sector}
          </button>
        );
      })}
    </div>
  );
}
