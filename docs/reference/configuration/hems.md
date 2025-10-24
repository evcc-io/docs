---
sidebar_position: 7
---

# `hems`

evcc unterstützt die Integration mit Home Energy Management Systemen (HEMS) für die netzdienliche Steuerung gemäß § 14a EnWG.

Es gibt zwei Möglichkeiten für die Anbindung: **Relais** (analog über Schaltkontakt) oder **EEBus** (digital über EEBus-Protokoll).

Weitere Informationen zur Konfiguration findest du unter [§ 14a EnWG & SteuVE](../../features/14a-enwg-steuve).

---

## `type: relay`

Analoge Anbindung über Schaltkontakt.

**Beispiel**:

```yaml
hems:
  type: relay
  maxPower: 8400
  limit:
    source: mqtt
    topic: hems/limit/status
```

---

### `maxPower`

**Erforderlich**

Gesamtleistungslimit bei aktivem Reduzierungssignal in Watt.

---

### `limit`

**Erforderlich**

Plugin zur Ermittlung des Schaltzustands.
Unterstützt alle [Plugin-Quellen](../../devices/plugins).
Erwartete Werte: `0`/`false` = nicht begrenzt, `1`/`true` = begrenzt.

---

## `type: eebus`

Digitale Anbindung über EEBus-Protokoll.

**Beispiel**:

```yaml
hems:
  type: eebus
  ski: "1234-5678-90AB-CDEF"
```

---

### `ski`

**Erforderlich**

SKI (Subject Key Identifier) der Steuerbox.

:::note
Das Leistungslimit wird automatisch von der Steuerbox übermittelt.
:::

