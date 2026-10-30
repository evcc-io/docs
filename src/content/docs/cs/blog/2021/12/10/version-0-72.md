---
date: 2021-12-10
title: "Verze 0.72"
description: "Poznámky k vydání evcc 0.72 z prosince 2021 se zjednodušenými návody k instalaci a novým interaktivním průvodcem nastavením evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "fe9b6c445f25"
---

V posledních týdnech se toho hodně událo, a proto bychom vám dnes chtěli podrobněji představit, co všechno nového můžete ve verzi 0.72 objevit.

![Ukázka evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Jednodušší instalace

Začít s **evcc** dosud vyžadovalo určité technické znalosti vašeho operačního systému. Pro Linux (Debian, Ubuntu, Raspberry Pi OS) a macOS je nyní k dispozici výrazně zjednodušená instalace. **evcc** tak nově podporuje instalaci přes správce balíčků `apt` v Linuxu a [`homebrew`](https://brew.sh) v macOS.

Návody k instalaci jsme znovu přepracovali, aby byla instalace ještě jednodušší. Podívejte se do [příslušné dokumentace](/cs/installation).

## Jednodušší konfigurace

I nastavení **evcc** bylo dosud velmi technické, ať už šlo o pravidla formátování [YAML](https://yaml.org), který určuje syntaxi konfigurace, nebo o sestavení a úpravu konfigurace vlastních zařízení v konfiguračním souboru. Pro některé jsou to docela vysoké překážky. Projekt je ale ještě mladý a tým nevelký, zvlášť když vezmeme v úvahu, že je to pro vývojáře „jen“ hobby.

Abychom tyto překážky trochu snížili, zavádíme v **evcc** 0.72 novou funkci: konfiguraci s průvodcem pomocí `evcc configure`.

Tímto příkazem můžete interaktivně vytvořit funkční konfigurační soubor pro svou instalaci! Tu a tam se jistě ještě objeví nějaké problémy a chyby, ale doufáme, že jde o dobrý první krok správným směrem.

## Stažení a instalace

- [Debian, Ubuntu, Raspberry Pi](/cs/installation/linux)
- [macOS Homebrew](/cs/installation/macos)
- [Docker](/cs/installation/docker)
- [Windows](/cs/installation/windows)

## Přehled změn

### Verze 0.72

- [Podrobný seznam změn](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Verze 0.71

- [Podrobný seznam změn](https://github.com/evcc-io/evcc/releases/tag/0.71)
