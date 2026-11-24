---
title: "messaging"
description: "Beschrijft hoe u in evcc.yaml meldingen instelt, bij welke laadgebeurtenissen ze worden verstuurd, hoe u ze met templates opstelt en via welke diensten ze aankomen."
sidebar:
  order: 13
translatedFrom: "3cc3fbca407b"
---

De sectie `messaging` configureert [meldingen](/nl/notifications) over laadsessies via diensten zoals Telegram, Pushover, ntfy of e-mail.
`events` legt vast bij welke gebeurtenissen berichten worden verstuurd en `services` legt vast via welke diensten ze worden verstuurd.

**Voorbeeld**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` definieert de berichtinhoud voor verschillende vooraf gedefinieerde gebeurtenissen.

De beschikbare gebeurtenissen zijn:

- `start`: Laden is gestart
- `stop`: Laden is gestopt
- `connect`: Voertuig verbonden
- `disconnect`: Voertuig losgekoppeld
- `soc`: Laadniveau van het voertuig gewijzigd
- `guest`: Onbekend voertuig gedetecteerd
- `asleep`: Voertuig laadt niet, hoewel laden is vrijgegeven
- `planoverrun`: Laadplan haalt naar verwachting zijn doel niet

**Voorbeeld**:

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` definieert de tekst voor de titel van het bericht.

### `msg`

`msg` definieert de tekst voor de inhoud van het bericht.
Titels en berichten ondersteunen plaatshouders, in de eenvoudige vorm `${variableName}` of als Go-templates (`{{.variableName}}`).
De beschikbare variabelen staan onder [berichtformaat](/nl/notifications#message-format).

**Voorbeeld** (eenvoudige syntaxis):

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

**Voorbeeld** (Go-templatesyntaxis met berekeningen en voorwaarden):

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

`services` definieert een lijst van te gebruiken berichtendiensten.

**Voorbeeld**:

```yaml
services:
  - type: template
    template: pushover
    app: 12345
    recipients:
      - 234567
```

De beschikbare diensten en hun parameters staan op de pagina [meldingen](/nl/notifications#services).
Elke dienstpagina toont een kant-en-klaar voorbeeld voor `evcc.yaml`.

Met `type: custom` kunt u daarnaast elke [plugin](/nl/reference/plugins) met schrijftoegang gebruiken.
Zie [gebruikergedefinieerde meldingsdienst](/nl/user-defined-devices#notification-service).
