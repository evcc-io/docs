package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Huawei SUN2000 with Sdongle (PV Meter)",
		Sample: `power:
  source: modbus
  uri: 192.0.2.2:502
  model: huawei
  timeout: 30s
  connectdelay: 5s
  delay: 2s
  register:
    address: 32080 # Active generation power
    type: holding
    decode: int32`,
	}

	registry.Add(template)
}
