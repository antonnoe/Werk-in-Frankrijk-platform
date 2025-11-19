export interface Beroep {
  id: string
  naam_nl: string
  naam_fr: string
  categorie: 'medisch' | 'bouw' | 'horeca' | 'zakelijk' | 'creatief' | 'onderwijs' | 'technisch' | 'landbouw'
  
  gereglementeerd: boolean
  
  diploma_eisen: string[]
  nl_diploma_erkend: boolean
  erkenning_procedure: string
  erkenning_url: string
  
  certificering_nodig: boolean
  certificering_waar: string
  certificering_url: string
  
  chambre: 'CMA' | 'CCI' | 'URSSAF' | 'Ordre' | 'Geen'
  chambre_naam: string
  chambre_url: string
  
  taalvereiste: 'A2' | 'B1' | 'B2' | 'C1' | null
  verzekeringen: string[]
  
  kosten_euro: number
  tijdlijn_maanden: string
  fiscaal_regimes: string[]
  gemiddeld_inkomen: number
  regionale_vraag: 'laag' | 'gemiddeld' | 'hoog'
  
  links: {
    titel: string
    url: string
  }[]
  
 laatste_update: string
  rncp_code?: string  // Optioneel: FranceCompétences RNCP nummer
  rome_code?: string  // Optioneel: Pôle Emploi ROME code
  toelichting_kosten?: string  // Extra uitleg bij kosten
  toelichting_tijdlijn?: string  // Extra uitleg bij tijdlijn
}
}

export interface SearchResult {
  beroep: Beroep
  score: number
}
