# PLI-7: Mitglieder-Dashboard

## Status: 🔵 Planned

## Beschreibung
Eingeloggte Mitglieder sehen ein Dashboard mit ihren freigeschalteten Lehrgängen als übersichtliche Card-Ansicht.

## User Stories
- Als **Mitglied** möchte ich nach dem Login meine freigeschalteten Lehrgänge sehen
- Als **Mitglied** möchte ich auf einen Blick erkennen, welche Lehrgänge ich habe
- Als **Mitglied** möchte ich direkt in einen Lehrgang klicken können

## Acceptance Criteria
- [ ] Dashboard unter /dashboard zeigt "Meine Lehrgänge" als Card-Grid
- [ ] Jede Card zeigt: Thumbnail, Lehrgang-Name, Anzahl Tage, Kategorie-Tags
- [ ] Nur freigeschaltete Lehrgänge werden angezeigt (mindestens 1 Tag freigeschaltet)
- [ ] Klick auf Card → Lehrgang-Ansicht (/courses/:id)
- [ ] Begrüßung oben: "Willkommen, [Vorname]"
- [ ] Leerer State: "Noch keine Lehrgänge freigeschaltet" mit Hinweis
- [ ] Responsive: 3 Spalten Desktop, 2 Tablet, 1 Mobile
- [ ] Cards im PLI CI (Teal Akzente, weisser Hintergrund, dezente Schatten)

## Edge Cases
- Mitglied hat 0 Lehrgänge → Freundliche Meldung, kein leeres Grid
- Mitglied hat nur einzelne Tage freigeschaltet (kein ganzer Lehrgang) → Lehrgang trotzdem als Card zeigen
- Sehr viele Lehrgänge (20+) → Scrollbar, ggf. Filterbar nach Tags
- Lehrgang hat kein Thumbnail → Platzhalter-Bild
- Lehrgang wurde zwischenzeitlich deaktiviert → Verschwindet vom Dashboard

## Abhängigkeiten
- Benötigt: PLI-1 (Authentication)
- Benötigt: PLI-3 (Course Management) – Lehrgänge müssen existieren
- Benötigt: PLI-6 (Access Control) – Zugriffslogik für Filterung
