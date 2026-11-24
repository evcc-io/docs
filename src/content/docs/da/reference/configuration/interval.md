---
title: "interval"
description: "Her indstiller du, hvor ofte evcc aflæser målerværdier og justerer ladestrømmen, og hvorfor meget korte intervaller kan give svingninger i reguleringen."
sidebar:
  order: 10
translatedFrom: "2def99480cbc"
---

Angiver, hvor ofte der aflæses nye værdier fra alle målere, og opladernes ladestrøm reguleres igen.

**Mulige værdier**: En talværdi efterfulgt af tidsenheden

**Eksempel**:

```yaml
interval: 30s # every 30 seconds
```

:::caution
Et for kort interval (under 30 s) kan føre til uønsket adfærd (svingninger i reguleringen), hvis de involverede komponenter ikke har tid nok til at reagere, før den næste reguleringscyklus begynder. Erfaringen viser, at et interval på 10 s til 15 s er muligt, hvis alle komponenter reagerer hurtigt nok. Det bør testes i hvert enkelt tilfælde.
:::
