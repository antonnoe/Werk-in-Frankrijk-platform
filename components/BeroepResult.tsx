// /components/BeroepResult.tsx
"use client";

import { Beroep } from "../lib/types";

interface Props {
  beroep: Beroep | null;
}

// Inline SVG info-icon
const InfoIcon = () => (
  <svg
    className="w-4 h-4 inline-block ml-1 text-gray-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);

// Tooltip wrapper
const Tooltip = ({ text }: { text: string }) => (
  <span className="relative group cursor-help">
    <InfoIcon />
    <span
      className="
        absolute left-1/2 top-full mt-1 w-max max-w-xs
        -translate-x-1/2 px-3 py-2 rounded-md shadow-lg
        bg-black text-white text-xs opacity-0
        group-hover:opacity-100 group-focus-within:opacity-100
        transition-opacity z-50
      "
    >
      {text}
    </span>
  </span>
);

export default function BeroepResult({ beroep }: Props) {
  if (!beroep) {
    return (
      <p className="mt-10 text-center text-gray-700 text-lg">
        Selecteer een beroep om de details te bekijken.
      </p>
    );
  }

  return (
    <div className="mt-10 bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto border border-gray-200">
      {/* Titelblok */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-red-900">
          {beroep.naamNl}
        </h1>
      </div>

      <p className="text-xl text-gray-600 ml-1">{beroep.naamFr}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        {beroep.categorie && (
          <span className="px-3 py-1 bg-red-900 text-white text-sm rounded">
            {beroep.categorie}
          </span>
        )}

        {beroep.taalvereiste && (
          <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded">
            Taalniveau: {beroep.taalvereiste}
          </span>
        )}

        {beroep.diplomaVereist && (
          <span className="px-3 py-1 bg-blue-100 text-blue-900 text-sm rounded">
            Diploma verplicht
          </span>
        )}

        {beroep.gereglementeerd && (
          <span className="px-3 py-1 bg-yellow-200 text-yellow-900 text-sm rounded">
            Gereglementeerd beroep
          </span>
        )}
      </div>

      {/* Omschrijving */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-red-900 flex items-center">
          Omschrijving
        </h2>
        <p className="mt-2 text-gray-800 leading-relaxed">
          {beroep.omschrijving}
        </p>
      </section>

      {/* Diploma / Erkenning */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-red-900 flex items-center">
          Diploma & Erkenning
          <Tooltip text="Informatie over vereiste diploma's en eventuele erkenningsprocedures." />
        </h2>

        <ul className="mt-3 text-gray-800 leading-relaxed space-y-2">
          <li>
            <strong>Diploma vereist:</strong>{" "}
            {beroep.diplomaVereist ? "Ja" : "Nee"}
          </li>

          {beroep.diplomaDetails && (
            <li>
              <strong>Details:</strong> {beroep.diplomaDetails}
            </li>
          )}

          {beroep.erkenning && (
            <li>
              <strong>Erkenning:</strong> {beroep.erkenning}
            </li>
          )}

          {beroep.erkenningProcedure && (
            <li>
              <strong>Procedure:</strong> {beroep.erkenningProcedure}
            </li>
          )}

          {beroep.erkenningUrl && (
            <li>
              <a
                href={beroep.erkenningUrl}
                className="text-blue-700 underline"
                target="_blank"
              >
                Officiële link (Service-Public)
              </a>
            </li>
          )}
        </ul>
      </section>

      {/* Verzekeringen */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-red-900 flex items-center">
          Verzekeringen
          <Tooltip text="Welke verzekeringen zijn verplicht of aanbevolen voor dit beroep?" />
        </h2>

        <ul className="mt-3 text-gray-800 space-y-1">
          {beroep.verzekeringen?.map((v, i) => (
            <li key={i}>• {v}</li>
          ))}
        </ul>
      </section>

      {/* Kosten + Tijdslijn */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-red-900 flex items-center">
          Kosten & Tijdlijn
          <Tooltip text="Indicatie van de opstartkosten en benodigde tijd." />
        </h2>

        <p className="mt-2 text-gray-800">
          <strong>Kosten:</strong>{" "}
          {beroep.kostenEuro ? `€${beroep.kostenEuro}` : "—"}
        </p>
        <p className="text-gray-800 mt-1">
          <strong>Tijdlijn:</strong> {beroep.tijdlijnMaanden || "—"} maanden
        </p>
      </section>

      {/* Links */}
      {beroep.links && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-red-900 flex items-center">
            Officiële Bronnen
            <Tooltip text="Rechtstreekse links naar officiële instanties." />
          </h2>

          <ul className="mt-3 text-blue-800 space-y-2">
            {beroep.links.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  className="underline"
                >
                  {l.titel}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Laatste update */}
      {beroep.laatsteUpdate && (
        <p className="mt-10 text-sm text-gray-500">
          Laatste update: {beroep.laatsteUpdate}
        </p>
      )}
    </div>
  );
}
