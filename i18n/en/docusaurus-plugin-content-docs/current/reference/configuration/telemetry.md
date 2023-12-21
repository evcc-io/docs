---
sidebar_position: 16
---

import SponsorshipRequired from "../../\_sponsorship_required.mdx";
import SinceVersion from "../../\_since_version.jsx";

# `telemetry`

<SinceVersion version="0.103" />

<SponsorshipRequired />

The `telemetry` option enables the regular transmission of charging data (power, energy, solar share) to evcc.io. No personal data or configuration details are transmitted. You can learn more about this in the [Privacy Policy](https://sponsor.evcc.io/privacy).

The aggregated data is displayed on platforms like [evcc.io](https://evcc.io). You can access the raw data through [https://api.evcc.io/v1/total](https://api.evcc.io/v1/total).

**For example**:

```yaml
telemetry: true # default: false
```
