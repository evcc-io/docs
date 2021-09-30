package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "VARTA Energiespeicher (PV Meter)",
		Sample: `power:
  source: modbus
  uri: 192.0.2.2:502
  id: 255
  register:
    address: 1102 # PV-sensor power
    type: input
    decode: uint16`,
	}

	registry.Add(template)
}
