/// <reference path="../Core/DependencyObject.js"/>
/// CODE

(function (namespace) {
    var PathSegment = Nullstone.Create("PathSegment", Fayde.DependencyObject);

    PathSegment.Instance._Append = function (path) {
        throw new AbstractMethodException("PathSegment._Append");
    };

    namespace.PathSegment = Nullstone.FinishCreate(PathSegment);
})(Nullstone.Namespace("Fayde.Media"));