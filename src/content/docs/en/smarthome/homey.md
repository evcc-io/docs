---
title: "Homey"
---

[Homey](https://homey.app) is a smart home hub that connects devices from many manufacturers and automates them via flows.
The [evcc app for Homey](https://homey.app/en-us/app/com.evcc.io/) connects Homey to your local evcc instance.
It is a community project by [rdvnit](https://github.com/rdvnit) and not part of evcc.

## Features

The app provides three device types:

- **Charging point** with charge mode, charge limit, charging power, session energy, vehicle battery level and range, and connection and charging status
- **Site** with solar production, grid power, and home consumption
- **Home battery** with battery power, battery level, and battery control settings

Flow cards let you set the charge mode, charge limit, and minimum and maximum charging current.
Flow conditions react to charge mode, charging state, and connection state.

The app polls your evcc instance on the local network and does not depend on any cloud service.

## Setup

1. Install the **evcc** app from the [Homey App Store](https://homey.app/en-us/app/com.evcc.io/).
2. Add a device and choose **Charging point**, **evcc site**, or **Home battery**.
3. Enter the URL of your evcc instance (e.g. `http://192.168.1.50:7070`) and the password, if configured.

Details and support are available in the [GitHub repository](https://github.com/rdvnit/com.evcc.io).
