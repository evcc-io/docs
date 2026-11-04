---
title: "log, levels"
description: "Imposta il livello di log in evcc.yaml, scopri cosa significano i livelli da fatal a trace e come alzarlo per singoli componenti come un punto di ricarica."
sidebar:
  order: 11
translatedFrom: "5f61ea01c519"
---

## `log`

Definisce il livello di dettaglio delle informazioni di log scritte sulla console.

**Valori possibili**:

- `fatal`: vengono mostrati solo i messaggi della categoria `fatal`. Si tratta di errori che impediscono il funzionamento del sistema.
- `error`: vengono mostrati solo i messaggi della categoria `error`. I messaggi di questo tipo sono molto pochi.
- `warn`: include `error` e mostra in più i messaggi della categoria `warn`.
- `info`: include `warn` e mostra in più i messaggi della categoria `info`.
- `debug`: include `info` e mostra in più i messaggi della categoria `debug`. È necessario per l’analisi degli errori.
- `trace`: include `debug` e mostra in più i messaggi della categoria `trace`. È la categoria più dettagliata e può generare una quantità molto grande di dati di log. Di solito non serve.

L’impostazione vale per i [log a lungo termine](/it/report-a-problem#system-logs) della tua installazione.
La pagina Log nell’interfaccia web registra sempre tutti i livelli, vedi [Log](/it/report-a-problem#logs).

**Esempio**:

```yaml
log: error
```

---

## `levels`

Consente di configurare livelli di log diversi per i vari componenti di evcc.

Definisce il livello di dettaglio del log per i diversi componenti di evcc.

**Componenti possibili**:

- `site`: il componente centrale di evcc (controllo, calcoli ecc.)
- `lp-X`: il punto di ricarica con numero progressivo `X`, secondo l’ordine nella configurazione [`loadpoints`](/it/reference/configuration/loadpoints) (punti di ricarica), a partire da `1`
- `sma`: il componente SMA HEMS, se l’SMA Sunny Home Manager 2.0 è integrato tramite [`hems`](/it/reference/configuration/hems)
- _`vehicle`_: ogni [`vehicle`](/it/reference/configuration/vehicles) (veicolo), indicato con il valore del suo parametro [`type`](/it/reference/configuration/vehicles#type) (o del template)
- Inoltre, a seconda del caso d’uso, si possono indicare altri componenti (ad es. `cache`, `db`, `influx`, `mqtt`)

**Valori possibili per ogni componente**: identici ai valori di [`log`](#log)

**Esempio**:

```yaml
levels:
  site: debug
  lp-1: debug
  lp-2: debug
  tesla: trace
```
