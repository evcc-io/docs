---
title: "Sunny Home Manager"
description: "Legt uit hoe evcc zijn laadpunten zichtbaar maakt voor een SMA Sunny Home Manager 2.0 in de Sunny Portal en de Home Manager desgewenst het laadvermogen laat beïnvloeden."
sidebar:
  order: 5
translatedFrom: "3e7eabc9fd7e"
---

evcc ondersteunt de koppeling met de [SMA Sunny Home Manager 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager).
Deze koppeling maakt laadpunten zichtbaar in de Sunny Portal en maakt optioneel aansturing door de SHM mogelijk.

## Hoe het werkt

De koppeling is altijd actief.
Zodra evcc draait, stelt het automatisch een SEMP-endpoint (Smart Energy Management Protocol) beschikbaar en kondigt het dit via mDNS aan in het lokale netwerk.
Zo kan de SHM de laadpunten automatisch herkennen en opnemen.

Via de koppeling verschijnen alle laadpunten van evcc als verbruikers in de Sunny Portal, met gedetailleerde verbruiksgegevens.
Daarnaast kan de SHM het laadvermogen beïnvloeden als dat uitdrukkelijk is toegestaan.

Het SEMP-endpoint is bereikbaar op `http://[evcc-IP]:7070/semp/` en toont een XML-overzicht van de geregistreerde apparaten.

## Instellen in de Sunny Home Manager

Nadat evcc is geconfigureerd, worden de laadpunten in de Sunny Portal automatisch als nieuwe apparaten voorgesteld onder **Configuratie → Apparaatoverzicht**.
Daar kunt u ze activeren en de configuratiewizard doorlopen.
Zie de [handleiding van SMA](https://manuals.sma.de/HM-20/en-US/10426801547.html) voor details over het instellen.

## Apparaat-ID’s

Aan de kant van evcc is geen configuratie nodig.
evcc genereert de benodigde apparaat-ID’s automatisch.

Elk laadpunt krijgt een unieke ID in het formaat:

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Daarbij is:

- **AAAAAAAA**: de Vendor ID (8 tekens, hexadecimaal)
- **BBBBBBBBBBBB**: de Device ID (12 tekens, hexadecimaal)

Als u deze automatisch gegenereerde ID’s wilt vervangen (bijv. bij een overstap naar andere evcc-hardware), kunt u de bestaande ID’s uit het `/semp/`-endpoint van het oude systeem kopiëren en aanpassen onder **Configuratie → Sunny Home Manager**.
Zo blijft de SHM de apparaten herkennen.
