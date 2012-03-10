/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="GradientStop.js"/>

//#region GradientStopCollection

function GradientStopCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(GradientStopCollection, "GradientStopCollection", DependencyObjectCollection);

GradientStopCollection.prototype.IsElementType = function (value) {
    return value instanceof GradientStop;
};

//#endregion
