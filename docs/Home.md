---
sidebar_position: 1
---

## Introduction

EVCC is an extensible EV Charge Controller with PV integration. It allows you to to charge your car with optimal usage of your self generated power.

Normally to get this feature, the Wallbox needs to be compatible with a smart home manager in your house. Using EVCC you can make this work with a variety of wallboxes and a variety of power meters and PV inverters that are not designed to work together from their manufacturers. In addition it provides an interface to allow other device not directly supported to be included.

EVCC runs on a computer connected to your local network and with access to the supported devices. How such a device needs to be accessible depends on the supported device or the how the plugin interface is used to provide the according data.

## Getting Started

- Install EVCC either [manually](installation/manual) or via [Docker](installation/docker)
- [Create and edit the EVCC configuration](configuration/basics) to tell EVCC about your setup and how to access it. Use a [sample configuration](configuration/basics) of EVCC users for a starting point.
- Open a web browser and access EVCC to start charging

## Requirements

To run EVCC you must have:

- a supported [wallbox](configuration/chargers)
- a supported [power meter](configuration/meters) as a Grid meter, or a supported PV inverter, or supported power meter that measures the generated energy by the PV installation.
- optionally: a supported Battery inverter
- a supported computer running EVCC

Optional:

- a supported [Vehicle](configuration/vehicles) to get the cars battery current state of charge

This is how you can talk to us:

- Support, Configuration, Device question: https://github.com/andig/evcc/discussions
- Chat about development related topics: [Slack](https://join.slack.com/t/evccgroup/shared_invite/zt-fw52e6lt-tdazCp1LPdPlYuKz3PvTAw).