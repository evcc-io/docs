---
date: 2021-12-10
title: "Version 0.72"
description: "Release notes for evcc 0.72 from December 2021 with simplified installation guides and the new interactive setup wizard evcc configure."
authors: [derandereandi]
tags: [release]
prev: false
next: false
---

A lot has happened over the last few weeks, and today we'd like to tell you in a bit more detail what's new to discover in version 0.72.

![evcc configure example](./configure.gif)

<!-- excerpt -->

## Easier Installation

Until now, getting started with **evcc** required some technical knowledge of your operating system. Linux (Debian, Ubuntu, Raspberry Pi OS) and macOS now have a much simpler installation. **evcc** can now be installed with the package managers `apt` on Linux and [`homebrew`](https://brew.sh) on macOS.

We've reworked the installation guides once more to make the installation even simpler. Have a look at the [related documentation](/en/installation).

## Easier Configuration

Setting up **evcc** has also been very technical so far. Whether it's the formatting rules of [YAML](https://yaml.org), which defines the syntax of the configuration, or the work of describing and adjusting your own devices in the configuration file, these are fairly high hurdles for some. But the project is still young and the team is small, especially considering that this is "just" a hobby for the developers.

To lower these hurdles a little, this new version 0.72 of **evcc** introduces a new feature: guided configuration with `evcc configure`.

This command lets you interactively create a working configuration file for your own installation! There will certainly be some problems and bugs here and there, but we hope it's a good first step in the right direction.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/en/installation/linux)
- [macOS Homebrew](/en/installation/macos)
- [Docker](/en/installation/docker)
- [Windows](/en/installation/windows)

## Changelog

### Version 0.72

- [Detailed list of changes](https://github.com/evcc-io/evcc/releases/tag/0.72)

### Version 0.71

- [Detailed list of changes](https://github.com/evcc-io/evcc/releases/tag/0.71)
