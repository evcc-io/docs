---
date: 2021-12-12
title: "Version 0.73"
description: "Release notes for evcc 0.73 from December 2021 with improvements to the evcc configure wizard, vehicle-specific charging defaults and first location detection."
authors: [derandereandi]
tags: [release]
prev: false
next: false
---

Today there's a small update, mainly with some bug fixes and further improvements.

<!-- excerpt -->

## `evcc configure`

The command for guided creation of a configuration file and the underlying templates have received the following improvements:

- For a charging point you can now set whether the default charging settings are restored when the charging cable is unplugged. More on this in our documentation under `resetOnDisconnect`
- Vehicle-specific charging defaults can now be set up. They are available interactively with `evcc configure --advanced`. More on this in the documentation under `onIdentify`
- Modbus devices now generate correct configurations
- Improved handling when an `evcc.yaml` file already exists in the current folder but has different access permissions.

## Location Detection

For some vehicles **evcc** can now detect the current location.
However, this isn't actively used yet.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/en/installation/linux)
- [macOS Homebrew](/en/installation/macos)
- [Docker](/en/installation/docker)
- [Windows](/en/installation/windows)

## Changelog

- [Detailed list of changes](https://github.com/evcc-io/evcc/releases/tag/0.73)
