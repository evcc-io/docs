---
date: 2022-05-08
title: "Fasehåndtering, templates og litauisk"
description: "Udgivelsesoversigt for evcc 0.81 til 0.91 fra maj 2022 med mange nye opladere og køretøjer, forbedret faseskift, enhedstemplates og en litauisk brugerflade."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "261c638cde95"
---

Der er gået et par måneder siden det sidste blogindlæg. Så det er tid til en kort opsummering og et overblik over, hvad der er sket i evcc i de sidste elleve udgivelser (v0.81 til v0.91).

<!-- excerpt -->

## Nye understøttede enheder

Listen over hardware, som evcc understøtter, vokser støt.

### Opladere 🔌

Vi har tilføjet nogle opladerintegrationer. Da evcc nu også understøtter den meget populære [Bender Controller](https://github.com/evcc-io/evcc/pull/3103), har vi kunnet udvide porteføljen af understøttede enheder betydeligt.

Her er de producenter, der er kommet til siden årets begyndelse: Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity Vestel, Webasto. [(Alle opladere)](/da/chargers)

### Køretøjer 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Landrover, Mercedes, Silence S01, Smart. [(Alle køretøjer)](/da/vehicles)

### Invertere ☀️ 🔋

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Alle målere)](/da/meters)

### Elnetsmålere 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Alle målere)](/da/meters)

### RFID-understøttelse 🪪

Opladerne fra Easee og Warp kan nu også bruge evccs [RFID-funktion til genkendelse af køretøjer](/da/features/vehicle).

## Forbedret fasehåndtering (1P/3P)

Den første version af faseskift for understøttede opladere har været tilgængelig i evcc siden midten af sidste år. Vi har kunnet samle nogle erfaringer, og på baggrund af dem lavede vi i februar [et større redesign](https://github.com/evcc-io/evcc/pull/2613) af mekanismen. Det gør faseskiftet meget mere pålideligt, og det opfører sig også bedre i situationer med ukendte eller uplausible konfigurations- eller måleværdier.

## Templates og dokumentation

[I december](/da/blog/2021/12/12/version-0-73#evcc-configure) lagde vi grundstenen til en enklere første opsætning med CLI-opsætningsguiden `evcc configure`.

Konfigurationssyntaksen i evcc er meget fleksibel og kraftfuld. Enheder, der endnu ikke er officielt understøttet, kan f.eks. ofte tilsluttes alene via konfiguration, hvis man kender de tilsvarende Modbus-felter og JSON-strukturer i grænsefladen. I det nu arkiverede `evcc-io/config`-repository havde vi samlet eksempelkonfigurationer, som man kunne kopiere og indsætte i sin egen konfiguration.

Sammen med kommandolinjeguiden introducerede vi begrebet **templates**. Templates gør det muligt for os at indkapsle standardkode og intern viden om enhederne (protokoller, adresser, datatyper, feltnavne) på en ren måde. Det følgende eksempel med opsætning af en Solarlog-elnetsmåler illustrerer ændringen ret godt:

Før:

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

Efter:

```yaml
meters:
  - name: my_solarlog
    type: template
    template: solarlog
    usage: grid
    host: 192.168.0.77
```

Brugeren skal nu kun kende og indtaste værtsnavnet eller IP-adressen på sin Solarlog-instans. Protokol og datastruktur er indkapslet i `solarlog`-templaten.

Derudover får templates også en struktureret beskrivelse af alle påkrævede og valgfrie parametre samt standardværdier og lokaliserede hjælpetekster.

[Siden marts](https://github.com/evcc-io/docs/pull/92) har vi omlagt [enhedsdokumentationen på docs.evcc.io](/da/chargers) til templates. De tidligere syntakser virker naturligvis stadig. Da fremtidige funktioner som den webbaserede opsætning (ja, den kommer 😄) bygger på `type: template`, anbefaler vi, at du allerede nu omlægger dine eksisterende konfigurationer til det nye format.

## Ny lokalisering: litauisk 🇱🇹

Med v0.91 fik vi en ny lokalisering. evcc-brugerfladen findes nu også på litauisk. Det er nu det fjerde sprog ud over tysk, engelsk og italiensk. Mange tak, [RTTTC](https://github.com/RTTTC) 💚.

Da vores sprogkundskaber er relativt begrænsede, er vi altid taknemmelige for bidrag til oversættelser. Der findes i øjeblikket ingen dokumentation for det, men hvis du er interesseret, så tag bare et kig på [RTTTC's pull request](https://github.com/evcc-io/evcc/pull/3205).

## Hvad sker der nu?

Nogle af jer har måske allerede set det. Med den næste udgivelse får evcc en helt nydesignet brugerflade. Den er allerede tilgængelig i de aktuelle nightly builds, og du kan finde information om udviklingsprocessen [her](https://github.com/evcc-io/evcc/discussions/3149) og [her](https://github.com/evcc-io/evcc/pull/2889). Men mere om det i det næste blogindlæg.

## Fejlrettelser

De seneste versioner indeholdt en række fejlrettelser og mange små forbedringer. Du finder en detaljeret liste via changelog-linket nedenfor.

## Changelogs

Her finder du flere detaljer om de seneste ændringer:

- [Version 0.91](https://github.com/evcc-io/evcc/releases/tag/0.91)
- [Version 0.90](https://github.com/evcc-io/evcc/releases/tag/0.90)
- [Version 0.89](https://github.com/evcc-io/evcc/releases/tag/0.89)
- [Version 0.88](https://github.com/evcc-io/evcc/releases/tag/0.88)
- [Version 0.87](https://github.com/evcc-io/evcc/releases/tag/0.87)
- [Version 0.86](https://github.com/evcc-io/evcc/releases/tag/0.86)
- [Version 0.85](https://github.com/evcc-io/evcc/releases/tag/0.85)
- [Version 0.84](https://github.com/evcc-io/evcc/releases/tag/0.84)
- [Version 0.83](https://github.com/evcc-io/evcc/releases/tag/0.83)
- [Version 0.82](https://github.com/evcc-io/evcc/releases/tag/0.82)
- [Version 0.81](https://github.com/evcc-io/evcc/releases/tag/0.81)
