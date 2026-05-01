# TexCalc — Textile Engineering Calculator

## Overview
A production-ready bilingual (Bangla/English) textile engineering calculator web application built with React + Vite + Tailwind CSS v4.

## Tech Stack
- **React 19** + **Vite 8**
- **Tailwind CSS v4** (configured via `src/index.css` `@theme` block)
- **React Router DOM v6** (HashRouter for Vercel compatibility)
- **Lucide React** (icons only)
- **Google Fonts — Sora**

## Architecture

### Contexts
- `src/context/ThemeContext.jsx` — dark/light mode, persisted in `localStorage` key `texcalc-theme`, applies `.dark` class on `<html>`
- `src/context/LangContext.jsx` — Bangla/English i18n, persisted in `localStorage` key `texcalc-lang`, default `bn`

### Utilities
- `src/utils/lang.js` — all UI strings as `translations.bn` / `translations.en`
- `src/utils/formulas.js` — all calculator functions + AQL table (ISO 2859-1)

### Components
- `src/components/layout/Navbar.jsx` — sticky top bar with lang/theme toggles and hamburger
- `src/components/layout/Sidebar.jsx` — collapsible sidebar with NavLink active states
- `src/components/layout/Layout.jsx` — wraps all pages via React Router `<Outlet>`
- `src/components/ui/InputField.jsx` — labeled input with unit badge
- `src/components/ui/ResultCard.jsx` — result display with clipboard copy
- `src/components/ui/FormulaBox.jsx` — monospace formula display
- `src/components/ui/CategoryCard.jsx` — home page category cards with hover glow
- `src/components/ui/CalcPage.jsx` — shared calculator page wrapper with tab bar, InputPanel, ResultPanel

### Pages
- `src/pages/Home.jsx` — hero section + 6-category grid
- `src/pages/Spinning.jsx` — Count Conversion, TPI, Twist Factor
- `src/pages/Weaving.jsx` — GSM, Reed Count, Cover Factor
- `src/pages/Knitting.jsx` — GSM, Stitch Length
- `src/pages/Dyeing.jsx` — Liquor Ratio, Chemical Dosing, Salt Calculation
- `src/pages/Garments.jsx` — Line Efficiency, Fabric Consumption, SMV→Pieces/Hour
- `src/pages/TTQC.jsx` — AQL (ISO 2859-1 table), Defect Rate, DHU

## Design System
Colors defined in `src/index.css` via Tailwind `@theme {}`:
- Dark: `dark-bg`, `dark-surface`, `dark-border`, `dark-muted`
- Light: `light-bg`, `light-surface`, `light-border`, `light-muted`
- Accent: `accent` (#f59e0b), `accent-hover` (#d97706)

Dark mode: class strategy — `.dark` on `<html>` + `@variant dark` in CSS

## Development
- Dev server: `npm run dev` → port 5000
- Build: `npm run build` → `dist/`

## Extensibility
- **New calculator**: add function to `formulas.js` + string to `lang.js` + tab in relevant page
- **New language**: add a key block in `translations` in `lang.js` + update `LangContext`
- **New category**: add route in `App.jsx` + new page + entry in `Sidebar.jsx` navItems
- **Color change**: edit `@theme {}` block in `src/index.css`
