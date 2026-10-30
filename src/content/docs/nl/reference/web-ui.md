---
title: "Webinterface"
description: "Elke pagina van de webinterface heeft een eigen URL waarnaar u kunt linken of die u als bladwijzer opslaat, en via URL-parameters stelt u thema, taal of eenheden in."
sidebar:
  order: 3
translatedFrom: "e90418bf26a9"
---

De webinterface draait op poort `7070` en gebruikt hash-routing.
Via de URL kunt u zowel de pagina als de weergave-instellingen vastleggen.

## Beschikbare pagina’s {#links}

Elke pagina heeft een eigen hash-route.
Link er rechtstreeks naartoe of sla de pagina op als bladwijzer.

| Pagina              | Route        | Inloggen | Parameters                                        |
| ------------------- | ------------ | -------- | ------------------------------------------------- |
| Start / laadpunten  | `#/`         | nee      | `lp`                                              |
| Thuisbatterij       | `#/battery`  | nee      | —                                                 |
| Voorspelling        | `#/forecast` | nee      | —                                                 |
| Laadsessies         | `#/sessions` | nee      | `month`, `year`, `loadpoint`, `vehicle`, `period` |
| Configuratie        | `#/config`   | ja       | —                                                 |
| Logboeken           | `#/log`      | ja       | `areas`, `level`                                  |
| Geschiedenis 🧪     | `#/history`  | nee      | `day`, `month`, `year`, `period`                  |
| Optimaliseren 🧪    | `#/optimize` | nee      | —                                                 |
| Een probleem melden | `#/issue`    | ja       | —                                                 |

🧪 markeert experimentele pagina’s.

| Parameter   | Beschrijving                                   |
| ----------- | ---------------------------------------------- |
| `lp`        | Nummer van het laadpunt, beginnend bij `1`     |
| `year`      | Weer te geven jaar, bijv. `2026`               |
| `month`     | Maand, `1`–`12`                                |
| `day`       | Dag van de maand, `1`–`31`                     |
| `period`    | Periode: `day`, `month`, `year` of `total`     |
| `loadpoint` | Titel van het laadpunt                         |
| `vehicle`   | Titel van het voertuig                         |
| `areas`     | Weer te geven logboekgebieden, kommagescheiden |
| `level`     | Minimaal logniveau                             |

### Voorbeelden {#examples}

Een laadpunt op het startscherm vooraf selecteren:

```
http://evcc.local:7070/#/?lp=1
```

De eenvoudigste manier om de juiste link te krijgen, is het laadpunt in de interface te selecteren en het adres uit uw browser te kopiëren.

**Laadsessies** of **Geschiedenis** filteren op periode of apparaat:

```
http://evcc.local:7070/#/sessions?year=2026&month=3
```

## Instellingen toepassen {#settings}

De opties onder **Meer → Gebruikersinterface** kunt u ook via de URL instellen.
Zo legt u de weergave van de interface vast, ongeacht een opgeslagen browservoorkeur, wat handig is voor kioskschermen, dashboards en ingesloten iframes:

| Naam        | Parameter | Waarden                 |
| ----------- | --------- | ----------------------- |
| Thema       | `theme`   | `auto`, `light`, `dark` |
| Taal        | `lang`    | `auto`, `de`, …         |
| Eenheden    | `unit`    | `km`, `mi`              |
| Tijdnotatie | `format`  | `12`, `24`              |

### Voorbeeld {#example}

```
http://evcc.local:7070/?theme=dark&lang=de&unit=mi&format=24
```

De waarden worden eenmalig bij het laden toegepast, als browservoorkeur opgeslagen en daarna uit de adresbalk verwijderd.

`lang` accepteert elke taalcode waarvoor een vertaling in de [`i18n`-map](https://github.com/evcc-io/evcc/tree/master/i18n) bestaat (bijv. `de`, `fr`, `zh-Hans`) of `auto` om de taal van de browser te volgen.

Instellingen en een pagina kunnen in één URL worden gecombineerd.
Instellingen staan vóór de `#`, de pagina erna:

```
http://evcc.local:7070/?theme=dark&lang=de#/sessions
```
