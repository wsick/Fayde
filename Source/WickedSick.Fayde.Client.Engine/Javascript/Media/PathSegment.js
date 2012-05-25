/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region PathSegment
var PathSegment = Nullstone.Create("PathSegment", DependencyObject);

PathSegment.Instance._Append = function (path) {
    throw new AbstractMethodException("PathSegment._Append");
};

Nullstone.FinishCreate(PathSegment);
//#endregion