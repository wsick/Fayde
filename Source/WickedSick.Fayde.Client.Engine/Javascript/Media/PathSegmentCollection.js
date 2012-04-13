/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="PathSegment.js"/>

//#region PathSegmentCollection
var PathSegmentCollection = Nullstone.Create("PathSegmentCollection", DependencyObjectCollection);

PathSegmentCollection.Instance.Init = function () {
};

PathSegmentCollection.Instance.IsElementType = function (value) {
    return value instanceof PathSegment;
};

Nullstone.FinishCreate(PathSegmentCollection);
//#endregion