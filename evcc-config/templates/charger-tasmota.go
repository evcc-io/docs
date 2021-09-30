package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "tasmota",
		Name:   "Tasmota",
		Sample: `uri: http://192.168.xxx.xxx # tasmota device ip address (local)
# user: xxxx # user, (optional) in case user + password are defined
# password: xxxxx #  (optional) in case user + password are defined
standbypower: 15 # treat as charging above this power`,
	}

	registry.Add(template)
}
