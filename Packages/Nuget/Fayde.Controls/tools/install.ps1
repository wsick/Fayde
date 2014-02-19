param($installPath, $toolsPath, $package, $project)

function Add-ScriptBlock($path, $id, $content) {
    [xml]$xd = New-Object System.Xml.XmlDocument;
    $xd.PreserveWhitespace = $true;
    $xd.Load($path);
    $defns = $xd.DocumentElement.NamespaceURI;
    
    $prevsibling = $xd.html.head.script | ? { [string]::IsNullOrEmpty($_.'data-config') -ne $true -or [string]::IsNullOrEmpty($_.'data-lib') -ne $true } | select -Last 1

    $newblock = $xd.CreateElement("script", $defns);
    $newblock.SetAttribute("data-lib", $id)
    $newblock.AppendChild($xd.CreateTextNode($content));
    $prevsibling.ParentNode.InsertAfter($newblock, $prevsibling);
    
    $nl = $xd.CreateSignificantWhitespace([Environment]::NewLine);
    $prevsibling.ParentNode.InsertAfter($nl, $prevsibling);
    
    $xd.Save($path);
}

$sc = @"
    
        require.shim["lib/Fayde.Controls/Fayde.Controls"] = {
            exports: "Fayde.Controls"
        };
    
"@

$p = [System.IO.Path]::GetDirectoryName($project.FileName)
$p = Join-Path $p "default.html"

Add-ScriptBlock $p "Fayde.Controls" $sc