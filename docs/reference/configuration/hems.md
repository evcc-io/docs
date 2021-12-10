---
sidebar_position: 7
---

# `hems`

evcc kann in bestehende Home Energy Management Systeme (HEMS) integriert werden. Momentan wird der SMA Sunny Home Manager 2.0 (SHM) unterstützt!

**Beispiel**:

```yaml
hems:
  type: sma
  ...
```

Im folgenden werden nun alle möglichen Parameter erklärt.

---

## Erforderliche Parameter

### `type`

Definiert das HEMS System.

**Mögliche Werte**:

- `sma`: Für den SMA Sunny Home Manager 2.0. Siehe [`sma`](#sma) Definition

**Beispiel**:

```yaml
  type: sma
```

---

## Optionale Parameter

### `allowcontrol`

Definiert ob das definierte HEMS die Ladesteuerung von evcc übernehmen soll.

**Mögliche Werte**:

- `true`: Hiermit kann das Verhältnis von Netzstrom zu PV Leistung für den Modus **Min+PV** im Sunny Portal über den Slider "Optional energy demand" eingestellt werden. Falls die notwendige PV Leistung nicht verfügbar ist, wird das Laden wie im Modus **PV** unterbrochen. Den Slider also ganz nach links zu schieben, bewirkt dass der Modus **Min+PV** wie beschrieben funktioniert. Wenn der Slider ganz nach rechts geschoben wird, verhällt sich der Modus **Min+PV** wie der **PV** Modus.
- `false`: Der SHM kann die Lademodi nicht beeinflussen, diese werden nur von evcc gesteuert.

---

## Optionale SMA Parameter

evcc meldet jeden Ladepunkt an den SHM als eigenständiges Device. Die Device ID wird dabei von evcc generiert.

Die Device ID ist ein HEX-String und setzt sich wie folgt zusammen

```text
F-AAAAAAAA-BBBBBBBBBBBB-00
```

- F: Vendor ID Type, fest definiert
- AAAAAAAA: Siehe `vendorid`
- BBBBBBBBBBBB: Siehe `deviceid`
- 00: Sub Device ID, fest definiert

---

### `vendorid`

Definiert die VendorID die für die Erstellung der Device ID verwendet wird. Wenn in der Konfiguration keine Vendor ID angegeben wird, wird eine fest definierte ID verwendet.

HEX-String, Länge 8 Zeichen

---

### `deviceid`

Definiert die Geräte ID, die für die Erstellung der Device ID verwendet wird. Wenn keine Geräte ID angegeben wird, generiert evcc eine zufällige Geräte ID in Abhängigkeit auf den aktuellen Computer.

:::info
Wenn evcc auf einen anderen Computer umgezogen wird, ändert sich auch die zufällig erzeugte Geräte ID. Der SHM wird evcc in diesem Fall als neues Gerät erkennen.
Um dies zu verhindern, sollte die Geräte ID fest definiert werden.

Wenn evcc als Docker Container ausgeführt wird, muss hierfür `machine-id` gemounted werden. Siehe auch [Docker Konfiguration](../../installation/docker)
:::

HEX-String, Länge: 12 Zeichen

---

## Unterstützte HEMS

### `sma`

Bietet Unterstützung für den SMA Sunna Home Manager 2.0 (SHM).

Durch die Integration können die [Ladepunkte](loadpoints) dem SHM hinzugefügt werden und somit z.B. für dessen Steuerung berücksichtigt werden.

**Beispiel**:

```yaml
hems:
  type: sma
  allowcontrol: false # set true to allow SHM controlling charger in PV modes
```
