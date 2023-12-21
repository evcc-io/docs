---
title: Phase handling, Templates and Lithuanian
authors: [naltatis]
tags: [release]
hide_table_of_contents: false
---

It's been a few months since the last blog post. So it's time to give you a short summary and an overview of what has happened at evcc in the last eleven releases (v0.81 to v0.91).

## New supported devices

The list of hardware supported by evcc is growing steadily.

### Charging stations 🔌

We have added some wallbox integrations. Since evcc now also supports the very popular [Bender Controller](https://github.com/evcc-io/evcc/pull/3103) we were able to significantly expand the portfolie of supported devices.

Here are the manufacturers that have been added since the beginning of the year: Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity Vestel, Webasto. [(All charging stations)](/docs/devices/chargers)

### Vehicles 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Landrover, Mercedes, Silence S01, Smart. [(All vehicles)](/docs/devices/vehicles)

### Inverters ☀️ 🔋

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(All meters)](/docs/devices/meters)

### Grid meters 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(All meters)](/docs/devices/meters)

### RFID Support 🪪

The wallboxes from Easee and Warp can now also use evcc's [RFID function for vehicle detection](/docs/guides/vehicles#detection-via-rfid--nfc).

## Improved phase handling (1P/3P)

The first version of phase switching for supported wallboxes has been available in evcc since mid last year. We were able to gain some experience and based on this we did [a major redesign](https://github.com/evcc-io/evcc/pull/2613) of the mechanism in February. This makes phase switching much more reliable and also behaves better in situations with unknown or implausible configuration or measurement values.

## Templates and documentation

[In December](/blog/2021/12/12/version-0-73#evcc-configure) we laid the foundations for a simpler initial setup with the CLI setup wizard `evcc configure`.

The configuration syntax of evcc is very flexible and powerful. For example, not yet officially supported devices can often be connected purely by configuration if you know the corresponding Modbus fields and JSON structures of the interface. In the now archived `evcc-io/config` repository we had collected example configurations that you could copy and paste into your own configuration.

Together with the command line wizard we introduced the concept of **templates**. Templates allow us to encapsulate boilerplate and internal device knowledge (protocols, address, data types, field names) in a clean way. The following example for setting up a Solarlog grid meter illustrates the change quite well:

Before:

```yaml
meters:
  - name: my_solarlog
    type: custom
    power:
      source: calc
      add:
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3502
            type: input
            decode: uint32s
          scale: -1
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3518
            type: input
            decode: uint32s
```

After:

```yaml
meters:
  - name: my_solarlog
    type: template
    template: solarlog
    usage: grid
    host: 192.168.0.77
```

The user now only needs to know the hostname or IP address of his Solarlog instance and enter it - protocol and data structure are encapsulated in the `solarlog` template.

Additionally, templates also receive a structured description of all required and optional parameters, as well as default values and localized help texts.

[Since March](https://github.com/evcc-io/docs/pull/92) we have converted the [device documentation at docs.evcc.io](/docs/devices/chargers) to templates. The previous syntaxes still work of course. Since future features like the web-based setup (yes, that will come 😄) are based on `type: template` we recommend that you convert your existing configurations to the new format already now.

## New localization: Lithuanian 🇱🇹

With v0.91 we received a new localization. The evcc UI is now also available in Lithuanian. This is now the fourth language in addition to German, English and Italian. Many thanks [RTTTC](https://github.com/RTTTC) 💚.

Since our language knowledge is relatively limited, we are always grateful for translation contributions. There is currently no documentation for this, but if you are interested, just take a look at [RTTC's Pull Request](https://github.com/evcc-io/evcc/pull/3205).

## What's next?

Some of you may have already seen it. With the next release evcc will get a completely redesigned user interface. This is already available in the current nightly builds and you can find [here](https://github.com/evcc-io/evcc/discussions/3149) and [here](https://github.com/evcc-io/evcc/pull/2889) information about the development process. But more about that in the next blog article.

## Bug fixes

The last versions contained a number of bug fixes and many small improvements. You can find a detailed list via the changelog link below.

## Changelogs

Here you can find more details about the latest changes:

- [Version 0.91](https://github.com/evcc-io/evcc/releases/tag/0.91)
- [Version 0.90](https://github.com/evcc-io/evcc/releases/tag/0.90)
- [Version 0.89](https://github.com/evcc-io/evcc/releases/tag/0.89)
- [Version 0.88](https://github.com/evcc-io/evcc/releases/tag/0.88)
- [Version 0.87](https://github.com/evcc-io/evcc/releases/tag/0.87)
- [Version 0.86](https://github.com/evcc-io/evcc/releases/tag/0.86)
- [Version 0.85](https://github.com/evcc-io/evcc/releases/tag/0.85)
- [Version 0.84](https://github.com/evcc-io/evcc/releases/tag/0.84)
- [Version 0.83](https://github.com/evcc-io/evcc/releases/tag/0.83)
- [Version 0.82](https://github.com/evcc-io/evcc/releases/tag/0.82)
- [Version 0.81](https://github.com/evcc-io/evcc/releases/tag/0.81)
