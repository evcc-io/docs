package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "heidelberg",
		Name:   "Heidelberg Energy Control (Modbus RTU)",
		Sample: `device: /dev/ttyUSB0
baudrate: 19200
comset: 8E1
id: 1 # configurable (S2/DIP 1)`,
	}

	registry.Add(template)
}
