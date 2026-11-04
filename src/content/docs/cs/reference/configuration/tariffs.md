---
title: "tariffs"
description: "Popisuje, jak v evcc.yaml nastavit tarify dodávky a výkupu, předpovědi CO₂ a soláru a časově závislé poplatky za distribuci pro statistiku úspor a chytré plány nabíjení."
sidebar:
  order: 12
translatedFrom: "104e48d142a6"
---

Můžete zadat svůj tarif dodávky energie a případně i tarif výkupu energie.
evcc tyto hodnoty používá pro orientační [výpočet úspor](/cs/faq#statistical-data), který se zobrazuje ve webovém rozhraní.
Tato data využívá také [plánovač](/cs/features/plans) pro nabíjení optimalizované podle ceny a CO₂.

**Struktura**

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

**Příklad: konstantní cena energie**

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

Další příklady a seznam dostupných poskytovatelů najdete v části [Tarify](/cs/tariffs).

## Časově závislé poplatky za distribuci {#charges-zones}

Pomocí `charges` přičtete ke každé ceně pevný příplatek za kWh.
Pokud váš provozovatel distribuční soustavy účtuje časově závislé poplatky za distribuci (např. podle § 14a EnWG v Německu), přepište pomocí `chargesZones` výchozí `charges` pro konkrétní období.
Funguje to s jakýmkoli síťovým tarifem bez ohledu na to, zda používá šablonu poskytovatele, cenu `fixed` nebo zdroj `custom`.

Každá zóna má následující pole:

| Pole      | Povinné | Popis                                                      |
| --------- | ------- | ---------------------------------------------------------- |
| `charges` | ano     | Poplatek za kWh v této zóně. Nahrazuje výchozí `charges`.  |
| `months`  | ne      | např. `Nov-Mar` nebo `Jun`. Prázdné znamená celý rok.      |
| `days`    | ne      | např. `Mon-Fri` nebo `Sat,Sun`. Prázdné znamená každý den. |
| `hours`   | ne      | např. `17-20` nebo `15:30-21`. Prázdné znamená celý den.   |

**Příklad**:

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

Pokud žádná zóna neodpovídá, platí výchozí `charges`.
Pokud se zóny překrývají, platí poslední odpovídající zóna.
Pokud je nastaven vzorec `formula`, obsahuje proměnná `charges` hodnotu zóny pro příslušný časový úsek.

Tarif `fixed` s `chargesZones` se chová jako dynamický tarif: plánovač upřednostňuje levná období a zobrazuje se cenový graf.

## Příznaky funkcí

U tarifů definovaných uživatelem (`type: custom`) můžete chování ovlivnit pomocí `features`:

| Funkce    | Popis                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------ |
| average   | Zprůměruje jemněji členěné ceny (např. 15minutové) na hodinové hodnoty.                          |
| cacheable | Ukládá načtené hodnoty. Slouží jako záloha po restartu nebo výpadku poskytovatele (až 24 hodin). |

**Příklad**:

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... additional attributes
```
