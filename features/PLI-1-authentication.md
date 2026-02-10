# PLI-1: Authentication & Session Management

## Status: 🔵 Planned

## Beschreibung
Login/Logout für Admins und Mitglieder via Email + Passwort (Supabase Auth).

## User Stories
- Als **Mitglied** möchte ich mich mit Email + Passwort einloggen, um auf meine freigeschalteten Lehrgänge zuzugreifen
- Als **Mitglied** möchte ich eingeloggt bleiben (Session persistent), um nicht bei jedem Besuch neu einloggen zu müssen
- Als **Mitglied** möchte ich mich ausloggen können, um meine Session zu beenden
- Als **Admin** möchte ich mich mit Email + Passwort einloggen, um auf das Admin-Panel zuzugreifen
- Als **nicht-eingeloggter User** möchte ich auf die Login-Seite weitergeleitet werden, wenn ich eine geschützte Route aufrufe

## Acceptance Criteria
- [ ] Login-Seite mit Email + Passwort Feldern im PLI CI (Teal/Weiss)
- [ ] Erfolgreicher Login leitet weiter: Admin → /admin/dashboard, Mitglied → /dashboard
- [ ] Fehlerhafter Login zeigt Fehlermeldung ("Ungültige Anmeldedaten")
- [ ] Session bleibt nach Browser-Reload erhalten (Supabase Session)
- [ ] Logout-Button in Navigation, beendet Session und leitet auf Login-Seite
- [ ] Geschützte Routen (/dashboard/*, /admin/*) leiten auf /login wenn nicht eingeloggt
- [ ] Admin-Routen (/admin/*) sind nur für User mit role=admin zugänglich
- [ ] Mitglieder die /admin/* aufrufen werden auf /dashboard weitergeleitet

## Edge Cases
- Deaktivierter User (is_active=false) versucht Login → Fehlermeldung "Account ist deaktiviert"
- User mit ungültiger Email-Format → Client-side Validation
- Leere Felder → Submit-Button disabled
- Doppelklick auf Login-Button → Request wird nicht doppelt gesendet
- Session abgelaufen → Automatische Weiterleitung auf Login-Seite

## Abhängigkeiten
- Keine (Basis-Feature)

## Technische Anforderungen
- Supabase Auth (Email/Password Provider)
- Row Level Security (RLS) auf allen Tabellen
- Middleware für Route Protection
