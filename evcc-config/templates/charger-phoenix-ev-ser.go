package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "phoenix-ev-ser",
		Name:   "Phoenix EV-SER Controller (Modbus RTU)",
		Sample: `device: /dev/ttyUSB0
baudrate: 9600 # configurable (S2/DIP 1)
comset: 8N1
id: 1 # configurable (S2/DIP 2–6)`,
	}

	registry.Add(template)
}
