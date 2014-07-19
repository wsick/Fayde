$libsrcdir = $PWD.Path + "\..\Source\Fayde.Client"
$libdestdir = $PWD.Path + "\content\lib\Fayde"
copy ($libsrcdir + "\Fayde.js") ($libdestdir + "\Fayde.js")
copy ($libsrcdir + "\Fayde.d.ts") ($libdestdir + "\Fayde.d.ts")
copy ($libsrcdir + "\Themes\Default.theme.xml") ($libdestdir + "\Themes\")
copy ($libsrcdir + "\Themes\Metro.theme.xml") ($libdestdir + "\Themes\")

$vpath = $PWD.Path + "\version.txt"
$versionstring = Get-Content $vpath
$tokens = $versionstring.Split(".")

$major = $tokens.Get(0)
$minor = $tokens.Get(1)
$build = ([int]$tokens.Get(2) + 1).ToString()

$newversion = "$major.$minor.$build"
Set-Content -Value $newversion $vpath

Add-Content ($libdestdir + "\Fayde.js") "`nFayde.Version = `"$major.$minor.$build`";"

$specfile = $PWD.Path + "\Fayde.nuspec"
[xml]$specxml = New-Object System.Xml.XmlDocument
$specxml.PreserveWhitespace = $true
$specxml.Load($specfile)
$specxml.package.metadata.version = $newversion
Set-Content $specfile $specxml.OuterXml

nuget pack $specfile -Version $newversion