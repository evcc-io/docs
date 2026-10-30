---
title: "evcc-app"
description: "Met evcc://-links vult de evcc-app servergegevens vooraf in, opent ze de voorspelling of springt ze direct naar een laadpunt, wat nieuwe gebruikers op weg helpt."
sidebar:
  order: 4
translatedFrom: "3208311edbc2"
---

De [bijbehorende app](/nl/features/app) registreert een `evcc://`-URL-schema op uw apparaat.
Open zo’n link om de servergegevens vooraf in te vullen of naar een pagina te springen.

## Een server toevoegen {#server}

Deze link opent het formulier voor een nieuwe server met vooraf ingevulde servergegevens.
Alle parameters zijn optioneel.

Handig bij het instellen voor nieuwe gebruikers: deel een link of QR-code die de server-URL en de inloggegevens invult, zodat niemand een lang adres met de hand hoeft in te typen.

```
evcc://server?url=...&title=...&username=...&password=...
```

| Parameter  | Beschrijving   |
| ---------- | -------------- |
| `url`      | Server-URL     |
| `title`    | Weergavenaam   |
| `username` | Gebruikersnaam |
| `password` | Wachtwoord     |

Zorg ervoor dat de waarden URL-gecodeerd zijn.

```
evcc://server?url=https://demo.evcc.io&title=Demo%20Server&username=admin&password=secret
```

![QR-code voor de voorbeeldlink](https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=evcc%3A%2F%2Fserver%3Furl%3Dhttps%3A%2F%2Fdemo.evcc.io%26title%3DDemo%2520Server%26username%3Dadmin%26password%3Dsecret&qzone=1&margin=0&size=150x150&ecc=L)

## De voorspelling openen {#forecast}

Deze link opent de voorspellingspagina.

```
evcc://forecast?server=<index>
```

`server` is het volgnummer van een opgeslagen server, beginnend bij 0.
Zonder deze parameter wordt de actieve server gebruikt.

## Een laadpunt openen {#loadpoint}

Deze link opent de pagina met de laadpunten.

```
evcc://loadpoint?lp=<number>&server=<index>
```

`lp` selecteert het laadpunt met dat nummer, beginnend bij 1.
Zonder deze parameter wordt het huidige laadpunt gebruikt.
`server` werkt zoals hierboven.
