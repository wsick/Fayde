param($dir, $outfile)
$files = [IO.Directory]::GetFiles($dir, "*.ts", [IO.SearchOption]::AllDirectories)
$files | Out-File $outfile