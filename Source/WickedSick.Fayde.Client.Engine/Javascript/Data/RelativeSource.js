/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// CODE

//#region RelativeSource

function RelativeSource(mode) {
    if (!Nullstone.IsReady)
        return;
    if (mode == null)
        mode = RelativeSourceMode.TemplatedParent;
    this.SetMode(mode);
}
Nullstone.Create(RelativeSource, "RelativeSource");

RelativeSource.prototype.GetMode = function () {
    return this._Mode;
};
RelativeSource.prototype.SetMode = function (/* RelativeSourceMode */value) {
    this._Mode = value;
};

//#endregion