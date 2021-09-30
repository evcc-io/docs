package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Fronius Symo GEN24 Plus (Battery Meter)",
		Sample: `power:
  source: calc
  add:
  - source: modbus
    model: sunspec
    uri: 192.0.2.2:502
    id: 1
    value: 160:3:DCW # mppt 3 charge
    scale: -1
  - source: modbus
    model: sunspec
    uri: 192.0.2.2:502
    id: 1
    value: 160:4:DCW # mppt 4 discharge
soc:
  source: modbus
  model: sunspec
  uri: 192.0.2.2:502
  id: 1
  value: ChargeState`,
	}

	registry.Add(template)
}
