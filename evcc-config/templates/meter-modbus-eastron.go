package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "modbus",
		Name:   "Eastron SDM Modbus Meter",
		Sample: `model: sdm # specific non-sunspec meter
id: 1
energy: Sum # only required for charge meter usage
# chose either locally attached:
device: /dev/ttyUSB0 # serial port
baudrate: 9600
comset: 8N1
# or via TCP:
uri: 192.0.2.2:502
rtu: true # serial modbus rtu (rs485) device connected using simple ethernet adapter`,
	}

	registry.Add(template)
}
