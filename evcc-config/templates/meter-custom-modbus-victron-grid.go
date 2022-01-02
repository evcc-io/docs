package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Victron Energy (Grid Meter)",
		Sample: `power:
  source: calc
  add:
  - source: modbus
    uri: 192.0.2.2:502
    id: 50 # com.victronenergy.grid
    register:
      address: 2600 # L1 grid power
      type: input
      decode: int16
  - source: modbus
    uri: 192.0.2.2:502
    id: 50 # com.victronenergy.grid
    register:
      address: 2601 # L2 grid power
      type: input
      decode: int16
  - source: modbus
    uri: 192.0.2.2:502
    id: 50 # com.victronenergy.grid
    register:
      address: 2602 # L3 grid power
      type: input
      decode: int16`,
	}

	registry.Add(template)
}
