package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "VARTA Energiespeicher (Grid Meter)",
		Sample: `power:
  source: modbus
  uri: 192.0.2.2:502
  id: 255
  register:
    address: 1078 # grid power
    type: input
    decode: int16
  scale: -1`,
	}

	registry.Add(template)
}
