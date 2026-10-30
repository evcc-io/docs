---
date: 2022-01-09
title: "Versione 0.80"
description: "Note di rilascio di evcc 0.80 di gennaio 2022, che migliora evcc configure e aggiunge una finestra di dialogo su quota solare e risparmio e i tag Docker latest e nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "9db66286559a"
---

Anche quest’anno gli aggiornamenti continuano :) Oltre agli aggiornamenti minori della 0.78 e della 0.79, la versione 0.80 porta alcune modifiche più grandi.

<!-- excerpt -->

## Miglioramenti a `evcc configure`

Quando crei una configurazione con `evcc configure`, ti viene chiesto prima il tuo livello di esperienza. In questo modo gli utenti esperti possono definire più nel dettaglio gli aspetti tecnici della configurazione. Questa modalità resta disponibile anche direttamente tramite `evcc configure --advanced`. Tuttavia non la consigliamo a chi è alle prime armi, perché richiede più competenze.

Inoltre ci sono altri template di dispositivi, correzioni ai template esistenti e ulteriori opzioni di impostazione.

## Quota solare e risparmio

![Finestra di dialogo del risparmio](../../../../../en/blog/2022/01/09/ersparnis.png)

La nuova funzione di risparmio ti mostra quanta parte dell’energia di ricarica è stata coperta dall’energia solare autoprodotta.
Il valore percentuale viene mostrato nell’angolo in basso a destra.
Se ci clicchi sopra, si apre una finestra di dialogo con ulteriori dettagli.
Lì, oltre alla quantità di energia, vedi anche il tuo prezzo effettivo dell’energia e il risparmio totale rispetto al solo prelievo dalla rete.
Maggiori informazioni su [calcolo e configurazione dei prezzi](/it/faq#savings-calculation) si trovano nelle FAQ.

Gli [sponsor](/it/sponsorship) trovano nella nuova finestra di dialogo, sotto il pulsante dei coriandoli di ringraziamento, … _\*rullo di tamburi\*_ … un link per ricevere i nostri nuovi adesivi evcc.
Voi sponsor siete i migliori. Grazie per il vostro supporto! 💚🥳

## Docker

Chi usa Docker ora ottiene sempre la versione attuale con il tag `latest`. Con il tag `nightly` ci sono poi nuove build ogni giorno, che però possono essere meno testate. Ulteriori informazioni sull’installazione con Docker si trovano qui: [Docker, Synology](/it/installation/docker)

## Correzioni di bug

Come sempre, questa versione contiene una serie di correzioni di bug e molti piccoli miglioramenti. Trovi un elenco dettagliato tramite il link al changelog qui sotto.

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
