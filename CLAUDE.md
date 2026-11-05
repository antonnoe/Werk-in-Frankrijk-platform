# CLAUDE.md

Repo: Werk-in-Frankrijk-platform

## Wat dit is

Beroepenchecker voor Nederlanders die in Frankrijk willen werken ("Werk in Frankrijk - Beroepenchecker", package.json en app/layout.tsx). Zoeken in een lijst beroepen, met per beroep eisen zoals diploma, gereglementeerd, verzekering en autoentrepreneur. Er is geen README.

## Live adres

Niet in de repo vastgelegd.

## Opbouw

- `app/page.tsx` : zoekpagina, `app/layout.tsx`, `app/globals.css`
- `app/generator/page.tsx` : formulier dat JSON voor een nieuw beroep genereert
- `components/` : SearchBar, SectorButtons, BeroepResult
- `lib/` : getBeroepen (leest en normaliseert de data), search, sectors, types
- `data/beroepen.json` : de beroepen zelf

## Techniek

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, Fuse.js voor zoeken, lucide-react voor iconen. Scripts: `dev`, `build`, `start`, `lint`. Geen API-routes en geen database, de data staat in een JSON-bestand.

## Externe diensten en namen van omgevingsvariabelen

Geen externe diensten en geen omgevingsvariabelen in de code. Alleen een link naar formalites.entreprises.gouv.fr in `components/BeroepResult.tsx`.

## Hoe het live gaat

Niet in de repo vastgelegd. Er is geen vercel.json, netlify-bestand of workflow, het is een standaard Next.js-project.

## Regels en besluiten

Nog geen vastgelegd

Laatst nagelopen: 5 november 2026
