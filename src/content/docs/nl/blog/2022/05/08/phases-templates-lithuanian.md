---
date: 2022-05-08
title: "Fasebeheer, templates en Litouws"
description: "Overzicht van de releases evcc 0.81 tot 0.91 uit mei 2022 met veel nieuwe laders en voertuigen, betere faseomschakeling, apparaattemplates en een Litouwse UI."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "be2964228ce3"
---

De laatste blogpost is alweer een paar maanden geleden. Tijd dus voor een korte samenvatting en een overzicht van wat er bij evcc is gebeurd in de laatste elf releases (v0.81 tot v0.91).

<!-- excerpt -->

## Nieuw ondersteunde apparaten

De lijst met hardware die evcc ondersteunt, groeit gestaag.

### Laders 🔌

We hebben enkele integraties voor laders toegevoegd. Omdat evcc nu ook de zeer populaire [Bender Controller](https://github.com/evcc-io/evcc/pull/3103) ondersteunt, konden we het aanbod aan ondersteunde apparaten flink uitbreiden.

Dit zijn de fabrikanten die sinds het begin van het jaar zijn toegevoegd: Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity, Vestel, Webasto. [(Alle laders)](/nl/chargers)

### Voertuigen 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Landrover, Mercedes, Silence S01, Smart. [(Alle voertuigen)](/nl/vehicles)

### Omvormers ☀️ 🔋

SMA (Smart Energy Hybrid), Huawei (SUN2000), Solarwatt, Solax, Varta. [(Alle meters)](/nl/meters)

### Netmeters 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Alle meters)](/nl/meters)

### RFID-ondersteuning 🪪

De laders van Easee en Warp kunnen nu ook de [RFID-functie van evcc voor voertuigherkenning](/nl/features/vehicle) gebruiken.

## Verbeterd fasebeheer (1P/3P)

De eerste versie van faseomschakeling voor ondersteunde laders is sinds medio vorig jaar beschikbaar in evcc. We hebben daar ervaring mee opgedaan en op basis daarvan in februari [het mechanisme grondig herzien](https://github.com/evcc-io/evcc/pull/2613). Daardoor is de faseomschakeling veel betrouwbaarder en gedraagt ze zich ook beter bij onbekende of onwaarschijnlijke configuratie- of meetwaarden.

## Templates en documentatie

[In december](/nl/blog/2021/12/12/version-0-73#evcc-configure) legden we met de CLI-installatiewizard `evcc configure` de basis voor een eenvoudigere eerste installatie.

De configuratiesyntaxis van evcc is zeer flexibel en krachtig. Apparaten die nog niet officieel ondersteund worden, kunnen bijvoorbeeld vaak puur via configuratie worden aangesloten als u de bijbehorende Modbus-velden en JSON-structuren van de interface kent. In de inmiddels gearchiveerde repository `evcc-io/config` hadden we voorbeeldconfiguraties verzameld die u in uw eigen configuratie kon kopiëren en plakken.

Samen met de wizard voor de opdrachtregel introduceerden we het concept **templates**. Met templates kunnen we standaardcode en interne apparaatkennis (protocollen, adressen, datatypes, veldnamen) netjes inkapselen. Het volgende voorbeeld voor het instellen van een Solarlog-netmeter laat de verandering goed zien:

Voorheen:

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

Nu:

```yaml
meters:
  - name: my_solarlog
    type: template
    template: solarlog
    usage: grid
    host: 192.168.0.77
```

De gebruiker hoeft nu alleen nog de hostnaam of het IP-adres van zijn Solarlog-installatie te kennen en in te vullen; protocol en datastructuur zitten ingekapseld in de template `solarlog`.

Daarnaast krijgen templates ook een gestructureerde beschrijving van alle verplichte en optionele parameters, plus standaardwaarden en gelokaliseerde helpteksten.

[Sinds maart](https://github.com/evcc-io/docs/pull/92) hebben we de [apparaatdocumentatie op docs.evcc.io](/nl/chargers) omgezet naar templates. De eerdere syntaxis werkt uiteraard nog steeds. Omdat toekomstige functies zoals de webgebaseerde installatie (ja, die komt er 😄) op `type: template` gebaseerd zijn, raden we aan uw bestaande configuraties nu al naar het nieuwe formaat om te zetten.

## Nieuwe taal: Litouws 🇱🇹

Met v0.91 kregen we een nieuwe vertaling. De evcc-UI is nu ook in het Litouws beschikbaar. Dat is de vierde taal naast Duits, Engels en Italiaans. Hartelijk dank, [RTTTC](https://github.com/RTTTC) 💚.

Omdat onze talenkennis vrij beperkt is, zijn we altijd dankbaar voor bijdragen aan vertalingen. Er is hiervoor momenteel geen documentatie, maar als u interesse hebt, kijk dan gewoon naar [de pull request van RTTC](https://github.com/evcc-io/evcc/pull/3205).

## Wat komt er hierna?

Sommigen van u hebben het misschien al gezien. Met de volgende release krijgt evcc een volledig vernieuwde gebruikersinterface. Die is al beschikbaar in de huidige nightly builds. Informatie over het ontwikkelproces vindt u [hier](https://github.com/evcc-io/evcc/discussions/3149) en [hier](https://github.com/evcc-io/evcc/pull/2889). Maar daarover meer in de volgende blogpost.

## Bugfixes

De laatste versies bevatten een aantal bugfixes en veel kleine verbeteringen. Een gedetailleerde lijst vindt u via de changelog-link hieronder.

## Changelogs

Hier vindt u meer details over de laatste wijzigingen:

- [Versie 0.91](https://github.com/evcc-io/evcc/releases/tag/0.91)
- [Versie 0.90](https://github.com/evcc-io/evcc/releases/tag/0.90)
- [Versie 0.89](https://github.com/evcc-io/evcc/releases/tag/0.89)
- [Versie 0.88](https://github.com/evcc-io/evcc/releases/tag/0.88)
- [Versie 0.87](https://github.com/evcc-io/evcc/releases/tag/0.87)
- [Versie 0.86](https://github.com/evcc-io/evcc/releases/tag/0.86)
- [Versie 0.85](https://github.com/evcc-io/evcc/releases/tag/0.85)
- [Versie 0.84](https://github.com/evcc-io/evcc/releases/tag/0.84)
- [Versie 0.83](https://github.com/evcc-io/evcc/releases/tag/0.83)
- [Versie 0.82](https://github.com/evcc-io/evcc/releases/tag/0.82)
- [Versie 0.81](https://github.com/evcc-io/evcc/releases/tag/0.81)
