# PLI-9: Layout & CI Design System

## Status: 🔵 Planned

## Beschreibung
Globales Layout, Navigation und Design System im CI der Praxis für Lösungs-Impulse (Teal/Weiss, Swiss-Clean).

## User Stories
- Als **User** möchte ich eine konsistente, professionelle Oberfläche sehen, die zum Branding von Lösungs-Impulse passt
- Als **Mitglied** möchte ich eine klare Navigation haben (Dashboard, Lehrgänge, Einstellungen)
- Als **Admin** möchte ich eine separate Admin-Navigation haben (Dashboard, Mitglieder, Lehrgänge)
- Als **Mobile-User** möchte ich die Plattform komfortabel auf dem Handy nutzen können

## Acceptance Criteria
- [ ] **Farben:**
  - [ ] Primary: Teal (#0099A8)
  - [ ] Background: Weiss (#FFFFFF)
  - [ ] Text: Dark Charcoal (#333333)
  - [ ] Secondary BG: Light Gray (#F5F5F5)
  - [ ] Error: Rot (#DC2626)
  - [ ] Success: Grün (#16A34A)
- [ ] **Typografie:**
  - [ ] Font: Inter (oder vergleichbare Sans-Serif)
  - [ ] Headings: Semi-Bold/Bold
  - [ ] Body: Regular, 16px Basis
  - [ ] Großzügiger Line-Height (1.5+)
- [ ] **Admin-Layout:**
  - [ ] Sidebar-Navigation links (Desktop): Dashboard, Mitglieder, Lehrgänge
  - [ ] Header mit Logo + Admin-Name + Logout
  - [ ] Hamburger-Menu (Mobile)
- [ ] **Mitglieder-Layout:**
  - [ ] Header mit Logo + Mitglieder-Name + Logout
  - [ ] Clean, Content-fokussiert, minimale Navigation
- [ ] **Login-Seite:**
  - [ ] Zentriertes Login-Formular
  - [ ] Logo oben
  - [ ] PLI Branding (Teal Akzente)
- [ ] **Responsive Breakpoints:**
  - [ ] Desktop: ≥1024px (Sidebar)
  - [ ] Tablet: 768-1023px (Kompakte Sidebar oder Top-Nav)
  - [ ] Mobile: <768px (Hamburger/Bottom-Nav)
- [ ] **Components (shadcn/ui):**
  - [ ] Buttons, Inputs, Cards, Tables, Toggles, Dropdowns im CI gestylt
  - [ ] Loading States (Skeleton/Spinner)
  - [ ] Toast-Notifications für Erfolg/Fehler

## Edge Cases
- Logo nicht verfügbar → Text-Fallback "Lösungs-Impulse"
- Sehr schmales Fenster (<320px) → Minimum-Width sicherstellen
- Dark Mode → Nicht im Scope (nur Light Mode)

## Abhängigkeiten
- Keine (kann parallel zu PLI-1 gebaut werden)
