"use client";

import { useState } from "react";

export default function GeneratorPage() {
  // State voor het formulier
  const [form, setForm] = useState({
    id: "",
    naamNl: "",
    naamFr: "",
    sector: "horeca", // Default
    categorie: "",
    omschrijving: "",
    diplomaVereist: false,
    diplomaDetails: "",
    gereglementeerd: false,
    verzekeringVerplicht: false,
    verzekeringenInput: "", // Komma gescheiden
    autoentrepreneurMogelijk: true,
    registratieInstantie: "",
    activiteitType: "",
    taalniveau: "B1",
    gemiddeldInkomen: 0,
    kostenEuro: 0,
    tijdlijnMaanden: "",
    linksInput: "", // Titel|Url
    keywordsInput: "" // Komma gescheiden
  });

  const [jsonOutput, setJsonOutput] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const generateJSON = () => {
    // 1. Arrays bouwen
    const sectorenArray = [form.sector]; 
    const verzekeringenArray = form.verzekeringenInput.split(",").map(s => s.trim()).filter(s => s);
    const keywordsArray = form.keywordsInput.split(",").map(s => s.trim()).filter(s => s);
    
    // 2. Links parsen (Formaat: Titel|Url)
    const linksArray = form.linksInput.split("\n").map(linkStr => {
        const parts = linkStr.split("|");
        if(parts.length === 2) return { titel: parts[0].trim(), url: parts[1].trim() };
        return null;
    }).filter(l => l !== null);

    // 3. Het Object bouwen
    const newObject = {
      id: form.id.toLowerCase().replace(/\s+/g, "-"),
      naamNl: form.naamNl,
      naamFr: form.naamFr,
      sectoren: sectorenArray,
      categorie: form.categorie,
      omschrijving: form.omschrijving,
      diplomaVereist: form.diplomaVereist,
      diplomaDetails: form.diplomaDetails || "Geen details vermeld.",
      erkenning: form.diplomaVereist ? "procedure" : "automatisch",
      erkenningProcedure: form.gereglementeerd ? "Zie details bij instantie." : "",
      verzekeringVerplicht: form.verzekeringVerplicht,
      verzekeringen: verzekeringenArray,
      autoentrepreneurMogelijk: form.autoentrepreneurMogelijk,
      registratieInstantie: form.registratieInstantie || "Nog niet bekend",
      activiteitType: form.activiteitType || "Nog niet bekend",
      gereglementeerd: form.gereglementeerd,
      taalniveau: form.taalniveau,
      gemiddeldInkomen: Number(form.gemiddeldInkomen),
      kostenEuro: Number(form.kostenEuro),
      tijdlijnMaanden: form.tijdlijnMaanden,
      links: linksArray,
      laatsteUpdate: new Date().toISOString().split("T")[0],
      keywords: keywordsArray
    };

    // 4. Output genereren (MET de cruciale komma vooraan!)
    const jsonString = `  ,\n${JSON.stringify(newObject, null, 4)}`;
    setJsonOutput(jsonString);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
      <h1 className="text-3xl font-bold text-[#800000] mb-2">Nieuw Beroep Generator</h1>
      <p className="mb-8 text-gray-600">Vul in, klik op genereer, en plak de groene code in je bestand.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Linker kolom: Formulier */}
        <div className="space-y-4 bg-white p-6 rounded shadow border border-gray-200">
            <h2 className="font-bold text-xl border-b pb-2">1. De Inhoud</h2>
            
            <div className="grid grid-cols-2 gap-4">
                <input name="id" placeholder="ID (bv: bakker)" onChange={handleChange} className="p-2 border rounded" />
                <select name="sector" onChange={handleChange} className="p-2 border rounded bg-white">
                    <option value="horeca">Horeca</option>
                    <option value="toerisme">Toerisme</option>
                    <option value="bouw">Bouw</option>
                    <option value="zorg">Zorg</option>
                    <option value="transport">Transport</option>
                    <option value="dienstverlening">Dienstverlening</option>
                    <option value="commerce">Handel & Retail</option>
                    <option value="agrarisch">Landbouw</option>
                    <option value="it">IT & Digitaal</option>
                    <option value="onderwijs">Onderwijs</option>
                    <option value="creatief">Creatief</option>
                    <option value="administratif-juridique">Juridisch/Financieel</option>
                </select>
            </div>

            <input name="naamNl" placeholder="Naam NL (bv: Bakker)" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="naamFr" placeholder="Naam FR (bv: Boulanger)" onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="categorie" placeholder="Sub-categorie (bv: Ambacht)" onChange={handleChange} className="w-full p-2 border rounded" />
            
            <textarea name="omschrijving" placeholder="Korte omschrijving van het beroep..." onChange={handleChange} className="w-full p-2 border rounded h-24" />

            <div className="bg-blue-50 p-4 rounded border border-blue-100 space-y-3">
                <h3 className="font-bold text-blue-800 text-sm">Regels & Eisen</h3>
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2"><input type="checkbox" name="diplomaVereist" onChange={handleChange} /> Diploma nodig?</label>
                    <label className="flex items-center gap-2"><input type="checkbox" name="gereglementeerd" onChange={handleChange} /> Gereglementeerd?</label>
                    <label className="flex items-center gap-2"><input type="checkbox" name="verzekeringVerplicht" onChange={handleChange} /> Verzekering?</label>
                </div>
                <input name="diplomaDetails" placeholder="Welk diploma? (bv: CAP Boulanger)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="verzekeringenInput" placeholder="Verzekeringen (komma gescheiden, bv: RC Pro, Décennale)" onChange={handleChange} className="w-full p-2 border rounded" />
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-100 space-y-3">
                <h3 className="font-bold text-green-800 text-sm">Ondernemen</h3>
                <label className="flex items-center gap-2"><input type="checkbox" name="autoentrepreneurMogelijk" checked={form.autoentrepreneurMogelijk} onChange={handleChange} /> Auto-entrepreneur mogelijk?</label>
                <input name="registratieInstantie" placeholder="Instantie (bv: CMA, URSSAF, CCI)" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="activiteitType" placeholder="Type (bv: Artisanale, Commerciale)" onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
                <input name="gemiddeldInkomen" type="number" placeholder="Inkomen €/jr" onChange={handleChange} className="p-2 border rounded" />
                <input name="kostenEuro" type="number" placeholder="Kosten €" onChange={handleChange} className="p-2 border rounded" />
                <input name="tijdlijnMaanden" placeholder="Tijd (bv: 2-3)" onChange={handleChange} className="p-2 border rounded" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold">Links (Eén per regel: Titel|Url)</label>
                <textarea name="linksInput" placeholder="Mijn Link|https://..." onChange={handleChange} className="w-full p-2 border rounded h-20 font-mono text-sm" />
            </div>
            
            <input name="keywordsInput" placeholder="Keywords: trefwoord1, trefwoord2" onChange={handleChange} className="w-full p-2 border rounded" />

            <button onClick={generateJSON} className="w-full bg-[#800000] text-white py-4 rounded font-bold hover:bg-red-900 transition-all text-lg shadow-md">
                Genereer Code
            </button>
        </div>

        {/* Rechter kolom: Output */}
        <div className="sticky top-10">
            <h2 className="font-bold text-xl mb-2">2. Het Resultaat</h2>
            <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-lg shadow-lg border border-gray-700 relative">
                <div className="absolute top-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-bl">JSON</div>
                <textarea 
                    className="w-full h-[600px] bg-transparent border-none focus:ring-0 resize-none text-sm"
                    value={jsonOutput}
                    readOnly
                />
            </div>
            
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-bold text-yellow-800">Hoe toevoegen?</h3>
                <ol className="list-decimal list-inside text-sm text-yellow-700 mt-2 space-y-1">
                    <li>Kopieer de code hierboven (Ctrl+A, Ctrl+C).</li>
                    <li>Ga naar <code>data/beroepen.json</code>.</li>
                    <li>Scroll helemaal naar beneden.</li>
                    <li><strong>Verwijder</strong> het laatste haakje <code>]</code>.</li>
                    <li>Plak je code.</li>
                    <li>Zet een nieuw haakje <code>]</code> eronder.</li>
                </ol>
            </div>
        </div>
      </div>
    </div>
  );
}
