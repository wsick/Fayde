/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Primitives/Rect.js"/>

//#region Geometry
var Geometry = Nullstone.Create("Geometry", DependencyObject);

Geometry.Instance.Init = function () {
    this.Init$DependencyObject();
    this.$Path = null;
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
};

//#region Dependency Properties

Geometry.TransformProperty = DependencyProperty.RegisterCore("Transform", function () { return Transform; }, Geometry);
Geometry.Instance.GetTransform = function () {
    ///<returns type="Transform"></returns>
    return this.$GetValue(Geometry.TransformProperty);
};
Geometry.Instance.SetTransform = function (value) {
    ///<param name="value" type="Transform"></param>
    this.$SetValue(Geometry.TransformProperty, value);
};

//#endregion

Geometry.Instance.Draw = function (ctx) {
    /// <param name="ctx" type="_RenderContext"></param>
    if (this.$Path == null)
        return;

    var transform = this.GetTransform();
    if (transform != null) {
        ctx.Save();
        ctx.Transform(transform);
    }
    this.$Path.Draw(ctx);
    if (transform != null)
        ctx.Restore();
};

Geometry.Instance.GetBounds = function (thickness) {
    var compute = this._LocalBounds.IsEmpty();

    if (this.$Path == null) {
        this._Build();
        compute = true;
    }

    if (compute)
        this._LocalBounds = this.ComputePathBounds(thickness);
    var bounds = this._LocalBounds;

    var transform = this.GetTransform();
    if (transform != null) {
        bounds = transform.TransformBounds(bounds);
    }

    return bounds;
};
Geometry.Instance.ComputePathBounds = function (thickness) {
    this._EnsureBuilt();
    if (this.$Path == null)
        return new Rect();
    return this.$Path.CalculateBounds(thickness);
};
Geometry.Instance._EnsureBuilt = function () {
    if (this.$Path == null)
        this._Build();
};
Geometry.Instance._Build = function () {
};
Geometry.Instance._InvalidateCache = function () {
    this.$Path = null;
    this._LocalBounds = new Rect(0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
};

Geometry.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Geometry
        && args.Property._ID !== PathGeometry.FillRuleProperty
        && args.Property._ID !== GeometryGroup.FillRuleProperty) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    this._InvalidateCache();
    this.PropertyChanged.Raise(this, args);
};
Geometry.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    this.PropertyChanged.Raise(this, {
        Property: propd,
        OldValue: null,
        NewValue: this._GetValue(propd)
    });
    this._OnSubPropertyChanged$DependencyObject();
};

Nullstone.FinishCreate(Geometry);
//#endregion