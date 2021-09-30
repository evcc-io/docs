package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "PowerDog (PV Meter)",
		Sample: `power:
  type: modbus
  uri: 192.168.1.2:502 #ip-adress and port (default-port: 502)
  id: 1
  register:
    address: 40002 #register for pv effort
    type: holding
    decode: int32`,
	}

	registry.Add(template)
}
