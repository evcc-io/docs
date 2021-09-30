package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "phoenix-ev-eth",
		Name:   "Phoenix EV-ETH Controller (Modbus TCP)",
		Sample: `uri: 192.168.0.8:502
meter: # only if a charge meter is connected to the controller
  power: true
  energy: true
  currents: true`,
	}

	registry.Add(template)
}
