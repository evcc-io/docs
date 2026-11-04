---
date: 2021-12-10
title: "Version 0.72"
description: "Udgivelsesnoter for evcc 0.72 fra december 2021 med forenklede installationsvejledninger og den nye interaktive opsætningsguide evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "fe9b6c445f25"
---

Der er sket meget de seneste uger, og i dag vil vi gerne fortælle lidt mere udførligt om, hvad der er nyt at opdage i version 0.72.

![Eksempel på evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Enklere installation

Indtil nu har det krævet en del teknisk viden om dit styresystem at komme i gang med **evcc**. Linux (Debian, Ubuntu, Raspberry Pi OS) og macOS har nu en markant enklere installation. **evcc** kan nu installeres med pakkehåndteringerne `apt` på Linux og [`homebrew`](https://brew.sh) på macOS.

Vi har igen omarbejdet installationsvejledningerne for at gøre installationen endnu enklere. Tag et kig på den [tilhørende dokumentation](/da/installation).

## Enklere konfiguration

Opsætningen af **evcc** har også indtil nu været meget teknisk. Uanset om det er formateringsreglerne for [YAML](https://yaml.org), som definerer konfigurationens syntaks, eller arbejdet med at beskrive og tilpasse dine egne enheder i konfigurationsfilen, er det en ret høj barriere for nogle. Men projektet er stadig ungt og teamet lille, især når man tænker på, at det for udviklerne ”kun” er en hobby.

For at sænke disse forhindringer lidt introducerer den nye version 0.72 af **evcc** en ny funktion: guidet konfiguration med `evcc configure`.

Med denne kommando kan du interaktivt oprette en fungerende konfigurationsfil til din egen installation! Der vil helt sikkert opstå nogle problemer og fejl hist og her, men vi håber, det er et godt første skridt i den rigtige retning.

## Download og installation

- [Debian, Ubuntu, Raspberry Pi](/da/installation/linux)
- [macOS Homebrew](/da/installation/macos)
- [Docker](/da/installation/docker)
- [Windows](/da/installation/windows)

## Changelog

### Version 0.72

- [Detaljeret liste over ændringer](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Version 0.71

- [Detaljeret liste over ændringer](https://github.com/evcc-io/evcc/releases/tag/0.71)
