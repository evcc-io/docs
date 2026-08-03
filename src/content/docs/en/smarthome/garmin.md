---
title: "Garmin"
---

The [evccg](https://github.com/METIQ-Solutions/evcc-garmin) app by [TheNinth7](https://github.com/TheNinth7) shows live data from your evcc instance on [Garmin](https://www.garmin.com) smartwatches.
It is a community project and not part of evcc.

## Features

The app offers two views:

- **Glance**: a quick overview of your home battery and connected vehicles with their state of charge and charging status
- **Widget**: detailed views with current power flows, loadpoint details, solar forecast, grid prices, and solar energy statistics

Multiple evcc instances (sites) are supported.

## Setup

1. Install the app from the [Garmin Connect IQ Store](https://apps.garmin.com/apps/2bc2ba9d-b117-4cdf-8fa7-078c1ac90ab0).
2. Enter the URL of your evcc instance in the app settings via the Garmin Connect app on your phone.

If your watch is paired with an iPhone, the app can access your evcc instance directly via HTTP on the local network.
With an Android phone, the connection requires HTTPS with a valid certificate.
The [user manual](https://evccg.metiq.com) describes the options in detail and covers setup, supported devices, and troubleshooting.
