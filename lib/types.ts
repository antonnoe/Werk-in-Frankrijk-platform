export interface Link {
  titel: string;
  url: string;
}

// Bevoegde instantie met haar rol NA de inschrijving bij het Guichet unique
export interface BevoegdeInstantie {
  instantie: string;
  rol: string;
}

// Twee-lagen loketstructuur (sinds 1 jan 2023 loopt inschrijving via het Guichet unique)
export interface Loket {
  // Laag 1: waar schrijf je in? ("guichet-unique" | "geen" (loondienst) | "gemengd" | "bijzonder")
  inschrijving: string;
  type: "guichet-unique" | "geen" | "gemengd" | "bijzonder";
  // Laag 2: bevoegde instantie(s) met hun rol NA de inschrijving
  bevoegdeInstanties: BevoegdeInstantie[];
}

export interface Beroep {
  id: string;
  naamNl: string;
  naamFr: string;
  sectoren: string[];
  categorie: string;
  omschrijving: string;
  
  // Diploma & Eisen
  diplomaVereist: boolean;
  diplomaDetails?: string;
  erkenning?: string;
  erkenningProcedure?: string;
  
  // Werk & Status
  verzekeringVerplicht: boolean;
  verzekeringen?: string[];
  
  // Ondernemers Info (NIEUW)
  autoentrepreneurMogelijk: boolean;
  registratieInstantie?: string; // Bijv: "CMA (Ambacht)", "CCI (Handel)", "URSSAF (Vrij beroep)"
  activiteitType?: string;       // Bijv: "Artisanale", "Commerciale", "Libérale"

  gereglementeerd: boolean;
  
  // Details
  taalniveau?: string;
  salarisIndicatie?: string;     // Tekstuele indicatie
  gemiddeldInkomen?: number;     // Getal voor sortering
  kostenEuro?: number;
  tijdlijnMaanden?: string;
  
  links?: Link[];
  keywords?: string[];
  laatsteUpdate?: string;

  // Loket-actualisatie (Guichet unique) + bronvermelding
  loket?: Loket;
  laatstGecontroleerd?: string; // ISO-datum, alleen gezet als tegen bron gecontroleerd
  bron?: string;                // Officiële URL (service-public.fr / .gouv.fr), leeg indien niet gevonden
}
