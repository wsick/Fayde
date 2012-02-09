/// <reference path="RefObject.js"/>
/// CODE

var RelativeSourceMode = {
    TemplatedParent: 1,
    Self: 2
};

//#region RelativeSource

function RelativeSource(mode) {
    RefObject.call(this);

    if (mode == null)
        mode = RelativeSourceMode.TemplatedParent;
    this.SetMode(mode);
}
RelativeSource.InheritFrom(RefObject);

RelativeSource.prototype.GetMode = function () {
    return this._Mode;
};
RelativeSource.prototype.SetMode = function (/* RelativeSourceMode */value) {
    this._Mode = value;
};

//#endregion