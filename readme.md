# HCL v2 parser for JS

This is a [HCL version 2](https://pkg.go.dev/github.com/hashicorp/hcl/v2#readme-changes-in-2-0) parser for JavaScript, there are several other JS parsers for HCL but none that support the newer HCL v2 syntax.

It wraps the very helpful [tmccombs/hcl2json](https://github.com/tmccombs/hcl2json) and calls the convert package in order to parse HCL input strings to JSON strings. The Go code in `parser.go` is converted to JS using [GopherJS](https://github.com/gopherjs/gopherjs)

This is an updated version of [hcl2-parser](https://www.npmjs.com/package/hcl2-parser). The original library is no longer maintained, and did not return errors to the user. This version returns a Promise that is rejected when an error (e.g. a syntax error) is returned while parsing.

TypeScript definitions are included

## Reference

The module exports the following functions:

```ts
// Returns the parsed JSON String, or rejects with the error.
function parseToString(input: string): Promise<string>
// Returns the parsed JSON string converted to an object with JSON.parse(),
// or rejects with the error.
function parseToObject(input: string): Promise<AnyJson>
```

## Usage

Install as normal with NPM

```bash
npm install hcl2-json-parser
```

Importing into your project

```ts
// Good old fashioned Node.js CommonJS require
const hcl = require("hcl2-json-parser")

// Import with ES6 or TypeScript
import * as hcl = from "hcl2-json-parser"
```

Simple example of usage

```js
const hcl = require("hcl2-json-parser")

const hclString = `
# Create a resource group
variable "azureRegion" {
  type = string
  default = "uksouth"
}
resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = var.azureRegion
}
`

// Parse into a JSON string
stringResult = await hcl.parseToString(hclString)
console.log(stringResult)

// Parse into an object
objectResult = await hcl.parseToObject(hclString)
console.log(objectResult.resource.azurerm_resource_group)

try {
  result = await hcl.parseToObject("invalid hcl!!!");
} catch (e) {
  // `e` will contain the error thrown by the underlying github.com/tmccombs/hcl2json library.
}
```
