'use client'

import type { Beroep } from '@/lib/types'
import { FileText, GraduationCap, Shield, Building, Languages, Euro, Clock, TrendingUp, ExternalLink, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface BeroepResultProps {
  beroep: Beroep
}

export function BeroepResult({ beroep }: BeroepResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-2 border-gray-200 rounded-xl shadow-lg p-8 space-y-6">
      <div className="border-b-2 border-gray-200 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="w-8 h-8 text-red-900" />
          <h1 className="text-3xl font-bold text-gray-900">{beroep.naam_nl}</h1>
        </div>
        <p className="text-xl text-gray-600">{beroep.naam_fr}</p>
        <span className="inline-block mt-4 px-4 py-1.5 bg-red-50 text-red-900 rounded-full text-sm font-medium">
          {beroep.categorie}
        </span>
      </div>

      {beroep.gereglementeerd && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-5 flex gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <div>
            <p className="font-bold text-yellow-900">Gereglementeerd Beroep</p>
            <p className="text-yellow-800 mt-1">Dit beroep vereist specifieke diploma's of kwalificaties.</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="w-6 h-6 text-red-900" />
            <h2 className="text-xl font-bold">Diploma-eisen</h2>
          </div>
          {beroep.diploma_eisen.length > 0 && (
            <ul className="list-disc ml-9 space-y-1 text-gray-600">
              {beroep.diploma_eisen.map((eis, i) => <li key={i}>{eis}</li>)}
            </ul>
          )}
          <div className="ml-9 mt-3 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold">Nederlands diploma: {beroep.nl_diploma_erkend ? 'Erkend' : 'Niet automatisch erkend'}</p>
            <p className="text-sm text-gray-600 mt-1">{beroep.erkenning_procedure}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <Building className="w-6 h-6 text-red-900" />
            <h2 className="text-xl font-bold">Registratie</h2>
          </div>
          <div className="ml-9 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold">Beroepskamer</p>
            <p className="text-lg text-blue-900 font-medium mt-1">{beroep.chambre_naam}</p>
          </div>
        </div>

        {beroep.verzekeringen.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-red-900" />
              <h2 className="text-xl font-bold">Verzekeringen</h2>
            </div>
            <ul className="ml-9 space-y-2">
              {beroep.verzekeringen.map((v, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Euro className="w-6 h-6 text-red-900" />
              <h2 className="text-xl font-bold">Kosten</h2>
            </div>
            <p className="ml-9 text-3xl font-bold">€{beroep.kosten_euro}</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-red-900" />
              <h2 className="text-xl font-bold">Tijdlijn</h2>
            </div>
            <p className="ml-9 text-3xl font-bold">{beroep.tijdlijn_maanden} maanden</p>
          </div>
        </div>

        {beroep.taalvereiste && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Languages className="w-6 h-6 text-red-900" />
              <h2 className="text-xl font-bold">Taalvereiste</h2>
            </div>
            <p className="ml-9 text-4xl font-bold text-red-900">{beroep.taalvereiste}</p>
          </div>
        )}

        <div>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-red-900" />
            <h2 className="text-xl font-bold">Inkomen</h2>
          </div>
          <div className="ml-9 p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700">Gemiddeld jaarinkomen</p>
            <p className="text-2xl font-bold text-green-900">€{beroep.gemiddeld_inkomen.toLocaleString()}</p>
          </div>
        </div>

        {beroep.links.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <ExternalLink className="w-6 h-6 text-red-900" />
              <h2 className="text-xl font-bold">Links</h2>
            </div>
            <div className="ml-9 space-y-2">
              {beroep.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-3 border-2 border-gray-200 rounded-lg hover:border-red-900">
                  {link.titel}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t text-center text-sm text-gray-500">
        Laatst bijgewerkt: {new Date(beroep.laatste_update).toLocaleDateString('nl-NL')}
      </div>
    </div>
  )
}
