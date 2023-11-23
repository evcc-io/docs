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

`msg` defines the text for the message content. Various variables in the format `${<variable name>}` can be used to display evcc information in the text.
:::note
When using variables, make sure to use the correct capitalisation (uppercase/lowercase)!
:::

**Useful messages for use in evcc notifications**:

| msg Variable             | Description                                                                     |
| ------------------------ | ------------------------------------------------------------------------------- |
| `${chargedEnergy:%.1fk}` | Energy amount charged in kWh                                                 |
| `${chargeDuration}`      | Charging duration                                                              |
| `${connectedDuration}`   | Charger connection duration                                                   |
| `${loadpoint}`           | Number of [`loadpoints`](loadpoints) (charging point) 1,2...                  |
| `${mode}`                | Active charging mode (see [`mode`](loadpoints/#mode) of [`loadpoints`](loadpoints)) |
| `${pvPower:%.1fk}`       | Currently measured PV power in kW                                            |
| `${title}`               | Charging point: Text from [`loadpoints`](loadpoints) [`title`](loadpoints/#title) parameter |
| `${vehicleTitle}`        | Vehicle: Text from [`vehicles`](vehicles) [`title`](vehicles/#title) parameter |

**For example**:

```yaml
  # Message examples using evcc variables
  # start
  msg: Charger ${title} started charging ${vehicleTitle} in ${mode} mode
  # stop
  msg: Charger ${title} finished charging ${vehicleTitle} with ${chargedEnergy:%.1fk}kWh in ${chargeDuration}
  # connect
  msg: ${vehicleTitle} connected on Charger ${title} at ${pvPower:%.1fk}kW PV
  # disconnect
  msg: ${vehicleTitle} disconnected of Charger ${title} after ${connectedDuration}
```

:::note
To render the `msg` texts, you can also use the [go text/template](https://pkg.go.dev/text/template) syntax in combination with [sprig functions](http://masterminds.github.io/sprig/).

```yaml
# Message config using evcc go-text-template rendering, evcc variables and sprig-functions
messaging:
  events:
    start: # charge start event
      title: Charge of {{.vehicleTitle}} started
      msg: |
        Charger {{.title}} started charging {{.vehicleTitle}} in {{ toString .mode | upper }} mode.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Grid power: {{round (divf .gridPower 1000) 3 }} kW
        Solar power: {{round (divf .pvPower 1000) 3 }} kW
        Home consumption: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Battery storage status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
    stop: # charge stop event
      title: Charge of {{.vehicleTitle}} finished
      msg: |
        Charger {{.title}} finished charging {{.vehicleTitle}} 
        with {{round (divf .chargedEnergy 1000) 2 }} kWh in {{.chargeDuration}}.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Grid power: {{round (divf .gridPower 1000) 3 }} kW
        Solar power: {{round (divf .pvPower 1000) 3 }} kW
        Home consumption: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Battery storage status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
    connect: # vehicle connect event
      title: "{{.vehicleTitle}} connected on Charger {{.title}}"
      msg: |
        {{.vehicleTitle}} connected on Charger {{.title}} at {{round (divf .pvPower 1000) 2 }} kW PV.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Grid power: {{round (divf .gridPower 1000) 3 }} kW
        Solar power: {{round (divf .pvPower 1000) 3 }} kW
        Home consumption: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Battery storage status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
    disconnect: # vehicle connected event
      title: "{{.vehicleTitle}} disconnected of Charger {{.title}}"
      msg: |
        {{.vehicleTitle}} disconnected of Charger {{.title}} after {{.connectedDuration}}.
        --------------------------
        evcc Status {{printf `(%d-%02d-%02d %02d:%02d:%02d)` now.Year now.Month now.Day now.Hour now.Minute now.Second}}
        Grid power: {{round (divf .gridPower 1000) 3 }} kW
        Solar power: {{round (divf .pvPower 1000) 3 }} kW


        Home consumption: {{round (divf .homePower 1000) 3 }} kW
        {{if .batteryConfigured}}Battery storage status: {{round (divf .batteryPower 1000) 3 }} kW ({{.batterySoc }} %){{end}}
```

:::

**List of all evcc-provided variables**:

The variables provided by evcc (also see /api/state) must be defined as `${<VariableName>}` or in the go-template format `{{<VariableName>}}` in the message text. Multiple variables in the message text are possible.

- Site
  - Configuration
    - [`siteTitle`](site) - Main headline of the evcc app (_string_)
    - [`prioritySoc`](site/#prioritysoc) - Minimum Powerwall state of charge in percent before [PV mode](loadpoints/#mode) release (_integer_)
  - Information
    - `batteryConfigured` - Indicator, home battery/Powerwall meter configured (_bool_)
    - `gridConfigured` - Indicator, smart/grid meter configured (_bool_)
    - `pvConfigured` - Indicator, solar panels/photovoltaic meter configured (_bool_)
- Tariff Information
  - [`currency`](tariffs) - Tariff currency (_string_)
  - [`tariffFeedIn`](tariffs/#feedin) - PV feed-in remuneration per kWh in tariff currency (float)
  - [`tariffGrid`](tariffs/#grid) - Grid consumption price per kWh in tariff currency (float)
- Meter Information
  - `batteryPower` - Current home battery/Powerwall power in watts (_float_)
  - `batterySoc` - Current state of charge of home battery/Powerwall in percent (_integer_)
  - `gridPower` - Current grid feed-in(-) or consumption(+) in watts (_float_)
  - `homePower` - Current home consumption power (excluding Charger consumption) in watts (_float_)
  - `pvPower` - Current solar panels power in watts (_float_)
- Charging Point (loadpoint)
  - Configuration
    - [`loadpoint`](loadpoints) - Loadpoint index (_integer_)
    - [`maxCurrent`](loadpoints#maxcurrent) - Maximum charging current in amperes (_float_)
    - [`minCurrent`](loadpoints#mincurrent) - Minimum charging current in amperes (_float_)
    - [`minSoc`](loadpoints#min) - Minimum state of charge of the vehicle battery in percent (_integer_)
    - [`mode`](loadpoints/#mode) - Initial mode of the charging point after evcc start `off`/`now`/`min`/`pv` (_string_)
    - [`phases`](loadpoints/#phases) - Initial active number of phases of the charging point after evcc start (_integer_)
    - [`targetSoc`](loadpoints#target) - Target state of charge of the vehicle battery in percent (_integer_)
    - [`title`](loadpoints/#title) - Label of the charging point in the evcc app (_string_)
  - Information
    - `activePhases`- Currently active number of phases of the charging point (_integer_)
    - `chargeCurrent` - Current total charging current in amperes (_float_)
    - `chargeCurrents` - Current charging current per active phase in amperes (_float_)
    - `chargeDuration` - Charging duration in nanoseconds (_integer_)
    - `chargePower` - Current charging power in watts (_float_)
    - `chargeRemainingDuration` - Charging time in nanoseconds until the target state of charge (_integer_)
    - `chargeRemainingEnergy` - Required energy until the target state of charge in watt-hours (_float_)
    - `chargedEnergy` - Energy charged so far in watt-hours (_float_)
    - `charging` - Indicator, charging process active (_bool_)
    - `enabled` - Indicator, charging enabled (_bool_)
    - `hasVehicle` - Indicator, vehicle definitions assigned to the charging point (_bool_)
    - `targetTime` - Target charging time in nanoseconds since 1970 UTC (_integer_)
    - `pvAction` - Control variable for PV timer control `enable`/`disable` (_string_)
    - `pvRemaining` - Required PV remaining charging time with activated timer control in nanoseconds (_integer_)
- Vehicles (vehicles)
  - Configuration
    - [`vehicleCapacity`](vehicles/#capacity)- Capacity of the vehicle battery in watt-hours (_float_)
    - [`vehicleTitle`](vehicles/#title) - Label of the vehicle in the evcc app (_string_)
  - Information
    - `climater` - Status of vehicle climatisation `on`/`off`/`heating`/`cooling` (_string_)
    - `connected` - Indicator, vehicle connected to the charging point (_bool_)
    - `connectedDuration` - Duration of vehicle connection in nanoseconds (_integer_)
    - `vehicleOdometer` - Current vehicle odometer reading in kilometers (_float_)
    - `vehiclePresent` - Indicator, evcc can access vehicle data (_bool_)
    - `vehicleRange` - Current vehicle range in kilometers (_float_)
    - `vehicleSoc` - Current state of charge of the vehicle battery in percent (_integer_)
- Savings Efficiency Information
  - `savingsAmount` - Sum of evcc savings (_float_)
  - `savingsEffectivePrice` - Calculated savings price (_float_)
  - `savingsGridCharged` - Consumed grid energy in Wh (_float_)
  - `savingsSelfConsumptionCharged` - Consumed solar energy in Wh (_float_)
  - `savingsSelfConsumptionPercent` - Percentage of consumed solar energy in Wh (_float_)
  - `savingsSince` - Time period of savings calculation in nanoseconds (_integer_)
  - `savingsTotalCharged` - Total energy consumed in Wh (_float_)
- Charging Session Information
  - `sessionSolarPercentage` - Solar percentage of the session
  - `sessionPrice` - Price of the charged energy of the session
  - `sessionPricePerKWh` - Average price of energy per kWh of the session
  - `sessionCO<sub>2</sub>PerKWh` - Average CO<sub>2</sub> emissions per kWh
- Sponsor
  - Configuration
    - [`auth`](sponsortoken) - Authentication token of the evcc sponsor (_string_)
  - Information
    - `sponsor` - Name of the evcc sponsor (_string_)

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
- `shout`: [shoutrrr](https://contain

rrr.dev/shoutrrr). See [`shout`](#shout) definition
- `script`: Can initiate external scripts to send messages. It's also useful to include any kind of external functionality. See [`script`](#script) definition

**For example**:

```yaml
services:
  - type: pushover
```

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

Optional parameters are `priority` and `tags`. All parameters are passed as strings.

**For example**:

```yaml
- type: ntfy
  uri: https://ntfy.sh/evcctestalerts
  priority: default
  tags: electric_plug,blue_car
```

Further information can be found in the [ntfy documentation](https://docs.ntfy.sh).

### `script`

`script` starts shell scripts or other commands to send messages or start any action based on the [events](#events).

The path to the script must be specified in `cmdline`. Likewise, a `timeout` should be set. The `timeout` specifies after how much time the script will be aborted.

**For example**:

```yaml
- type: script
  cmdline: /home/pi/sendSignalMessage.sh
  timeout: 50s
```
