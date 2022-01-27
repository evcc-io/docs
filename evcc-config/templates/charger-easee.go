package templates 

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "charger",
		Type:   "easee",
		Name:   "Easee Home (Cloud API)",
		Sample: `user: foo@example.org
password: *****
charger: EH______
cache: 10s
# an evcc sponsortoken is required for using this charger`,
	}

	registry.Add(template)
}
