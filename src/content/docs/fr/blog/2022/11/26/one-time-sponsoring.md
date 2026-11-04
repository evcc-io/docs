---
date: 2022-11-26
title: "Parrainage et déménagements"
description: "En novembre 2022, nous avons lancé le parrainage ponctuel et les jetons de contributeur, expliqué notre financement et déplacé le parrainage GitHub et l’image Docker."
authors: [naltatis]
tags: [sponsoring]
prev: false
next: false
translatedFrom: "0c199b1a29ca"
---

Dix-sept nouvelles versions sont sorties depuis notre dernière mise à jour sur ce blog.
Comme toujours, il s’est passé beaucoup de choses.
Il y a eu quelques corrections de bugs, mais aussi de nombreuses nouvelles intégrations et fonctionnalités.
Nous reviendrons sur nos temps forts des derniers mois dans un prochain article.

<!-- excerpt -->

## 🌱 Un développement open source durable

evcc a commencé comme un petit projet de loisir, parce que nous n’étions pas satisfaits des solutions existantes pour la charge sur surplus solaire et que nous voulions construire quelque chose de mieux.
Aujourd’hui, evcc ne se contente plus de faciliter notre propre charge solaire.
Il existe probablement plusieurs milliers d’installations qui réveillent la voiture le matin dès que le soleil brille sur l’installation photovoltaïque de la maison.
Cette idée nous rend très heureux.

Nous n’avons pas de chiffres précis sur notre base d’utilisateurs.
Nous tenons à la minimisation des données et n’avons donc aucune intention d’intégrer des outils de suivi à grande échelle dans notre site web ou dans l’application.
Les chiffres de Docker (plus d’un million de pulls à ce jour) et de Cloudsmith (actuellement environ 4 500 téléchargements de paquets par jour) montrent néanmoins assez clairement que beaucoup de personnes comptent sur evcc au quotidien.

Un financement durable est essentiel pour entretenir et faire évoluer le projet en s’y consacrant pleinement.
Derrière evcc, il n’y a ni grande entreprise ni fabricant de chargeurs, et nous n’avons aucune envie de jouer le jeu des start-up avec des investisseurs.
Actuellement, evcc est un projet que nous faisons avancer pendant notre temps libre.
Nous sommes convaincus que c’est une bonne idée de travailler directement pour vous, les utilisateurs, et de rester indépendants de toute autre obligation ou contrainte.

Avec le **parrainage GitHub**, nous avons trouvé une solution très légère et simple pour recevoir un soutien financier directement de la part des utilisateurs.
Cela nous permet aussi de proposer **certaines fonctionnalités en exclusivité aux parrains**.
Actuellement, il s’agit de certains types de chargeurs et de la fonction de télémétrie, mais nous pouvons tout à fait imaginer adapter ce modèle à l’avenir.

## 💚 Merci à tous les parrains

Nous comptons actuellement **plus de 1 500 parrains** 🥳 qui versent une contribution mensuelle d’au moins 2 $.
C’est vraiment génial, c’est une grande marque de confiance et cela nous encourage à continuer d’investir beaucoup de temps dans le projet.

En plus du jeton de parrain qui débloque des fonctionnalités, nous envoyons volontiers des autocollants à toutes les personnes qui nous soutiennent.
Vous pouvez en décorer votre ordinateur portable, votre Raspberry Pi, votre chargeur ou votre borne de recharge.
Vous trouverez le lien vers le formulaire des autocollants dans l’interface evcc, en bas à droite, en cliquant sur le symbole du soleil.

