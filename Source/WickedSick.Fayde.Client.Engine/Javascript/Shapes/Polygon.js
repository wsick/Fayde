/// <reference path="Shape.js"/>
/// CODE
/// <reference path="PointCollection.js"/>

//#region Polygon
var Polygon = Nullstone.Create("Polygon", Shape);

Polygon.Instance.Init = function () {
    this.Init$Shape();
};

//#region Dependency Properties

Polygon.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, Polygon, FillRule.EvenOdd);
Polygon.PointsProperty = DependencyProperty.RegisterFull("Points", function () { return PointCollection; }, Polygon, undefined, { GetValue: function () { return new PointCollection(); } });

Nullstone.AutoProperties(Polygon, [
    Polygon.FillRuleProperty
]);
Nullstone.AutoProperty(Polygon, Polygon.PointsProperty, function (value) {
    if (value instanceof PointCollection)
        return value;
    if (typeof value === "string")
        return Fayde.TypeConverter.PointCollectionFromString(value);
    return value;
});

//#endregion

Polygon.Instance._BuildPath = function () {
    var points = this.Points;
    var count;
    if (points == null || (count = points.GetCount()) < 2) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return;
    }

    this.SetShapeFlags(ShapeFlags.Normal);

    var path = new RawPath();
    if (count === 2) {
        var thickness = this.StrokeThickness;
        var p1 = points.GetValueAt(0);
        var p2 = points.GetValueAt(1);
        Polygon._ExtendLine(p1, p2, thickness);
        path.Move(p1.X, p1.Y);
        path.Line(p2.X, p2.Y);
    } else {
        var p = points.GetValueAt(0);
        path.Move(p.X, p.Y);
        for (var i = 1; i < count; i++) {
            p = points.GetValueAt(i);
            path.Line(p.X, p.Y);
        }
    }
    path.Close();
    this._Path = path;
};

Polygon._ExtendLine = function (p1, p2, thickness) {
    /// <param name="p1" type="Point"></param>
    /// <param name="p2" type="Point"></param>
    var t5 = thickness * 5.0;
    var dx = p1.X - p2.X;
    var dy = p1.Y - p2.Y;

    if (dy === 0.0) {
        t5 -= thickness / 2.0;
        if (dx > 0.0) {
            p1.X += t5;
            p2.X -= t5;
        } else {
            p1.X -= t5;
            p2.X += t5;
        }
    } else if (dx === 0.0) {
        t5 -= thickness / 2.0;
        if (dy > 0.0) {
            p1.Y += t5;
            p2.Y -= t5;
        } else {
            p1.Y -= t5;
            p2.Y += t5;
        }
    } else {
        var angle = Math.atan2(dy, dx);
        var ax = Math.abs(Math.sin(angle) * t5);
        if (dx > 0.0) {
            p1.X += ax;
            p2.X -= ax;
        } else {
            p1.X -= ax;
            p2.X += ax;
        }
        var ay = Math.abs(Math.sin(Math.PI / 2 - angle)) * t5;
        if (dy > 0.0) {
            p1.Y += ay;
            p2.Y -= ay;
        } else {
            p1.Y -= ay;
            p2.Y += ay;
        }
    }
};

Polygon.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Polygon) {
        this._OnPropertyChanged$Shape(args, error);
        return;
    }

    if (args.Property._ID === Polygon.PointsProperty._ID) {
        var oldPoints = args.OldValue;
        var newPoints = args.NewValue;

        if (newPoints != null && oldPoints != null) {
            var nc = newPoints.GetCount();
            var oc = oldPoints.GetCount();
            if (nc === oc) {
                var equal = true;
                var np;
                var op;
                for (var i = 0; i < nc; i++) {
                    np = newPoints.GetValueAt(i);
                    op = oldPoints.GetValueAt(i);
                    if (true) {
                        equal = false;
                        break;
                    }
                }
                if (equal) {
                    this.PropertyChanged.Raise(this, args);
                    return;
                }
            }
        }

        this._InvalidateNaturalBounds();
    }

    this._Invalidate();
    this.PropertyChanged.Raise(this, args);
};
Polygon.Instance._OnCollectionChanged = function (sender, args) {
    this._OnCollectionChanged$Shape(sender, args);
    this._InvalidateNaturalBounds();
};
Polygon.Instance._OnCollectionItemChanged = function (sender, args) {
    this._OnCollectionItemChanged$Shape(sender, args);
    this._InvalidateNaturalBounds();
};

Nullstone.FinishCreate(Polygon);
//#endregion