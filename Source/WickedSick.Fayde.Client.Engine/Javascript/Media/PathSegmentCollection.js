/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="PathSegment.js"/>

(function (namespace) {
    var PathSegmentCollection = Nullstone.Create("PathSegmentCollection", Fayde.DependencyObjectCollection);
    PathSegmentCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.PathSegment;
    };
    namespace.PathSegmentCollection = Nullstone.FinishCreate(PathSegmentCollection);
})(Nullstone.Namespace("Fayde.Media"));