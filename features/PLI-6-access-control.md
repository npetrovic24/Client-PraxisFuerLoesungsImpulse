# PLI-6: Granulare Zugriffssteuerung (Admin)

## Status: 🔵 Planned

## Beschreibung
Admin kann pro Mitglied granular steuern, welche Lehrgänge, Module und einzelne Tage freigeschaltet oder gesperrt sind.

## User Stories
- Als **Admin** möchte ich einem Mitglied einen ganzen Lehrgang freischalten können
- Als **Admin** möchte ich einem Mitglied nur bestimmte Module eines Lehrgangs freischalten können
- Als **Admin** möchte ich einem Mitglied einzelne Tage freischalten oder sperren können
- Als **Admin** möchte ich auf einen Blick sehen, welche Inhalte ein Mitglied freigeschaltet hat
- Als **Admin** möchte ich von einem Lehrgang aus sehen, welche Mitglieder Zugriff haben

## Acceptance Criteria
- [ ] **Mitglied-Ansicht** (/admin/members/:id/access): Zeigt alle Lehrgänge mit Toggle pro Lehrgang
  - [ ] Aufklappbar: Module und Tage mit eigenem Toggle
  - [ ] Lehrgang-Toggle ON → alle Module/Tage automatisch freigeschaltet
  - [ ] Lehrgang-Toggle OFF → alle Module/Tage automatisch gesperrt
  - [ ] Einzelne Tage können abweichend vom Lehrgang-Status getoggelt werden
- [ ] **Lehrgang-Ansicht** (/admin/courses/:id/access): Zeigt alle Mitglieder mit Zugriffsstatus
  - [ ] Toggle pro Mitglied für schnelle Freischaltung
  - [ ] Bulk-Aktion: "Alle Mitglieder freischalten" / "Alle sperren"
- [ ] **Zugriffs-Hierarchie:**
  - [ ] Spezifischste Regel gewinnt: Tag-Regel > Modul-Regel > Lehrgang-Regel
  - [ ] Beispiel: Lehrgang = frei, aber Tag 5 = gesperrt → Mitglied sieht Tag 1-4, Tag 5 ist gelockt
  - [ ] Beispiel: Lehrgang = gesperrt, aber Tag 1 = frei → Mitglied sieht NUR Tag 1
- [ ] Visual Indicator: Grün (frei), Rot (gesperrt), Orange (teilweise – wenn Lehrgang frei aber einzelne Tage gesperrt)
- [ ] Änderungen werden sofort wirksam (kein "Speichern" nötig)
- [ ] Anzahl freigeschalteter Mitglieder wird pro Lehrgang angezeigt

## Edge Cases
- Mitglied hat Zugriff auf Tag innerhalb eines gesperrten Moduls → Tag ist trotzdem zugänglich (spezifischste Regel gewinnt)
- Admin entfernt Lehrgang-Zugriff während Mitglied eingeloggt ist → Nächster Seitenaufruf zeigt Lock
- Neues Mitglied angelegt → Standard: Kein Zugriff auf nichts (alles gesperrt)
- Neuer Tag zu Lehrgang hinzugefügt → Erbt Lehrgang-Level-Zugriff (wenn Lehrgang freigeschaltet, ist neuer Tag auch frei)
- Admin versucht sich selbst Zugriff zu entziehen → Admins haben immer vollen Zugriff (kein Access Grant nötig)

## Abhängigkeiten
- Benötigt: PLI-1 (Authentication)
- Benötigt: PLI-2 (User Management) – Mitglieder müssen existieren
- Benötigt: PLI-3 (Course Management) – Lehrgänge müssen existieren
- Benötigt: PLI-4 (Module & Unit Management) – Module/Tage müssen existieren
