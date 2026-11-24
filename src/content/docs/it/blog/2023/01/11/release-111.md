---
date: 2023-01-11
title: "Versione 0.111"
description: "Note di rilascio di evcc 0.111 di gennaio 2023 con un pianificatore di ricarica più intelligente che usa prezzi dinamici di awattar e Tibber, tariffe manuali e dati CO₂."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "ff6ba87e7923"
---

![evcc v0.111](../../../../../en/blog/2023/01/11/banner-evcc-release-111.webp)

Puntuale l’11 gennaio arriva la release 0.111, con alcune nuove funzionalità che vogliamo presentarti brevemente.

<!-- excerpt -->

## 🧞‍♂️ Nuovo pianificatore di ricarica: usare l’energia rinnovabile dalla rete

La funzione di ricarica pianificata esiste in evcc già da un po’.
Con essa puoi definire un orario entro il quale il veicolo collegato deve raggiungere un determinato livello di carica.
La funzione è utile, ad es., per avere l’auto carica in tempo per la partenza prima di un viaggio lungo.

![Ricarica pianificata](../../../../../en/blog/2023/01/11/zielladen.webp)

La strategia di ricarica finora era piuttosto semplice: la ricarica parte il più tardi possibile, in modo che la batteria raggiunga il livello desiderato giusto in tempo per la partenza.
Questo preserva la batteria, perché l’auto non resta ferma a lungo con un livello di carica elevato.

Con questa release il pianificatore di ricarica diventa più intelligente e tiene conto dei prezzi dinamici dell’energia e dei dati CO₂.
La ricarica viene pianificata nelle fasce orarie in cui la quota di energia rinnovabile nella rete è particolarmente alta.
Questo fa risparmiare denaro, alleggerisce la rete e riduce il fabbisogno di combustibili fossili.

### 📈 Prezzi di borsa con awattar e Tibber

Le tariffe orarie di awattar e Tibber sono supportate già da tempo.
Finora però avevamo solo un controllo semplice, che abilitava la ricarica al di sotto di un prezzo dell’energia configurato in anticipo (`cheap`).

Ora i prezzi orari vengono usati anche nella pianificazione della ricarica e l’auto si carica quando l’energia di rete è particolarmente economica.

Configurazione per awattar

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # oppure at
```

Configurazione per Tibber

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # token di accesso
```

### 📊 Tariffe a fasce orarie inserite manualmente

Ora puoi inserire anche tariffe a fasce orarie.
Ecco un esempio di configurazione con energia economica di notte e ancora più economica nel fine settimana:

```yaml
tariffs:
  grid:
    type: fixed
    price: 0.294 # EUR/kWh
    zones:
      - days: Mo-Fr
        hours: 2-5
        price: 0.2 # EUR/kWh
      - days: Sa,So
        price: 0.15 # EUR/kWh
```

Anche questi prezzi confluiscono nel nuovo algoritmo di pianificazione.

### 🌱 Dati CO₂ da GrünStromIndex ed Electricity Maps

Anche senza una tariffa dinamica puoi caricare in modo rispettoso del clima.
Per questo ora integriamo i dati CO₂.
Al momento supportiamo due fonti, ma siamo aperti ad altri suggerimenti.

[GrünStromIndex](https://gruenstromindex.de) fornisce previsioni regionali su quanto è pulita l’energia di rete in Germania.
Devi solo inserire il tuo codice postale.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Maps](https://app.electricitymaps.com/map) fornisce previsioni per tutto il mondo.
Per usarlo con evcc ti servono un token e il prefisso dell’URL.
Ottieni entrambi con l’[account gratuito nel portale API](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Prospettive

Per una delle prossime release stiamo lavorando a una rappresentazione visiva del piano di ricarica.
Così vedrai anche le fasce orarie calcolate dall’algoritmo e il risparmio effettivo in costi o CO₂.

## Altre novità

Oltre ai consueti piccoli miglioramenti e correzioni di bug, questa release contiene anche alcune altre nuove funzionalità:

- 🔋🪫 Supporto migliore per più batterie domestiche [#5598](https://github.com/evcc-io/evcc/pull/5598)
- 🌞 Supporto per FoxESS [#5721](https://github.com/evcc-io/evcc/pull/5721)
- 🔌 Supporto per il Tesla Wall Connector 3 [#5341](https://github.com/evcc-io/evcc/pull/5341)
- 🚙 Supporto per i veicoli Volvo [#5681](https://github.com/evcc-io/evcc/pull/5681)
- 🏳️‍🌈 Tre nuove lingue dell’interfaccia

**Grazie per il tuo supporto!**<br />
Il team principale di evcc<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) e [@naltatis](https://github.com/naltatis)
