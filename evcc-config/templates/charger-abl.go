package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "abl",
		Name:   "ABL eMH / SENEC.Wallbox pro",
		Sample: `# chargers based on the ABL EVCC2/3 controller
# chose either locally attached on serial port:
device: /dev/ttyUSB0
baudrate: 38400
comset: 8E1
# or via external TCP-RS485 translator:
# uri: 192.0.2.2:502
id: 1 
# an evcc sponsortoken is required for using this charger`,
	}

	registry.Add(template)
}
