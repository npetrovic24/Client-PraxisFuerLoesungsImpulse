# Claude Code Task: PLI Lernportal – Rollen erweitern

## Repo: `/root/.openclaw/workspace/projects/pli-portal/`

## Kontext
types.ts hat bereits `UserRole = "admin" | "dozent" | "participant"`.
access.ts behandelt dozent bereits wie admin (alle Kurse sichtbar).
DB constraint ist bereits aktualisiert.

## Aufgabe: UI-Änderungen für 3 Rollen

### 1. Admin Members Page (`src/app/(admin)/admin/members/members-client.tsx`)

**Create Dialog:**
- Füge ein **Rollen-Dropdown** hinzu (Select) mit den Optionen:
  - "Teilnehmer" (value: participant) – default
  - "Dozent/in" (value: dozent)
  - "Administrator" (value: admin)
- Übergib die gewählte Rolle an `createMember()`
- Wenn Rolle = admin oder dozent: Kurs-Zuweisung ausblenden (sie haben automatisch Zugriff auf alles)

**Member List:**
- Zeige die Rolle als Badge pro User:
  - admin → "Admin" (teal/primary badge)
  - dozent → "Dozent/in" (blue badge, z.B. bg-blue-100 text-blue-800)
  - participant → "Teilnehmer" (gray badge)
- Admins und Dozenten sollen NICHT deaktiviert oder gelöscht werden können (disable die Buttons)

**Edit Dialog:**
- Rolle ändern können (Select wie bei Create)

### 2. Server Action (`src/lib/actions/members.ts`)

**createMember:**
- Akzeptiere `role` Parameter (default: "participant")
- Setze die Rolle in `user_metadata` bei Supabase Auth UND in profiles direkt

**updateMember:**
- Akzeptiere `role` Parameter
- Aktualisiere die Rolle in profiles

### 3. Middleware (`src/lib/supabase/middleware.ts`)
- Login redirect: admin → `/admin`, dozent → `/dashboard`, participant → `/dashboard`
- Admin routes (`/admin/*`): Nur für `admin` Rolle (dozent hat KEINEN Admin-Zugang)

### 4. Member Layout Banner
- Wenn User = admin ODER dozent: Zeige den "Admin-Vorschau" Banner
- Aber für dozent: Text = "Dozenten-Ansicht" statt "Admin-Vorschau", und nur Link zu `/admin` wenn admin

### 5. UI Labels
- Überall wo "Teilnehmer" steht und es um die Gesamtheit aller User geht: "Benutzer" oder "Personen" verwenden
- Admin sidebar: "Teilnehmer" → "Benutzer" (da dort auch Admins/Dozenten gelistet sind)

## Technische Regeln
- TypeScript strict
- shadcn/ui Select Component für das Rollen-Dropdown (falls nicht vorhanden: `npx shadcn@latest add select`)
- `npm run build` muss fehlerfrei durchlaufen
- Git Commit: `feat: admin/dozent/participant roles`
