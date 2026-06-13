---
title: "tariffs"
sidebar:
  order: 11
---

Hier kannst du deinen Energietarif und gegebenenfalls deine Einspeisevergütung angeben.
evcc verwendet diese Werte für eine grobe [Einsparungsberechnung](/de/faq#ersparnisberechnung), die in der Web-UI angezeigt wird.
Diese Daten werden auch vom [Planer](/de/features/plans) für preis- und CO₂-optimiertes Laden verwendet.

**Struktur**

```yaml
tariffs:
  grid:
    type: ...
  feedin:
    type: ...
  co2:
    type: ...
  solar:
    type: ...
```

**Beispiel: Konstanter Energiepreis**

```yaml
tariffs:
  currency: EUR # (default EUR)
  grid:
    # static grid price
    type: fixed
    price: 0.294 # [currency]/kWh

  feedin:
    # rate for feeding excess (pv) energy to the grid
    type: fixed
    price: 0.08 # [currency]/kWh
```

Mehr Beispiele und eine Übersicht der verfügbaren Anbieter findest du unter [Stromtarife](/de/tariffs).

## Zeitabhängige Netzentgelte {#charges-zones}

Über `charges` kannst du einen festen Aufschlag pro kWh auf jeden Preiswert addieren.
Berechnet dein Netzbetreiber zeitvariable Netzentgelte (z. B. nach § 14a EnWG), kannst du über `chargesZones` den Standardaufschlag `charges` für bestimmte Zeiträume überschreiben.
Das funktioniert mit jedem Netztarif, egal ob Anbieter-Template, `fixed`-Preis oder `custom`-Quelle.

Jede Zone hat folgende Felder:

| Feld      | Erfordert | Beschreibung                                                      |
| --------- | --------- | ----------------------------------------------------------------- |
| `charges` | ja        | Aufschlag pro kWh in dieser Zone. Ersetzt den Standard-`charges`. |
| `months`  | nein      | z. B. `Nov-Mär` oder `Jun`. Leer bedeutet ganzjährig.             |
| `days`    | nein      | z. B. `Mo-Fr` oder `Sa,So`. Leer bedeutet täglich.                |
| `hours`   | nein      | z. B. `17-20` oder `15:30-21`. Leer bedeutet ganztägig.           |

**Beispiel**:

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "..."
    charges: 0.0941 # Standard-Netzentgelt pro kWh
    chargesZones:
      - months: Nov-Mär
        days: Mo-Fr
        hours: 17-20
        charges: 0.1838 # Hochtarif
      - hours: 0-6
        charges: 0.0299 # Niedrigtarif
```

Trifft keine Zone zu, gilt der Standardaufschlag `charges`.
Überlappen sich Zonen, gewinnt die letzte zutreffende Zone.
Ist eine `formula` konfiguriert, enthält die Variable `charges` den Zonenwert des jeweiligen Zeitfensters.

Ein `fixed`-Tarif mit `chargesZones` wird wie ein dynamischer Tarif behandelt: Der Planer bevorzugt günstige Zeiträume und das Preisdiagramm wird angezeigt.

## Feature-Flags

Bei eigenen Tarifen vom Typ `custom` kannst du über `features` das Verhalten beeinflussen:

| Feature   | Beschreibung                                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| average   | Glättet feingranulare Preisstufen (z. B. 15-Minuten-Werte) zu Stundenmittelwerten.                                          |
| cacheable | Speichert abgerufene Werte persistent. Bei Neustart oder Ausfall des Anbieters dienen sie als Fallback (bis zu 24 Stunden). |

**Beispiel**:

```yaml
tariffs:
  grid:
    type: custom
    features:
      - cacheable
    # ... weitere Attribute
```
