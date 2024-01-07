terraform {
required_providers {
        azurerm = {
            source = "hashicorp/azurerm"
        }
    }
}
provider "azurerm" {
features { }
}
resource "azurerm_resource_group" "dvopsResourceGroup" {
    name = "dvopsResourceGroup"
    location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
    name = "dvopsAKSCluster"
    location = azurerm_resource_group.dvopsResourceGroup.location
    resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
    dns_prefix = "rms-aks"
default_node_pool {
        name = "default"
        node_count = 1
        vm_size = "Standard_DS2_v2"
    }
service_principal {
        client_id = "8a6cb277-0d15-4c40-83c0-e096dfeba651"
        client_secret = "MNq8Q~RGlt4vsdxGfwzzy75rJt3ECCHy003Y~a_."
    }
}