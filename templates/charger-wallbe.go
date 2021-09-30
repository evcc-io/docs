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
legacy: true # set only for older Wallbe devices (pre ~2019, old controller firmware)  
meter: # only if a charge meter is connected to the controller
  power: true
  energy: true
  currents: true
  encoding: sdm # add only when SDM meter is connected, see https://github.com/evcc-io/evcc/discussions/1398`,
	}

	registry.Add(template)
}
