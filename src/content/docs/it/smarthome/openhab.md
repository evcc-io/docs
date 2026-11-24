---
title: "openHAB"
description: "Mostra come portare la tua istanza evcc in openHAB con il binding ufficiale evcc, che rileva punti di ricarica, veicoli e dati del sito, oppure tramite MQTT."
translatedFrom: "a70270e36e27"
---

[openHAB](https://www.openhab.org) è una piattaforma open source per la casa intelligente che collega dispositivi e servizi di molti produttori.
Il [binding evcc](https://www.openhab.org/addons/bindings/evcc/) ufficiale porta in openHAB i dati e i controlli della tua istanza evcc.

## Binding evcc

Il binding si collega alla tua istanza evcc nella rete locale e ne interroga l’API a un intervallo configurabile.
Richiede evcc nella versione 0.209.8 o successiva.

Una volta stabilita la connessione, i dispositivi configurati nella tua istanza evcc vengono rilevati automaticamente.
Il binding fornisce Thing per:

- Punti di ricarica con potenza di ricarica, modalità di ricarica, limiti di corrente e dati della sessione
- Veicoli con livello di carica e piani di ricarica
- Dati del sito come potenza di rete, produzione solare e batteria domestica
- Dispositivi di riscaldamento

Puoi monitorare la ricarica nelle dashboard di openHAB e controllare modalità di ricarica, limiti e piani di ricarica da regole e automazioni.

### Configurazione

1. Installa il binding **evcc** dall’add-on store di openHAB.
2. Aggiungi il Thing bridge evcc e inserisci l’indirizzo e la porta della tua istanza evcc.
3. Accetta dall’Inbox i Thing rilevati automaticamente.

I dettagli di configurazione e l’elenco completo dei canali sono documentati nella [documentazione del binding](https://www.openhab.org/addons/bindings/evcc/).

## MQTT

In alternativa puoi scambiare dati con openHAB tramite MQTT.
Configura la connessione al broker in evcc in **Configurazione → MQTT** e usa il binding MQTT di openHAB sullo stesso broker.
I topic disponibili sono documentati nella [MQTT API](/it/integrations/mqtt-api).
