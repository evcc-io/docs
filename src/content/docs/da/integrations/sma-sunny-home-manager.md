---
title: "Sunny Home Manager"
description: "Forklarer, hvordan evcc gør sine ladepunkter synlige for en SMA Sunny Home Manager 2.0 i Sunny Portal og eventuelt giver den mulighed for at påvirke ladeeffekten."
sidebar:
  order: 5
translatedFrom: "3e7eabc9fd7e"
---

evcc understøtter integration med [SMA Sunny Home Manager 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager).
Integrationen gør ladepunkterne synlige i Sunny Portal og giver eventuelt SHM mulighed for at styre dem.

## Sådan virker det

Integrationen er altid aktiv.
Så snart evcc kører, stiller den automatisk et SEMP-endpoint (Smart Energy Management Protocol) til rådighed og annoncerer det via mDNS på det lokale netværk.
Det gør det muligt for SHM at finde og integrere ladepunkterne automatisk.

Gennem integrationen vises alle ladepunkter i evcc som forbrugsenheder i Sunny Portal med detaljerede forbrugsdata.
Derudover kan SHM påvirke ladeeffekten, hvis det udtrykkeligt er tilladt.

SEMP-endpointet kan nås på `http://[evcc-IP]:7070/semp/` og viser en XML-oversigt over de registrerede enheder.

## Opsætning i Sunny Home Manager

Når evcc er konfigureret, foreslås ladepunkterne automatisk som nye enheder i Sunny Portal under **Konfiguration > Enhedsoversigt**.
Der kan du aktivere dem og følge konfigurationsguiden.
Se [SMA-manualen](https://manuals.sma.de/HM-20/en-US/10426801547.html) for detaljer om opsætningen.

## Enheds-id'er

I evcc kræves der ingen konfiguration.
evcc genererer automatisk de nødvendige enheds-id'er.

Hvert ladepunkt får et entydigt id i formatet:

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Her står:

- **AAAAAAAA**: producent-id'et (8 tegn, hexadecimalt)
- **BBBBBBBBBBBB**: enheds-id'et (12 tegn, hexadecimalt)

Hvis du vil tilsidesætte denne automatik (f.eks. når du flytter evcc til ny hardware), kan du kopiere de eksisterende id'er fra `/semp/`-endpointet på det gamle system og tilpasse dem under **Indstillinger > Sunny Home Manager**.
Så genkender SHM fortsat enhederne.
