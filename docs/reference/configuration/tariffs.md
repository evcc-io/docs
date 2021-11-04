---
sidebar_position: 8
---

# Tariffs

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

## Type

:::caution Erforderlicher Parameter
:::

**`type`**: Definiert den Tarifanbieter.

**Mögliche Werte**:

- **`awattar`**: Für den Anbieter Awattar
- **`tibber`**: Für den Anbieter Tibber

**Beispiel**:

```yaml
  type: awattar
```

Im folgenden sind die verschiedenen möglichen Typen und deren weitere Parameter dokumentiert:

### Awattar

_`awattar`_: Der Stromanbieter Awattar

```yaml
    type: awattar
    region: de
```

#### Region

:::info Optionaler Parameter
:::

**`region`**: Die Region in der man sich befindet

**Mögliche Werte**:

- **`de`**: Deutschland
- **`at`**: Österreich

**Beispiel**:

```yaml
    region: de
```

### Tibber

_`tibber`_: Der Stromanbieter Tibber

**Beispiel**:

```yaml
    type: tibber
    token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    homeid: "12345678-90ab-cdef-1234-567890abcdef"
```

#### Token

:::caution Erforderlicher Parameter
:::

**`token`**: Das Zugangstoken des Anbieters

**Beispiel**:

```yaml
    token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
```

#### HomeID

:::info Optionaler Parameter
:::

**`homeid`**: Die ID des Standards, falls es unter dem Account mehrere gibt

**Beispiel**:

```yaml
    homeid: "12345678-90ab-cdef-1234-567890abcdef"
```

## Cheap

:::caution Erforderlicher Parameter
:::

**`cheap`**: Den Preis in ct/kWh der als günstig gewertet werden soll.

**Beispiel**:

```yaml
    cheap: 20
```
