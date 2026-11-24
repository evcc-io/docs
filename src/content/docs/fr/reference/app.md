---
title: "Application evcc"
description: "L’application evcc gère les liens evcc:// pour préremplir la saisie d’un serveur ou ouvrir les prévisions ou un point de charge, pour faciliter la prise en main."
sidebar:
  order: 4
translatedFrom: "3208311edbc2"
---

L’[application compagnon](/fr/features/app) enregistre le schéma d’URL `evcc://` sur votre appareil.
Ouvrez un tel lien pour préremplir la configuration du serveur ou accéder directement à une page.

## Ajouter un serveur {#server}

Ouvre le formulaire d’ajout de serveur avec des valeurs préremplies.
Tous les paramètres sont facultatifs.

Pratique pour la prise en main : partagez un lien ou un code QR qui renseigne l’URL du serveur et les identifiants, pour que personne n’ait à saisir une longue adresse à la main.

```
evcc://server?url=...&title=...&username=...&password=...
```

| Paramètre  | Description               |
| ---------- | ------------------------- |
| `url`      | URL du serveur            |
| `title`    | Nom affiché               |
| `username` | Nom d’utilisateur         |
| `password` | Mot de passe de connexion |

Veillez à encoder les valeurs pour l’URL.

```
evcc://server?url=https://demo.evcc.io&title=Demo%20Server&username=admin&password=secret
```

![Code QR du lien d’exemple](https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=evcc%3A%2F%2Fserver%3Furl%3Dhttps%3A%2F%2Fdemo.evcc.io%26title%3DDemo%2520Server%26username%3Dadmin%26password%3Dsecret&qzone=1&margin=0&size=150x150&ecc=L)

## Ouvrir les prévisions {#forecast}

Affiche la page des prévisions.

```
evcc://forecast?server=<index>
```

`server` est l’index d’un serveur enregistré, à partir de 0.
S’il est omis, le serveur actif est utilisé.

## Ouvrir un point de charge {#loadpoint}

Affiche la page des points de charge.

```
evcc://loadpoint?lp=<number>&server=<index>
```

`lp` sélectionne le point de charge portant ce numéro, à partir de 1.
S’il est omis, le point de charge actuel est utilisé.
`server` fonctionne comme ci-dessus.
