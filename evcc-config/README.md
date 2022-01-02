# Configuration examples for EVCC

[![Build Status](https://github.com/evcc-io/config/workflows/Build/badge.svg)](https://github.com/evcc-io/config/actions?query=workflow%3ABuild)

Configuration examples for the [EVCC EV Charge Controller](https://github.com/evcc-io/evcc).

[EVCC](https://github.com/evcc-io/evcc) supports a growing list of [chargers](#chargers), [meters](#meters) and [vehicles](#vehicles). See below for detailed configuration.
Additional devices can be configured using `custom` devices and related [plugins](#https://github.com/evcc-io/evcc#plugins).

## Contributing

If you want to contribute configurations to this repository please open a Pull Request ("PR"). PRs should contain:

- updated or new `yaml` configuration (see https://github.com/evcc-io/config/tree/master/yaml)
- run `make` to generate compilable Go code (configurations are used for testing) and update the README

## Chargers

- [ABL eMH / SENEC.Wallbox pro](#charger-abl-emh--senec-wallbox-pro)
- [cFos PowerBrain](#charger-cfos-powerbrain)
- [Daheimladen (Cloud API)](#charger-daheimladen-cloud-api)
- [Easee Home (Cloud API)](#charger-easee-home-cloud-api)
- [EEBUS compatible wallbox (e.g. Mobile Charger Connect)](#charger-eebus-compatible-wallbox-e-g-mobile-charger-connect)
- [EVSE DIN](#charger-evse-din)
- [EVSE-Wifi](#charger-evse-wifi)
- [FritzDECT](#charger-fritzdect)
- [Generic](#charger-generic)
- [go-eCharger](#charger-go-echarger)
- [go-eCharger (Cloud)](#charger-go-echarger-cloud)
- [Heidelberg Energy Control (Modbus RTU)](#charger-heidelberg-energy-control-modbus-rtu)
- [i-CHARGE CION (Modbus RTU-over-TCP)](#charger-i-charge-cion-modbus-rtu-over-tcp)
- [Innogy eBox](#charger-innogy-ebox)
- [KEBA Connect](#charger-keba-connect)
- [Mobile Charger Connect (Audi, Bentley, Porsche)](#charger-mobile-charger-connect-audi-bentley-porsche)
- [NRGKick BT (Bluetooth)](#charger-nrgkick-bt-bluetooth)
- [NRGKick Connect](#charger-nrgkick-connect)
- [openWB (MQTT)](#charger-openwb-mqtt)
- [Phoenix EM-CP-PP-ETH Controller (Modbus TCP)](#charger-phoenix-em-cp-pp-eth-controller-modbus-tcp)
- [Phoenix EV-ETH Controller (Modbus TCP)](#charger-phoenix-ev-eth-controller-modbus-tcp)
- [Phoenix EV-SER Controller (Modbus RTU)](#charger-phoenix-ev-ser-controller-modbus-rtu)
- [Shelly](#charger-shelly)
- [Tasmota](#charger-tasmota)
- [TinkerForge WARP Charger](#charger-tinkerforge-warp-charger)
- [TP-LINK Smart Plug](#charger-tp-link-smart-plug)
- [Wallbe (Eco, Pro)](#charger-wallbe-eco-pro)
- [wbec](#charger-wbec)

## Meters

- [cFos PowerBrain Meter](#meter-cfos-powerbrain-meter)
- [Discovergy Metering Service (Cloud) (Grid)](#meter-discovergy-metering-service-cloud--grid)
- [Discovergy Metering Service (Cloud) (PV)](#meter-discovergy-metering-service-cloud--pv)
- [E3DC (Battery Meter)](#meter-e3dc-battery-meter)
- [E3DC (Grid Meter)](#meter-e3dc-grid-meter)
- [E3DC (PV Meter)](#meter-e3dc-pv-meter)
- [Eastron SDM Modbus Meter](#meter-eastron-sdm-modbus-meter)
- [FritzDECT](#meter-fritzdect)
- [Fronius Solar API V1 (Battery Meter)](#meter-fronius-solar-api-v1-battery-meter)
- [Fronius Solar API V1 (Grid Meter)](#meter-fronius-solar-api-v1-grid-meter)
- [Fronius Solar API V1 (PV Meter)](#meter-fronius-solar-api-v1-pv-meter)
- [Fronius Symo GEN24 Plus (Battery Meter)](#meter-fronius-symo-gen24-plus-battery-meter)
- [Fronius Symo GEN24 Plus (Grid Meter)](#meter-fronius-symo-gen24-plus-grid-meter)
- [Fronius Symo GEN24 Plus (PV Meter)](#meter-fronius-symo-gen24-plus-pv-meter)
- [Generic](#meter-generic)
- [Huawei SUN2000-8KTL (PV Meter)](#meter-huawei-sun2000-8ktl-pv-meter)
- [Kostal Energy Meter via inverter (Grid Meter)](#meter-kostal-energy-meter-via-inverter-grid-meter)
- [Kostal Hybrid Inverter (Battery Meter)](#meter-kostal-hybrid-inverter-battery-meter)
- [Kostal Inverter (PV Meter)](#meter-kostal-inverter-pv-meter)
- [Kostal Piko + Piko BA (Grid Meter)](#meter-kostal-piko--piko-ba-grid-meter)
- [Kostal Piko + Piko BA (PV Meter)](#meter-kostal-piko--piko-ba-pv-meter)
- [Kostal Smart Energy Meter (Grid Meter)](#meter-kostal-smart-energy-meter-grid-meter)
- [LG ESS HOME 8/10 (Battery Meter)](#meter-lg-ess-home-8-10-battery-meter)
- [LG ESS HOME 8/10 (Grid Meter)](#meter-lg-ess-home-8-10-grid-meter)
- [LG ESS HOME 8/10 (PV Meter)](#meter-lg-ess-home-8-10-pv-meter)
- [Multiple DC MPP strings combined (PV Meter)](#meter-multiple-dc-mpp-strings-combined-pv-meter)
- [Multiple PV inverters combined (PV Meter)](#meter-multiple-pv-inverters-combined-pv-meter)
- [Multiple SMA Speedwire PV inverters combined (PV Meter)](#meter-multiple-sma-speedwire-pv-inverters-combined-pv-meter)
- [PowerDog (Grid Meter)](#meter-powerdog-grid-meter)
- [PowerDog (PV Meter)](#meter-powerdog-pv-meter)
- [Powerfox Poweropti (Cloud)](#meter-powerfox-poweropti-cloud)
- [RCT Power (Battery Meter)](#meter-rct-power-battery-meter)
- [RCT Power (Grid Meter)](#meter-rct-power-grid-meter)
- [RCT Power (PV Meter)](#meter-rct-power-pv-meter)
- [SENEC.Home (Battery)](#meter-senec-home-battery)
- [SENEC.Home (Grid)](#meter-senec-home-grid)
- [SENEC.Home (PV)](#meter-senec-home-pv)
- [Shelly 3EM (HTTP)](#meter-shelly-3em-http)
- [SMA Speedwire Inverter (PV or Battery Meter)](#meter-sma-speedwire-inverter-pv-or-battery-meter)
- [SMA Sunny Home Manager 2.0 / Energy Meter (Grid, PV or Battery Meter)](#meter-sma-sunny-home-manager-2-0--energy-meter-grid-pv-or-battery-meter)
- [SolarEdge Energy Meter via inverter (Grid Meter)](#meter-solaredge-energy-meter-via-inverter-grid-meter)
- [SolarEdge Hybrid Inverter (PV Meter)](#meter-solaredge-hybrid-inverter-pv-meter)
- [SolarEdge StorEdge (Battery Meter)](#meter-solaredge-storedge-battery-meter)
- [Solarlog (Grid Meter)](#meter-solarlog-grid-meter)
- [Solarlog (PV Meter)](#meter-solarlog-pv-meter)
- [Solarwatt MyReserve (Battery Meter)](#meter-solarwatt-myreserve-battery-meter)
- [Solarwatt MyReserve (Grid Meter)](#meter-solarwatt-myreserve-grid-meter)
- [Solarwatt MyReserve (PV Meter)](#meter-solarwatt-myreserve-pv-meter)
- [Sonnenbatterie Eco/10 (Battery Meter)](#meter-sonnenbatterie-eco-10-battery-meter)
- [Sonnenbatterie Eco/10 (Grid Meter)](#meter-sonnenbatterie-eco-10-grid-meter)
- [Sonnenbatterie Eco/10 (PV Meter)](#meter-sonnenbatterie-eco-10-pv-meter)
- [SunSpec compliant 3-phase meter via inverter (Grid Meter)](#meter-sunspec-compliant-3-phase-meter-via-inverter-grid-meter)
- [SunSpec compliant battery inverter (Battery Meter)](#meter-sunspec-compliant-battery-inverter-battery-meter)
- [SunSpec compliant PV inverter (PV Meter)](#meter-sunspec-compliant-pv-inverter-pv-meter)
- [Tasmota (HTTP)](#meter-tasmota-http)
- [Tesla Powerwall (Battery Meter)](#meter-tesla-powerwall-battery-meter)
- [Tesla Powerwall (Grid Meter)](#meter-tesla-powerwall-grid-meter)
- [Tesla Powerwall (PV Meter)](#meter-tesla-powerwall-pv-meter)
- [VARTA Energiespeicher (Battery Meter)](#meter-varta-energiespeicher-battery-meter)
- [VARTA Energiespeicher (Grid Meter)](#meter-varta-energiespeicher-grid-meter)
- [VARTA Energiespeicher (PV Meter)](#meter-varta-energiespeicher-pv-meter)
- [Victron Energy (Battery Meter)](#meter-victron-energy-battery-meter)
- [Victron Energy (Grid Meter)](#meter-victron-energy-grid-meter)
- [Victron Energy (PV Meter)](#meter-victron-energy-pv-meter)
- [vzlogger (HTTP)](#meter-vzlogger-http)
- [vzlogger (Push Server)](#meter-vzlogger-push-server)
- [vzlogger (split import/export channels)](#meter-vzlogger-split-import-export-channels)
- [wbec](#meter-wbec)

## Vehicles

- [Audi](#vehicle-audi)
- [BMW](#vehicle-bmw)
- [Citroen](#vehicle-citroen)
- [evNotify (HTTP)](#vehicle-evnotify-http)
- [Fiat](#vehicle-fiat)
- [Ford](#vehicle-ford)
- [Generic](#vehicle-generic)
- [Hyundai](#vehicle-hyundai)
- [Kia](#vehicle-kia)
- [Mini](#vehicle-mini)
- [Nissan](#vehicle-nissan)
- [NIU E-Scooter](#vehicle-niu-e-scooter)
- [Opel](#vehicle-opel)
- [OVMS](#vehicle-ovms)
- [Peugeot](#vehicle-peugeot)
- [Porsche](#vehicle-porsche)
- [Renault](#vehicle-renault)
- [Tesla](#vehicle-tesla)
- [Tronity Cloud Service](#vehicle-tronity-cloud-service)
- [VW (e-Up, e-Golf, etc)](#vehicle-vw-e-up-e-golf-etc)
- [VW ID (ID.3, ID.4, but also e-Golf, e-Up)](#vehicle-vw-id-id-3-id-4-but-also-e-golf-e-up)

## Details

### Meters


<a id="meter-cfos-powerbrain-meter"></a>
#### cFos PowerBrain Meter

```yaml
- type: cfos
  uri: 192.0.2.2:4702 # 4702 is meter 1, 4703 is meter 2
  id: 2 # 2 is meter 1, 3 is meter 2
  # an evcc sponsortoken is required for using this charger
```

<a id="meter-discovergy-metering-service-cloud--grid"></a>
#### Discovergy Metering Service (Cloud) (Grid)

```yaml
- type: discovergy
  user: demo@discovergy.com 
  password: demo # password 
  meter: 1ESY1161229886
```

<a id="meter-discovergy-metering-service-cloud--pv"></a>
#### Discovergy Metering Service (Cloud) (PV)

```yaml
- type: discovergy
  user: demo@discovergy.com 
  password: demo # password 
  meter: 1ESY1161229886
  scale: -1
```

<a id="meter-e3dc-battery-meter"></a>
#### E3DC (Battery Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: e3dc.fritz.box:502
    id: 1 # ModBus slave id
    register: # manual register configuration for E3/DC "Simple-Mode"
      address: 40069 # Batterie-Leistung in Watt
      type: holding
      decode: int32s
    scale: -1 # reverse direction
  soc:
    source: modbus
    uri: e3dc.fritz.box:502
    id: 1 # ModBus slave id
    register: # manual register configuration for E3/DC "Simple-Mode"
      address: 40082 # Batterie-SOC in Prozent
      type: holding
      decode: uint16
```

<a id="meter-e3dc-grid-meter"></a>
#### E3DC (Grid Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: e3dc.fritz.box:502
    id: 1 # ModBus slave id
    register: # manual register configuration for E3/DC "Simple-Mode"
      address: 40073 # Hausverbrauchs-Leistung in Watt
      type: holding
      decode: int32s
```

<a id="meter-e3dc-pv-meter"></a>
#### E3DC (PV Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: e3dc.fritz.box:502
    id: 1 # ModBus slave id
    register: # manual register configuration for E3/DC "Simple-Mode"
      address: 40067 # Photovoltaikleistung in Watt
      type: holding
      decode: int32s
```

<a id="meter-eastron-sdm-modbus-meter"></a>
#### Eastron SDM Modbus Meter

```yaml
- type: modbus
  model: sdm # specific non-sunspec meter
  id: 1
  energy: Sum # only required for charge meter usage
  # chose either locally attached:
  device: /dev/ttyUSB0 # serial port
  baudrate: 9600
  comset: 8N1
  # or via TCP:
  uri: 192.0.2.2:502
  rtu: true # serial modbus rtu (rs485) device connected using simple ethernet adapter
```

<a id="meter-fritzdect"></a>
#### FritzDECT

```yaml
- type: fritzdect
  uri: https://fritz.box # FRITZ!Box ip address (local)
  user: xxxxxxxxxx # FRITZ!Box username (Has to have Smart Home privileges!)
  password: yyyyyyyyyy # FRITZ!Box password
  ain: '007788992233' # switch actor identification number without blanks (see AIN number on switch sticker)
  standbypower: 15 # treat as charging above this power
```

<a id="meter-fronius-solar-api-v1-battery-meter"></a>
#### Fronius Solar API V1 (Battery Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/solar_api/v1/GetPowerFlowRealtimeData.fcgi
    jq: if .Body.Data.Site.P_Akku == null then 0 else .Body.Data.Site.P_Akku end
  soc:
    source: http
    uri: http://192.0.2.2/solar_api/v1/GetPowerFlowRealtimeData.fcgi
    jq: .Body.Data.Inverters."1".SOC
```

<a id="meter-fronius-solar-api-v1-grid-meter"></a>
#### Fronius Solar API V1 (Grid Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/solar_api/v1/GetPowerFlowRealtimeData.fcgi
    jq: if .Body.Data.Site.P_Grid == null then 0 else .Body.Data.Site.P_Grid end
```

<a id="meter-fronius-solar-api-v1-pv-meter"></a>
#### Fronius Solar API V1 (PV Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/solar_api/v1/GetPowerFlowRealtimeData.fcgi
    jq: if .Body.Data.Site.P_PV == null then 0 else .Body.Data.Site.P_PV end
```

<a id="meter-fronius-symo-gen24-plus-battery-meter"></a>
#### Fronius Symo GEN24 Plus (Battery Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: modbus
      model: sunspec
      uri: 192.0.2.2:502
      id: 1
      value: 160:3:DCW # mppt 3 charge
      scale: -1
    - source: modbus
      model: sunspec
      uri: 192.0.2.2:502
      id: 1
      value: 160:4:DCW # mppt 4 discharge
  soc:
    source: modbus
    model: sunspec
    uri: 192.0.2.2:502
    id: 1
    value: ChargeState
```

<a id="meter-fronius-symo-gen24-plus-grid-meter"></a>
#### Fronius Symo GEN24 Plus (Grid Meter)

```yaml
- type: modbus
  model: sunspec
  uri: 192.0.2.2:502
  id: 200
  power: 213:W # sunspec model 203 meter
```

<a id="meter-fronius-symo-gen24-plus-pv-meter"></a>
#### Fronius Symo GEN24 Plus (PV Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: modbus
      model: sunspec
      uri: 192.0.2.2:502
      id: 1
      value: 160:1:DCW # mpp 1 pv
    - source: modbus
      model: sunspec
      uri: 192.0.2.2:502
      id: 1
      value: 160:2:DCW # mpp 2 pv
```

<a id="meter-generic"></a>
#### Generic

```yaml
- type: custom
  power: # power (W)
    source: # plugin type
    # ...
  energy: # optional energy (kWh)
    source: # plugin type
    # ...
  soc: # optional battery soc (%)
    source: # plugin type
    # ...
  currents: # optional currents (A)
    - source: # L1 plugin type
      # ...
    - source: # L2 plugin type
      # ...
    - source: # L3 plugin type
      # ...
```

<a id="meter-huawei-sun2000-8ktl-pv-meter"></a>
#### Huawei SUN2000-8KTL (PV Meter)

```yaml
- type: custom
  power:
    source: modbus
    id: 1
    # chose either locally attached:
    device: /dev/ttyUSB0 # serial port
    baudrate: 19200
    comset: 8N1
    # or via TCP:
    uri: 192.0.2.2:502
    rtu: true # serial modbus rtu (rs485) device connected using simple ethernet adapter
    # register details
    register:
      address: 40525
      type: holding
      decode: int32
```

<a id="meter-kostal-energy-meter-via-inverter-grid-meter"></a>
#### Kostal Energy Meter via inverter (Grid Meter)

```yaml
- type: custom
  power:
    source: modbus # use ModBus plugin
    uri: 192.0.2.2:1502 # inverter port
    id: 71
    register: # manual non-sunspec register configuration
      address: 252 # (see ba_kostal_interface_modbus-tcp_sunspec.pdf)
      type: holding
      decode: float32s # may be float32 on specific firmware/devices
```

<a id="meter-kostal-hybrid-inverter-battery-meter"></a>
#### Kostal Hybrid Inverter (Battery Meter)

```yaml
- type: modbus
  model: sunspec
  uri: 192.0.2.2:1502
  id: 71 # kostal default sunspec modbus id
  power: 802:W # sunspec model 802 battery
  soc: 802:SoC # sunspec model 802 battery
```

<a id="meter-kostal-inverter-pv-meter"></a>
#### Kostal Inverter (PV Meter)

```yaml
- type: modbus
  model: sunspec
  uri: 192.0.2.2:1502
  id: 71 # kostal default sunspec modbus id
```

<a id="meter-kostal-piko--piko-ba-grid-meter"></a>
#### Kostal Piko + Piko BA (Grid Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: http
      uri: http://192.0.2.2/api/dxs.json?dxsEntries=67109120 # PV AC Ausgang
      jq: .dxsEntries[0].value
      scale: -1.0
    - source: http
      uri: http://192.0.2.2/api/dxs.json?dxsEntries=83886848 # Netzbezug
      jq: .dxsEntries[0].value
    - source: http
      uri: http://192.0.2.2/api/dxs.json?dxsEntries=83886336 # PV Eigenverbrauch
      jq: .dxsEntries[0].value
```

<a id="meter-kostal-piko--piko-ba-pv-meter"></a>
#### Kostal Piko + Piko BA (PV Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/api/dxs.json?dxsEntries=67109120 # PV AC Ausgang
    jq: .dxsEntries[0].value
```

<a id="meter-kostal-smart-energy-meter-grid-meter"></a>
#### Kostal Smart Energy Meter (Grid Meter)

```yaml
- type: modbus
  model: sunspec
  uri: 192.0.2.2:502
  id: 71 # kostal default sunspec modbus id
```

<a id="meter-lg-ess-home-8-10-battery-meter"></a>
#### LG ESS HOME 8/10 (Battery Meter)

```yaml
- type: lgess
  usage: battery
  # uri and password are only required once if multiple lgess usages are defined
  uri: https://192.0.2.2/ # URI of the LG ESS HOME inverter
  password: "DE200..." # registration number of the LG ESS HOME inverter
```

<a id="meter-lg-ess-home-8-10-grid-meter"></a>
#### LG ESS HOME 8/10 (Grid Meter)

```yaml
- type: lgess
  usage: grid
  # uri and password are only required once if multiple lgess usages are defined
  uri: https://192.0.2.2/
  password: "DE200..." # registration number of the LG ESS HOME inverter
```

<a id="meter-lg-ess-home-8-10-pv-meter"></a>
#### LG ESS HOME 8/10 (PV Meter)

```yaml
- type: lgess
  usage: pv
  # uri and password are only required once if multiple lgess usages are defined
  uri: https://192.0.2.2/
  password: "DE200..." # registration number of the LG ESS HOME inverter
```

<a id="meter-multiple-dc-mpp-strings-combined-pv-meter"></a>
#### Multiple DC MPP strings combined (PV Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: modbus
      model: sunspec
      value: 160:1:DCW # SunSpec Model 160 MPP string 1 DCW
      uri: 192.0.2.2:502
      id: 1
    - source: modbus
      model: sunspec
      value: 160:2:DCW # SunSpec Model 160 MPP string 2 DCW
      uri: 192.0.2.2:502
      id: 1
```

<a id="meter-multiple-pv-inverters-combined-pv-meter"></a>
#### Multiple PV inverters combined (PV Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: modbus
      model: sunspec
      uri: 192.0.2.2:502
      id: 1
    - source: modbus
      model: sunspec
      uri: 192.0.2.3:502
      id: 1
```

<a id="meter-multiple-sma-speedwire-pv-inverters-combined-pv-meter"></a>
#### Multiple SMA Speedwire PV inverters combined (PV Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: sma
      uri: 192.0.2.2
      password: # optional
      value: ActivePowerPlus
    - source: sma
      uri: 192.0.2.3
      password: # optional
      value: ActivePowerPlus
```

<a id="meter-powerdog-grid-meter"></a>
#### PowerDog (Grid Meter)

```yaml
- type: custom
  power:
    source: calc #calculate current overall consumption + (current pv effort * (-1) )
    add:
      - source: modbus
        uri: 192.168.1.2:502 #ip-adress and port (default-port: 502)
        id: 1
        register:
          address: 40026 #register for overall consumption
          type: holding
          decode: int32
  
      - source: modbus
        uri: 192.168.1.2:502 #ip-adress and port (default-port: 502)
        id: 1
        register:
          address: 40002 #register for pv effort
          type: holding
          decode: int32
        scale: -1 #scale with -1 to get a substraction
```

<a id="meter-powerdog-pv-meter"></a>
#### PowerDog (PV Meter)

```yaml
- type: custom
  power:
    type: modbus
    uri: 192.168.1.2:502 #ip-adress and port (default-port: 502)
    id: 1
    register:
      address: 40002 #register for pv effort
      type: holding
      decode: int32
```

<a id="meter-powerfox-poweropti-cloud"></a>
#### Powerfox Poweropti (Cloud)

```yaml
- type: custom
  power:
    source: http
    uri: https://backend.powerfox.energy/api/2.0/my/main/current
    auth:
      type: basic
      user: xxxxxxxxx
      password: *****
    jq: .Watt
```

<a id="meter-rct-power-battery-meter"></a>
#### RCT Power (Battery Meter)

```yaml
- type: rct
  uri: 192.0.2.2
  usage: battery
  cache: 2s
```

<a id="meter-rct-power-grid-meter"></a>
#### RCT Power (Grid Meter)

```yaml
- type: rct
  uri: 192.0.2.2
  usage: grid
  cache: 2s
```

<a id="meter-rct-power-pv-meter"></a>
#### RCT Power (PV Meter)

```yaml
- type: rct
  uri: 192.0.2.2
  usage: pv
  cache: 2s
```

<a id="meter-senec-home-battery"></a>
#### SENEC.Home (Battery)

```yaml
- type: custom
  power:
    source: script
    cmd: >
      /bin/bash -c "set +H; curl --data '{\"ENERGY\":{\"GUI_BAT_DATA_POWER\":\"\"}}' --header \"Content-Type: application/json\" --request POST http://192.0.2.2/lala.cgi | jq .ENERGY.GUI_BAT_DATA_POWER | python3 -c 'import struct;print(struct.unpack(\"!f\",bytes.fromhex(input()[4:12]))[0])'"
    timeout: 5s
    scale: -1
  soc:
    source: script
    cmd: >
      /bin/bash -c "set +H; curl --data '{\"ENERGY\":{\"GUI_BAT_DATA_FUEL_CHARGE\":\"\"}}' --header \"Content-Type: application/json\" --request POST http://192.0.2.2/lala.cgi | jq .ENERGY.GUI_BAT_DATA_FUEL_CHARGE | python3 -c 'import struct;print(struct.unpack(\"!f\",bytes.fromhex(input()[4:12]))[0])'"
    timeout: 5s
```

<a id="meter-senec-home-grid"></a>
#### SENEC.Home (Grid)

```yaml
- type: custom
  power:
    source: script
    cmd: >
      /bin/bash -c "set +H; curl --data '{\"ENERGY\":{\"GUI_GRID_POW\":\"\"}}' --header \"Content-Type: application/json\" --request POST http://192.0.2.2/lala.cgi | jq .ENERGY.GUI_GRID_POW | python3 -c 'import struct;print(struct.unpack(\"!f\",bytes.fromhex(input()[4:12]))[0])'"
    timeout: 5s
    scale: -1
```

<a id="meter-senec-home-pv"></a>
#### SENEC.Home (PV)

```yaml
- type: custom
  power:
    source: script
    cmd: >
      /bin/bash -c "set +H; curl --data '{\"ENERGY\":{\"GUI_INVERTER_POWER\":\"\"}}' --header \"Content-Type: application/json\" --request POST http://192.0.2.2/lala.cgi | jq .ENERGY.GUI_INVERTER_POWER | python3 -c 'import struct;print(struct.unpack(\"!f\",bytes.fromhex(input()[4:12]))[0])'"
    timeout: 5s
```

<a id="meter-shelly-3em-http"></a>
#### Shelly 3EM (HTTP)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/status
    jq: .emeters | map(.power) | add
  energy:
    source: http
    uri: http://192.0.2.2/status
    jq: .emeters | map(.total) | add
    scale: 0.001
  currents:
  - source: http
    uri: http://192.0.2.2/emeter/0
    jq: .current
  - source: http
    uri: http://192.0.2.2/emeter/1
    jq: .current
  - source: http
    uri: http://192.0.2.2/emeter/2
    jq: .current
```

<a id="meter-sma-speedwire-inverter-pv-or-battery-meter"></a>
#### SMA Speedwire Inverter (PV or Battery Meter)

```yaml
- type: sma
  uri: 192.0.2.2
  password: # optional
```

<a id="meter-sma-sunny-home-manager-2-0--energy-meter-grid-pv-or-battery-meter"></a>
#### SMA Sunny Home Manager 2.0 / Energy Meter (Grid, PV or Battery Meter)

```yaml
- type: sma
  uri: 192.0.2.2
```

<a id="meter-solaredge-energy-meter-via-inverter-grid-meter"></a>
#### SolarEdge Energy Meter via inverter (Grid Meter)

```yaml
- type: custom
  power:
    source: modbus
    model: sunspec
    uri: 192.0.2.2:502 # Port 502 (SetApp) or 1502 (LCD)
    id: 1
    subdevice: 1 # Metering device
    value: 203:W
    scale: -1
```

<a id="meter-solaredge-hybrid-inverter-pv-meter"></a>
#### SolarEdge Hybrid Inverter (PV Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: modbus
      model: sunspec
      uri: 192.0.2.2:502 # Port 502 (SetApp) or 1502 (LCD)
      id: 1
      value: 103:DCW
    - source: modbus
      uri: 192.0.2.2:502 # Port 502 (SetApp) or 1502 (LCD)
      id: 1
      register:
        address: 62836 # Battery 1 Instantaneous Power
        type: holding
        decode: float32s
```

<a id="meter-solaredge-storedge-battery-meter"></a>
#### SolarEdge StorEdge (Battery Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: 192.0.2.2:502 # Port 502 (SetApp) or 1502 (LCD)
    id: 1
    register:
      address: 62836 # Battery 1 Instantaneous Power
      type: holding
      decode: float32s
    scale: -1
  soc:
    source: modbus
    uri: 192.0.2.2:502 # Port 502 (SetApp) or 1502 (LCD)
    id: 1
    register:
      address: 62852 # Battery 1 State of Energy (SOE)
      type: holding
      decode: float32s
```

<a id="meter-solarlog-grid-meter"></a>
#### Solarlog (Grid Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: modbus
      uri: 192.0.2.2:502
      id: 1
      register:
        address: 3502 # Pac
        type: input
        decode: uint32s
      scale: -1
    - source: modbus
      uri: 192.0.2.2:502
      id: 1
      register:
        address: 3518 # Pac consumption
        type: input
        decode: uint32s
```

<a id="meter-solarlog-pv-meter"></a>
#### Solarlog (PV Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: 192.0.2.2:502
    id: 1
    register:
      address: 3502 # Pac
      type: input
      decode: uint32s
```

<a id="meter-solarwatt-myreserve-battery-meter"></a>
#### Solarwatt MyReserve (Battery Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/rest/kiwigrid/wizard/devices # EnergyManager
    jq: .result.items[] | select(.deviceModel[].deviceClass == "com.kiwigrid.devices.location.Location" ) | .tagValues.PowerConsumedFromStorage.value - .tagValues.PowerBuffered.value
  soc:
    source: http
    uri: http://192.0.2.2/rest/kiwigrid/wizard/devices # EnergyManager
    jq: .result.items[] | select(.deviceModel[].deviceClass == "com.kiwigrid.devices.solarwatt.MyReserve") | .tagValues.StateOfCharge.value
```

<a id="meter-solarwatt-myreserve-grid-meter"></a>
#### Solarwatt MyReserve (Grid Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/rest/kiwigrid/wizard/devices # EnergyManager
    jq: .result.items[] | select(.deviceModel[].deviceClass == "com.kiwigrid.devices.location.Location" ) | .tagValues.PowerConsumedFromGrid.value - .tagValues.PowerOut.value
```

<a id="meter-solarwatt-myreserve-pv-meter"></a>
#### Solarwatt MyReserve (PV Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2/rest/kiwigrid/wizard/devices # EnergyManager
    jq: .result.items[] | select(.deviceModel[].deviceClass == "com.kiwigrid.devices.location.Location" ) | .tagValues.PowerProduced.value
```

<a id="meter-sonnenbatterie-eco-10-battery-meter"></a>
#### Sonnenbatterie Eco/10 (Battery Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2:8080/api/v1/status
    jq: .Pac_total_W
  soc:
    source: http
    uri: http://192.0.2.2:8080/api/v1/status
    jq: .USOC
```

<a id="meter-sonnenbatterie-eco-10-grid-meter"></a>
#### Sonnenbatterie Eco/10 (Grid Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2:8080/api/v1/status
    jq: .GridFeedIn_W
    scale: -1 # reverse direction
```

<a id="meter-sonnenbatterie-eco-10-pv-meter"></a>
#### Sonnenbatterie Eco/10 (PV Meter)

```yaml
- type: custom
  power:
    source: http
    uri: http://192.0.2.2:8080/api/v1/status
    jq: .Production_W
```

<a id="meter-sunspec-compliant-3-phase-meter-via-inverter-grid-meter"></a>
#### SunSpec compliant 3-phase meter via inverter (Grid Meter)

```yaml
- type: modbus
  model: sunspec
  uri: 192.0.2.2:502
  id: 1
  power: 203:W # sunspec model 203 meter
```

<a id="meter-sunspec-compliant-battery-inverter-battery-meter"></a>
#### SunSpec compliant battery inverter (Battery Meter)

```yaml
- type: modbus
  model: sunspec
  uri: 192.0.2.2:502
  id: 1
  soc: ChargeState
```

<a id="meter-sunspec-compliant-pv-inverter-pv-meter"></a>
#### SunSpec compliant PV inverter (PV Meter)

```yaml
- type: modbus
  model: sunspec
  uri: 192.0.2.2:502
  id: 1
```

<a id="meter-tasmota-http"></a>
#### Tasmota (HTTP)

```yaml
- type: custom
  power: # power reading (W)
    source: http
    uri: http://192.0.2.2/cm?cmnd=Status%208
    jq: .StatusSNS.ENERGY.Power
  energy: # energy reading (Wh), for chargemeter usage only
    source: http
    uri: http://192.0.2.2/cm?cmnd=Status%208
    jq: .StatusSNS.ENERGY.Total * 1000
```

<a id="meter-tesla-powerwall-battery-meter"></a>
#### Tesla Powerwall (Battery Meter)

```yaml
- type: tesla
  uri: https://192.0.2.2/
  usage: battery
  password: *** # for user 'customer'
```

<a id="meter-tesla-powerwall-grid-meter"></a>
#### Tesla Powerwall (Grid Meter)

```yaml
- type: tesla
  uri: https://192.0.2.2/
  usage: grid
  password: *** # for user 'customer'
```

<a id="meter-tesla-powerwall-pv-meter"></a>
#### Tesla Powerwall (PV Meter)

```yaml
- type: tesla
  uri: https://192.0.2.2/
  usage: pv
  password: *** # for user 'customer'
```

<a id="meter-varta-energiespeicher-battery-meter"></a>
#### VARTA Energiespeicher (Battery Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: 192.0.2.2:502
    id: 1
    register:
      address: 1066 # active power
      type: input
      decode: int16
    scale: -1
  soc:
    source: modbus
    uri: 192.0.2.2:502
    id: 1
    register:
      address: 1068 # SOC
      type: input
      decode: int16
```

<a id="meter-varta-energiespeicher-grid-meter"></a>
#### VARTA Energiespeicher (Grid Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: 192.0.2.2:502
    id: 255
    register:
      address: 1078 # grid power
      type: input
      decode: int16
    scale: -1
```

<a id="meter-varta-energiespeicher-pv-meter"></a>
#### VARTA Energiespeicher (PV Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: 192.0.2.2:502
    id: 255
    register:
      address: 1102 # PV-sensor power
      type: input
      decode: uint16
```

<a id="meter-victron-energy-battery-meter"></a>
#### Victron Energy (Battery Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 842 # active DC power
      type: input
      decode: int16
    scale: -1
  soc:
    source: modbus
    uri: 192.0.2.2:502
    id: 225 # com.victronenergy.battery
    register:
      address: 266 # SoC
      type: input
      decode: uint16
    scale: 0.1
```

<a id="meter-victron-energy-grid-meter"></a>
#### Victron Energy (Grid Meter)

```yaml
- type: custom
  power:
    source: calc
    add:
    - source: modbus
      uri: 192.0.2.2:502
      id: 50 # com.victronenergy.grid
      register:
        address: 2600 # L1 grid power
        type: input
        decode: int16
    - source: modbus
      uri: 192.0.2.2:502
      id: 50 # com.victronenergy.grid
      register:
        address: 2601 # L2 grid power
        type: input
        decode: int16
    - source: modbus
      uri: 192.0.2.2:502
      id: 50 # com.victronenergy.grid
      register:
        address: 2602 # L3 grid power
        type: input
        decode: int16
```

<a id="meter-victron-energy-pv-meter"></a>
#### Victron Energy (PV Meter)

```yaml
- type: custom
  power:
    source: modbus
    uri: 192.0.2.2:502
    id: 20 # com.victronenergy.pvinverter
    register:
      address: 1052 # Total AC Power
      type: input
      decode: int32
```

<a id="meter-vzlogger-http"></a>
#### vzlogger (HTTP)

```yaml
- type: custom
  power: # power reading
    source: http # use http plugin
    uri: http://demo.volkszaehler.org/api/data/<uuid>.json?from=now
    jq: .data.tuples[0][1] # parse response json
```

<a id="meter-vzlogger-push-server"></a>
#### vzlogger (Push Server)

```yaml
- type: custom
  power:
    source: ws # use websocket plugin
    uri: ws://192.0.2.2:8082/socket
    jq: .data | select(.uuid=="<uuid>") .tuples[0][1] # parse response json
    timeout: 30s
    scale: 1
```

<a id="meter-vzlogger-split-import-export-channels"></a>
#### vzlogger (split import/export channels)

```yaml
- type: custom
  power:
    source: calc # use calc plugin
    add:
    - source: http # import channel
      uri: http://demo.volkszaehler.org/api/data/<import-uuid>.json?from=now
      jq: .data.tuples[0][1] # parse response json
    - source: http # export channel
      uri: http://demo.volkszaehler.org/api/data/<export-uuid>.json?from=now
      jq: .data.tuples[0][1] # parse response json
      scale: -1 # export must result in negative values
```

<a id="meter-wbec"></a>
#### wbec

```yaml
- type: custom
  power:
    source: mqtt
    topic: wbec/lp/1/power
  energy:
    source: mqtt
    topic: wbec/lp/1/energy
  currents:
    - source: mqtt
      topic: wbec/lp/1/currL1
    - source: mqtt
      topic: wbec/lp/1/currL2
    - source: mqtt
      topic: wbec/lp/1/currL3
```


### Chargers


<a id="charger-abl-emh--senec-wallbox-pro"></a>
#### ABL eMH / SENEC.Wallbox pro

```yaml
- type: abl
  # chargers based on the ABL EVCC2/3 controller
  # chose either locally attached on serial port:
  device: /dev/ttyUSB0
  baudrate: 38400
  comset: 8E1
  # or via external TCP-RS485 translator:
  # uri: 192.0.2.2:502
  id: 1 
  # an evcc sponsortoken is required for using this charger
```

<a id="charger-cfos-powerbrain"></a>
#### cFos PowerBrain

```yaml
- type: cfos
  uri: 192.0.2.2
  # an evcc sponsortoken is required for using this charger
```

<a id="charger-daheimladen-cloud-api"></a>
#### Daheimladen (Cloud API)

```yaml
- type: daheimladen
  token: # Request your access token from Daheimladen support: info@daheimladen.de
  stationID: xxxxxxxxxxxx990 # "Software Serial Number displayed on the display of the wallbox"
  # an evcc sponsortoken is required for using this charger
```

<a id="charger-easee-home-cloud-api"></a>
#### Easee Home (Cloud API)

```yaml
- type: easee
  user: foo@example.org
  password: *****
  charger: EH______
  cache: 10s
```

<a id="charger-eebus-compatible-wallbox-e-g-mobile-charger-connect"></a>
#### EEBUS compatible wallbox (e.g. Mobile Charger Connect)

```yaml
- type: eebus
  ski: 1234-5678-90ab-cdef-1234-5678-90ab-cdef-1234-5678 # Enter the SKI of the wallbox which can usually be found in the wallbox web interface
  forcePVLimits: true # use Overload Protection to limit PV charging, if false PV surplus is sent as recommended charging levels to the EV, but this is currently unreliable
```

<a id="charger-evse-din"></a>
#### EVSE DIN

```yaml
- type: simpleevse
  # http://evracing.cz/simple-evse-wallbox
  # either locally attached:
  device: /dev/ttyUSB0 # serial RS485 interface
  # or via TCP:
  uri: 192.0.2.2:502 # Modbus TCP converter address
```

<a id="charger-evse-wifi"></a>
#### EVSE-Wifi

```yaml
- type: evsewifi
  uri: http://192.0.2.2
```

<a id="charger-fritzdect"></a>
#### FritzDECT

```yaml
- type: fritzdect
  uri: https://fritz.box # FRITZ!Box ip address (local)
  user: xxxxxxxxxx # FRITZ!Box username (Has to have Smart Home privileges!)
  password: yyyyyyyyyy # FRITZ!Box password
  ain: '007788992233' # switch actor identification number without blanks (see AIN number on switch sticker)
  standbypower: 15 # treat as charging above this power
```

<a id="charger-generic"></a>
#### Generic

```yaml
- type: custom
  status: # charger status A..F
    source: ...
    # ...
  enabled: # charger enabled state (true/false or 0/1)
    source: ...
    # ...
  enable: # set charger enabled state (true/false or 0/1)
    source: ...
    # ...
  maxcurrent: # set charger max current (A)
    source: ...
    # ...
```

<a id="charger-go-echarger"></a>
#### go-eCharger

```yaml
- type: go-e
  uri: http://192.0.2.2 # go-e ip address (local)
```

<a id="charger-go-echarger-cloud"></a>
#### go-eCharger (Cloud)

```yaml
- type: go-e
  token: 4711c # go-e cloud API token
  cache: 10s # go-e cloud API cache duration
```

<a id="charger-heidelberg-energy-control-modbus-rtu"></a>
#### Heidelberg Energy Control (Modbus RTU)

```yaml
- type: heidelberg
  device: /dev/ttyUSB0
  baudrate: 19200
  comset: 8E1
  id: 1 # configurable (S2/DIP 1)
```

<a id="charger-i-charge-cion-modbus-rtu-over-tcp"></a>
#### i-CHARGE CION (Modbus RTU-over-TCP)

```yaml
- type: custom
  status:
    source: modbus
    uri: 192.0.2.2:502
    rtu: true # Modbus over TCP
    id: 1
    register: # manual register configuration
        address: 139 # CP-Status
        type: holding
        decode: uint16
  enabled:
    source: modbus
    uri: 192.0.2.2:502
    rtu: true # Modbus over TCP
    id: 1 
    register: # manual register configuration
      address: 100 # Zustand
      type: holding
      decode: uint16
  enable:
    source: modbus
    uri: 192.0.2.2:502
    rtu: true # Modbus over TCP
    id: 1
    register: # manual register configuration
      address: 100 # ein / aus
      type: writesingle
      decode: uint16
  maxcurrent:
    source: modbus
    uri: 192.0.2.2:502
    rtu: true # Modbus over TCP
    id: 1
    register: # manual register configuration
      address: 127 # Strom max
      type: writesingle
      decode: uint16
```

<a id="charger-innogy-ebox"></a>
#### Innogy eBox

```yaml
- type: innogy
  uri: 192.0.2.2:502
  id: 1 
  # an evcc sponsortoken is required for using this charger
```

<a id="charger-keba-connect"></a>
#### KEBA Connect

```yaml
- type: keba
  uri: 192.0.2.2
  rfid:
    tag: 765765348 # RFID tag, see `evcc charger` to show tag
```

<a id="charger-mobile-charger-connect-audi-bentley-porsche"></a>
#### Mobile Charger Connect (Audi, Bentley, Porsche)

```yaml
- type: mcc
  uri: https://192.0.2.2
  password: # home user password
```

<a id="charger-nrgkick-bt-bluetooth"></a>
#### NRGKick BT (Bluetooth)

```yaml
- type: nrgkick-bluetooth
  mac: 00:1E:C0:XX:XX:XX # BT device MAC address (sudo hcitool lescan)
  pin: 1234 # App PIN number (write protection, ignore leading zeros)
```

<a id="charger-nrgkick-connect"></a>
#### NRGKick Connect

```yaml
- type: nrgkick-connect
  uri: http://192.0.2.2
  mac: 00:1E:C0:XX:XX:XX # BT device MAC address (sudo hcitool lescan)
  password: # password
```

<a id="charger-openwb-mqtt"></a>
#### openWB (MQTT)

```yaml
- type: openwb
  broker: 192.0.2.2 # openWB IP
  id: 1 # loadpoint id
```

<a id="charger-phoenix-em-cp-pp-eth-controller-modbus-tcp"></a>
#### Phoenix EM-CP-PP-ETH Controller (Modbus TCP)

```yaml
- type: phoenix-em-eth
  uri: 192.168.0.8:502
  meter: # only if a charge meter is connected to the controller
    power: true
    energy: true
    currents: true
```

<a id="charger-phoenix-ev-eth-controller-modbus-tcp"></a>
#### Phoenix EV-ETH Controller (Modbus TCP)

```yaml
- type: phoenix-ev-eth
  uri: 192.168.0.8:502
  meter: # only if a charge meter is connected to the controller
    power: true
    energy: true
    currents: true
```

<a id="charger-phoenix-ev-ser-controller-modbus-rtu"></a>
#### Phoenix EV-SER Controller (Modbus RTU)

```yaml
- type: phoenix-ev-ser
  device: /dev/ttyUSB0
  baudrate: 9600 # configurable (S2/DIP 1)
  comset: 8N1
  id: 1 # configurable (S2/DIP 2–6)
```

<a id="charger-shelly"></a>
#### Shelly

```yaml
- type: shelly
  uri: http://192.0.2.2  # shelly device ip address (local)
  channel: 0  # shelly device relay channel 
  standbypower: 15  # treat as charging above this power
```

<a id="charger-tasmota"></a>
#### Tasmota

```yaml
- type: tasmota
  uri: http://192.168.xxx.xxx # tasmota device ip address (local)
  # user: xxxx # user, (optional) in case user + password are defined
  # password: xxxxx #  (optional) in case user + password are defined
  standbypower: 15 # treat as charging above this power
```

<a id="charger-tinkerforge-warp-charger"></a>
#### TinkerForge WARP Charger

```yaml
- type: warp
  broker: 192.0.2.2:1883
  topic: warp
  useMeter: true # WARP Charger Pro
  timeout: 30s
```

<a id="charger-tp-link-smart-plug"></a>
#### TP-LINK Smart Plug

```yaml
- type: tplink
  uri: 192.0.2.2 # TP-LINK Smart Plug ip address (local)
  standbypower: 15 # treat as charging above this power
```

<a id="charger-wallbe-eco-pro"></a>
#### Wallbe (Eco, Pro)

```yaml
- type: wallbe
  uri: 192.168.0.8:502 # TCP ModBus address
  meter: # only if a charge meter is connected to the controller
    power: true
    energy: true
    currents: true
```

<a id="charger-wbec"></a>
#### wbec

```yaml
- type: custom
  status:
    source: mqtt
    topic: wbec/lp/1/status
  enabled:
    source: mqtt
    topic: wbec/lp/1/enabled
  enable:
    source: mqtt
    topic: wbec/lp/1/enable
  maxcurrent:
    source: mqtt
    topic: wbec/lp/1/maxcurrent
```


### Vehicles


<a id="vehicle-audi"></a>
#### Audi

```yaml
- type: audi
  title: eTron # display name for UI
  capacity: 14 # kWh
  user: # user
  password: # password
  vin: WAUZZZ... # optional
```

<a id="vehicle-bmw"></a>
#### BMW

```yaml
- type: bmw
  title: i3 # display name for UI
  capacity: 65 # kWh
  user: # user
  password: # password
  vin: WBMW... # optional
```

<a id="vehicle-citroen"></a>
#### Citroen

```yaml
- type: citroen
  title: e-C4 # display name for UI
  capacity: 50 # kWh
  user: user@example.com
  password: xxx
  vin: # optional
```

<a id="vehicle-evnotify-http"></a>
#### evNotify (HTTP)

```yaml
- type: custom
  title: My Car # display name for UI
  capacity: 64 # kWh
  charge:
    type: http
    uri: https://app.evnotify.de/soc?akey=AKEY&token=1234567890abcdef # evNotify Server + AKEY
    method: GET
    jq: .soc_display
  cache: 5m # cache duration
```

<a id="vehicle-fiat"></a>
#### Fiat

```yaml
- type: fiat
  title: Neuer 500 # display name for UI
  capacity: 42 # kWh
  user: # user
  password: # password
  vin: ZFAE... # optional
  pin: xxxx #mandatory to deep refresh SoC
```

<a id="vehicle-ford"></a>
#### Ford

```yaml
- type: ford
  title: Kuga # display name for UI
  capacity: 10 # kWh
  user: # user
  password: # password
  vin: WF0FXX... # optional
```

<a id="vehicle-generic"></a>
#### Generic

```yaml
- type: custom
  title: Mein Auto # display name for UI
  capacity: 50 # byttery capacity (kWh)
  charge: # battery soc (%)
    source: # plugin type
    # ...
  status: # optional charge status (A..F)
    source: # plugin type
    # ...
  range: # optional electric range (km)
    source: # plugin type
    # ...
  cache: 5m # optional cache duration
```

<a id="vehicle-hyundai"></a>
#### Hyundai

```yaml
- type: hyundai
  title: Kona # display name for UI
  capacity: 64 # kWh
  user: # user
  password: # password
```

<a id="vehicle-kia"></a>
#### Kia

```yaml
- type: kia
  title: e-Niro # display name for UI
  capacity: 64 # kWh
  user: # user
  password: # password
```

<a id="vehicle-mini"></a>
#### Mini

```yaml
- type: mini
  title: Cooper SE # display name for UI
  capacity: 32 # kWh
  user: # user
  password: # password
  vin: WBMW... # optional
```

<a id="vehicle-nissan"></a>
#### Nissan

```yaml
- type: nissan
  title: Leaf # display name for UI
  capacity: 60 # kWh
  user: # user
  password: # password
```

<a id="vehicle-niu-e-scooter"></a>
#### NIU E-Scooter

```yaml
- type: niu
  title: NIU E-Scooter # display name for UI
  capacity: 4 # kWh
  user: xxxxxxx # NIU app user
  password: xxxxxx # NIU app password
  serial: NXXXXXXXXXXXXXXX # NIU E-Scooter serial number like shown in app
```

<a id="vehicle-opel"></a>
#### Opel

```yaml
- type: opel
  title: Corsa-e # display name for UI
  capacity: 50 # kWh
  user: user@example.com
  password: xxx
  vin: # optional
```

<a id="vehicle-ovms"></a>
#### OVMS

```yaml
- type: ovms
  title: Open Vehicle Monitoring System # display name for UI
  capacity: 12 # kWh
  user: # user server
  password: # password server
  vehicleid: # vehicle id
  server: dexters-web.de # used ovms server [dexters-web.de or api.openvehicles.com]
```

<a id="vehicle-peugeot"></a>
#### Peugeot

```yaml
- type: peugeot
  title: e-208 # display name for UI
  capacity: 50 # kWh
  user: user@example.com
  password: xxx
  vin: # optional
```

<a id="vehicle-porsche"></a>
#### Porsche

```yaml
- type: porsche
  title: Taycan # display name for UI
  capacity: 83 # kWh
  user: # user
  password: # password
  vin: WP...
```

<a id="vehicle-renault"></a>
#### Renault

```yaml
- type: renault
  title: Zoe # display name for UI
  capacity: 60 # kWh
  user: # user
  password: # password
  vin: WREN... # optional
```

<a id="vehicle-tesla"></a>
#### Tesla

```yaml
- type: tesla
  title: Model S # display name for UI
  capacity: 90 # kWh
  tokens:
    access: ...
    refresh: ...
  vin: # optional
```

<a id="vehicle-tronity-cloud-service"></a>
#### Tronity Cloud Service

```yaml
- type: tronity
  title: Golf # display name for UI
  capacity: 10 # kWh
  credentials:
    id: # user id
    secret: # secret
  tokens:
    access: # access token
    refresh: # refresh token
  vin: W... # VIN
  cache: 5m # optional
```

<a id="vehicle-vw-e-up-e-golf-etc"></a>
#### VW (e-Up, e-Golf, etc)

```yaml
- type: vw
  title: Golf # display name for UI
  capacity: 10 # kWh
  user: # user
  password: # password
  vin: WVWZZZ... # optional
```

<a id="vehicle-vw-id-id-3-id-4-but-also-e-golf-e-up"></a>
#### VW ID (ID.3, ID.4, but also e-Golf, e-Up)

```yaml
- type: id
  title: ID.3 # display name for UI
  capacity: 50 # kWh
  user: # user
  password: # password
  vin: WVWZZZ... # optional
```

