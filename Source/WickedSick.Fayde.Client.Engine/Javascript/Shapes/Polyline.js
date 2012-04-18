/// <reference path="Shape.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="PointCollection.js"/>

//#region Polyline
var Polyline = Nullstone.Create("Polyline", Shape);

Polyline.Instance.Init = function () {
    this.Init$Shape();
};

//#region Dependency Properties

Polyline.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return Number; }, Polyline, FillRule.EvenOdd);
Polyline.Instance.GetFillRule = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(Polyline.FillRuleProperty);
};
Polyline.Instance.SetFillRule = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(Polyline.FillRuleProperty, value);
};

Polyline.PointsProperty = DependencyProperty.RegisterFull("Points", function () { return PointCollection; }, Polyline, null, { GetValue: function () { return new PointCollection(); } });
Polyline.Instance.GetPoints = function () {
    ///<returns type="PointCollection"></returns>
    return this.GetValue(Polyline.PointsProperty);
};
Polyline.Instance.SetPoints = function (value) {
    ///<param name="value" type="PointCollection"></param>
    this.SetValue(Polyline.PointsProperty, value);
};

//#endregion

Polyline.Instance._BuildPath = function () {
    var points = this.GetPoints();
    var count;
    if (points == null || (count = points.GetCount()) < 2) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return;
    }

    this._SetShapeFlags(ShapeFlags.Normal);

    this._Path = new RawPath();
    var p = points.GetValueAt(0);
    this._Path.Move(p.X, p.Y);

    for (var i = 1; i < count; i++) {
        p = points.GetValueAt(i);
        this._Path.Line(p.X, p.Y);
    }
};

Polyline.Instance._CanFill = function () { return true; };

Polyline.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Polyline) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }

    if (args.Property._ID === Polyline.PointsProperty._ID) {
        this._InvalidateNaturalBounds();
    }

    this._Invalidate();
    this.PropertyChanged.Raise(this, args);
};
Polyline.Instance._OnCollectionChanged = function (sender, args) {
    if (!this._PropertyHasValueNoAutoCreate(Polyline.PointsProperty, sender)) {
        this._OnCollectionChanged$Shape(sender, args);
        return;
    }
    this._InvalidateNaturalBounds();
};
Polyline.Instance._OnCollectionItemChanged = function (sender, args) {
    this._OnCollectionItemChanged$Shape(sender, args);
    this._InvalidateNaturalBounds();
};

Nullstone.FinishCreate(Polyline);
//#endregion