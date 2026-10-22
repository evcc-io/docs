---
title: "OCPP Forward"
description: "Shows how to forward a charger's OCPP messages from evcc to an external backend such as a billing platform and to read-only copies for reporting."
---

Sometimes charging sessions need to reach an external OCPP backend, e.g. a billing platform for employer reimbursement or a charge point operator.
A charger can normally talk to only one OCPP server.
With forwarding, the charger stays connected to your evcc instance, which passes its messages on to the external server as well.
evcc keeps managing the charging.
The external server receives charging sessions and meter values live and can, if allowed, also control the charger.

## Setup {#setup}

Forwarding is available for chargers that are integrated via OCPP, i.e. chargers that use evcc as their OCPP server.
Set up the charger first, then you can configure forwarding for it.

1. Open **Configuration → OCPP Server**.
2. The **Station IDs** list shows your connected OCPP chargers. Click the cloud button next to the charger to open the **OCPP Forward** dialog.
3. Enter the **Upstream server URL**, the address of the server to forward to, e.g. `wss://billing.example.com/ocpp`.
4. If the external server requires authentication, enter **Username** and **Password** (HTTP Basic Auth). If it expects a different charger identifier, set the **Station ID**.
5. Click **Save**. Forwarding starts immediately, no restart needed.

The cloud icon next to the charger shows whether forwarding is working.
Connection problems are shown in the dialog.

To stop forwarding, open the dialog again and click **Remove**.

## Upstream Commands {#upstream-commands}

By default, the external server can send commands to the charger.
To avoid conflicts with charging control, enable **Block commands from the upstream server** in the advanced settings.
The server still receives every charger message, but evcc retains exclusive control.

## Certificates {#certificates}

The advanced settings also cover TLS.
Enable **Allow self-signed certificates** for test setups without a valid certificate.
Provide a **Server certificate (CA)** if the external server uses a certificate from a private certificate authority.

## Read-only Upstreams {#read-only-upstreams}

Some parties only need to see what a charger does, e.g. a registrar for renewable energy credits or a monitoring service.
For them you can add **read-only upstreams** in the same dialog, below the main upstream.

A read-only upstream receives a copy of every message the charger sends.
It never answers the charger and cannot send commands, so it can neither authorise, bill nor control anything.
The main upstream stays the one that decides about authorisation and billing, even if you block its commands.

1. Open the **OCPP Forward** dialog of the charger as described above. The main upstream has to be set up first.
2. Click **Add read-only upstream**.
3. Enter the **Upstream server URL**. Add **Username** and **Password** or a different **Station ID** if the server requires them.
4. Click **Save**. The connection starts immediately, no restart needed.

Each read-only upstream shows its own status, **Connected** or **Not connected**, and its connection problems.
Click **Remove** to delete a single one.
The advanced settings offer the same TLS options as for the main upstream.

After a reconnect, a read-only upstream first receives the charger's boot message and its latest status, then the messages it missed in the meantime.
The backlog holds 1000 messages, so a long outage can lose older ones.
A newer status can therefore arrive before older start and stop messages.
That is fine for reporting, but a read-only upstream is not a delivery guarantee.

Once an hour, evcc writes to the log how many messages and meter values it sent to each read-only upstream and how much energy these covered.
Compare these numbers with what the receiving side shows.

:::caution
Two connections with the same station ID to the same server replace each other.
A read-only upstream that would reach the same station at the same server as the main upstream, or as another read-only upstream, is rejected when you save.
If a backend passes what it receives on to your main upstream under the same station ID, it can replace the main connection.
Ask its operator to switch that off.
:::
