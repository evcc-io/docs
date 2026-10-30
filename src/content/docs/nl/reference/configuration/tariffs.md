---
title: "tariffs"
description: "Stel in evcc.yaml tarieven voor netafname, teruglevering, COâ en voorspelling van zonne-energie in, voor besparingen, slimme laadplannen en netbeheerkosten per tijdvak."
sidebar:
  order: 12
translatedFrom: "104e48d142a6"
---

U kunt uw energietarief en, indien van toepassing, uw terugleververgoeding opgeven.
evcc gebruikt deze waarden voor een globale [berekening van de besparing](/nl/faq#statistical-data) die in de webinterface wordt weergegeven.
Deze gegevens worden ook door de [planner](/nl/features/plans) gebruikt voor prijs- en CO₂-geoptimaliseerd laden.

**Structuur**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
    type: ...
  solar:
    type: ...
  temperature:
    type: ...
```

**Bijvoorbeeld: constante energieprijs**

```yaml
tariffs:
  currency: EUR # (default EUR)
  grid:
    # static grid price
    type: fixed
    price: 0.294 # [currency]/kWh

  feedin:
    # rate for feeding excess (pv) energy to the grid
    type: fixed
    price: 0.08 # [currency]/kWh
```

Meer voorbeelden en een lijst van beschikbare aanbieders vindt u in de sectie [Tarieven](/nl/tariffs).

## Tijdsafhankelijke netbeheerkosten {#charges-zones}

Gebruik `charges` om een vast bedrag per kWh aan elke prijswaarde toe te voegen.
Als uw netbeheerder tijdsafhankelijke netbeheerkosten in rekening brengt (bijv. tijdsvariabele netbeheerkosten volgens § 14a EnWG in Duitsland), gebruikt u `chargesZones` om de standaardwaarde van `charges` voor bepaalde periodes te overschrijven.
Dit werkt met elk netafnametarief, ongeacht of het een template van een aanbieder, een `fixed` prijs of een `custom` bron gebruikt.

Elke zone heeft de volgende velden:

| Veld      | Verplicht | Omschrijving                                                            |
| --------- | --------- | ----------------------------------------------------------------------- |
| `charges` | ja        | Bedrag per kWh in deze zone. Vervangt de standaardwaarde van `charges`. |
| `months`  | nee       | bijv. `Nov-Mar` of `Jun`. Leeg betekent het hele jaar.                  |
| `days`    | nee       | bijv. `Mon-Fri` of `Sat,Sun`. Leeg betekent elke dag.                   |
| `hours`   | nee       | bijv. `17-20` of `15:30-21`. Leeg betekent de hele dag.                 |

**Voorbeeld**:

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "..."
    charges: 0.0941 # default grid fee per kWh
    chargesZones:
      - months: Nov-Mar
        days: Mon-Fri
        hours: 17-20
        charges: 0.1838 # peak
      - hours: 0-6
        charges: 0.0299 # low
```

Als geen enkele zone overeenkomt, geldt de standaardwaarde van `charges`.
Als zones elkaar overlappen, geldt de laatste overeenkomende zone.
Als er een `formula` is geconfigureerd, bevat de variabele `charges` de zonewaarde van het betreffende tijdslot.

Een `fixed` tarief met `chargesZones` wordt als een dynamisch tarief behandeld: de planner geeft de voorkeur aan goedkope periodes en de prijsgrafiek wordt weergegeven.

## Feature-flags

Bij door de gebruiker gedefinieerde tarieven (`type: custom`) kunt u het gedrag via `features` beïnvloeden:

| Feature   | Omschrijving                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| average   | Vlakt fijnmazige prijsslots (bijv. kwartierwaarden) af tot uurgemiddelden.                                                      |
| cacheable | Slaat opgehaalde waarden blijvend op. Ze dienen als terugvaloptie na een herstart of een storing bij de aanbieder (tot 24 uur). |

**Voorbeeld**:

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... additional attributes
```
