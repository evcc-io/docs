package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Victron Energy (PV Meter)",
		Sample: `power:
  source: modbus
  uri: 192.0.2.2:502
  id: 20 # com.victronenergy.pvinverter
  register:
    address: 1052 # Total AC Power
    type: input
    decode: int32`,
	}

	registry.Add(template)
}
