---
title: "curtailers"
sidebar:
  order: 6
---

_Curtailers_ (Einspeisebegrenzer) ist eine Liste von Geräten, die ausschließlich die Einspeisung der PV-Anlage auf Anforderung des Netzbetreibers begrenzen (§ 9 EEG).
Die meisten Wechselrichter werden über ihren Eintrag unter [`meters`](/de/reference/configuration/meters) abgeregelt und benötigen kein separates Gerät.
Ein eigener Einspeisebegrenzer wird nur benötigt, wenn der Wechselrichter nicht über seine Zähler-Konfiguration abgeregelt werden kann, für den SMA Sunny Home Manager 2.0 oder für Anlagen mit mehreren Wechselrichtern, bei denen das Limit am führenden Wechselrichter gesetzt werden muss.
Hintergrund und die Liste der unterstützten Geräte findest du unter [Externe Begrenzung](/de/external-limit#curtailment-devices).

Einspeisebegrenzer werden über [`site.curtailers`](/de/reference/configuration/site#curtailers) referenziert.
Sie werden erst aktiv, wenn die [`hems`](/de/reference/configuration/hems)-Integration ein Einspeiselimit signalisiert.
Das Limit wird als Prozentwert der installierten Generatorleistung gleichermaßen an alle abregelbaren `pv`-Zähler und Einspeisebegrenzer übergeben.

**Beispiel**:

```yaml
curtailers:
  - name: my_curtailer
    type: template
    template: solaredge
    modbus: tcpip
    host: 192.168.0.10
    port: 1502
    id: 1
    productionnominalmax: 15000 # installierte Generatorleistung der gesamten Anlage (Wp)

site:
  curtailers:
    - my_curtailer
```

---

## Erforderliche Parameter

### `name`

Eindeutiger Name des Geräts.
Wird als Referenz in [`site.curtailers`](/de/reference/configuration/site#curtailers) verwendet.

---

### `type`

- `template`: Eines der [unterstützten Geräte](/de/external-limit#curtailment-devices). Die Geräteseite zeigt den vollständigen Konfigurationsblock.
- `custom`: [Benutzerdefiniertes Gerät](/de/user-defined-devices#curtailer) mit den Plugins `curtail` und `curtailed`.
