package main

import (
	_ "embed"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"text/template"

	"github.com/evcc-io/config/registry"

	flag "github.com/spf13/pflag"
	"gopkg.in/yaml.v2"
)

const ext = ".yaml"

var (
	confYaml       string
	confGo         bool
	confOutGo      string
	confSummary    bool
	confOutSummary string
	confHelp       bool
	tmpl           *template.Template
)

func init() {
	flag.StringVarP(&confYaml, "yaml", "y", "yaml", "yaml path")
	flag.StringVarP(&confOutGo, "output-go", "o", "", "output go files path")
	flag.StringVarP(&confOutSummary, "output-summary", "f", "", "output summary file")
	flag.BoolVarP(&confGo, "go", "g", false, "generate go files")
	flag.BoolVarP(&confSummary, "summary", "s", false, "generate summary")
	flag.BoolVarP(&confHelp, "help", "h", false, "help")
	flag.Parse()
}

//go:embed template.md
var summaryTemplate string

var sourceTemplate = `package templates {{/* Define backtick variable */}}{{$tick := "` + "`" + `"}}

import (
	"github.com/evcc-io/config/registry"
)

func init() {
	template := registry.Template{
		Class:  "{{.Class}}",
		Type:   "{{.Type}}",
		Name:   "{{.Name}}",
		Sample: {{$tick}}{{escape .Sample}}{{$tick}},
	}

	registry.Add(template)
}
`

func scanFolder(root string) (files []string) {
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if filepath.Ext(info.Name()) == ext {
			files = append(files, path)
		}
		return nil
	})

	if err != nil {
		panic(err)
	}

	return files
}

func parseSample(file string) registry.Template {
	src, err := os.ReadFile(file)
	if err != nil {
		panic(err)
	}

	var sample registry.Template
	if err := yaml.Unmarshal(src, &sample); err != nil {
		panic(err)
	}

	// trim trailing linebreaks
	sample.Sample = strings.TrimRight(sample.Sample, "\r\n")

	return sample
}

func render(wr io.Writer, sample registry.Template) {
	if tmpl == nil {
		var err error
		tmpl, err = template.New("test").Funcs(template.FuncMap{
			// escape backticks in raw strings
			"escape": func(s string) string {
				return strings.ReplaceAll(s, "`", "`+\"`\"+`")
			},
		}).Parse(sourceTemplate)

		if err != nil {
			panic(err)
		}
	}

	tmpl.Execute(wr, sample)
}

func renderSummary(wr io.Writer, samples []registry.Template) {
	// prepare outside of loop
	re, err := regexp.Compile("[^a-zA-ZäöüÄÖÜ0-9]")
	if err != nil {
		panic(err)
	}

	tmpl, err := template.New("test").Funcs(template.FuncMap{
		// filter samples by class
		"filter": func(class string, samples []registry.Template) (reg []registry.Template) {
			for _, sample := range samples {
				if sample.Class == class {
					reg = append(reg, sample)
				}
			}
			return
		},
		// https://github.com/Masterminds/sprig/blob/48e6b77026913419ba1a4694dde186dc9c4ad74d/strings.go#L109
		"indent": func(spaces int, v string) string {
			pad := strings.Repeat(" ", spaces)
			return pad + strings.Replace(v, "\n", "\n"+pad, -1)
		},
		// unique link target
		"href": func(class, name string) string {
			link := strings.ReplaceAll(re.ReplaceAllString(strings.ToLower(name), "-"), "--", "-")
			return strings.Trim(strings.ToLower(class)+"-"+link, "-")
		},
	}).Parse(string(summaryTemplate))

	if err != nil {
		panic(err)
	}

	tmpl.Execute(wr, samples)
}

func output(file string, fun func(io.Writer)) {
	wr := os.Stdout
	if file != "" {
		var err error
		wr, err = os.Create(file)
		if err != nil {
			panic(err)
		}
	}

	fun(wr)
	wr.Close()
}

func main() {
	if confHelp {
		flag.PrintDefaults()
		os.Exit(0)
	}

	var samples []registry.Template

	files := scanFolder(confYaml)
	for _, file := range files {
		sample := parseSample(file)

		// example type
		dir := filepath.Dir(file)
		typ := filepath.Base(dir)
		typ = strings.TrimRight(typ, "s") // de-pluralize

		sample.Class = typ
		samples = append(samples, sample)

		if confGo {
			var out string
			if confOutGo != "" {
				name := strings.TrimSuffix(filepath.Base(file), filepath.Ext(file))
				out = fmt.Sprintf("%s/%s-%s.go", confOutGo, typ, name)
			}

			println(out)

			output(out, func(wr io.Writer) {
				render(wr, sample)
			})
		}
	}

	if confSummary {
		sort.Sort(registry.Templates(samples))
		output(confOutSummary, func(wr io.Writer) {
			renderSummary(wr, samples)
		})
	}
}
