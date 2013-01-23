/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="Geometry.js"/>

(function (namespace) {
    var GeometryCollection = Nullstone.Create("GeometryCollection", DependencyObjectCollection);
    GeometryCollection.Instance.IsElementType = function (value) {
        return val instanceof namespace.Geometry;
    };
    namespace.GeometryCollection = Nullstone.FinishCreate(GeometryCollection);
})(Nullstone.Namespace("Fayde.Media"));