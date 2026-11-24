---
date: 2023-01-11
title: "Version 0.111"
description: "Release notes for evcc 0.111 from January 2023 with a smarter charging planner that uses dynamic prices from awattar and Tibber, manual tariffs and CO₂ data."
authors: [naltatis]
tags: [release]
prev: false
next: false
---

![evcc v0.111](./banner-evcc-release-111.webp)

Right on time on 11 January, release 0.111 brings a few new features that we'd like to briefly introduce here.

<!-- excerpt -->

## 🧞‍♂️ New Charging Planner: Using Renewable Grid Power

evcc has had the target charging feature for some time.
It lets you define a target time by which the connected vehicle should reach a certain charge level.
The feature is handy e.g. to have the car charged in time for departure before a longer trip.

![Target charging](./zielladen.webp)

The previous charging strategy was fairly simple: charging starts as late as possible so that the battery reaches the desired level right on time for departure.
This is easy on the battery because it isn't parked at a high charge level for long.

With this release the charging planner gets smarter and takes dynamic energy prices and CO₂ data into account.
Charging is scheduled for time windows with a particularly high share of renewable power in the grid.
This saves money, relieves the grid and reduces the need for fossil fuels.

### 📈 Exchange Prices With awattar and Tibber

We have supported the hourly tariffs of awattar and Tibber for a while.
Until now, though, we only had simple control that enables charging below a previously configured electricity price (`cheap`).

The hourly prices are now also used in charge planning, and the car charges when grid power is particularly cheap.

Configuration for awattar

```yaml
tariffs:
  grid:
    type: template
    template: awattar
    region: de # or at
```

Configuration for Tibber

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "476...963a4" # access token
```

### 📊 Manual Time-of-Use Tariffs

You can now also enter time-of-use tariffs.
Here is an example configuration with cheap energy at night and even cheaper energy at the weekend:

```yaml
tariffs:
  grid:
    type: fixed
    price: 0.294 # EUR/kWh
    zones:
      - days: Mo-Fr
        hours: 2-5
        price: 0.2 # EUR/kWh
      - days: Sa,So
        price: 0.15 # EUR/kWh
```

These prices also feed into the new planning algorithm.

### 🌱 CO₂ Data From GrünStromIndex and Electricity Maps

Even without a dynamic electricity tariff you can charge in a climate-friendly way.
For this we now integrate CO₂ data.
We currently support two sources, but we are open to further suggestions.

[GrünStromIndex](https://gruenstromindex.de) provides regional forecasts of how clean grid power is in Germany.
All you need to enter is your postcode.

```yaml
planner:
  type: template
  template: grünstromindex
  zip: 12349
```

[Electricity Maps](https://app.electricitymaps.com/map) provides forecasts worldwide.
To use it with evcc you need a token and the URL prefix.
You get both with the [free account in the API portal](https://api-portal.electricitymaps.com/).

```yaml
planner:
  type: template
  template: electricitymaps
  uri: https://api-access.electricitymaps.com/2w...1g/
  token: Rp...D2
  zone: DE
```

## Outlook

For one of the next releases we are working on a visual representation of the charging plan.
You'll then also see the time windows calculated by the algorithm and the actual cost or CO₂ savings.

## Other New Features

Besides the usual small improvements and bug fixes, this release also contains a few more new features:

- 🔋🪫 Better support for multiple home batteries [#5598](https://github.com/evcc-io/evcc/pull/5598)
- 🌞 Support for FoxESS [#5721](https://github.com/evcc-io/evcc/pull/5721)
- 🔌 Support for the Tesla Wall Connector 3 [#5341](https://github.com/evcc-io/evcc/pull/5341)
- 🚙 Support for Volvo vehicles [#5681](https://github.com/evcc-io/evcc/pull/5681)
- 🏳️‍🌈 Three new UI languages

**Thanks for your support!**<br />
evcc Core Team<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) and [@naltatis](https://github.com/naltatis)
