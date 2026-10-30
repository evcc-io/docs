---
date: 2021-12-12
title: "Verze 0.73"
description: "Poznámky k vydání evcc 0.73 z prosince 2021 s vylepšeními průvodce evcc configure, výchozím nastavením nabíjení pro jednotlivá vozidla a prvním rozpoznáním polohy."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "3c89983a8f03"
---

Dnes přichází malá aktualizace hlavně s několika opravami chyb a dalšími vylepšeními.

<!-- excerpt -->

## `evcc configure`

Průvodce pro vytvoření konfiguračního souboru i šablony, na kterých stojí, dostaly tato vylepšení:

- U nabíjecího bodu lze nyní nastavit, zda se mají po odpojení nabíjecího kabelu obnovit výchozí nastavení nabíjení. Více najdete v naší dokumentaci pod `resetOnDisconnect`.
- Nově lze nastavit výchozí hodnoty nabíjení pro jednotlivá vozidla. Interaktivně jsou k dispozici přes `evcc configure --advanced`. Více najdete v dokumentaci pod `onIdentify`.
- Pro zařízení s rozhraním Modbus se nyní generují správné konfigurace.
- Lepší zacházení se situací, kdy soubor `evcc.yaml` v aktuální složce už existuje, ale má jiná přístupová práva.

## Rozpoznání polohy

U některých vozidel nyní **evcc** dokáže rozpoznat aktuální polohu.
Zatím se to ale aktivně nevyužívá.

## Stažení a instalace

- [Debian, Ubuntu, Raspberry Pi](/cs/installation/linux)
- [macOS Homebrew](/cs/installation/macos)
- [Docker](/cs/installation/docker)
- [Windows](/cs/installation/windows)

## Přehled změn

- [Podrobný seznam změn](https://github.com/evcc-io/evcc/releases/tag/0.73)
