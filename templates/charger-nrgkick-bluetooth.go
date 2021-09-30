package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "nrgkick-bluetooth",
		Name:   "NRGKick BT (Bluetooth)",
		Sample: `mac: 00:1E:C0:XX:XX:XX # BT device MAC address (sudo hcitool lescan)
pin: 1234 # App PIN number (write protection, ignore leading zeros)`,
	}

	registry.Add(template)
}
