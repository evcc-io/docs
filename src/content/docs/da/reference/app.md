---
title: "evcc-app"
description: "evcc-appen forstår evcc://-links, der forudfylder serveropsætningen, åbner prognosesiden eller springer direkte til et ladepunkt, hvilket er praktisk ved onboarding."
sidebar:
  order: 4
translatedFrom: "3208311edbc2"
---

[Den tilhørende app](/da/features/app) registrerer et `evcc://`-URL-skema på din enhed.
Åbn et sådant link for at forudfylde serveropsætningen eller springe til en side.

## Tilføj en server {#server}

Åbner serveropsætningen med forudfyldte værdier.
Alle parametre er valgfrie.

Praktisk ved onboarding: del et link eller en QR-kode, der udfylder server-URL og login, så ingen skal indtaste en lang adresse i hånden.

```
evcc://server?url=...&title=...&username=...&password=...
```

| Parameter  | Beskrivelse       |
| ---------- | ----------------- |
| `url`      | Server-URL        |
| `title`    | Visningsnavn      |
| `username` | Brugernavn        |
| `password` | Login-adgangskode |

Sørg for, at værdierne er URL-kodede.

```
evcc://server?url=https://demo.evcc.io&title=Demo%20Server&username=admin&password=secret
```

![QR-kode til eksempellinket](https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=evcc%3A%2F%2Fserver%3Furl%3Dhttps%3A%2F%2Fdemo.evcc.io%26title%3DDemo%2520Server%26username%3Dadmin%26password%3Dsecret&qzone=1&margin=0&size=150x150&ecc=L)

## Åbn prognosen {#forecast}

Navigerer til prognosesiden.

```
evcc://forecast?server=<index>
```

`server` er det nulbaserede indeks for en gemt server.
Hvis det udelades, bruges den aktive server.

## Åbn et ladepunkt {#loadpoint}

Navigerer til siden med ladepunkter.

```
evcc://loadpoint?lp=<number>&server=<index>
```

`lp` fokuserer på ladepunktet med det angivne nummer (startende ved 1).
Hvis det udelades, bruges det aktuelle ladepunkt.
`server` fungerer som ovenfor.
