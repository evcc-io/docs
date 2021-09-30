package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "custom",
		Name:   "Tasmota (HTTP)",
		Sample: `power: # power reading (W)
  source: http
  uri: http://192.0.2.2/cm?cmnd=Status%208
  jq: .StatusSNS.ENERGY.Power
energy: # energy reading (Wh), for chargemeter usage only
  source: http
  uri: http://192.0.2.2/cm?cmnd=Status%208
  jq: .StatusSNS.ENERGY.Total * 1000`,
	}

	registry.Add(template)
}
