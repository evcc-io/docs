---
date: 2022-05-08
title: "Přepínání fází, šablony a litevština"
description: "Souhrn vydání evcc 0.81 až 0.91 z května 2022 s mnoha novými nabíječkami a vozidly, vylepšeným přepínáním fází, šablonami zařízení a litevským rozhraním."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "be2964228ce3"
---

Od posledního příspěvku na blogu uběhlo několik měsíců. Je tedy čas na krátké shrnutí a přehled toho, co se v evcc za posledních jedenáct vydání (v0.81 až v0.91) událo.

<!-- excerpt -->

## Nově podporovaná zařízení

Seznam hardwaru podporovaného evcc neustále roste.

### Nabíječky 🔌

Přidali jsme několik integrací nabíječek. Protože evcc nyní podporuje i velmi rozšířený [Bender Controller](https://github.com/evcc-io/evcc/pull/3103), mohli jsme výrazně rozšířit nabídku podporovaných zařízení.

Toto jsou výrobci, kteří přibyli od začátku roku: Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity, Vestel, Webasto. [(Všechny nabíječky)](/cs/chargers)

### Vozidla 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Landrover, Mercedes, Silence S01, Smart. [(Všechna vozidla)](/cs/vehicles)

### Střídače ☀️ 🔋

SMA (Smart Energy Hybrid), Huawei (SUN2000), Solarwatt, Solax, Varta. [(Všechny měřiče)](/cs/meters)

### Měřiče sítě 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Všechny měřiče)](/cs/meters)

### Podpora RFID 🪪

Nabíječky od Easee a Warp nyní mohou také využívat [funkci RFID pro rozpoznání vozidla](/cs/features/vehicle) v evcc.

## Vylepšené přepínání fází (1P/3P)

První verze přepínání fází pro podporované nabíječky je v evcc k dispozici od poloviny loňského roku. Mohli jsme tak nasbírat zkušenosti a na jejich základě jsme v únoru mechanismus [zásadně přepracovali](https://github.com/evcc-io/evcc/pull/2613). Přepínání fází je díky tomu mnohem spolehlivější a lépe se chová i v situacích s neznámou nebo nevěrohodnou konfigurací či s nevěrohodnými naměřenými hodnotami.

## Šablony a dokumentace

[V prosinci](/cs/blog/2021/12/12/version-0-73#evcc-configure) jsme položili základy jednoduššího prvního nastavení pomocí průvodce nastavením v příkazovém řádku `evcc configure`.

Syntaxe konfigurace evcc je velmi flexibilní a mocná. Například zařízení, která zatím nejsou oficiálně podporovaná, lze často připojit čistě konfigurací, pokud znáte příslušné registry Modbus a struktury JSON daného rozhraní. V nyní archivovaném repozitáři `evcc-io/config` jsme shromažďovali ukázkové konfigurace, které jste si mohli zkopírovat a vložit do vlastní konfigurace.

Spolu s průvodcem v příkazovém řádku jsme zavedli koncept **šablon**. Šablony nám umožňují čistě zapouzdřit opakující se kód a interní znalosti o zařízeních (protokoly, adresy, datové typy, názvy polí). Následující příklad nastavení měřiče sítě Solarlog tuto změnu docela dobře ilustruje:

Předtím:

```yaml
meters:
  - name: my_solarlog
    type: custom
    power:
      source: calc
      add:
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3502
            type: input
            decode: uint32s
          scale: -1
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3518
            type: input
            decode: uint32s
```

Potom:

```yaml
meters:
  - name: my_solarlog
    type: template
    template: solarlog
    usage: grid
    host: 192.168.0.77
```

Uživatel nyní potřebuje znát a zadat jen název hostitele nebo IP adresu svého zařízení Solarlog. Protokol a datová struktura jsou zapouzdřené v šabloně `solarlog`.

Šablony navíc obsahují strukturovaný popis všech povinných a volitelných parametrů a také výchozí hodnoty a lokalizované nápovědy.

[Od března](https://github.com/evcc-io/docs/pull/92) jsme [dokumentaci zařízení na docs.evcc.io](/cs/chargers) převedli na šablony. Dosavadní syntaxe samozřejmě dál fungují. Protože budoucí funkce, jako je nastavení přes webové rozhraní (ano, to přijde 😄), staví na `type: template`, doporučujeme převést vaše stávající konfigurace na nový formát už nyní.

## Nová lokalizace: litevština 🇱🇹

Ve verzi 0.91 přibyla nová lokalizace. Rozhraní evcc je nyní k dispozici také v litevštině. Je to již čtvrtý jazyk vedle němčiny, angličtiny a italštiny. Velké díky, [RTTTC](https://github.com/RTTTC) 💚.

Protože naše jazykové znalosti jsou poměrně omezené, jsme za příspěvky k překladům vždy vděční. Dokumentace k tomu zatím neexistuje, ale pokud máte zájem, podívejte se na [pull request od RTTC](https://github.com/evcc-io/evcc/pull/3205).

## Co bude dál?

Někteří z vás to možná už viděli. S příštím vydáním dostane evcc zcela přepracované uživatelské rozhraní. To je už k dispozici v aktuálních nightly buildech a informace o průběhu vývoje najdete [zde](https://github.com/evcc-io/evcc/discussions/3149) a [zde](https://github.com/evcc-io/evcc/pull/2889). Více o tom ale v příštím článku na blogu.

## Opravy chyb

Poslední verze obsahovaly řadu oprav chyb a mnoho drobných vylepšení. Podrobný seznam najdete přes odkazy na přehledy změn níže.

## Přehledy změn

Zde najdete více podrobností o nejnovějších změnách:

- [Verze 0.91](https://github.com/evcc-io/evcc/releases/tag/0.91)
- [Verze 0.90](https://github.com/evcc-io/evcc/releases/tag/0.90)
- [Verze 0.89](https://github.com/evcc-io/evcc/releases/tag/0.89)
- [Verze 0.88](https://github.com/evcc-io/evcc/releases/tag/0.88)
- [Verze 0.87](https://github.com/evcc-io/evcc/releases/tag/0.87)
- [Verze 0.86](https://github.com/evcc-io/evcc/releases/tag/0.86)
- [Verze 0.85](https://github.com/evcc-io/evcc/releases/tag/0.85)
- [Verze 0.84](https://github.com/evcc-io/evcc/releases/tag/0.84)
- [Verze 0.83](https://github.com/evcc-io/evcc/releases/tag/0.83)
- [Verze 0.82](https://github.com/evcc-io/evcc/releases/tag/0.82)
- [Verze 0.81](https://github.com/evcc-io/evcc/releases/tag/0.81)
