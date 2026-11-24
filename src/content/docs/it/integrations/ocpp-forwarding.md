---
title: "Inoltro OCPP"
description: "Puoi inoltrare i messaggi OCPP di un caricabatterie da evcc a un backend esterno, come una piattaforma di fatturazione, mentre evcc continua a gestire la ricarica."
translatedFrom: "df48634d807d"
---

A volte le sessioni di ricarica devono arrivare a un backend OCPP esterno, ad es. una piattaforma di fatturazione per il rimborso da parte del datore di lavoro o un gestore di punti di ricarica.
Normalmente un caricabatterie può comunicare con un solo server OCPP.
Con l’inoltro, il caricabatterie resta collegato alla tua istanza evcc, che ne inoltra i messaggi anche al server esterno.
evcc continua a gestire la ricarica.
Il server esterno riceve in tempo reale le sessioni di ricarica e le letture del contatore e, se consentito, può anche controllare il caricabatterie.

## Configurazione {#setup}

L’inoltro è disponibile per i caricabatterie integrati tramite OCPP, cioè quelli che usano evcc come server OCPP.
Configura prima il caricabatterie, poi puoi impostare l’inoltro.

1. Apri **Configurazione → Server OCPP**.
2. L’elenco **ID stazione** mostra i tuoi caricabatterie OCPP collegati. Fai clic sul pulsante con la nuvola accanto al caricabatterie per aprire la finestra di dialogo **Inoltro OCPP**.
3. Inserisci l’**URL server upstream**, cioè l’indirizzo del server a cui inoltrare, ad es. `wss://billing.example.com/ocpp`.
4. Se il server esterno richiede l’autenticazione, inserisci **Nome utente** e **Password** (HTTP Basic Auth). Se si aspetta un identificativo diverso per il caricabatterie, imposta l’**ID stazione**.
5. Fai clic su **Salva**. L’inoltro parte subito, senza bisogno di riavviare.

L’icona della nuvola accanto al caricabatterie indica se l’inoltro funziona.
Eventuali problemi di connessione vengono mostrati nella finestra di dialogo.

Per interrompere l’inoltro, apri di nuovo la finestra di dialogo e fai clic su **Rimuovi**.

## Comandi dal server upstream {#upstream-commands}

Per impostazione predefinita il server esterno può inviare comandi al caricabatterie.
Per evitare conflitti con il controllo della ricarica, abilita **Blocca i comandi dal server upstream** nelle impostazioni avanzate.
Il server continua a ricevere ogni messaggio del caricabatterie, ma evcc mantiene il controllo esclusivo.

## Certificati {#certificates}

Le impostazioni avanzate riguardano anche TLS.
Abilita **Permetti certificati self-signed** per configurazioni di test senza un certificato valido.
Indica un **Certificato server (CA)** se il server esterno usa un certificato di un’autorità di certificazione privata.
