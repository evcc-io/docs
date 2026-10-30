---
date: 2021-12-19
title: "Verze 0.74"
description: "Poznámky k vydání evcc 0.74 z prosince 2021, které v rozhraní zobrazuje běžící časovače solárního režimu a přepínání fází a vrací cílové nabíjení."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "4ec9acb9cce2"
---

Dnes přichází malá aktualizace hlavně s několika opravami chyb a dalšími vylepšeními.

## Časovače v rozhraní

Rozhraní vám nyní zobrazuje časovače běžící na pozadí:

![Časovač přepínání fází](../../../../../en/blog/2021/12/19/1p3p.png)

<!-- excerpt -->

- V solárním režimu:
  - Kdy se nabíjení přeruší
  - Kdy se nabíjení znovu spustí
- Přepínání fází 1p3p:
  - Kdy se přepne nahoru na 3p
  - Kdy se přepne dolů na 1p

Navíc se zobrazuje také, s kolika fázemi se nabíjí.

## Cílové nabíjení

![Rozhraní cílového nabíjení](../../../../../en/blog/2021/12/19/zielladen.png)

Funkce cílového nabíjení je zpět. Můžete s ní nabít elektromobil k určitému datu a času na požadovaný stav nabití.

## Stažení a instalace

- [Debian, Ubuntu, Raspberry Pi](/cs/installation/linux)
- [macOS Homebrew](/cs/installation/macos)
- [Docker](/cs/installation/docker)
- [Windows](/cs/installation/windows)

## Přehled změn

- [Podrobný seznam změn](https://github.com/evcc-io/evcc/releases/tag/0.74)
