package registry

import "strings"

// Registry is the template registry instance
var Registry = make([]Template, 0)

// Template contains the template definition
type Template struct {
	Class  string
	Type   string
	Name   string
	Sample string
}

func Add(t Template) {
	Registry = append(Registry, t)
}

func TemplatesByClass(class string) []Template {
	templates := make([]Template, 0)
	for _, t := range Registry {
		if t.Class == class {
			templates = append(templates, t)
		}
	}
	return templates
}

type Templates []Template

func (e Templates) Len() int {
	return len(e)
}

func (e Templates) Less(i, j int) bool {
	return strings.ToLower(e[i].Class) < strings.ToLower(e[j].Class) ||
		(strings.ToLower(e[i].Class) == strings.ToLower(e[j].Class)) && strings.ToLower(e[i].Name) < strings.ToLower(e[j].Name)
}

func (e Templates) Swap(i, j int) {
	e[i], e[j] = e[j], e[i]
}
