/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// CODE

//#region RelativeSource
var RelativeSource = Nullstone.Create("RelativeSource", null, 1);

RelativeSource.Instance.Init = function (mode) {
    if (mode == null)
        mode = RelativeSourceMode.TemplatedParent;
    this.SetMode(mode);
};

RelativeSource.Instance.GetMode = function () {
    return this._Mode;
};
RelativeSource.Instance.SetMode = function (/* RelativeSourceMode */value) {
    this._Mode = value;
};

Nullstone.FinishCreate(RelativeSource);
//#endregion