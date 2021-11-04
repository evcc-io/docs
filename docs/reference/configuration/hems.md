---
sidebar_position: 7
---

# HEMS

evcc kann in bestehende Home Energy Management Systeme (HEMS) integriert werden. Momentan wird der SMA Sunny Home Manager 2.0 (SHM) unterstützt!

**Beispiel:**

```yaml
hems:
  type: sma
  ...
```

Im folgenden werden nun alle möglichen Parameter erklärt.

## Type

:::caution Erforderlicher Parameter
:::

**`type`**: Definiert das HEMS System.

**Mögliche Werte**:

- **`sma`**: Für den SMA Sunny Home Manager 2.0

**Beispiel:**

```yaml
  type: sma
```

Im folgenden sind die verschiedenen möglichen Typen und deren weitere Parameter dokumentiert:

### SMA

_`sma`_: SMA Sunna Home Manager 2.0 (SHM)

Durch die Integration können die [Ladepunkte](loadpoints) dem SHM hinzugefügt werden und somit z.B. für dessen Steuerung berücksichtigt werden.

**Beispiel:**

```yaml
hems:
  type: sma
  allowcontrol: false # set true to allow SHM controlling charger in PV modes
```

#### Allowcontrol

:::info Optionaler Parameter
:::

**Mögliche Werte**:

- **`true`**: Hiermit kann das Verhältnis von Netzstrom zu PV Leistung für den Modus **Min+PV** im Sunny Portal über den Slider "Optional energy demand" eingestellt werden. Falls die notwendige PV Leistung nicht verfügbar ist, wird das Laden wie im Modus **PV** unterbrochen. Den Slider also ganz nach links zu schieben, bewirkt dass der Modus **Min+PV** wie beschrieben funktioniert. Wenn der Slider ganz nach rechts geschoben wird, verhällt sich der Modus **Min+PV** wie der **PV** Modus.
- **`false`**: Der SHM kann die Lademodi nicht beeinflussen, diese werden nur von evcc gesteuert.
