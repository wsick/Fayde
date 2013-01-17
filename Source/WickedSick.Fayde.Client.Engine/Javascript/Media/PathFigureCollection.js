/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="PathFigure.js"/>

(function (namespace) {
    var PathFigureCollection = Nullstone.Create("PathFigureCollection", DependencyObjectCollection);

    PathFigureCollection.Instance.IsElementType = function (value) {
        return value instanceof PathFigure;
    };

    namespace.PathFigureCollection = Nullstone.FinishCreate(PathFigureCollection);
})(window);