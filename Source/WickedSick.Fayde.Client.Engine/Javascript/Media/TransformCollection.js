/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE

(function (namespace) {
    var TransformCollection = Nullstone.Create("TransformCollection", DependencyObjectCollection);

    TransformCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.Transform;
    };

    namespace.TransformCollection = Nullstone.FinishCreate(TransformCollection);
})(Nullstone.Namespace("Fayde.Media"));