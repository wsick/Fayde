/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="PathFigureCollection.js"/>
/// <reference path="../Shapes/RawPath.js"/>

//#region PathGeometry
var PathGeometry = Nullstone.Create("PathGeometry", Geometry);

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

PathGeometry.prototype._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathGeometry.FiguresProperty, sender)) {
        this._OnCollectionChanged$Geometry(sender, args);
        return;
    }
    this._InvalidateCache();
    this.PropertyChanged.Raise(this, {
        Property: PathGeometry.FiguresProperty,
        OldValue: null,
        NewValue: this.GetFigures()
    });
};
PathGeometry.prototype._OnCollectionItemChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(PathGeometry.FiguresProperty, sender)) {
        this._OnCollectionItemChanged$Geometry(sender, args);
        return;
    }
    this._InvalidateCache();
    this.PropertyChanged.Raise(this, {
        Property: PathGeometry.FiguresProperty,
        OldValue: null,
        NewValue: this.GetFigures()
    });
};

PathGeometry.Instance._Build = function () {
    this.$Path = new RawPath();
    var figures = this.GetFigures();
    if (figures == null)
        return;

    var count = figures.GetCount();
    var f;
    for (var i = 0; i < count; i++) {
        f = figures.GetValueAt(i);
        f._EnsureBuilt();
        RawPath.Merge(this.$Path, f.$Path);
    }
};

Nullstone.FinishCreate(PathGeometry);
//#endregion