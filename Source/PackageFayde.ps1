$cd = Split-Path $MyInvocation.MyCommand.Path;
[System.Reflection.Assembly]::LoadFrom($cd + "\..\ThirdParty\Ionic.Zip.Reduced.dll");

###############################
# Create zip file
###############################
$zipFileName = "Fayde.zip";
if (Test-Path $zipFileName)
{
	Remove-Item $zipFileName;
}
$zipfile = new-object Ionic.Zip.ZipFile($zipFileName);

###############################
# Add Js Files to zip
###############################
$engineDir = $cd + "\WickedSick.Fayde.Client.Engine\";
[IO.Directory]::SetCurrentDirectory($engineDir);
$zipFile.AddItem("Fayde.js", "jsbin");
$zipFile.AddItem("Fayde.Generic.js", "jsbin");
$zipFile.AddItem("Fayde.d.ts", "jsbin");
[IO.Directory]::SetCurrentDirectory($cd);

###############################
# Add Server Files to zip
###############################
$serverDir = $cd + "\WickedSick.Server.Framework.Fayde\bin\Release\";
[IO.Directory]::SetCurrentDirectory($serverDir);
foreach ($file in (dir $serverDir -include @("*.exe","*.dll","*.xml") -rec))
{
	Write-Output $file.Name
	$zipFile.AddItem($file.Name, "bin");
}
[IO.Directory]::SetCurrentDirectory($cd);

$zipFile.Save();