param($installPath, $toolsPath, $package, $project)

function Remove-ScriptBlock($path, $id) {
    [xml]$xd = New-Object System.Xml.XmlDocument;
    $xd.PreserveWhitespace = $true;
    $xd.Load($path);
    $defns = $xd.DocumentElement.NamespaceURI;
    
    $head = $xd.html.head;

    $head.script | ? { $_.'data-lib' -eq $id } | foreach { Remove-BlockAndWs $_ }

    $xd.Save($path);
}
function Remove-BlockAndWs($block) {
    $parent = $block.ParentNode;
    $ws = $block.PreviousSibling;
    $parent.RemoveChild($block);
    $parent.RemoveChild($ws);
}

$p = [System.IO.Path]::GetDirectoryName($project.FileName)
$p = Join-Path $p "default.html"

Remove-ScriptBlock $p "Fayde.Controls"