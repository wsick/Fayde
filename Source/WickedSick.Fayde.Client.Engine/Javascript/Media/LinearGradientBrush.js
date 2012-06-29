/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="GradientBrush.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region LinearGradientBrush
var LinearGradientBrush = Nullstone.Create("LinearGradientBrush", GradientBrush);

//#region Dependency Properties

LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterFull("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterFull("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));

Nullstone.AutoProperties(LinearGradientBrush, [
    LinearGradientBrush.StartPointProperty,
    LinearGradientBrush.EndPointProperty
]);

//#endregion

LinearGradientBrush.Instance.SetupBrush = function (ctx, bounds) {
    var transform = this._GetMappingModeTransform(bounds);
    var start = new Point();
    var end = new Point();
    Matrix.TransformPoint(start, transform, this.StartPoint);
    Matrix.TransformPoint(end, transform, this.EndPoint);

    var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
    var stops = this.GradientStops;
    var count = stops.GetCount();
    for (var i = 0; i < count; i++) {
        var stop = stops.GetValueAt(i);
        grd.addColorStop(stop.Offset, stop.Color.toString());
    }
    this._Brush = grd;
};

LinearGradientBrush.Instance.toString = function () {
    var stops = this.GradientStops;
    var count = stops.GetCount();
    var ser = [];
    for (var i = 0; i < count; i++) {
        ser.push(stops.GetValueAt(i).toString());
    }
    return "LinearGradientBrush(" + this.StartPoint.toString() + " --> " + this.EndPoint.toString() + " [" + ser.toString() + "])";
};

Nullstone.FinishCreate(LinearGradientBrush);
//#endregion