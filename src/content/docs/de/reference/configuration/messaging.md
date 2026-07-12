---
title: "messaging"
sidebar:
  order: 12
---

Der Abschnitt `messaging` konfiguriert [Benachrichtigungen](/de/notifications) über Ladevorgänge per Diensten wie Telegram, Pushover, ntfy oder E-Mail.
Unter `events` wird definiert, für welche Ereignisse Nachrichten verschickt werden, unter `services`, wohin sie verschickt werden.

**Beispiel**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` definiert den Nachrichteninhalt für verschiedene vordefinierte Ereignisse.

Die verfügbaren Ereignisse sind:

- `start`: Laden hat begonnen
- `stop`: Laden wurde beendet
- `connect`: Fahrzeug angeschlossen
- `disconnect`: Fahrzeug entfernt
- `soc`: Fahrzeug Akku-Ladestandsänderung
- `guest`: Unbekanntes Fahrzeug erkannt
- `asleep`: Fahrzeug lädt nicht trotz Ladefreigabe
- `planoverrun`: Ladeplan verfehlt voraussichtlich sein Ziel

**Beispiel**:

```yaml
start: # charge start event
  title: Laden gestartet
  msg: Laden im Modus "${mode}" gestartet
```

### `title`

`title` definiert den Text für den Nachrichtentitel.

### `msg`

`msg` definiert den Text für den Nachrichteninhalt.
Titel und Nachricht unterstützen Platzhalter, entweder in der einfachen Form `${variablenName}` oder als Go-Template (`{{.variablenName}}`).
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
        ${title}: ${vehicleTitle} geladen mit ${chargedEnergy:%.1fk}kWh in ${chargeDuration}.
        Sonnenanteil: ${sessionSolarPercentage:%.0f}%
    connect:
      title: Fahrzeug verbunden
      msg: >-
        ${vehicleTitle} verbunden an ${title} bei ${pvPower:%.1fk}kW PV
    disconnect:
      title: Fahrzeug getrennt
      msg: >-
        ${vehicleTitle} getrennt von ${title} nach ${connectedDuration}
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
        {{if .battery}}Batterie: {{round (divf .battery.Power 1000) 1 }} kW ({{.battery.Soc }} %){{end}}
    stop:
      title: "{{.vehicleTitle}}: Laden beendet"
      msg: |
        {{.title}}: {{round (divf .chargedEnergy 1000) 1 }} kWh in {{.chargeDuration}}.
        Sonnenanteil: {{round .sessionSolarPercentage 0 }}%
        {{- if .sessionPrice}}
        Kosten: {{round .sessionPrice 2 }} {{.currency}} ({{round .sessionPricePerKWh 2 }} {{.currency}}/kWh)
        {{- end}}
    connect:
      title: "{{.vehicleTitle}} verbunden"
      msg: |
        {{.vehicleTitle}} verbunden an {{.title}}.
        Ladestand: {{.vehicleSoc }}% ({{.vehicleRange }} km)
        PV: {{round (divf .pvPower 1000) 1 }} kW
    disconnect:
      title: "{{.vehicleTitle}} getrennt"
      msg: |
        {{.vehicleTitle}} getrennt von {{.title}} nach {{.connectedDuration}}.
```

## `services`

`services` definiert eine Liste der zu verwendenden Nachrichtendienste.

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

Zusätzlich ermöglicht `type: custom` die Nutzung beliebiger [Plugins](/de/reference/plugins) mit Schreibzugriff.
Siehe [benutzerdefinierter Benachrichtigungsdienst](/de/user-defined-devices#notification-service).
