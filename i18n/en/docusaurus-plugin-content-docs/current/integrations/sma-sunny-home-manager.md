---
sidebar_position: 5
---

# Sunny Home Manager

evcc supports integration with the [SMA Sunny Home Manager 2.0 (SHM)](https://www.sma.de/produkte/energiemanagement/sunny-home-manager).
This integration makes charge points visible in the Sunny Portal and optionally allows control by the SHM.

## How It Works

The integration is permanently active.
Once evcc is running, it automatically provides a SEMP endpoint (Smart Energy Management Protocol) and announces it via mDNS on the local network.
This allows the SHM to automatically detect and integrate the charge points.

Through the integration, all evcc charge points appear as consumers in the Sunny Portal with detailed consumption data.
Additionally, the SHM can influence charging power if explicitly allowed.

The SEMP endpoint is accessible at `http://[evcc-IP]:7070/semp/` and displays an XML overview of registered devices.

## Setup in Sunny Home Manager

After configuring evcc, the charge points are automatically suggested as new devices in the Sunny Portal under **Configuration > Device overview**.
There you can activate them and follow the configuration wizard.
See the [SMA manual](https://manuals.sma.de/HM-20/en-US/10426801547.html) for setup details.

## Device IDs

No configuration is required on the evcc side.
evcc automatically generates the necessary device IDs.

Each charge point receives a unique ID in the format:

```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Where:

- **AAAAAAAA**: The Vendor ID (8 characters, hexadecimal)
- **BBBBBBBBBBBB**: The Device ID (12 characters, hexadecimal)

If you want to override this automatism (e.g. when moving to different evcc hardware), you can copy the existing IDs from the `/semp/` endpoint of the old system and adjust them under **Settings > Sunny Home Manager**.
This ensures the SHM continues to recognise the devices.
