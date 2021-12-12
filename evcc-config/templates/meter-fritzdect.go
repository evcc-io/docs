package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "meter",
		Type:   "fritzdect",
		Name:   "FritzDECT",
		Sample: `uri: https://fritz.box # FRITZ!Box ip address (local)
user: xxxxxxxxxx # FRITZ!Box username (Has to have Smart Home privileges!)
password: yyyyyyyyyy # FRITZ!Box password
ain: '007788992233' # switch actor identification number without blanks (see AIN number on switch sticker)
standbypower: 15 # treat as charging above this power`,
	}

	registry.Add(template)
}
