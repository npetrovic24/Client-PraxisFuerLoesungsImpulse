# PLI Lernportal – Feature Spec

## Projekt
**Kunde:** Praxis für Lösungs-Impulse AG (Marianne Flury)
**Domain:** loesungs-impulse.ch
**Ziel:** Custom Lernportal als Ersatz für FunnelCockpit "Content Funnels"
**Referenz:** LearningSuite.io (Feature-Referenz, nicht Klon)

---

## 1. Überblick

Ein Mitgliederportal für Coaching-Lehrgänge mit:
- Admin-Bereich zur Verwaltung von Lehrgängen, Modulen, Tagen und Mitgliedern
- Mitglieder-Bereich zum Konsumieren von Kursinhalten (Canva-Embeds, Dateien)
- Granulare Zugriffssteuerung (pro Lehrgang, Modul ODER einzelner Tag)

---

## 2. Bestehende Struktur (FunnelCockpit)

### Daten (via API extrahiert)
- **150 Pages** im Content-Funnel
- **~35 Lehrgänge**, strukturiert als einzelne Pages pro Tag
- Teilweise mit Jahresversionen (z.B. "ADHS Tag 1" + "ADHS Tag 1 - 2025")

### Lehrgänge (Auszug)
| Lehrgang | Tage | Struktur |
|----------|------|----------|
| ADHS Coach | 10+ | Tage (mit 2025er Variante) |
| Autismus Coach | 12+ | Tage (mit 2025er Variante) |
| CAS Leadership PLI® | 15 | Tage |
| PLI Basis | 5 Module × 2 Tage | Module → Tage |
| PLI Jobcoach | 3 Module × 4 Sequenzen | Module → Sequenzen |
| Klassenassistenz PLI® | 6 Tage + 4 Aufbaukurs | Tage |
| Neurodivergenz am Arbeitsplatz | 5 | Tage |
| PLI Ernährungsberater | 5 | Tage |
| Hochsensibilität PLI® | 5 | Tage |
| PLI Lerncoach | 5 | Tage |
| PLI Psychografie | 5 | Tage |
| Resilienzcoach | 5 | Tage |
| ... und ~23 weitere | 1-5 | Tage/Sequenzen |

### Content pro Tag
- **Canva-Embeds** (Präsentationen/Videos, aufgenommen in Canva)
- Eventuell Dateien (PDFs, Downloads)

---

## 3. Features

### 3.1 Authentication & User Management
- **Login/Register** via Email + Passwort (Supabase Auth)
- **Rollen:** Admin, Mitglied
- **Admin kann:**
  - Mitglieder anlegen (Name, Email, Passwort)
  - Mitglieder aktivieren/deaktivieren
  - Passwort zurücksetzen
- **Mitglied kann:**
  - Einloggen
  - Eigenes Passwort ändern

### 3.2 Kursstruktur (3-Level-Hierarchie)
```
Lehrgang (z.B. "ADHS Coach 2025")
  └── Modul (z.B. "Modul 1" – optional, kann auch nur Tage geben)
      └── Tag/Einheit (z.B. "Tag 1")
          └── Content (Canva-Embeds, Dateien, Text)
```

- **Lehrgänge:** Name, Beschreibung, Thumbnail, Kategorie-Tags, Status (aktiv/inaktiv)
- **Module:** Name, Reihenfolge (optional – Lehrgänge können direkt Tage haben)
- **Tage/Einheiten:** Name, Reihenfolge, Content-Blöcke

### 3.3 Content-Management (Admin)
Pro Tag/Einheit können folgende Content-Blöcke hinzugefügt werden:
- **Canva-Embed:** URL eingeben → wird als iFrame gerendert
- **Datei-Upload:** PDFs, Dokumente (Supabase Storage)
- **Text-Block:** Rich-Text für Notizen/Anleitungen
- **Externe Links:** z.B. zu weiteren Ressourcen
- Blöcke sind sortierbar (Drag & Drop)

### 3.4 Zugriffssteuerung (Granular)
Admin kann pro Mitglied steuern:
- **Ganzer Lehrgang** freischalten/sperren
- **Einzelnes Modul** freischalten/sperren
- **Einzelner Tag** freischalten/sperren
- Hierarchie: Lehrgang-Sperre überschreibt Modul/Tag-Freischaltung
- UI: Einfache Toggle-Matrix (Mitglied × Lehrgang/Modul/Tag)

