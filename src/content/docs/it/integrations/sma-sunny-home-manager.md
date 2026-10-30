---
title: "Sunny Home Manager"
description: "Spiega come evcc rende visibili i punti di ricarica nel Sunny Portal di uno SMA Sunny Home Manager 2.0 e, se vuoi, gli permette di influire sulla potenza di ricarica."
sidebar:
  order: 5
translatedFrom: "64de8f1d87ba"
---

evcc supporta l’integrazione con lo [SMA Sunny Home Manager 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager).
Questa integrazione rende visibili i punti di ricarica nel Sunny Portal e, se vuoi, permette allo SHM di controllarli.

## Come funziona

L’integrazione è sempre attiva.
Quando evcc è in esecuzione, mette automaticamente a disposizione un endpoint SEMP (Smart Energy Management Protocol) e lo annuncia via mDNS nella rete locale.
In questo modo lo SHM può rilevare e integrare automaticamente i punti di ricarica.

Grazie all’integrazione, tutti i punti di ricarica di evcc compaiono nel Sunny Portal come consumatori con dati di consumo dettagliati.
Inoltre lo SHM può influire sulla potenza di ricarica, se lo consenti esplicitamente.

L’endpoint SEMP è raggiungibile all’indirizzo `http://[evcc-IP]:7070/semp/` e mostra una panoramica XML dei dispositivi registrati.

## Configurazione nel Sunny Home Manager

Dopo che li hai configurati in evcc, i punti di ricarica compaiono automaticamente come nuovi dispositivi nel Sunny Portal in **Configurazione → Panoramica apparecchi**.
Lì puoi attivarli e seguire la procedura guidata di configurazione.
Per i dettagli sulla configurazione consulta il [manuale SMA](https://manuals.sma.de/HM-20/it-IT/10426801547.html).

## ID dei dispositivi

In evcc non serve alcuna configurazione.
evcc genera automaticamente gli ID dei dispositivi necessari.

Ogni punto di ricarica riceve un ID univoco nel formato:

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Le singole parti indicano:

- **AAAAAAAA**: l’ID del produttore (8 cifre esadecimali)
- **BBBBBBBBBBBB**: l’ID del dispositivo (12 cifre esadecimali)

Se vuoi usare ID diversi da quelli generati (ad es. quando passi a un altro hardware per evcc), puoi copiare gli ID esistenti dall’endpoint `/semp/` del vecchio sistema e adattarli in **Configurazione → Sunny Home Manager**.
In questo modo lo SHM continua a riconoscere i dispositivi.
