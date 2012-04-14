/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE

//#region GeometryCollection
var GeometryCollection = Nullstone.Create("GeometryCollection", DependencyObjectCollection);

GeometryCollection.Instance.IsElementType = function (value) {
    return val instanceof Geometry;
};

Nullstone.FinishCreate(GeometryCollection);
//#endregion