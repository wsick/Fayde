SET progpath=..\..\JsSingularity.exe
IF NOT EXIST %progpath% GOTO NOSINGULARITY

%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Controls.js -ScriptsFolder:"%CD%\Javascript\Controls" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Controls.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Core.js -ScriptsFolder:"%CD%\Javascript\Core" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Core.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Data.js -ScriptsFolder:"%CD%\Javascript\Data" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Data.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Documents.js -ScriptsFolder:"%CD%\Javascript\Documents" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Documents.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Engine.js -ScriptsFolder:"%CD%\Javascript\Engine" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Engine.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Markup.js -ScriptsFolder:"%CD%\Javascript\Markup" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Markup.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Media.js -ScriptsFolder:"%CD%\Javascript\Media" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Media.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Primitives.js -ScriptsFolder:"%CD%\Javascript\Primitives" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Primitives.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.Runtime.js -ScriptsFolder:"%CD%\Javascript\Runtime" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.Runtime.order
%progpath% %CD% -DeployPath:%CD%\Packages\Fayde.TextLayout.js -ScriptsFolder:"%CD%\Javascript\TextLayout" -BaseIncludesPath:%CD%\Javascript -IncludeSubdirectories:true -IncludesFile:%CD%\Packages\Fayde.TextLayout.order

PAUSE
EXIT

:NOSINGULARITY
PRINT 'Could not find Js Singularity'
PAUSE
EXIT 1