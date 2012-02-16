SET BD=%1

SET progpath="%BD%..\..\JsSingularity.exe"
IF NOT EXIST %progpath% GOTO NOSINGULARITY

%progpath% %BD% -DeployPath:%BD%\Fayde.js -ScriptsFolder:"%BD%\Javascript" -BaseIncludesPath:%BD%\Javascript -IncludeSubdirectories:true -IncludesFile:%BD%\Fayde.order -Debug:true
EXIT

:NOSINGULARITY
PRINT 'Could not find Js Singularity'
EXIT 1