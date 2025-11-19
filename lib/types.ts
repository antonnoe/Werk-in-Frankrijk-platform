// /lib/types.ts
// PRO-release type systeem – volledig camelCase + future-proof

export interface Link {
  titel?: string;
  url?: string;
}

export interface Beroep {
  id?: string;
  naamNl?: string;
  naamFr?: string;
  categorie?: string;
  omschrijving?: string;

  diplomaVereist?: boolean;
  diplomaDetails?: string;

  erkenning?: string;
  erkenningProcedure?: string;
  erkenningUrl?: string;
  nlDiplomaErkend?: boolean;

  certificeringNodig?: boolean;
  certificeringWaar?: string;
  certificeringUrl?: string;

  verzekeringVerplicht?: boolean;
  verzekeringType?: string;
  verzekeringen?: string[];

  taalvereiste?: string;
  salarisIndicatie?: string;

  autoentrepreneurMogelijk?: boolean;
  gereglementeerd?: boolean;

  chambre?: string;
  chambreNaam?: string;
  chambreUrl?: string;

  kostenEuro?: number;
  tijdlijnMaanden?: string;

  fiscaalRegimes?: string[];
  gemiddeldInkomen?: number;
  regionaleVraag?: string;

  links?: Link[];
  laatsteUpdate?: string;
  keywords?: string[];
}
