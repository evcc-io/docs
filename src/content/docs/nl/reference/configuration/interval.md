---
title: "interval"
description: "Beschrijft hoe vaak evcc meterwaarden uitleest en laadstromen bijstelt, hoe u dit interval wijzigt en waarom zeer korte intervallen tot schommelingen kunnen leiden."
sidebar:
  order: 10
translatedFrom: "2def99480cbc"
---

Definieert het tijdsinterval waarmee nieuwe waarden van alle meters worden uitgelezen en de laadstromen van de laders opnieuw worden geregeld.

**Mogelijke waarden**: Een numerieke waarde gevolgd door de tijdseenheid

**Voorbeeld**:

```yaml
interval: 30s # every 30 seconds
```

:::caution
Een te kort interval (korter dan 30 s) kan tot ongewenst gedrag leiden (schommelingen in de regeling) als de betrokken componenten niet genoeg reactietijd hebben voordat de volgende regelcyclus begint. De ervaring leert dat een interval van 10 s tot 15 s mogelijk is als alle componenten snel genoeg reageren. Dit moet per installatie worden getest.
:::
