---
sidebar_position: 3
---

# Loadpoints

_Loadpoints_ (Ladepunkte) ist eine Liste von Ladepunkten und kombiniert für jeden Ladepunkt eine Wallbox, Fahrzeuge und falls notwendig einen Zähler mit weiteren optionalen Parametern. Eine minimale Konfiguration erfordert eine Wallbox.

Ein Ladepunkt hat mindestens folgende Parameter:
- `title`: Eine Beschreibung des Ladepunktes, wird in der UI angezeigt
- `charger`: Referenz auf eine `charger` (Wallbox) Konfiguration 
- `vehicles`: Eine Liste von Referenzen auf Konfigurationen von `vehicles` (Fahrzeugen)

Referenzen sind hierbei immer die Werte des Parameters `name` (z.B. `wallbox`) in der jeweiligen Gerätekonfiguration.

Falls die Wallbox nicht über eine intergrierte Strommesseinheit verfügt, kann hierfür auch ein Zähler angegeben werden.
- `meters`:
  - `charge`: Referenze auf eine `meter` (Zähler) Konfiguration

Zusätzlich wird beim Ladepunkt auch ein Standard-Lademodus gesetzt, welche beim Start von EVCC aktiv ist. Folgende Modi werden unterstützt:

- **Off**: Das Laden ist gestoppt, auch wenn ein Fahrzeug an der Wallbox angeschlossen ist.
- **Now**: Lade sofort mit der maximalen möglichen Leistung.
- **MinPV**: Lade sofort mit der minimal möglichen Leistung. Falls genug PV Überschuss vorhanden ist, lade schneller.
- **PV**: Lade nur mit PV Überschuss und pausiere wenn nicht genug Leistung verfügbar ist.

Im allgemeinen benötigt ein EV mindestens 1,4kW Leistung pro Phase um zu Laden. Bei Wallboxen und Fahrzeugen welche über den ISO15118 Standard kommunizieren, wird insgesamt mindestens 1,4kW Leistung benötigt, egal mit wievielen Phasen geladen wird.

Beispiel:
```yaml
loadpoints:
- title: Garage # display name for UI
  charger: wallbox # charger reference
  vehicles:
    - audi # vehicle reference
  meters:
    charge: sdm630 # grid meter reference
  mode: pv # charge mode (off, now, minpv, pv)
```

Weitere Optionen sind in der Datei `evcc.dist.yaml` beschrieben.