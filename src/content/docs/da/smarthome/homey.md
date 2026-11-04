---
title: "Homey"
description: "Fællesskabsappen evcc til Homey viser ladepunkter, anlæg og hjemmebatteri som enheder og gør det muligt at ændre ladetilstand og grænser med flows på det lokale netværk."
translatedFrom: "d711ce90c00c"
---

[Homey](https://homey.app) er en smart home-hub, der forbinder enheder fra mange producenter og automatiserer dem via flows.
[evcc-appen til Homey](https://homey.app/en-us/app/com.evcc.io/) forbinder Homey med din lokale evcc-installation.
Det er et fællesskabsprojekt fra [rdvnit](https://github.com/rdvnit) og ikke en del af evcc.

## Funktioner

Appen tilbyder tre enhedstyper:

- **Ladepunkt** med ladetilstand, ladegrænse, ladeeffekt, sessionsenergi, køretøjets opladningsniveau og rækkevidde samt tilslutnings- og opladningsstatus
- **Anlæg** med solproduktion, elnettets effekt og husets forbrug
- **Hjemmebatteri** med batterieffekt, opladningsniveau og indstillinger for batteristyring

Med flowkort kan du indstille ladetilstand, ladegrænse samt minimal og maksimal ladestrøm.
Flowbetingelser reagerer på ladetilstand, opladningsstatus og tilslutningsstatus.

Appen henter data fra din evcc-installation på det lokale netværk og er ikke afhængig af nogen cloudtjeneste.

## Opsætning

1. Installer appen **evcc** fra [Homey App Store](https://homey.app/en-us/app/com.evcc.io/).
2. Tilføj en enhed, og vælg **Ladepunkt**, **evcc-anlæg** eller **Hjemmebatteri**.
3. Indtast URL'en til din evcc-installation (f.eks. `http://192.168.1.50:7070`) og adgangskoden, hvis en sådan er konfigureret.

Detaljer og support finder du i [GitHub-repositoriet](https://github.com/rdvnit/com.evcc.io).
