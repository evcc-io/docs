---
sidebar_position: 12
---

# `messaging`

evcc supports the transmission of status information via [Telegram](https://telegram.org), [PushOver](https://pushover.net), [ntfy](https://ntfy.sh), and many other services using the [shoutrrr](https://containrrr.dev/shoutrrr/) system. The configuration allows defining custom messages for specific events and systems.

`messaging` defines in sub-elements what and how to send. The events for which messages should be sent must be defined under `events` and the services through which the messages should be sent must be defined under `services`.

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

**For example**:

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` defines the text for the message title.

**For example**:

```yaml
title: Charge started
```

### `msg`

`msg` defines the text for the message content.
Various variables can be used to display evcc information in the text.

There are two syntax options:

- **Simple**: `${<variableName>}` — e.g. `${vehicleTitle}`, with optional formatting like `${pvPower:%.1fk}`
- **Go template**: `{{.variableName}}` — enables calculations, conditions, and [sprig functions](http://masterminds.github.io/sprig/)

:::note
When using variables, make sure to use the correct capitalisation (uppercase/lowercase)!
:::

#### Available Variables {#variables}

The available variables correspond to the data from the evcc REST API at `http://evcc.local:7070/api/state`.
When sending a message, the data of the triggering loadpoint and the global data are merged into a flat structure.
This means both global values (e.g. `pvPower`, `grid.Power`) and loadpoint-specific values (e.g. `mode`, `chargedEnergy`, `vehicleTitle`) are directly accessible.

A [selection of useful variables](#variable-reference) can be found at the bottom of this page.

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

:::note
To render the `msg` texts, you can also use the [go text/template](https://pkg.go.dev/text/template) syntax in combination with [sprig functions](http://masterminds.github.io/sprig/).
This enables calculations (e.g. converting W to kW) and conditional output.

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

:::

## `services`

`services` defines a list of message services to be used.

**For example**:

```yaml
services:
  - type: pushover
    app: 12345
    recipients:
      - 234567
```

The following sections will now explain all the required parameters.

### `type`

`type` defines the type of message service to be used.

**Possible values**:

- `pushover`: [Pushover](https://pushover.net/). See [`pushover`](#pushover) definition
- `telegram`: [Telegram Messenger](https://telegram.org/). See [`telegram`](#telegram) definition
- `email`: Email. See [`email`](#email) definition
- `shout`: [shoutrrr](https://containrrr.dev/shoutrrr/). See [`shout`](#shout) definition
- `ntfy`: [ntfy](https://ntfy.sh). See [`ntfy`](#ntfy) definition
- `custom`: Allows the usage of any [plugin](/docs/devices/plugins) that supports write access. See [`custom`](#custom) definition.

---

## Supported Services

### `pushover`

`pushover` uses the [Pushover](https://pushover.net/) service. Details can be found at [Pushover API](https://pushover.net/api).

**For example**:

```yaml
- type: pushover
  app: # API Token/Key of the created application in Pushover
  recipients:
    -  # List of recipients: either User Key or Delivery Group. Groups created in Pushover can be limited to specific devices.
  devices:
    - Johns phone
    - Mias ticker
```

### `telegram`

`telegram` uses the [Telegram Messenger](https://telegram.org/) service.

**For example**:

```yaml
- type: telegram
  token: # bot id : each running instance of evcc needs its own bot id
  chats:
    -  # List of chat or group IDs. Each entry requires a - sign in the beginning and must be in a separate line.
    - -GroupID #Note: Group IDs in Telegram have a - sign
    - ChatID
```

### `email`

`email` uses the [shoutrrr](https://containrrr.dev/shoutrrr) service.

Here, the parameter `uri` with the value `smtp://<user>:<password>@<host>:<port>/?fromAddress=<from>&toAddresses=<to>` is expected. The placeholders are to be replaced as follows:

- `<host>`: Address (hostname or IP address) of the email server
- `<port>`: Port address of the email server
- `<user>`: Username for the email server
- `<password>`: User password
- `<from>`: Sender's email address
- `<to>`: Recipient's email address

**For example**:

```yaml
- type: email
  uri: smtp://username:password@emailserver.domain:1234/?fromAddress=sender@mail.com&toAddresses=recipient@mail.com
```

### `shout`

`shout` uses the [shoutrrr](https://containrrr.dev/shoutrrr) service and supports all its services.

The configuration is shown in the following example using [Gotify](https://gotify.net/), and the same applies to the other options through the same method.

**For example**:

```yaml
- type: shout
  uri: gotify://gotify.example.com:443/AzyoeNS.D4iJLVa/?priority=1
```

Further information can be found in the [shoutrrr documentation](https://containrrr.dev/shoutrrr/v0.5/services/overview/) on [supported services](https://containrrr.dev/shoutrrr/v0.5/services/overview/).

### `ntfy`

`ntfy` uses the [ntfy](https://ntfy.sh) service.

Here, the parameter `uri` with the value `https://<host>/<topics>` is expected. The placeholders are to be replaced as follows:

- `<host>`: Address (hostname or IP address) of the ntfy server
- `<topics>`: Subscribed topic or topics

Optional parameters are `priority`, `tags` and `authtoken`. All parameters are passed as strings.

**For example**:

```yaml
- type: ntfy
  uri: https://ntfy.sh/evcctestalerts
  priority: default
  tags: electric_plug,blue_car
  authtoken: 61RgoYLOsi8S318j6ycU2qEsleC2p9njoyw4890121412JloH7rMPaqQwi5KWTit
```

Further information can be found in the [ntfy documentation](https://docs.ntfy.sh).

### `custom`

The `custom` type allows the use of any [plugin](/docs/devices/plugins) to process messages. The plugin must support write mode. The message itself is provided in the plugin configuration using the parameter `${send}` (or as a template parameter `{{.send}}`).

**Possible Values**:

- `send`: Defines the plugin to be used with the `source` field and plugin-specific parameters. See the example below.
- `encoding`: Specifies the format in which the value for `${send}` is provided. The possible values are:
  - `json`: The value is provided as a JSON object in the format `{ "msg": msg, "title": title }`. The `title` field is only added if it is defined in the `events` section.
  - `csv`: The fields `title` and `msg` are provided as a comma-separated list (`title, msg`).
  - `tsv`: Similar to `csv`, but with tab separators.
  - `title`: Only the title (`title`) is provided.

  If `encoding` is not defined, the `msg` value is used directly without the title. In this case, only the message defined in `msg` is used in `${send}`.

**Example**:

```yaml
messaging:
  events:
    connect:
      title: "Evcc: ${vehicleName} has connected"
      msg: "${vehicleTitle} was connected (Charging mode: ${mode})."
  services:
    - type: custom
      encoding: json
      send:
        # Plugin type
        source: script
        # Plugin-specific configuration.
        # {{.send}} contains the JSON message
        cmd: /usr/local/bin/evcc_message "{{.send}}"
```

In this example, a shell script (`cmd`) is invoked with the argument `{"title": "...", "msg": "...."}`.

## Variable Reference {#variable-reference}

The following list shows a selection of commonly used variables.
The complete list of all available fields can be found in the API response at `http://evcc.local:7070/api/state`.

### Loadpoint

The loadpoint data comes from the `loadpoints` array in the API response but is provided directly (without prefix) in messages.

- `title` - Loadpoint name
- `loadpoint` - Loadpoint number 1, 2, ...
- `mode` - Charge mode: `off`/`now`/`minpv`/`pv`
- `charging` - Charging active
- `enabled` - Charging enabled
- `connected` - Vehicle connected
- `chargedEnergy` - Energy charged in session in Wh
- `chargeDuration` - Charging duration
- `chargePower` - Current charge power in W
- `connectedDuration` - Connection duration
- `chargeRemainingDuration` - Remaining charge time until target
- `chargeRemainingEnergy` - Remaining energy until target in Wh
- `phasesActive` - Currently active phases
- `vehicleTitle` - Vehicle name
- `vehicleName` - Technical vehicle name
- `vehicleSoc` - Vehicle state of charge in %
- `vehicleRange` - Vehicle range in km
- `vehicleOdometer` - Odometer reading in km
- `sessionSolarPercentage` - Solar share of charging session in %
- `sessionPrice` - Cost of charging session
- `sessionPricePerKWh` - Average price per kWh
- `sessionCo2PerKWh` - Average CO₂ emissions per kWh
- `planActive` - Charge plan active
- `smartCostActive` - Smart cost charging active

### Global (Site)

The global data comes from the top level of the API response.

- `siteTitle` - Name of the evcc instance
- `pvPower` - Current solar power in W
- `homePower` - Current home consumption in W
- `grid.Power` - Grid import (+) / export (-) in W
- `battery.Power` - Battery power in W
- `battery.Soc` - Battery state of charge in %
- `currency` - Tariff currency
- `tariffGrid` - Current grid price per kWh
- `tariffFeedIn` - Feed-in tariff per kWh
- `tariffCo2` - Current CO₂ intensity
- `statistics` - Charging statistics, available for time periods `30d`, `365d`, `thisYear`, and `total`
  - `statistics.<period>.avgCo2` - Average CO₂ emissions per kWh
  - `statistics.<period>.avgPrice` - Average price per kWh
  - `statistics.<period>.chargedKWh` - Energy charged in kWh
  - `statistics.<period>.solarPercentage` - Solar share in %
