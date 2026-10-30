---
date: 2021-12-19
title: "Version 0.74"
description: "Release notes for evcc 0.74 from December 2021, which shows the running timers for solar mode and phase switching in the UI and brings back target charging."
authors: [derandereandi]
tags: [release]
prev: false
next: false
---

Today's update is a small one, mainly with some bug fixes and further improvements.

## Timers in the UI

The interface now shows you the timers running in the background:

![Phase switching timer](./1p3p.png)

<!-- excerpt -->

- In solar mode:
  - When charging will be paused
  - When charging will resume
- 1p3p phase switching:
  - When it will switch up to 3p
  - When it will switch down to 1p

It also shows how many phases are used for charging.

## Target Charging

![Target charging UI](./zielladen.png)

Target charging is back. It lets you charge the EV to the desired charge level by a specific date and time.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/en/installation/linux)
- [macOS Homebrew](/en/installation/macos)
- [Docker](/en/installation/docker)
- [Windows](/en/installation/windows)

## Changelog

- [Detailed list of changes](https://github.com/evcc-io/evcc/releases/tag/0.74)
