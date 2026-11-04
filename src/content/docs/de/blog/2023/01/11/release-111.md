---
date: 2023-01-11
title: "Version 0.111"
description: "Release Notes zu evcc 0.111 vom Januar 2023 mit einem intelligenteren Ladeplaner, der Börsenpreise von awattar und Tibber, manuelle Zeittarife und CO₂-Daten nutzt."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "ff6ba87e7923"
---

![evcc v0.111](../../../../../en/blog/2023/01/11/banner-evcc-release-111.webp)

Pünktlich am 11. Januar bringt das Release 0.111 einige neue Funktionen mit, die wir dir hier kurz vorstellen möchten.

<!-- excerpt -->

## 🧞‍♂️ Neuer Ladeplaner: erneuerbaren Netzstrom nutzen

Die Zielladefunktion gibt es in evcc schon seit einiger Zeit.
Damit kannst du eine Zielzeit definieren, zu der das verbundene Fahrzeug einen bestimmten Ladestand erreichen soll.
Die Funktion ist z. B. praktisch, um den Wagen vor längeren Fahrten pünktlich zur Abfahrt aufzuladen.

![Zielladen](../../../../../en/blog/2023/01/11/zielladen.webp)

Die bisherige Ladestrategie war relativ simpel: Die Ladung wird möglichst spät gestartet, sodass der Akku pünktlich zur Abfahrt den gewünschten Stand erreicht.
Das schont den Akku, da er nicht lange mit hohem Ladestand herumsteht.

Mit diesem Release wird der Ladeplaner intelligenter und bezieht dynamische Energiepreise und CO₂-Daten mit ein.
Die Ladung wird in Zeitfenster gelegt, in denen besonders viel erneuerbarer Strom im Netz ist.
Das spart Geld, entlastet das Netz und reduziert den Bedarf an fossilen Energieträgern.

### 📈 Börsenpreise mit awattar und Tibber

Die stündlichen Tarife von awattar und Tibber haben wir schon länger angebunden.
Bislang hatten wir aber nur eine einfache Steuerung, die das Laden unter einem vorher konfigurierten Strompreis freigibt (`cheap`).

Jetzt werden die stündlichen Preise auch in der Ladeplanung verwendet, und das Auto lädt dann, wenn der Netzstrom besonders günstig ist.

Konfiguration für awattar:

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # oder at
```

Konfiguration für Tibber:

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # Zugriffstoken
```

### 📊 Manuelle Zeittarife

Du kannst nun auch Zeittarife hinterlegen.
Hier eine Beispielkonfiguration mit günstiger Energie in der Nacht und noch günstigerer Energie am Wochenende:

```yaml
tariffs:
  grid:
    type: fixed
    price: 0.294 # EUR/kWh
    zones:
      - days: Mo-Fr
        hours: 2-5
        price: 0.2 # EUR/kWh
      - days: Sa,So
        price: 0.15 # EUR/kWh
```

Auch diese Preise fließen in den neuen Planungsalgorithmus mit ein.

### 🌱 CO₂-Daten von GrünStromIndex und Electricity Maps

Auch ohne dynamischen Stromtarif kannst du klimaschonend laden.
Dafür binden wir jetzt CO₂-Daten ein.
Aktuell unterstützen wir zwei Quellen, sind aber offen für weitere Vorschläge.

[GrünStromIndex](https://gruenstromindex.de) liefert regionale Vorhersagen darüber, wie sauber der Netzstrom in Deutschland ist.
Du musst lediglich deine Postleitzahl hinterlegen.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Maps](https://app.electricitymaps.com/map) liefert weltweite Vorhersagen.
Für die Nutzung in evcc benötigst du ein Token und das URL-Präfix.
Beides bekommst du mit einem [kostenlosen Account im API-Portal](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Ausblick

Für eines der nächsten Releases arbeiten wir an einer visuellen Darstellung des Ladeplans.
Dann siehst du auch die vom Algorithmus berechneten Zeitfenster und die tatsächliche Kosten- oder CO₂-Ersparnis.

## Weitere neue Funktionen

Neben den üblichen kleinen Verbesserungen und Fehlerbehebungen enthält dieses Release auch noch ein paar weitere neue Funktionen:

- 🔋🪫 Bessere Unterstützung für mehrere Hausbatterien [#5598](https://github.com/evcc-io/evcc/pull/5598)
- 🌞 Unterstützung für FoxESS [#5721](https://github.com/evcc-io/evcc/pull/5721)
- 🔌 Unterstützung für den Tesla Wall Connector 3 [#5341](https://github.com/evcc-io/evcc/pull/5341)
- 🚙 Unterstützung für Volvo-Fahrzeuge [#5681](https://github.com/evcc-io/evcc/pull/5681)
- 🏳️‍🌈 Drei neue UI-Sprachen

**Danke für deine Unterstützung!**<br />
evcc-Core-Team<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) und [@naltatis](https://github.com/naltatis)
