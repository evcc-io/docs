---
sidebar_position: 11
---

# `tariffs`

Hier kannst du deinen Energietarif und gegebenenfalls deine Einspeisevergütung angeben.
evcc verwendet diese Werte für eine grobe [Einsparungsberechnung](/docs/faq#ersparnisberechnung), die in der Web-UI angezeigt wird.
Diese Daten werden auch vom [Planer](/docs/features/plans) für preis- und CO₂-optimiertes Laden verwendet.

**Struktur**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
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

Mehr Beispiele und eine Übersicht der verfügbaren Anbieter findest du unter [Stromtarife](/docs/tariffs).
