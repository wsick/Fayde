/// <reference path="Geometry.js"/>
/// CODE
/// <reference path="PathFigureCollection.js"/>
/// <reference path="../Shapes/RawPath.js"/>

//#region PathGeometry
var PathGeometry = Nullstone.Create("PathGeometry", Geometry);

//#region Dependency Properties

PathGeometry.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, PathGeometry);
PathGeometry.FiguresProperty = DependencyProperty.RegisterFull("Figures", function () { return PathFigureCollection; }, PathGeometry, undefined, { GetValue: function () { return new PathFigureCollection(); } });

Nullstone.AutoProperties(PathGeometry, [
    PathGeometry.FillRuleProperty,
    PathGeometry.FiguresProperty
]);

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
        NewValue: this.Figures
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
        NewValue: this.Figures
    });
};

PathGeometry.Instance._Build = function () {
    this.$Path = new RawPath();
    var figures = this.Figures;
    if (figures == null)
        return;

    var count = figures.GetCount();
    for (var i = 0; i < count; i++) {
        var f = figures.GetValueAt(i);
        f._EnsureBuilt();
        RawPath.Merge(this.$Path, f.$Path);
    }
};

Nullstone.FinishCreate(PathGeometry);
//#endregion