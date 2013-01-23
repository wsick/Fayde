/// <reference path="Shape.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="PointCollection.js"/>

(function (namespace) {
    var Polyline = Nullstone.Create("Polyline", Shape);

    Polyline.Instance.Init = function () {
        this.Init$Shape();
    };

    //#region Properties

    Polyline.FillRuleProperty = DependencyProperty.RegisterCore("FillRule", function () { return new Enum(FillRule); }, Polyline, FillRule.EvenOdd);
    Polyline.PointsProperty = DependencyProperty.RegisterFull("Points", function () { return PointCollection; }, Polyline, undefined, undefined, { GetValue: function () { return new PointCollection(); } });

    Nullstone.AutoProperties(Polyline, [
        Polyline.FillRuleProperty
    ]);
    Nullstone.AutoProperty(Polyline, Polyline.PointsProperty, function (value) {
        if (value instanceof PointCollection)
            return value;
        if (typeof value === "string")
            return Fayde.TypeConverter.PointCollectionFromString(value);
        return value;
    });

    //#endregion

    Polyline.Instance._BuildPath = function () {
        var points = this.Points;
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

        this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
        this._Invalidate();
        this.PropertyChanged.Raise(this, args);
    };
    Polyline.Instance._OnCollectionChanged = function (col, args) {
        if (!this._PropertyHasValueNoAutoCreate(Polyline.PointsProperty, col)) {
            this._OnCollectionChanged$Shape(col, args);
            return;
        }
        this._InvalidateNaturalBounds();
        this.InvalidateProperty(Polyline.PointsProperty);
    };
    Polyline.Instance._OnCollectionItemChanged = function (col, obj, args) {
        this._OnCollectionItemChanged$Shape(col, obj, args);
        this._InvalidateNaturalBounds();
        this.InvalidateProperty(Polyline.PointsProperty);
    };

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Polyline.Instance.CreateSvgShape = function () {
            var polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            this.ApplyHtmlFillRule(polyline, this.FillRule);
            return polyline;
        };
        var serializePoints = function (points) {
            var s = "";
            var len = points.GetCount();
            for (var i = 0; i < len; i++) {
                var p = points.GetValueAt(i);
                if (i > 0)
                    s += " ";
                s += p.X.toString() + "," + p.Y.toString();
            }
            return s;
        };
        Polyline.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Polyline) {
                this.ApplyHtmlChange$Shape(change);
                return;
            }

            var shape = this.GetSvgShape();
            if (propd._ID === Polyline.FillRuleProperty._ID) {
                this.ApplyHtmlFillRule(shape, change.NewValue);
            } else if (propd._ID === Polyline.PointsProperty._ID) {
                var coll = change.NewValue;
                if (!coll)
                    coll = this.Points;
                shape.setAttribute("points", serializePoints(coll));
            }
        };
        Polyline.Instance.ApplyHtmlFillRule = function (shape, fillRule) {
            switch (fillRule) {
                case FillRule.EvenOdd:
                    shape.setAttribute("fill-rule", "evenodd");
                    break;
                case FillRule.NonZero:
                    shape.setAttribute("fill-rule", "nonzero");
                    break;
            }

        };
    }
    //#endif

    namespace.Polyline = Nullstone.FinishCreate(Polyline);
})(window);