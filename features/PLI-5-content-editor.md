# PLI-5: Content-Editor (Admin)

## Status: 🔵 Planned

## Beschreibung
Admin kann pro Tag/Einheit Content-Blöcke hinzufügen, bearbeiten und sortieren: Canva-Embeds, Datei-Uploads, Text-Blöcke, Links.

## User Stories
- Als **Admin** möchte ich einem Tag Canva-Embed URLs hinzufügen, damit Mitglieder die Präsentationen/Videos sehen können
- Als **Admin** möchte ich Dateien (PDFs, Dokumente) hochladen und einem Tag zuordnen
- Als **Admin** möchte ich Text-Blöcke mit Formatierung (fett, kursiv, Listen) hinzufügen, für Anleitungen und Notizen
- Als **Admin** möchte ich externe Links hinzufügen können (z.B. zu Ressourcen)
- Als **Admin** möchte ich Content-Blöcke per Drag & Drop sortieren können
- Als **Admin** möchte ich Content-Blöcke bearbeiten und löschen können

## Acceptance Criteria
- [ ] Tag-Detail-Seite (/admin/courses/:courseId/units/:unitId) zeigt Content-Editor
- [ ] "Block hinzufügen" Button mit Typ-Auswahl: Canva-Embed, Datei, Text, Link
- [ ] **Canva-Embed Block:**
  - [ ] URL-Eingabefeld
  - [ ] Validierung: Nur Canva-URLs akzeptieren (canva.com Domain)
  - [ ] Vorschau des Embeds im Editor
  - [ ] iFrame wird serverseitig gerendert (URL nicht im Frontend-Quellcode sichtbar)
- [ ] **Datei-Upload Block:**
  - [ ] Drag & Drop oder Click-to-Upload
  - [ ] Erlaubte Formate: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ZIP
  - [ ] Max. Dateigröße: 50MB
  - [ ] Upload zu Supabase Storage
  - [ ] Dateiname + Größe werden angezeigt
- [ ] **Text-Block:**
  - [ ] Rich-Text-Editor (fett, kursiv, Listen, Überschriften)
  - [ ] Kein komplexer WYSIWYG – einfach gehalten
- [ ] **Link-Block:**
  - [ ] URL + Titel Eingabe
  - [ ] Wird als klickbarer Link dargestellt
- [ ] Drag & Drop Sortierung aller Blöcke
- [ ] Löschen-Button pro Block mit Bestätigung
- [ ] Autosave oder expliziter "Speichern" Button

## Edge Cases
- Ungültige Canva-URL eingegeben → Fehlermeldung "Bitte gültige Canva-URL eingeben"
- Datei-Upload bricht ab → Fortschrittsanzeige, Retry-Option
- Sehr große Datei (>50MB) → Fehlermeldung vor Upload
- Leerer Text-Block → Wird nicht gespeichert/angezeigt
- Canva-Embed lädt nicht (Canva down) → Fallback-Meldung im Mitglieder-Portal

## Abhängigkeiten
- Benötigt: PLI-1 (Authentication)
- Benötigt: PLI-4 (Module & Unit Management) – Tage müssen existieren
