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
  id: 100 # com.victronenergy.system
  register:
    address: 843 # SoC
    type: input
    decode: uint16`,
	}

	registry.Add(template)
}
