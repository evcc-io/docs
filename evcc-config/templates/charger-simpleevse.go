package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "simpleevse",
		Name:   "EVSE DIN",
		Sample: `# http://evracing.cz/simple-evse-wallbox
# either locally attached:
device: /dev/ttyUSB0 # serial RS485 interface
# or via TCP:
uri: 192.0.2.2:502 # Modbus TCP converter address`,
	}

	registry.Add(template)
}
