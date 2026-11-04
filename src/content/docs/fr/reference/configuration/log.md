---
title: "log, levels"
description: "Réglez dans evcc.yaml le niveau de journalisation, de fatal à trace, et augmentez-le pour certains composants, comme un point de charge."
sidebar:
  order: 11
translatedFrom: "5f61ea01c519"
---

## `log`

Définit le niveau de détail des informations de journalisation affichées dans la console.

**Valeurs possibles** :

- `fatal` : seuls les messages de la catégorie `fatal` sont affichés. Il s’agit d’erreurs qui empêchent le système de fonctionner.
- `error` : seuls les messages de la catégorie `error` sont affichés. Ce type de message est très rare.
- `warn` : inclut `error` et affiche en plus les messages de la catégorie `warn`.
- `info` : inclut `warn` et affiche en plus les messages de la catégorie `info`.
- `debug` : inclut `info` et affiche en plus les messages de la catégorie `debug`. Ce niveau est nécessaire pour analyser les erreurs.
- `trace` : inclut `debug` et affiche en plus les messages de la catégorie `trace`. C’est la catégorie la plus détaillée, elle peut produire de très gros volumes de journaux. En général, elle n’est pas nécessaire !

Ce paramètre s’applique aux [journaux à long terme](/fr/report-a-problem#system-logs) de votre installation.
La page Journaux de l’interface web enregistre toujours tous les niveaux (voir [Journaux](/fr/report-a-problem#logs)).

**Par exemple** :

```yaml
log: error
```

---

## `levels`

Permet de configurer différents niveaux de journalisation pour les différents composants d’evcc.

Définit le niveau de détail de la journalisation pour les différents composants d’evcc.

**Composants possibles** :

- `site` : le composant central d’evcc (régulation, calculs, etc.)
- `lp-X` : le point de charge concerné, `X` étant sa position dans la configuration [`loadpoints`](/fr/reference/configuration/loadpoints) (points de charge), en commençant à `1`
- `sma` : le composant HEMS de SMA si le SMA Sunny Home Manager 2.0 est intégré via [`hems`](/fr/reference/configuration/hems)
- _`vehicle`_ : chaque [`vehicle`](/fr/reference/configuration/vehicles) (véhicule), pour lequel vous devez indiquer la valeur correspondante du paramètre [`type`](/fr/reference/configuration/vehicles#type) (ou du template).
- Selon le cas d’usage, d’autres composants peuvent également être indiqués (p. ex. `cache`, `db`, `influx`, `mqtt`)

**Valeurs possibles pour chaque composant** : identiques aux valeurs de [`log`](#log)

**Par exemple** :

```yaml
levels:
  site: debug
  lp-1: debug
  lp-2: debug
  tesla: trace
```
