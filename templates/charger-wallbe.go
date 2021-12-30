package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "wallbe",
		Name:   "Wallbe (Eco, Pro)",
		Sample: `uri: 192.168.0.8:502 # TCP ModBus address
meter: # only if a charge meter is connected to the controller
  power: true
  energy: true
  currents: true`,
	}

	registry.Add(template)
}
