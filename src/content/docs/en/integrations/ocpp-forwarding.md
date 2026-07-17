---
title: "OCPP Forward"
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
