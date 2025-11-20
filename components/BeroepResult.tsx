"use client";

import { Beroep } from "../lib/types";
import { 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Euro, 
  Clock, 
  ShieldCheck, 
  BookOpen,
  Printer,
  Info // Nieuw icoon
} from "lucide-react";

interface Props {
  beroep: Beroep;
}

// Interne Tooltip Component
const InfoTooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-flex items-center ml-1.5 cursor-help align-middle">
    <Info className="w-4 h-4 text-gray-400 hover:text-[#800000] transition-colors" />
    {/* Tooltip Bubble */}
    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 text-center leading-relaxed pointer-events-none">
      {text}
      {/* Pijl naar beneden */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

export default function BeroepResult({ beroep }: Props) {
  if (!beroep) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden animate-in fade-in duration-300 mt-6 print:shadow-none print:border-0">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gray-50 p-6 border-b border-gray-100 print:bg-white print:border-b-2">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <h2 className="text-3xl font-bold text-[#800000] mb-1">{beroep.naamNl}</h2>
                <p className="text-xl text-gray-500 italic font-medium">{beroep.naamFr}</p>
                
                {/* Synoniemen */}
                {beroep.keywords && beroep.keywords.length > 0 && (
                    <div className="mt-2 text-sm text-gray-500 print:hidden">
                        <span className="mr-2 opacity-70">Ook bekend als:</span>
                        {beroep.keywords.slice(0, 4).map((k, i) => (
                            <span key={i} className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs mr-1 mb-1">
                                {k}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="flex flex-col items-end gap-3">
                <div className="flex flex-wrap gap-2 justify-end">
                    <span className="px-3 py-1 bg-[#800000] text-white text-sm rounded-full font-medium shadow-sm print:border print:border-black print:text-black print:bg-white">
                        {beroep.categorie}
                    </span>
                    {beroep.taalniveau && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium border border-blue-200 print:hidden flex items-center">
                            Taal: {beroep.taalniveau}
                            <InfoTooltip text="Taalniveau volgens Europees referentiekader (CEFR). A2 is basis, C1 is gevorderd." />
                        </span>
                    )}
                </div>
                
                {/* Actieknoppen */}
                <div className="flex gap-2 print:hidden">
                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#800000] transition-colors"
                        title="Print deze fiche"
                    >
                        <Printer className="w-4 h-4" /> Print fiche
                    </button>
                </div>
            </div>
        </div>
        
        <div className="mt-6">
            <p className="text-gray-700 leading-relaxed text-lg">{beroep.omschrijving}</p>
        </div>

        {/* WAARSCHUWING BIJ GEREGLEMENTEERD BEROEP */}
        {beroep.gereglementeerd && (
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-amber-800 text-sm uppercase flex items-center">
                        Let op: Gereglementeerd Beroep
                        <InfoTooltip text="Uitoefening zonder diploma-erkenning is strafbaar in Frankrijk. Controleer uw status bij de bevoegde instantie." />
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">
                        Je mag dit beroep in Frankrijk <strong>niet</strong> uitoefenen zonder de juiste diploma's of erkenning. 
                        Controleer de procedure hieronder.
                    </p>
                </div>
            </div>
        )}
      </div>

      {/* 2. DETAIL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-px bg-gray-200 print:block print:bg-white">
        
        {/* BLOK A: DIPLOMA & ERKENNING */}
        <div className="bg-white p-6 lg:p-8 print:border-b">
            <div className="flex items-center gap-2 mb-5 text-[#800000] border-b pb-2 border-gray-100">
                <BookOpen className="w-6 h-6" />
                <h3 className="font-bold text-xl flex items-center">
                    Diploma & Erkenning
                    <InfoTooltip text="Nederlandse diploma's zijn niet automatisch geldig. Vaak is een 'Attestation de comparabilité' of inschrijving in een register nodig." />
                </h3>
            </div>
            
            <ul className="space-y-4 text-gray-700">
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <span className="font-semibold text-gray-900">Diploma vereist?</span>
                    <span className={`px-2 py-1 rounded text-sm font-bold ${beroep.diplomaVereist ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                        {beroep.diplomaVereist ? "Ja, verplicht" : "Nee, niet verplicht"}
                    </span>
                </li>
                
                {beroep.diplomaDetails && (
                    <li className="bg-gray-50 p-3 rounded border border-gray-100 text-sm print:border-0 print:pl-0">
                        <span className="block font-bold text-xs uppercase text-gray-500 mb-1">Details</span>
                        {beroep.diplomaDetails}
                    </li>
                )}

                {beroep.erkenningProcedure && (
                    <li className="bg-blue-50 p-4 rounded border border-blue-100 text-sm text-blue-900 print:bg-white print:border print:text-black">
                        <span className="block font-bold text-xs uppercase mb-1 text-blue-700">Procedure</span>
                        {beroep.erkenningProcedure}
                    </li>
                )}
            </ul>
        </div>

        {/* BLOK B: PRAKTISCH & GELD */}
        <div className="bg-white p-6 lg:p-8 print:border-b">
            <div className="flex items-center gap-2 mb-5 text-[#800000] border-b pb-2 border-gray-100">
                <Euro className="w-6 h-6" />
                <h3 className="font-bold text-xl">Status & Kosten</h3>
            </div>

            <ul className="space-y-4 text-gray-700">
                <li className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="font-medium flex items-center">
                        Auto-entrepreneur mogelijk?
                        <InfoTooltip text="Micro-entreprise: Eenvoudig starten, lage lasten, maar omzetplafonds en geen kostenaftrek." />
                    </span>
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
                    <div className="bg-orange-50 p-3 rounded border border-orange-100 print:border print:bg-white">
                        <div className="flex items-center gap-1.5 mb-1 text-orange-800">
                            <Euro className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Opstartkosten</span>
                        </div>
                        <span className="font-bold text-gray-900">
                            {beroep.kostenEuro ? `€${beroep.kostenEuro.toLocaleString()}` : "N.v.t."}
                        </span>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded border border-purple-100 print:border print:bg-white">
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
        <div className="bg-white p-6 lg:p-8 print:border-b">
            <div className="flex items-center gap-2 mb-4 text-[#800000] border-b pb-2 border-gray-100">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="font-bold text-xl flex items-center">
                    Verzekeringen
                    <InfoTooltip text="In Frankrijk zijn beroepsverzekeringen (RC Pro, Décennale) vaak wettelijk verplicht en strikt gecontroleerd." />
                </h3>
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
                            <span className="flex items-center">
                                {verz}
                                {verz.includes("Décennale") && <InfoTooltip text="Dekt schade aan constructies gedurende 10 jaar. Absoluut verplicht in de bouw." />}
                                {verz.includes("RC Pro") && <InfoTooltip text="Responsabilité Civile Professionnelle: Dekt schade aan derden tijdens uitoefening van het beroep." />}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 italic">Geen specifieke verzekeringen vermeld.</p>
            )}
        </div>

        {/* BLOK D: OFFICIËLE BRONNEN */}
        <div className="bg-white p-6 lg:p-8 print:hidden">
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
      
      {/* Footer voor print */}
      <div className="hidden print:block p-6 text-center text-xs text-gray-400 border-t">
        Gegenereerd via Werk in Frankrijk Beroepenchecker - Infofrankrijk.com
      </div>
    </div>
  );
}
