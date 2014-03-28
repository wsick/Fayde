$libdestdir = $PWD.Path + "\content\lib\Fayde.Experimental"
$libsrcdir = $PWD.Path + "\..\Fayde.Experimental"
copy ($libsrcdir + "\Fayde.Experimental.js") ($libdestdir + "\Fayde.Experimental.js")
copy ($libsrcdir + "\Fayde.Experimental.d.ts") ($libdestdir + "\Fayde.Experimental.d.ts")
copy ($libsrcdir + "\Themes\Default.theme.xml") ($libdestdir + "\Themes\")
copy ($libsrcdir + "\Themes\Metro.theme.xml") ($libdestdir + "\Themes\")

$vpath = $PWD.Path + "\version.txt"
$versionstring = Get-Content $vpath
$tokens = $versionstring.Split(".")

$major = $tokens.Get(0)
$minor = $tokens.Get(1)
$build = $tokens.Get(2)
$revision = ([int]$tokens.Get(3) + 1).ToString()

$newversion = "$major.$minor.$build.$revision"
Set-Content -Value $newversion $vpath

$specfile = $PWD.Path + "\Fayde.Experimental.nuspec"
[xml]$specxml = New-Object System.Xml.XmlDocument
$specxml.PreserveWhitespace = $true
$specxml.Load($specfile)
$specxml.package.metadata.version = $newversion
Set-Content $specfile $specxml.OuterXml

$deploydir = $PWD.Path + "\..\..\..\Packages\Nuget\"
nuget pack $specfile -Version $newversion -OutputDirectory $deploydir