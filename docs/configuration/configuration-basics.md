---
sidebar_position: 0
---

# Configuration Basics

To control the charge process, EVCC requires access to a few hardware devices.

The `evcc.yaml` configuration file tells EVCC which devices exist in the location installation and how to access them. The file can be edited with any text editor and is formated using the [YAML](https://en.wikipedia.org/wiki/YAML) syntax.

The basic structure has multiple elements:

- Generic settings
like URL of the server, interval to fetch new data from each device.
- Plugin settings
for accessing other services to access devices e.g. via `mqtt`, store data into `influx`, etc. .
- Additional `menu` items
to extend the web page menu.
- `meters` for accessing generated PV power, exported power and current charge power.
See supported [power meter](3.-power-meter) and supported [pv inverters](4.-pv-inverter) for a list of supported devices and their required settings.
- `chargers` for accessing and controlling the charging process.
See supported [Wallbox](2.-wallbox) for a list of supported devices and their required settings.
- `vehicles` for getting the current state of charge (SOC) of the cars battery.
See supported [vehicle](6.-vehicle) for a list of supported cars and their required settings.
- `loadpoints` reference the individual devices defined above.
- Finally `messaging` services (pushover,telegram,email) and events
to inform you about charging process events.

Minimum configuration:

- 1 `meter` with the name `grid` providing the grid exported energy **or**
1 `meter` with the name `pv` providing the generated PV energy (via a meter or PV inverter device)
- 1 `chargers` device allowing to start & stop charging, adjust charging power
- the `loadpoints` section to reference your devices by their `name` values

Recommended additional configurations:
- 1 `meter` with the name `charge` providing the charged energy (via a meter or charger device)
**Important**:
Usually the supported charger devices are providing the current charge power information which will be used by evcc automatically.
In consequence a `charge` definition in the `meters` section is NOT necessarily needed.
It's only necessary in case the charger device is not providing the charge power information or there is the dedicated wish to use a different charge power information.
- 1 `vehicles` entry to provide battery state of charge (soc)

### Setup your configuration

- Download [evcc.dist.yaml](https://github.com/andig/evcc/blob/master/evcc.dist.yaml), change its name to `evcc.yaml` and store it in the config directory of your choice (on Linux systems usually `/etc`)
- Search for configuration templates of your individual device types in https://github.com/andig/evcc-config and copy&adapt them in your `evcc.yaml` settings
- Change the `loadpoints` section at the end and reference your devices by their name
- Save

### Step by Step configuration and test example
The following configuration and corresponding test steps can be used as guidline to setup a working evcc configuration.
Simply start with an empty evcc.yaml configuration file and fill it stepwise with the provided configuration contents.
- Grid and PV meter configuration
Copy the following meter configuration content in your empty `evcc.yaml`,
search for your individual meter config templates in https://github.com/andig/evcc-config#meters and
adapt the grid and pv meter configurations correspondingly.
Finally save the adapted configuration.
**Important**:
Do NOT change the meter names (grid + pv), the meter names will be later referenced in the loadpoints config section ...
```yaml
uri: 0.0.0.0:7070 # uri for ui
interval: 10s # control cycle interval

# log settings
log: error
levels:
  core: debug
  lp-1: debug
  lp-2: debug

# meter definitions
# name can be freely chosen and is used as reference when assigning meters to site and loadpoints
# for examples see https://github.com/andig/evcc-config#meters
meters:
- name: grid
  type: default
  power:
    type: http
    uri: http://192.0.0.2/solar_api/v1/GetPowerFlowRealtimeData.fcgi
    jq: if .Body.Data.Site.P_Grid == null then 0 else .Body.Data.Site.P_Grid end

- name: pv
  type: default
  power:
    type: http
    uri: http://192.0.0.2/solar_api/v1/GetPowerFlowRealtimeData.fcgi
    jq: if .Body.Data.Site.P_PV == null then 0 else .Body.Data.Site.P_PV end
```
- Grid and PV meter test
After adapting and storing your meter settings U can test the configuration by executing the following command:
`evcc meter -l debug`
Please change and adapt your meter definitions until the output of the above command looks like the below output.
In case of errors simply start the test in trace mode `evcc meter -l trace` to get more details.
```
pi@raspberrypi:~ $ evcc meter -l debug
[main  ] INFO 2021/04/11 19:25:25 evcc 0.50 (57495de)
[main  ] INFO 2021/04/11 19:25:25 using config file /etc/evcc.yaml
pv
--
Power: 0W

grid
----
Power: 725W
```
- Charger configuration
Add/append the following charger configuration content in your `evcc.yaml`,
search for your individual charger config templates in https://github.com/andig/evcc-config#chargers and
adapt the charger configuration correspondingly.
Finally save the extended configuration.
**Important**:
Do NOT change the charger name (mycharger), the charger name will be later referenced in the loadpoints config section ...
```yaml
# charger definitions
# name can be freely chosen and is used as reference when assigning charger to vehicle
# for examples see https://github.com/andig/evcc-config#chargers
chargers:
- name: mycharger
  type: go-e
  uri: http://192.0.0.52 # go-e ip address (local)
```
- Charger test
After adapting and storing your meter settings U can test the configuration by executing the following command:
`evcc charger -l debug`
Please change and adapt your charger definition until the output of the above command looks like the below output.
In case of errors simply start the test in trace mode `evcc charger -l trace` to get more details.
```
pi@raspberrypi:~ $ evcc charger -l debug
[main  ] INFO 2021/04/11 20:02:10 evcc 0.50 (57495de)
[main  ] INFO 2021/04/11 20:02:10 using config file /etc/evcc.yaml
Power:          0W
Current L1..L3: 0A 0A 0A
Charge status:  B
Enabled:        false
Charged:        0.0kWh
```
- Site configuration
By adding/appending the following site configuration content in your `evcc.yaml`,
you will set the name of your evcc website and
link the `grid` access of your power supply company (EVU in german Energieversorungsunternehmen) and your `pv` (photovoltaic system).
Save the extended configuration.
_(To follow this step by step test, please let the commented battery meter settings untouched, until you have a running base configuration.)_
```yaml
# site describes the EVU connection, PV and home battery
site:
  title: Home # display name for UI
  meters:
    grid: grid # grid meter
    pv: pv # pv meter
#    battery: battery # battery meter
#  prioritySoC: 0 # give home battery priority up to this soc (0 to disable)
```
- Loadpoint configuration
Finally by adding/appending the following loadpoint configuration content in your `evcc.yaml`,
you will complete your basic evcc configuration.
The loadpoint name `Garage` in your evcc website will be set and
the previously defined and tested charger `mycharger` will be linked.

Save the extended configuration.
_(To follow this step by step test, please let the commented charge meter and vehicle settings untouched, until you have a running base configuration.)_
```yaml
# loadpoint describes the charger, charge meter and connected vehicle
loadpoints:
- title: Garage # display name for UI
  charger: mycharger # charger
#  meters:
#    charge: charge # charge meter
# vehicle: audi
  # vehicles: # use if multiple vehicles allowed to charge on this loadpoint
  # - ID.3
  # - e-Up
  mode: pv
  soc:
    # polling defines usage of the vehicle APIs
    # Modifying the default settings it NOT recommended. It MAY deplete your vehicle's battery
    # or lead to vehicle manufacturer banning you from API use. USE AT YOUR OWN RISK.
    poll:
      # poll mode defines under which condition the vehicle API is called:
      #   charging: update vehicle ONLY when charging (this is the recommended default)
      #   connected: update vehicle when connected (not only charging), interval defines how often
      #   always: always update vehicle regardless of connection state, interval defines how often
      mode: charging
      # poll interval defines how often the vehicle API may be polled if NOT charging
      interval: 60m
    min: 0 # immediately charge to 0% regardless of mode unless "off" (disabled)
    target: 100 # always charge to 100%
    estimate: false # set true to interpolate between api updates
  onDisconnect: # set defaults when vehicle disconnects
    mode: pv # switch back to pv mode
    targetSoC: 100 # charge to 100%
  phases: 3 # ev phases (default 3)
  enable: # pv mode enable behavior
    delay: 1m # threshold must be exceeded for this long
    threshold: 0 # minimum export power (W). If zero, export must exceed minimum charge power to enable
  disable: # pv mode disable behavior
    delay: 5m # threshold must be exceeded for this long
    threshold: 200 # maximum import power (W)
  guardduration: 5m # switch charger contactor not more often than this (default 10m)
  mincurrent: 6 # minimum charge current (default 6A)
  maxcurrent: 16 # maximum charge current (default 16A)
```
- Site, Loadpoint and website test
After adapting and storing your site and loadpoint settings your first basic evcc configuration is ready for an complete test.
Start the evcc by executing the following command:
`evcc -l debug`
The evcc daemon will start in foreground mode, logging its continious output, which should look like this:
```
pi@raspberrypi:~ $ evcc -l debug
[main  ] INFO 2021/04/12 18:33:04 evcc 0.50 (57495de)
[main  ] INFO 2021/04/12 18:33:04 using config file /etc/evcc.yaml
[main  ] INFO 2021/04/12 18:33:04 listening at 0.0.0.0:7070
[site  ] INFO 2021/04/12 18:33:04 site config:
[site  ] INFO 2021/04/12 18:33:04   meters:    grid ✓ pv ✓ battery —
[site  ] INFO 2021/04/12 18:33:04     grid:    power ✓ energy — currents —
[site  ] INFO 2021/04/12 18:33:04     pv:      power ✓ energy — currents —
[lp-1  ] INFO 2021/04/12 18:33:04 loadpoint 1:
[lp-1  ] INFO 2021/04/12 18:33:04   mode:      pv
[lp-1  ] INFO 2021/04/12 18:33:04   charger:   power ✓ energy — currents ✓ timer —
[lp-1  ] INFO 2021/04/12 18:33:04   meters:    charge ✓
[lp-1  ] INFO 2021/04/12 18:33:04     charge:  power ✓ energy — currents ✓
[lp-1  ] INFO 2021/04/12 18:33:04   vehicles:  —
[site  ] DEBUG 2021/04/12 18:33:04 ----
[site  ] DEBUG 2021/04/12 18:33:04 pv power: 3114W
[site  ] DEBUG 2021/04/12 18:33:05 grid power: -2512W
[site  ] DEBUG 2021/04/12 18:33:05 site power: -2512W
[lp-1  ] DEBUG 2021/04/12 18:33:05 charge power: 0W
[lp-1  ] DEBUG 2021/04/12 18:33:06 charger status: B
[lp-1  ] DEBUG 2021/04/12 18:33:07 max charge current: 3.6A = 0A + 3.6A (-2512W @ 3p)
[lp-1  ] DEBUG 2021/04/12 18:33:07 pv max charge current: 0A
[site  ] DEBUG 2021/04/12 18:33:14 ----
[site  ] DEBUG 2021/04/12 18:33:14 pv power: 3121W
[site  ] DEBUG 2021/04/12 18:33:15 grid power: -2520W
[site  ] DEBUG 2021/04/12 18:33:15 site power: -2520W
[lp-1  ] DEBUG 2021/04/12 18:33:15 charge power: 0W
[lp-1  ] DEBUG 2021/04/12 18:33:15 charger status: B
[lp-1  ] DEBUG 2021/04/12 18:33:15 max charge current: 3.7A = 0A + 3.7A (-2520W @ 3p)
[lp-1  ] DEBUG 2021/04/12 18:33:15 pv max charge current: 0A
[site  ] DEBUG 2021/04/12 18:33:24 ----
...
```
Now you can start the evcc frontend by a browser of your choice with your individual server ip address..
In our example the evcc URL will look like this: `http://XXX.XXX.XXX.XXX:7070`
(Replace XXX.XXX.XXX.XXX with our evcc server ip address)
In case everything is running correct, evcc daemon will present you its user interface like shown below:
![evcc screenshot](https://github.com/andig/evcc/blob/master/docs/screenshot.png)