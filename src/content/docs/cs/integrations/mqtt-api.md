---
title: "MQTT API"
description: "Uvádí všechna MQTT témata, která evcc publikuje o lokalitě, nabíjecích bodech, vozidlech a domácí baterii, a témata pro změnu režimů, limitů nebo plánů nabíjení."
sidebar:
  order: 2
translatedFrom: "57bf7b20695d"
---

[Stav API](/cs/reference/state) se publikuje také přes MQTT.
Každá položka má vlastní téma, přičemž vnořené objekty a seznamy se převádějí na samostatná podtémata (indexování začíná od `1`).

## Témata jen pro čtení

### Lokalita

- `evcc/site/siteTitle`: název lokality
- `evcc/site/currency`: nastavená měna
- `evcc/site/homePower`: aktuální spotřeba domu (W)
- `evcc/site/pvPower`: aktuální solární výroba (W)
- `evcc/site/grid/power`: aktuální výkon sítě (W, kladná hodnota = odběr ze sítě)
- `evcc/site/battery/power`: výkon baterie (W, kladná hodnota = vybíjení)
- `evcc/site/battery/soc`: stav nabití baterie (%)
- `evcc/site/greenShareHome`: podíl vlastní energie na spotřebě domu (0–1)
- `evcc/site/greenShareLoadpoints`: podíl vlastní energie na spotřebě nabíjecích bodů (0–1)
- `evcc/site/tariffGrid`: aktuální tarif dodávky energie
- `evcc/site/tariffFeedIn`: aktuální tarif výkupu energie
- `evcc/site/tariffCo2`: aktuální intenzita CO₂
- `evcc/site/batteryGridChargeActive`: nabíjení baterie ze sítě aktivní (true/false)

### Nabíjecí body

Všechna ID nabíjecích bodů začínají od `1`.

