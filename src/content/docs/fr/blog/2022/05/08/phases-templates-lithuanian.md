---
date: 2022-05-08
title: "Gestion des phases, modèles et lituanien"
description: "Récapitulatif de mai 2022 des versions 0.81 à 0.91 avec de nombreux nouveaux chargeurs et véhicules, une meilleure commutation de phases, des modèles et le lituanien."
authors: [naltatis]
tags: [release]
prev: false
next: false
translatedFrom: "be2964228ce3"
---

Quelques mois se sont écoulés depuis le dernier article de blog. Il est donc temps de vous donner un bref résumé et un aperçu de ce qui s’est passé chez evcc au cours des onze dernières versions (v0.81 à v0.91).

<!-- excerpt -->

## Nouveaux appareils pris en charge

La liste du matériel pris en charge par evcc ne cesse de s’allonger.

### Chargeurs 🔌

Nous avons ajouté quelques intégrations de chargeurs. Comme evcc prend désormais aussi en charge le très répandu [Bender Controller](https://github.com/evcc-io/evcc/pull/3103), nous avons pu élargir considérablement la gamme d’appareils pris en charge.

Voici les fabricants ajoutés depuis le début de l’année : Alphatec, Ebee, Ensto, Garo, HardyBarth, Innogy, Juice, Mennekes, OpenWB Pro, Optec, PC Electric, SmartWB, TechniSat, Tapo Smarthome, Ubitricity, Vestel, Webasto. [(Tous les chargeurs)](/fr/chargers)

### Véhicules 🚗 🛵

Audi (e-tron), Cupra, Jaguar, Landrover, Mercedes, Silence S01, Smart. [(Tous les véhicules)](/fr/vehicles)

### Onduleurs ☀️ 🔋

SMA (Smart Energy Hybrid), Huawei (SUN2000), Solarwatt, Solax, Varta. [(Tous les compteurs)](/fr/meters)

### Compteurs avant réseau 📟

SMA (Data Manager M Lite), Shelly (1PM, 3EM), Siemens (PAC 2200), OpenEMS, TQ. [(Tous les compteurs)](/fr/meters)

### Prise en charge RFID 🪪

Les chargeurs d’Easee et de Warp peuvent désormais aussi utiliser la [fonction RFID d’evcc pour la détection du véhicule](/fr/features/vehicle).

## Gestion des phases améliorée (1P/3P)

La première version de la commutation de phases pour les chargeurs compatibles est disponible dans evcc depuis le milieu de l’année dernière. Nous avons pu acquérir de l’expérience et, sur cette base, nous avons [profondément remanié](https://github.com/evcc-io/evcc/pull/2613) le mécanisme en février. La commutation de phases est ainsi bien plus fiable et se comporte aussi mieux en cas de configuration ou de valeurs mesurées inconnues ou peu plausibles.

## Modèles et documentation

[En décembre](/fr/blog/2021/12/12/version-0-73#evcc-configure), nous avons posé les bases d’une configuration initiale plus simple avec l’assistant de configuration en ligne de commande `evcc configure`.

La syntaxe de configuration d’evcc est très flexible et puissante. Par exemple, des appareils qui ne sont pas encore officiellement pris en charge peuvent souvent être intégrés uniquement par configuration, si l’on connaît les registres Modbus et les structures JSON correspondants de l’interface. Dans le dépôt `evcc-io/config`, désormais archivé, nous avions rassemblé des exemples de configuration que l’on pouvait copier-coller dans sa propre configuration.

Avec l’assistant en ligne de commande, nous avons introduit le concept de **modèles**. Les modèles nous permettent d’encapsuler proprement le code répétitif et les connaissances internes sur les appareils (protocoles, adresses, types de données, noms de champs). L’exemple suivant, qui configure un compteur avant réseau Solarlog, illustre assez bien ce changement :

Avant :

```yaml
meters:
  - name: my_solarlog
    type: custom
    power:
      source: calc
      add:
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3502
            type: input
            decode: uint32s
          scale: -1
        - source: modbus
          uri: 192.168.0.77:502
          id: 1
          register:
            address: 3518
            type: input
            decode: uint32s
```

Après :

```yaml
meters:
  - name: my_solarlog
    type: template
    template: solarlog
    usage: grid
    host: 192.168.0.77
```

L’utilisateur n’a plus qu’à connaître le nom d’hôte ou l’adresse IP de son appareil Solarlog et à le saisir. Le protocole et la structure des données sont encapsulés dans le modèle `solarlog`.

De plus, les modèles comportent une description structurée de tous les paramètres obligatoires et facultatifs, ainsi que des valeurs par défaut et des textes d’aide localisés.

[Depuis mars](https://github.com/evcc-io/docs/pull/92), nous avons converti la [documentation des appareils sur docs.evcc.io](/fr/chargers) au format des modèles. Les anciennes syntaxes fonctionnent bien sûr toujours. Comme les futures fonctionnalités telles que la configuration via le navigateur (oui, elle arrivera 😄) reposent sur `type: template`, nous vous recommandons de convertir dès maintenant vos configurations existantes au nouveau format.

## Nouvelle langue : le lituanien 🇱🇹

Avec la v0.91, nous avons reçu une nouvelle traduction de l’interface. L’interface evcc est désormais aussi disponible en lituanien. C’est la quatrième langue, en plus de l’allemand, de l’anglais et de l’italien. Merci beaucoup à [RTTTC](https://github.com/RTTTC) 💚.

Comme nos connaissances linguistiques sont relativement limitées, nous sommes toujours reconnaissants pour les contributions de traduction. Il n’existe actuellement pas de documentation à ce sujet, mais si cela vous intéresse, jetez simplement un œil à la [pull request de RTTC](https://github.com/evcc-io/evcc/pull/3205).

## Et ensuite ?

Certains d’entre vous l’ont peut-être déjà vu. Avec la prochaine version, evcc recevra une interface utilisateur entièrement repensée. Elle est déjà disponible dans les versions nightly actuelles, et vous trouverez [ici](https://github.com/evcc-io/evcc/discussions/3149) et [ici](https://github.com/evcc-io/evcc/pull/2889) des informations sur le processus de développement. Mais nous en reparlerons dans le prochain article de blog.

## Corrections de bugs

Les dernières versions contenaient de nombreuses corrections de bugs et beaucoup de petites améliorations. Vous en trouverez la liste détaillée via les liens vers les journaux des modifications ci-dessous.

## Journaux des modifications

Vous trouverez ici plus de détails sur les dernières modifications :

- [Version 0.91](https://github.com/evcc-io/evcc/releases/tag/0.91)
- [Version 0.90](https://github.com/evcc-io/evcc/releases/tag/0.90)
- [Version 0.89](https://github.com/evcc-io/evcc/releases/tag/0.89)
- [Version 0.88](https://github.com/evcc-io/evcc/releases/tag/0.88)
- [Version 0.87](https://github.com/evcc-io/evcc/releases/tag/0.87)
- [Version 0.86](https://github.com/evcc-io/evcc/releases/tag/0.86)
- [Version 0.85](https://github.com/evcc-io/evcc/releases/tag/0.85)
- [Version 0.84](https://github.com/evcc-io/evcc/releases/tag/0.84)
- [Version 0.83](https://github.com/evcc-io/evcc/releases/tag/0.83)
- [Version 0.82](https://github.com/evcc-io/evcc/releases/tag/0.82)
- [Version 0.81](https://github.com/evcc-io/evcc/releases/tag/0.81)
