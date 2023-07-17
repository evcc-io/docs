---
sidebar_position: 9
---

# `interval`

Definiert das zeitliche Interval, in welchem neue Werte von allen Messgeräten gelesen werden und die Ladeströme der Wallboxen neu geregelt wird.

**Mögliche Werte**: Ein Zahlenwert gefolgt von der Zeiteinheit

**Beispiel**:

```yaml
interval: 30s # alle 30 Sekunden
```

:::caution
Ein zu kurzes Interval ( < 30s ) kann zu unerwünschtem Verhalten (die Regelung schwingt) führen, wenn die beteiligten Komponenten unter Umständen nicht genug Reaktionszeit haben, bevor der nächste Regelzyklus beginnt. Erfahrungsgemäß ist ein Interval von 10s bis 15s möglich, wenn alle Komponenten schnell genug reagieren. Das sollte individuell getestet werden.   
:::
