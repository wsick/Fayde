/// <reference path="../../Core/DependencyObject.js"/>
/// CODE

//#region KeySpline
var KeySpline = Nullstone.Create("KeySpline", DependencyObject);

//#region Properties

Nullstone.AutoProperties(KeySpline, [
    "ControlPoint1",
    "ControlPoint2"
]);

//#endregion

Nullstone.FinishCreate(KeySpline);
//#endregion