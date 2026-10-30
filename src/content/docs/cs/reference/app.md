---
title: "Aplikace evcc"
description: "Aplikace evcc rozumí odkazům evcc://, které předvyplní server pro první nastavení nebo otevřou přímo stránku předpovědi či nabíjecí bod."
sidebar:
  order: 4
translatedFrom: "3208311edbc2"
---

[Doprovodná aplikace](/cs/features/app) registruje ve vašem zařízení schéma URL `evcc://`.
Otevřením takového odkazu předvyplníte nastavení serveru nebo přejdete na určitou stránku.

## Přidání serveru {#server}

Odkaz otevře formulář pro přidání serveru s předvyplněnými hodnotami.
Všechny parametry jsou volitelné.

Hodí se při prvním nastavení: sdílejte odkaz nebo QR kód, který vyplní URL serveru a přihlašovací údaje, aby nikdo nemusel ručně psát dlouhou adresu.

```
evcc://server?url=...&title=...&username=...&password=...
```

| Parametr   | Popis                   |
| ---------- | ----------------------- |
| `url`      | URL serveru             |
| `title`    | Zobrazovaný název       |
| `username` | Uživatel pro přihlášení |
| `password` | Heslo pro přihlášení    |

Dbejte na to, aby hodnoty byly zakódované pro URL.

```
evcc://server?url=https://demo.evcc.io&title=Demo%20Server&username=admin&password=secret
```

![QR kód pro ukázkový odkaz](https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=evcc%3A%2F%2Fserver%3Furl%3Dhttps%3A%2F%2Fdemo.evcc.io%26title%3DDemo%2520Server%26username%3Dadmin%26password%3Dsecret&qzone=1&margin=0&size=150x150&ecc=L)

## Otevření předpovědi {#forecast}

Odkaz přejde na stránku předpovědi.

```
evcc://forecast?server=<index>
```

`server` je index uloženého serveru počítaný od nuly.
Pokud chybí, použije se aktivní server.

## Otevření nabíjecího bodu {#loadpoint}

Odkaz přejde na stránku nabíjecích bodů.

```
evcc://loadpoint?lp=<number>&server=<index>
```

`lp` vybere nabíjecí bod s daným číslem (počítáno od jedné).
Pokud chybí, použije se aktuální nabíjecí bod.
`server` funguje stejně jako výše.
