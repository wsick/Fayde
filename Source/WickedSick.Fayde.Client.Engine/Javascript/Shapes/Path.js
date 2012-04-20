/// <reference path="Shape.js"/>
/// CODE
/// <reference path="../Media/Geometry.js"/>
/// <reference path="../Core/Core.js"/>

//#region Path
var Path = Nullstone.Create("Path", Shape);

Path.Instance.Init = function () {
    this.Init$Shape();
};

//#region Dependency Properties

// Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
Path.DataProperty = DependencyProperty.RegisterCore("Data", function () { return Geometry; }, Path);
Path.Instance.GetData = function () {
    ///<returns type="Geometry"></returns>
    return this.$GetValue(Path.DataProperty);
};
Path.Instance.SetData = function (value) {
    ///<param name="value" type="Geometry"></param>
    this.SetValue(Path.DataProperty, value);
};
Path.Instance.SetData.Converter = function (value) {
    if (value instanceof Geometry)
        return value;
    if (typeof value === "string")
        return Fayde.TypeConverter.GeometryFromString(value);
    return value;
};

//#endregion

Path.Instance._GetFillRule = function () {
    var geom = this.GetData();
    if (geom == null)
        return this._GetFillRule$Shape();
    return geom.GetFillRule();
};

Path.Instance._DrawPath = function (ctx) {
    /// <param name="ctx" type="_RenderContext"></param>
    var geom = this.GetData();
    if (geom == null)
        return;
    geom.Draw(ctx);
};

Path.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    /// <param name="logical" type="Boolean"></param>
    /// <param name="matrix" type="Matrix"></param>
    /// <returns type="Rect" />
    var geom = this.GetData();
    if (geom == null) {
        this._SetShapeFlags(ShapeFlags.Empty);
        return new Rect();
    }
    if (logical)
        return geom.GetBounds();

    var thickness = (logical || !this._IsStroked()) ? 0.0 : this.GetStrokeThickness();
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

Nullstone.FinishCreate(Path);
//#endregion