const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const hcl = require("../dist");

chai.use(chaiAsPromised);

describe('parseToObject', () => {
  it('successfully parses simple input', async () => {
    const input = `
    foo = {
      bar = {
        id = 1
      }
    }
    `;

    const result = await hcl.parseToObject(input);
    chai.assert.deepEqual(result, {
      foo: {
        bar: {
          id: 1,
        },
      },
    });
  });

  it('successfully parses complex hcl', async () => {
    const input = `
    terraform {
      required_providers {
        azurerm = {
          source  = "hashicorp/azurerm"
          version = "=2.46.0"
        }
      }
    }

    # Configure the Microsoft Azure Provider
    provider "azurerm" {
      features {}
    }

    # Create a resource group
    variable "azureRegion" {
      type = string
      default = "uksouth"
    }
    resource "azurerm_resource_group" "example" {
      name     = "example-resources"
      location = var.azureRegion
    }

    # Create a virtual network within the resource group
    resource "azurerm_virtual_network" "example" {
      name                = "example-network"
      resource_group_name = azurerm_resource_group.example.name
      location            = azurerm_resource_group.example.location
      address_space       = ["10.0.0.0/16"]
    }`;

    const result = await hcl.parseToObject(input);

    chai.assert.equal(result.variable.azureRegion[0].default, "uksouth");
    chai.assert.deepEqual(result.resource.azurerm_resource_group, {
      example: [
        {
          location: "${var.azureRegion}",
          name: "example-resources"
        }
      ]
    });
    chai.assert.deepEqual(result.resource.azurerm_virtual_network, {
      example: [
        {
          name: "example-network",
          location: "${azurerm_resource_group.example.location}",
          resource_group_name: "${azurerm_resource_group.example.name}",
          address_space: ["10.0.0.0/16"]
        }
      ]
    });
  });

  it('rejects promise when parsing invalid hcl', async () => {
    // Missing key/value sep
    const input = `
    foo = {
      bar {
        id = 1
      }
    }
    `

    const failedPromise = hcl.parseToString(input);
    chai.assert.isRejected(failedPromise, "Missing key/value separator");
  });
});

describe('parseToString', () => {
  it('successfully parses simple input', async () => {
    const input = `
    foo = {
      bar = {
        id = 1
      }
    }
    `;

    const result = await hcl.parseToString(input);
    chai.assert.equal(result, '{"foo":{"bar":{"id":1}}}');
  });

  it('fails to parse invalid input', async () => {
    const input = 'this is not hcl';

    const failedPromise = hcl.parseToString(input);
    chai.assert.isRejected(failedPromise, "Invalid block definition");
  });
});