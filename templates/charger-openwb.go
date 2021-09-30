package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "openwb",
		Name:   "openWB (MQTT)",
		Sample: `broker: 192.0.2.2 # openWB IP
id: 1 # loadpoint id`,
	}

	registry.Add(template)
}
