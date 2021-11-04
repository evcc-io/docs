---
sidebar_position: 3
---

# Docker, Synology

evcc kann auch als Docker Image installiert werden.

:::note
Momentan werden nur die CPU Architekturen AMD64, armv6 und arm64 in Docker Images unterstützt!
:::

:::warning
Bevor evcc in Docker installiert wird, sollte die Konfiguration ohne Docker durchgeführt und abgeschlossen werden!
:::

Folge diesen Schritten um die jeweils aktuellste Version zu installieren:

- Erstelle ein lokales Verzeichnis, in welchem die evcc Konfigurationsdatei abgelegt wird.
- Wechsel in das erstellte Verzeichnis
- Führe folgenden Befehl aus:

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml -p 7070:7070 andig/evcc -h
  ```

  :::note
  Unter Linux ist es evtl. notwendig den Befehl mit `sudo ` zu beginnen!
  :::

  :::warning
  Mounte nicht das lokale Verzeichnis `/etc` als Volume in Docker!
  :::

  Dies installiert einen Docker Container mit evcc und startet ihn einmalig. Dabei werden die möglichen Optionen von evcc angezeigt.

- Wenn die Konfiguration durchgeführt wurde, starte den Container mit folgendem Befehler erneut:

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml -p 7070:7070 andig/evcc
  ```

  Falls ein Messgerät oder eine Wallbox verwendet wird, welches UDP benötigt wie z.b. KEBA, stelle sicher dass der Docker Container auc hdie UDP Nachrichten auf den entsprechenden Ports empfangen kann (`:7090` for KEBA):

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml -p 7070:7070 -p 7090:7090/udp andig/evcc
  ```

  Falls ein Gerät Multicast UDP Nachrichten empfangen muss, wie z.B. SMA, stelle sicher dass der Docker Container mit der Konfiguraation `network_mode: host` verwendet wird:

  ```sh
  docker run -v $(pwd)/evcc.yaml:/etc/evcc.yaml --network host andig/evcc
  ```

  Für die Verwendung des SMA Sunny Home Manger 2.0 muss`evcc` eine eindeutige Geräte-ID erstellen. Unter Linux wird `machine-id` verwendet, und dafür muss es in den Container gemounted werden:

  ```sh
  docker run -v /etc/machine-id:/etc/machine-id -v /var/lib/dbus/machine-id:/var/lib/dbus/machine-id --network host andig/evcc ...
  ```

  :::note
  Unter Linux ist es evtl. notwendig den Befehl mit `sudo ` zu beginnen!
  ::: 

- Öffne nun einen Browser mit der Adresse [http://127.0.0.1:7070/](http://127.0.0.1:7070/)

  :::note
  Ersetze `127.0.0.1` mit der IP Adresse oder dem Hostnamen des Computers, falls der Browser nicht auf dem gleichen Computer geöffnet wurde.
  :::

## Alternative: docker-compose

`docker-compose` hat einige Vorteile gegenüber der direkten Ausführung in der Kommandozeile, z.B. falls man weitere Programme wie Traefik in Verbindung mit evcc nutzen möchte. Hier ist ein einfaches Beispiel für eine solche Konfiguration

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
     - /etc/evcc.yaml:/etc/evcc.yaml
   working_dir: /app
networks: {}
```
