/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="GradientBrush.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="GradientMetrics.js"/>

//#region LinearGradientBrush
var LinearGradientBrush = Nullstone.Create("LinearGradientBrush", GradientBrush);

//#region Properties

LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterFull("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterFull("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));

Nullstone.AutoProperties(LinearGradientBrush, [
    LinearGradientBrush.StartPointProperty,
    LinearGradientBrush.EndPointProperty
]);

//#endregion

LinearGradientBrush.Instance._CreatePad = function (ctx, bounds) {
    var data = this._GetPointData(bounds);
    var start = data.start;
    var end = data.end;
    var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
    var stops = this.GradientStops;
    var count = stops.GetCount();
    for (var i = 0; i < count; i++) {
        var stop = stops.GetValueAt(i);
        grd.addColorStop(stop.Offset, stop.Color.toString());
    }
    return grd;
};
LinearGradientBrush.Instance._CreateRepeat = function (ctx, bounds) {
    var data = this._GetPointData(bounds);
    var start = data.start;
    var end = data.end;
    var dir = { x: end.X - start.X, y: end.Y - start.Y };
    var first = { x: start.X, y: start.Y };
    var last = { x: end.X, y: end.Y };

    GradientMetrics.Calculate(dir, first, last, bounds);

    var grd = ctx.createLinearGradient(first.x, first.y, last.x, last.y);
    var stops = this.GradientStops;
    var count = stops.GetCount();
    var steps = (last.x - first.x) / dir.x;
    var curOffset = 0.0;
    for (var i = 0; i < steps; i++) {
        for (var j = 0; j < count; j++) {
            var stop = stops.GetValueAt(j);
            grd.addColorStop(curOffset + (stop.Offset / steps), stop.Color.toString());
        }
        curOffset += (1.0 / steps);
    }
    return grd;
};
LinearGradientBrush.Instance._CreateReflect = function (ctx,bounds) {
    var data = this._GetPointData(bounds);
    var start = data.start;
    var end = data.end;
};

LinearGradientBrush.Instance._GetPointData = function (bounds) {
    var transform = this._GetMappingModeTransform(bounds);
    var start = new Point();
    var end = new Point();
    Matrix.TransformPoint(start, transform, this.StartPoint);
    Matrix.TransformPoint(end, transform, this.EndPoint);
    
    return {
        start: start,
        end: end
    };
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