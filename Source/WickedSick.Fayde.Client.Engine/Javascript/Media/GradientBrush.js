/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="Enums.js"/>

(function (namespace) {
    var GradientBrush = Nullstone.Create("GradientBrush", Brush);

    //#region Properties

    GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, undefined, undefined, { GetValue: function () { return new GradientStopCollection(); } });
    GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () { return new Enum(BrushMappingMode); }, GradientBrush, BrushMappingMode.RelativeToBoundingBox);
    GradientBrush.SpreadMethodProperty = DependencyProperty.Register("SpreadMethod", function () { return new Enum(GradientSpreadMethod); }, GradientBrush, GradientSpreadMethod.Pad);

    Nullstone.AutoProperties(GradientBrush, [
        GradientBrush.GradientStopsProperty,
        GradientBrush.MappingModeProperty,
        GradientBrush.SpreadMethodProperty
    ]);

    //#endregion

    //#region Annotations

    GradientBrush.Annotations = {
        ContentProperty: GradientBrush.GradientStopsProperty
    };

    //#endregion

    GradientBrush.Instance.CreateBrush = function (ctx, bounds) {
        var spread = this.SpreadMethod;
        switch (spread) {
            case GradientSpreadMethod.Pad:
            default:
                return this._CreatePad(ctx, bounds);
            case GradientSpreadMethod.Repeat:
                return this._CreateRepeat(ctx, bounds);
            case GradientSpreadMethod.Reflect:
                return this._CreateReflect(ctx, bounds);
        }
    };
    GradientBrush.Instance._CreatePad = function (ctx, data, bounds) { };
    GradientBrush.Instance._CreateRepeat = function (ctx, data, bounds) { };
    GradientBrush.Instance._CreateReflect = function (ctx, data, bounds) { };

    GradientBrush.Instance._GetMappingModeTransform = function (bounds) {
        /// <param name="bounds" type="Rect"></param>
        /// <returns type="Matrix" />
        if (this.MappingMode === BrushMappingMode.Absolute)
            return mat3.identity();
        if (!bounds)
            return mat3.identity();
        return mat3.createScale(bounds.Width, bounds.Height);
    };

    namespace.GradientBrush = Nullstone.FinishCreate(GradientBrush);
})(window);