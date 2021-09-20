---
sidebar_position: 2
---

# Linux, Raspberry

Follow these steps to download and install the latest version:

- Open the release page at [https://github.com/andig/evcc/releases/latest](https://github.com/andig/evcc/releases/latest) to download the latest build version.

EVCC is provided as a single binary executable file for the following operation systems and CPU architectures:
- Linux
  - 64-Bit for Intel CPU: evcc_X.XX_linux_amd64.tar.gz
  - 64-Bit for ARM CPU: evcc_X.XX_linux_arm64.tar.gz
  - 32-Bit for ARM CPU (e.g. Raspberry Pi 32-Bit OS): evcc_X.XX_linux_armv6.tar.gz
- macOS
  - 64-Bit Intel CPU: evcc_X.XX_macOS_amd64.tar.gz
  - 64-Bit ARM CPU: evcc_X.XX_macOS_arm64.tar.gz
- Windows
  - 64-Bit Intel CPU: evcc_X.XX_windows_amd64.zip

### Linux installation
Example commands below are tested on [Raspberry Pi OS (previously called Raspbian)](https://www.raspberrypi.org/software/)
- On Linux systems you can download the evcc tarball by using `wget`.
Simply copy&paste the download link as paramter and download the tarball into your users home directory:
`cd ~ && wget https://github.com/evcc-io/evcc/releases/download/X.XX/evcc_X.XX_linux_armv6.tar.gz`
- Install the tarball content into `/usr/local/bin` using `sudo`:
`sudo rm -f /usr/local/bin/evcc* && sudo tar xvfz ./evcc_X.XX_linux_armv6.tar.gz -C /usr/local/bin/`
- Check whether evcc binary was correctly installed in `/usr/local/bin`:
`which evcc`
should provide the following output: `/usr/local/bin/evcc`
- Check whether evcc can be executed:
`evcc -v`
should provide something like this: `evcc version 0.50 (57495de)`
- Detect evcc supported devices in your network:
`evcc detect`
Evcc will start to scan your local network for supported devices. Please have some patience, this will take some time.
After some minutes you will get an output like this:
```
Auto detection will now start to scan the network for available devices.
Scanning focuses on devices that are commonly used that are detectable with reasonable efforts.
On successful detection, suggestions for EVCC configuration can be made. The suggestions should simplify
configuring EVCC but are probably not sufficient for fully automatic configuration.

+----------------+-----------------------+------+---------+
|       IP       |       HOSTNAME        | TASK | DETAILS |
+----------------+-----------------------+------+---------+
| 192.168.XXX.XX | go-eCharger.fritz.box | go-e | {Jq:3}  |
+----------------+-----------------------+------+---------+

Please open https://github.com/andig/evcc/issues/new in your browser and copy the
results above into a new issue. Please tell us:

        1. Is the scan result correct?
        2. If not correct: please describe your hardware setup.
```
  - In case `evcc detect` is raising an FATAL `ping: socket: permission denied` error (usually on Raspberry Pi OS), you have to execute the following command via `sudo` and repeat the device detection:
`sudo sysctl -w net.ipv4.ping_group_range="0 2147483647"`
- Finally copy the included evcc config file template into `/etc` directory using sudo as starting point for your individual evcc configuration:
`sudo cp /usr/local/bin/evcc.dist.yaml /etc/evcc.yaml`
Now you can start to adapt the configuration file:
`sudo nano /etc/evcc.yaml`
Refer to chapter [Configure Manually](1.3.-Manual-configuration).
- After the successful test of your evcc configuration file, setup autostart for the evcc service daemon
Refer to chapter [Setup Autostart on Linux](https://github.com/andig/evcc/wiki/1.1.-Manual-installation#setup-autostart-on-linux)

### macOS / Windows installation
- In the assets section, klick on the latest `evcc_<version>_<os>_<architecture>.tar.gz` download link for your operating system (os) and CPU (architecture).
- Extract the files from the downloaded archive
  - macOS: double-click on the file
- You will now have a folder containing the `evcc` binary and a sample configuration file `evcc.dist.yaml` that needs to be edited.
- Copy the file to the computer you wish to run EVCC from
- Execute `evcc -h` to check that it runs properly and get the help output
  - macOS: depending on the version of macOS, you will have to add `./evcc` to the list of trusted apps in the security center.
### Configuration
- Now you are ready to configure your setup, for that continue to [Configure Manually](1.3.-Manual-configuration) documentation
- Once the configuration is done, open your web browser at [http://127.0.0.1:7070/](http://127.0.0.1:7070/)

  **Note:** Replace `127.0.0.1` with the IP of the computer if it is not identical to the one where you run the browser)

### Setup Autostart on Linux

After configuration is done and testing is successful, you may want to make EVCC run automatically on your chosen computer. Follow these steps to setup EVCC as a system service that automatically starts when launching the computer and automatically restarts in case of a failure. This documentation is assuming your linux distribution supports `systemd`.

- Log in to your Linux computer
- Open an editor and create the service definition file:

  ```sh
  sudo nano /etc/systemd/system/evcc.service
  ```

- Copy the following content into the file

  ```
  [Unit]
  Description=evcc
  After=syslog.target network-online.target
  [Service]
  ExecStart=/usr/local/bin/evcc --log error
  Restart=always
  [Install]
  WantedBy=multi-user.target
  ```

  Adjust the path to your `evcc` binary in `ExecStart` or copy the binary into the `/usr/local/bin` folder.
  This also expects the configuration file `evcc.yaml` be be located in `/etc/evcc.yaml`. If this is not the case you need to add the configuration location to `ExecStart` by adding `-c /yourpath/evcc.yaml` and replace `yourpath` with the actual folder
- Test the service:

  ```sh
  sudo systemctl daemon-reload
  sudo systemctl start evcc
  sudo systemctl status evcc
  ```

  The output should contain `Active: active (running)` on success.
- Configure EVCC to start at boot:

  ```sh
  sudo systemctl enable evcc.service
  ```

- Done :)
