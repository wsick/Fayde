@ECHO OFF
SET o=temp.txt

echo --module amd >> %o%
for /r . %%g in (*.ts) do echo %%g >> %o%

"C:\Program Files (x86)\Microsoft SDKs\TypeScript\0.8.0.0\tsc.exe" @"%CD%\%o%"

DEL %o%