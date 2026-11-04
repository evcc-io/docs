---
title: "Homey"
description: "L’app evcc della community per Homey offre come dispositivi punti di ricarica, sito e batteria domestica e permette ai flow di cambiare modalità e limiti in locale."
translatedFrom: "d711ce90c00c"
---

[Homey](https://homey.app) è un hub per la casa intelligente che collega dispositivi di molti produttori e li automatizza tramite i flow.
L’[app evcc per Homey](https://homey.app/en-us/app/com.evcc.io/) collega Homey alla tua istanza evcc locale.
È un progetto della community di [rdvnit](https://github.com/rdvnit) e non fa parte di evcc.

## Funzioni

L’app fornisce tre tipi di dispositivo:

- **Charging point** con modalità di ricarica, limite di carica, potenza di ricarica, energia della sessione, livello di carica e autonomia del veicolo, stato di connessione e stato di ricarica
- **Site** con produzione solare, potenza di rete e consumo domestico
- **Home battery** con potenza della batteria, livello di carica della batteria e impostazioni di controllo della batteria

Le schede flow ti permettono di impostare la modalità di ricarica, il limite di carica e la corrente di ricarica minima e massima.
Le condizioni dei flow possono verificare la modalità di ricarica, lo stato di ricarica e lo stato di connessione.

L’app interroga la tua istanza evcc nella rete locale e non dipende da alcun servizio cloud.

## Configurazione

1. Installa l’app **evcc** dall’[Homey App Store](https://homey.app/en-us/app/com.evcc.io/).
2. Aggiungi un dispositivo e scegli **Charging point**, **evcc site** o **Home battery**.
3. Inserisci l’URL della tua istanza evcc (ad es. `http://192.168.1.50:7070`) e la password, se configurata.

Dettagli e supporto sono disponibili nel [repository GitHub](https://github.com/rdvnit/com.evcc.io).
