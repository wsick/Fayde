/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region PathSegment
var PathSegment = Nullstone.Create("PathSegment", DependencyObject);

PathSegment.Instance.Init = function () {
};

PathSegment.Instance._Append = function (path) {
    AbstractMethod("PathSegment._Append");
};

Nullstone.FinishCreate(PathSegment);
//#endregion