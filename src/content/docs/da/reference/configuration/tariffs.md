---
title: "tariffs"
description: "Sådan konfigurerer du import- og eksporttarif samt CO₂- og solprognose i evcc.yaml til besparelsesstatistik og smarte ladeplaner og angiver tidsafhængige nettariffer."
sidebar:
  order: 12
translatedFrom: "104e48d142a6"
---

Du kan angive din importtarif og eventuelt din eksporttarif.
evcc bruger disse værdier til en grov [beregning af besparelsen](/da/faq#statistical-data), som vises i brugerfladen.
Dataene bruges også af [planlæggeren](/da/features/plans) til pris- og CO₂-optimeret opladning.

**Struktur**

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

**Eksempel: Fast energipris**

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

Flere eksempler og en liste over tilgængelige udbydere finder du i afsnittet [Tariffer](/da/tariffs).

## Tidsafhængige nettariffer {#charges-zones}

Brug `charges` til at lægge et fast tillæg pr. kWh oven i hver prisværdi.
Hvis dit netselskab afregner tidsafhængige nettariffer (f.eks. tidsvariable netafgifter efter § 14a EnWG i Tyskland), kan du bruge `chargesZones` til at tilsidesætte standardværdien `charges` i bestemte perioder.
Det fungerer med enhver importtarif, uanset om den bruger en udbyder-template, en `fixed` pris eller en `custom` kilde.

Hver zone har følgende felter:

| Felt      | Påkrævet | Beskrivelse                                                       |
| --------- | -------- | ----------------------------------------------------------------- |
| `charges` | ja       | Tillæg pr. kWh i denne zone. Erstatter standardværdien `charges`. |
| `months`  | nej      | f.eks. `Nov-Mar` eller `Jun`. Tomt betyder hele året.             |
| `days`    | nej      | f.eks. `Mon-Fri` eller `Sat,Sun`. Tomt betyder hver dag.          |
| `hours`   | nej      | f.eks. `17-20` eller `15:30-21`. Tomt betyder hele døgnet.        |

**Eksempel**:

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

Hvis ingen zone passer, gælder standardværdien `charges`.
Hvis zoner overlapper, vinder den sidste zone, der passer.
Når der er konfigureret en `formula`, indeholder variablen `charges` zoneværdien for det pågældende tidsinterval.

En `fixed` tarif med `chargesZones` behandles som en dynamisk tarif: Planlæggeren foretrækker billige perioder, og prisgrafen vises.

## Funktionsflag

Ved brugerdefinerede tariffer (`type: custom`) kan du påvirke adfærden via `features`:

| Funktion  | Beskrivelse                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| average   | Udjævner finmaskede prisintervaller (f.eks. 15-minuttersværdier) til gennemsnit pr. time.                     |
| cacheable | Gemmer hentede værdier. Bruges som reserve efter en genstart eller et udfald hos udbyderen (op til 24 timer). |

**Eksempel**:

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... additional attributes
```
