package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Victron Energy (Battery Meter)",
		Sample: `power:
  source: modbus
  uri: 192.0.2.2:502
  id: 100 # com.victronenergy.system
  register:
    address: 842 # active DC power
    type: input
    decode: int16
  scale: -1
soc:
  source: modbus
  uri: 192.0.2.2:502
  id: 225 # com.victronenergy.battery
  register:
    address: 266 # SoC
    type: input
    decode: uint16
  scale: 0.1`,
	}

	registry.Add(template)
}
