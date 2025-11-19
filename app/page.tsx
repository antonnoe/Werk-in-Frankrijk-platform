"use client";

import { useState, useMemo } from "react";
import beroepenDataRaw from "../data/beroepen.json";
import { Beroep } from "../lib/types";
import SearchBar from "../components/SearchBar";
import SectorButtons from "../components/SectorButtons";

export default function HomePage() {
  const beroepenData = beroepenDataRaw as Beroep[];

  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null);
  const [query, setQuery] = useState("");

  // ⭐ Filter op sector
  const sectorFiltered: Beroep[] = useMemo(() => {
    if (!selectedSector) return beroepenData;

    return beroepenData.filter((b) => {
      return b.categorie === selectedSector;
    });
  }, [selectedSector, beroepenData]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-[#800000]">
        Werk in Frankrijk – Beroepenchecker (v0.2)
      </h1>

      <SectorButtons
        selectedSector={selectedSector}
        onSelect={(s) => {
          setSelectedSector(s);
          setSelectedBeroep(null);
        }}
      />

      <SearchBar
        beroepen={sectorFiltered}
        onSelect={(b) => setSelectedBeroep(b)}
        searchQuery={query}
        setSearchQuery={setQuery}
      />

      {/* Reset button */}
      {(selectedBeroep || selectedSector || query) && (
        <button
          onClick={() => {
            setSelectedBeroep(null);
            setSelectedSector(null);
            setQuery("");
          }}
          className="mt-3 mb-4 px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-sm"
        >
          Zoek opnieuw
        </button>
      )}

      {/* Result: detail van beroep */}
      {selectedBeroep && (
        <div className="border rounded p-4 mt-4 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-[#800000]">
            {selectedBeroep.naamNl}
          </h2>
          <div className="text-sm text-gray-500 mb-2">
            {selectedBeroep.categorie}
          </div>

          <p className="mb-3">{selectedBeroep.omschrijving}</p>

          <hr className="my-3" />

          <p>
            <strong>Diploma vereist:</strong>{" "}
            {selectedBeroep.diplomaVereist ? "Ja" : "Nee"}
          </p>

          {selectedBeroep.erkenning && (
            <p>
              <strong>Erkenning:</strong> {selectedBeroep.erkenning}
            </p>
          )}

          {selectedBeroep.links && selectedBeroep.links.length > 0 && (
            <>
              <h3 className="mt-4 mb-1 font-semibold">Links</h3>
              <ul className="list-disc ml-6">
                {selectedBeroep.links.map((l, i) => (
                  <li key={i}>
                    <a
                      href={l.url}
                      target="_blank"
                      className="text-[#800000] underline"
                    >
                      {l.titel}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
