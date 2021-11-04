---
sidebar_position: 3
---

# Loadpoints

_Loadpoints_ (Ladepunkte) ist eine Liste von Ladepunkten und kombiniert für jeden Ladepunkt eine Wallbox, Fahrzeuge und falls notwendig einen Zähler mit weiteren optionalen Parametern. Eine minimale Konfiguration erfordert eine Wallbox.

**Beispiel:**

```yaml
loadpoints:
- title: Garage # display name for UI
  charger: wallbox # Wallbox Referenz
  vehicles:
    - audi # Fahreug Referenz
  mode: pv # charge mode (off, now, minpv, pv)
```

Referenzen sind hierbei immer die Werte des Parameters `name` (z.B. `wallbox`) in der jeweiligen Gerätekonfiguration.

Im folgenden werden nun alle möglichen Parameter erklärt.

---

## Title

:::caution Erforderlicher Parameter
:::

**`title`**: Eine Beschreibung des Ladepunktes, wird in der UI angezeigt.

**Beispiel:**

```yaml
  title: Garage
```

---

## Charger

:::caution Erforderlicher Parameter
:::

**`charger`**: Referenz auf eine `charger` (Wallbox) Konfiguration.
**Beispiel:**

```yaml
  charger: wallbox
```

Wobei hier der Wert `wallbox` dem Wert eines `name` Parameters in der [Wallbox Definition](chargers#name) entspricht.

---

## Meters

:::info Optionaler Parameter
:::

**`meters`**: Referenz auf eine `meter` (Strommessgerät) Konfiguration.

Dieser Eintrag wird nur benötigt, wenn die verwendete Wallbox keine eigene Strommessung durchführt bzw. die Werte der Messung von evcc nicht ausgelesen werden können. Aber selbst dann ist dieser Eintrag optional, denn evcc rechnet nimmt an dass mit der eingestellten maximalen Stromstärke auch geladen wird.

**Beispiel:**

```yaml
  meters: 
    charge: charge
```

Wobei hier der Wert `charge` dem Wert eines `name` Parameters in der [Strommessgeräte Definition](meters#name) entspricht.

---

## Vehicle & Vehicles

:::info Optionaler Parameter
:::

**`vehicle`**: Eine Referenz auf eine `vehicle` (Fahrzeug) Konfiguration.

**Beispiel:**

```yaml
  vehicle: renault
```

Wobei hier der Wert `renault` dem Wert eines `name` Parameters in der [Fahrzeug Definition](vehicles#name) entspricht.

**`vehicles`**: Eine Liste von Referenzen auf Konfigurationen von `vehicles` (Fahrzeugen)

**Beispiel:**

```yaml
  vehicles:
  - renault
  - vw
```

Wobei hier der Wert `renault` und `vw` dem Wert eines `name` Parameters in der [Fahrzeug Definition](vehicles#name) entspricht.

---

## Mode

:::info Optionaler Parameter
:::

**`mode`**: Der Standard Lademodus wenn evcc startet.

**Mögliche Werte**:

- **`off`**: Das Laden ist gestoppt, auch wenn ein Fahrzeug an der Wallbox angeschlossen ist.
- **`now`**: Lade sofort mit der maximalen möglichen Leistung.
- **`minpv`**: Lade sofort mit der minimal möglichen Leistung. Falls genug PV Überschuss vorhanden ist, lade schneller.
- **`pv`**: Lade nur mit PV Überschuss und pausiere wenn nicht genug Leistung verfügbar ist.

:::info
Im allgemeinen benötigt ein EV mindestens 1,4kW Leistung pro Phase um zu Laden. Bei Wallboxen und Fahrzeugen welche über den ISO15118 Standard kommunizieren, wird insgesamt mindestens 1,4kW Leistung benötigt, egal mit wievielen Phasen geladen wird.
:::

**Beispiel:**

```yaml
  mode: pv
```

---

## SOC

:::info Optionaler Parameter
:::

**`soc`**: Definiere die Standardeinstellungen für den Umgang mit dem SOC eines angeschlossenen Fahrzeugs

**Beispiel:**

```yaml
  soc:
    poll:
      mode: charging
      interval: 60m
    min: 0
    target: 100
    estimate: false
```

### Poll

**`poll`**: Definiert wie die Fahrzeug APIs benutzt werden um aktuelle Informationen des Fahrzeugs abzurufen.

:::warning
Es ist __NICHT__ empfhlen die Standardeinstellungen zu ändern. Denn dies könnte dazu führen dass die Fahrzeugbatterie entleert wird
oder dass der Fahrzeughersteller aktiv verhindern würde das evcc benutzen kann. __AUF EIGENES RISIKO.__
:::

#### Mode

**`mode`**: Definiert unter welchen Bedingungen die Daten für da Fahrzeug abgerufen werden

**Mögliche Werte**:

- **`charging`**: aktualisiere die Daten __NUR__ während eines Ladevorgangs (dies ist die empfohlene Standardeinstellung)
- **`connected`**: aktualisiere die Daten wenn das Fahrzeug mit der Wallbox verbunden ist (nicht nur wenn es lädt), der Parameter `interval` definiert wie oft
- **`always`**: aktualisiere die Daten immer auch wenn es nicht mit der Wallbox verbunden ist, der Parameter [`interval`](#interval) definiert wie oft (wird nur für ein Fahrzeug eines Ladepunktes unterstützt)

**Beispiel:**

```yaml
      mode: charging
```

#### Interval

**`interval`**: Definiert wie oft das Fahrzeug nach neuen Daten abgefragt wird, wenn es __NICHT__ lädt.

**Beispiel:**

```yaml
      interval: 60m
```

### Min

**`min`**: Lade sofort bis zu dem angegebenen Wert mit der höchsten Leistung, wenn der Parameter [`mode`](#mode) (Lademodus) nicht auf `off` steht

**Mögliche Werte**: Der Wert entspricht dem Ziel-SoC (Ladezustand in %) der EV Batterie.

**Beispiel:**

```yaml
    min: 50 # Lade sofort auf 50% SOC
```

### Target

**`target`**: Definiere bis zu welchem SOC geladen wird.

**Beispiel:**

```yaml
    target: 80 # Lade bis maximal 80% SOC
```

### Estimate

**`estimate`**: Berechne (interpoliere) den aktuellen SOC zwischen den Abfragen an das Fahrzeug.

**Mögliche Werte**:

- **`true`**: evcc interpoliert die SOC Werte zwischen den Fahrzeug abfragen
- **`false`**: evcc nutzt nur die SOC Werte welche das Fahrzeug zurückliefert

**Beispiel:**

```yaml
    estimate: false # Keine Interpolation
```

---

## OnDisconnect

:::info Optionaler Parameter
:::

**`onDisconnect`**: Definiert die Standardeinstellungen wenn ein Fahrzeug von der Wallbox getrennt wird.

### Mode

**`mode`**: Der Lademodus wenn ein Fahrzeug von der Wallbox getrennt wird.

**Mögliche Werte**:  Siehe [Mode](#mode)

**Beispiel:**

```yaml
    mode: pv
```

### TargetSoC

**`targetSoC`**: Definiere bis zu welchem SOC geladen wird.

**Mögliche Werte**: Siehe [Target](#target)

**Beispiel:**

```yaml
    targetSoC: 80 # Lade bis maximal 80% SOC
```

---

## OnIdentify

:::info Optionaler Parameter
:::

**`onIdentify`**: Definiere die Standardwerte für eine Liste von Fahrzeugen, sofern diese identifizeirt wurden. Die Fahrzeuge müssen unter [`vehicle & vehicles`](#vehicle--vehicles) definiert sein und werden durch den jeweiligen Wert von `name` des Fahrzeugs referenziert.

**Beispiel:**

```yaml
  onIdentify:
    - renault: # Der "name" des Fahrzeugs
      mode: pv
      targetSoC: 100
```

### Mode

**`mode`**: Der Lademodus wenn ein Fahrzeug von der Wallbox getrennt wird.
**Mögliche Werte**: Siehe [Mode](#mode)

**Beispiel:**

```yaml
    mode: pv
```

### TargetSoC

**`targetSoC`**: Definiere bis zu welchem SOC geladen wird.

**Mögliche Werte**: Siehe [Target](#target)

**Beispiel:**

```yaml
    targetSoC: 80 # Lade bis maximal 80% SOC
```

---

## Enable

:::info Optionaler Parameter
:::

**`enable`**: Definiert das Verhalten wann im PV Modus das Laden begonnen wird.

**Beispiel:**

```yaml
  enable:
    threshold: 0
    delay: 1m
```

### Threshold

**`threshold`**: Definiert den Schwellenwert der Leistung am Netzanschlusspunkt in Watt (W).

**Mögliche Werte**: Ein positiver Wert für Netzbezug, ein negativer Wert für Export. Bei `0` muss der Export die minimale Ladeleistung erreicht haben.

**Beispiel:**

```yaml
    threshold: 0
```

### Delay

**`delay`**: Definiert wie lange der `threshold` (Schwellenwert) erfüllt sein muss.

**Beispiel:**

```yaml
    delay: 1m
```

---

## Disable

:::info Optionaler Parameter
:::

**`disable`**: Definiert das Verhalten wann im PV Modus das Laden unterbrochen wird.

**Standardwert:** `10m`

**Beispiel:**

```yaml
  disable:
    threshold: 200 # maximum import power (W)
    delay: 10m 
```

### Threshold

**`threshold`**: Definiert den Schwellenwert der Leistung am Netzanschlusspunkt in Watt (W).

**Mögliche Werte**: Ein positiver Wert für Netzbezug, ein negativer Wert für Export.

**Beispiel:**

```yaml
    threshold: 200 # Ein maximaler Netzbezug von 200W ist erlaubt
```

### Delay

**`delay`**: Definiert wie lange der `threshold` (Schwellenwert) erfüllt sein muss.

**Beispiel:**

```yaml
    delay: 10m
```

---

## Guardduration

:::info Optionaler Parameter
:::

**`guardduration`**: Definiert den zeitlichen Mindestabstand in welchem der Strom gesperrt oder wieder freigegeben werden darf.

**Standardwert:** `10m`

**Beispiel:**

```yaml
  guardduration: 5m
```

  guardduration: 5m # switch charger contactor not more often than this (default 10m)

---

## Phases

:::info Optionaler Parameter
:::

**`phases`**: Definiert die Anzahl der Phasen mit welcher die Wallbox angeschlossen ist.

**Standardwert:** `3`

**Beispiel:**

```yaml
  phases: 1
```

---

## MinCurrent

:::info Optionaler Parameter
:::

**`mincurrent`**: Definiert die minimale Stromstärke in Ampere (A) pro angeschlossener Phase von der Zuleitung zur Wallbox.

:::info
Im allgemeinen benötigt ein EV mindestens eine Stromstärke 6A pro Phase um zu Laden. Bei manchen Fahrzeugen wird auch eine höhere Stromstärke benötigt!

Bei Wallboxen und Fahrzeugen welche über den ISO15118 Standard kommunizieren kann unter umständen auch mit einer geringeren Stromstärke pro Phase geladen werden, wenn die Gesamtleistung trotzdem mindestens etwa 1,4kW beträgt.
:::

**Standardwert:** `6`

**Beispiel:**

```yaml
  mincurrent: 6
```

---

## MaxCurrent

:::info Optionaler Parameter
:::

**`maxcurrent`**: Definiert die maximale Stromstärke in Ampere (A) pro angeschlossener Phase von der Zuleitung zur Wallbox.

**Standardwert:** `16`

**Beispiel:**

```yaml
  maxcurrent: 16
```
