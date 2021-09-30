package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "SolarEdge Energy Meter via inverter (Grid Meter)",
		Sample: `power:
  source: modbus
  model: sunspec
  uri: 192.0.2.2:502 # Port 502 (SetApp) or 1502 (LCD)
  id: 1
  subdevice: 1 # Metering device
  value: 203:W
  scale: -1`,
	}

	registry.Add(template)
}
