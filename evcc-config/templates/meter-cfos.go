package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "cfos",
		Name:   "cFos PowerBrain Meter",
		Sample: `uri: 192.0.2.2:4702 # 4702 is meter 1, 4703 is meter 2
id: 2 # 2 is meter 1, 3 is meter 2
# an evcc sponsortoken is required for using this charger`,
	}

	registry.Add(template)
}
