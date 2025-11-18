# Werk-in-Frankrijk-platform

# Werk in Frankrijk - Beroepenchecker v1.0

Eenvoudige iframe-tool voor infofrankrijk.com waarmee bezoekers snel kunnen zien wat nodig is om hun beroep in Frankrijk uit te oefenen.

## 🎯 v1.0 Scope (Deze versie)

**Doel:** Simpele, embeddable tool die antwoord geeft op: "Wat heb ik nodig om beroep X in Frankrijk te doen?"

**Deliverable:** 
- Standalone Next.js app
- Embeddable via iframe in infofrankrijk.com
- Responsive design (desktop + mobile)
- 1500+ beroepen met complete informatie

## 📊 Data per Beroep (v1.0)

Wanneer gebruiker een beroep selecteert, krijgt hij/zij:
```
✓ Beroepsnaam (NL/FR)
✓ Categorie (medisch/bouw/horeca/etc.)
✓ Gereglementeerd? (ja/nee)
✓ Diploma-eisen
✓ NL diploma erkend? + Procedure
✓ Certificering nodig? + Waar?
✓ Chambre (CMA/CCI/URSSAF)
✓ Taalvereiste (A2/B1/B2/C1)
✓ Geschatte kosten (€)
✓ Tijdlijn proces (maanden)
✓ Verzekeringen vereist
✓ Fiscaal regime opties
✓ Gemiddeld inkomen (€/jaar)
✓ Regionale vraag (indicatief)
✓ Relevante links/documenten
```

## 🎨 UI Flow (Simpel)
```
┌─────────────────────────────────────┐
│  🔍 Zoek je beroep...               │
│  [dropdown/autocomplete]             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  📋 BEROEP: Verpleegkundige         │
│  🏷️  Categorie: Medisch & Zorg     │
│                                     │
│  ⚖️  GEREGLEMENTEERD: Ja            │
│                                     │
│  🎓 DIPLOMA-EISEN:                  │
│  • Bachelor verpleegkunde vereist  │
│  • Nederlandse diploma: Erkend     │
│  • Procedure: DREETS aanvraag      │
│  • Link: [guichet-qualifications]  │
│                                     │
│  📝 REGISTRATIE:                    │
│  • Chambre: Ordre des Infirmiers   │
│  • Contactgegevens: [link]         │
│                                     │
│  💰 KOSTEN & TIJD:                  │
│  • Erkenning: €150                 │
│  • Registratie: €0                 │
│  • Totale tijdlijn: 3-6 maanden    │
│                                     │
│  🗣️  TAAL: B1 Frans vereist         │
│                                     │
│  🛡️  VERZEKERINGEN:                 │
│  • RC Professionnelle verplicht    │
│                                     │
│  💼 FISCAAL:                        │
│  • Micro-BNC of SELARL mogelijk    │
│                                     │
│  💵 INKOMEN:                        │
│  • Gemiddeld: €32.000/jaar         │
│  • Vraag: Hoog in rural gebieden   │
│                                     │
│  🔗 LINKS:                          │
│  • [DREETS procedure]              │
│  • [Ordre des Infirmiers]          │
│  • [ENIC-NARIC info]               │
└─────────────────────────────────────┘
```

## 🏗️ Tech Stack (Minimaal)

- **Framework:** Next.js 14 (TypeScript)
- **Styling:** Tailwind CSS
- **Data:** Static JSON files (geen database!)
- **Deployment:** Vercel
- **Build Time:** ~5-7 dagen

## 📁 Simpele Structuur
```
werk-in-frankrijk-v1/
├── app/
│   ├── page.tsx               # Search interface
│   └── api/
│       └── beroepen/route.ts  # Return beroep data
│
├── components/
│   ├── SearchBar.tsx          # Autocomplete dropdown
│   └── BeroepResult.tsx       # Display result
│
├── data/
│   └── beroepen.json          # ALL DATA HERE (1500+ beroepen)
│
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   └── search.ts              # Search logic
│
└── public/
    └── embed.html             # iframe example
```

