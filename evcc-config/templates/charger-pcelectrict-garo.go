package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "garo",
		Name:   "PC Electric Garo",
		Sample: `uri: http://192.0.2.2:8080/servlet
meter: <CENTRAL100|CENTRAL101|INTERNAL|EXTERNAL|TWIN> # Value can be found at http://192.0.2.2:8080/servlet/rest/chargebox/status 
# Only devices configured as master can be used right now!
# an evcc sponsortoken is required for using this charger`,
	}

	registry.Add(template)
}
