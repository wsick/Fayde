param($installPath, $toolsPath, $package, $project)

Set-WebAppProjectProperty $project "IsUsingIISExpress" $False
Set-WebAppProjectProperty $project "UseIISExpress" $False
Set-WebAppProjectProperty $project "IISUrl" ("http://localhost/" + $project.ProjectName)
Set-WebAppProjectProperty $project "DebugStartAction" 1
Set-WebAppProjectProperty $project "StartPageUrl" "default.fap"

#Set up default.fap
Set-ProjectItemType $project "default.fap.ts" "TypeScriptCompile"

$rootitem = Get-ProjectItem $project "default.fap"
IF ($rootitem) {
    $tsitem = Get-ProjectItem $project "default.fap.ts"
    Add-ProjectItemChild $project $rootitem $tsitem

    $jsitem = Get-ProjectItem $project "default.fap.js"
    Add-ProjectItemChild $project $tsitem $jsitem
}

#Set up default.fayde
Set-ProjectItemType $project "default.fayde.ts" "TypeScriptCompile"

$rootitem = Get-ProjectItem $project "default.fayde"
IF ($rootitem) {
    $tsitem = Get-ProjectItem $project "default.fayde.ts"
    Add-ProjectItemChild $project $rootitem $tsitem

    $jsitem = Get-ProjectItem $project "default.fayde.js"
    Add-ProjectItemChild $project $tsitem $jsitem
}

$project.Save()