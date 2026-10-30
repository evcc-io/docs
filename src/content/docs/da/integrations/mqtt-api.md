---
title: "MQTT-API"
description: "Her ser du alle MQTT-topics, evcc udgiver om anlæg, ladepunkter, køretøjer og hjemmebatteri, og dem, du kan skrive til til at ændre tilstande, grænser eller ladeplaner."
sidebar:
  order: 2
translatedFrom: "2c690ff491d7"
---

[API-statussen](/da/reference/state) udgives også via MQTT.
Hvert felt bliver sit eget topic, og indlejrede objekter og lister omdannes til individuelle undertopics (indekset starter ved `1`).

## Skrivebeskyttede topics

### Anlæg

- `evcc/site/siteTitle`: anlæggets titel
- `evcc/site/currency`: konfigureret valuta
- `evcc/site/homePower`: aktuelt husforbrug (W)
- `evcc/site/pvPower`: aktuel solproduktion (W)
- `evcc/site/grid/power`: aktuel effekt ved elnettet (W, positiv = import)
- `evcc/site/battery/power`: batterieffekt (W, positiv = afladning)
- `evcc/site/battery/soc`: batteriets opladningsniveau (%)
- `evcc/site/greenShareHome`: andel af egenproduceret energi i husforbruget (0–1)
- `evcc/site/greenShareLoadpoints`: andel af egenproduceret energi i ladepunkternes forbrug (0–1)
- `evcc/site/tariffGrid`: aktuel importtarif
- `evcc/site/tariffFeedIn`: aktuel eksporttarif
- `evcc/site/tariffCo2`: aktuel CO₂-intensitet
- `evcc/site/batteryGridChargeActive`: batteriopladning fra elnettet aktiv (true/false)

### Ladepunkter

Alle ladepunkt-id'er starter ved `1`.

- `evcc/loadpoints`: antal tilgængelige ladepunkter
- `evcc/loadpoints/<id>/title`: ladepunktets titel
- `evcc/loadpoints/<id>/connected`: køretøj tilsluttet (true/false)
- `evcc/loadpoints/<id>/charging`: lader i øjeblikket (true/false)
- `evcc/loadpoints/<id>/enabled`: ladepunkt aktiveret (true/false)
- `evcc/loadpoints/<id>/mode`: ladetilstand (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: indstillingen Oplad altid (`off`, `on`, `once`)
- `evcc/loadpoints/<id>/chargePower`: aktuel ladeeffekt (W)
- `evcc/loadpoints/<id>/chargedEnergy`: opladet energi i sessionen (Wh)
- `evcc/loadpoints/<id>/chargeDuration`: ladevarighed (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration`: resterende ladevarighed (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy`: resterende energi (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport`: lademålerens samlede målerstand (Wh)
- `evcc/loadpoints/<id>/vehicleName`: køretøjets identifikator
- `evcc/loadpoints/<id>/vehicleTitle`: køretøjets visningsnavn
- `evcc/loadpoints/<id>/vehicleSoc`: køretøjets opladningsniveau (%)
- `evcc/loadpoints/<id>/vehicleRange`: køretøjets rækkevidde (km)
- `evcc/loadpoints/<id>/phasesActive`: aktive faser
- `evcc/loadpoints/<id>/planActive`: ladeplan aktiv i øjeblikket (true/false)
- `evcc/loadpoints/<id>/sessionEnergy`: sessionens energi (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage`: andel af egenproduceret energi i sessionen (%)
- `evcc/loadpoints/<id>/smartCostActive`: smart opladning fra elnettet aktiv i øjeblikket (true/false)
- `evcc/loadpoints/<id>/effectivePriority`: effektiv prioritet

:::caution[Flere topics]
Denne liste er ikke komplet.
Brug [MQTT Explorer](https://mqtt-explorer.com/) til at se alle tilgængelige topics.
:::

## Skrivbare topics

For at ændre skrivbare topics tilføjer du `/set` til topic'et og sender den nye værdi.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Tidspunkter angives i UTC i formatet `yyyy-mm-ddThh:mm:ssZ`, f.eks. `2023-03-05T07:00:00Z` (= 5. marts 2023, kl. 8.00 CET).

Følgende strenge genkendes som tomme værdier: `nil`, `null`, `none`, `-`.
Brug dem til at nulstille tidligere indstillede tærskler:

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Anlæg

- `evcc/site/prioritySoc`: opladningsniveau for batteriprioritet
- `evcc/site/bufferSoc`: opladningsniveau for batteribuffer
- `evcc/site/bufferStartSoc`: opladningsniveau for start af batteribuffer
- `evcc/site/residualPower`: resteffekt mod elnettet
- `evcc/site/batteryGridChargeLimit`: prisgrænse for batteriopladning fra elnettet
- `evcc/site/batteryDischargeControl`: aktiver/deaktiver styring af batteriafladning (true/false)
- `evcc/site/batteryMode`: ekstern batteritilstand (`normal`, `hold`, `charge`, `holdcharge`, `discharge`), styrer alle styrbare batterier direkte, tilsidesætter andre evcc-tilstande og nulstilles efter 60 s
- `evcc/site/smartCostLimit`: prisgrænse for smart opladning fra elnettet for alle ladepunkter
- `evcc/site/smartFeedInPriorityLimit`: grænse for eksportprioritet for alle ladepunkter

### Ladepunkter

- `evcc/loadpoints/<id>/mode`: ladetilstand (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: indstillingen Oplad altid (`off`, `on`, `once`), kun i tilstanden Smart
- `evcc/loadpoints/<id>/minSoc`: minimumsopladning
- `evcc/loadpoints/<id>/limitSoc`: grænse for opladningsniveau i %, gælder kun for online-køretøjer
- `evcc/loadpoints/<id>/limitEnergy`: energigrænse i kWh, gælder kun for offline-køretøjer
- `evcc/loadpoints/<id>/planEnergy`: ladeplanens energi (JSON-payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured`: konfigurerede faser
- `evcc/loadpoints/<id>/minCurrent`: minimal ladestrøm
- `evcc/loadpoints/<id>/maxCurrent`: maksimal ladestrøm
- `evcc/loadpoints/<id>/solarShare`: solandel af minimumsladeeffekten (0–1)
- `evcc/loadpoints/<id>/enableThreshold`: tærskel for aktivering
- `evcc/loadpoints/<id>/enableDelay`: forsinkelse for aktivering (s)
- `evcc/loadpoints/<id>/disableThreshold`: tærskel for deaktivering
- `evcc/loadpoints/<id>/disableDelay`: forsinkelse for deaktivering (s)
- `evcc/loadpoints/<id>/batteryboost`: batteriboost aktiveret (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit`: grænse for opladningsniveau ved batteriboost
- `evcc/loadpoints/<id>/priority`: prioritetsværdi
- `evcc/loadpoints/<id>/smartCostLimit`: prisgrænse for smart opladning fra elnettet
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit`: grænse for eksportprioritet
- `evcc/loadpoints/<id>/planStrategy`: ladeplanens strategi (JSON)
- `evcc/loadpoints/<id>/vehicle`: vælg køretøj efter navn

### Køretøjer

Køretøjernes navne finder du under `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc`: minimumsopladning i %
- `evcc/vehicles/<name>/limitSoc`: grænse for opladningsniveau i %
- `evcc/vehicles/<name>/planSoc`: ladeplanens opladningsniveau (JSON-payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy`: ladeplanens strategi (JSON)
