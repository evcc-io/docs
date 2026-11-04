---
title: "App evcc"
description: "L’app evcc riconosce i link evcc:// con cui puoi precompilare un server per la prima configurazione, aprire la pagina delle previsioni o passare a un punto di ricarica."
sidebar:
  order: 4
translatedFrom: "3208311edbc2"
---

L’[app per smartphone](/it/features/app) registra sul tuo dispositivo lo schema URL `evcc://`.
Apri un link di questo tipo per precompilare la configurazione del server o per passare a una pagina.

## Aggiungere un server {#server}

Questo link apre la schermata per aggiungere un server, con i valori già compilati.
Tutti i parametri sono opzionali.

È utile per la prima configurazione: condividi un link o un codice QR che compila l’URL del server e le credenziali di accesso, così nessuno deve digitare a mano un indirizzo lungo.

```
evcc://server?url=...&title=...&username=...&password=...
```

| Parametro  | Descrizione           |
| ---------- | --------------------- |
| `url`      | URL del server        |
| `title`    | Nome visualizzato     |
| `username` | Utente per il login   |
| `password` | Password per il login |

Assicurati che i valori siano codificati per URL (URL encoding).

```
evcc://server?url=https://demo.evcc.io&title=Demo%20Server&username=admin&password=secret
```

![Codice QR per il link di esempio](https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=evcc%3A%2F%2Fserver%3Furl%3Dhttps%3A%2F%2Fdemo.evcc.io%26title%3DDemo%2520Server%26username%3Dadmin%26password%3Dsecret&qzone=1&margin=0&size=150x150&ecc=L)

## Aprire le previsioni {#forecast}

Apre la pagina delle previsioni.

```
evcc://forecast?server=<index>
```

`server` è l’indice, a partire da zero, di un server salvato.
Se omesso, viene usato il server attivo.

## Aprire un punto di ricarica {#loadpoint}

Apre la pagina dei punti di ricarica.

```
evcc://loadpoint?lp=<number>&server=<index>
```

`lp` mette in primo piano il punto di ricarica con quel numero (la numerazione parte da 1).
Se omesso, viene usato il punto di ricarica attualmente selezionato.
`server` funziona come sopra.
