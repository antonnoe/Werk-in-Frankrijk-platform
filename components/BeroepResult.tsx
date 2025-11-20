"use client";

import { Beroep } from "../lib/types";

interface Props {
  beroep: Beroep;
}

export default function BeroepResult({ beroep }: Props) {
  if (!beroep) return null;

  return (
    <div className="p-6 bg-white shadow rounded-lg border border-gray-200 animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-4 border-b pb-4">
        <h2 className="text-2xl font-bold text-[#800000]">{beroep.naamNl}</h2>
        <p className="text-lg text-gray-600 italic">{beroep.naamFr}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium">
                {beroep.categorie}
            </span>
            {beroep.taalniveau && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium border border-blue-100">
                    Taal: {beroep.taalniveau}
                </span>
            )}
        </div>
      </div>

      {/* Omschrijving */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Omschrijving</h3>
        <p className="text-gray-700 leading-relaxed">{beroep.omschrijving}</p>
      </div>

      {/* Grid voor details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Diploma & Eisen */}
        <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-[#800000] mb-2">Diploma & Eisen</h3>
            <p className="text-sm mb-1">
                <span className="font-medium">Diploma vereist:</span> {beroep.diplomaVereist ? "Ja" : "Nee"}
            </p>
            {beroep.diplomaDetails && (
                <p className="text-sm text-gray-600">{beroep.diplomaDetails}</p>
            )}
            <p className="text-sm mt-2">
                <span className="font-medium">Gereglementeerd:</span> {beroep.gereglementeerd ? "Ja" : "Nee"}
            </p>
        </div>

        {/* Status & Geld */}
        <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-[#800000] mb-2">Status & Inkomen</h3>
            <p className="text-sm mb-1">
                <span className="font-medium">Auto-entrepreneur:</span> {beroep.autoentrepreneurMogelijk ? "Mogelijk" : "Niet mogelijk"}
            </p>
            {beroep.gemiddeldInkomen && (
                <p className="text-sm">
                    <span className="font-medium">Gem. Inkomen:</span> €{beroep.gemiddeldInkomen} / jaar
                </p>
            )}
             <p className="text-sm mt-2">
                <span className="font-medium">Verzekering:</span> {beroep.verzekeringVerplicht ? "Verplicht" : "Optioneel"}
            </p>
        </div>
      </div>
    </div>
  );
}
