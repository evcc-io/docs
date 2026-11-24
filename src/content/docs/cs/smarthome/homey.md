---
title: "Homey"
description: "Komunitní aplikace evcc pro Homey zpřístupňuje nabíjecí body, lokalitu a domácí baterii jako zařízení a umožňuje ve Flow přepínat režimy nabíjení a limity v lokální síti."
translatedFrom: "d711ce90c00c"
---

[Homey](https://homey.app) je centrála chytré domácnosti, která propojuje zařízení mnoha výrobců a automatizuje je pomocí Flow.
[Aplikace evcc pro Homey](https://homey.app/en-us/app/com.evcc.io/) propojuje Homey s vaší lokální instancí evcc.
Jde o komunitní projekt od [rdvnit](https://github.com/rdvnit), který není součástí evcc.

## Funkce

Aplikace poskytuje tři typy zařízení:

- **Charging point** s režimem nabíjení, limitem nabíjení, nabíjecím výkonem, energií relace, stavem nabití a dojezdem vozidla, stavem připojení a stavem nabíjení
- **Site** s výrobou ze soláru, výkonem sítě a spotřebou domu
- **Home battery** s výkonem baterie, stavem nabití baterie a nastavením řízení baterie

Pomocí karet Flow můžete nastavit režim nabíjení, limit nabíjení a minimální a maximální nabíjecí proud.
Podmínky Flow reagují na režim nabíjení, stav nabíjení a stav připojení.

Aplikace se dotazuje vaší instance evcc v lokální síti a nezávisí na žádné cloudové službě.

## Nastavení

1. Nainstalujte aplikaci **evcc** z [Homey App Store](https://homey.app/en-us/app/com.evcc.io/).
2. Přidejte zařízení a zvolte **Charging point**, **evcc site** nebo **Home battery**.
3. Zadejte URL vaší instance evcc (např. `http://192.168.1.50:7070`) a heslo, pokud je nastavené.

Podrobnosti a podporu najdete v [repozitáři na GitHubu](https://github.com/rdvnit/com.evcc.io).
