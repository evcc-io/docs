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

## Configuration

Configuration is done via the evcc interface:

1. Open **Settings** in evcc
2. Navigate to the **Sunny Home Manager** section
3. Enable the integration and configure advanced settings if needed

### Allow External Control

The **Allow external control** option determines whether the SHM may influence charging power:

- **Enabled**: The SHM can influence charge control and apply its own optimisations
- **Disabled** (recommended): Charging modes are controlled exclusively by evcc

:::warning
In practice, external control by the SHM is usually not helpful as evcc already provides optimised charge control.
We recommend leaving this option disabled.
:::

### Device IDs

Each charge point receives a unique ID in the format:
```
F-AAAAAAAA-BBBBBBBBBBBB-00
```

Where:
- **AAAAAAAA**: The Vendor ID (8 characters, hexadecimal)
- **BBBBBBBBBBBB**: The Device ID (12 characters, hexadecimal)

These IDs are usually generated automatically.
When moving evcc to another computer, you can copy the existing IDs from the `/semp/` endpoint of the old system so the SHM continues to recognise the devices.