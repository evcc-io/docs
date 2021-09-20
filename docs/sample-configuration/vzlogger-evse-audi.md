---
sidebar_position: 1
---

# VZLogger, evse-wifi & Audi

Save your configuration as `evcc.yaml`.

## Simple configuration with vzlogger as meters, evse-wifi as charger for Audi

All meter channels are read from vzlogger (vokszahler). aggtime in vzlogger must be less than configured intervall. Import and Exportport in grid meter is read in two different chnnels which must be comibined with calc plugin. No external logging, beside power meter in volkszaehler, is used.

```yaml
uri: 0.0.0.0:7070 # uri for ui
interval: 20s # control cycle interval

# All meters are channels from vzlogger (volkszaehler)
meters:
- name: vzpvmeter # pv Ertrag
  type: custom
  power:
    type: http
    uri: http://volkszaehler/api/data/bbbbbbbb-xxxx-yyyy-zzzz-aaaaaaaaaaaa.json?from=now
    jq: .data.tuples[0][1] # parse response json
- name: vzgridmeter # combined
  type: custom
  power:
    type: calc
    add:
      - type: http
        uri: http://volkszaehler/api/data/bbbbbbbb-xxxx-yyyy-zzzz-aaaaaaaaaaa1.json?from=now #Bezug
        jq: .data.tuples[0][1] # parse response json
      - type: http
        type: http
        uri: http://volkszaehler/api/data/bbbbbbbb-xxxx-yyyy-zzzz-aaaaaaaaaaa2.json?from=now # Einspeisung
        jq: .data.tuples[0][1] # parse response json
        scale: -1
- name: vzwbmeter # Wallbox
  type: custom
  power:
    type: http
    uri: http://volkszaehler/api/data/bbbbbbbb-xxxx-yyyy-zzzz-aaaaaaaaaaa3.json?from=now
    jq: .data.tuples[0][1] # parse response json

chargers:
- name: evsewifi
  type: evsewifi
  uri: 10.0.0.210

vehicles:
- name: audi
  type: audi
  title: A3 e-tron
  capacity: 8 # kWh
  user: yyyy@zzzzz.com # of audi app login
  password: xxxxxxx # password of audi app login
  vin: WAUZxxxxxxxxxx # your car VIN
  cache: 10m

loadpoints:
- name: main # name for logging
  vehicle: audi
  charger: evsewifi
  meters:
    grid: vzgridmeter
    pv: vzpvmeter # optional
    charge: vzwbmeter # optional
  enable: # pv mode enable behavior
    delay: 2m
    threshold: 0 # minimum export power (W). If zero, export must exceeds minimum charge power to enable
  disable: # pv mode disable behavior
    delay: 2m
    threshold: 500 # maximum import power (W)
  sensitivity: 1 # current raise/lower steps size (default 1A)
  guardduration: 20s # switch charger contactor not more often than this (default 10m)
  maxcurrent: 16 # maximum charge current (default 16A)
  phases: 1 # ev phases (default 3)
```

 I use Loxone to set charging mode (min + pv or pv), depending on weekday.