---
title: "tariffs"
description: "Lege in der evcc.yaml Tarife für Netzbezug und Einspeisung sowie CO₂- und PV-Vorhersagen fest, für Ersparnisstatistik, smarte Ladepläne und zeitabhängige Netzentgelte."
sidebar:
  order: 12
translatedFrom: "104e48d142a6"
---

Hier kannst du deinen Energietarif und gegebenenfalls deine Einspeisevergütung angeben.
evcc verwendet diese Werte für eine grobe [Ersparnisberechnung](/de/faq#statistical-data), die in der Oberfläche angezeigt wird.
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
  temperature:
    type: ...
```

**Beispiel: Konstanter Energiepreis**

```yaml
tariffs:
  currency: EUR # (Standard: EUR)
  grid:
    # statischer Netzpreis
    type: fixed
    price: 0.294 # [currency]/kWh

  feedin:
    # Vergütung für ins Netz eingespeisten PV-Überschuss
    type: fixed
    price: 0.08 # [currency]/kWh
```

Mehr Beispiele und eine Übersicht der verfügbaren Anbieter findest du unter [Tarife](/de/tariffs).

## Zeitabhängige Netzentgelte {#charges-zones}

Über `charges` kannst du jeden Preiswert um einen festen Aufschlag pro kWh erhöhen.
Berechnet dein Netzbetreiber zeitabhängige Netzentgelte (z. B. nach § 14a EnWG in Deutschland), kannst du über `chargesZones` den Standardaufschlag `charges` für bestimmte Zeiträume überschreiben.
Das funktioniert mit jedem Netzbezugstarif, egal ob Anbieter-Template, `fixed`-Preis oder `custom`-Quelle.

Jede Zone hat folgende Felder:

| Feld      | Pflicht | Beschreibung                                                              |
| --------- | ------- | ------------------------------------------------------------------------- |
| `charges` | ja      | Aufschlag pro kWh in dieser Zone. Ersetzt den Standardwert aus `charges`. |
| `months`  | nein    | z. B. `Nov-Mar` oder `Jun`. Leer bedeutet ganzjährig.                     |
| `days`    | nein    | z. B. `Mon-Fri` oder `Sat,Sun`. Leer bedeutet täglich.                    |
| `hours`   | nein    | z. B. `17-20` oder `15:30-21`. Leer bedeutet ganztägig.                   |

**Beispiel**:

```yaml
tariffs:
  grid:
    type: template
    template: tibber
    token: "..."
    charges: 0.0941 # Standard-Netzentgelt pro kWh
    chargesZones:
      - months: Nov-Mar
        days: Mon-Fri
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

Bei benutzerdefinierten Tarifen (`type: custom`) kannst du über `features` das Verhalten beeinflussen:

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
