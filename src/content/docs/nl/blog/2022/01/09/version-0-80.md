---
date: 2022-01-09
title: "Versie 0.80"
description: "Release notes voor evcc 0.80 uit januari 2022 met een verbeterd evcc configure, een venster met zonne-energieaandeel en besparing, en de Docker-tags latest en nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "9db66286559a"
---

Ook dit jaar blijven de updates komen :) Naast de kleinere updates in 0.78 en 0.79 brengt versie 0.80 een paar grotere wijzigingen.

<!-- excerpt -->

## Verbeteringen aan `evcc configure`

Wanneer u een configuratie met `evcc configure` aanmaakt, wordt u nu eerst gevraagd naar uw kennisniveau. Zo kunnen gevorderde gebruikers de configuratie op technische punten nauwkeuriger instellen. De geavanceerde modus is ook nog steeds rechtstreeks beschikbaar via `evcc configure --advanced`. Voor beginners raden we die echter niet aan, omdat er meer kennis voor nodig is.

Daarnaast zijn er meer apparaattemplates, correcties aan bestaande templates en extra instellingen.

## Aandeel zonne-energie en besparing

![Besparingsvenster](../../../../../en/blog/2022/01/09/ersparnis.png)

De nieuwe besparingsfunctie laat zien hoeveel van uw laadenergie door zelf opgewekte zonne-energie werd gedekt.
Het percentage wordt rechtsonder in de hoek weergegeven.
Klik erop om in een venster meer details te zien.
Naast de hoeveelheid energie toont het uw effectieve energieprijs en uw totale besparing ten opzichte van alleen netafname.
Meer informatie over de [berekening en prijsconfiguratie](/nl/faq#savings-calculation) vindt u in de FAQ.

Achter de bedankknop met confetti in het nieuwe venster vinden [sponsors](/nl/sponsorship) (_\*tromgeroffel\*_) een link naar onze nieuwe evcc-stickers.
U bent geweldig. Bedankt voor uw steun! 💚🥳

## Docker

Als u Docker gebruikt, krijgt u met de tag `latest` nu altijd de nieuwste versie. De tag `nightly` levert elke dag nieuwe builds, die mogelijk nog minder goed getest zijn. Meer informatie over de installatie met Docker vindt u hier: [Docker, Synology](/nl/installation/docker)

## Bugfixes

Zoals altijd bevat deze versie een reeks bugfixes en veel kleine verbeteringen. Een gedetailleerd overzicht vindt u via de changelog-links hieronder.

## Download & installatie

- [Debian, Ubuntu, Raspberry Pi](/nl/installation/linux)
- [macOS Homebrew](/nl/installation/macos)
- [Docker](/nl/installation/docker)
- [Windows](/nl/installation/windows)

## Changelog

### Versie 0.80

- [Gedetailleerde lijst met wijzigingen](https://github.com/evcc-io/evcc/releases/tag/0.80)

### Versie 0.79

- [Gedetailleerde lijst met wijzigingen](https://github.com/evcc-io/evcc/releases/tag/0.79)

### Versie 0.78

- [Gedetailleerde lijst met wijzigingen](https://github.com/evcc-io/evcc/releases/tag/0.78)
