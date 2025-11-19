"use client";

import { useState, useMemo } from "react";
import beroepenData from "../data/beroepen.json";
import type { Beroep } from "../lib/types";
import SearchBar from "../components/SearchBar";
import SectorButtons from "../components/SectorButtons";

export default function HomePage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null);
  const [query, setQuery] = useState("");

  // Maak TypeScript blij → JSON naar typed array
  const typedData: Beroep[] = beroepenData as unknown as Beroep[];

  /** ⭐ Filter op sector */
  const sectorFiltered: Beroep[] = useMemo(() => {
    if (!selectedSector) return typedData;

    return typedData.filter((b) =>
      b.categorie?.toLowerCase() === selectedSector.toLowerCase()
    );
  }, [selectedSector, typedData]);

  /** ⭐ Filter op zoekquery (fallback als Fuse.js niets teruggeeft) */
  const searchFiltered: Beroep[] = useMemo(() => {
    if (!query.trim()) return sectorFiltered;

    const q = query.toLowerCase();
    return sectorFiltered.filter((b) =>
      b.naamNl?.toLowerCase().includes(q) ||
      b.naamFr?.toLowerCase().includes(q) ||
      b.omschrijving?.toLowerCase().includes(q) ||
      b.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [query, sectorFiltered]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Werk in Frankrijk – Beroepenchecker</h1>

      {/* ⭐ Sectoren */}
      <SectorButtons
        selected={selectedSector}
        onSelect={(sector) => setSelectedSector(sector)}
      />

      {/* ⭐ Zoeken */}
      <SearchBar
        beroepen={sectorFiltered}
        onSelect={(b, q) => {
          setSelectedBeroep(b);
          setQuery(q);
        }}
        searchQuery={query}
        setSearchQuery={setQuery}
      />

      {/* ⭐ Resultaten */}
      <section className="mt-6">
        {searchFiltered.length === 0 ? (
          <p className="text-gray-600 italic">Geen resultaten gevonden…</p>
        ) : (
          <ul className="space-y-4">
            {searchFiltered.map((b) => (
              <li
                key={b.id}
                className="border border-gray-300 rounded p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedBeroep(b)}
              >
                <strong>{b.naamNl}</strong>
                <br />
                <span className="text-sm text-gray-600">{b.naamFr}</span>
                <br />
                <span className="text-xs text-gray-500">{b.categorie}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ⭐ Detailweergave */}
      {selectedBeroep && (
        <section className="mt-10 p-6 border border-gray-400 rounded bg-white shadow">
          <h2 className="text-xl font-bold mb-2">{selectedBeroep.naamNl}</h2>
          <p className="text-gray-600 mb-4">{selectedBeroep.naamFr}</p>
          <p className="whitespace-pre-line">{selectedBeroep.omschrijving}</p>

          {selectedBeroep.diplomaVereist !== undefined && (
            <p className="mt-4">
              <strong>Diploma vereist:</strong>{" "}
              {selectedBeroep.diplomaVereist ? "Ja" : "Nee"}
            </p>
          )}

          {selectedBeroep.links?.length ? (
            <div className="mt-4">
              <strong>Links:</strong>
              <ul className="list-disc ml-6 mt-2">
                {selectedBeroep.links.map((lnk, i) => (
                  <li key={i}>
                    <a
                      href={lnk.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {lnk.titel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}
