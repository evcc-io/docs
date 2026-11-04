---
date: 2022-01-09
title: "Version 0.80"
description: "Release notes for evcc 0.80 from January 2022 with improvements to evcc configure, a new solar share and savings dialog and Docker latest and nightly tags."
authors: [derandereandi, naltatis]
tags: [release]
prev: false
next: false
---

Updates keep coming this year too :) In addition to the smaller updates in 0.78 and 0.79, version 0.80 brings a few bigger changes.

<!-- excerpt -->

## `evcc configure` Improvements

When you create a configuration with `evcc configure`, you're now first asked about your level of expertise. This lets advanced users fine-tune the configuration in technical areas. This mode is still available directly via `evcc configure --advanced`. We don't recommend it for beginners, though, as it requires more know-how.

In addition, there are more device templates, fixes to existing templates and more settings.

## Solar Share and Savings

![Savings dialog](./ersparnis.png)

The new savings feature shows you how much of your charging energy was covered by self-produced solar energy.
The percentage is shown in the bottom right corner.
Click on it to see more details in a dialog.
Besides the amount of energy, it shows your effective energy price and your total savings compared to pure grid import.
More information on the [calculation and price configuration](/en/faq#savings-calculation) is in the FAQ.

[Sponsors](/en/sponsorship) will find, _\*drumroll\*_, a link to get our new evcc stickers behind the thank-you confetti button in the new dialog.
You're the best. Thanks for your support! 💚🥳

## Docker

If you use Docker, you can now use the `latest` tag to always get the current version. The `nightly` tag provides new builds every day, which may not be as well tested yet. More information on the Docker installation can be found here: [Docker, Synology](/en/installation/docker)

## Bug Fixes

As always, this version contains a number of bug fixes and many small improvements. Have a look at the changelog links below for a detailed list.

## Download & Installation

- [Debian, Ubuntu, Raspberry Pi](/en/installation/linux)
- [macOS Homebrew](/en/installation/macos)
- [Docker](/en/installation/docker)
- [Windows](/en/installation/windows)

## Changelog

### Version 0.80

- [Detailed list of changes](https://github.com/evcc-io/evcc/releases/tag/0.80)

### Version 0.79

- [Detailed list of changes](https://github.com/evcc-io/evcc/releases/tag/0.79)

### Version 0.78

- [Detailed list of changes](https://github.com/evcc-io/evcc/releases/tag/0.78)
