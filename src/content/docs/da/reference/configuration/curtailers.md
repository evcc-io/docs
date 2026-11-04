---
title: "curtailers"
description: "Sådan tilføjer du enheder til effektbegrænsning i evcc.yaml, der begrænser solstrømmens eksport til elnettet på netselskabets anmodning, og hvornår de er nødvendige."
sidebar:
  order: 6
translatedFrom: "ca8194269ca0"
---

_Curtailers_ (enheder til effektbegrænsning) er en liste over enheder, der udelukkende begrænser solcelleanlæggets eksport til elnettet på netselskabets anmodning (§ 9 EEG).
De fleste invertere effektbegrænses via deres post under [`meters`](/da/reference/configuration/meters) og har ikke brug for en separat enhed.
En enhed til effektbegrænsning er kun nødvendig, når inverteren ikke kan effektbegrænses via sin målerkonfiguration, ved SMA Sunny Home Manager 2.0 og ved anlæg med flere invertere, hvor grænsen skal skrives til den ledende inverter.
Baggrund og listen over understøttede enheder finder du under [Ekstern grænse](/da/external-limit#curtailment-devices).

Enhederne til effektbegrænsning angives i [`site.curtailers`](/da/reference/configuration/site#curtailers).
De bliver først aktive, når [`hems`](/da/reference/configuration/hems)-integrationen signalerer en grænse for eksport til elnettet.
Grænsen overføres på samme måde til alle begrænsbare `pv`-målere og enheder til effektbegrænsning som en procentdel af den installerede generatoreffekt.

**Eksempel**:

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

## Påkrævede parametre

### `name`

Enhedens entydige navn.
Bruges som reference i [`site.curtailers`](/da/reference/configuration/site#curtailers).

---

### `type`

- `template`: En af de [understøttede enheder](/da/external-limit#curtailment-devices). Enhedens side viser den komplette konfigurationsblok.
- `custom`: [Brugerdefineret enhed](/da/user-defined-devices#curtailer) med pluginsene `curtail` og `curtailed`.
