---
sidebar_position: 9
---

# `interval`

Definiert das zeitliche Interval, in welchem neue Werte von allen Messgeräten gelesen werden und die Ladeströme der Wallboxen neu geregelt wird.

**Mögliche Werte**: Ein Zahlenwert gefolgt von der Zeiteinheit

**Beispiel**:

```yaml
interval: 10s # alle 10 Sekunden
```

:::caution
Ein zu kurzes Interval ( < 10s ) kann zu unerwünschtem Verhalten führen, da die beteiligten Komponenten dann nicht genug Reaktionszeit haben, bevor der nächste Regelzyklus beginnt.
:::
