package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "warp",
		Name:   "TinkerForge WARP Charger",
		Sample: `broker: 192.0.2.2:1883
topic: warp
useMeter: true # WARP Charger Pro
timeout: 30s`,
	}

	registry.Add(template)
}
