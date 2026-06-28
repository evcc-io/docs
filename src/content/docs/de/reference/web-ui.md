---
title: "Web UI"
sidebar:
  order: 3
---

Die Weboberfläche läuft auf Port `7070` und nutzt Hash-Routing.
Über die URL lassen sich Seite und Anzeigeeinstellungen festlegen.

## Verfügbare Seiten {#links}

Jede Seite hat ihre eigene Hash-Route.
Du kannst direkt darauf verlinken oder sie als Lesezeichen speichern.

| Seite              | Route        | Login | Parameter                                         |
| ------------------ | ------------ | ----- | ------------------------------------------------- |
| Start / Ladepunkte | `#/`         | nein  | `lp`                                              |
| Hausbatterie       | `#/battery`  | nein  | —                                                 |
| Vorhersage         | `#/forecast` | nein  | —                                                 |
| Ladevorgänge       | `#/sessions` | nein  | `month`, `year`, `loadpoint`, `vehicle`, `period` |
| Konfiguration      | `#/config`   | ja    | —                                                 |
| Logs               | `#/log`      | ja    | `areas`, `level`                                  |
| Historie 🧪        | `#/history`  | nein  | `day`, `month`, `year`, `period`                  |
| Optimize 🧪        | `#/optimize` | nein  | —                                                 |
| Problem melden     | `#/issue`    | ja    | —                                                 |

🧪 kennzeichnet experimentelle Seiten.

| Parameter   | Beschreibung                                  |
| ----------- | --------------------------------------------- |
| `lp`        | Ladepunkt-Nummer, beginnend bei `1`           |
| `year`      | Anzuzeigendes Jahr, z. B. `2026`              |
| `month`     | Monat, `1`–`12`                               |
| `day`       | Tag des Monats, `1`–`31`                      |
| `period`    | Zeitraum: `day`, `month`, `year` oder `total` |
| `loadpoint` | Titel des Ladepunkts                          |
| `vehicle`   | Titel des Fahrzeugs                           |
| `areas`     | Anzuzeigende Log-Bereiche, kommagetrennt      |
| `level`     | Minimales Log-Level                           |

### Beispiele {#examples}

Wählt einen Ladepunkt auf dem Startbildschirm vor:

```
http://evcc.local:7070/#/?lp=1
```

Am einfachsten kommst du an den passenden Link, indem du den Ladepunkt in der Oberfläche auswählst und die Adresse aus dem Browser kopierst.

Filtere **Ladevorgänge** oder **Historie** nach Zeitraum oder Gerät:

```
http://evcc.local:7070/#/sessions?year=2026&month=3
```

## Einstellungen anwenden {#settings}

Die unter **Mehr → Darstellung** wählbaren Einstellungen lassen sich auch über die URL setzen.
So lässt sich das Aussehen der Oberfläche unabhängig von den im Browser gespeicherten Einstellungen erzwingen, etwa für Kiosk-Bildschirme, Dashboards und iframe-Einbindungen:

| Name       | Parameter | Werte                   |
| ---------- | --------- | ----------------------- |
| Design     | `theme`   | `auto`, `light`, `dark` |
| Sprache    | `lang`    | `auto`, `de`, …         |
| Einheit    | `unit`    | `km`, `mi`              |
| Zeitformat | `format`  | `12`, `24`              |

### Beispiel {#example}

```
http://evcc.local:7070/?theme=dark&lang=de&unit=mi&format=24
```

Die Werte werden beim Laden einmalig angewendet, als Browser-Einstellung gespeichert und dann aus der Adresszeile entfernt.

`lang` akzeptiert jeden Sprachcode mit Übersetzung im [`i18n`-Ordner](https://github.com/evcc-io/evcc/tree/master/i18n) (z. B. `de`, `fr`, `zh-Hans`) oder `auto` für die Browsersprache.

Einstellungen und eine Seite lassen sich in einer URL kombinieren.
Die Einstellungen stehen vor dem `#`, die Seite dahinter:

```
http://evcc.local:7070/?theme=dark&lang=de#/sessions
```
