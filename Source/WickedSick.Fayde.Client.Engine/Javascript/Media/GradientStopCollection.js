/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="GradientStop.js"/>

//#region GradientStopCollection

function GradientStopCollection() {
    DependencyObjectCollection.call(this);
}
GradientStopCollection.InheritFrom(DependencyObjectCollection);

GradientStopCollection.prototype.IsElementType = function (value) {
    return value instanceof GradientStop;
};

//#endregion
