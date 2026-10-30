---
title: "Redirection OCPP"
description: "Montre comment rediriger les messages OCPP d’un chargeur depuis evcc vers un backend externe, p. ex. une plateforme de facturation, sans perdre la main sur la charge."
translatedFrom: "df48634d807d"
---

Il arrive que des sessions de charge doivent parvenir à un backend OCPP externe, p. ex. une plateforme de facturation pour le remboursement par l’employeur ou un opérateur de points de charge.
Un chargeur ne peut normalement communiquer qu’avec un seul serveur OCPP.
Avec la redirection, le chargeur reste connecté à votre instance evcc, qui transmet aussi ses messages au serveur externe.
evcc continue de gérer la charge.
Le serveur externe reçoit les sessions de charge et les valeurs du compteur en direct et peut, si vous l’y autorisez, également piloter le chargeur.

## Mise en place {#setup}

La redirection est disponible pour les chargeurs intégrés via OCPP, c.-à-d. les chargeurs qui utilisent evcc comme serveur OCPP.
Configurez d’abord le chargeur, puis sa redirection.

1. Ouvrez **Configuration → Serveur OCPP**.
2. La liste **IDs des stations** affiche vos chargeurs OCPP connectés. Cliquez sur le bouton en forme de nuage à côté du chargeur pour ouvrir la boîte de dialogue **Redirection OCPP**.
3. Saisissez l’**URL du serveur en amont**, c.-à-d. l’adresse du serveur vers lequel rediriger, p. ex. `wss://billing.example.com/ocpp`.
4. Si le serveur externe exige une authentification, saisissez le **Nom d’utilisateur** et le **Mot de passe en amont** (HTTP Basic Auth). S’il attend un autre identifiant de chargeur, renseignez l’**Identifiant de station en amont**.
5. Cliquez sur **Enregistrer**. La redirection démarre immédiatement, sans redémarrage.

L’icône en forme de nuage à côté du chargeur indique si la redirection fonctionne.
Les problèmes de connexion sont affichés dans la boîte de dialogue.

Pour arrêter la redirection, rouvrez la boîte de dialogue et cliquez sur **Supprimer**.

## Commandes du serveur en amont {#upstream-commands}

Par défaut, le serveur externe peut envoyer des commandes au chargeur.
Pour éviter des conflits avec le pilotage de la charge, activez **Bloquer les commandes du serveur en amont** dans les paramètres avancés.
Le serveur continue de recevoir tous les messages du chargeur, mais evcc garde seul le contrôle.

## Certificats {#certificates}

Les paramètres avancés permettent aussi de configurer TLS.
Activez **Autoriser les certificats auto-signés** pour les installations de test sans certificat valide.
Fournissez un **Certificat serveur (CA)** si le serveur externe utilise un certificat émis par une autorité de certification privée.
