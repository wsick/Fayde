/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="GradientBrush.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region LinearGradientBrush
var LinearGradientBrush = Nullstone.Create("LinearGradientBrush", GradientBrush);

//#region DEPENDENCY PROPERTIES

LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterFull("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
LinearGradientBrush.Instance.GetStartPoint = function () {
    /// <returns type="Point" />
    return this.GetValue(LinearGradientBrush.StartPointProperty);
};
LinearGradientBrush.Instance.SetStartPoint = function (value) {
    /// <param name="value" type="Point"></param>
    this.SetValue(LinearGradientBrush.StartPointProperty, value);
};

LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterFull("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));
LinearGradientBrush.Instance.GetEndPoint = function () {
    /// <returns type="Point" />
    return this.GetValue(LinearGradientBrush.EndPointProperty);
};
LinearGradientBrush.Instance.SetEndPoint = function (value) {
    /// <param name="value" type="Point"></param>
    this.SetValue(LinearGradientBrush.EndPointProperty, value);
};

//#endregion

LinearGradientBrush.Instance._Translate = function (ctx, bounds) {
    /// <param name="ctx" type="CanvasRenderingContext2D">HTML5 Canvas Context</param>
    /// <param name="bounds" type="Rect"></param>
    /// <returns type="CanvasGradient" />
    var transform = this._GetMappingModeTransform(bounds);
    var start = this.GetStartPoint().Apply(transform);
    var end = this.GetEndPoint().Apply(transform);

    var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
    var stops = this.GetGradientStops();
    for (var i = 0; i < stops.GetCount(); i++) {
        var stop = stops.GetValueAt(i);
        grd.addColorStop(stop.GetOffset(), stop.GetColor()._Translate());
    }
    return grd;
};

Nullstone.FinishCreate(LinearGradientBrush);
//#endregion