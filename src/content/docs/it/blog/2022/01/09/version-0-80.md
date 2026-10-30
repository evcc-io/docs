---
date: 2022-01-09
title: "Versione 0.80"
description: "Note di rilascio di evcc 0.80 di gennaio 2022, che migliora evcc configure e aggiunge una finestra di dialogo su quota solare e risparmio e i tag Docker latest e nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "c8cad4e6288a"
---

Anche quest’anno si continua con nuovi aggiornamenti :) Oltre agli aggiornamenti minori con la 0.78 e la 0.79, ora con la versione 0.80 arrivano anche alcune modifiche più grandi.

<!-- excerpt -->

## Miglioramenti a `evcc configure`

Quando crei una configurazione con `evcc configure`, ti viene chiesto prima il tuo livello di esperienza. In questo modo gli utenti esperti possono definire più nel dettaglio gli aspetti tecnici della configurazione. Questa modalità resta disponibile anche direttamente tramite `evcc configure --advanced`. Tuttavia non la consigliamo a chi è alle prime armi, perché richiede più competenze.

Inoltre ci sono altri template di dispositivi, correzioni ai template esistenti e ulteriori opzioni di impostazione.

## Quota solare e risparmio

![Finestra di dialogo del risparmio](../../../../../en/blog/2022/01/09/ersparnis.png)

La nuova funzione di risparmio ti mostra quanta parte dell’energia di ricarica è stata coperta dall’energia solare autoprodotta.
Il valore percentuale viene mostrato nell’angolo in basso a destra.
Cliccandoci sopra, una finestra di dialogo ti mostra ulteriori dettagli.
Lì, oltre alla quantità di energia, vedi anche il tuo prezzo effettivo dell’energia e il risparmio totale rispetto al solo prelievo dalla rete.
Qui trovi maggiori informazioni su [calcolo e configurazione dei prezzi](/it/faq#savings-calculation).

Gli [sponsor](/it/sponsorship) trovano nella nuova finestra di dialogo, sotto il pulsante dei coriandoli di ringraziamento, … _\*rullo di tamburi\*_ … un link per ricevere i nostri nuovi adesivi evcc.
Siete i migliori. Grazie per il vostro supporto! 💚🥳

## Docker

Chi usa Docker ora ottiene sempre la versione attuale con il tag `latest`. Con il tag `nightly` ci sono poi nuove build ogni giorno, che però possono essere meno testate. Ulteriori informazioni sull’installazione con Docker si trovano qui: [Docker, Synology](/it/installation/docker)

## Correzioni di bug

Naturalmente anche questa versione contiene una serie di correzioni di bug e molti piccoli miglioramenti. Trovi un elenco dettagliato tramite il link al changelog qui sotto.

## Download e installazione

- [Debian, Ubuntu, Raspberry Pi](/it/installation/linux)
- [macOS Homebrew](/it/installation/macos)
- [Docker](/it/installation/docker)
- [Windows](/it/installation/windows)

## Changelog

### Versione 0.80

- [Elenco dettagliato delle modifiche](https://github.com/evcc-io/evcc/releases/tag/0.80)

### Versione 0.79

- [Elenco dettagliato delle modifiche](https://github.com/evcc-io/evcc/releases/tag/0.79)

### Versione 0.78

- [Elenco dettagliato delle modifiche](https://github.com/evcc-io/evcc/releases/tag/0.78)
