/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="PathSegment.js"/>

(function (namespace) {
    var PathSegmentCollection = Nullstone.Create("PathSegmentCollection", DependencyObjectCollection);

    PathSegmentCollection.Instance.IsElementType = function (value) {
        return value instanceof PathSegment;
    };

    namespace.PathSegmentCollection = Nullstone.FinishCreate(PathSegmentCollection);
})(window);