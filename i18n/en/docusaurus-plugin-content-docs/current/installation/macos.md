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

- Check the installation by opening a browser and entering the following URL: [http://localhost:7070](http://localhost:7070). The evcc application will ask you to set a password and start the configuration.
- Stop the evcc server:

  ```sh
  brew services stop evcc
  ```

## Configuration

Now you need a working `evcc.yaml` configuration file.
In addition to general settings, the configuration includes the definition of individual components (meter, wallbox, vehicle, ...).

### Create

We recommend using the configuration wizard:

- Start the configuration wizard and answer the questions:

  ```sh
  sudo evcc configure
  ```

- Move the created configuration file to `/etc/evcc.yaml`:

  ```sh
  sudo mv evcc.yaml /etc
  ```

- Start the evcc server:

  ```sh
  brew services start evcc
  ```

- Access the evcc interface at [http://localhost:7070](http://localhost:7070)

### Modify

If your configuration needs adjustments, you can either rerun the configuration wizard (see above) or manually edit the configuration file.

- Edit the configuration file:

  ```sh
  sudo nano /etc/evcc.yaml
  ```

- Restart the evcc server:

  ```sh
  brew services restart evcc
  ```

For more information and examples on configuring evcc, see [Configuration](./configuration).

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

Create a working `evcc.yaml` configuration file following the instructions under [Configuration](./configuration).
You can start it with the following command:

```sh
./evcc -c evcc.yaml
```

### Updates/Downgrades

Follow the steps above and replace the evcc program file with the new or previous version.
The configuration does not need to be redone.
