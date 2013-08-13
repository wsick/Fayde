$bindestdir = $PWD.Path + "\SourceFiles\lib\net"
copy ($PWD.Path + "\..\Source\bin\WickedSick.Server.Framework.Fayde.dll") $bindestdir
copy ($PWD.Path + "\..\Source\bin\WickedSick.Server.XamlParser.dll") $bindestdir

$scriptsdestdir = $PWD.Path + "\SourceFiles\content\scripts"
copy ($PWD.Path + "\..\Source\jsbin\Fayde.d.ts") $scriptsdestdir
copy ($PWD.Path + "\..\Source\jsbin\Fayde.js") $scriptsdestdir
copy ($PWD.Path + "\..\Source\jsbin\Fayde.Theme.Silverlight.js") $scriptsdestdir
copy ($PWD.Path + "\..\Source\jsbin\Fayde.Theme.Metro.js") $scriptsdestdir

$fp = $bindestdir + "\WickedSick.Server.Framework.Fayde.dll"
$version = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($fp).FileVersion
nuget pack ".\SourceFiles\Fayde.nuspec" -Version $version