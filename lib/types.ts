// lib/types.ts
export interface Link {
  titel: string;
  url: string;
}

export interface Beroep {
  id: string;
  naamNl: string;
  naamFr: string;
  sectoren: string[]; // Dit veld miste steeds
  categorie: string;
  omschrijving: string;
  
  // Diploma & Eisen
  diplomaVereist: boolean;
  diplomaDetails?: string;
  erkenning?: string;
  erkenningProcedure?: string;
  erkenningUrl?: string;
  
  // Werk & Status
  verzekeringVerplicht: boolean;
  verzekeringen?: string[];
  autoentrepreneurMogelijk: boolean;
  gereglementeerd: boolean;
  
  // Details
  taalniveau?: string;
  salarisIndicatie?: string;
  gemiddeldInkomen?: number;
  kostenEuro?: number;
  tijdlijnMaanden?: string;
  
  links?: Link[];
  keywords?: string[];
  laatsteUpdate?: string;
}
