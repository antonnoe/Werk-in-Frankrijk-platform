# 🇫🇷 Werk in Frankrijk - Beroepenchecker v1.0

Complete, werkende versie van de beroepenchecker voor infofrankrijk.com

## ✅ WAT IS ER KLAAR?

- ✅ Volledige SearchBar met autocomplete en keyboard navigatie
- ✅ Complete BeroepResult weergave met alle secties
- ✅ Fuzzy search met Fuse.js (typo tolerance)
- ✅ 3 voorbeeld beroepen (verpleegkundige, timmerman, webdesigner)
- ✅ Responsive design (mobile + desktop)
- ✅ Print-vriendelijke styling
- ✅ Tailwind CSS met maroon (#800000) kleurenschema
- ✅ TypeScript configuratie
- ✅ Next.js 14 App Router

## 🚀 INSTALLATIE

### Stap 1: Upload naar GitHub
Upload alle bestanden naar je repository (vervangt de starter files)

### Stap 2: Installeer Dependencies
```bash
npm install
```

### Stap 3: Start Development Server
```bash
npm run dev
```

Open http://localhost:3000

## 📁 STRUCTUUR

```
werk-in-frankrijk/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── SearchBar.tsx     # ✅ Compleet met autocomplete
│   └── BeroepResult.tsx  # ✅ Compleet met alle secties
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   └── search.ts         # Search logica
├── data/
│   └── beroepen.json     # 3 voorbeelden (klaar om uit te breiden)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .gitignore
```

## 🎯 VOLGENDE STAPPEN

### 1. Data Uitbreiden (PRIORITEIT)
Voeg meer beroepen toe aan `data/beroepen.json`. Kopieer het format van de voorbeelden.

**Top prioriteit beroepen voor Nederlanders in Frankrijk:**
- Bouwsector: metselaar, elektricien, loodgieter, schilder, stukadoor
- Zorg: fysiotherapeut, osteopaat, tandarts, arts
- Horeca: kok, traiteur, patissier
- Zakelijk: boekhouder, vertaler, coach
- Ambacht: kapper, schoonheidsspecialist, bakker, slager

### 2. Deploy naar Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Volg de instructies, verbind met je GitHub account.

### 3. Embed op infofrankrijk.com
Na deployment:

```html
<iframe 
  src="https://jouw-vercel-url.vercel.app" 
  width="100%" 
  height="800" 
  frameborder="0"
  title="Beroepenchecker"
></iframe>
```

## 🔍 FEATURES

### SearchBar
- ✅ Real-time autocomplete
- ✅ Fuzzy search (typo tolerant)
- ✅ Keyboard navigatie (↑↓ + Enter)
- ✅ Highlight matched text
- ✅ Loading states
- ✅ Mobile-friendly

### BeroepResult
- ✅ Alle 15+ data velden getoond
- ✅ Icons per sectie (lucide-react)
- ✅ Clickable externe links
- ✅ Warning bij gereglementeerde beroepen
- ✅ Print-vriendelijke styling
- ✅ Responsive layout

## 📊 DATA FORMAT

Elk beroep in `beroepen.json` volgt dit format:

```json
{
  "id": "unieke-id",
  "naam_nl": "Nederlandse naam",
  "naam_fr": "Nom français",
  "categorie": "medisch|bouw|horeca|zakelijk|creatief|onderwijs|technisch|landbouw",
  "gereglementeerd": true/false,
  "diploma_eisen": ["Eis 1", "Eis 2"],
  "nl_diploma_erkend": true/false,
  "erkenning_procedure": "Beschrijving...",
  "erkenning_url": "https://...",
  "certificering_nodig": true/false,
  "certificering_waar": "Naam instantie",
  "certificering_url": "https://...",
  "chambre": "CMA|CCI|URSSAF|Ordre|Geen",
  "chambre_naam": "Volledige naam",
  "chambre_url": "https://...",
  "taalvereiste": "A2|B1|B2|C1|null",
  "verzekeringen": ["Verzekering 1", "Verzekering 2"],
  "kosten_euro": 150,
  "tijdlijn_maanden": "3-6",
  "fiscaal_regimes": ["Micro-BNC", "EI"],
  "gemiddeld_inkomen": 32000,
  "regionale_vraag": "laag|gemiddeld|hoog",
  "links": [
    {"titel": "Link titel", "url": "https://..."}
  ],
  "laatste_update": "2025-01-15"
}
```

## 🎨 STYLING

- Hoofdkleur: Maroon (#800000) voor InfoFrankrijk branding
- Tailwind CSS voor alle styling
- Responsive breakpoints: mobile-first
- Print: automatische aanpassingen voor print-vriendelijke output

## 📝 TESTEN

Test met de 3 voorbeelden:
1. Zoek "verpleeg" → Verpleegkundige
2. Zoek "timmer" → Timmerman
3. Zoek "web" → Webdesigner

## ⚠️ BELANGRIJK

- JSON syntax moet perfect zijn (geen trailing comma's!)
- Alle URL's moeten `https://` bevatten
- Laatste update datum: YYYY-MM-DD format
- Test elk nieuw beroep na toevoegen

## 🐛 TROUBLESHOOTING

**Fout bij `npm install`?**
- Verwijder `node_modules` en `package-lock.json`
- Run `npm install` opnieuw

**Page laadt niet?**
- Check console voor errors
- Verify `beroepen.json` is valid JSON (gebruik jsonlint.com)

**Search werkt niet?**
- Check of Fuse.js is geïnstalleerd
- Verify data format in beroepen.json

## 📞 SUPPORT

Voor vragen:
- Forum: nederlanders.fr
- Website: infofrankrijk.com
- Contact via nedergids.nl

## 📜 LICENTIE

© 2025 InfoFrankrijk.com - Alle rechten voorbehouden
