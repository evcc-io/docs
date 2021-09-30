package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "sma",
		Name:   "SMA Speedwire Inverter (PV or Battery Meter)",
		Sample: `uri: 192.0.2.2
password: # optional`,
	}

	registry.Add(template)
}
