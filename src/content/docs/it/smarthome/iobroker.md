---
title: "ioBroker"
description: "Mostra come collegare ioBroker alla tua istanza evcc, con l’adattatore ioBroker.evcc della community tramite REST API oppure condividendo un broker MQTT."
translatedFrom: "d7b49d124f14"
---

[ioBroker](https://www.iobroker.net) è una piattaforma open source per la casa intelligente che integra dispositivi e servizi tramite adattatori.
L’adattatore [ioBroker.evcc](https://github.com/Newan/ioBroker.evcc) collega ioBroker alla tua istanza evcc.
È un progetto della community e non fa parte di evcc.

## Adattatore evcc

L’adattatore comunica con la tua istanza evcc tramite la [REST API](/integrations/rest-api).
Fornisce stati per punti di ricarica, veicoli e dati del sito, e ti permette di controllare modalità e limiti di ricarica da script e visualizzazioni di ioBroker.

### Configurazione

1. Installa l’adattatore **evcc** dall’interfaccia di amministrazione di ioBroker.
2. Inserisci l’indirizzo e la porta della tua istanza evcc nella configurazione dell’adattatore.

Dettagli e supporto sono disponibili nel [repository GitHub](https://github.com/Newan/ioBroker.evcc) e nel [thread del forum di ioBroker](https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc).

## MQTT

In alternativa puoi scambiare dati con ioBroker tramite MQTT.
Configura la connessione al broker in evcc in **Configurazione → MQTT** e usa l’adattatore MQTT di ioBroker sullo stesso broker.
I topic disponibili sono documentati nella [MQTT API](/it/integrations/mqtt-api).
