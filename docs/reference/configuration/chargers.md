---
sidebar_position: 4
---

# Chargers

Zur Steuerung der Ladung muss evcc mit einer Wallbox kommunizieren können.

Eine Wallbox hat mindestens folgende Konfiguration:

```yaml
chargers:
  - name: wallbox1 # reference name
    type: ...
    ...
```

Im folgenden werden nun alle möglichen Parameter erklärt.

### Name

:::caution Erforderlicher Parameter
:::

**`name`**: Eine Kurzbezeichnung der hier definierten Wallbox. Der Wert wird in der Refernzierung der Wallbox in der Konfiguration des [Ladepunktes](loadpoints#charger) verwendet.

**Beispiel**:

```yaml
  name: wallbox1
```

### Type

:::caution Erforderlicher Parameter
:::

**`type`**: Dies ist der evcc spezifische Wallbox Typ, mit Hilfe dessen mit der Wallbox kommuniziert werden kann. Den passenden Typ findet man unter [Geräte - Wallboxen](/docs/devices/chargers).

**Beispiel**:

```yaml
  type: wallbe
```

### Weitere Parameter

Die weiteren anzugegebenen Parameter und Werte sind abhängig vom gewählten `type`. Diese sind unter [Geräte - Wallboxen](/docs/devices/chargers) aufgeführt.
