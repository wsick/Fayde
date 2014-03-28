param($installPath, $toolsPath, $package, $project)

Import-Module (Join-Path $toolsPath "commands.psm1")

$sc = @"
    
        require.shim["lib/Fayde.Experimental/Fayde.Experimental"] = {
            exports: "Fayde.Experimental"
        };
    
"@

$p = [System.IO.Path]::GetDirectoryName($project.FileName)
$p = Join-Path $p "default.html"

Remove-ScriptBlock $p "Fayde.Experimental"
Add-ScriptBlock $p "Fayde.Experimental" $sc