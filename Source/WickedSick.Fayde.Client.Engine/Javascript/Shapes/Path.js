/// <reference path="Shape.js"/>
/// CODE
/// <reference path="../Media/Geometry.js"/>
/// <reference path="../Core/Core.js"/>

(function (namespace) {
    var Path = Nullstone.Create("Path", namespace.Shape);

    //#region Properties

    // Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
    Path.DataProperty = DependencyProperty.RegisterCore("Data", function () { return Fayde.Media.Geometry; }, Path);

    Nullstone.AutoProperty(Path, Path.DataProperty, function (value) {
        if (value instanceof Fayde.Media.Geometry)
            return value;
        if (typeof value === "string")
            return Fayde.TypeConverter.GeometryFromString(value);
        return value;
    });

    //#endregion

    Path.Instance._GetFillRule = function () {
        var geom = this.Data;
        if (geom == null)
            return this._GetFillRule$Shape();
        return geom.FillRule;
    };

    Path.Instance._DrawPath = function (ctx) {
        /// <param name="ctx" type="_RenderContext"></param>
        var geom = this.Data;
        if (geom == null)
            return;
        geom.Draw(ctx);
    };

    Path.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
        /// <param name="logical" type="Boolean"></param>
        /// <param name="matrix" type="Matrix"></param>
        /// <returns type="Rect" />
        var geom = this.Data;
        if (geom == null) {
            this._SetShapeFlags(namespace.ShapeFlags.Empty);
            return new Rect();
        }
        if (logical)
            return geom.GetBounds();

        var thickness = (logical || !this._IsStroked()) ? 0.0 : this.StrokeThickness;
        return geom.GetBounds(thickness);
        return shapeBounds;
    };

    //#region Property Changes

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Path.Instance._OnPropertyChanged = function (args, error) {
            if (args.Property.OwnerType !== Path) {
                this._OnPropertyChanged$Shape(args, error);
                return;
            }

            if (args.Property._ID === Path.DataProperty._ID) {
                this.InvalidateProperty(args.Property, args.OldValue, args.NewValue);
            }
        };
        Path.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd != null && propd._ID === Path.DataProperty._ID) {
                this.InvalidateProperty(propd);
                return;
            }
            this._OnSubPropertyChanged$Shape(propd, sender, args);
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        Path.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd != null && propd._ID === Path.DataProperty._ID) {
                this._InvalidateNaturalBounds();
                return;
            }
            this._OnSubPropertyChanged$Shape(propd, sender, args);
        };
    }
    //#endif

    //#endregion

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        Path.Instance.CreateSvgShape = function () {
            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var data = this.Data;
            if (data)
                path.setAttribute("d", this.Data.Serialize());
            return path;
        };
        Path.Instance.ApplyHtmlChange = function (change) {
            var propd = change.Property;
            if (propd.OwnerType !== Path) {
                this.ApplyHtmlChange$Shape(change);
                return;
            }

            var shape = this.GetSvgShape();
            if (propd._ID === Path.DataProperty._ID) {
                var data = change.NewValue;
                if (!data)
                    data = this.Data;
                shape.setAttribute("d", data.Serialize());
                var svg = this.GetSvg();
                var bounds = data.GetBounds();
                svg.setAttribute("viewBox", bounds.X.toString() + " " + bounds.Y.toString() + " " + bounds.Width.toString() + " " + bounds.Height.toString());
            }
        };
    }
    //#endif

    namespace.Path = Nullstone.FinishCreate(Path);
})(Nullstone.Namespace("Fayde.Shapes"));