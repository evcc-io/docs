---
title: "hems"
description: "Beschrijft hoe u in evcc.yaml externe limieten voor verbruik en teruglevering instelt, bijv. voor § 14a EnWG of § 9 EEG, via relais, FNN-stuurbox of EEBUS."
sidebar:
  order: 8
translatedFrom: "426c429c285d"
---

De sectie `hems` configureert de externe aansturing van het verbruiks- en terugleveringsvermogen.
Dit wordt bijv. gebruikt om aan de Duitse regelingen § 14a EnWG of § 9 EEG te voldoen.
Achtergrond en details over de installatie vindt u onder [Externe limiet](/nl/external-limit).

:::note[Opmerking]
Opwekbegrenzing werkt direct op de begrensbare `pv`-meters en de [opwekbegrenzingsapparaten](/nl/reference/configuration/curtailers) en dimmen werkt direct op de aanstuurbare verbruikers.
Voor geen van beide is een circuitconfiguratie nodig.
Om de verbruikslimiet op laadpunten toe te passen, moeten circuits zijn ingesteld in [Load Balancing](/nl/features/loadmanagement).
Een actieve limiet begrenst dan het hoofdcircuit.
:::

:::note[SMA Sunny Home Manager & SEMP-protocol]
De integratie van de SMA Sunny Home Manager (SHM) is standaard actief en hoeft niet meer onder `hems:` te worden geconfigureerd.
Details en configuratieopties vindt u onder **Configuratie → Sunny Home Manager**.
:::

---

## Verplichte parameters

### `type`

Definieert het type externe aansturing.

**Mogelijke waarden**:

- `relay`: Aansluiting via schakelcontact
- `fnn`: Aansluiting via FNN-stuurbox met meerdere schakelcontacten
- `eebus`: Aansluiting via het EEBUS-protocol

---

## `type: relay`

Aansluiting via een schakelcontact (bijv. stuurbox).
Het contact geeft aan of een vermogensbegrenzing actief is.

```yaml
hems:
  type: relay
  maxPower: 8400 # Total power limit when signal is active (in watts)
  limit:
    source: gpio
    function: read
    pin: 17
```

### Parameters

#### `maxPower`

Totale vermogenslimiet in watt die wordt toegepast wanneer het signaal actief is.

#### `limit`

[Plugin](/nl/reference/plugins)-configuratie voor het uitlezen van het schakelcontact.
Verwachte retourwaarde: `true`/`1` = begrensd, `false`/`0` = normaal.

#### `passthrough`

Optionele [plugin](/nl/reference/plugins)-configuratie om het begrenzingssignaal door te geven aan een extern systeem.

#### `interval`

Uitleesinterval voor het schakelcontact.
Standaard: `10s`.

Meer voorbeelden voor verschillende aansluitingen (GPIO, MQTT, HTTP) vindt u onder [gebruikergedefinieerde integraties](/nl/user-defined-devices#external-limit).

---

## `type: fnn`

Aansluiting via een FNN-stuurbox met afzonderlijke schakelcontacten.
Het dimmen van het verbruik (W4) en de opwekbegrenzing van de teruglevering (W3, S2, S1) worden via afzonderlijke contacten gesignaleerd.

```yaml
hems:
  type: fnn
  maxDimPower: 4200 # Consumption limit while dimmed (in watts)
  maxCurtailPower: 10000 # Installed PV power, base for curtailment steps (in watts)
  w4:
    source: gpio
    function: read
    pin: 17 # Read GPIO pin 17
    # Return value: false = normal, true = active
  w3:
    source: gpio
    function: read
    pin: 27
  s2:
    source: gpio
    function: read
    pin: 22
  s1:
    source: gpio
    function: read
    pin: 23
```

### Parameters

Ten minste één van de signalen `w4` of `w3` moet zijn geconfigureerd.

#### `maxDimPower`

Verbruikslimiet in watt die wordt toegepast zolang het dimsignaal (W4) actief is.
Verplicht wanneer `w4` is geconfigureerd.

#### `maxCurtailPower`

Geïnstalleerd vermogen van de zonnepanelen in watt.
Basiswaarde voor de begrenzingsstappen (W3, S2, S1).

#### `w4`

[Plugin](/nl/reference/plugins)-configuratie voor het uitlezen van het dimsignaal.
Wanneer het actief is, wordt het verbruik begrensd tot `maxDimPower`.

#### `w3`

[Plugin](/nl/reference/plugins)-configuratie voor het uitlezen van het begrenzingssignaal “0%”.
Wanneer het actief is, wordt de teruglevering begrensd tot 0% van `maxCurtailPower`.

#### `s2`

[Plugin](/nl/reference/plugins)-configuratie voor het uitlezen van het begrenzingssignaal “30%”.
Wanneer het actief is, wordt de teruglevering begrensd tot 30% van `maxCurtailPower`.

#### `s1`

[Plugin](/nl/reference/plugins)-configuratie voor het uitlezen van het begrenzingssignaal “60%”.
Wanneer het actief is, wordt de teruglevering begrensd tot 60% van `maxCurtailPower`.

#### `interval`

Uitleesinterval voor de schakelcontacten.
Standaard: `10s`.

Details over de installatie vindt u onder [Externe limiet](/nl/external-limit).

---

## `type: eebus`

Aansluiting via het EEBUS-protocol.
De stuurbox geeft de vermogenslimiet automatisch door.

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF" # SKI of the control box
```

### Parameters

#### `ski`

SKI (Subject Key Identifier) van de stuurbox.
Verplicht voor het koppelen.

#### Geavanceerde limieten

De volgende optionele parameters kunnen voor de EEBUS-communicatie worden ingesteld:

- `contractualConsumptionNominalMax`: Contractueel maximaal verbruiksvermogen (in watt)
- `failsafeConsumptionActivePowerLimit`: Failsafe-limiet voor het verbruiksvermogen (in watt)
- `productionNominalMax`: Geïnstalleerd opwekvermogen (Wp, in watt)
- `failsafeProductionActivePowerLimit`: Failsafe-limiet voor het terugleveringsvermogen (in watt)
- `failsafeDurationMinimum`: Minimale failsafe-duur (bijv. `2h`)

#### `passthrough`

Optionele [plugin](/nl/reference/plugins)-configuratie om het begrenzingssignaal door te geven aan een extern systeem.

#### `interval`

Uitleesinterval.
Standaard: `10s`.

Details over de installatie en het koppelen vindt u onder [Externe limiet](/nl/external-limit#eebus-pairing).
