---
date: 2022-11-26
title: "Sponsoring and Relocations"
description: "In November 2022 we introduced one-time sponsoring and contributor tokens, explained how we fund evcc and moved GitHub sponsoring and the Docker image."
authors: [naltatis]
tags: [sponsoring]
prev: false
next: false
---

Another seventeen releases have gone by since our last update here on the blog.
As always, a lot has happened.
There were some bug fixes, but also many new integrations and features.
More on our highlights of the last few months in a later blog post.

<!-- excerpt -->

## 🌱 Sustainable Open Source Development

evcc started as a small hobby project because we were unhappy with the existing solutions for solar surplus charging and wanted to build something better.
By now, though, evcc does more than make our own solar charging easier.
There are probably several thousand installations that wake up the car in the morning as soon as the sun shines on the home solar system.
That thought makes us very happy.

We don't have exact numbers on our user base.
We value data minimisation, so we have no ambition to build general tracking into our website or the application.
Still, numbers from Docker (>1 million pulls so far) and Cloudsmith (currently ~4.5k package downloads per day) show us quite clearly that many people rely on evcc every day.

To maintain and develop the project with enough focus, sustainable funding is an important topic.
There is no big company and no charger manufacturer behind evcc, and we have no interest in playing the startup game with investors.
At the moment evcc is a project we push forward in our spare time.
We are convinced that it is a good idea to work directly for you, the users, and to stay independent of other obligations and constraints.

With **GitHub's sponsoring** we have found a very lightweight and simple way to receive financial support directly from users.
It also gives us the option to offer **some features exclusively to sponsors**.
At the moment these are certain charger types and the telemetry feature, but we can well imagine adjusting this model in the future.

## 💚 Thanks to All Sponsors

We currently have **over 1,500 sponsors** 🥳 who pay a monthly contribution of at least $2.
That is pretty cool, a big vote of confidence, and it encourages us to keep investing a lot of time in the project.

In addition to the sponsor token that unlocks features, we are happy to send stickers to all supporters.
You can use them to decorate your laptop, Raspberry Pi, charger or charging equipment.
You'll find the link to the sticker form in the evcc UI at the bottom right when you click the sun icon.

| [@evcc_io](https://twitter.com/evcc_io/status/1489667714411114502)                                                      | [@Ein_Klimawender](https://twitter.com/Ein_Klimawender/status/1589844295992819712)                                          | [@frd9900](https://twitter.com/frd9900/status/1591416016848162816)                                                        |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [![Tweet @evcc_io](./sticker_evcc.jpeg)](https://twitter.com/evcc_io/status/1489667714411114502)                        | [![Tweet @Ein_Klimawender](./sticker_Ein_Klimawender.jpeg)](https://twitter.com/Ein_Klimawender/status/1589844295992819712) | [![Tweet @frd9900](./sticker_frd9900.jpeg)](https://twitter.com/frd9900/status/1591416016848162816)                       |
| [@ABBolle](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333)                                  | [@rediculum](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)                                           | [@123aerox](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806)                                   |
| [![GitHub @ABBolle](./sticker_ABBolle.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333) | [![GitHub @rediculum](./sticker_rediculum.png)](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)        | [![GitHub @123aerox](./sticker_123aerox.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806) |

## 📮 One-Time Sponsoring

We have repeatedly heard that some users feel uneasy about monthly payments and would like a one-time payment option to get a sponsor token.
This is now possible.
The [GitHub sponsoring page](https://github.com/sponsors/evcc-io?frequency=one-time) now offers one-time tiers in addition to the monthly ones.
These are the tiers we came up with:

- **🌱 $100 - Sustainable Development**<br />You help us keep investing a lot of energy in the development of evcc. You also get **a sponsor token without expiry date** that lets you use all evcc features.
- ~~**☀️ $150 - Friends & Family**<br />You get **three sponsor tokens without expiry date**. One for you and two more that you can pass on to friends or family. You'll be mentioned as a sponsor on [evcc.io](https://evcc.io).~~
- **🚛 $1,000 - Multiplier**<br />For electricians and solar installers. Do you want to use evcc for several customers? Write to us at [info@evcc.io](mailto:info@evcc.io) and we'll find a good solution.

Sponsor tokens without expiry date are issued exactly like today via [sponsor.evcc.io](https://sponsor.evcc.io).
The only difference is that the token doesn't expire.

:::note[Update]
We adjusted the sponsor tiers in 2026.
More on that in our [latest blog post](/en/blog/2026/01/01/highlights-browser-config-ready#sponsoring).
:::

## 🎟️ Contributor Tokens

Community members who have made substantial contributions to evcc through GitHub PRs can also get a free token.
We are always happy about bug fixes, but we also urgently need help with documentation and [translation](https://github.com/evcc-io/evcc/discussions/5218).

We haven't strictly defined what counts as a substantial contribution.
Fixing a misplaced comma doesn't qualify yet, but fixing a nasty bug definitely does.
Just send us an email at [info@evcc.io](mailto:info@evcc.io) and mention your GitHub username.

## 🚚 GitHub Sponsoring Is Moving

At the moment GitHub sponsoring runs through the account of [@andig](https://github.com/andig), the founder of evcc.
The amount left each month after expenses (infrastructure, stickers, ...) is split among all three members of the core team using a distribution key.
To make this process more transparent, we are now moving our GitHub sponsoring to the [evcc-io organisation](https://github.com/sponsors/evcc-io).
If you are already a sponsor, you don't need to change anything.
Your token keeps working as usual, and your contribution still reaches all team members.
We have, however, switched all sponsoring links to the organisation.
One-time payments are only available there.

[![Migration GitHub Sponsoring](./migrate-sponsoring.png)](https://github.com/sponsors/evcc-io)

## 🐳 Docker Image Is Moving

Along the way we are also moving our Docker images.
Until now the packages were published under `andig/evcc`.
You'll now find the official versions under `evcc/evcc`.

At this point, thanks again to the Docker team for qualifying evcc as a [Docker-Sponsored Open Source project](https://www.docker.com/community/open-source/application/).
This gives us free access to the team features of Docker Hub.

[![Migration Docker Hub](./migrate-docker.png)](https://hub.docker.com/u/evcc)

---

**Thanks for your support!**
evcc Core Team<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) and [@naltatis](https://github.com/naltatis)
