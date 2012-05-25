/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region GradientBrush
var GradientBrush = Nullstone.Create("GradientBrush", Brush);

GradientBrush.Instance._GetMappingModeTransform = function (bounds) {
    /// <param name="bounds" type="Rect"></param>
    /// <returns type="Matrix" />
    if (this.MappingMode === BrushMappingMode.Absolute)
        return new Matrix();
    return new Matrix.CreateScale(bounds.Width, bounds.Height);
};

//#region Dependency Properties

GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () { return new Enum(BrushMappingMode); }, GradientBrush, BrushMappingMode.RelativeToBoundingBox);

Nullstone.AutoProperties(GradientBrush, [
    GradientBrush.GradientStopsProperty,
    GradientBrush.MappingModeProperty
]);

//#endregion

//#region Annotations

GradientBrush.Annotations = {
    ContentProperty: GradientBrush.GradientStopsProperty
};

//#endregion

Nullstone.FinishCreate(GradientBrush);
//#endregion