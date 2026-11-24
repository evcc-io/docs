---
title: "messaging"
description: "Sådan opsætter du notifikationer i evcc.yaml, vælger de opladningshændelser, der udløser en besked, skriver beskedskabeloner og vælger tjenesterne, der leverer dem."
sidebar:
  order: 13
translatedFrom: "3cc3fbca407b"
---

Sektionen `messaging` konfigurerer [notifikationer](/da/notifications) om opladningssessioner via tjenester som Telegram, Pushover, ntfy eller e-mail.
`events` angiver, ved hvilke hændelser der sendes beskeder, og `services` angiver, hvor de sendes hen.

**Eksempel**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` angiver beskedens indhold for forskellige foruddefinerede hændelser.

De tilgængelige hændelser er:

- `start`: Opladningen er startet
- `stop`: Opladningen er stoppet
- `connect`: Køretøj tilsluttet
- `disconnect`: Køretøj frakoblet
- `soc`: Køretøjets opladningsniveau er ændret
- `guest`: Ukendt køretøj registreret
- `asleep`: Køretøjet oplader ikke trods godkendelse til opladning
- `planoverrun`: Ladeplanen forventes ikke at nå sit mål

**Eksempel**:

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` angiver teksten til beskedens titel.

### `msg`

`msg` angiver teksten til beskedens indhold.
Titler og beskeder understøtter pladsholdere, enten i den simple form `${variableName}` eller som Go-skabeloner (`{{.variableName}}`).
De tilgængelige variabler er angivet under [beskedformat](/da/notifications#message-format).

**Eksempel** (simpel syntaks):

```yaml
messaging:
  events:
    start:
      title: Charging started
      msg: >-
        ${title} charging ${vehicleTitle} in ${mode} mode
    stop:
      title: Charging finished
      msg: >-
        ${title}: ${vehicleTitle} charged ${chargedEnergy:%.1fk}kWh in ${chargeDuration}.
        Solar share: ${sessionSolarPercentage:%.0f}%
    connect:
      title: Vehicle connected
      msg: >-
        ${vehicleTitle} connected to ${title} at ${pvPower:%.1fk}kW solar
    disconnect:
      title: Vehicle disconnected
      msg: >-
        ${vehicleTitle} disconnected from ${title} after ${connectedDuration}
```

**Eksempel** (Go-skabelonsyntaks med beregninger og betingelser):

```yaml
messaging:
  events:
    start:
      title: "{{.vehicleTitle}}: Charging started"
      msg: |
        {{.title}} charging {{.vehicleTitle}} in {{ toString .mode | upper }} mode.
        Solar: {{round (divf .pvPower 1000) 1 }} kW
        Grid: {{round (divf .grid.Power 1000) 1 }} kW
        {{if .battery}}Battery: {{round (divf .battery.Power 1000) 1 }} kW ({{.battery.Soc }} %){{end}}
    stop:
      title: "{{.vehicleTitle}}: Charging finished"
      msg: |
        {{.title}}: {{round (divf .chargedEnergy 1000) 1 }} kWh in {{.chargeDuration}}.
        Solar share: {{round .sessionSolarPercentage 0 }}%
        {{- if .sessionPrice}}
        Cost: {{round .sessionPrice 2 }} {{.currency}} ({{round .sessionPricePerKWh 2 }} {{.currency}}/kWh)
        {{- end}}
    connect:
      title: "{{.vehicleTitle}} connected"
      msg: |
        {{.vehicleTitle}} connected to {{.title}}.
        SoC: {{.vehicleSoc }}% ({{.vehicleRange }} km)
        Solar: {{round (divf .pvPower 1000) 1 }} kW
    disconnect:
      title: "{{.vehicleTitle}} disconnected"
      msg: |
        {{.vehicleTitle}} disconnected from {{.title}} after {{.connectedDuration}}.
```

## `services`

`services` angiver en liste over beskedtjenester, der skal bruges.

**Eksempel**:

```yaml
services:
  - type: template
    template: pushover
    app: 12345
    recipients:
      - 234567
```

De tilgængelige tjenester og deres parametre er angivet på siden [notifikationer](/da/notifications#services).
Hver tjenestes side viser et `evcc.yaml`-eksempel, der er klar til brug.

Derudover giver `type: custom` mulighed for at bruge et vilkårligt [plugin](/da/reference/plugins) med skriveadgang.
Se [brugerdefineret notifikationstjeneste](/da/user-defined-devices#notification-service).
