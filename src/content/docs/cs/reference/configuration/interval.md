---
title: "interval"
description: "Popisuje, jak často evcc čte hodnoty měřičů a upravuje nabíjecí proudy, jak tento interval změnit a proč velmi krátké intervaly mohou způsobit kmitání."
sidebar:
  order: 10
translatedFrom: "2def99480cbc"
---

Určuje časový interval, v jakém se načítají nové hodnoty ze všech měřičů a znovu se upravují nabíjecí proudy nabíječek.

**Možné hodnoty**: Číslo s časovou jednotkou

**Příklad**:

```yaml
interval: 30s # every 30 seconds
```

:::caution
Příliš krátký interval (pod 30 s) může vést k nežádoucímu chování (kmitání regulace), pokud zúčastněné komponenty nemají před začátkem dalšího regulačního cyklu dost času na reakci. Zkušenosti ukazují, že interval 10 až 15 s je možný, pokud všechny komponenty reagují dostatečně rychle. To je potřeba vyzkoušet individuálně.
:::
