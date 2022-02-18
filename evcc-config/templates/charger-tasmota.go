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
# user: xxx  # (optional) in case user + password are defined
# password: xxx  #  (optional) in case user + password are defined   
standbypower: 15 # treat as charging above this power, a negative value activates static switch mode`,
	}

	registry.Add(template)
}
