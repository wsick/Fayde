SET BD=%~1

SET progpath="%BD%..\..\JsSingularity.exe"
IF NOT EXIST %progpath% GOTO NOSINGULARITY

%progpath% "%BD%." -DeployPath:"%BD%Fayde.js" -ScriptsFolder:"%BD%Javascript" -BaseIncludesPath:"%BD%Javascript" -IncludeSubdirectories:true -IncludesFile:"%BD%Fayde.order" -Debug:true
%progpath% "%BD%." -ts:true -DeployPath:"%BD%Fayde-New.ts" -ScriptsFolder:"%BD%Typescript" -BaseIncludesPath:"%BD%Typescript" -IncludeSubdirectories:true -IncludesFile:"%BD%Fayde-New.order" -Debug:true -TsIncludeFile:"%BD%Fayde.tsinclude" -TsIncludeFormat:"?s||Typescript\{0}"
tsc -c --sourcemap --target ES5 @Fayde.tsinclude
tsc -c --sourcemap --target ES5 @UnitTestList.txt
tsc --declaration --target ES5 "%BD%Fayde-New.ts"
EXIT

:NOSINGULARITY
PRINT 'Could not find Js Singularity'
EXIT 1