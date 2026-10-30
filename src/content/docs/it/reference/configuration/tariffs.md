---
title: "tariffs"
description: "Configura in evcc.yaml tariffe di prelievo e immissione, previsioni CO₂ e solari per statistiche di risparmio, piani di ricarica intelligenti e tariffe di rete orarie."
sidebar:
  order: 12
translatedFrom: "104e48d142a6"
---

Puoi indicare la tua tariffa di prelievo e, se presente, la tua tariffa di immissione.
evcc usa questi valori per un [calcolo approssimativo del risparmio](/it/faq#statistical-data) mostrato nell’interfaccia web.
Questi dati vengono usati anche dal [pianificatore](/it/features/plans) per la ricarica ottimizzata in base al prezzo e alla CO₂.

**Struttura**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
    type: ...
  solar:
    type: ...
  temperature:
    type: ...
```

**Ad esempio: prezzo dell’energia costante**

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

Altri esempi e un elenco dei fornitori disponibili si trovano nella sezione [Tariffe](/it/tariffs).

## Tariffe di rete a fasce orarie {#charges-zones}

Con `charges` aggiungi una maggiorazione fissa per kWh a ogni valore di prezzo.
Se il tuo gestore di rete applica tariffe di rete che variano nel tempo (ad es. gli oneri di rete variabili secondo il § 14a EnWG in Germania), usa `chargesZones` per sostituire il valore predefinito di `charges` in determinati periodi.
Funziona con qualsiasi tariffa di prelievo, che usi un modello di fornitore, un prezzo `fixed` o una sorgente `custom`.

Ogni zona (fascia oraria) ha i seguenti campi:

| Campo     | Obbligatorio | Descrizione                                                                           |
| --------- | ------------ | ------------------------------------------------------------------------------------- |
| `charges` | sì           | Maggiorazione per kWh in questa zona. Sostituisce il valore predefinito di `charges`. |
| `months`  | no           | ad es. `Nov-Mar` o `Jun`. Se vuoto vale per tutto l’anno.                             |
| `days`    | no           | ad es. `Mon-Fri` o `Sat,Sun`. Se vuoto vale per tutti i giorni.                       |
| `hours`   | no           | ad es. `17-20` o `15:30-21`. Se vuoto vale per tutto il giorno.                       |

**Esempio**:

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "..."
    charges: 0.0941 # default grid fee per kWh
    chargesZones:
      - months: Nov-Mar
        days: Mon-Fri
        hours: 17-20
        charges: 0.1838 # peak
      - hours: 0-6
        charges: 0.0299 # low
```

Se nessuna zona corrisponde, si applica il valore predefinito di `charges`.
Se le zone si sovrappongono, vale l’ultima zona corrispondente.
Se è configurata una `formula`, la variabile `charges` contiene il valore della zona per la rispettiva fascia oraria.

Una tariffa `fixed` con `chargesZones` viene trattata come una tariffa dinamica: il pianificatore preferisce i periodi economici e viene mostrato il grafico dei prezzi.

## Flag di funzionalità

Per le tariffe definite dall’utente (`type: custom`) puoi influire sul comportamento tramite `features`:

| Funzionalità | Descrizione                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| average      | Raggruppa le fasce di prezzo più fini (ad es. valori ogni 15 minuti) in medie orarie.                                     |
| cacheable    | Conserva i valori recuperati. Vengono usati come riserva dopo un riavvio o un’interruzione del fornitore (fino a 24 ore). |

**Esempio**:

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... additional attributes
```
