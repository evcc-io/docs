package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "daheimladen",
		Name:   "Daheimladen (Cloud API)",
		Sample: `token: # Request your access token from Daheimladen support: info@daheimladen.de
stationID: xxxxxxxxxxxx990 # "Software Serial Number displayed on the display of the wallbox"`,
	}

	registry.Add(template)
}
