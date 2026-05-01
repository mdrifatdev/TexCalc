# TexCalc — Textile Engineering Calculator

## Overview
A production-ready bilingual (Bangla/English) textile engineering calculator web app built with React + Vite + Tailwind CSS v4. Features 50+ calculators across 6 domains, calculation history, favorites system, and bilingual search.

## Tech Stack
- **React 19** + **Vite 8**
- **Tailwind CSS v4** (configured via `src/index.css` `@theme` block)
- **React Router DOM v6** (HashRouter)
- **Lucide React** (icons only)
- **Google Fonts — Sora**

## Architecture

### Contexts
- `src/context/ThemeContext.jsx` — dark/light mode, `localStorage` key `texcalc-theme`, `.dark` on `<html>`
- `src/context/LangContext.jsx` — Bangla/English i18n, `localStorage` key `texcalc-lang`, default `bn`
- `src/context/AppContext.jsx` — history (last 10, `texcalc-history`) + favorites (`texcalc-favorites`) in `localStorage`

### Utilities
- `src/utils/lang.js` — all UI strings as `translations.bn` / `translations.en`
- `src/utils/formulas.js` — all formula functions + AQL table (ISO 2859-1, G1/G2/G3)
- `src/utils/calculators.js` — flat list of all calculators for search (`ALL_CALCULATORS`)

### Hooks
- `src/hooks/useAutoHistory.js` — debounced auto-save to history on valid result change

### Components
- `src/components/layout/Navbar.jsx` — sticky top bar with search dropdown, lang/theme toggles
- `src/components/layout/Sidebar.jsx` — nav links + favorites section
- `src/components/layout/Layout.jsx` — wraps pages, includes developer footer
- `src/components/ui/InputField.jsx` — labeled input with unit badge
- `src/components/ui/ResultCard.jsx` — result display with clipboard copy
- `src/components/ui/FormulaBox.jsx` — monospace formula display
- `src/components/ui/CategoryCard.jsx` — home category cards
- `src/components/ui/CalcPage.jsx` — page wrapper: tab bar (scrollable, star-favorite per tab), `InputPanel`, `ResultPanel`, `CalcCard`, `CardInputs`, `CardResults`

### Pages
- `src/pages/Home.jsx` — hero, 2-col mobile / 3-col desktop grid, favorites, history
- `src/pages/Spinning.jsx` — Count Conversion (bidirectional), Twist, Strength, Production, Quality
- `src/pages/Weaving.jsx` — GSM & Cover, Dimensions & Weight, Efficiency & Production
- `src/pages/Knitting.jsx` — GSM & Stitch, Production, Fabric Properties
- `src/pages/Dyeing.jsx` — Liquor Ratio, Chemicals, Recipe & Batch
- `src/pages/Garments.jsx` — Efficiency, Consumption, Targets
- `src/pages/TTQC.jsx` — AQL (ISO 2859-1), Defect Metrics, Quality Metrics, Fabric Tests

## Key Features
- **Bidirectional count conversion** — type in any of Ne/Tex/Denier/Nm, all others update
- **Tab overflow fix** — horizontal scroll on tab bar, no wrapping
- **Calculation history** — last 10 results saved to localStorage, shown on Home
- **Favorites** — star any tab; shown in sidebar and Home page
- **Search** — bilingual search bar in navbar + Home page; navigates to the correct page+tab
- **Developer footer** — Md Rifat (mdrifatdev), github.com/mdrifatdev, v1.0.0

## Design System
Colors defined in `src/index.css` via Tailwind `@theme {}`:
- Dark: `dark-bg` (#0f1117), `dark-surface`, `dark-border`, `dark-muted`
- Light: `light-bg` (#f8f9fc), `light-surface`, `light-border`, `light-muted`
- Accent: `accent` (#f59e0b), `accent-hover` (#d97706)
- Dark mode: class strategy — `.dark` on `<html>` + `@variant dark` in CSS

## Development
- Dev server: `npm run dev` → port 5000
- Build: `npm run build` → `dist/`

## Extensibility
- **New calculator**: add function to `formulas.js` + string to `lang.js` + tab in relevant page + entry in `calculators.js`
- **New language**: add a key block in `translations` in `lang.js` + update `LangContext`
- **Color change**: edit `@theme {}` block in `src/index.css`
