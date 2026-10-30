---
date: 2023-01-11
title: "Versie 0.111"
description: "Release notes van evcc 0.111 uit januari 2023 met een slimmere laadplanner die dynamische prijzen van awattar en Tibber, handmatige tarieven en CO₂-gegevens gebruikt."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "2770b38763f5"
---

![evcc v0.111](../../../../../en/blog/2023/01/11/banner-evcc-release-111.webp)

Precies op 11 januari hebben we met release 0.111 weer een aantal nieuwe functies klaarstaan, die we hier kort aan u willen voorstellen.

<!-- excerpt -->

## 🧞‍♂️ Nieuwe laadplanner: hernieuwbare netstroom gebruiken

De functie voor doelladen bestaat al enige tijd in evcc. Daarmee kunt u een doeltijd instellen waarop het aangesloten voertuig een bepaald laadniveau moet bereiken. De functie is bijv. handig om de auto voor langere ritten precies op tijd voor vertrek op te laden.

![Doelladen](../../../../../en/blog/2023/01/11/zielladen.webp)

De laadstrategie was tot nu toe vrij eenvoudig: het laden wordt zo laat mogelijk gestart, zodat de batterij precies bij vertrek het gewenste niveau heeft bereikt. Dat spaart de batterij, omdat deze niet lang op een hoog laadniveau blijft staan.

Met deze release wordt de laadplanner slimmer en houdt deze rekening met dynamische stroomprijzen en CO₂-gegevens. Zo wordt het laden gepland in tijdvakken waarin er bijzonder veel hernieuwbare stroom op het net is. Dat bespaart geld, ontlast het stroomnet en vermindert de behoefte aan fossiele energiebronnen.

### 📈 Beursprijzen met awattar en Tibber

De uurtarieven van awattar en Tibber ondersteunen we al langer. Tot nu toe hadden we echter alleen een eenvoudige aansturing die het laden start onder een vooraf te configureren stroomprijs (`cheap`).

Nu worden de uurprijzen ook in de laadplanning gebruikt en laadt de auto wanneer de netstroom bijzonder goedkoop is.

Configuratie voor awattar

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # or at
```

Configuratie voor Tibber

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # access token
```

### 📊 Handmatige tijdafhankelijke tarieven

Het is nu ook mogelijk om tijdafhankelijke tarieven in te stellen. Hier een voorbeeldconfiguratie voor goedkope energie ’s nachts en nog goedkopere energie in het weekend:

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

Ook deze prijsgegevens worden meegenomen in het nieuwe planningsalgoritme.

### 🌱 CO₂-gegevens van GrünStromIndex en ElectricityMap

Wie geen dynamisch stroomtarief heeft, kan toch klimaatvriendelijk laden. Daarvoor gebruiken we nu CO₂-gegevens. Op dit moment hebben we twee bronnen geïmplementeerd. We staan echter open voor verdere suggesties.

[GrünStromIndex](https://gruenstromindex.de) levert regionale voorspellingen over hoe schoon de netstroom in Duitsland is. U hoeft alleen uw postcode in te vullen.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Map](https://app.electricitymaps.com/map) levert wereldwijde voorspellingen. Voor gebruik in evcc hebt u een token en het URL-prefix nodig. Deze gegevens krijgt u met het [gratis account in het API-portaal](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Vooruitblik

Voor een van de volgende releases werken we aan een visuele weergave van het laadplan. Dan kunt u ook de door het algoritme berekende tijdvakken en de concrete kosten- of CO₂-besparing zien.

## Meer nieuwe functies

Naast de gebruikelijke kleine verbeteringen en bugfixes bevat deze release nog een paar andere nieuwe functies:

- 🔋🪫 Betere ondersteuning voor meerdere thuisbatterijen [#5598](https://github.com/evcc-io/evcc/pull/5598)
- 🌞 Ondersteuning voor FoxESS [#5721](https://github.com/evcc-io/evcc/pull/5721)
- 🔌 Ondersteuning voor de Tesla Wall Connector 3 [#5341](https://github.com/evcc-io/evcc/pull/5341)
- 🚙 Ondersteuning voor Volvo-voertuigen [#5681](https://github.com/evcc-io/evcc/pull/5681)
- 🏳️‍🌈 Drie nieuwe UI-talen

**Bedankt voor uw steun!**<br />
evcc-kernteam<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) en [@naltatis](https://github.com/naltatis)
