package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "niu",
		Name:   "NIU E-Scooter",
		Sample: `title: NIU E-Scooter # display name for UI
capacity: 4 # kWh
user: xxxxxxx # NIU app user
password: xxxxxx # NIU app password
serial: NXXXXXXXXXXXXXXX # NIU E-Scooter serial number like shown in app`,
	}

	registry.Add(template)
}
