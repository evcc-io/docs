package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "wbec",
		Sample: `power:
  source: mqtt
  topic: wbec/lp/1/power
energy:
  source: mqtt
  topic: wbec/lp/1/energy
currents:
  - source: mqtt
    topic: wbec/lp/1/currL1
  - source: mqtt
    topic: wbec/lp/1/currL2
  - source: mqtt
    topic: wbec/lp/1/currL3`,
	}

	registry.Add(template)
}
