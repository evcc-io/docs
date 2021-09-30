package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Generic",
		Sample: `power: # power (W)
  source: # plugin type
  # ...
energy: # optional energy (kWh)
  source: # plugin type
  # ...
soc: # optional battery soc (%)
  source: # plugin type
  # ...
currents: # optional currents (A)
  - source: # L1 plugin type
    # ...
  - source: # L2 plugin type
    # ...
  - source: # L3 plugin type
    # ...`,
	}

	registry.Add(template)
}
