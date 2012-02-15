SET progpath=..\..\JsSingularity.exe
IF NOT EXIST %progpath% GOTO NOSINGULARITY

%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Controls.js -ScriptsFolder:"%CD%\Javascript\Controls" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Core.js -ScriptsFolder:"%CD%\Javascript\Core" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Data.js -ScriptsFolder:"%CD%\Javascript\Data" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Documents.js -ScriptsFolder:"%CD%\Javascript\Documents" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Engine.js -ScriptsFolder:"%CD%\Javascript\Engine" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Markup.js -ScriptsFolder:"%CD%\Javascript\Markup" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Media.js -ScriptsFolder:"%CD%\Javascript\Media" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Primitives.js -ScriptsFolder:"%CD%\Javascript\Primitives" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Runtime.js -ScriptsFolder:"%CD%\Javascript\Runtime" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.TextLayout.js -ScriptsFolder:"%CD%\Javascript\TextLayout" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true

PAUSE
EXIT

:NOSINGULARITY
PRINT 'Could not find Js Singularity'
PAUSE
EXIT 1