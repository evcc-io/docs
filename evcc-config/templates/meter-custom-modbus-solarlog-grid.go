package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Solarlog (Grid Meter)",
		Sample: `power:
  source: calc
  add:
  - source: modbus
    uri: 192.0.2.2:502
    id: 1
    register:
      address: 3502 # Pac
      type: input
      decode: uint32s
    scale: -1
  - source: modbus
    uri: 192.0.2.2:502
    id: 1
    register:
      address: 3518 # Pac consumption
      type: input
      decode: uint32s`,
	}

	registry.Add(template)
}
