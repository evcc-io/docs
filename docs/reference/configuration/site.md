---
sidebar_position: 2
---

# `site`

Beschreibt den Standort mit den vorhandenen und benötigten Geräten der Hausinstallation und ist für das Regeln der verfügbaren Leistung zuständig.

Um das Laden mit PV Überschuss zu regeln, ist ein auslesbarer Zähler direkt hinter dem Netzanschlusspunkt notwendig. Zusätzlich können auch Geräte für die PV Leistung und Hausbatterie angegeben werden.

**Beispiel**:

```yaml
site:
- title: Zuhause # display name for UI
  meters:
    grid: sdm630 # grid meter reference
    pvs: 
    - sma # pv meter reference
    batterys:
    - byd # battery meter reference
```

---

## Erforderliche Parameter

### `title`

Eine Beschreibung des Ladepunktes, wird in der UI angezeigt.

**Beispiel**:

```yaml
  title: Zuhause
```

---

### `meters`

Definiert welche [`meter`](meters) (Strommessgeräte) welche Art von Daten zur Verfügung stellen.

:::note
Es ist mindestens die Konfiguration eines `grid` oder mindestens eines `pvs` Elementes notwendig!
:::

**Beispiel**:

```yaml
site:
  meters:
    grid: sdm630 # grid meter reference
    pvs: 
    - sma # pv meter reference
    batterys: 
    - byd # battery meter reference
  residualPower: 100
```

---

## Optionale Parameter

### `meters.grid`

Definiert das [`meter`](meters) (Strommessgeräte), welches die Werte des Netzanschlusspunktes liefert.

**Mögliche Werte**: Wert eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    grid: sdm630 # grid meter reference
```

---

### `meters.pvs`

Definiert die [`meter`](meters) (Strommessgeräte), welches die PV Stromerzeugungswerte liefert.

**Mögliche Werte**: Eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    pvs: 
    - sma # pv meter reference
```

---

### `meters.batterys`

Definiert die [`meter`](meters) (Strommessgeräte), welches die Werte Hausbatterien liefert.

**Mögliche Werte**: Eine Liste von Werten eines `name` Parameters in der [`meters`](#meters) Konfiguration.

**Beispiel**:

```yaml
    batterys: 
    - byd # battery meter reference
```

### `residualPower`

Definiert eine Leistung in Watt (W). Die Verwendung wird in folgenden unterschiedlichen Szenarien verdeutlicht.

**Beispiel**:

```yaml
  residualPower: 100
```

#### `grid` `meter` vorhanden

- Positiver Wert: Sicherheitspuffer.
- Negativer Wert: Laden im PV Modus erlaubt den Wert als Netzanteil.

#### Nur `pv` `meter` vorhanden

- Positiver Wert: Typischer Hausverbrauch, um damit den PV Überschuss abschätzen zu können.
- Negativer Wert: -
