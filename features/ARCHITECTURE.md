# PLI Lernportal – Solution Architecture

## Status: 🔵 Review

---

## 1. Gesamtübersicht (Component-Struktur)

```
PLI Lernportal
├── 🔐 Login-Seite
│   └── Login-Formular (Email + Passwort)
│
├── 👤 Mitglieder-Bereich
│   ├── Dashboard (/dashboard)
│   │   └── Lehrgang-Cards (Grid)
│   ├── Lehrgang-Ansicht (/courses/:id)
│   │   ├── Sidebar: Module → Tage (mit Lock-Icons)
│   │   └── Content-Bereich: Canva-Embed, Dateien, Text
│   └── Einstellungen (/settings)
│       └── Passwort ändern
│
├── 🛡️ Admin-Bereich
│   ├── Admin Dashboard (/admin)
│   │   └── Statistiken (Mitglieder-Anzahl, Lehrgänge, etc.)
│   ├── Mitglieder-Verwaltung (/admin/members)
│   │   ├── Mitglieder-Tabelle (Name, Email, Status)
│   │   ├── Mitglied anlegen (Formular)
│   │   └── Zugriffs-Matrix pro Mitglied (/admin/members/:id/access)
│   ├── Lehrgang-Verwaltung (/admin/courses)
│   │   ├── Lehrgang-Übersicht (Card-Grid)
│   │   ├── Lehrgang bearbeiten
│   │   ├── Module & Tage verwalten (/admin/courses/:id)
│   │   ├── Content-Editor pro Tag (/admin/courses/:id/units/:unitId)
│   │   └── Zugriffs-Übersicht pro Lehrgang (/admin/courses/:id/access)
│   └── Admin-Navigation (Sidebar)
│
└── 🎨 Globales Layout
    ├── Header (Logo, User-Name, Logout)
    ├── Sidebar (Admin) / Clean Header (Mitglied)
    └── Toast-Notifications
```

---

## 2. Daten-Model

### Mitglieder (profiles)
Jedes Mitglied hat:
- Eindeutige ID (verknüpft mit Supabase Auth)
- Vollständiger Name
- Email-Adresse
- Rolle: "admin" oder "member"
- Status: aktiv oder deaktiviert
- Erstellungszeitpunkt

### Lehrgänge (courses)
Jeder Lehrgang hat:
- Eindeutige ID
- Name (z.B. "ADHS Coach 2025")
- Beschreibung (optional)
- Thumbnail-Bild (URL zu Supabase Storage)
- Kategorie-Tags (z.B. ["Coaching", "Neurodivergenz"])
- Status: aktiv oder inaktiv
- Sortier-Reihenfolge
- Erstellungszeitpunkt

### Module (modules)
Jedes Modul hat:
- Eindeutige ID
- Gehört zu: einem Lehrgang
- Name (z.B. "Modul 1")
- Sortier-Reihenfolge

_Module sind OPTIONAL – Lehrgänge können auch direkt Tage haben._

### Tage/Einheiten (units)
Jeder Tag hat:
- Eindeutige ID
- Gehört zu: einem Lehrgang
- Gehört zu: einem Modul (optional, kann leer sein)
- Name (z.B. "Tag 1")
- Sortier-Reihenfolge

### Content-Blöcke (content_blocks)
Jeder Block hat:
- Eindeutige ID
- Gehört zu: einem Tag
- Typ: "canva_embed", "file", "text" oder "link"
- Inhalt (je nach Typ):
  - Canva: URL des Embeds
  - Datei: Dateiname + URL in Supabase Storage + Dateigröße
  - Text: Formatierter Text (HTML)
  - Link: URL + Titel
- Sortier-Reihenfolge

### Zugriffs-Regeln (access_grants)
Jede Regel hat:
- Eindeutige ID
- Gilt für: ein Mitglied
- Bezieht sich auf: Lehrgang ODER Modul ODER Tag (eins davon)
- Status: freigeschaltet (true) oder gesperrt (false)
- Erstellungszeitpunkt

**Zugriffs-Logik:** Spezifischste Regel gewinnt.
- Beispiel: Lehrgang = frei, Tag 5 = gesperrt → Alles frei AUSSER Tag 5
- Beispiel: Lehrgang = gesperrt, Tag 1 = frei → NUR Tag 1 ist zugänglich
- Keine Regel vorhanden → Kein Zugriff (Standard: gesperrt)
- Admins haben immer vollen Zugriff

---

## 3. Seitenstruktur & Routing

