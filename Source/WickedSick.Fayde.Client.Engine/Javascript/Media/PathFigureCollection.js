/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="PathFigure.js"/>

//#region PathFigureCollection
var PathFigureCollection = Nullstone.Create("PathFigureCollection", DependencyObjectCollection);

PathFigureCollection.Instance.Init = function () {
};

PathFigureCollection.Instance.IsElementType = function (value) {
    return value instanceof PathFigure;
};

Nullstone.FinishCreate(PathFigureCollection);
//#endregion