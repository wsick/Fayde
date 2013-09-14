function Set-ProjectItemType {
    param($project, $ProjectItemName, $ItemType)
    $project.ProjectItems | where { $_.Name -eq $ProjectItemName } | foreach { $_.Properties.Item("ItemType").Value = $ItemType }
}

function Get-ProjectItem {
    param($project, $name)
    $project.ProjectItems | where { $_.Name -eq $name } | select -first 1
}

function Add-ProjectItemChild {
    param($project, $parentitem, $childitem)
    IF ($parentItem -eq $null)
    {
        Write-Host "Parent Item is null."
        return
    }
    IF ($childItem -eq $null)
    {
        Write-Host "Child Item is null."
        return
    }
    
    $parentitem.ProjectItems.AddFromFile($childitem.Properties.Item("FullPath").Value)
    $parentitem.ProjectItems | select -first 1
}

function Set-WebAppProjectProperty {
    param($project, $name, $value)
    
    $prop = $project.Properties | where { $_.Name -eq "WebApplication." + $name }
    IF ($prop)
    {
        $prop.Value = $value
    }
}

Export-ModuleMember -function Set-ProjectItemType, Get-ProjectItem, Add-ProjectItemChild, Set-WebAppProjectProperty