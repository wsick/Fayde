$scriptsdestdir = $PWD.Path + "\content\lib\Fayde"
copy ($PWD.Path + "\..\..\..\Source\jsbin\*") $scriptsdestdir

$vpath = $PWD.Path + "\version.txt"
$versionstring = Get-Content $vpath
$tokens = $versionstring.Split(".")

$major = $tokens.Get(0)
$minor = $tokens.Get(1)
$build = $tokens.Get(2)
$revision = ([int]$tokens.Get(3) + 1).ToString()

$newversion = "$major.$minor.$build.$revision"
Set-Content -Value $newversion $vpath
nuget pack ".\Fayde.nuspec" -Version $newversion -OutputDirectory "..\"