---
sidebar_position: 1
---

# Docker, Synology

EVCC can also be installed with a Docker image.

**Note:** Currently the Docker image only supports AMD64, armv6 and arm64 CPU architectures.

Follow these steps to install the latest version:

- Log in to your computer running Docker
- Create a local directory where you want to EVCC configuration file to be
- Change to previously created directory
- Execute the following command:

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml -p 7070:7070 andig/evcc -h
  ```

  **Note:** On a Linux you might need to add `sudo` before the command!

  This installs a Docker container for EVCC and runs it once to show the command options

- Now you are ready to configure your setup, for that continue to [Configure Manually](1.3.-Manual-configuration) documentation
- Once the configuration is done, start the container again by using the following command:

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml -p 7070:7070 andig/evcc
  ```

  When using a meter or charger that requires UDP like KEBA, , make sure that the Docker container can receive UDP messages on the relevant ports (`:7090` for KEBA):

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml -p 7070:7070 -p 7090:7090/udp andig/evcc
  ```

  When using a device that requires multicast UDP like SMA, make sure that the Docker container uses the `network_mode: host` configuration:

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml --network host andig/evcc
  ```

  For use with SMA Sunny Home Manager, `evcc` needs to generate a unique device id. On Linux, we're using `machine-id` for this purpose, make sure to mount the host folders into the container:

  ```sh
  docker run -v /etc/machine-id:/etc/machine-id -v /var/lib/dbus/machine-id:/var/lib/dbus/machine-id --network host andig/evcc ...
  ```

  **Note:** On a Linux you might need to add `sudo` before the command!\

- Now open your web browser at [http://127.0.0.1:7070/](http://127.0.0.1:7070/)

  **Note:** Replace `127.0.0.1` with the IP of the computer if it is not identical to the one where you run the browser)

### Alternative: docker-compose

Using docker-compose has some advantages over running the command directly, for example if you want to replicate it or use an edge-router like Traefik to route the service. This is a basic example with the config-file (evcc.yaml) stored in ~/evcc

```sh
version: "3"
services:
 evcc-charge:
   command:
     - evcc
   container_name: evcc-charge
   entrypoint:
     - /app/entrypoint.sh
   environment:
     - PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
     - TZ=Europe/Berlin
   hostname: 2326efea54e0
   image: andig/evcc
   ipc: private
   logging:
     driver: json-file
     options: {}
   ports:
     - 7070:7070/tcp
   volumes:
     - /home/dockeradmin/evcc/evcc.yaml:/etc/evcc.yaml
   working_dir: /app
networks: {}
```
