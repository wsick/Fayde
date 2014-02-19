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

Export-ModuleMember Add-ScriptBlock
Export-ModuleMember Remove-ScriptBlock
Export-ModuleMember Remove-BlockAndWs