---
title: "curtailers"
description: "Popisuje, jak v evcc.yaml přidat zařízení omezující výkon, která na žádost provozovatele sítě omezí export ze soláru do sítě, a kdy je vůbec potřebujete."
sidebar:
  order: 6
translatedFrom: "ca8194269ca0"
---

Sekce _curtailers_ obsahuje seznam zařízení omezujících výkon, která pouze na žádost provozovatele sítě omezují export fotovoltaické elektrárny do sítě (§ 9 EEG).
Většina střídačů se omezuje přes svůj záznam v [`meters`](/cs/reference/configuration/meters) a samostatné zařízení nepotřebuje.
Zařízení omezující výkon je potřeba jen ve třech případech: když střídač nelze omezit přes konfiguraci měřiče, pro SMA Sunny Home Manager 2.0 a u systémů s několika střídači, kde se limit musí zapsat do řídicího střídače.
Souvislosti a seznam podporovaných zařízení najdete na stránce [Externí limit](/cs/external-limit#curtailment-devices).

Na zařízení omezující výkon se odkazuje z [`site.curtailers`](/cs/reference/configuration/site#curtailers).
Aktivní jsou pouze tehdy, když integrace [`hems`](/cs/reference/configuration/hems) signalizuje limit exportu do sítě.
Limit se předává jako procento instalovaného výkonu zdroje, a to stejně všem omezitelným měřičům `pv` i zařízením omezujícím výkon.

**Příklad**:

```yaml
curtailers:
  - name: my_curtailer
    type: template
    template: solaredge
    modbus: tcpip
    host: 192.168.0.10
    port: 1502
    id: 1
    productionnominalmax: 15000 # installed generator power of the whole installation (Wp)

site:
  curtailers:
    - my_curtailer
```

---

## Povinné parametry

### `name`

Jedinečný název zařízení.
Používá se jako odkaz v [`site.curtailers`](/cs/reference/configuration/site#curtailers).

---

### `type`

- `template`: Jedno z [podporovaných zařízení](/cs/external-limit#curtailment-devices). Stránka zařízení ukazuje kompletní konfigurační blok.
- `custom`: [Zařízení definované uživatelem](/cs/user-defined-devices#curtailer) s pluginy `curtail` a `curtailed`.
