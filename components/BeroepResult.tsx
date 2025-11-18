'use client'

import type { Beroep } from '@/lib/types'
import { 
  FileText, 
  GraduationCap, 
  Shield, 
  Building, 
  Languages, 
  Euro,
  Clock,
  TrendingUp,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface BeroepResultProps {
  beroep: Beroep
}

function Section({ icon, title, children }: { 
  icon: React.ReactNode
  title: string
  children: React.ReactNode 
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="ml-9">
        {children}
      </div>
    </div>
  )
}

export function BeroepResult({ beroep }: BeroepResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-2 border-gray-200 rounded-xl shadow-lg p-8 space-y-6">
      <div className="border-b-2 border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="w-8 h-8 text-red-900 flex-shrink-0" />
          <h1 className="text-3xl font-bold text-gray-900">{beroep.naam_nl}</h1>
        </div>
        <p className="text-xl text-gray-600 ml-11">{beroep.naam_fr}</p>
        <div className="flex flex-wrap gap-2 mt-4 ml-11">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-900 rounded-full text-sm font-medium">
            {beroep.categorie}
          </span>
          {beroep.gereglementeerd && (
            <span className="inline-block px-4 py-1.5 bg-yellow-50 text-yellow-900 rounded-full text-sm font-medium">
              Gereglementeerd
            </span>
          )}
        </div>
      </div>

      {beroep.gereglementeerd && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-yellow-900 text-lg">Gereglementeerd Beroep</p>
            <p className="text-yellow-800 mt-1">Dit beroep vereist specifieke diploma's of kwalificaties.</p>
          </div>
        </div>
      )}

      <Section 
        icon={<GraduationCap className="w-6 h-6 text-red-900" />}
        title="Diploma-eisen en Erkenning"
      >
        <div className="space-y-4">
          {beroep.diploma_eisen.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-2">Vereiste kwalificaties:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {beroep.diploma_eisen.map((eis, i) => (
                  <li key={i}>{eis}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            {beroep.nl_diploma_erkend ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-gray-900">
                Nederlands diploma: {beroep.nl_diploma_erkend ? 'Erkend' : 'Niet automatisch erkend'}
              </p>
              <p className="text-sm text-gray-600 mt-1">{beroep.erkenning_procedure}</p>
            </div>
          </div>

          {beroep.erkenning_url && (
            <a 
              href={beroep.erkenning_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-900 hover:text-red-700 font-medium"
            >
              Meer info over erkenning
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </Section>

      <Section 
        icon={<Building className="w-6 h-6 text-red-900" />}
        title="Registratie en Certificering"
      >
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-gray-900">Beroepskamer</p>
            <p className="text-lg text-blue-900 font-medium mt-1">{beroep.chambre_naam}</p>
            {beroep.chambre_url && (
              <a 
                href={beroep.chambre_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-600 text-sm mt-2"
              >
                Naar website
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {beroep.certificering_nodig && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-900">Aanvullende certificering vereist</p>
              <p className="text-gray-700 mt-1">{beroep.certificering_waar}</p>
              {beroep.certificering_url && (
                <a 
                  href={beroep.certificering_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-900 hover:text-red-700 text-sm mt-2"
                >
                  Meer informatie
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </Section>

      {beroep.verzekeringen.length > 0 && (
        <Section 
          icon={<Shield className="w-6 h-6 text-red-900" />}
          title="Verplichte Verzekeringen"
        >
          <ul className="space-y-2">
            {beroep.verzekeringen.map((verzekering, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                {verzekering}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Section 
          icon={<Euro className="w-6 h-6 text-red-900" />}
          title="Kosten"
        >
          <p className="text-3xl font-bold text-gray-900">€{beroep.kosten_euro}</p>
          <p className="text-sm text-gray-600 mt-1">Geschatte totale kosten</p>
        </Section>

        <Section 
          icon={<Clock className="w-6 h-6 text-red-900" />}
          title="Tijdlijn"
        >
          <p className="text-3xl font-bold text-gray-900">{beroep.tijdlijn_maanden} maanden</p>
          <p className="text-sm text-gray-600 mt-1">Gemiddelde doorlooptijd</p>
        </Section>
      </div>

      {beroep.taalvereiste && (
        <Section 
          icon={<Languages className="w-6 h-6 text-red-900" />}
          title="Taalvereiste"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-red-900">{beroep.taalvereiste}</span>
            <div>
              <p className="font-semibold text-gray-900">Frans niveau vereist</p>
              <p className="text-sm text-gray-600">Volgens CEFR</p>
            </div>
          </div>
        </Section>
      )}

      <Section 
        icon={<TrendingUp className="w-6 h-6 text-red-900" />}
        title="Inkomen en Fiscale Regimes"
      >
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700">Gemiddeld jaarinkomen</p>
            <p className="text-2xl font-bold text-green-900 mt-1">€{beroep.gemiddeld_inkomen.toLocaleString()}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700 mb-2">Mogelijke fiscale regimes:</p>
            <div className="flex flex-wrap gap-2">
              {beroep.fiscaal_regimes.map((regime, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {regime}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-gray-900">Regionale vraag</p>
            <p className="text-lg capitalize mt-1">
              <span className={`font-semibold ${
                beroep.regionale_vraag === 'hoog' ? 'text-green-700' :
                beroep.regionale_vraag === 'gemiddeld' ? 'text-blue-700' :
                'text-gray-700'
              }`}>
                {beroep.regionale_vraag}
              </span>
            </p>
          </div>
        </div>
      </Section>

      {beroep.links.length > 0 && (
        <Section 
          icon={<ExternalLink className="w-6 h-6 text-red-900" />}
          title="Nuttige Links"
        >
          <div className="grid md:grid-cols-2 gap-3">
            {beroep.links.map((link, i) => (
              
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-red-900 hover:bg-red-50 transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-red-900">{link.titel}</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-900" />
              </a>
            ))}
          </div>
        </Section>
      )}

      <div className="pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
        Laatst bijgewerkt: {new Date(beroep.laatste_update).toLocaleDateString('nl-NL')}
      </div>
    </div>
  )
}
