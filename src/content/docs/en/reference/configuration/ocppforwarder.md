---
title: "OCPP Forward"
sidebar:
  order: 18
---

OCPP Forward mirrors a charger's OCPP session to an upstream OCPP central system in parallel to evcc.

This is useful when you want evcc to manage charging while a third-party OCPP backend (fleet management, billing platform, CPO) also receives the charger's telemetry and can issue commands.

Each charger connects normally to the built-in OCPP server.
For every charger with forwarding enabled, evcc opens a second ("sidecar") WebSocket connection to the configured upstream server and mirrors the session:

- **Charger to upstream**: all OCPP messages (status notifications, meter values, etc.) are forwarded in real time.
- **Upstream to charger**: commands sent by the upstream server (e.g. `UnlockConnector`, `ChangeConfiguration`) are injected into the charger, and the charger's reply is forwarded back.

evcc remains the primary controller and responds to the charger independently of the upstream server.

## Configuration {#configuration}

Forwarding is set up per charger in the UI.
Open **Configuration → OCPP Server** to see the chargers connected to the OCPP server.
Next to each charger, use the **OCPP Forward** button to enable and configure forwarding for that charger.

### Upstream server URL {#upstream-url}

The WebSocket URL of the upstream OCPP central system.
Include the path prefix expected by the upstream server.
The charger's station ID (or the **Station ID** override below) is appended automatically, e.g. `wss://ocpp.example.com/ocpp/`.

### Station ID {#station-id}

The charger identifier sent to the upstream server.
Leave it empty to use the charger's own station ID.
Set it when the upstream system expects a different identifier.

### Username {#username}

Username for HTTP Basic Auth to the upstream server.
Leave it empty when the upstream server needs no authentication.

### Password {#password}

Password for HTTP Basic Auth to the upstream server, sent together with the **Username**.
The Basic Auth header is only added when a username or password is set, so it stays off unless you fill in at least one of the two.

### Upstream commands {#upstream-commands}

By default the upstream server can send commands to the charger through evcc.
Enable **Block commands from the upstream server** to make forwarding read-only: the upstream server still receives every charger message but cannot control the charger, and evcc keeps exclusive control.
A blocked command is rejected with an OCPP `SecurityError`.

### Certificate validation {#certificate-validation}

For `wss://` connections the upstream server's TLS certificate is validated by default.
Enable **Allow self-signed certificates** to skip this validation.

:::caution
Only allow self-signed certificates in test environments.
This disables certificate validation and exposes the connection to man-in-the-middle attacks.
:::

### Server certificate (CA) {#server-certificate}

A PEM-encoded CA certificate used to validate the upstream server's TLS certificate.
Use it when the upstream server presents a certificate signed by a private or internal CA that the system does not trust by default.
