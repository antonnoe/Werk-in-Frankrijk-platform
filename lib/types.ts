// lib/types.ts

export interface Link {
  titel?: string;
  url?: string;
}

export interface Beroep {
  id: string;

  // Basisnamen
  naamNl?: string;
  naamFr?: string;
  categorie?: string;
  omschrijving?: string;

  // Diploma & erkenning
  diplomaVereist?: boolean;
  diplomaDetails?: string;
  erkenning?: string;
  erkenningProcedure?: string;
  erkenningUrl?: string;
  nlDiplomaErkend?: boolean;

  // Certificering
  certificeringNodig?: boolean;
  certificeringWaar?: string;
  certificeringUrl?: string;

  // Verzekeringen
  verzekeringVerplicht?: boolean;
  verzekeringType?: string;
  verzekeringen?: string[];

  // Taal & salaris
  taalvereiste?: string;
  salarisIndicatie?: string;

  // Auto-entrepreneur & reglement
  autoentrepreneurMogelijk?: boolean;
  gereglementeerd?: boolean;

  // Chambre-gegevens
  chambre?: string;
  chambreNaam?: string;
  chambreUrl?: string;

  // Financieel & tijdlijn
  kostenEuro?: number;
  tijdlijnMaanden?: string;
  fiscaalRegimes?: string[];
  gemiddeldInkomen?: number;

  // Andere data
  regionaleVraag?: string;
  links?: Link[];
  laatsteUpdate?: string;
  keywords?: string[];
}
