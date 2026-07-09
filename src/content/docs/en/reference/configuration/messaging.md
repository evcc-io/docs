---
title: "messaging"
sidebar:
  order: 12
---

The `messaging` section configures [notifications](/en/notifications) about charging sessions via services like Telegram, Pushover, ntfy, or email.
`events` defines for which events messages are sent, `services` defines where they are sent to.

**For example**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` defines the message content for various predefined events.

The available events are:

- `start`: Charging has started
- `stop`: Charging has stopped
- `connect`: Vehicle connected
- `disconnect`: Vehicle disconnected
- `soc`: Vehicle battery state of charge changed
- `guest`: Unknown vehicle detected
- `asleep`: Vehicle not charging despite charge release
- `planoverrun`: Charging plan projected to miss its target

**For example**:

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` defines the text for the message title.

### `msg`

`msg` defines the text for the message content.
Titles and messages support placeholders, either in the simple `${variableName}` form or as Go templates (`{{.variableName}}`).
The available variables are listed under [message format](/en/notifications#message-format).

**Example** (simple syntax):

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

**Example** (Go template syntax with calculations and conditions):

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

`services` defines a list of message services to be used.

**For example**:

```yaml
services:
  - type: template
    template: pushover
    app: 12345
    recipients:
      - 234567
```

The available services and their parameters are listed on the [notifications](/en/notifications#services) page.
Each service page shows a ready-to-use `evcc.yaml` example.

In addition, `type: custom` allows the use of any [plugin](/en/reference/plugins) with write access.
See [user-defined notification service](/en/user-defined-devices#notification-service).
