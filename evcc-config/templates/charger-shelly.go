package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "shelly",
		Name:   "Shelly",
		Sample: `uri: http://192.0.2.2  # shelly device ip address (local)
channel: 0  # shelly device relay channel
# user: xxxx # user, (optional) in case user + password are defined
# password: xxxxx #  (optional) in case user + password are defined   
standbypower: 15  # treat as charging above this power, a negative value activates static switch mode`,
	}

	registry.Add(template)
}
