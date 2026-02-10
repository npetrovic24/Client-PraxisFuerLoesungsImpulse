# PLI-2: User Management (Admin)

## Status: 🔵 Planned

## Beschreibung
Admin kann Mitglieder anlegen, bearbeiten, aktivieren/deaktivieren und Passwörter zurücksetzen.

## User Stories
- Als **Admin** möchte ich neue Mitglieder anlegen (Name, Email, Passwort), um ihnen Zugang zum Portal zu geben
- Als **Admin** möchte ich eine Übersicht aller Mitglieder sehen (Name, Email, Status, letzte Aktivität), um den Überblick zu behalten
- Als **Admin** möchte ich Mitglieder deaktivieren können, um deren Zugang zu sperren ohne den Account zu löschen
- Als **Admin** möchte ich deaktivierte Mitglieder wieder aktivieren können
- Als **Admin** möchte ich das Passwort eines Mitglieds zurücksetzen können, wenn es sich nicht mehr einloggen kann
- Als **Mitglied** möchte ich mein eigenes Passwort ändern können

## Acceptance Criteria
- [ ] Admin sieht Mitglieder-Liste unter /admin/members mit Tabelle (Name, Email, Status, letzte Aktivität)
- [ ] "Neues Mitglied" Button öffnet Formular (Name, Email, Passwort)
- [ ] Bei Anlage wird Supabase Auth User erstellt + Profil in profiles-Tabelle
- [ ] Duplikat-Email bei Anlage → Fehlermeldung "Email bereits vergeben"
- [ ] Toggle-Switch für Aktivieren/Deaktivieren direkt in der Tabelle
- [ ] Deaktivierte Mitglieder werden ausgegraut dargestellt
- [ ] "Passwort zurücksetzen" Button pro Mitglied → generiert neues Passwort oder sendet Reset-Link
- [ ] Mitglied kann unter /settings eigenes Passwort ändern (altes + neues Passwort)
- [ ] Suchfeld/Filter in Mitglieder-Liste (nach Name oder Email)
- [ ] Mitglieder-Anzahl wird oben angezeigt

## Edge Cases
- Admin versucht sich selbst zu deaktivieren → Warnung/Verhinderung
- Admin löscht Mitglied das noch Zugriffe hat → Zugriffe werden mit entfernt (Cascade)
- Passwort-Anforderungen: Mindestens 8 Zeichen
- Email-Validierung bei Anlage (Format-Check)
- Leerer Name → Pflichtfeld-Warnung

## Abhängigkeiten
- Benötigt: PLI-1 (Authentication) – für Admin-Login und Route Protection
