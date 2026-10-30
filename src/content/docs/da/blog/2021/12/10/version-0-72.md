---
date: 2021-12-10
title: "Version 0.72"
description: "Udgivelsesnoter for evcc 0.72 fra december 2021 med forenklede installationsvejledninger og den nye interaktive opsætningsguide evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
translatedFrom: "853d43f3c405"
---

Der er sket meget de seneste uger, og i dag vil vi gerne fortælle lidt mere udførligt om alt det nye, der er at opdage i version 0.72.

![Eksempel på evcc configure](../../../../../en/blog/2021/12/10/configure.gif)

<!-- excerpt -->

## Enklere installation

Indtil nu har det krævet en del teknisk viden om det pågældende styresystem at komme i gang med **evcc**. Til Linux (Debian, Ubuntu, Raspberry Pi OS) og macOS findes der nu en markant forenklet installation. **evcc** understøtter nu installation via pakkehåndteringerne `apt` på Linux og [`homebrew`](https://brew.sh) på macOS.

Til det formål har vi endnu en gang revideret installationsvejledningerne og dermed forenklet installationen yderligere. Kig gerne forbi den [tilhørende dokumentation](/da/installation).

## Enklere konfiguration

Opsætningen af **evcc** har også indtil nu været meget teknisk præget. Det gælder både formateringsreglerne for [YAML](https://yaml.org), som bestemmer konfigurationens syntaks, og udformningen og tilpasningen af konfigurationen af ens egne enheder i konfigurationsfilen. For nogle er det ret høje forhindringer. Men projektet er stadig ungt og teamet lille, især når man tænker på, at det for udviklerne ”kun” er en hobby.

For at sænke barrieren lidt introducerer vi i version 0.72 en ny funktion: guidet konfiguration med `evcc configure`.

Med denne kommando kan man interaktivt oprette en fungerende konfigurationsfil til sin egen installation! Der er sikkert stadig nogle problemer og fejl hist og her, men vi håber, det er et godt første skridt i den rigtige retning.

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
