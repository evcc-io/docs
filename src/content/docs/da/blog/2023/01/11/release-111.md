---
date: 2023-01-11
title: "Version 0.111"
description: "Udgivelsesnoter for evcc 0.111 fra januar 2023 med en smartere ladeplanlægger, der bruger dynamiske priser fra awattar og Tibber, manuelle tariffer og CO₂-data."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "ff6ba87e7923"
---

![evcc v0.111](../../../../../en/blog/2023/01/11/banner-evcc-release-111.webp)

Lige på dagen, den 11. januar, udkommer version 0.111 med en række nye funktioner, som vi gerne vil præsentere kort her.

<!-- excerpt -->

## 🧞‍♂️ Ny ladeplanlægger: brug vedvarende strøm fra elnettet

Ladeplanfunktionen har eksisteret i evcc i et stykke tid.
Med den kan du angive et tidspunkt, hvor det tilsluttede køretøj senest skal have nået et bestemt opladningsniveau.
Funktionen er f.eks. praktisk til at få bilen ladet op i god tid før en længere tur.

![Ladeplan](../../../../../en/blog/2023/01/11/zielladen.webp)

Den hidtidige opladningsstrategi var relativt enkel: Opladningen startes så sent som muligt, så batteriet har nået det ønskede niveau præcis ved afgang.
Det skåner batteriet, fordi det ikke står længe med et højt opladningsniveau.

Med denne udgivelse bliver ladeplanlæggeren klogere og inddrager dynamiske energipriser og CO₂-data.
Opladningen planlægges i tidsvinduer, hvor der er særlig meget vedvarende strøm i elnettet.
Det sparer penge, aflaster elnettet og reducerer behovet for fossile energikilder.

### 📈 Spotpriser med awattar og Tibber

Timetarifferne fra awattar og Tibber har vi understøttet i længere tid.
Indtil nu havde vi dog kun en enkel styring, der tillod opladning under en forudkonfigureret elpris (`cheap`).

Nu bruges timepriserne også i ladeplanlægningen, og bilen lader, når strømmen fra elnettet er særlig billig.

Konfiguration for awattar

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # eller at
```

Konfiguration for Tibber

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # adgangstoken
```

### 📊 Manuelle tidstariffer

Det er nu også muligt at angive tidstariffer.
Her er en eksempelkonfiguration med billig energi om natten og endnu billigere energi i weekenden:

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

Disse prisdata indgår også i den nye planlægningsalgoritme.

### 🌱 CO₂-data fra GrünStromIndex og Electricity Maps

Selv uden en dynamisk tarif kan du lade klimavenligt.
Til det integrerer vi nu CO₂-data.
I øjeblikket understøtter vi to kilder, men vi er åbne for flere forslag.

[GrünStromIndex](https://gruenstromindex.de) leverer regionale prognoser for, hvor grøn strømmen i elnettet er i Tyskland.
Du skal blot angive dit postnummer.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Maps](https://app.electricitymaps.com/map) leverer prognoser for hele verden.
For at bruge det med evcc skal du have et token og URL-præfikset.
Begge dele får du med en [gratis konto i API-portalen](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Et kig fremad

Til en af de næste udgivelser arbejder vi på en visuel fremstilling af ladeplanen.
Så kan du også se de tidsvinduer, algoritmen har beregnet, og den konkrete besparelse i omkostninger eller CO₂.

## Flere nye funktioner

Ud over de sædvanlige små forbedringer og fejlrettelser indeholder denne udgivelse også et par andre nye funktioner:

- 🔋🪫 Bedre understøttelse af flere hjemmebatterier [#5598](https://github.com/evcc-io/evcc/pull/5598)
- 🌞 Understøttelse af FoxESS [#5721](https://github.com/evcc-io/evcc/pull/5721)
- 🔌 Understøttelse af Tesla Wall Connector 3 [#5341](https://github.com/evcc-io/evcc/pull/5341)
- 🚙 Understøttelse af Volvo-køretøjer [#5681](https://github.com/evcc-io/evcc/pull/5681)
- 🏳️‍🌈 Tre nye sprog i brugerfladen

**Tak for din støtte!**<br />
evcc-kerneteamet<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) og [@naltatis](https://github.com/naltatis)
