---
title: "Interfaccia web"
description: "Ogni pagina dell’interfaccia web ha un proprio URL da salvare o condividere, e impostazioni come design, lingua o unità si applicano tramite parametri nell’URL."
sidebar:
  order: 3
translatedFrom: "e90418bf26a9"
---

L’interfaccia web gira sulla porta `7070` e usa un routing basato su hash.
Tramite l’URL puoi scegliere sia la pagina sia le opzioni di visualizzazione.

## Pagine disponibili {#links}

Ogni pagina ha un proprio percorso hash.
Puoi creare un link diretto alla pagina o salvarla nei preferiti.

| Pagina                   | Route        | Login | Parametri                                         |
| ------------------------ | ------------ | ----- | ------------------------------------------------- |
| Home / punti di ricarica | `#/`         | no    | `lp`                                              |
| Batteria domestica       | `#/battery`  | no    | —                                                 |
| Previsioni               | `#/forecast` | no    | —                                                 |
| Sessioni di ricarica     | `#/sessions` | no    | `month`, `year`, `loadpoint`, `vehicle`, `period` |
| Configurazione           | `#/config`   | sì    | —                                                 |
| Log                      | `#/log`      | sì    | `areas`, `level`                                  |
| Cronologia 🧪            | `#/history`  | no    | `day`, `month`, `year`, `period`                  |
| Ottimizza 🧪             | `#/optimize` | no    | —                                                 |
| Segnala un problema      | `#/issue`    | sì    | —                                                 |

🧪 indica le pagine sperimentali.

| Parametro   | Descrizione                                           |
| ----------- | ----------------------------------------------------- |
| `lp`        | Numero del punto di ricarica, a partire da `1`        |
| `year`      | Anno da mostrare, ad es. `2026`                       |
| `month`     | Mese, `1`–`12`                                        |
| `day`       | Giorno del mese, `1`–`31`                             |
| `period`    | Intervallo di tempo: `day`, `month`, `year` o `total` |
| `loadpoint` | Titolo del punto di ricarica                          |
| `vehicle`   | Titolo del veicolo                                    |
| `areas`     | Aree di log da mostrare, separate da virgola          |
| `level`     | Livello di log minimo                                 |

### Esempi {#examples}

Preseleziona un punto di ricarica nella pagina Home:

```
http://evcc.local:7070/#/?lp=1
```

Il modo più semplice per ottenere il link giusto è selezionare il punto di ricarica nell’interfaccia e copiare l’indirizzo dal browser.

Filtra **Sessioni di ricarica** o **Cronologia** per intervallo di tempo o dispositivo:

```
http://evcc.local:7070/#/sessions?year=2026&month=3
```

## Applicare le impostazioni {#settings}

Le opzioni in **Altro → Interfaccia Utente** si possono impostare anche tramite l’URL.
In questo modo l’aspetto dell’interfaccia viene forzato indipendentemente dalle preferenze salvate nel browser, il che è utile per schermi in modalità kiosk, dashboard e incorporamenti in iframe:

| Nome        | Parametro | Valori                  |
| ----------- | --------- | ----------------------- |
| Design      | `theme`   | `auto`, `light`, `dark` |
| Lingua      | `lang`    | `auto`, `de`, …         |
| Unità       | `unit`    | `km`, `mi`              |
| Formato ora | `format`  | `12`, `24`              |

### Esempio {#example}

```
http://evcc.local:7070/?theme=dark&lang=de&unit=mi&format=24
```

I valori vengono applicati una volta al caricamento, salvati come preferenza del browser e poi rimossi dalla barra degli indirizzi.

`lang` accetta qualsiasi codice lingua per cui esiste una traduzione nella [cartella `i18n`](https://github.com/evcc-io/evcc/tree/master/i18n) (ad es. `de`, `fr`, `zh-Hans`) oppure `auto` per seguire la lingua del browser.

Impostazioni e pagina si possono combinare in un unico URL.
Le impostazioni vanno prima del `#`, la pagina dopo:

```
http://evcc.local:7070/?theme=dark&lang=de#/sessions
```
