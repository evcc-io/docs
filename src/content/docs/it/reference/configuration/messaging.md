---
title: "messaging"
description: "Configura le notifiche in evcc.yaml, scegli quali eventi di ricarica inviano un messaggio, scrivi i template dei messaggi e scopri quali servizi li recapitano."
sidebar:
  order: 13
translatedFrom: "3cc3fbca407b"
---

La sezione `messaging` configura le [notifiche](/it/notifications) sulle sessioni di ricarica tramite servizi come Telegram, Pushover, ntfy o e-mail.
`events` definisce per quali eventi vengono inviati i messaggi, mentre `services` stabilisce dove vengono inviati.

**Esempio**:

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` definisce il contenuto dei messaggi per vari eventi predefiniti.

Gli eventi disponibili sono:

- `start`: la ricarica è iniziata
- `stop`: la ricarica si è fermata
- `connect`: veicolo collegato
- `disconnect`: veicolo scollegato
- `soc`: il livello di carica del veicolo è cambiato
- `guest`: rilevato un veicolo sconosciuto
- `asleep`: il veicolo non si ricarica nonostante l’abilitazione alla ricarica
- `planoverrun`: si prevede che il piano di ricarica non raggiunga il suo obiettivo

**Esempio**:

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` definisce il testo del titolo del messaggio.

### `msg`

`msg` definisce il corpo del messaggio.
Titoli e messaggi supportano segnaposto, nella forma semplice `${variableName}` oppure come template Go (`{{.variableName}}`).
Le variabili disponibili sono elencate in [formato dei messaggi](/it/notifications#message-format).

**Esempio** (sintassi semplice):

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

**Esempio** (sintassi dei template Go con calcoli e condizioni):

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

`services` definisce un elenco di servizi di messaggistica da usare.

**Esempio**:

```yaml
services:
  - type: template
    template: pushover
    app: 12345
    recipients:
      - 234567
```

I servizi disponibili e i loro parametri sono elencati nella pagina delle [notifiche](/it/notifications#services).
Ogni pagina di servizio mostra un esempio di `evcc.yaml` pronto all’uso.

Inoltre, `type: custom` consente di usare qualsiasi [plugin](/it/reference/plugins) con accesso in scrittura.
Vedi [servizio di notifica definito dall’utente](/it/user-defined-devices#notification-service).
