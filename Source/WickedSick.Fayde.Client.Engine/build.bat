SET BD=%~1

SET progpath="%BD%..\..\JsSingularity.exe"
IF NOT EXIST %progpath% GOTO NOSINGULARITY

REM %progpath% "%BD%." -DeployPath:"%BD%Fayde.js" -ScriptsFolder:"%BD%Javascript" -BaseIncludesPath:"%BD%Javascript" -IncludeSubdirectories:true -IncludesFile:"%BD%Fayde.order" -Debug:true
%progpath% "%BD%." -ts:true -DeployPath:"%BD%Fayde.ts" -ScriptsFolder:"%BD%Typescript" -BaseIncludesPath:"%BD%Typescript" -IncludeSubdirectories:true -Debug:true -TsIncludeFile:"%BD%Fayde.tsorder" -TsIncludeFormat:"?s||Typescript\{0}"
tsc -c --sourcemap --target ES5 @Fayde.tsorder
tsc -c --sourcemap --target ES5 @UnitTestList.txt
tsc --declaration --target ES5 "%BD%Fayde.ts"
EXIT

:NOSINGULARITY
PRINT 'Could not find Js Singularity'
EXIT 1