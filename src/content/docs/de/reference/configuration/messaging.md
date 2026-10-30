---
title: "messaging"
description: "Lege in der evcc.yaml fest, bei welchen Ladeereignissen eine Nachricht verschickt wird, wie Titel und Text mit Platzhaltern aussehen und welche Dienste sie zustellen."
sidebar:
  order: 13
translatedFrom: "3cc3fbca407b"
---

Im Abschnitt `messaging` richtest du [Benachrichtigungen](/de/notifications) zu Ladevorgängen über Dienste wie Telegram, Pushover, ntfy oder E-Mail ein.
Unter `events` legst du fest, bei welchen Ereignissen eine Nachricht verschickt wird, und unter `services`, über welche Dienste sie ankommt.

**Beispiel**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

Unter `events` legst du den Nachrichteninhalt für die vordefinierten Ereignisse fest.

Die verfügbaren Ereignisse sind:

- `start`: Laden gestartet
- `stop`: Laden beendet
- `connect`: Fahrzeug angeschlossen
- `disconnect`: Fahrzeug getrennt
- `soc`: Ladestand des Fahrzeugs geändert
- `guest`: Unbekanntes Fahrzeug erkannt
- `asleep`: Fahrzeug lädt trotz Ladefreigabe nicht
- `planoverrun`: Ladeplan verfehlt voraussichtlich sein Ziel

**Beispiel**:

```yaml
start: # Ereignis Ladestart
  title: Laden gestartet
  msg: Laden im Modus "${mode}" gestartet
```

### `title`

`title` ist der Titel der Nachricht.

### `msg`

`msg` ist der eigentliche Nachrichtentext.
Titel und Nachricht unterstützen Platzhalter, entweder in der einfachen Form `${variableName}` oder als Go-Template (`{{.variableName}}`).
Die verfügbaren Variablen sind unter [Nachrichtenformat](/de/notifications#message-format) aufgeführt.

**Beispiel** (einfache Syntax):

```yaml
messaging:
  events:
    start:
      title: Laden gestartet
      msg: >-
        ${title} lädt ${vehicleTitle} im Modus ${mode}
    stop:
      title: Laden beendet
      msg: >-
        ${title}: ${vehicleTitle} hat ${chargedEnergy:%.1fk} kWh in ${chargeDuration} geladen.
        PV-Anteil: ${sessionSolarPercentage:%.0f}%
    connect:
      title: Fahrzeug angeschlossen
      msg: >-
        ${vehicleTitle} bei ${pvPower:%.1fk} kW PV-Leistung an ${title} angeschlossen
    disconnect:
      title: Fahrzeug getrennt
      msg: >-
        ${vehicleTitle} nach ${connectedDuration} von ${title} getrennt
```

**Beispiel** (Go-Template-Syntax mit Berechnungen und Bedingungen):

```yaml
messaging:
  events:
    start:
      title: "{{.vehicleTitle}}: Laden gestartet"
      msg: |
        {{.title}} lädt {{.vehicleTitle}} im Modus {{ toString .mode | upper }}.
        PV: {{round (divf .pvPower 1000) 1 }} kW
        Netz: {{round (divf .grid.Power 1000) 1 }} kW
        {{if .battery}}Hausbatterie: {{round (divf .battery.Power 1000) 1 }} kW ({{.battery.Soc }}%){{end}}
    stop:
      title: "{{.vehicleTitle}}: Laden beendet"
      msg: |
        {{.title}}: {{round (divf .chargedEnergy 1000) 1 }} kWh in {{.chargeDuration}}.
        PV-Anteil: {{round .sessionSolarPercentage 0 }}%
        {{- if .sessionPrice}}
        Kosten: {{round .sessionPrice 2 }} {{.currency}} ({{round .sessionPricePerKWh 2 }} {{.currency}}/kWh)
        {{- end}}
    connect:
      title: "{{.vehicleTitle}} angeschlossen"
      msg: |
        {{.vehicleTitle}} an {{.title}} angeschlossen.
        Ladestand: {{.vehicleSoc }}% ({{.vehicleRange }} km)
        PV: {{round (divf .pvPower 1000) 1 }} kW
    disconnect:
      title: "{{.vehicleTitle}} getrennt"
      msg: |
        {{.vehicleTitle}} nach {{.connectedDuration}} von {{.title}} getrennt.
```

## `services`

`services` enthält die Liste der Benachrichtigungsdienste, über die Nachrichten verschickt werden.

**Beispiel**:

```yaml
services:
  - type: template
    template: pushover
    app: 12345
    recipients:
      - 234567
```

Die verfügbaren Dienste und ihre Parameter sind auf der Seite [Benachrichtigungen](/de/notifications#services) aufgeführt.
Jede Dienstseite zeigt ein fertiges `evcc.yaml`-Beispiel.

Mit `type: custom` kannst du außerdem beliebige [Plugins](/de/reference/plugins) mit Schreibzugriff verwenden.
Details findest du im Abschnitt [benutzerdefinierter Benachrichtigungsdienst](/de/user-defined-devices#notification-service).
