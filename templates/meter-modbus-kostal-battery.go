package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "modbus",
		Name:   "Kostal Hybrid Inverter (Battery Meter)",
		Sample: `model: sunspec
uri: 192.0.2.2:1502
id: 71 # kostal default sunspec modbus id
power: 802:W # sunspec model 802 battery
soc: 802:SoC # sunspec model 802 battery`,
	}

	registry.Add(template)
}
