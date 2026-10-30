---
title: "interval"
description: "Imposta in evcc.yaml ogni quanto evcc legge i contatori e regola le correnti di ricarica, tenendo conto che intervalli molto brevi possono causare oscillazioni."
sidebar:
  order: 10
translatedFrom: "2def99480cbc"
---

Definisce ogni quanto evcc legge i nuovi valori da tutti i contatori e regola di nuovo le correnti di ricarica dei caricabatterie.

**Valori possibili**: un valore numerico seguito dall’unità di tempo

**Esempio**:

```yaml
interval: 30s # every 30 seconds
```

:::caution
Un intervallo troppo breve (< 30 s) può causare un comportamento indesiderato (oscillazioni della regolazione) se i componenti coinvolti non hanno abbastanza tempo di reazione prima che inizi il ciclo di regolazione successivo. In pratica, un intervallo da 10 a 15 s funziona se tutti i componenti reagiscono abbastanza rapidamente. Va verificato caso per caso.
:::
