export interface Link {
  titel: string;
  url: string;
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
}
