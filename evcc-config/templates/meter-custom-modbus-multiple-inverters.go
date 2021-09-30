package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Multiple PV inverters combined (PV Meter)",
		Sample: `power:
  source: calc
  add:
  - source: modbus
    model: sunspec
    uri: 192.0.2.2:502
    id: 1
  - source: modbus
    model: sunspec
    uri: 192.0.2.3:502
    id: 1`,
	}

	registry.Add(template)
}