### 3.5 Mitglieder-Portal
- **Dashboard:** "Meine Lehrgänge" – alle freigeschalteten Lehrgänge als Cards
- **Lehrgang-Ansicht:** Module/Tage als Sidebar-Navigation
- **Tag-Ansicht:** Content-Blöcke (Canva-Embed, Dateien, Text)
- **Gesperrte Inhalte:** Lock-Icon, kein Zugriff, Hinweis "Noch nicht freigeschaltet"
- **Responsive:** Desktop + Tablet + Mobile

### 3.6 Kohorten/Jahrgänge (Nice-to-have)
- Lehrgänge können als Kopie für neue Jahrgänge dupliziert werden
- Mitglieder werden Kohorten zugewiesen (z.B. "ADHS 2025", "ADHS 2026")
- Verhindert Duplikat-Pages wie aktuell in FunnelCockpit

---

## 4. Tech Stack

| Komponente | Technologie |
|------------|-------------|
| Frontend | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Backend/Auth | Supabase (Auth + DB + Storage) |
| Database | PostgreSQL (via Supabase) |
| Hosting | Vercel |
| Repo | GitHub (npetrovic24) |

---

## 5. DB-Schema (Draft)

### courses (Lehrgänge)
- id, name, description, thumbnail_url, category_tags[], is_active, sort_order, created_at

### modules (Module – optional)
- id, course_id (FK), name, sort_order, created_at

### units (Tage/Einheiten)
- id, course_id (FK), module_id (FK, nullable), name, sort_order, created_at

### content_blocks
- id, unit_id (FK), type (canva_embed|file|text|link), content (JSON), sort_order, created_at

### profiles (Mitglieder)
- id (= auth.users.id), email, full_name, role (admin|member), is_active, created_at

### access_grants (Zugriffssteuerung)
- id, user_id (FK), course_id (FK, nullable), module_id (FK, nullable), unit_id (FK, nullable), is_granted (boolean), created_at
- Logik: Spezifischste Regel gewinnt (Tag > Modul > Lehrgang)

---

## 6. CI / Design

### Farben
- **Primary:** Teal/Petrol (#0099A8)
- **Background:** Weiss (#FFFFFF)
- **Text:** Dark Charcoal (#333333)
- **Secondary BG:** Light Gray (#F5F5F5)
- **Accent/Hover:** Teal-Tint für Hover-States

### Typografie
- Sans-Serif (Inter oder ähnlich)
- Clean, großzügiger Whitespace
- Swiss-Design-Ästhetik: Aufgeräumt, professionell, ruhig

### Layout
- Sidebar-Navigation für Kurse (Desktop)
- Bottom-Nav oder Hamburger (Mobile)
- Cards für Lehrgangs-Übersicht
- Minimalistisch, Content-fokussiert

---

## 7. Phasen

### Phase 1: Foundation (Tag 1-2)
- [ ] GitHub Repo + Next.js + Supabase Setup
- [ ] DB-Schema + Migrations
- [ ] Auth (Login/Register)
- [ ] Basis-Layout mit CI

### Phase 2: Admin-Panel (Tag 3-5)
- [ ] Mitglieder-CRUD (anlegen, aktivieren, sperren)
- [ ] Lehrgänge + Module + Tage CRUD
- [ ] Content-Blöcke pro Tag (Canva-Embed, Datei-Upload, Text)
- [ ] Zugriffssteuerung (Toggle-Matrix)

### Phase 3: Mitglieder-Portal (Tag 6-8)
- [ ] Dashboard "Meine Lehrgänge"
- [ ] Kurs-Navigation (Sidebar)
- [ ] Tag-Ansicht mit Content-Rendering
- [ ] Lock/Unlock-Logik
- [ ] Responsive Design

### Phase 4: Polish & Deploy (Tag 9-10)
- [ ] CI Fine-tuning
- [ ] Mobile-Optimierung
- [ ] Vercel Deploy + Custom Domain
- [ ] Daten-Migration (FunnelCockpit → neues Portal)

---

## 8. Offene Fragen
1. Eigene Domain für Portal? (z.B. portal.loesungs-impulse.ch oder learn.loesungs-impulse.ch)
2. Sollen bestehende Canva-Links 1:1 übernommen werden?
3. Braucht Marianne Email-Benachrichtigungen bei Freischaltung?
4. Logo-Datei in hoher Auflösung vorhanden?
5. Soll es eine "Fortschrittsanzeige" geben (welche Tage schon angeschaut)?
