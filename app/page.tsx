// /app/page.tsx
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BeroepResult from "../components/BeroepResult";
import { Beroep } from "../lib/types";

export default function Page() {
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 pb-20 px-4 pt-10">
      <div className="max-w-5xl mx-auto">

        {/* Titelblok */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-red-900 mb-3">
            Werk in Frankrijk – Beroepenchecker
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Vind alle officiële informatie over beroepen, diploma’s,
            ondernemingsvormen, regels en erkenningen in Frankrijk — speciaal
            voor Nederlandstaligen die hier wonen of willen werken.
          </p>
        </header>

        {/* Zoekbalk */}
        <SearchBar onSelect={setSelectedBeroep} />

        {/* Resultaat */}
        <BeroepResult beroep={selectedBeroep} />
      </div>
    </main>
  );
}
