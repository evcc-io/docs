---
title: "MQTT-API"
description: "Toont alle MQTT-topics die evcc over uw locatie, laadpunten, voertuigen en thuisbatterij publiceert, en de topics waarmee u modi, limieten of laadplannen wijzigt."
sidebar:
  order: 2
translatedFrom: "2c690ff491d7"
---

De [API-status](/nl/reference/state) wordt ook via MQTT gepubliceerd.
Elk veld wordt een eigen topic, en geneste objecten en lijsten worden omgezet in afzonderlijke subtopics (de index begint bij `1`).

## Alleen-lezen-topics

### Locatie

- `evcc/site/siteTitle`: titel van de locatie
- `evcc/site/currency`: ingestelde valuta
- `evcc/site/homePower`: huidig verbruik in huis (W)
- `evcc/site/pvPower`: huidige productie van zonne-energie (W)
- `evcc/site/grid/power`: huidig netvermogen (W, positief = netafname)
- `evcc/site/battery/power`: batterijvermogen (W, positief = ontlading)
- `evcc/site/battery/soc`: laadniveau van de batterij (%)
- `evcc/site/greenShareHome`: aandeel zelf opgewekte energie in het verbruik in huis (0–1)
- `evcc/site/greenShareLoadpoints`: aandeel zelf opgewekte energie in het verbruik van de laadpunten (0–1)
- `evcc/site/tariffGrid`: huidig netafnametarief
- `evcc/site/tariffFeedIn`: huidige terugleververgoeding
- `evcc/site/tariffCo2`: huidige CO₂-intensiteit
- `evcc/site/batteryGridChargeActive`: batterij wordt met netstroom geladen (true/false)

### Laadpunten

Alle laadpunt-ID’s beginnen bij `1`.

- `evcc/loadpoints`: aantal beschikbare laadpunten
- `evcc/loadpoints/<id>/title`: titel van het laadpunt
- `evcc/loadpoints/<id>/connected`: voertuig aangesloten (true/false)
- `evcc/loadpoints/<id>/charging`: laadt momenteel (true/false)
- `evcc/loadpoints/<id>/enabled`: laadpunt ingeschakeld (true/false)
- `evcc/loadpoints/<id>/mode`: laadmodus (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: optie altijd laden (`off`, `on`, `once`)
- `evcc/loadpoints/<id>/chargePower`: huidig laadvermogen (W)
- `evcc/loadpoints/<id>/chargedEnergy`: geladen energie in de sessie (Wh)
- `evcc/loadpoints/<id>/chargeDuration`: laadduur (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration`: resterende laadduur (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy`: resterende energie (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport`: meterstand van de laadmeter (Wh)
- `evcc/loadpoints/<id>/vehicleName`: identificatie van het voertuig
- `evcc/loadpoints/<id>/vehicleTitle`: weergavenaam van het voertuig
- `evcc/loadpoints/<id>/vehicleSoc`: laadniveau van het voertuig (%)
- `evcc/loadpoints/<id>/vehicleRange`: actieradius van het voertuig (km)
- `evcc/loadpoints/<id>/phasesActive`: actieve fasen
- `evcc/loadpoints/<id>/planActive`: laadplan momenteel actief (true/false)
- `evcc/loadpoints/<id>/sessionEnergy`: energie van de sessie (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage`: aandeel zelf opgewekte energie in de sessie (%)
- `evcc/loadpoints/<id>/smartCostActive`: slim laden op basis van kosten momenteel actief (true/false)
- `evcc/loadpoints/<id>/effectivePriority`: effectieve prioriteit

:::caution[Meer topics]
Deze lijst is onvolledig.
Gebruik [MQTT Explorer](https://mqtt-explorer.com/) voor alle beschikbare topics.
:::

## Schrijfbare topics

Om een schrijfbaar topic te wijzigen, voegt u `/set` aan het topic toe en stuurt u de nieuwe waarde.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Tijden worden in UTC opgegeven, in het formaat `yyyy-mm-ddThh:mm:ssZ`, bijv. `2023-03-05T07:00:00Z` (= 5 maart 2023, 08:00 CET).

De volgende strings worden als lege waarde herkend: `nil`, `null`, `none`, `-`.
Gebruik deze om eerder ingestelde drempelwaarden te wissen:

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Locatie

- `evcc/site/prioritySoc`: laadniveau voor batterijprioriteit
- `evcc/site/bufferSoc`: laadniveau voor de batterijbuffer
- `evcc/site/bufferStartSoc`: laadniveau waarop de batterijbuffer start
- `evcc/site/residualPower`: restvermogen op het net
- `evcc/site/batteryGridChargeLimit`: prijslimiet voor het laden van de thuisbatterij met netstroom
- `evcc/site/batteryDischargeControl`: ontladingsregeling van de batterij in- of uitschakelen (true/false)
- `evcc/site/batteryMode`: externe batterijmodus (`normal`, `hold`, `charge`, `holdcharge`, `discharge`), stuurt alle regelbare batterijen direct aan, gaat voor op andere evcc-modi en wordt na 60 s gereset
- `evcc/site/smartCostLimit`: prijslimiet voor slim laden voor alle laadpunten
- `evcc/site/smartFeedInPriorityLimit`: limiet voor terugleverprioriteit voor alle laadpunten

### Laadpunten

- `evcc/loadpoints/<id>/mode`: laadmodus (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: optie altijd laden (`off`, `on`, `once`), alleen in de modus Slim
- `evcc/loadpoints/<id>/minSoc`: minimaal laadniveau
- `evcc/loadpoints/<id>/limitSoc`: laadlimiet in %, alleen van toepassing op online voertuigen
- `evcc/loadpoints/<id>/limitEnergy`: energielimiet in kWh, alleen van toepassing op offline voertuigen
- `evcc/loadpoints/<id>/planEnergy`: energie van het laadplan (JSON-payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured`: ingestelde fasen
- `evcc/loadpoints/<id>/minCurrent`: minimale laadstroom
- `evcc/loadpoints/<id>/maxCurrent`: maximale laadstroom
- `evcc/loadpoints/<id>/solarShare`: aandeel zonne-energie in het minimale laadvermogen (0–1)
- `evcc/loadpoints/<id>/enableThreshold`: inschakeldrempel
- `evcc/loadpoints/<id>/enableDelay`: inschakelvertraging (s)
- `evcc/loadpoints/<id>/disableThreshold`: uitschakeldrempel
- `evcc/loadpoints/<id>/disableDelay`: uitschakelvertraging (s)
- `evcc/loadpoints/<id>/batteryboost`: batterijboost ingeschakeld (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit`: laadniveaulimiet voor batterijboost
- `evcc/loadpoints/<id>/priority`: prioriteitswaarde
- `evcc/loadpoints/<id>/smartCostLimit`: prijslimiet voor slim laden
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit`: limiet voor terugleverprioriteit
- `evcc/loadpoints/<id>/planStrategy`: strategie van het laadplan (JSON)
- `evcc/loadpoints/<id>/vehicle`: voertuig kiezen aan de hand van de naam

### Voertuigen

Voertuignamen vindt u onder `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc`: minimaal laadniveau in %
- `evcc/vehicles/<name>/limitSoc`: laadlimiet in %
- `evcc/vehicles/<name>/planSoc`: laadniveau van het laadplan (JSON-payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy`: strategie van het laadplan (JSON)
