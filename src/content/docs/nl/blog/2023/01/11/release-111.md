---
date: 2023-01-11
title: "Versie 0.111"
description: "Release notes van evcc 0.111 uit januari 2023 met een slimmere laadplanner die dynamische prijzen van awattar en Tibber, handmatige tarieven en CO₂-gegevens gebruikt."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "ff6ba87e7923"
---

![evcc v0.111](../../../../../en/blog/2023/01/11/banner-evcc-release-111.webp)

Precies op tijd, op 11 januari, brengt release 0.111 een aantal nieuwe functies, die we hier kort willen voorstellen.

<!-- excerpt -->

## 🧞‍♂️ Nieuwe laadplanner: hernieuwbare netstroom gebruiken

De functie voor doelladen bestaat al enige tijd in evcc.
Daarmee kunt u een doeltijd instellen waarop het aangesloten voertuig een bepaald laadniveau moet bereiken.
De functie is bijv. handig om de auto voor langere ritten precies op tijd voor vertrek op te laden.

![Doelladen](../../../../../en/blog/2023/01/11/zielladen.webp)

De laadstrategie was tot nu toe vrij eenvoudig: het laden start zo laat mogelijk, zodat de batterij precies bij vertrek het gewenste niveau heeft bereikt.
Dat spaart de batterij, omdat deze niet lang op een hoog laadniveau blijft staan.

Met deze release wordt de laadplanner slimmer en houdt deze rekening met dynamische energieprijzen en CO₂-gegevens.
Het laden wordt gepland in tijdvakken waarin er bijzonder veel hernieuwbare stroom op het net is.
Dat bespaart geld, ontlast het net en vermindert de behoefte aan fossiele brandstoffen.

### 📈 Beursprijzen met awattar en Tibber

De uurtarieven van awattar en Tibber ondersteunen we al langer.
Tot nu toe hadden we echter alleen een eenvoudige aansturing die het laden start zodra de stroomprijs onder een vooraf ingestelde grens (`cheap`) komt.

Nu worden de uurprijzen ook in de laadplanning gebruikt en laadt de auto wanneer de netstroom bijzonder goedkoop is.

Configuratie voor awattar

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # of at
```

Configuratie voor Tibber

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # toegangstoken
```

### 📊 Handmatige tijdafhankelijke tarieven

U kunt nu ook tijdafhankelijke tarieven invoeren.
Hier is een voorbeeldconfiguratie met goedkope energie ’s nachts en nog goedkopere energie in het weekend:

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

Ook deze prijzen worden meegenomen in het nieuwe planningsalgoritme.

### 🌱 CO₂-gegevens van GrünStromIndex en Electricity Maps

Ook zonder dynamisch stroomtarief kunt u klimaatvriendelijk laden.
Daarvoor integreren we nu CO₂-gegevens.
Op dit moment ondersteunen we twee bronnen, maar we staan open voor verdere suggesties.

[GrünStromIndex](https://gruenstromindex.de) levert regionale voorspellingen over hoe schoon de netstroom in Duitsland is.
U hoeft alleen uw postcode in te vullen.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Maps](https://app.electricitymaps.com/map) levert wereldwijd voorspellingen.
Voor gebruik met evcc hebt u een token en het URL-prefix nodig.
Beide krijgt u met een [gratis account in het API-portaal](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Vooruitblik

Voor een van de volgende releases werken we aan een visuele weergave van het laadplan.
Dan ziet u ook de door het algoritme berekende tijdvakken en de werkelijke kosten- of CO₂-besparing.

## Meer nieuwe functies

Naast de gebruikelijke kleine verbeteringen en bugfixes bevat deze release nog een paar andere nieuwe functies:

- 🔋🪫 Betere ondersteuning voor meerdere thuisbatterijen [#5598](https://github.com/evcc-io/evcc/pull/5598)
- 🌞 Ondersteuning voor FoxESS [#5721](https://github.com/evcc-io/evcc/pull/5721)
- 🔌 Ondersteuning voor de Tesla Wall Connector 3 [#5341](https://github.com/evcc-io/evcc/pull/5341)
- 🚙 Ondersteuning voor Volvo-voertuigen [#5681](https://github.com/evcc-io/evcc/pull/5681)
- 🏳️‍🌈 Drie nieuwe UI-talen

**Bedankt voor uw steun!**<br />
Het evcc-kernteam<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) en [@naltatis](https://github.com/naltatis)
