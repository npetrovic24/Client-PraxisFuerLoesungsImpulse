# PLI-4: Modul & Tage-Management (Admin)

## Status: 🔵 Planned

## Beschreibung
Admin kann innerhalb eines Lehrgangs Module (optional) und Tage/Einheiten erstellen, bearbeiten und sortieren.

## User Stories
- Als **Admin** möchte ich innerhalb eines Lehrgangs Module anlegen können, um Tage thematisch zu gruppieren
- Als **Admin** möchte ich Tage/Einheiten direkt einem Lehrgang zuordnen können (ohne Modul), für einfache Lehrgänge
- Als **Admin** möchte ich Tage/Einheiten einem Modul zuordnen können, für komplexe Lehrgänge
- Als **Admin** möchte ich Module und Tage per Drag & Drop sortieren können
- Als **Admin** möchte ich Module und Tage bearbeiten und löschen können

## Acceptance Criteria
- [ ] Lehrgang-Detail-Seite (/admin/courses/:id) zeigt Struktur: Module → Tage
- [ ] "Modul hinzufügen" Button erstellt neues Modul (Name, Reihenfolge)
- [ ] "Tag hinzufügen" Button – wahlweise direkt im Lehrgang ODER innerhalb eines Moduls
- [ ] Tage zeigen: Name, Reihenfolge, Anzahl Content-Blöcke
- [ ] Drag & Drop für Sortierung von Modulen UND Tagen
- [ ] Tage können zwischen Modulen verschoben werden (Drag & Drop)
- [ ] Inline-Editing für Modul-/Tag-Namen (Doppelklick → Edit)
- [ ] Löschen von Modul → Warnung wenn Tage darin existieren ("Module mit X Tagen löschen?")
- [ ] Löschen von Tag → Warnung wenn Content-Blöcke existieren
- [ ] Kollabierte/Expandierte Module-Ansicht (Accordion)
- [ ] Klick auf einen Tag → Content-Editor (siehe PLI-5)

## Edge Cases
- Modul ohne Tage → Wird angezeigt mit Hinweis "Keine Einheiten"
- Lehrgang mit 0 Modulen und 0 Tagen → Hinweis "Noch keine Inhalte"
- Tag von Modul nach "ohne Modul" verschieben → module_id wird null
- Sehr viele Tage (15+) → Scrollbare Liste, kein Performance-Problem
- Gleichzeitiges Bearbeiten (zwei Admins) → Optimistic UI, Last-Write-Wins

## Abhängigkeiten
- Benötigt: PLI-1 (Authentication)
- Benötigt: PLI-3 (Course Management) – Lehrgänge müssen existieren
