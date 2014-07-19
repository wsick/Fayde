$vpath = $PWD.Path + "\version.txt"
$versionstring = Get-Content $vpath
$tokens = $versionstring.Split(".")
$major = $tokens.Get(0)
$minor = $tokens.Get(1)
$build = $tokens.Get(2)

$oldbuild = ([int]$build - 1).ToString()
$newversion = "$major.$minor.$oldbuild"
Set-Content -Value $newversion $vpath

$specfile = $PWD.Path + "\Fayde.nuspec"
[xml]$specxml = New-Object System.Xml.XmlDocument
$specxml.PreserveWhitespace = $true
$specxml.Load($specfile)
$specxml.package.metadata.version = $newversion
Set-Content $specfile $specxml.OuterXml

$oldpkg = $PWD.Path + "\Fayde.$major.$minor.$build.nupkg"
ri $oldpkg