## 💾 Data Structure
```typescript
// lib/types.ts

export interface Beroep {
  // Basis
  id: string
  naam_nl: string
  naam_fr: string
  categorie: 'medisch' | 'bouw' | 'horeca' | 'zakelijk' | 'creatief' | 'onderwijs'
  
  // Regulering
  gereglementeerd: boolean
  
  // Diploma
  diploma_eisen: string[]
  nl_diploma_erkend: boolean
  erkenning_procedure: string
  erkenning_url: string
  
  // Certificering
  certificering_nodig: boolean
  certificering_waar: string
  certificering_url: string
  
  // Registratie
  chambre: 'CMA' | 'CCI' | 'URSSAF' | 'Ordre'
  chambre_naam: string
  chambre_url: string
  
  // Vereisten
  taalvereiste: 'A2' | 'B1' | 'B2' | 'C1' | null
  verzekeringen: string[]
  
  // Financieel/Praktisch
  kosten_euro: number
  tijdlijn_maanden: string  // "3-6"
  fiscaal_regimes: string[]
  gemiddeld_inkomen: number
  regionale_vraag: 'laag' | 'gemiddeld' | 'hoog'
  
  // Links
  links: {
    titel: string
    url: string
  }[]
  
  // Meta
  laatste_update: string
}
```

## 📝 Data Voorbeeld
```json
{
  "id": "verpleegkundige",
  "naam_nl": "Verpleegkundige",
  "naam_fr": "Infirmier / Infirmière",
  "categorie": "medisch",
  "gereglementeerd": true,
  "diploma_eisen": [
    "Bachelor verpleegkunde",
    "Registratie in BIG register (NL)"
  ],
  "nl_diploma_erkend": true,
  "erkenning_procedure": "Aanvraag bij DREETS via guichet-qualifications. Documenten: diploma, stage-bewijzen, BIG registratie.",
  "erkenning_url": "https://www.guichet-qualifications.fr/...",
  "certificering_nodig": true,
  "certificering_waar": "Ordre National des Infirmiers",
  "certificering_url": "https://www.ordre-infirmiers.fr",
  "chambre": "Ordre",
  "chambre_naam": "Ordre National des Infirmiers",
  "chambre_url": "https://www.ordre-infirmiers.fr",
  "taalvereiste": "B1",
  "verzekeringen": ["RC Professionnelle"],
  "kosten_euro": 150,
  "tijdlijn_maanden": "3-6",
  "fiscaal_regimes": ["Micro-BNC", "SELARL"],
  "gemiddeld_inkomen": 32000,
  "regionale_vraag": "hoog",
  "links": [
    {
      "titel": "DREETS procedure",
      "url": "https://..."
    },
    {
      "titel": "Ordre registratie",
      "url": "https://..."
    },
    {
      "titel": "ENIC-NARIC info",
      "url": "https://..."
    }
  ],
  "laatste_update": "2025-01-15"
}
```

## 🚀 Development Plan (7 dagen)

### Dag 1: Setup
- [ ] Next.js project init
- [ ] Tailwind setup
- [ ] Types definiëren
- [ ] Deploy skeleton naar Vercel

### Dag 2-3: Data Verzamelen
- [ ] Top 100 meest gevraagde beroepen identificeren
- [ ] Data scrapen/compileren van:
  - Guichet-qualifications.fr
  - RPPS voor medische beroepen
  - EU database
- [ ] JSON file maken met 100 beroepen

### Dag 4: UI Bouwen
- [ ] SearchBar component
- [ ] BeroepResult component
- [ ] Responsive styling
- [ ] Test iframe embedding

### Dag 5: Data Uitbreiden
- [ ] Nog 400 beroepen toevoegen
- [ ] CMA/CCI data per beroep
- [ ] Links verifiëren

### Dag 6: Polish
- [ ] Laatste 1000 beroepen toevoegen
- [ ] Error states
- [ ] Loading states
- [ ] Print styling

