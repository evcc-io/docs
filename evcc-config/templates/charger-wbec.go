package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "custom",
		Name:   "wbec",
		Sample: `status:
  source: mqtt
  topic: wbec/lp/1/status
enabled:
  source: mqtt
  topic: wbec/lp/1/enabled
enable:
  source: mqtt
  topic: wbec/lp/1/enable
maxcurrent:
  source: mqtt
  topic: wbec/lp/1/maxcurrent`,
	}

	registry.Add(template)
}
