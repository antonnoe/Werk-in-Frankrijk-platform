// lib/getBeroepen.ts
import { Beroep } from "./types";
import data from "../data/beroepen.json";

export function mapJsonToBeroep(j: any): Beroep {
  return {
    id: j.id,

    naamNl: j.naam_nl,
    naamFr: j.naam_fr,
    categorie: j.categorie,
    omschrijving: j.omschrijving,

    diplomaVereist: j.diploma_vereist,
    diplomaDetails: j.diploma_details,
    erkenning: j.erkenning,
    erkenningProcedure: j.erkenning_procedure,
    erkenningUrl: j.erkenning_url,
    nlDiplomaErkend: j.nl_diploma_erkend,

    certificeringNodig: j.certificering_nodig,
    certificeringWaar: j.certificering_waar,
    certificeringUrl: j.certificering_url,

    verzekeringVerplicht: j.verzekering_verplicht,
    verzekeringType: j.verzekering_type,
    verzekeringen: j.verzekeringen,

    taalvereiste: j.taalvereiste,
    salarisIndicatie: j.salaris_indicatie,

    autoentrepreneurMogelijk: j.autoentrepreneur_mogelijk,
    gereglementeerd: j.gereglementeerd,

    chambre: j.chambre,
    chambreNaam: j.chambre_naam,
    chambreUrl: j.chambre_url,

    kostenEuro: j.kosten_euro,
    tijdlijnMaanden: j.tijdlijn_maanden,
    fiscaalRegimes: j.fiscaal_regimes,
    gemiddeldInkomen: j.gemiddeld_inkomen,

    regionaleVraag: j.regionale_vraag,
    links: j.links,
    laatsteUpdate: j.laatste_update,
    keywords: j.keywords
  };
}

export function getBeroepen(): Beroep[] {
  return data.map(mapJsonToBeroep);
}
