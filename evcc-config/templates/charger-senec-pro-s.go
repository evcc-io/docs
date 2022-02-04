package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "heidelberg",
		Name:   "SENEC.Wallbox pro s",
		Sample: `device: /dev/ttyUSB0
baudrate: 19200
comset: 8E1
id: 1 # configurable (S2/DIP 1)
# an evcc sponsortoken is required for using this charger`,
	}

	registry.Add(template)
}
