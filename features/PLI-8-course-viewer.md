# PLI-8: Lehrgang-Ansicht (Mitglieder)

## Status: 🔵 Planned

## Beschreibung
Mitglieder können einen Lehrgang aufrufen, durch Module/Tage navigieren und den Content (Canva-Embeds, Dateien, Text) konsumieren.

## User Stories
- Als **Mitglied** möchte ich die Struktur eines Lehrgangs sehen (Module → Tage), um mich zu orientieren
- Als **Mitglied** möchte ich auf einen freigeschalteten Tag klicken und den Content sehen
- Als **Mitglied** möchte ich erkennen, welche Tage freigeschaltet und welche gesperrt sind
- Als **Mitglied** möchte ich Canva-Embeds direkt im Portal ansehen können
- Als **Mitglied** möchte ich Dateien herunterladen können
- Als **Mitglied** möchte ich zwischen Tagen vor/zurück navigieren können

## Acceptance Criteria
- [ ] Lehrgang-Seite (/courses/:id) zeigt Sidebar-Navigation mit Module/Tage
- [ ] **Sidebar (Desktop):**
  - [ ] Module als ausklappbare Gruppen
  - [ ] Tage als Einträge unter Modulen (oder direkt unter Lehrgang wenn keine Module)
  - [ ] Freigeschaltete Tage: Normal dargestellt, klickbar
  - [ ] Gesperrte Tage: Lock-Icon, ausgegraut, nicht klickbar
  - [ ] Aktuell ausgewählter Tag: Teal-Highlight
- [ ] **Mobile:** Hamburger-Menu oder Bottom-Sheet statt Sidebar
- [ ] **Content-Bereich:**
  - [ ] Canva-Embeds werden als responsive iFrames gerendert
  - [ ] Dateien werden als Download-Links angezeigt (Icon + Name + Größe)
  - [ ] Text-Blöcke werden als formatierter Text gerendert
  - [ ] Link-Blöcke werden als klickbare Links dargestellt (öffnen in neuem Tab)
  - [ ] Blöcke in der vom Admin definierten Reihenfolge
- [ ] **Navigation:**
  - [ ] "Vorheriger Tag" / "Nächster Tag" Buttons am Ende des Contents
  - [ ] Nur zu freigeschalteten Tagen (gesperrte werden übersprungen)
- [ ] **Gesperrter Tag direkt aufgerufen** (URL): Redirect auf ersten freigeschalteten Tag + Hinweis
- [ ] Lehrgang-Titel + aktueller Tag-Name oben angezeigt (Breadcrumb)

## Edge Cases
- Mitglied ruft Lehrgang auf, auf den es keinen Zugriff hat → 403 / Redirect auf Dashboard
- Canva-Embed lädt nicht → Fallback: "Inhalt konnte nicht geladen werden" + Direktlink zu Canva
- Lehrgang hat 0 Tage → Meldung "Noch keine Inhalte verfügbar"
- Tag hat 0 Content-Blöcke → Meldung "Dieser Tag hat noch keine Inhalte"
- Mitglied hat nur Tag 3 und Tag 7 freigeschaltet → Prev/Next springt direkt zwischen 3 und 7
- Sehr langes Canva-Embed → Responsive Sizing, kein Overflow

## Abhängigkeiten
- Benötigt: PLI-1 (Authentication) – Eingeloggtes Mitglied
- Benötigt: PLI-3 (Course Management) – Lehrgänge
- Benötigt: PLI-4 (Module & Unit Management) – Module/Tage
- Benötigt: PLI-5 (Content Editor) – Content-Blöcke
- Benötigt: PLI-6 (Access Control) – Zugriffsprüfung
