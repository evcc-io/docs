package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "rct",
		Name:   "RCT Power (PV Meter)",
		Sample: `uri: 192.0.2.2
usage: pv
cache: 2s`,
	}

	registry.Add(template)
}
