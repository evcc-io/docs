package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "nrgkick-connect",
		Name:   "NRGKick Connect",
		Sample: `uri: http://192.0.2.2
mac: 00:1E:C0:XX:XX:XX # BT device MAC address (sudo hcitool lescan)
password: # password`,
	}

	registry.Add(template)
}