- `evcc/loadpoints`: počet dostupných nabíjecích bodů
- `evcc/loadpoints/<id>/title`: název nabíjecího bodu
- `evcc/loadpoints/<id>/connected`: vozidlo připojeno (true/false)
- `evcc/loadpoints/<id>/charging`: právě nabíjí (true/false)
- `evcc/loadpoints/<id>/enabled`: nabíječka povolena (true/false)
- `evcc/loadpoints/<id>/mode`: režim nabíjení (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: volba vždy nabíjet (`off`, `on`, `once`)
- `evcc/loadpoints/<id>/chargePower`: aktuální nabíjecí výkon (W)
- `evcc/loadpoints/<id>/chargedEnergy`: energie nabitá v relaci (Wh)
- `evcc/loadpoints/<id>/chargeDuration`: doba nabíjení (ns)
- `evcc/loadpoints/<id>/chargeRemainingDuration`: zbývající doba nabíjení (ns)
- `evcc/loadpoints/<id>/chargeRemainingEnergy`: zbývající energie (Wh)
- `evcc/loadpoints/<id>/chargeTotalImport`: celkový stav měřiče nabíjení (Wh)
- `evcc/loadpoints/<id>/vehicleName`: identifikátor vozidla
- `evcc/loadpoints/<id>/vehicleTitle`: zobrazovaný název vozidla
- `evcc/loadpoints/<id>/vehicleSoc`: stav nabití vozidla (%)
- `evcc/loadpoints/<id>/vehicleRange`: dojezd vozidla (km)
- `evcc/loadpoints/<id>/phasesActive`: aktivní fáze
- `evcc/loadpoints/<id>/planActive`: plán nabíjení právě aktivní (true/false)
- `evcc/loadpoints/<id>/sessionEnergy`: energie relace (Wh)
- `evcc/loadpoints/<id>/sessionSolarPercentage`: podíl vlastní energie v relaci (%)
- `evcc/loadpoints/<id>/smartCostActive`: chytré nabíjení podle ceny právě aktivní (true/false)
- `evcc/loadpoints/<id>/effectivePriority`: efektivní priorita

:::caution[Další témata]
Tento seznam není úplný.
Všechna dostupná témata zobrazíte v nástroji [MQTT Explorer](https://mqtt-explorer.com/).
:::

## Zapisovatelná témata

Chcete-li zapisovatelné téma změnit, doplňte na konec tématu `/set` a odešlete novou hodnotu.

```bash
mosquitto_pub -t "evcc/loadpoints/1/phasesConfigured/set" -m "3"
```

Časy se zadávají v UTC ve formátu `yyyy-mm-ddThh:mm:ssZ`, např. `2023-03-05T07:00:00Z` (= 5. března 2023, 8:00 SEČ).

Jako prázdné hodnoty se rozpoznávají tyto řetězce: `nil`, `null`, `none`, `-`.
Pomocí nich resetujete dříve nastavené prahové hodnoty:

```bash
mosquitto_pub -t "evcc/site/batteryGridChargeLimit/set" -m "none"
```

### Lokalita

- `evcc/site/prioritySoc`: prioritní stav nabití baterie
- `evcc/site/bufferSoc`: stav nabití baterie pro vyrovnávání nabíjení
- `evcc/site/bufferStartSoc`: počáteční stav nabití baterie pro vyrovnávání nabíjení
- `evcc/site/residualPower`: zbytkový výkon sítě
- `evcc/site/batteryGridChargeLimit`: cenový strop pro chytré nabíjení
- `evcc/site/batteryDischargeControl`: zapnutí/vypnutí řízení vybíjení baterie (true/false)
- `evcc/site/batteryMode`: externí režim baterie (`normal`, `hold`, `charge`, `holdcharge`, `discharge`), přímo řídí všechny řiditelné baterie, má přednost před ostatními režimy evcc a po 60 s se resetuje
- `evcc/site/smartCostLimit`: cenový strop pro všechny nabíjecí body
- `evcc/site/smartFeedInPriorityLimit`: limit priority exportu do sítě pro všechny nabíjecí body

### Nabíjecí body

- `evcc/loadpoints/<id>/mode`: režim nabíjení (`off`, `smart`, `now`)
- `evcc/loadpoints/<id>/alwaysCharge`: volba vždy nabíjet (`off`, `on`, `once`), jen v režimu Chytrý
- `evcc/loadpoints/<id>/minSoc`: minimální stav nabití
- `evcc/loadpoints/<id>/limitSoc`: limit stavu nabití v %, platí jen pro online vozidla
- `evcc/loadpoints/<id>/limitEnergy`: limit energie v kWh, platí jen pro offline vozidla
- `evcc/loadpoints/<id>/planEnergy`: energie plánu nabíjení (JSON payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/loadpoints/<id>/phasesConfigured`: nastavené fáze
- `evcc/loadpoints/<id>/minCurrent`: hodnota minimálního proudu
- `evcc/loadpoints/<id>/maxCurrent`: hodnota maximálního proudu
- `evcc/loadpoints/<id>/solarShare`: solární podíl minimálního nabíjecího výkonu (0–1)
- `evcc/loadpoints/<id>/enableThreshold`: prahová hodnota
- `evcc/loadpoints/<id>/enableDelay`: hodnota zpoždění (s)
- `evcc/loadpoints/<id>/disableThreshold`: prahová hodnota
- `evcc/loadpoints/<id>/disableDelay`: hodnota zpoždění (s)
- `evcc/loadpoints/<id>/batteryboost`: rychlé dobití zapnuto (1/0)
- `evcc/loadpoints/<id>/batteryBoostLimit`: limit stavu nabití pro rychlé dobití
- `evcc/loadpoints/<id>/priority`: hodnota priority
- `evcc/loadpoints/<id>/smartCostLimit`: cenový strop
- `evcc/loadpoints/<id>/smartFeedInPriorityLimit`: limit priority exportu do sítě
- `evcc/loadpoints/<id>/planStrategy`: strategie plánu nabíjení (JSON)
- `evcc/loadpoints/<id>/vehicle`: přiřazení vozidla podle názvu

### Vozidla

Názvy vozidel najdete v `evcc/vehicles`.

- `evcc/vehicles/<name>/minSoc`: minimální stav nabití v %
- `evcc/vehicles/<name>/limitSoc`: limit stavu nabití v %
- `evcc/vehicles/<name>/planSoc`: stav nabití plánu nabíjení (JSON payload: `{"value": 50, "time": "2023-03-05T07:00:00Z"}`)
- `evcc/vehicles/<name>/planStrategy`: strategie plánu nabíjení (JSON)
