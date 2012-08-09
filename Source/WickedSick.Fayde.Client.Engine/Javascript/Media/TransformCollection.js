/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE

//#region TransformCollection
var TransformCollection = Nullstone.Create("TransformCollection", DependencyObjectCollection);

TransformCollection.Instance.Init = function () {
    this.Init$DependencyObjectCollection();
};

TransformCollection.Instance.IsElementType = function (value) {
    return value instanceof Transform;
};

Nullstone.FinishCreate(TransformCollection);
//#endregion