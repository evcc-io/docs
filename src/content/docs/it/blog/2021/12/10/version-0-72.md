---
date: 2021-12-10
title: "Versione 0.72"
description: "Note di rilascio di evcc 0.72 di dicembre 2021 con guide di installazione semplificate e la nuova procedura guidata interattiva evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "853d43f3c405"
---

Nelle ultime settimane sono successe molte cose e oggi vogliamo raccontare un po’ più nel dettaglio tutte le novità da scoprire nella versione 0.72.

![Esempio di evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Installazione più semplice

Finora l’accesso a **evcc** richiedeva comunque alcune conoscenze tecniche sull’uso del proprio sistema operativo. Per Linux (Debian, Ubuntu, Raspberry Pi OS) e macOS ora c’è un’installazione decisamente semplificata. **evcc** supporta infatti l’installazione tramite i gestori di pacchetti `apt` su Linux e [`homebrew`](https://brew.sh) su macOS.

Per questo abbiamo rivisto ancora una volta le guide di installazione, semplificando ulteriormente l’installazione. Dai un’occhiata alla [documentazione relativa](/it/installation).

## Configurazione più semplice

Anche la configurazione di **evcc** finora era ancora molto tecnica. Lo erano sia le regole di formattazione di [YAML](https://yaml.org), che definisce la sintassi della configurazione, sia la struttura del file e l’adattamento alla configurazione dei propri dispositivi. Per qualcuno questi sono ostacoli piuttosto alti. Ma il progetto è ancora giovane e il team è piccolo, soprattutto se si considera che per gli sviluppatori è “solo” un hobby.

Per ridurre un po’ questi ostacoli, con questa nuova versione 0.72 di **evcc** introduciamo una nuova funzionalità: la configurazione guidata con `evcc configure`.

Con questo comando si può creare in modo interattivo un file di configurazione funzionante per la propria installazione! Sicuramente qua e là ci sono ancora alcuni problemi ed errori, ma speriamo che sia un buon primo passo nella giusta direzione.

## Download e installazione

- [Debian, Ubuntu, Raspberry Pi](/it/installation/linux)
- [macOS Homebrew](/it/installation/macos)
- [Docker](/it/installation/docker)
- [Windows](/it/installation/windows)

## Changelog

### Versione 0.72

- [Elenco dettagliato delle modifiche](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Versione 0.71

- [Elenco dettagliato delle modifiche](https://github.com/evcc-io/evcc/releases/tag/0.71)
