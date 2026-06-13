---
title: "hems"
sidebar:
  order: 7
---

Unter `hems` wird die externe Steuerung von Verbrauchsleistung und Einspeisung konfiguriert.
Dies wird z. B. für die Umsetzung von §14a EnWG oder §9 EEG benötigt.
Details zu Hintergrund und Einrichtung findest du unter [Externe Steuerung](../../features/external-control).

:::note[Hinweis]
Abregelung und das Dimmen steuerbarer Verbraucher wirken direkt am Gerät, dafür sind keine Stromkreise erforderlich.
Damit das Verbrauchslimit Ladepunkte begrenzt, konfiguriere [Lastmanagement](../../features/loadmanagement)-Stromkreise.
Ein aktives Limit begrenzt dann den obersten Stromkreis.
:::

:::note[SMA Sunny Home Manager & SEMP-Protokoll]
Die Integration mit dem SMA Sunny Home Manager (SHM) ist standardmäßig aktiv und muss nicht mehr unter `hems:` konfiguriert werden.
Details und Konfigurationsmöglichkeiten findest du unter **Konfiguration > Sunny Home Manager**.
:::

---

## Erforderliche Parameter

### `type`

Definiert den Typ der externen Steuerung.

**Mögliche Werte**:

- `relay`: Anbindung über Schaltkontakt
- `fnn`: Anbindung über FNN-Steuerbox mit mehreren Schaltkontakten
- `eebus`: Anbindung über das EEBus-Protokoll

---

## `type: relay`

Anbindung über einen Schaltkontakt (z. B. Steuerbox).
Der Kontakt signalisiert, ob eine Leistungsbegrenzung aktiv ist.

```yaml
hems:
  type: relay
  maxPower: 8400 # Gesamtleistungslimit bei aktivem Signal (in Watt)
  limit:
    source: gpio
    function: read
    pin: 17
```

### Parameter

#### `maxPower`

Gesamtleistungslimit in Watt, das bei aktivem Signal gesetzt wird.

#### `limit`

[Plugin](/de/reference/plugins)-Konfiguration zum Auslesen des Schaltkontakts.
Erwarteter Rückgabewert: `true`/`1` = begrenzt, `false`/`0` = normal.

#### `passthrough`

Optionale [Plugin](/de/reference/plugins)-Konfiguration zum Durchreichen des Begrenzungssignals an ein externes System.

#### `interval`

Abfrageintervall für den Schaltkontakt.
Standard: `10s`.

Weitere Beispiele für verschiedene Anbindungen (GPIO, MQTT, HTTP) findest du unter [Externe Steuerung](../../features/external-control#konfiguration-via-relais).

---

## `type: fnn`

Anbindung über eine FNN-Steuerbox mit separaten Schaltkontakten.
Dimmen des Verbrauchs (W4) und Abregelung der Einspeisung (W3, S2, S1) werden über einzelne Kontakte signalisiert.

```yaml
hems:
  type: fnn
  maxDimPower: 4200 # Verbrauchslimit während Dimmung (in Watt)
  maxCurtailPower: 10000 # Installierte PV-Leistung, Basis für Abregelungsstufen (in Watt)
  w4:
    source: gpio
    function: read
    pin: 17 # GPIO-Pin 17 auslesen
    # Rückgabewert: false = normal, true = aktiv
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

### Parameter

Mindestens eines der Signale `w4` oder `w3` muss konfiguriert sein.

#### `maxDimPower`

Verbrauchslimit in Watt, das gesetzt wird, solange das Dimm-Signal (W4) aktiv ist.
Erforderlich, wenn `w4` konfiguriert ist.

#### `maxCurtailPower`

Installierte PV-Leistung in Watt.
Basiswert für die Abregelungsstufen (W3, S2, S1).

#### `w4`

[Plugin](/de/reference/plugins)-Konfiguration zum Auslesen des Dimm-Signals.
Bei aktivem Signal wird der Verbrauch auf `maxDimPower` begrenzt.

#### `w3`

[Plugin](/de/reference/plugins)-Konfiguration zum Auslesen des Abregelungssignals "0 %".
Bei aktivem Signal wird die Einspeisung auf 0 % von `maxCurtailPower` begrenzt.

#### `s2`

[Plugin](/de/reference/plugins)-Konfiguration zum Auslesen des Abregelungssignals "30 %".
Bei aktivem Signal wird die Einspeisung auf 30 % von `maxCurtailPower` begrenzt.

#### `s1`

[Plugin](/de/reference/plugins)-Konfiguration zum Auslesen des Abregelungssignals "60 %".
Bei aktivem Signal wird die Einspeisung auf 60 % von `maxCurtailPower` begrenzt.

#### `interval`

Abfrageintervall für die Schaltkontakte.
Standard: `10s`.

Details zur Einrichtung findest du unter [Externe Steuerung](../../features/external-control#konfiguration-via-fnn-steuerbox).

---

## `type: eebus`

Anbindung über das EEBus-Protokoll.
Die Steuerbox übermittelt das Leistungslimit automatisch.

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF" # SKI der Steuerbox
```

### Parameter

#### `ski`

SKI (Subject Key Identifier) der Steuerbox.
Wird für das Pairing benötigt.

#### Erweiterte Limits

Folgende optionale Parameter können für die EEBus-Kommunikation gesetzt werden:

- `contractualConsumptionNominalMax`: Vertragliche maximale Verbrauchsleistung (in Watt)
- `failsafeConsumptionActivePowerLimit`: Failsafe-Limit für Verbrauchsleistung (in Watt)
- `failsafeProductionActivePowerLimit`: Failsafe-Limit für Einspeiseleistung (in Watt)
- `failsafeDurationMinimum`: Minimale Failsafe-Dauer (z. B. `2h`)

#### `passthrough`

Optionale [Plugin](/de/reference/plugins)-Konfiguration zum Durchreichen des Begrenzungssignals an ein externes System.

#### `interval`

Abfrageintervall.
Standard: `10s`.

Details zur Einrichtung und zum Pairing findest du unter [Externe Steuerung](../../features/external-control#konfiguration-via-eebus).
