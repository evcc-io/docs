---
title: "Webbrugerflade"
description: "Hver side i webbrugerfladen har sin egen URL, som du kan bogmærke eller linke til, og visningsindstillinger som design, sprog eller enheder kan sættes via URL-parametre."
sidebar:
  order: 3
translatedFrom: "e90418bf26a9"
---

Webbrugerfladen kører på port `7070` og bruger hash-routing.
URL'en kan angive både siden og visningsindstillingerne.

## Tilgængelige sider {#links}

Hver side har sin egen hash-route.
Link direkte til den, eller gem den som bogmærke.

| Side                | Route        | Login | Parametre                                         |
| ------------------- | ------------ | ----- | ------------------------------------------------- |
| Start / ladepunkter | `#/`         | nej   | `lp`                                              |
| Hjemmebatteri       | `#/battery`  | nej   | —                                                 |
| Prognose            | `#/forecast` | nej   | —                                                 |
| Opladningssessioner | `#/sessions` | nej   | `month`, `year`, `loadpoint`, `vehicle`, `period` |
| Opsætning           | `#/config`   | ja    | —                                                 |
| Log                 | `#/log`      | ja    | `areas`, `level`                                  |
| Historik 🧪         | `#/history`  | nej   | `day`, `month`, `year`, `period`                  |
| Optimering 🧪       | `#/optimize` | nej   | —                                                 |
| Indberet et problem | `#/issue`    | ja    | —                                                 |

🧪 markerer eksperimentelle sider.

| Parameter   | Beskrivelse                                   |
| ----------- | --------------------------------------------- |
| `lp`        | Ladepunktets nummer, startende ved `1`        |
| `year`      | År, der skal vises, f.eks. `2026`             |
| `month`     | Måned, `1`–`12`                               |
| `day`       | Dag i måneden, `1`–`31`                       |
| `period`    | Tidsrum: `day`, `month`, `year` eller `total` |
| `loadpoint` | Ladepunktets titel                            |
| `vehicle`   | Køretøjets titel                              |
| `areas`     | Logområder, der skal vises, kommasepareret    |
| `level`     | Laveste logniveau                             |

### Eksempler {#examples}

Forudvælg et ladepunkt på startskærmen:

```
http://evcc.local:7070/#/?lp=1
```

Den enkleste måde at få det rigtige link på er at vælge ladepunktet i brugerfladen og kopiere adressen fra din browser.

Filtrer **Opladningssessioner** eller **Historik** efter tidsrum eller enhed:

```
http://evcc.local:7070/#/sessions?year=2026&month=3
```

## Anvend indstillinger {#settings}

Indstillingerne under **Mere → Brugergrænseflade** kan også sættes via URL'en.
Det overstyrer brugerfladens udseende uanset en indstilling, der er gemt i browseren, hvilket er nyttigt til kioskskærme, dashboards og iframe-indlejringer:

| Navn       | Parameter | Værdier                 |
| ---------- | --------- | ----------------------- |
| Design     | `theme`   | `auto`, `light`, `dark` |
| Sprog      | `lang`    | `auto`, `de`, …         |
| Enheder    | `unit`    | `km`, `mi`              |
| Tidsformat | `format`  | `12`, `24`              |

### Eksempel {#example}

```
http://evcc.local:7070/?theme=dark&lang=de&unit=mi&format=24
```

Værdierne anvendes én gang ved indlæsning, gemmes i browseren og fjernes derefter fra adresselinjen.

`lang` accepterer enhver sprogkode med en oversættelse i [`i18n`-mappen](https://github.com/evcc-io/evcc/tree/master/i18n) (f.eks. `de`, `fr`, `zh-Hans`) eller `auto` for at følge browserens sprog.

Indstillinger og en side kan kombineres i én URL.
Indstillingerne står før `#`, siden efter:

```
http://evcc.local:7070/?theme=dark&lang=de#/sessions
```
