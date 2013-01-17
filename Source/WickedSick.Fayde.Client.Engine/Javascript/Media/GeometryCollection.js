/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE

(function (namespace) {
    var GeometryCollection = Nullstone.Create("GeometryCollection", DependencyObjectCollection);

    GeometryCollection.Instance.IsElementType = function (value) {
        return val instanceof Geometry;
    };

    namespace.GeometryCollection = Nullstone.FinishCreate(GeometryCollection);
})(window);