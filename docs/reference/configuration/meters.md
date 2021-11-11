---
sidebar_position: 5
---

# `meters`

_Meters_ (Strommessgeräte) ist eine Liste von in der Hausinstallation vorhandenen Geräten, welche die Leistung und den Energieverbrauch, die PV Erzeugung oder Hausbatterienutzung zur Verfügung stellen können. Ein `meter` definiert einen Punkt einer Energieleistung und kann ein physikalisches Gerät sein (z.b. ein Messgerät am Netzanschlusspunkt), ein PV Wechselrichter (AC oder auch DC im Falle von Hybrid-Wechselrichtern), oder ein Batterie-Wechselrichter.

Wallboxen können intern ein Messgerät eingebaut haben, oder es kann auch extern angeschlossen sein. Falls eine Wallbox ein internes Strommessgerät hat, dann muss in `meters` **kein** Eintrag dafür angelegt werden. Falls die Wallbox keinen solchen Zähler hat, wird evcc den hier konfigurierten und der Wallbox im Ladepunkt unter [`meters`](loadpoints#meters) zugewiesenen Zähler verwenden, oder annehmen dass die eingestellte Ladeleistung auch tatsächlich genutzt wird.

evcc benutzt positive (+) Werte für eingehende Ströme (Netzbezug, PV Erzeugung, Hausbatterie-Entladung) und negative (-) Werte für ausgehende Ströme (Netzeinspeisung, PV Wechselrichter Ruhestrombedarf oder Hausbatterie-Ladung). Jeder anderweitiger Strombedarf, inklusive der Wallbox, ist immer ein positiver (+) Wert.

Die `meters` Konfiguration ist eine Liste von verschiedenen vorhandenen Geräten.

**Beispiel**:

```yaml
meters:
- name: grid
  type: ...
- name: pv
  type: ...
- name: battery
  type: ...
- name: charge
  type: ...
```

Konfigurationen für bekannte Geräte sind unter [Geräte - Hausinstallation](/docs/devices/meters) zu finden.

Im folgenden werden nun alle möglichen Parameter erklärt.

---

## Erforderliche Parameter

### `name`

Eine Kurzbezeichnung der hier definierten Wallbox. Der Wert wird in der Referenzierung des Gerätes in der Konfiguration der [Site](site) oder des [Ladepunktes](loadpoints#meters) verwendet.

**Beispiel**:

```yaml
  name: wallbox1
```

---

### `type`

Dies ist der evcc spezifische Messgeräte Typ, mit Hilfe dessen mit dem Gerät kommuniziert werden kann. Den passenden Typ für bekannte Geräte findet man unter [Geräte - Hausinstallation](/docs/devices/meters).

**Beispiel**:

```yaml
  type: modbus
```

Im folgenden sind die verschiedenen möglichen Typen und deren weitere Parameter dokumentiert:

---

## Unterstützte Typen

### `modbus`

Geräte welche über die ModBus Schnittstelle angebunden sind und vom Projekt [MBMD](https://github.com/volkszaehler/mbmd#supported-devices) unterstützt werden.

**Beispiel**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Erforderliche Parameter

Zusätzlich zu den hier definierten Parametern, sind weitere Parameter notwendig. Diese sind unter in der [Modbus](/docs/reference/modbus) Dokumentation aufgeführt.

##### `power`

Definiert den MBMD Messwert welcher die Leistung zurückliefert, typischerweise ist das `Power`.

**Beispiel**:

```yaml
  power: Power
```

---

##### `energy`

Definiert den MBMD Messwert welcher die Energiemenge zurückliefert, typischerweise ist das `Sum`.

**Beispiel**:

```yaml
  energy: Sum
```

---

#### Optionale Parameter

##### `soc`

Definiert den MBMD Messwert welcher den Ladestand der Batterie zurückliefert, typischerweise ist das `ChargeState`.

**Beispiel**:

```yaml
  soc: ChargeState
```

---

### `lgess`

LG ESS Home 8/10 Geräte.

**Beispiel**:

```yaml
  type: lgess
  usage: grid
  uri: https://192.0.2.2/
  password: "DE200..."
```

:::note
Der Parameter `uri` und `password` werden nur bei einem `meter` Gerät benötigt, falls mehrere konfiguriert werden.
:::

#### Erforderliche Parameter

##### `usage`

Definiert welches Messwerte hier benötigt werden.

**Mögliche Werte**:

- **`grid`**: Für die Messwerte am Netzanschlusspunkt
- **`pv`**: Für die Messwerte der PV Erzeugung
- **`battery`**: Für die Messwerte der Hausbatterie

---

##### `uri`

Definiert die URL im Heimnetzwerk des LG ESS Gerätes.

**Beispiel**:

```yaml
  uri: https://192.0.2.2/
```

---

##### `password`

Hier muss die Registriernummer des LG ESS HOME Wechselrichters eingetragen werden.

**Beispiel**:

```yaml
  password: "DE200..."
```

---

### `openwb`

Verwendung der Messwerte von der OpenWB Wallbox

**Beispiel**:

```yaml
  type: openwb
  usage: grid
  broker: 192.0.2.2
```

:::note
Der Parameter `uri` und `password` werden nur bei einem `meter` Gerät benötigt, falls mehrere konfiguriert werden.
:::

---

#### Erforderliche Parameter

##### `usage`

Definiert welches Messwerte hier benötigt werden.

**Mögliche Werte**:

- **`grid`**: Für die Messwerte am Netzanschlusspunkt
- **`pv`**: Für die Messwerte der PV Erzeugung
- **`battery`**: Für die Messwerte der Hausbatterie

---

##### `broker`

Definiert den hostnamen oder die IP Adresse und die Portadresse im Heimnetzwerk der OpenWB.

**Beispiel**:

```yaml
  broker: 192.0.2.2:1883
```

---

### `sma`

Für die Verwendung des SMA Home Manager 2.0 oder SMA Energy Meter oder eines SMA Wechselrichters. Die Geräte müssen das Protokoll Speedwire unterstützen.

**Beispiel**:

```yaml
  type: sma
  uri: 192.0.2.2
```

---

#### Erforderliche Parameter

##### `uri`

Definiert den hostnamen oder die IP Adresse im Heimnetzwerk des Gerätes.

**Beispiel**:

```yaml
  uri: 192.0.2.2
```

---

### `tesla`

_`tesla`_: Für die Verwendung der Messwerte einer Tesla Powerwall.

**Beispiel**:

```yaml
  type: tesla
  usage: grid
  uri: https://192.0.2.2/
  password: "***"
```

---

#### Erforderliche Parameter

##### `usage`

Definiert welches Messwerte hier benötigt werden.

**Mögliche Werte**:

- **`grid`**: Für die Messwerte am Netzanschlusspunkt
- **`pv`**: Für die Messwerte der PV Erzeugung
- **`battery`**: Für die Messwerte der Hausbatterie

---

##### `uri`

Definiert den hostnamen oder die IP Adresse im Heimnetzwerk des Gerätes.

**Beispiel**:

```yaml
  uri: 192.0.2.2
```

---

##### `password`

Hier muss das Password für den Benutzer _customer_ (Kunde) eingetragen werden.

**Beispiel**:

```yaml
  password: "DasPasswort"
```

---

### `custom`

Standard Implementierung, bei welchem die einzelnen Werte über [Plugins](/docs/reference/plugins) definiert werden.

**Beispiel**:

```yaml
  type: custom
  power: # Leistung (W)
    source: # Plugin Typ
    ...
  energy: # Energiemenge (kWh)
    source: # Plugin Typ
    ...
  soc: # Batterie SOC (%)
    source: # Plugin Typ
    ...
  currents: # Stromstärke (A) pro Phase
    - source: # Phase 1 Plugin Typ
      ...
    - source: # Phase 2 Plugin Typ
      ...
    - source: # Phase 3 Plugin Typ
      ...
  ...
```

---

#### Erforderliche Parameter

##### `power`

Plugin Definition um die Leistung in Watt (W) zurückzugeben.

**Beispiel**:

```yaml
  power: ... # Leistung (W)
    source: # Plugin Typ
    ...
```

---

#### Optionale Parameter

##### `energy`

Plugin Definition um die geladene Energiemenge in kWh zurückzugeben.

**Beispiel**:

```yaml
  energy: ... # Energiemenge (kWh)
    source: # Plugin Typ
    ...
```

---

#### `soc`

Plugin Definiton um den Ladestand SOC in % zurückzugeben

**Beispiel**:

```yaml
  soc: ... # Batterie SOC (%)
    source: # Plugin Typ
    ...
```

---

#### `currents`

Eine Liste von Plugin Definitionen um die Stromstärke in A pro Phase zurückzugeben

**Beispiel**:

```yaml
  currents: # Stromstärke (A) pro Phase
    - source: # Phase 1 Plugin Typ
      ...
    - source: # Phase 2 Plugin Typ
      ...
    - source: # Phase 3 Plugin Typ
      ...
  ...
```
