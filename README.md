# Werk in Frankrijk - Starter Package

## 📦 Inhoud

Dit pakket bevat alle essentiële startbestanden voor de Beroepenchecker.

```
werk-in-frankrijk-starter/
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   └── search.ts         # Search logica (met Copilot prompts)
├── components/
│   ├── SearchBar.tsx     # Autocomplete component (met Copilot prompts)
│   └── BeroepResult.tsx  # Result display (met Copilot prompts)
├── data/
│   └── beroepen.json     # 3 voorbeelden (verpleegkundige, timmerman, webdesigner)
├── package.json          # Dependencies
└── README.md            # Deze file
```

## 🚀 Installatie

1. **Upload naar GitHub:**
   ```bash
   # Kopieer alle bestanden naar je repo
   cd Werk-in-Frankrijk-platform
   # Plaats de bestanden uit deze ZIP in je project
   ```

2. **Installeer dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🤖 GitHub Copilot

Alle bestanden bevatten `TODO Copilot:` comments.
Deze geven Copilot instructies om de implementatie te voltooien.

### SearchBar.tsx
Copilot moet implementeren:
- Autocomplete dropdown
- Keyboard navigatie
- Debounced search
- Highlight matched text

### BeroepResult.tsx
Copilot moet implementeren:
- Alle sectie displays
- Icons per sectie
- Accordion functionaliteit
- Print styling

### search.ts
Copilot moet implementeren:
- Fuse.js integratie
- Fuzzy search
- Result ranking

## 📝 Volgende Stappen

1. Push dit pakket naar GitHub
2. Open in VS Code met Copilot
3. Laat Copilot de TODO's implementeren
4. Test met de 3 voorbeeld-beroepen
5. Voeg meer beroepen toe aan `data/beroepen.json`

## 🎯 Data Uitbreiden

Om meer beroepen toe te voegen, kopieer het format uit `beroepen.json`:
- Vul alle verplichte velden in
- Links naar officiële bronnen
- Update `laatste_update` datum

## ⚠️ Belangrijk

- Alle componenten zijn 'client' components ('use client')
- Tailwind styling gebruikt maroon (#800000) als hoofdkleur
- Icons komen uit lucide-react
- Search gebruikt Fuse.js voor typo tolerance
