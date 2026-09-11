# Semikolon

Ein helles, freundlich-technisches Theme für [Micro.blog](https://micro.blog) (Hugo) – seriös, aber mit ein paar Nerd-Details. Gebaut für Freelancer aus der C#/.NET-Welt.

- **Startseite = Notizen.** Posts ohne Titel erscheinen als Timeline. Darüber: Name, Rolle, Verfügbarkeitsstatus und dein Tech-Stack als C#-Objektinitialisierer im Visual-Studio-Look.
- **Longreads auf eigener Seite.** Posts mit Titel landen automatisch unter `/longreads/`, gruppiert nach Jahr (`#region 2026`). Die Startseite zeigt den neuesten Longread als Teaser.
- **Longread-Artikel** mit Lesezeit, Wortanzahl, Inhaltsverzeichnis (ab ca. 400 Wörtern und drei Überschriften), Lesefortschritt, Autorenbox mit Kontakt-Button und Vor/Zurück-Navigation.
- **Codeblöcke** in dunkler IDE-Optik mit Sprach-Label und Kopieren-Button.
- **Archiv im `git log --oneline`-Stil**, Kategorien, Fotos, Antworten.
- **Micro.blog-kompatibel:** Microformats (h-entry, h-card), IndieAuth/Webmention über Micro.blogs `microblog_head.html`, Plug-in-Hooks, `custom.css`, Unterhaltungen, Bluesky-Syndication.
- **Datenschutzfreundlich:** keine externen Fonts, keine CDNs, keine Tracker. Impressum und Datenschutz lassen sich im Footer verlinken.

## Installation

Micro.blog lädt Themes direkt aus einem öffentlichen Git-Repository.

1. Dieses Verzeichnis als **öffentliches** GitHub-Repository pushen.
2. In Micro.blog: **Design → Edit Custom Themes → New Plug-in** (ja, *Plug-in* – so bekommt das Theme einen Einstellungsdialog).
   Titel: `Semikolon`, Clone-URL: `https://github.com/<dein-name>/<repo>.git` (HTTPS, nicht SSH), Blog auswählen.
3. Unter **Design** als Theme **Blank** wählen, damit kein anderes Theme dazwischenfunkt.
4. Beim Plug-in auf **Settings** klicken und die Felder ausfüllen (siehe unten).

Micro.blog holt Änderungen nicht automatisch. Nach einem Push das Theme in Micro.blog über den Reload-/Update-Button neu von GitHub laden.

**Alternative ohne Einstellungsdialog:** *New Theme* mit derselben Clone-URL. Die Werte trägst du dann in `config.json` ein:

```json
{
  "params": {
    "semikolon_role": "Freelance C# / .NET Entwickler",
    "semikolon_status": "available"
  }
}
```

## Einstellungen

| Feld | Wirkung |
| --- | --- |
| `semikolon_role` | Rolle unter deinem Namen, in der Autorenbox und als Meta-Beschreibung |
| `semikolon_intro` | Intro-Text auf der Startseite (Markdown). Fallback: „About me“, dann Blog-Beschreibung |
| `semikolon_stack` | Tech-Stack, kommagetrennt – erscheint im Code-Steckbrief |
| `semikolon_status` | `available`, `limited`, `booked` oder `hidden` |
| `semikolon_status_note` | Zusatz wie „ab November 2026“ |
| `semikolon_contact_url` | Ziel des Kontakt-Buttons, z. B. `mailto:…` oder `/kontakt/` |
| `semikolon_contact_label` | Button-Text (Standard: „Projekt anfragen“) |
| `semikolon_linkedin_url` | LinkedIn-Link im Footer |
| `semikolon_imprint_url` / `semikolon_privacy_url` | Impressum / Datenschutz im Footer |
| `semikolon_hide_code_card` | Code-Steckbrief ausblenden |
| `semikolon_longreads_intro` | Einleitung der Longreads-Seite (Markdown) |

Name, Avatar, Blog-Titel, GitHub-Benutzername und Unterhaltungen kommen wie gewohnt aus den Micro.blog-Einstellungen.

## Wie die Aufteilung funktioniert

- **Post ohne Titel → Notiz** (Startseite). **Post mit Titel → Longread.** Mehr musst du beim Schreiben nicht beachten.
- Die Longreads-Seite liefert das Theme selbst mit (`content/longreads.md`). Sie steht automatisch in der Navigation. Titel, URL oder Text kannst du dort ändern – alle Links passen sich an.
- Eine Longreads-Liste in anderen Seiten, z. B. „Über mich“: `{{< longreads limit="3" >}}`
- Impressum und Datenschutz legst du in Micro.blog als normale Seiten an (ohne Navigation) und trägst die URLs in den Einstellungen ein.
- Wie viele Notizen die Startseite zeigt und ob sie blättert, steuerst du mit Micro.blogs Plug-in **Paginate settings** (`paginate_home`). Ohne Blättern verlinkt die Startseite aufs Archiv.

## Anpassen

Eigenes CSS unter **Design → Edit CSS** überschreibt das Theme. Die Farben sind CSS-Variablen:

```css
:root {
  --accent: #0e7490;      /* statt .NET-Lila */
  --accent-ink: #0b5566;
  --accent-soft: #e0f2f5;
}
```

## Lokale Vorschau

`exampleSite/` bildet die Micro.blog-Konfiguration mit Beispielinhalten nach:

```bash
hugo server --source exampleSite --noHTTPCache
```

`--noHTTPCache` verhindert, dass der Browser nach Änderungen noch altes CSS aus dem Cache zeigt.

Die Templates nutzen nur Hugo-Funktionen, die es schon in Hugo 0.91 gibt (Micro.blogs ältester Stand), und sind lokal mit Hugo 0.163 getestet.

## Aufbau

```text
content/longreads.md          Longreads-Seite (type: longreads)
layouts/index.html            Startseite: Hero, neuester Longread, Notizen
layouts/post/single.html      Notiz oder Longread-Artikel
layouts/longreads/single.html Longreads-Übersicht
layouts/list.archivehtml.html Archiv
layouts/partials/semikolon/   Bausteine (Hero, Code-Steckbrief, Einträge, Pager …)
static/css/semikolon.css      Styles
static/js/semikolon.js        Kopieren-Button für Codeblöcke
plugin.json                   Einstellungsfelder für Micro.blog
```

## Lizenz & Credits

Semikolon steht unter der [MIT-Lizenz](LICENSE).

Design, Templates, CSS und JavaScript sind für dieses Theme neu geschrieben. Es basiert auf keinem bestehenden Theme und keiner bestehenden Website. Auch die Beispielinhalte in `exampleSite/` (Texte und SVG-Grafiken) sind eigens erstellt.

Für die technische Anbindung an Micro.blog dienten die offizielle Dokumentation und Micro.blogs Themes als Referenz. Übernommen sind nur die dort vorgegebenen Integrationsmuster, etwa die Einbindung von `conversation.js`, die Plug-in-Hooks und die Micro.blog-Partials:

- [theme-blank](https://github.com/microdotblog/theme-blank) – MIT, © 2019 Micro.blog
- [theme-marfa](https://github.com/microdotblog/theme-marfa) – MIT, © 2015 Cactus Authors
- [Sumo Theme](https://github.com/microdotblog/Sumo-Theme) – MIT, © 2024 Matt Langford
- [Micro.blog Help Center](https://help.micro.blog) und [How to customise Micro.blog](https://custom.micro.blog)

Namen wie .NET, C# oder Visual Studio werden nur beschreibend verwendet. Das Theme steht in keiner Verbindung zu Microsoft. Die Schriftnamen im CSS (z. B. Cascadia Code, Segoe UI, SF Mono) verweisen nur auf Schriften, die auf dem Gerät der Besucher installiert sind. Schriftdateien werden nicht mitgeliefert.
