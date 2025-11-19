"use client";

import { FileText } from "lucide-react";
import { Beroep } from "@/lib/types";

interface Props {
  beroep: Beroep;
}

export default function BeroepResult({ beroep }: Props) {
  if (!beroep) return null;

  return (
    <div className="p-6 bg-white shadow rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <FileText className="w-8 h-8 text-red-900 flex-shrink-0" />
        <h1 className="text-3xl font-bold text-gray-900">
          {beroep.naamNl ?? "Onbekende naam"}
        </h1>
      </div>

      <p className="text-xl text-gray-600 ml-11">
        {beroep.naamFr ?? ""}
      </p>

      {/* Tags / categorieën */}
      <div className="flex flex-wrap gap-2 mt-4 ml-11">
        {beroep.categorie && (
          <span className="px-2 py-1 text-sm bg-gray-100 rounded border border-gray-300">
            {beroep.categorie}
          </span>
        )}

        {beroep.taalvereiste && (
          <span className="px-2 py-1 text-sm bg-gray-100 rounded border border-gray-300">
            Taal: {beroep.taalvereiste}
          </span>
        )}

        {beroep.autoentrepreneurMogelijk && (
          <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded border border-green-300">
            Auto-Entrepreneur mogelijk
          </span>
        )}

        {beroep.regelgeving && (
          <span className="px-2 py-1 text-sm bg-gray-100 rounded border border-gray-300">
            {beroep.regelgeving}
          </span>
        )}
      </div>

      {/* Omschrijving */}
      {beroep.omschrijving && (
        <p className="mt-6 text-gray-800 leading-relaxed ml-11">
          {beroep.omschrijving}
        </p>
      )}

      {/* Diploma */}
      {beroep.diplomaVereist !== undefined && (
        <div className="mt-6 ml-11">
          <h2 className="text-xl font-semibold text-gray-900">
            Diploma
          </h2>
          <p className="text-gray-700 mt-1">
            {beroep.diplomaVereist
              ? "Diploma vereist."
              : "Geen diploma vereist."}
          </p>

          {beroep.diplomaDetails && (
            <p className="text-gray-700 mt-1">
              Details: {beroep.diplomaDetails}
            </p>
          )}
        </div>
      )}

      {/* Erkenning */}
      {beroep.erkenning && (
        <div className="mt-6 ml-11">
          <h2 className="text-xl font-semibold text-gray-900">
            Erkenning & Procedures
          </h2>
          <p className="text-gray-700 mt-1">{beroep.erkenning}</p>

          {beroep.erkenningUrl && (
            <a
              href={beroep.erkenningUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-800 underline mt-1 inline-block"
            >
              Meer uitleg
            </a>
          )}
        </div>
      )}

      {/* Verzekeringen */}
      {beroep.verzekeringVerplicht !== undefined && (
        <div className="mt-6 ml-11">
          <h2 className="text-xl font-semibold text-gray-900">
            Verzekeringen
          </h2>
          <p className="text-gray-700 mt-1">
            {beroep.verzekeringVerplicht
              ? "Verzekering verplicht."
              : "Verzekering niet verplicht."}
          </p>

          {beroep.verzekeringType && (
            <p className="text-gray-700 mt-1">
              Type: {beroep.verzekeringType}
            </p>
          )}
        </div>
      )}

      {/* Links */}
      {beroep.links && beroep.links.length > 0 && (
        <div className="mt-6 ml-11">
          <h2 className="text-xl font-semibold text-gray-900">Links</h2>
          <ul className="list-disc list-inside mt-2 text-gray-800">
            {beroep.links.map((l, i) => (
              <li key={i}>
                {l.url ? (
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-800 underline"
                  >
                    {l.titel ?? l.url}
                  </a>
                ) : (
                  l.titel
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
