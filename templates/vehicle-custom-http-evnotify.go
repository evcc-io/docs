package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "vehicle",
		Type:   "custom",
		Name:   "evNotify (HTTP)",
		Sample: `title: My Car # display name for UI
capacity: 64 # kWh
charge:
  type: http
  uri: https://app.evnotify.de/soc?akey=AKEY&token=1234567890abcdef # evNotify Server + AKEY
  method: GET
  jq: .soc_display
cache: 5m # cache duration`,
	}

	registry.Add(template)
}
