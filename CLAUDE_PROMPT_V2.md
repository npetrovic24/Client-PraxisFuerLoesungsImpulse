# Claude Code Task: PLI Lernportal – V2 Features

## Repo: `/root/.openclaw/workspace/projects/pli-portal/`

## Feature 1: Kurs-Thumbnails mit SVG-Generierung

Generiere für jeden Kurs ein thematisch passendes Thumbnail als SVG-Datei in `public/thumbnails/`. 
Jedes Thumbnail soll:
- 400x240px, abgerundete Ecken
- Teal-Gradient Hintergrund (#0099A8 → #007A87) mit leichtem Pattern
- Ein passendes Lucide-artiges SVG-Icon in Weiß in der Mitte (groß, ca 80x80)
- Den Kursnamen NICHT im Bild (der steht schon auf der Card)

Thematische Icon-Zuordnung (nutze einfache SVG-Pfade):
- ADHS, Autismus, Neurodivergenz → Gehirn/Brain
- Coach, Basis Modul → Kompass/Graduation Cap
- Burnout, Resilienz → Herz/Shield
- Hochsensibilität → Blume/Sterne
- Kommunikation, Konflikte → Sprechblasen
- Jobcoach, Arbeitsplatz → Briefcase
- Lerncoach, Klassenassistenz → Buch
- Ernährung, Gesundheit → Apfel/Herz
- Familien, Beziehung → Menschen/Hands
- Leadership, CAS → Stern/Award
- Bachblüten, Heilströmen, EFT → Pflanze/Leaf
- Psychografie, Psychosozial → Puzzleteile
- Antimobbingcoach → Shield
- Casemanagement, Sozialversicherung → FileText/Clipboard
- Kinds-/Erwachsenenschutz → Shield + Person

Erstelle die SVGs programmatisch (z.B. mit einem Node-Script oder direkt als Dateien).

Dann aktualisiere die Datenbank: Setze `thumbnail_url` für jeden Kurs auf `/thumbnails/{course-id}.svg`.

Dafür brauchst du eine SQL-Datei mit UPDATE-Statements. Schreibe sie nach `/tmp/update-thumbnails.sql`.

WICHTIG: Führe die SQL NICHT selbst aus. Erstelle nur die Datei.

## Feature 2: Rollen-System (Teilnehmer statt Mitglied)

### Datenbank-Änderung:
Die `profiles.role` bleibt text. Werte werden:
- `admin` – Administratoren (volle Kontrolle)
- `participant` – Teilnehmer/Kunden (sehen nur freigeschaltete Kurse)

Der alte Wert `member` wird NICHT mehr verwendet. Existierende Mitglieder werden zu `participant`.

### Access Grants erweitern:
Füge zur `access_grants`-Tabelle hinzu:
- `expires_at` TIMESTAMPTZ NULL – Ablaufdatum (NULL = kein Ablauf)

Schreibe die ALTER TABLE Statements nach `/tmp/update-schema.sql`. NICHT selbst ausführen.

### Code-Änderungen:
1. **types.ts**: `UserRole = "admin" | "participant"`. Alte Referenzen auf `member` durch `participant` ersetzen.
2. **middleware.ts**: `member` → `participant` (Dashboard-Redirect für Teilnehmer)
3. **Access-Logik** (`access.ts`): 
   - Bei `getAccessibleCourses` und verwandten Funktionen: Prüfe `expires_at`. Wenn gesetzt und abgelaufen (`expires_at < now()`), zählt der Grant als nicht vorhanden.
4. **Admin Members Page**: 
   - Beim Anlegen neuer Mitglieder: Rolle ist immer `participant` (nicht wählbar)
   - Zeige in der Mitgliederliste die Rolle an
5. **Admin Access Pages** (`/admin/courses/[id]/access` und `/admin/members/[id]/access`):
   - Zeige neben dem Toggle ein **Datums-Feld** für "Gültig bis" (optional)
   - Zeige ob ein Zugang abgelaufen ist (rotes Badge)
   - "Zugang sperren" = Toggle auf false setzen
6. **Dashboard**: Zeige abgelaufene Kurse ausgegraut mit "Zugang abgelaufen" Badge
7. **UI-Texte**: Überall "Mitglied" → "Teilnehmer", "Mitglieder" → "Teilnehmer"

## Feature 3: Teilnehmer-Verwaltung verbessern

### Admin → Teilnehmer erstellen:
- Name (Pflicht)
- E-Mail (Pflicht)  
- Passwort (Pflicht, mind. 8 Zeichen)
- Direkt bei Erstellung: Kurse zuweisen (Multi-Select mit optionalem Ablaufdatum pro Kurs)

### Admin → Teilnehmer bearbeiten:
- Name ändern
- E-Mail ändern
- Passwort zurücksetzen
- Aktiv/Inaktiv Toggle
- Kurszuweisungen mit Ablaufdatum

### Admin → Kurs-Zugriff verwalten:
- Übersicht aller Teilnehmer mit Zugang zu diesem Kurs
- Pro Teilnehmer: Ablaufdatum, Status (aktiv/abgelaufen/gesperrt)
- Bulk-Aktionen: Mehrere Teilnehmer gleichzeitig freischalten

## Technische Regeln
- TypeScript strict
- Nutze shadcn/ui Date Picker (falls nicht installiert: `npx shadcn@latest add calendar popover` vorher ausführen)
- `npm run build` muss fehlerfrei durchlaufen
- Git Commit: `feat: thumbnails, participant role, access expiration`
- SQL-Dateien für DB-Änderungen nach `/tmp/` schreiben, NICHT ausführen
