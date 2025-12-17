---
sidebar_position: 8
---

# macOS

This guide describes the installation for macOS (10.12 and higher) using the [Homebrew](https://brew.sh) package manager.

:::note
If you want to install evcc without a package manager or test a nightly version, check out the [Manual Installation](#manual) section.
:::

## Installation

- Open a terminal window
- Install [Homebrew](https://brew.sh), if it's not already installed
- Add the evcc tap:

  ```sh
  brew tap evcc-io/tap
  ```

- Update package lists:

  ```sh
  brew update
  ```

- Install evcc:

  ```sh
  brew install evcc
  ```

- Start the evcc server:

  ```sh
  brew services start evcc
  ```

- Open the evcc interface in your browser: [http://localhost:7070](http://localhost:7070)
- The evcc application will ask you to set an administrator password
- You can then configure your devices directly via the web interface

## Configuration

:::tip Recommended
Configure evcc directly in your browser.
:::

After the first start, you can configure evcc at [http://localhost:7070](http://localhost:7070).
Settings are automatically saved in the database.

Alternatively, you can use an `evcc.yaml` configuration file at `/etc/evcc.yaml`.
Details can be found in [Configuration](./configuration).

## Upgrades

To upgrade to a new version of evcc, perform the following steps:

- Open a terminal window
- Update package lists:

  ```sh
  brew update
  ```

- Upgrade evcc:

  ```sh
  brew upgrade evcc
  ```

## Additional Commands

- Check the status of the evcc server:

  ```sh
  brew services info evcc
  ```

- View logs:

  ```sh
  tail -f /opt/homebrew/var/log/evcc.log
  ```

## Manual Installation {#manual}

Here you'll find instructions for manually installing evcc on macOS.

### Installation

- Download the appropriate file to your system:
  - 64-bit ARM or Intel CPU: [evcc_X.XX_macOS_all.tar.gz](https://github.com/evcc-io/evcc/releases/latest)
- Extract the downloaded file (e.g., by double-clicking the file)
- There will now be a new folder with the `evcc` program
- Open a terminal and navigate to the folder containing the `evcc` program
- Start evcc with the following command:
  ```sh
  ./evcc -v
  ```
- You should see the current version of evcc (e.g., `evcc version 0.xxx.y`).

### Configuration

After the first start, open [http://localhost:7070](http://localhost:7070) in your browser and configure evcc via the web interface.

Alternatively, you can create an `evcc.yaml` configuration file (see [Configuration](./configuration)) and start evcc with it:

```sh
./evcc -c evcc.yaml
```

### Updates/Downgrades

Follow the steps above and replace the evcc program file with the new or previous version.
The configuration does not need to be redone.
