package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "VARTA Energiespeicher (Battery Meter)",
		Sample: `power:
  source: modbus
  uri: 192.0.2.2:502
  id: 1
  register:
    address: 1066 # active power
    type: input
    decode: int16
  scale: -1
soc:
  source: modbus
  uri: 192.0.2.2:502
  id: 1
  register:
    address: 1068 # SOC
    type: input
    decode: int16`,
	}

	registry.Add(template)
}
