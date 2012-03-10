/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="../Primitives/Rect.js"/>
/// CODE

//#region Geometry
var Geometry = Nullstone.Create("Geometry", DependencyObject);

Geometry.Instance.Init = function () {
    this.Init$DependencyObject();
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
};

Geometry.Instance.GetBounds = function () {
    var compute = this._LocalBounds.IsEmpty();

    //TODO: Path build

    if (compute)
        this._LocalBounds = this.ComputePathBounds();
    var bounds = this._LocalBounds;

    //TODO: Transform

    return bounds;
};
Geometry.Instance.ComputePathBounds = function () {
};

Nullstone.FinishCreate(Geometry);
//#endregion