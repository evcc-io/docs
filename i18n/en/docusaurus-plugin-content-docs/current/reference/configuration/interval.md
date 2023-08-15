```
sidebar_position: 9
```

# `interval`

Defines the time interval at which new values are read from all measurement devices and the charging currents of the chargers are re-regulated.

**Possible values**: A numerical value followed by the time unit

**For example**:

```yaml
interval: 30s # every 30 seconds
```

:::caution
Too short an interval ( < 30s ) can lead to undesired behaviour (oscillations in regulation) if the components involved do not have enough reaction time before the next control cycle begins. Experience shows that an interval of 10s to 15s is possible if all components react quickly enough. This should be tested individually.
:::
