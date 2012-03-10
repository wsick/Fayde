/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="../Primitives/Rect.js"/>
/// CODE

//#region Geometry

function Geometry() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
Nullstone.Extend(Geometry, "Geometry", DependencyObject);

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