| [@evcc_io](https://twitter.com/evcc_io/status/1489667714411114502)                                                                                      | [@Ein_Klimawender](https://twitter.com/Ein_Klimawender/status/1589844295992819712)                                                                             | [@frd9900](https://twitter.com/frd9900/status/1591416016848162816)                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Tweet de @evcc_io](../../../../../en/blog/2022/11/26/sticker_evcc.jpeg)](https://twitter.com/evcc_io/status/1489667714411114502)                     | [![Tweet de @Ein_Klimawender](../../../../../en/blog/2022/11/26/sticker_Ein_Klimawender.jpeg)](https://twitter.com/Ein_Klimawender/status/1589844295992819712) | [![Tweet de @frd9900](../../../../../en/blog/2022/11/26/sticker_frd9900.jpeg)](https://twitter.com/frd9900/status/1591416016848162816)                    |
| [@ABBolle](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333)                                                                  | [@rediculum](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)                                                                              | [@123aerox](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806)                                                                   |
| [![GitHub @ABBolle](../../../../../en/blog/2022/11/26/sticker_ABBolle.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333) | [![GitHub @rediculum](../../../../../en/blog/2022/11/26/sticker_rediculum.png)](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)           | [![GitHub @123aerox](../../../../../en/blog/2022/11/26/sticker_123aerox.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806) |

## 📮 Parrainage ponctuel

On nous a fait savoir à plusieurs reprises que les paiements mensuels gênent certains utilisateurs, qui souhaiteraient pouvoir payer une seule fois pour obtenir un jeton de parrain.
C’est désormais possible.
La [page de parrainage GitHub](https://github.com/sponsors/evcc-io?frequency=one-time) propose maintenant des paliers ponctuels en plus des paliers mensuels.
Voici les paliers que nous avons imaginés :

- **🌱 100 $ - Développement durable**<br />Vous nous aidez à continuer d’investir beaucoup d’énergie dans le développement d’evcc. Vous recevez en outre **un jeton de parrain sans date d’expiration**, qui vous permet d’utiliser toutes les fonctionnalités d’evcc.
- ~~**☀️ 150 $ - Amis et famille**<br />Vous recevez **trois jetons de parrain sans date d’expiration**. Un pour vous et deux autres que vous pouvez offrir à vos amis ou à votre famille. Vous êtes mentionné comme parrain sur [evcc.io](https://evcc.io).~~
- **🚛 1 000 $ - Prescripteur**<br />Pour les électriciens et les installateurs solaires. Vous souhaitez utiliser evcc chez plusieurs clients ? Écrivez-nous à [info@evcc.io](mailto:info@evcc.io) et nous trouverons une bonne solution.

Les jetons de parrain sans date d’expiration sont émis exactement comme aujourd’hui via [sponsor.evcc.io](https://sponsor.evcc.io).
La seule différence est que le jeton n’expire pas.

:::note[Mise à jour]
Nous avons adapté les paliers de parrainage en 2026.
Plus d’informations dans notre [dernier article de blog](/fr/blog/2026/01/01/highlights-browser-config-ready#sponsoring).
:::

## 🎟️ Jetons de contributeur

Les membres de la communauté qui ont contribué de manière substantielle à evcc via des PR GitHub peuvent aussi recevoir un jeton gratuit.
Les corrections de bugs sont toujours les bienvenues, mais nous avons aussi grand besoin d’aide pour la documentation et la [traduction](https://github.com/evcc-io/evcc/discussions/5218).

Nous n’avons pas défini précisément ce qu’est une contribution substantielle.
Corriger une virgule mal placée ne suffit pas encore, mais corriger un bug coriace, sans aucun doute.
Écrivez-nous simplement un e-mail à [info@evcc.io](mailto:info@evcc.io) en indiquant votre nom d’utilisateur GitHub.

## 🚚 Le parrainage GitHub déménage

Actuellement, le parrainage GitHub passe par le compte de [@andig](https://github.com/andig), le fondateur d’evcc.
Le montant qui reste chaque mois après les dépenses (infrastructure, autocollants, etc.) est réparti entre les trois membres de l’équipe principale selon une clé de répartition.
Pour rendre ce processus plus transparent, nous transférons maintenant notre parrainage GitHub vers l’[organisation evcc-io](https://github.com/sponsors/evcc-io).
Si vous êtes déjà parrain, vous n’avez rien à changer.
Votre jeton continue de fonctionner comme d’habitude et votre contribution parvient toujours à tous les membres de l’équipe.
Nous avons cependant redirigé tous les liens de parrainage vers l’organisation.
Les paiements ponctuels ne sont possibles que là-bas.

[![Migration du parrainage GitHub](../../../../../en/blog/2022/11/26/migrate-sponsoring.png)](https://github.com/sponsors/evcc-io)

## 🐳 L’image Docker déménage

Dans la foulée, nous déplaçons aussi nos images Docker.
Jusqu’à présent, les paquets étaient publiés sous `andig/evcc`.
Vous trouverez désormais les versions officielles sous `evcc/evcc`.

Merci encore à l’équipe Docker, qui a reconnu evcc comme [projet open source sponsorisé par Docker](https://www.docker.com/community/open-source/application/).
Nous bénéficions ainsi d’un accès gratuit aux fonctionnalités Team de Docker Hub.

[![Migration vers Docker Hub](../../../../../en/blog/2022/11/26/migrate-docker.png)](https://hub.docker.com/u/evcc)

---

**Merci pour votre soutien !**
L’équipe principale d’evcc<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) et [@naltatis](https://github.com/naltatis)
