package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "ovms",
		Name:   "OVMS",
		Sample: `title: Open Vehicle Monitoring System # display name for UI
capacity: 12 # kWh
user: # user server
password: # password server
vehicleid: # vehicle id
server: dexters-web.de # used ovms server [dexters-web.de or api.openvehicles.com]`,
	}

	registry.Add(template)
}
