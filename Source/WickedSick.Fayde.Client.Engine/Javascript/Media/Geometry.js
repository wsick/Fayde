/// <reference path="DependencyObject.js"/>
/// <reference path="../Primitives/Rect.js"/>
/// CODE

//#region Geometry

function Geometry() {
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
Geometry.InheritFrom(DependencyObject);

Geometry.prototype.GetBounds = function () {
    var compute = this._LocalBounds.IsEmpty();

    //TODO: Path build

    if (compute)
        this._LocalBounds = this.ComputePathBounds();
    var bounds = this._LocalBounds;

    //TODO: Transform

    return bounds;
};
Geometry.prototype.ComputePathBounds = function () {
};

//#endregion