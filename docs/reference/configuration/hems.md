---
sidebar_position: 7
---

# `hems`

Unter `hems` wird die externe Steuerung von Verbrauchsleistung und Einspeisung konfiguriert.
Dies wird z. B. für die Umsetzung von §14a EnWG oder §9 EEG benötigt.
Details zu Hintergrund und Einrichtung findest du unter [Externe Steuerung](../../features/external-control).

:::info Hinweis
Wenn `hems` konfiguriert ist, wird automatisch ein "Externe Begrenzung" Stromkreis (`gridcontrol`) erstellt.
Eine manuelle Konfiguration von Stromkreisen ist dafür nicht erforderlich.
:::

:::info SMA Sunny Home Manager & SEMP-Protokoll
Die Integration mit dem SMA Sunny Home Manager (SHM) ist standardmäßig aktiv und muss nicht mehr unter `hems:` konfiguriert werden.
Details und Konfigurationsmöglichkeiten findest du unter **Konfiguration > Sunny Home Manager**.
:::

---

## Erforderliche Parameter

### `type`

Definiert den Typ der externen Steuerung.

**Mögliche Werte**:

- `relay`: Anbindung über Schaltkontakt
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

[Plugin](../../devices/plugins)-Konfiguration zum Auslesen des Schaltkontakts.
Erwarteter Rückgabewert: `true`/`1` = begrenzt, `false`/`0` = normal.

#### `passthrough`

Optionale [Plugin](../../devices/plugins)-Konfiguration zum Durchreichen des Begrenzungssignals an ein externes System.

#### `interval`

Abfrageintervall für den Schaltkontakt.
Standard: `10s`.

Weitere Beispiele für verschiedene Anbindungen (GPIO, MQTT, HTTP) findest du unter [Externe Steuerung](../../features/external-control#konfiguration-via-relais).

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

Optionale [Plugin](../../devices/plugins)-Konfiguration zum Durchreichen des Begrenzungssignals an ein externes System.

#### `interval`

Abfrageintervall.
Standard: `10s`.

Details zur Einrichtung und zum Pairing findest du unter [Externe Steuerung](../../features/external-control#konfiguration-via-eebus).
