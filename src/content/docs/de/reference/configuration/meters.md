---
title: "meters"
description: "Beschreibt, wie du Zähler für Netz, PV-Anlage, Hausbatterie und Verbraucher in der evcc.yaml definierst, welche Vorzeichenkonvention gilt und welche Zählertypen es gibt."
sidebar:
  order: 5
translatedFrom: "731e5e09d04f"
---

Unter _meters_ (Zähler) steht eine Liste von Geräten im Haus, die Leistung und Energieverbrauch, PV-Erzeugung oder die Nutzung der Hausbatterie messen können. Ein `meter` definiert einen Messpunkt für Energie und kann ein physisches Gerät sein (z. B. ein Zähler am Netzanschlusspunkt), ein PV-Wechselrichter (AC oder bei Hybridwechselrichtern auch DC) oder ein Batteriewechselrichter.

Wallboxen können einen eingebauten Zähler haben, oder der Zähler wird extern angeschlossen. Hat eine Wallbox einen internen Zähler, muss dafür in `meters` kein Eintrag angelegt werden. Hat die Wallbox keinen solchen Zähler, verwendet evcc den hier definierten Zähler, den du der Wallbox in der Ladepunkt-Konfiguration unter [`meter`](/de/reference/configuration/loadpoints#meter) zuweist. Ohne Zähler nimmt evcc an, dass die eingestellte Ladeleistung auch tatsächlich genutzt wird.

evcc verwendet eine einheitliche Vorzeichenkonvention für Leistungs- und Stromwerte (`power`, `powers`, `currents`):

- **Positiv (+)** für eingehende Energie: Netzbezug, PV-Erzeugung, Entladung der Hausbatterie
- **Negativ (-)** für ausgehende Energie: Einspeisung, Standby-Verbrauch des PV-Wechselrichters, Ladung der Hausbatterie
- **Verbraucher** (Wallbox, Aux-Zähler) sind immer **positiv (+)**

Liefert das Gerät die Werte mit umgekehrtem Vorzeichen, kann das in der [Plugin-Konfiguration](/de/reference/plugins) über `scale: -1` korrigiert werden.

Die `meters`-Konfiguration ist eine Liste der vorhandenen Geräte.

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
  - name: aux
    type: ...
```

Konfigurationen für bekannte Geräte findest du unter [Geräte – Hausinstallation](/de/meters).

Im Folgenden werden die verschiedenen Parameter erklärt.

---

## Erforderliche Parameter

### `name`

Eine Kurzbezeichnung des Zählers. Der Wert wird verwendet, um das Gerät in der Konfiguration des [Standorts](/de/reference/configuration/site) oder des [Ladepunkts](/de/reference/configuration/loadpoints#meter) zu referenzieren.

**Beispiel**:

```yaml
name: wallbox1
```

---

### `type`

Dies ist der evcc-spezifische Zählertyp, über den die Kommunikation mit dem Gerät läuft. Den passenden Typ für bekannte Geräte findest du unter [Geräte – Hausinstallation](/de/meters).

**Beispiel**:

```yaml
type: modbus
```

Im Folgenden sind die verschiedenen möglichen Typen und ihre weiteren Parameter dokumentiert:

---

:::note[Hinweis]
Die zusätzlichen Zählerfelder `title` und `icon` werden in der `evcc.yaml` aus technischen Gründen nicht unterstützt.
Titel und Icons (je nach Anwendungsfall) können nur für Zähler definiert werden, die über die Oberfläche angelegt wurden.
:::

## Unterstützte Typen

### `movingaverage`

Mit diesem Zählertyp lassen sich schwankende Messwerte glätten. Er funktioniert mit jeder Verwendung (`usage`). Der Parameter `decay` gibt an, mit wie viel Prozent der neue Wert in die Berechnung einfließt.

**Beispiel**:

```yaml
meters:
- name: grid
  type: movingaverage
  decay: 0.1
  meter:
    type: template
    template: solarlog
    usage: grid
    host: 192.0.2.2
    ...
```

In diesem Beispiel fließen 10% des neuen Werts ein. Nach 10 Zyklen fällt der älteste Wert aus der Berechnung heraus. Wie lange das dauert, hängt vom `interval` ab.

---

### `modbus`

Geräte, die über die Modbus-Schnittstelle angebunden sind und vom Projekt [MBMD (ModBus Measurement Daemon)](https://github.com/volkszaehler/mbmd#supported-devices) unterstützt werden.

**Beispiel**:

```yaml
  type: modbus
  power: Power
  energy: Sum
  soc: ChargeState
  ...
```

#### Erforderliche Parameter

Zusätzlich zu den hier definierten Parametern sind weitere Parameter notwendig. Diese sind in der [Modbus](/de/reference/modbus)-Dokumentation aufgeführt.

##### `power`

Definiert den MBMD-Messwert, der die Leistung liefert, typischerweise `Power`.

**Beispiel**:

```yaml
power: Power
```

---

##### `energy`

Definiert den MBMD-Messwert, der die Energie liefert, typischerweise `Sum`.

**Beispiel**:

```yaml
energy: Sum
```

---

#### Optionale Parameter

##### `soc`

Definiert den MBMD-Messwert, der den Ladestand der Batterie liefert, typischerweise `ChargeState`.

**Beispiel**:

```yaml
soc: ChargeState
```

---

### `lgess`

Geräte vom Typ LG ESS Home 8/10.

**Beispiel**:

```yaml
type: lgess
usage: grid
uri: https://192.0.2.2/
password: "DE200..."
```

:::note
Die Parameter `uri` und `password` werden bei einem `meter`-Gerät nur benötigt, wenn mehrere Geräte konfiguriert sind.
:::

#### Erforderliche Parameter

##### `usage`

Definiert, welche Messwerte hier benötigt werden.

**Mögliche Werte**:

- **`grid`**: Für Messwerte am Netzanschlusspunkt
- **`pv`**: Für Messwerte der PV-Erzeugung
- **`battery`**: Für Messwerte der Hausbatterie

---

##### `uri`

Definiert die URL des LG-ESS-Geräts im Heimnetzwerk.

**Beispiel**:

```yaml
uri: https://192.0.2.2/
```

---

##### `password`

Hier muss die Registriernummer des LG-ESS-Home-Wechselrichters eingetragen werden.

**Beispiel**:

```yaml
password: "DE200..."
```

---

### `openwb`

Verwendet die Messwerte einer OpenWB-Wallbox.

**Beispiel**:

```yaml
type: openwb
usage: grid
broker: 192.0.2.2
```

#### Erforderliche Parameter

##### `usage`

Definiert, welche Messwerte hier benötigt werden.

**Mögliche Werte**:

- **`grid`**: Für Messwerte am Netzanschlusspunkt
- **`pv`**: Für Messwerte der PV-Erzeugung
- **`battery`**: Für Messwerte der Hausbatterie

---

##### `broker`

Definiert den Hostnamen oder die IP-Adresse und den Port der OpenWB im Heimnetzwerk.

**Beispiel**:

```yaml
broker: 192.0.2.2:1883
```

---

### `sma`

Für die Verwendung des SMA Home Manager 2.0, des SMA Energy Meters oder eines SMA-Wechselrichters. Die Geräte müssen das Speedwire-Protokoll unterstützen.

**Beispiel**:

```yaml
type: sma
uri: 192.0.2.2
serial: 12345678
interface: eth0
```

---

#### Erforderliche Parameter

:::note
Es reicht aus, entweder `uri` oder `serial` zu definieren.
:::

##### `uri`

Definiert den Hostnamen oder die IP-Adresse des Geräts im Heimnetzwerk.

**Beispiel**:

```yaml
uri: 192.0.2.2
```

##### `serial`

Definiert die Seriennummer des Geräts, von dem Messwerte empfangen werden sollen.

**Beispiel**:

```yaml
serial: 12345678
```

#### Optionale Parameter

##### `interface`

Multicast-Nachrichten können nur auf einer bestimmten Netzwerkschnittstelle empfangen werden. Üblicherweise ist das die erste Schnittstelle im System. Ist das nicht die Schnittstelle, die mit dem Zähler verbunden ist, muss sie explizit angegeben werden.

**Beispiel**:

```yaml
interface: eth0
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

Definiert, welche Messwerte hier benötigt werden.

**Mögliche Werte**:

- **`grid`**: Für Messwerte am Netzanschlusspunkt
- **`pv`**: Für Messwerte der PV-Erzeugung
- **`battery`**: Für Messwerte der Hausbatterie

---

##### `uri`

Definiert den Hostnamen oder die IP-Adresse des Geräts im Heimnetzwerk.

**Beispiel**:

```yaml
uri: 192.0.2.2
```

---

##### `password`

Hier muss das Passwort für den Benutzer _customer_ eingetragen werden.

**Beispiel**:

```yaml
password: "DasPasswort"
```

---

### `custom`

Generische Implementierung, bei der die einzelnen Werte über [Plugins](/de/user-defined-devices#meter) definiert werden.

**Beispiel**:

```yaml
  type: custom
  power: # Leistung (W)
    source: # Plugin-Typ
    ...
  energy: # Energie (kWh)
    source: # Plugin-Typ
    ...
  returnenergy: # Energie in Gegenrichtung (kWh)
    source: # Plugin-Typ
    ...
  soc: # Ladestand der Batterie (%)
    source: # Plugin-Typ
    ...
  capacity: # optional: Batteriekapazität (kWh)
  currents: # Strom (A) pro Phase
    - source: # Plugin-Typ Phase 1
      ...
    - source: # Plugin-Typ Phase 2
      ...
    - source: # Plugin-Typ Phase 3
      ...
  powers: # Leistung (W) pro Phase
    - source: # Plugin-Typ Phase 1
      ...
    - source: # Plugin-Typ Phase 2
      ...
    - source: # Plugin-Typ Phase 3
      ...
  voltages: # Spannung (V) pro Phase
    - source: # Plugin-Typ Phase 1
      ...
    - source: # Plugin-Typ Phase 2
      ...
    - source: # Plugin-Typ Phase 3
      ...
  ...
```

---

#### Erforderliche Parameter

##### `power`

Plugin-Definition, die die Leistung in Watt (W) liefert.

**Beispiel**:

```yaml
  power: ... # Leistung (W)
    source: # Plugin-Typ
    ...
```

---

#### Optionale Parameter

##### `energy`

Plugin-Definition, die die verbrauchte Energie in Kilowattstunden (kWh) liefert.

**Beispiel**:

```yaml
  energy: ... # Energie (kWh)
    source: # Plugin-Typ
    ...
```

---

##### `returnenergy`

Plugin-Definition, die die Energie in Gegenrichtung in Kilowattstunden (kWh) liefert, z. B. die Einspeisung.

**Beispiel**:

```yaml
  returnenergy: ... # Energie in Gegenrichtung (kWh)
    source: # Plugin-Typ
    ...
```

---

#### `soc`

Plugin-Definition, die den Ladestand der Batterie in Prozent (%) liefert.

**Beispiel**:

```yaml
  soc: ... # Ladestand der Batterie (%)
    source: # Plugin-Typ
    ...
```

---

#### `capacity`

Gibt die Batteriekapazität an. Das ist nur bei mehreren Batterien sinnvoll und dient dazu, den Gesamtladestand zu ermitteln.

---

#### `currents`

Eine Liste von Plugin-Definitionen, die den Strom in Ampere (A) pro Phase liefern.

**Beispiel**:

```yaml
  currents: # Strom (A) pro Phase
    - source: # Plugin-Typ Phase 1
      ...
    - source: # Plugin-Typ Phase 2
      ...
    - source: # Plugin-Typ Phase 3
      ...
  ...
```

---

#### `powers`

Eine Liste von Plugin-Definitionen, die die Leistung in Watt (W) pro Phase liefern.

**Beispiel**:

```yaml
  powers: # Leistung (W) pro Phase
    - source: # Plugin-Typ Phase 1
      ...
    - source: # Plugin-Typ Phase 2
      ...
    - source: # Plugin-Typ Phase 3
      ...
  ...
```

---

#### `voltages`

Eine Liste von Plugin-Definitionen, die die Spannung in Volt (V) pro Phase liefern.

**Beispiel**:

```yaml
  voltages: # Spannung (V) pro Phase
    - source: # Plugin-Typ Phase 1
      ...
    - source: # Plugin-Typ Phase 2
      ...
    - source: # Plugin-Typ Phase 3
      ...
  ...
```
