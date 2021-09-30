package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Multiple SMA Speedwire PV inverters combined (PV Meter)",
		Sample: `power:
  source: calc
  add:
  - source: sma
    uri: 192.0.2.2
    password: # optional
    value: ActivePowerPlus
  - source: sma
    uri: 192.0.2.3
    password: # optional
    value: ActivePowerPlus`,
	}

	registry.Add(template)
}
