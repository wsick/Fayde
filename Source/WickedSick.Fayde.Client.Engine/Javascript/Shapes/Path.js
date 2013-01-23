/// <reference path="Shape.js"/>
/// CODE
/// <reference path="../Media/Geometry.js"/>
/// <reference path="../Core/Core.js"/>

(function (namespace) {
    var Path = Nullstone.Create("Path", Shape);

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
            this._SetShapeFlags(ShapeFlags.Empty);
            return new Rect();
        }
        if (logical)
            return geom.GetBounds();

        var thickness = (logical || !this._IsStroked()) ? 0.0 : this.StrokeThickness;
        return geom.GetBounds(thickness);
        return shapeBounds;
    };

    Path.Instance._OnPropertyChanged = function (args, error) {
        if (args.Property.OwnerType !== Path) {
            this._OnPropertyChanged$Shape(args, error);
            return;
        }
    };
    Path.Instance._OnSubPropertyChanged = function (propd, sender, args) {
        if (propd != null && propd._ID === Path.DataProperty._ID) {
            this._InvalidateNaturalBounds();
            return;
        }
        this._OnSubPropertyChanged$Shape(propd, sender, args);
    };

    namespace.Path = Nullstone.FinishCreate(Path);
})(window);