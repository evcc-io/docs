---
date: 2021-12-12
title: "Versione 0.73"
description: "Note di rilascio di evcc 0.73 di dicembre 2021 con evcc configure migliorato, impostazioni di ricarica per veicolo e un primo rilevamento della posizione."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "4f5a2d6ac51a"
---

Oggi arriva un piccolo aggiornamento, soprattutto con alcune correzioni di bug e altri miglioramenti.

<!-- excerpt -->

## `evcc configure`

Il comando per la creazione guidata di un file di configurazione e i template sottostanti hanno ricevuto i seguenti miglioramenti:

- Per un punto di ricarica ora si può impostare se, allo scollegamento del cavo di ricarica, debbano essere ripristinate le impostazioni di ricarica predefinite. Maggiori dettagli nella nostra documentazione alla voce `resetOnDisconnect`
- Ora si possono configurare valori di ricarica predefiniti specifici per veicolo. In modo interattivo sono disponibili con `evcc configure --advanced`. Maggiori dettagli nella documentazione alla voce `onIdentify`
- Per i dispositivi Modbus ora vengono generate configurazioni corrette
- Gestione migliorata quando nella cartella corrente esiste già un file `evcc.yaml` ma con permessi di accesso diversi.

## Rilevamento della posizione

Per alcuni veicoli **evcc** ora è in grado di rilevare la posizione attuale. Al momento però questa informazione non viene ancora usata attivamente.

## Download e installazione

- [Debian, Ubuntu, Raspberry Pi](/it/installation/linux)
- [macOS Homebrew](/it/installation/macos)
- [Docker](/it/installation/docker)
- [Windows](/it/installation/windows)

## Changelog

- [Elenco dettagliato delle modifiche](https://github.com/evcc-io/evcc/releases/tag/0.73)
