/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// CODE

//#region RelativeSource
var RelativeSource = Nullstone.Create("RelativeSource", undefined, 1);

RelativeSource.Instance.Init = function (mode) {
    if (mode == null)
        mode = RelativeSourceMode.TemplatedParent;
    this.Mode = mode;
};

Nullstone.AutoProperties(RelativeSource, [
    "Mode"
]);

Nullstone.FinishCreate(RelativeSource);
//#endregion