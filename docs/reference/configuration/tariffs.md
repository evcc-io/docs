---
sidebar_position: 11
---

# `tariffs`

evcc unterstützt die Verwendung von flexiblen Stromtarifen von [Awattar](https://www.awattar.de) oder [Tibber](https://tibber.com). Die Konfiguration erlaubt es "günstige" Preise zu definieren, bei welchen das Laden vom Netz mit der maximal möglichen Leistung aktiviert wird, selbst wenn nicht genug PV Leistung zur Verfügung steht.

**Beispiel**:

```yaml
tariffs:
  grid:
    type: awattar
    cheap: 20
    ...
```

Im folgenden werden nun alle möglichen Parameter erklärt.

---

## Erforderliche Parameter

### `type`

Definiert den Tarifanbieter.

**Mögliche Werte**:

- **`awattar`**: Für den Anbieter Awattar
- **`tibber`**: Für den Anbieter Tibber

**Beispiel**:

```yaml
  type: awattar
```

### `cheap`

Den Preis in ct/kWh der als günstig gewertet werden soll.

**Beispiel**:

```yaml
    cheap: 20
```

---

## Unterstützte Typen

Im folgenden sind die verschiedenen möglichen Typen und deren weitere Parameter dokumentiert:

### `awattar`

Der Stromanbieter Awattar

```yaml
    type: awattar
    region: de
```

---

#### Optionale Parameter

##### `region`

Die Region in der man sich befindet

**Mögliche Werte**:

- **`de`**: Deutschland
- **`at`**: Österreich

**Beispiel**:

```yaml
    region: de
```

---

### `tibber`

Der Stromanbieter Tibber

**Beispiel**:

```yaml
    type: tibber
    token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    homeid: "12345678-90ab-cdef-1234-567890abcdef"
```

---

#### Erforderliche Parameter

##### `token`

Das Zugangstoken des Anbieters

**Beispiel**:

```yaml
    token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
```

---

#### Optionale Parameter

##### `homeid`

Die ID des Standards, falls es unter dem Account mehrere gibt

**Beispiel**:

```yaml
    homeid: "12345678-90ab-cdef-1234-567890abcdef"
```
