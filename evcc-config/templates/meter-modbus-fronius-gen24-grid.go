package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "modbus",
		Name:   "Fronius Symo GEN24 Plus (Grid Meter)",
		Sample: `model: sunspec
uri: 192.0.2.2:502
id: 200
power: 213:W # sunspec model 203 meter`,
	}

	registry.Add(template)
}
