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
    id: 100 # com.victronenergy.system
    register:
      address: 820 # L1 grid power
      type: input
      decode: int16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 821 # L2 grid power
      type: input
      decode: int16
  - source: modbus
    uri: 192.0.2.2:502
    id: 100 # com.victronenergy.system
    register:
      address: 822 # L3 grid power
      type: input
      decode: int16`,
	}

	registry.Add(template)
}
