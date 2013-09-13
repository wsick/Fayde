$bindestdir = $PWD.Path + "\SourceFiles\lib\net"
copy ($PWD.Path + "\..\Source\bin\Fayde.dll") $bindestdir

$scriptsdestdir = $PWD.Path + "\SourceFiles\content\scripts"
copy ($PWD.Path + "\..\Source\jsbin\Fayde.d.ts") $scriptsdestdir
copy ($PWD.Path + "\..\Source\jsbin\Fayde.js") $scriptsdestdir
copy ($PWD.Path + "\..\Source\jsbin\Fayde.Theme.Silverlight.js") $scriptsdestdir
copy ($PWD.Path + "\..\Source\jsbin\Fayde.Theme.Metro.js") $scriptsdestdir

$fp = $bindestdir + "\Fayde.dll"
$version = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($fp).FileVersion
nuget pack ".\SourceFiles\Fayde.nuspec" -Version $version