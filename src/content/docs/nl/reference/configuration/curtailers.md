---
title: "curtailers"
description: "Beschrijft wanneer u een opwekbegrenzingsapparaat nodig hebt en hoe u het in evcc.yaml toevoegt om teruglevering op verzoek van de netbeheerder te begrenzen."
sidebar:
  order: 6
translatedFrom: "ca8194269ca0"
---

De lijst _curtailers_ (opwekbegrenzingsapparaten) bevat apparaten die alleen de teruglevering van het zonnepanelensysteem op verzoek van de netbeheerder begrenzen (§ 9 EEG).
De meeste omvormers worden via hun vermelding in [`meters`](/nl/reference/configuration/meters) begrensd en hebben geen apart apparaat nodig.
Een opwekbegrenzingsapparaat is alleen nodig wanneer de omvormer niet via zijn meterconfiguratie kan worden begrensd, voor de SMA Sunny Home Manager 2.0, of voor systemen met meerdere omvormers waarbij de limiet naar de hoofdomvormer moet worden geschreven.
Achtergrond en de lijst met ondersteunde apparaten vindt u onder [Externe limiet](/nl/external-limit#curtailment-devices).

[`site.curtailers`](/nl/reference/configuration/site#curtailers) verwijst naar de opwekbegrenzingsapparaten.
Ze worden pas actief wanneer de integratie [`hems`](/nl/reference/configuration/hems) een limiet voor de teruglevering signaleert.
De limiet wordt als percentage van het geïnstalleerde opwekvermogen gelijkelijk doorgegeven aan alle begrensbare `pv`-meters en opwekbegrenzingsapparaten.

**Voorbeeld**:

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

## Verplichte parameters

### `name`

Unieke naam van het apparaat.
Wordt gebruikt als verwijzing in [`site.curtailers`](/nl/reference/configuration/site#curtailers).

---

### `type`

- `template`: Een van de [ondersteunde apparaten](/nl/external-limit#curtailment-devices). De apparaatpagina toont het volledige configuratieblok.
- `custom`: [Gebruikergedefinieerd apparaat](/nl/user-defined-devices#curtailer) met de plugins `curtail` en `curtailed`.
