'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import type { Beroep } from '@/lib/types'
import { searchBeroepen } from '@/lib/search'

interface SearchBarProps {
  onSelect: (beroep: Beroep) => void
  beroepen: Beroep[]
}

export function SearchBar({ onSelect, beroepen }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<Beroep[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const searchResults = searchBeroepen(query, beroepen)
        setResults(searchResults.map(r => r.beroep))
        setIsOpen(true)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, beroepen])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const handleSelect = (beroep: Beroep) => {
    onSelect(beroep)
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  // Highlight matched text
  const highlightMatch = (text: string, query: string) => {
    const lowerText = text.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const index = lowerText.indexOf(lowerQuery)
    
    if (index === -1) return text
    
    return (
      <>
        {text.substring(0, index)}
        <span className="bg-yellow-200 font-semibold">
          {text.substring(index, index + query.length)}
        </span>
        {text.substring(index + query.length)}
      </>
    )
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Zoek je beroep... (bijv. verpleegkundige, timmerman, grafisch ontwerper)"
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-all"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown with results */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((beroep, index) => (
                <li key={beroep.id}>
                  <button
                    onClick={() => handleSelect(beroep)}
                    className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors ${
                      index === selectedIndex ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="font-semibold text-gray-900">
                      {highlightMatch(beroep.naam_nl, query)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {highlightMatch(beroep.naam_fr, query)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 rounded">
                        {beroep.categorie}
                      </span>
                      {beroep.gereglementeerd && (
                        <span className="inline-block ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                          Gereglementeerd
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <p className="text-lg">Geen resultaten gevonden</p>
              <p className="text-sm mt-2">Probeer een andere zoekterm</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
