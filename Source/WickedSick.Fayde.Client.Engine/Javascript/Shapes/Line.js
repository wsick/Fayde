/// <reference path="Shape.js"/>
/// CODE
/// <reference path="RawPath.js"/>

(function (namespace) {
    var Line = Nullstone.Create("Line", namespace.Shape);

    //#region Properties

    Line.X1Property = DependencyProperty.Register("X1", function () { return Number; }, Line, 0);
    Line.Y1Property = DependencyProperty.Register("Y1", function () { return Number; }, Line, 0);
    Line.X2Property = DependencyProperty.Register("X2", function () { return Number; }, Line, 0);
    Line.Y2Property = DependencyProperty.Register("Y2", function () { return Number; }, Line, 0);

    Nullstone.AutoProperties(Line, [
        Line.X1Property,
        Line.Y1Property,
        Line.X2Property,
        Line.Y2Property
    ]);

    //#endregion

    Line.Instance._DrawPath = function (ctx) {
        if (this._Path == null)
            this._BuildPath();
        this._DrawPath$Shape(ctx);
    };
    Line.Instance._BuildPath = function () {
        this._SetShapeFlags(namespace.ShapeFlags.Normal);

        this._Path = new Fayde.Shapes.RawPath();

        var x1 = this.X1;
        var y1 = this.Y1;
        var x2 = this.X2;
        var y2 = this.Y2;

        this._Path.Move(x1, y1);
        this._Path.Line(x2, y2);
    };

    Line.Instance._ComputeShapeBounds = function (logical) {
        var shapeBounds = new rect();

        var thickness = 0;
        if (!logical)
            thickness = this.StrokeThickness;

        if (thickness <= 0.0 && !logical)
            return shapeBounds;

        var x1 = this.X1;
        var y1 = this.Y1;
        var x2 = this.X2;
        var y2 = this.Y2;

        rect.set(shapeBounds,
            Math.min(x1, x2),
            Math.min(y1, y2),
            Math.abs(x2 - x1),
            Math.abs(y2 - y1)
        );
        //TODO: Handle startcap, endcap, thickness

        return shapeBounds;
    };

    //#region Property Changes

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Line.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Line) {
                this._OnPropertyChanged$Shape(args, error);
                return;
            }

            if (args.Property._ID === Line.X1Property._ID
                || args.Property._ID === Line.X2Property._ID
                || args.Property._ID === Line.Y1Property._ID
                || args.Property._ID === Line.Y2Property._ID) {
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            }

            this.PropertyChanged.Raise(this, args);
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        Line.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Line) {
                this._OnPropertyChanged$Shape(args, error);
                return;
            }

            if (args.Property._ID === Line.X1Property._ID
                || args.Property._ID === Line.X2Property._ID
                || args.Property._ID === Line.Y1Property._ID
                || args.Property._ID === Line.Y2Property._ID) {
                this._InvalidateNaturalBounds();
            }

            this.PropertyChanged.Raise(this, args);
        };
    }
    //#endif

    //#endregion

    //#if !ENABLE_CANVAS  
    if (!Fayde.IsCanvasEnabled) {
        Line.Instance.CreateSvgShape = function () {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            return line;
        };
        Line.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Line) {
                this.ApplyHtmlChange$Shape(change);
                return;
            }

            var shape = this.GetSvgShape();
            if (propd._ID === Line.X1Property._ID) {
                shape.setAttribute("x1", change.NewValue.toString());
            } else if (propd._ID === Line.X2Property._ID) {
                shape.setAttribute("x2", change.NewValue.toString());
            } else if (propd._ID === Line.Y1Property._ID) {
                shape.setAttribute("y1", change.NewValue.toString());
            } else if (propd._ID === Line.Y2Property._ID) {
                shape.setAttribute("y2", change.NewValue.toString());
            }
        };
    }
    //#endif

    namespace.Line = Nullstone.FinishCreate(Line);
})(Nullstone.Namespace("Fayde.Shapes"));
