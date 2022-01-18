package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Huawei SUN2000 with Sdongle and power sensor (Battery Meter)",
		Sample: `power:
  source: modbus
  uri: 192.0.2.2:502
  model: huawei
  timeout: 30s
  connectdelay: 5
  delay: 2s
  register:
    address: 37001
    type: holding
    decode: int32
soc:
  source: modbus
  uri: 192.0.2.2:502
  model: huawei
  timeout: 30s
  connectdelay: 5
  delay: 2s
  register:
    address: 37004
    type: holding
    decode: uint16
  scale: 0.1`,
	}

	registry.Add(template)
}
