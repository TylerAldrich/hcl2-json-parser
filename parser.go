package main

import (
	"github.com/gopherjs/gopherjs/js"
	"github.com/miratronix/jopher"
	"github.com/tmccombs/hcl2json/convert"
)

func main() {
	js.Module.Get("exports").Set("parseToString", jopher.Promisify(parseToString))
	js.Module.Get("exports").Set("parseToObject", jopher.Promisify(parseToObject))
}

// Parse a HCL string into a JSON string
func parseToString(input string) (output string, err error) {
	convertedBytes, err := convert.Bytes([]byte(input), "", convert.Options{})
	if err != nil {
		return "", err
	}
	output = string(convertedBytes)
	return output, nil
}

// Parse a HCL string into a JSON object
func parseToObject(input string) (output *js.Object, err error) {
	jsonString, err := parseToString(input)
	if err != nil {
		return &js.Object{}, err
	}
	obj := js.Global.Get("JSON").Call("parse", string(jsonString))
	return obj, nil
}
