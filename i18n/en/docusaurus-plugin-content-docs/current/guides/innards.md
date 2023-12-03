---
sidebar_position: 4
---

import SponsorshipRequired from "/docs/_sponsorship_required.mdx";

# How does Solar mode work - a look into the innards

The magic of evcc happens in the Solar mode, where the vehicle is charged with surplus from your photovoltaic system. For calulating the power available for charging, an electric meter measuring the power on your grid connection point (grid meter) is important. Power generated by the photovoltaic system can also be measured and displayed, but has no effect on the function, [except if no grid meter is available](./meters#i-have-a-solar-installation-but-i-dont-have-a-readable-grid-connection-meter---can-i-still-use-evcc). Evcc also considers power consumption by batteries and other devices, which may be diverted to vehicle charging depending on your priorities. 

The system constantly monitors the `available charging power` and starts the charging process if it exceeds the minimum power required for the vehicle (`minimum charging power`). If the `available charging power` changes, evcc adapts the charging power or stops charging accordingly.

The Solar mode is highly customizable, and can therefore adapt to many different setups and requirements. Before you read this page, make sure you are familiar with the [structure of the configuration](../reference/configuration/). On this page, we will leave aside the details of how devices are integrated with evcc but will focus on how different inputs and settings define the Solar mode' control of your vehicle’s charging. The following diagram shows these, with blue being settings that define inputs and green other configuration parameters:

![relevant configuration](img/evcc-innards-er.png)

Evcc is just in process of migrating from file-based to user-interface-based configuration. Most parameters still need to be set in `evcc.yaml`, but the battery settings can already be done on the user interface and will be saved in the evcc database. 

## Inputs and outputs

The inputs defined in `evcc.yaml` connect evcc to various other devices in your system, enabling the interactions shown in the next diagram:

![inputs and outputs](img/evcc-innards-i-o.png)

## Calculation of `available charging power`

So, having laid the groundwork, let’s start talking about how the Solar mode works. When in Solar mode, evcc constantly calculates the `available charging power` (surplus) based on the metering inputs shown in the diagram above:

- The most important factor is [grid power](../reference/configuration/site/#metersgrid), which shows available surplus that is fed into the grid.
- With [data from battery systems](../reference/configuration/site/#metersbattery) that are also charged with surplus, evcc can depending on their charge level prioritize vehicle charging. It does that by increasing the charging power of the vehicle, practically forcing the battery to reduce or stop charging. See also the third use case described further below. 
- The same can be done for [other devices](../reference/configuration/site/#metersaux) operated with surplus (“aux” devices).
- The output of your [PV system](../reference/configuration/site/#meterspv) can also be measured, mostly for display purposes. Only if [grid power cannot be measured](./meters#i-have-a-solar-installation-but-i-dont-have-a-readable-grid-connection-meter---can-i-still-use-evcc), you can use PV power and a constant value for assumed house consumption to approximate surplus.
- The actual charging power consumed by the [charger](../devices/chargers) is also measured. If the charger itself does not provide this measurement, [a separate meter](../reference/configuration/loadpoints#meter) can be used. If that is not available as well, then instead the power last set by evcc will be used.

Also important is the integration with your [vehicle](../reference/configuration/vehicles/), which allows evcc to determine its state-of-charge and implement charge limits and charging plans.

And last but not least there are different configuration parameters available for customizing the Solar mode:

- The power level set for [site.residualPower](../reference/configuration/site/#residualpower) is incorporated into the available charging power.
- [loadpoint.enable](../reference/configuration/loadpoints#enable)/[disable](../reference/configuration/loadpoints#disable) thresholds control when charging is started and stopped.
- [loadpoint.phases](../reference/configuration/loadpoints#phases)/[minCurrent](../reference/configuration/loadpoints#mincurrent)/[maxCurrent](../reference/configuration/loadpoints#maxcurrent) define the minimum and maximum charging power.
- [site.prioritySoc](../reference/configuration/site/#prioritysoc)/[bufferSoc](../reference/configuration/site/#buffersoc)/[bufferStartSoc](../reference/configuration/site/#bufferstartsoc) define priorities between battery and vehicle charging.
- [loadpoint.priority](../reference/configuration/loadpoints/#priority) defines priorities between multiple chargers.
- [site.maxGridSupplyWhileBatteryCharging](../reference/configuration/site/#maxgridsupplywhilebatterycharging) deals with situations where vehicle charging is prioritized over battery charging but measured battery power cannot be fully diverted due to limits in the DC/AC interface of the inverter.

The following diagram shows in detail how all these variables are factored into the calculation of `available charging power` and starting and stopping the charging process. Its main focus lies on Solar mode in combination with a battery system, but it also covers how systems without battery work as well as the Min+Solar mode. The formulas are not necessarily those programmed into evcc, but rather provide a mathematical model that helps understanding how the software works: 

![available charging power calculation](img/evcc-innards-logic.png)

## Minimum charging power and phases

In the diagram above, you can see that the `minimum charging power` is calculated from `minCurrent` and the `phases` setting. If your charger supports automatic switching between 1-phase and 3-phase charging, you can have evcc manage that by setting `phases=0`. If `available charging power` allows it, the system will use three phases, otherwise only one.

Note that the `minCurrent` and `maxCurrent` settings apply to both 1-phase and 3-phase charging. Depending on the range of those settings in your system, you’ll likely have gap between 1-phase and 3-phase charging, were evcc needs to continue charging with the `maximum charging power` of one phase and additional surplus has to be fed into the grid or a battery. The following diagram shows the calculations and the resulting gap:

![minimum charging power and phases](img/evcc-innards-phases.png)

## Timing: `interval` and delays

The calculation of available charging power and resulting actions and adjustments are executed in the [interval](../reference/configuration/interval/) defined in the configuration file. Therefore evcc does not react to any change in the inputs but only to the state detected at each interval, as the next diagram illustrates:

![interval](img/evcc-innards-interval.png)

The time in between the `intervals` gives the charger or other device represented by the loadpoint as well as other surplus-controlled devices chances to react before the state is checked again and further adjustments are made.

To avoid vehicle charging being started and stopped in the typically relatively short `intervals`, several delays are applied:

- [loadpoint.enable:delay](../reference/configuration/loadpoints/#delay) defines the time the enable threshold must be met before charging is started. Also applies to switching from 1-phase to 3-phase charging.
- [loadpoint.disable:delay](../reference/configuration/loadpoints/#delay-1) defines the time the disable threshold must be met before charging is stopped. Also applies to switching from 3-phase to 1-phase charging.
- [loadpoint.guardduration](../reference/configuration/loadpoints/#guardduration) defines the time that after starting charging must pass before charging can be stopped again, and vice versa the time that must pass after stopping before charging can start again.

The next diagram shows the application of those settings and their relationship with the control cycle `interval`:

![interval](img/evcc-innards-delays.png)

## Timing: multiple `loadpoints`

If you have two or more `loadpoints`, at each `interval` only one will be calculated and adjusted. This way each `loadpoint` represents its own independent control circuit. The control circuit of each `loadpoint` only takes into account the measurement inputs from the devices represented by the other loadpoints, but is not aware of their ongoing adjustments or delay timers. The next diagram shows these independent control circuits for two `loadpoints`. As example, we have Loadpoint A with lower priority grabbing surplus first but then releasing it again, after Loadpoint B with higher priority also starts charging:

![interval](img/evcc-innards-delays.png)


### What do the different Charge Modes do?

| Mode            | Description                                                                                                                                                                                            |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stop**        | No charging occurs - if a session was in progress, it is stopped immediately.                                                                                                                          |
| **Fast**        | Charging proceeds at the maximum rate possible.                                                                                                                                                        |
| **Min + Solar** | Charging proceeds at the _slowest_ rate possible. If enough excess solar is available to increase performance, this is made available to the Charger.                                                  |
| **Solar**       | Charging proceeds _utilising only excess solar power_. If excess solar does not exceed the minimum charge rate, charging stops. [More Details](#i-have-solar-excess-but-the-vehicle-doesnt-charge-why) |

### I have Solar excess, but the vehicle doesn't charge. Why?

Unfortunately, vehicles cannot be charged with any amount of power desired - there are minimum and maximum rates. These are defined by various standards:

[IEC 61851](https://en.wikipedia.org/wiki/IEC_61851) (vehicle charging systems) defines a minimum charge speed of 6 Amps per phase,
and depending on the configuration in `evcc.yaml`, a maximum of 16 or 32 amps.

That means:

- **Single-Phase Charging** - 1.4kW minimum, up to 3.6kW (16A) or 7.2kW (32A)
- **Two-Phase Charging** - 2.8kW minimum, up to 7.2kW (16A) or 14.4kW (32A)
- **Three-Phase Charging** - 4.2kW minimum, up to 11kW (16A) or 22kW (32A)

The newer standard [ISO 15118](https://de.wikipedia.org/wiki/ISO_15118) is supported on DC Chargers, along with a small number of Vehicles and AC Charge Points (this probably doesn't apply to you). This supports a ~1.4kW minimum, regardless of the number of phases.

When using the Charge Mode **Solar**, a Solar Excess greater than the minimum relevant value must be available before charging begins. If this Excess is not available, then after a configurable length of time, charging is stopped.

Solar Excess is calculated by monitoring the feed-in power delivered back to the Grid. Excess calculation (and, indeed, the Solar Charge Mode) therefore does not function if this is not available.

### I have a house battery, and it's being discharged to charge my vehicle. Help!

In general, evcc cannot directly influence charging and discharging of the house battery - the energy management system of that battery is responsible for that.

House Batteries generally play by a few sets of rules:

1. **House battery charges**:

- If it's not full (excluding prognosis-based charging) and Solar Surplus is available
- If the battery's State of Charge is below a defined minimum level
- If the Battery Management System (BMS) determines that some kind of charging is required, e.g for cell balancing
- and many, many more other arcane scenarios

2. **House battery does not charge**:

- If it's full
- If the battery's Energy Management System determines using prognosis-based charging (sometimes using Solar Forecasting and historical consumption) that waiting to charge until later in the day would be a better idea
- and many, many more other arcane scenarios

With evcc in the mix, there are more possible scenarios:

1. **`Fast` and `Min + Solar`**

The House Battery is ignored, because the focus is on charging the vehicle as quickly as possible - regardless of where that energy comes from.

2. **`Solar`**

- evcc regulates the charging power depending on the available Solar Excess.
- Charging only starts if the Solar Excess exceeds the minimum required for a configured duration ([Standard: 1 Minute](/docs/reference/configuration/loadpoints#enable)).
- Charging stops if the Solar Excess falls below this minimum for a configured duration ([Standard: 1 Minute](/docs/reference/configuration/loadpoints#disable)).
- However, there may be fluctuations in energy production / consumption that fall outside the configured [Update Interval](/docs/reference/configuration/interval). This means that if there is too little Solar Excess, the "missing energy" has to come from somewhere, which usually means that the battery's Energy Management System jumps in and supplies energy to ensure that energy is not imported from the grid. This cannot usually be prevented.
- evcc does have some options to help regulate the battery. These include
  - [prioritySoC](/docs/reference/configuration/site#prioritysoc) will prioritise charging the House Battery up until it reaches a defined State of Charge. Once that occurs, battery charging power is interpreted as available Solar Excess (_Vehicle First, Home Second_)
  - [bufferSoC](/docs/reference/configuration/site#buffersoc) will discharge the House Battery so long as it is above the defined State of Charge (_Battery Supported Charging_).

### There's Solar Excess available, but charging has stopped before the vehicle's target State of Charge has been reached.

This usually happens when a target State of Charge is set and reached _on the vehicle itself_. Try setting the vehicle's target State of Charge higher than evcc's.

### Why is charging proceeding at full power when the vehicle is not recognised?

This happens when evcc's Minimum State of Charge is set to something greater than 0.

The Minimum State of Charge feature supplies full power to the Vehicle if its State of Charge is lower than a defined minimum, in order to ensure that some kind of range is always available to use.

If the vehicle's State of Charge cannot be determined for some reason, charging starts to ensure that range is always available.

### "Probleme" i.V.m. Gastfahrzeug

:::note
This section is not translated due to unclear German origins. Please contribute an English translation!
:::

Da man bei einem Gastfahrzeug keine Einstellungen definieren kann, gelten immer die Einstellungen vom Loadpoint.

Dies kann zu ungünstigem Ladeverhalten (z.B. unnötige Einspeisung) führen.

Beispiele:

- Am Loadpoint ist `phases: 3` definiert ist. Das Gastfahrzeug kann aber nur 1-phasig laden. Dann startet die Ladung im PV-Modus trotzdem erst ab 4,2kW Überschuss.
- Am Loadpoint mit automatischer Phasenumschaltung ist `maxcurrent: 32` definiert. Das Gastfahrzeug kann aber nur maximal mit 16A (3,7kW@1p) laden. Dann findet die Phasenumschaltung von 1p auf 3p erst bei 7,4kW Überschuss statt.

Abhilfe schafft hier die Definition eines (oder mehrerer) Offline-Vehicle. Bei diesen können die entsprechenden Parameter (`phases`, `mincurrent`, `maxcurrent`) definiert werden.

### Notes on RFID

Some Chargers start charging as soon as a valid RFID card is presented. evcc should either interrupt charging or throttle it as required after a short delay.

### Error: Charger out of sync: expected disabled, got enabled // Charger logic error: disabled but charging

evcc expects chargers to have switched to their new state before the next check cycle (after the configured `interval`).

Some devices can sometimes react a little slowly to commands - if this happens, that desynchronisation of state is flagged with these error messages.

If you're not experiencing any other issues, these can safely be ignored, or you can try increasing the `interval`.

### Solar Production in Winter

In the Winter months, Solar production is often regularly below the configured [Minimum](#i-have-solar-excess-but-the-vehicle-doesnt-charge-why). In order to get as much energy into the Vehicle as possible, you can try some of the following tips and tricks:

#### Using `residualpower`

In the configuration under the [`site`](/docs/reference/configuration/site) flag, set [`residualPower`](/docs/reference/configuration/site#residualpower) to a **negative** value. This determines how much power the grid can supply to nudge your solar production up enough to cover the minimum. Changes are possible via the API.

**Exmaple**:

```yaml
site:
  residualPower: -1000 # 1000W grid cover in Solar mode
```

The disadvantage of this solution is that the grid power is used even when sufficient excess is available.

#### With `enable/disable`

In the configuration under the [`loadpoints`](/docs/reference/configuration/loadpoints) flag, you can tweak the `enable` and `disable` logic to suit. Changes to the `threshold` value are possible via the API.

**Example**:

```yaml
loadpoints:
  enable:
      delay: 1m
      threshold: -200 # Charging starts when 200w of feed-in occurs for 1 minute.
    disable:
      delay: 30m
      threshold: 1200 # Charging stops when the grid supplies 1.2kW of energy for more than 30 minutes.
```