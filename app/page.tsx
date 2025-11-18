'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { BeroepResult } from '@/components/BeroepResult'
import type { Beroep } from '@/lib/types'
import beroepen from '@/data/beroepen.json'

export default function HomePage() {
  const [selectedBeroep, setSelectedBeroep] = useState<Beroep | null>(null)

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            🇫🇷 Werk in Frankrijk
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek wat je nodig hebt om jouw beroep in Frankrijk uit te oefenen
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          beroepen={beroepen as Beroep[]} 
          onSelect={setSelectedBeroep}
        />

        {/* Info Text */}
        {!selectedBeroep && (
          <div className="text-center text-gray-600 max-w-2xl mx-auto space-y-3">
            <p>
              Zoek je beroep om te zien welke diploma's, verzekeringen en procedures nodig zijn.
            </p>
            <p className="text-sm">
              💡 Tip: Type minimaal 2 letters om resultaten te zien
            </p>
          </div>
        )}

        {/* Result */}
        {selectedBeroep && (
          <div className="animate-fadeIn">
            <BeroepResult beroep={selectedBeroep} />
            
            {/* New Search Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => setSelectedBeroep(null)}
                className="px-6 py-3 bg-red-900 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors"
              >
                Zoek een ander beroep
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-12 border-t border-gray-200">
          <p>
            Een project van{' '}
            <a 
              href="https://www.infofrankrijk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-900 hover:underline font-medium"
            >
              InfoFrankrijk.com
            </a>
          </p>
          <p className="mt-2">
            Voor vragen en community:{' '}
            <a 
              href="https://www.nederlanders.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-900 hover:underline font-medium"
            >
              Nederlanders.fr
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
