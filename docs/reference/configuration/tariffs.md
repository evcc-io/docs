---
sidebar_position: 8
---

# Tariffs

EVCC unterstützt die Verwendung von flexiblen Stromtarifen von [Awattar](https://www.awattar.de) oder [Tibber](https://tibber.com). Die Konfiguration erlaubt es "günstige" Preise zu definieren, bei welchen das Laden vom Netz mit der maximal möglichen Leistung aktiviert wird, selbst wenn nicht genug PV Leistung zur Verfügung steht:

```yaml
tariffs:
  grid:
    # either
    type: tibber
    cheap: 20 # ct/kWh
    token: "476c477d8a039529478ebd690d35ddd80e3308ffc49b59c65b142321aee963a4" # access token
    homeid: "cc83e83e-8cbf-4595-9bf7-c3cf192f7d9c" # optional if multiple homes associated to account

    # or
    type: awattar
    cheap: 20 # ct/kWh
    region: de # optional, choose at for Austria
```
