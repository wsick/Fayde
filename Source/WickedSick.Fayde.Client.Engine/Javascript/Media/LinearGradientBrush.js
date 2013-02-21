/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="GradientBrush.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="GradientMetrics.js"/>

(function (namespace) {
    var LinearGradientBrush = Nullstone.Create("LinearGradientBrush", namespace.GradientBrush);

    //#region Properties

    LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterCore("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
    LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterCore("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));

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

        namespace.GradientMetrics.Calculate(dir, first, last, bounds);

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
    LinearGradientBrush.Instance._CreateReflect = function (ctx, bounds) {
        var data = this._GetPointData(bounds);
        var start = data.start;
        var end = data.end;
    };
    LinearGradientBrush.Instance.CreateForSvg = function () {
        var lgb = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        var startPoint = this.StartPoint;
        var endPoint = this.EndPoint;
        lgb.setAttribute("x1", (startPoint.X * 100.0).toString() + "%");
        lgb.setAttribute("y1", (startPoint.Y * 100.0).toString() + "%");
        lgb.setAttribute("x2", (endPoint.X * 100.0).toString() + "%");
        lgb.setAttribute("y2", (endPoint.Y * 100.0).toString() + "%");
        this.Initialize(lgb);
        return lgb;
    };

    LinearGradientBrush.Instance._GetPointData = function (bounds) {
        var transform = this._GetMappingModeTransform(bounds);

        var sp = this.StartPoint;
        var ep = this.EndPoint;

        var s = mat3.transformVec2(transform, vec2.createFrom(sp.X, sp.Y));
        var e = mat3.transformVec2(transform, vec2.createFrom(ep.X, ep.Y));

        return {
            start: new Point(s[0], s[1]),
            end: new Point(e[0], e[1])
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

    namespace.LinearGradientBrush = Nullstone.FinishCreate(LinearGradientBrush);
})(Nullstone.Namespace("Fayde.Media"));