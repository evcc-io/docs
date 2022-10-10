---
sidebar_position: 16
---

import SponsorshipRequired from "/docs/\_sponsorship_required.mdx";
import SinceVersion from "/docs/\_since_version.jsx";

# `telemetry`

<SinceVersion version="0.103" />

<SponsorshipRequired />

`telemetry` aktiviert das regelmäßige Übertragen von Ladedaten (Leistung, Energie, Sonnenanteil) zu evcc.io. Es werden keine personenbezogenen Daten oder Konfigurationsdetails übermittelt. Mehr dazu erfährst du in der [Datenschutzerklärung](https://cloud.evcc.io/privacy).

Die aggregierten Daten werden bspw. auf [evcc.io](https://evcc.io) dargestellt. Die Rohdaten kannst du über [https://api.evcc.io/v1/total](https://api.evcc.io/v1/total) abrufen.

**Beispiel**:

```yaml
telemetry: true # default: false
```