```
/login                              → Login-Seite
/dashboard                          → Mitglieder-Dashboard (Meine Lehrgänge)
/courses/:id                        → Lehrgang-Ansicht (erster freigeschalteter Tag)
/courses/:id/units/:unitId          → Bestimmter Tag im Lehrgang
/settings                           → Passwort ändern

/admin                              → Admin-Dashboard (Statistiken)
/admin/members                      → Mitglieder-Liste
/admin/members/:id/access           → Zugriffs-Matrix für ein Mitglied
/admin/courses                      → Lehrgang-Übersicht
/admin/courses/:id                  → Module & Tage verwalten
/admin/courses/:id/units/:unitId    → Content-Editor für einen Tag
/admin/courses/:id/access           → Zugriffs-Übersicht pro Lehrgang
```

**Route Protection:**
- `/dashboard/*` und `/courses/*` → Nur eingeloggte User
- `/admin/*` → Nur User mit Rolle "admin"
- Nicht eingeloggt → Redirect auf `/login`
- Deaktivierter User → Redirect auf `/login` mit Meldung

---

## 4. Tech-Entscheidungen

### Warum Supabase?
→ Auth, Datenbank UND Datei-Storage in einem. Kein separates Backend nötig.
→ Row Level Security (RLS) sorgt dafür, dass Mitglieder nur ihre eigenen Daten sehen.
→ Kostenloser Tier reicht für den Start (~500MB Datenbank, 1GB Storage).

### Warum Next.js 15 (App Router)?
→ Server-Side Rendering für schnelle Ladezeiten.
→ Middleware für Route Protection (Login-Check passiert bevor die Seite lädt).
→ App Router ist der moderne Standard für Next.js.

### Warum shadcn/ui?
→ Schöne, anpassbare UI-Komponenten (Buttons, Tabellen, Toggles, Dialoge).
→ Direkt in Tailwind integriert – passt perfekt zum PLI CI.
→ Kein Vendor-Lock-in – Components werden ins Projekt kopiert, nicht als Package.

### Warum Vercel für Hosting?
→ Optimiert für Next.js (vom gleichen Team).
→ Kostenloser Tier reicht (Hobby Plan).
→ Custom Domain einfach einrichtbar.
→ Automatische Deploys bei Git Push.

### Packages die installiert werden:
- **@supabase/supabase-js** – Supabase Client (Auth + DB + Storage)
- **@supabase/ssr** – Server-Side Supabase für Next.js
- **@dnd-kit/core + @dnd-kit/sortable** – Drag & Drop (Sortierung von Modulen, Tagen, Blöcken)
- **tiptap** – Einfacher Rich-Text-Editor (für Text-Blöcke)
- **lucide-react** – Icons (Lock, Plus, Edit, Trash, etc.)
- **sonner** – Toast-Notifications

---

## 5. Canva-Embed Sicherheit

**Problem:** Canva-Embed URLs sollen nicht einfach aus dem Quellcode kopiert werden können.

**Lösung:**
- Canva-URLs werden in der Datenbank gespeichert
- Der iFrame wird über eine **Server-Side API Route** geladen
- Die eigentliche Canva-URL steht NICHT im Frontend HTML
- Mitglied ruft `/api/embed/:blockId` auf → Server prüft Zugriff → gibt Embed zurück
- Ohne Login: kein Zugriff auf die Embed-URL

---

## 6. Build-Reihenfolge (für Entwickler)

```
Phase 1: Foundation
  PLI-9 (Layout & CI) ──────────┐
  PLI-1 (Authentication) ───────┤── Parallel möglich
                                │
Phase 2: Admin Core             │
  PLI-2 (User Management) ─────┤
  PLI-3 (Course Management) ────┤── Aufeinander aufbauend
  PLI-4 (Module & Units) ───────┤
  PLI-5 (Content Editor) ───────┘
                                
Phase 3: Access & Portal
  PLI-6 (Access Control) ───────┐
  PLI-7 (Member Dashboard) ─────┤── Aufeinander aufbauend
  PLI-8 (Course Viewer) ────────┘
```

---

## 7. Offene Entscheidungen (für Nico)

1. **Supabase Projekt:** Neues Supabase-Projekt anlegen oder bestehendes nutzen?
2. **Domain:** portal.loesungs-impulse.ch oder learn.loesungs-impulse.ch?
3. **Daten-Migration:** Sollen die 150 FunnelCockpit-Pages automatisch importiert werden (Struktur als Lehrgänge/Tage), oder legt Marianne alles neu an?
