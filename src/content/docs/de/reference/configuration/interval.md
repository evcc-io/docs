---
title: "interval"
description: "Hier erfährst du, wie oft Zählerwerte gelesen und Ladeströme nachgeregelt werden, wie du das Intervall änderst und warum sehr kurze Intervalle schwingen können."
sidebar:
  order: 10
translatedFrom: "2def99480cbc"
---

Definiert das Zeitintervall, in dem neue Werte von allen Zählern gelesen und die Ladeströme der Wallboxen neu geregelt werden.

**Mögliche Werte**: Ein Zahlenwert, gefolgt von der Zeiteinheit

**Beispiel**:

```yaml
interval: 30s # alle 30 Sekunden
```

:::caution
Ein zu kurzes Intervall (unter 30 s) kann zu unerwünschtem Verhalten (Schwingungen in der Regelung) führen, wenn die beteiligten Komponenten nicht genug Reaktionszeit haben, bevor der nächste Regelzyklus beginnt. Erfahrungsgemäß ist ein Intervall von 10 s bis 15 s möglich, wenn alle Komponenten schnell genug reagieren. Das sollte individuell getestet werden.
:::
