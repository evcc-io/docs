---
title: "messaging"
description: "Configurez dans evcc.yaml les notifications en choisissant les événements de charge qui déclenchent un message, le texte des messages et les services qui les envoient."
sidebar:
  order: 13
translatedFrom: "3cc3fbca407b"
---

La section `messaging` configure les [notifications](/fr/notifications) sur les sessions de charge via des services comme Telegram, Pushover, ntfy ou l’e-mail.
`events` définit les événements qui déclenchent un message, et `services` les canaux par lesquels ils sont envoyés.

**Par exemple** :

```yaml
messaging:
  events: ...
  services: ...
```

## `events`

`events` définit le contenu des messages pour différents événements prédéfinis.

Les événements disponibles sont :

- `start` : la charge a démarré
- `stop` : la charge s’est arrêtée
- `connect` : véhicule connecté
- `disconnect` : véhicule déconnecté
- `soc` : le niveau de charge du véhicule a changé
- `guest` : véhicule inconnu détecté
- `asleep` : le véhicule ne charge pas malgré l’autorisation de charge
- `planoverrun` : le plan de charge risque de ne pas atteindre son objectif

**Par exemple** :

```yaml
start: # charge start event
  title: Charge started
  msg: Started charging in "${mode}" mode
```

### `title`

`title` définit le texte du titre du message.

### `msg`

`msg` définit le texte du contenu du message.
Les titres et les messages prennent en charge des espaces réservés, soit sous la forme simple `${variableName}`, soit sous forme de templates Go (`{{.variableName}}`).
Les variables disponibles sont listées sous [format des messages](/fr/notifications#message-format).

**Exemple** (syntaxe simple) :

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

**Exemple** (syntaxe de template Go avec calculs et conditions) :

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

`services` définit une liste de services de messagerie à utiliser.

**Par exemple** :

```yaml
services:
  - type: template
    template: pushover
    app: 12345
    recipients:
      - 234567
```

Les services disponibles et leurs paramètres sont listés sur la page des [notifications](/fr/notifications#services).
La page de chaque service propose un exemple `evcc.yaml` prêt à l’emploi.

En outre, `type: custom` permet d’utiliser n’importe quel [plugin](/fr/reference/plugins) avec accès en écriture.
Consultez la section [Service de notification défini par l’utilisateur](/fr/user-defined-devices#notification-service).
