param($installPath, $toolsPath, $package, $project)

Import-Module (Join-Path $toolsPath "commands.psm1")

$sc = @"
    
        require.shim["lib/Fayde.Controls/Fayde.Controls"] = {
            exports: "Fayde.Controls"
        };
    
"@

$p = [System.IO.Path]::GetDirectoryName($project.FileName)
$p = Join-Path $p "default.html"

Remove-ScriptBlock $p "Fayde.Controls"
Add-ScriptBlock $p "Fayde.Controls" $sc