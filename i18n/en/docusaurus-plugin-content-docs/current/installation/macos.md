---
sidebar_position: 3
---

# macOS

:::note
Versions of macOS older than 10.12 (Sierra) are not supported.
:::

## Installation

- Open a terminal
- Install [Homebrew](https://brew.sh), if you don't already have it
- Add our tap:

  ```sh
  brew tap evcc-io/tap
  ```

- Update package lists l:

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

- Now check the installation by opening a browser to `http://localhost:7070`. You should see the evcc web interface in demo mode.
- Stop the evcc server:

  ```sh
  brew services stop evcc
  ```

## Configuration

A **working** evcc configuration is required.

Follow the [instructions](./configuration#configuration-with-wizard) to create a configuration file with the configuration wizard.

## Upgrades

To upgrade to the latest release:

- Open a terminal
- Update package lists:

  ```sh
  brew update
  ```

- Upgrade evcc:

  ```sh
  brew install evcc
  ```
