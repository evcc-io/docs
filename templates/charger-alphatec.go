package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "alphatec",
		Name:   "Alphatec Wallbox Mini",
		Sample: `# chose either locally attached on serial port:
device: /dev/ttyUSB0
baudrate: 9600
comset: 8N1
# or via external TCP-RS485 translator:
# uri: 192.0.2.2:502
id: 1 
# an evcc sponsortoken is required for using this charger`,
	}

	registry.Add(template)
}
