param($installPath, $toolsPath, $package, $project)

Import-Module (Join-Path $toolsPath "commands.psm1")

$p = [System.IO.Path]::GetDirectoryName($project.FileName)
$p = Join-Path $p "default.html"

Remove-ScriptBlock $p "Fayde.Controls"