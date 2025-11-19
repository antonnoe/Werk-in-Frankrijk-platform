// /lib/types.ts
// Clean & consistent type systeem voor fase 1

export interface Link {
  label: string;
  url: string;
}

export interface Beroep {
  id: string;
  naamNl: string;
  naamFr: string;
  omschrijving: string;

  // Sector(en)
  sectoren: string[];

  // Diploma en erkenning
  diplomaVereist: boolean;
  diplomaEisen?: string;
  erkenning?: string;

  // Instanties en verplichtingen
  instanties?: Link[];
  verplichtingen?: string[];

  // Codes
  romeCode?: string;
  rncpCode?: string;

  // Registratie & verzekering
  verzekeringVerplicht?: boolean;
  verzekeringUitleg?: string;

  // Arbeidsmarkt
  salarisIndicatie?: string;
  arbeidsmarktKans?: string;

  // Zoekwoorden
  keywords?: string[];
}
