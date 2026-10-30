---
title: "messaging"
description: "Popisuje, jak v evcc.yaml nastavit oznámení, tedy které události nabíjení spouštějí zprávu, jak psát šablony zpráv a které služby je mohou doručit."
sidebar:
  order: 13
translatedFrom: "3cc3fbca407b"
---

Sekce `messaging` konfiguruje [oznámení](/cs/notifications) o nabíjecích relacích přes služby jako Telegram, Pushover, ntfy nebo e-mail.
`events` určuje, pro které události se zprávy odesílají, `services` určuje, kam se odesílají.

**Příklad**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` určuje obsah zpráv pro různé předdefinované události.

K dispozici jsou tyto události:

- `start`: Nabíjení začalo
- `stop`: Nabíjení skončilo
- `connect`: Vozidlo připojeno
- `disconnect`: Vozidlo odpojeno
- `soc`: Změnil se stav nabití vozidla
- `guest`: Rozpoznáno neznámé vozidlo
- `asleep`: Vozidlo nenabíjí, přestože je nabíjení povoleno
- `planoverrun`: Plán nabíjení podle odhadu nesplní svůj cíl

**Příklad**:

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` určuje text nadpisu zprávy.

### `msg`

`msg` určuje text obsahu zprávy.
Nadpisy i zprávy podporují zástupné symboly, buď v jednoduché podobě `${variableName}`, nebo jako šablony Go (`{{.variableName}}`).
Dostupné proměnné jsou uvedeny v části [formát zprávy](/cs/notifications#message-format).

**Příklad** (jednoduchá syntaxe):

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

**Příklad** (syntaxe šablon Go s výpočty a podmínkami):

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

`services` určuje seznam služeb pro zasílání zpráv, které se mají použít.

**Příklad**:

```yaml
services:
  - type: template
    template: pushover
    app: 12345
    recipients:
      - 234567
```

Dostupné služby a jejich parametry jsou uvedeny na stránce [oznámení](/cs/notifications#services).
Stránka každé služby obsahuje příklad `evcc.yaml` připravený k použití.

Kromě toho `type: custom` umožňuje použít libovolný [plugin](/cs/reference/plugins) s přístupem pro zápis.
Viz [služba oznámení definovaná uživatelem](/cs/user-defined-devices#notification-service).
