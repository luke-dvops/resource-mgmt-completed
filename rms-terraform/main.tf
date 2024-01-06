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
        client_id = "e0b85270-7162-49bd-956c-4554aca85efa"
        client_secret = "bpm8Q~W2M-a3N0iZcsVn24D.rG~LBkg2REJk6b_8"
    }
}