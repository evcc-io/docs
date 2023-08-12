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

- You can now start the configuration wizard - simply follow the prompts in your terminal!

  ```sh
  evcc configure
  ```

  Once all devices are configured, you can continue on.

  :::note
  Advanced users (those with evcc experience & some technical know-how) might want to use the advanced configurator:

  ```sh
  evcc configure --advanced
  ```

  This mode offers some further, more technically-involved options.
  :::

- Test to make sure your new configuration works:

  ```sh
  evcc -c evcc.yaml
  ```

  Open a browser and head to `http://localhost:7070`: the evcc interface should now show your own devices.

- If everything's working, press `CTRL+C` to stop the server.

- Move the generated configuration to its home:

  ```sh
  sudo mv evcc.yaml /etc
  ```

- Start the evcc server:

  ```sh
  brew services start evcc
  ```

- Go back to your browser and refresh to make sure everything's working as it should be!

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
