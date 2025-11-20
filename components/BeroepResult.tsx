"use client";

import { Beroep } from "../lib/types";
import { 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Euro, 
  Clock, 
  ShieldCheck, 
  BookOpen,
  Building2
} from "lucide-react";

interface Props {
  beroep: Beroep;
}

export default function BeroepResult({ beroep }: Props) {
  if (!beroep) return null;

  return (
    <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden animate-in fade-in duration-300 mt-6">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gray-50 p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-[#800000] mb-1">{beroep.naamNl}</h2>
                <p className="text-xl text-gray-500 italic font-medium">{beroep.naamFr}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#800000] text-white text-sm rounded-full font-medium shadow-sm">
                    {beroep.categorie}
                </span>
                {beroep.taalniveau && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium border border-blue-200">
                        Taal: {beroep.taalniveau}
                    </span>
                )}
                {beroep.gereglementeerd && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full font-medium border border-amber-200 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Gereglementeerd
                    </span>
                )}
            </div>
        </div>
        
        <div className="mt-6">
            <p className="text-gray-700 leading-relaxed text-lg">{beroep.omschrijving}</p>
        </div>
      </div>

      {/* 2. DETAIL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-px bg-gray-200">
        
        {/* BLOK A: DIPLOMA & ERKENNING */}
        <div className="bg-white p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-5 text-[#800000] border-b pb-2 border-gray-100">
                <BookOpen className="w-6 h-6" />
                <h3 className="font-bold text-xl">Diploma & Erkenning</h3>
            </div>
            
            <ul className="space-y-4 text-gray-700">
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="font-semibold text-gray-900">Diploma vereist?</span>
                    <span className={`px-2 py-1 rounded text-sm font-bold ${beroep.diplomaVereist ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {beroep.diplomaVereist ? "Ja, verplicht" : "Nee, niet verplicht"}
                    </span>
                </li>
                
                {beroep.diplomaDetails && (
                    <li className="bg-gray-50 p-3 rounded border border-gray-100 text-sm">
                        <span className="block font-bold text-xs uppercase text-gray-500 mb-1">Details</span>
                        {beroep.diplomaDetails}
                    </li>
                )}

                {beroep.erkenningProcedure && (
                    <li className="bg-blue-50 p-4 rounded border border-blue-100 text-sm text-blue-900">
                        <div className="flex items-start gap-2">
                            <Building2 className="w-4 h-4 mt-0.5 text-blue-700 flex-shrink-0" />
                            <div>
                                <span className="block font-bold text-xs uppercase mb-1 text-blue-700">Procedure</span>
                                {beroep.erkenningProcedure}
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>

        {/* BLOK B: PRAKTISCH & GELD */}
        <div className="bg-white p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-5 text-[#800000] border-b pb-2 border-gray-100">
                <Euro className="w-6 h-6" />
                <h3 className="font-bold text-xl">Status & Kosten</h3>
            </div>

            <ul className="space-y-4 text-gray-700">
                <li className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="font-medium">Auto-entrepreneur mogelijk?</span>
                    <span className={beroep.autoentrepreneurMogelijk ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                        {beroep.autoentrepreneurMogelijk ? "Ja" : "Nee"}
                    </span>
                </li>
                
                {beroep.gemiddeldInkomen && (
                    <li className="flex justify-between items-center py-1 border-b border-gray-50">
                        <span className="font-medium">Gem. Inkomen (bruto/jaar):</span>
                        <span className="font-bold text-gray-900">€{beroep.gemiddeldInkomen.toLocaleString()}</span>
                    </li>
                )}

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-orange-50 p-3 rounded border border-orange-100">
                        <div className="flex items-center gap-1.5 mb-1 text-orange-800">
                            <Euro className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Opstartkosten</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {beroep.kostenEuro ? `€${beroep.kostenEuro.toLocaleString()}` : "N.v.t."}
                        </span>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border border-purple-100">
                        <div className="flex items-center gap-1.5 mb-1 text-purple-800">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Tijdlijn</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {beroep.tijdlijnMaanden ? `${beroep.tijdlijnMaanden} maanden` : "Direct"}
                        </span>
                    </div>
                </div>
            </ul>
        </div>

        {/* BLOK C: VERZEKERINGEN */}
        <div className="bg-white p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-4 text-[#800000] border-b pb-2 border-gray-100">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-bold text-xl">Verzekeringen</h3>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
                 <span className="text-sm font-medium text-gray-600">Status:</span>
                 <span className={`text-sm font-bold px-2 py-0.5 rounded ${beroep.verzekeringVerplicht ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"}`}>
                    {beroep.verzekeringVerplicht ? "Wettelijk Verplicht" : "Niet verplicht / Aanbevolen"}
                 </span>
            </div>

            {beroep.verzekeringen && beroep.verzekeringen.length > 0 ? (
                <ul className="space-y-2">
                    {beroep.verzekeringen.map((verz, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{verz}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 italic">Geen specifieke verzekeringen vermeld.</p>
            )}
        </div>

        {/* BLOK D: OFFICIËLE BRONNEN */}
        <div className="bg-white p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-4 text-[#800000] border-b pb-2 border-gray-100">
                <ExternalLink className="w-6 h-6" />
                <h3 className="font-bold text-xl">Officiële Bronnen</h3>
            </div>
            
            {beroep.links && beroep.links.length > 0 ? (
                <div className="grid gap-3">
                    {beroep.links.map((link, i) => (
                        <a 
                            key={i}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#800000] hover:bg-red-50 transition-all group"
                        >
                            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-white">
                                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#800000]" />
                            </div>
                            <span className="text-sm font-medium text-blue-700 group-hover:text-[#800000] underline-offset-2 group-hover:underline">
                                {link.titel}
                            </span>
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">Geen directe links beschikbaar.</p>
            )}
        </div>

      </div>
    </div>
  );
}
