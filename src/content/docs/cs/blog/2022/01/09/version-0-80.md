---
date: 2022-01-09
title: "Verze 0.80"
description: "Poznámky k vydání evcc 0.80 z ledna 2022 s vylepšeními evcc configure, novým dialogovým oknem pro solární podíl a úsporu i tagy Dockeru latest a nightly."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "9db66286559a"
---

I letos pokračujeme dalšími aktualizacemi :) Kromě menších aktualizací 0.78 a 0.79 přináší verze 0.80 také několik větších změn.

<!-- excerpt -->

## Vylepšení `evcc configure`

Když vytváříte konfiguraci pomocí `evcc configure`, nejprve se zobrazí dotaz na vaše znalosti. Pokročilí uživatelé tak mohou konfiguraci v technických oblastech nastavit o něco podrobněji. Tento režim je i nadále dostupný přímo přes `evcc configure --advanced`. Začátečníkům ho ale nedoporučujeme, protože vyžaduje více znalostí.

Navíc přibyly další šablony zařízení, opravy stávajících šablon a další možnosti nastavení.

## Solární podíl a úspora

![Dialogové okno úspory](../../../../../en/blog/2022/01/09/ersparnis.png)

Nová funkce úspory vám ukáže, jak velkou část energie pro nabíjení se podařilo pokrýt solární energií z vlastní výroby.
Procentní hodnota se zobrazuje v pravém dolním rohu.
Po kliknutí na ni se vám v dialogovém okně zobrazí další podrobnosti.
Kromě množství energie tam uvidíte také svou efektivní cenu energie a celkovou úsporu oproti odběru výhradně ze sítě.
Více informací o [výpočtu a konfiguraci cen](/cs/faq#savings-calculation) najdete v častých otázkách.

[Sponzoři](/cs/sponsorship) najdou, _\*víření bubnů\*_, v novém dialogovém okně pod tlačítkem s děkovnými konfetami odkaz na naše nové samolepky evcc.
Jste nejlepší. Děkujeme za vaši podporu! 💚🥳

## Docker

Pokud používáte Docker, můžete nyní přes tag `latest` vždy získat aktuální verzi. S tagem `nightly` jsou pak k dispozici denně nové buildy, které ale ještě nemusí být tak dobře otestované. Další informace o instalaci přes Docker najdete zde: [Docker, Synology](/cs/installation/docker)

## Opravy chyb

Jako vždy obsahuje tato verze řadu oprav chyb a mnoho drobných vylepšení. Podrobný seznam najdete přes odkazy na přehledy změn níže.

## Stažení a instalace

- [Debian, Ubuntu, Raspberry Pi](/cs/installation/linux)
- [macOS Homebrew](/cs/installation/macos)
- [Docker](/cs/installation/docker)
- [Windows](/cs/installation/windows)

## Přehled změn

### Verze 0.80

- [Podrobný seznam změn](https://github.com/evcc-io/evcc/releases/tag/0.80)

### Verze 0.79

- [Podrobný seznam změn](https://github.com/evcc-io/evcc/releases/tag/0.79)

### Verze 0.78

- [Podrobný seznam změn](https://github.com/evcc-io/evcc/releases/tag/0.78)
