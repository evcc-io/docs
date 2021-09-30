package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "rct",
		Name:   "RCT Power (Battery Meter)",
		Sample: `uri: 192.0.2.2
usage: battery
cache: 2s`,
	}

	registry.Add(template)
}
