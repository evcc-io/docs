---
title: "evcc App"
sidebar:
  order: 4
---

Die [Companion-App](/de/features/app) registriert auf deinem Gerät ein `evcc://`-URL-Schema.
Ein solcher Link füllt die Servereinrichtung vor oder öffnet direkt eine Seite.

## Server hinzufügen {#server}

Öffnet die Servereingabe mit vorausgefüllten Werten.
Alle Parameter sind optional.

Praktisch beim Onboarding: Teile einen Link oder QR-Code, der Server-URL und Login vorausfüllt, sodass niemand eine lange Adresse abtippen muss.

```
evcc://server?url=...&title=...&username=...&password=...
```

| Parameter  | Beschreibung   |
| ---------- | -------------- |
| `url`      | Server-URL     |
| `title`    | Anzeigename    |
| `username` | Login-Benutzer |
| `password` | Login-Passwort |

Achte darauf, dass die Werte URL-codiert sind.

```
evcc://server?url=https://demo.evcc.io&title=Demo%20Server&username=admin&password=secret
```

![QR-Code für den Beispiel-Link](https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=evcc%3A%2F%2Fserver%3Furl%3Dhttps%3A%2F%2Fdemo.evcc.io%26title%3DDemo%2520Server%26username%3Dadmin%26password%3Dsecret&qzone=1&margin=0&size=150x150&ecc=L)

## Vorhersage öffnen {#forecast}

Öffnet die Vorhersageseite.

```
evcc://forecast?server=<index>
```

`server` ist der bei `0` beginnende Index eines gespeicherten Servers.
Ohne Angabe wird der aktive Server verwendet.

## Ladepunkt öffnen {#loadpoint}

Öffnet die Ladepunktseite.

```
evcc://loadpoint?lp=<number>&server=<index>
```

`lp` wählt den Ladepunkt mit dieser bei `1` beginnenden Nummer.
Ohne Angabe wird der aktuelle Ladepunkt verwendet.
`server` funktioniert wie oben.