### Dag 7: Launch
- [ ] Final testing
- [ ] Embed code genereren
- [ ] Deploy production
- [ ] Implement op infofrankrijk.com

## 🎯 Copilot Prompts voor Snelle Build

### SearchBar Component
```typescript
// components/SearchBar.tsx

// TODO Copilot: Maak een autocomplete search component:
// - Input field met icon
// - Zoekt door beroepen.json (naam_nl EN naam_fr)
// - Toont max 10 resultaten tijdens typen
// - Highlight matched text
// - Keyboard navigatie (arrows + enter)
// - OnSelect callback met geselecteerd beroep
// - Tailwind styling: clean, minimaal, mobile-friendly

export function SearchBar({ onSelect }: { onSelect: (beroep: Beroep) => void }) {
  // Copilot genereert...
}
```

### BeroepResult Component
```typescript
// components/BeroepResult.tsx

// TODO Copilot: Maak een result display component:
// - Toont alle Beroep velden in duidelijke secties
// - Icons per sectie (lucide-react)
// - Accordion voor lange secties
// - Links als clickable buttons
// - Print-friendly styling
// - Tailwind: card layout, goed leesbaar

export function BeroepResult({ beroep }: { beroep: Beroep }) {
  // Copilot genereert...
}
```

### Search Logic
```typescript
// lib/search.ts

// TODO Copilot: Maak search functies:
// - searchBeroepen(query: string): filter beroepen.json op query
// - Fuzzy matching (typo tolerance)
// - Search in naam_nl, naam_fr, en categorie
// - Return max 10 resultaten, gesorteerd op relevantie

import beroepen from '@/data/beroepen.json'

export function searchBeroepen(query: string): Beroep[] {
  // Copilot genereert...
}
```

## 📦 Dependencies (Minimaal)
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.292.0",
    "fuse.js": "^7.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.3.0"
  }
}
```

## 🎨 Iframe Embedding

Op infofrankrijk.com:
```html
<!-- Voeg toe aan je pagina -->
<iframe 
  src="https://werk-in-frankrijk.vercel.app" 
  width="100%" 
  height="800" 
  frameborder="0"
  title="Beroepenchecker"
></iframe>
```

Of met custom styling:
```html
<div style="max-width: 800px; margin: 0 auto;">
  <iframe 
    src="https://werk-in-frankrijk.vercel.app"
    style="width: 100%; height: 800px; border: 1px solid #e5e7eb; border-radius: 8px;"
    title="Beroepenchecker"
  ></iframe>
</div>
```

## 🔄 Data Updates (Later)

v1.0 = Static JSON  
v2.0 = Add update scripts die data periodiek refreshen
```bash
# Later: npm run update-data
# Script scraped Guichet, update JSON, commit
```

## ✅ Launch Checklist

- [ ] 1500+ beroepen in JSON
- [ ] Search werkt vlot
- [ ] Alle data velden tonen correct
- [ ] Responsive op mobile
- [ ] Iframe embed getest
- [ ] Loading/error states
- [ ] Deploy naar Vercel
- [ ] Embed op infofrankrijk.com
- [ ] Test met 5-10 echte gebruikers
- [ ] Announce op nederlanders.fr

## 🚫 NIET in v1.0

Deze features bewaren voor v2.0:

- ❌ User accounts
- ❌ Favorites/save
- ❌ PDF export
- ❌ Vergelijk tool
- ❌ Regionale kaart
- ❌ Real-time API integraties
- ❌ Database
- ❌ Admin panel
- ❌ Email notificaties

## 📈 v2.0 Wishlist (Later)

Als v1.0 succesvol is:
- Database (Postgres/MySQL)
- Real-time API sync
- PDF export
- Vergelijk beroepen
- User accounts
- Integration nedergijs.nl
- Regional demand maps

---

**v1.0 Doel:** Simpel, werkend, bruikbaar binnen 1 week  
**Focus:** Data completeness + clean UX  
**Deploy:** Vercel (gratis tier)  
**Embed:** infofrankrijk.com

**Ready to build?** 🚀
