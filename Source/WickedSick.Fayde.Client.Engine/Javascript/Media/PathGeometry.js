/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="PathFigureCollection.js"/>

//#region PathGeometry
var PathGeometry = Nullstone.Create("PathGeometry", Geometry);

PathGeometry.Instance.Init = function () {
};

//#region Dependency Properties

PathGeometry.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return Number; }, PathGeometry);
PathGeometry.Instance.GetFillRule = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(PathGeometry.FillRuleProperty);
};
PathGeometry.Instance.SetFillRule = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(PathGeometry.FillRuleProperty, value);
};

PathGeometry.FiguresProperty = DependencyProperty.RegisterFull("Figures", function () { return PathFigureCollection; }, PathGeometry, null, { GetValue: function () { return new PathFigureCollection(); } });
PathGeometry.Instance.GetFigures = function () {
    ///<returns type="PathFigureCollection"></returns>
    return this.GetValue(PathGeometry.FiguresProperty);
};
PathGeometry.Instance.SetFigures = function (value) {
    ///<param name="value" type="PathFigureCollection"></param>
    this.SetValue(PathGeometry.FiguresProperty, value);
};

//#endregion

//#region Annotations

PathGeometry.Annotations = {
    ContentProperty: PathGeometry.FiguresProperty
};

//#endregion

Nullstone.FinishCreate(PathGeometry);
//#endregion