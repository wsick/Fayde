$vpath = $PWD.Path + "\version.txt"
$versionstring = Get-Content $vpath
$tokens = $versionstring.Split(".")
$major = $tokens.Get(0)
$minor = $tokens.Get(1)
$build = $tokens.Get(2)
$revision = $tokens.Get(3)

$oldrevision = ([int]$revision - 1).ToString()
$newversion = "$major.$minor.$build.$oldrevision"
Set-Content -Value $newversion $vpath

$oldpkg = $PWD.Path + "\..\Fayde.Controls.$major.$minor.$build.$revision.nupkg"
ri $oldpkg