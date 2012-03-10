/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="GradientStop.js"/>

//#region GradientStopCollection
var GradientStopCollection = Nullstone.Create("GradientStopCollection", DependencyObjectCollection);

GradientStopCollection.Instance.IsElementType = function (value) {
    return value instanceof GradientStop;
};

Nullstone.FinishCreate(GradientStopCollection);
//#endregion