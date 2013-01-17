/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE

(function (namespace) {
    var TransformCollection = Nullstone.Create("TransformCollection", DependencyObjectCollection);

    TransformCollection.Instance.Init = function () {
        this.Init$DependencyObjectCollection();
    };

    TransformCollection.Instance.IsElementType = function (value) {
        return value instanceof Transform;
    };

    namespace.TransformCollection = Nullstone.FinishCreate(TransformCollection);
})(window);