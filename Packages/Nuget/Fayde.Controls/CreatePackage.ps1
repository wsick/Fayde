$libdestdir = $PWD.Path + "\content\lib\Fayde.Controls"
copy ($PWD.Path + "\..\..\..\Source\Fayde.Controls.Ex\Fayde.Controls.Ex.js") ($libdestdir + "\source.js")
copy ($PWD.Path + "\..\..\..\Source\Fayde.Controls.Ex\Fayde.Controls.Ex.d.ts") ($libdestdir + "\Fayde.Controls.Ex.d.ts")
copy ($PWD.Path + "\..\..\..\Source\Fayde.Controls.Ex\Themes\generic.xml") ($libdestdir + "\generic.xml")

$vpath = $PWD.Path + "\version.txt"
$versionstring = Get-Content $vpath
$tokens = $versionstring.Split(".")

$major = $tokens.Get(0)
$minor = $tokens.Get(1)
$build = $tokens.Get(2)
$revision = ([int]$tokens.Get(3) + 1).ToString()

$newversion = "$major.$minor.$build.$revision"
Set-Content -Value $newversion $vpath
nuget pack ".\Fayde.Controls.nuspec" -Version $newversion -OutputDirectory "..\"