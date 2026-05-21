---
title: "tariffs"
sidebar:
  order: 11
---

Hier kannst du deinen Energietarif und gegebenenfalls deine Einspeisevergütung angeben.
evcc verwendet diese Werte für eine grobe [Einsparungsberechnung](/de/faq#ersparnisberechnung), die in der Web-UI angezeigt wird.
Diese Daten werden auch vom [Planer](/de/features/plans) für preis- und CO₂-optimiertes Laden verwendet.

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
```

**Beispiel: Konstanter Energiepreis**

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

Mehr Beispiele und eine Übersicht der verfügbaren Anbieter findest du unter [Stromtarife](/de/tariffs).

## Feature-Flags

Bei eigenen Tarifen vom Typ `custom` kannst du über `features` das Verhalten beeinflussen:

| Feature   | Beschreibung                                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| average   | Glättet feingranulare Preisstufen (z. B. 15-Minuten-Werte) zu Stundenmittelwerten.                                          |
| cacheable | Speichert abgerufene Werte persistent. Bei Neustart oder Ausfall des Anbieters dienen sie als Fallback (bis zu 24 Stunden). |

**Beispiel**:

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... weitere Attribute
```
