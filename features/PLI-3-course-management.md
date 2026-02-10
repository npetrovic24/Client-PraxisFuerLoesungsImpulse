# PLI-3: Lehrgang-Management (Admin)

## Status: 🔵 Planned

## Beschreibung
Admin kann Lehrgänge erstellen, bearbeiten, sortieren und aktivieren/deaktivieren.

## User Stories
- Als **Admin** möchte ich neue Lehrgänge anlegen (Name, Beschreibung, Thumbnail, Tags), um Kursangebote zu strukturieren
- Als **Admin** möchte ich eine Übersicht aller Lehrgänge sehen, um den Katalog zu verwalten
- Als **Admin** möchte ich Lehrgänge bearbeiten können (Name, Beschreibung, Thumbnail ändern)
- Als **Admin** möchte ich Lehrgänge als inaktiv markieren können, ohne sie zu löschen
- Als **Admin** möchte ich die Reihenfolge der Lehrgänge per Drag & Drop ändern können
- Als **Admin** möchte ich Lehrgänge mit Kategorie-Tags versehen (z.B. "Coaching", "Neurodivergenz", "Leadership")

## Acceptance Criteria
- [ ] Admin sieht Lehrgang-Übersicht unter /admin/courses als Card-Grid
- [ ] "Neuer Lehrgang" Button öffnet Formular (Name*, Beschreibung, Thumbnail-Upload, Tags)
- [ ] Lehrgang-Card zeigt: Thumbnail, Name, Anzahl Module/Tage, Status (aktiv/inaktiv), Tag-Badges
- [ ] Klick auf Lehrgang → Detail-Ansicht mit Module/Tage (siehe PLI-4)
- [ ] Bearbeiten-Button pro Lehrgang → Formular mit vorausgefüllten Daten
- [ ] Aktivieren/Deaktivieren Toggle pro Lehrgang
- [ ] Inaktive Lehrgänge sind für Mitglieder nicht sichtbar
- [ ] Drag & Drop Sortierung der Lehrgänge
- [ ] Tags sind frei eingebbar (Autocomplete aus bestehenden Tags)
- [ ] Thumbnail-Upload via Supabase Storage (max 2MB, jpg/png/webp)
- [ ] Lehrgang ohne Thumbnail bekommt Platzhalter-Bild

## Edge Cases
- Lehrgang löschen der Mitgliedern zugewiesen ist → Warnung "X Mitglieder haben Zugriff, trotzdem löschen?"
- Lehrgang-Name doppelt vergeben → Erlaubt (verschiedene Jahrgänge möglich)
- Thumbnail-Upload fehlschlägt → Fehlermeldung, altes Bild bleibt
- Sehr langer Lehrgang-Name → Truncation mit Tooltip in Card-Ansicht

## Abhängigkeiten
- Benötigt: PLI-1 (Authentication) – für Admin-Login
