package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "modbus",
		Name:   "SunSpec compliant PV inverter (PV Meter)",
		Sample: `model: sunspec
uri: 192.0.2.2:502
id: 1`,
	}

	registry.Add(template)
}
