/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// <reference path="GradientStop.js"/>
/// CODE
/// <reference path="Enums.js"/>

(function (namespace) {
    var GradientBrush = Nullstone.Create("GradientBrush", namespace.Brush);

    //#region Properties

    GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return namespace.GradientStopCollection; }, GradientBrush, undefined, undefined, { GetValue: function () { return new namespace.GradientStopCollection(); } });
    GradientBrush.MappingModeProperty = DependencyProperty.Register("MappingMode", function () { return new Enum(namespace.BrushMappingMode); }, GradientBrush, namespace.BrushMappingMode.RelativeToBoundingBox);
    GradientBrush.SpreadMethodProperty = DependencyProperty.Register("SpreadMethod", function () { return new Enum(namespace.GradientSpreadMethod); }, GradientBrush, namespace.GradientSpreadMethod.Pad);

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
            case namespace.GradientSpreadMethod.Pad:
            default:
                return this._CreatePad(ctx, bounds);
            case namespace.GradientSpreadMethod.Repeat:
                return this._CreateRepeat(ctx, bounds);
            case namespace.GradientSpreadMethod.Reflect:
                return this._CreateReflect(ctx, bounds);
        }
    };
    GradientBrush.Instance._CreatePad = function (ctx, data, bounds) { };
    GradientBrush.Instance._CreateRepeat = function (ctx, data, bounds) { };
    GradientBrush.Instance._CreateReflect = function (ctx, data, bounds) { };

    GradientBrush.Instance._GetMappingModeTransform = function (bounds) {
        /// <param name="bounds" type="rect"></param>
        /// <returns type="Matrix" />
        if (this.MappingMode === namespace.BrushMappingMode.Absolute)
            return mat3.identity();
        if (!bounds)
            return mat3.identity();
        return mat3.createScale(bounds.Width, bounds.Height);
    };

    function createStop(grdStop) {
        var xmlStop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        xmlStop.setAttribute("offset", "" + (grdStop.Offset * 100.0) + "%");
        var stopColor = grdStop.Color;
        if (!stopColor) {
            stopColor = "#000000";
            xmlStop.setAttribute("stop-opacity", "1.0");
        } else {
            xmlStop.setAttribute("stop-opacity", stopColor.A.toString());
            stopColor = stopColor.ToHexStringNoAlpha();
        }
        xmlStop.setAttribute("stop-color", stopColor);
        return xmlStop;
    };
    GradientBrush.Instance.Initialize = function (svgBrush) {
        var method = this.SpreadMethod;
        switch (method) {
            case namespace.GradientSpreadMethod.Pad:
                svgBrush.spreadMethod = "pad";
                break;
            case namespace.GradientSpreadMethod.Reflect:
                svgBrush.spreadMethod = "reflect";
                break;
            case namespace.GradientSpreadMethod.Repeat:
                svgBrush.spreadMethod = "repeat";
                break;
        }

        var stops = this.GradientStops;
        var count = stops.GetCount();
        for (var i = 0; i < count; i++) {
            var stop = stops.GetValueAt(i);
            var xmlStop = createStop(stop);
            svgBrush.appendChild(xmlStop);
        }
    };

    namespace.GradientBrush = Nullstone.FinishCreate(GradientBrush);
})(Nullstone.Namespace("Fayde.Media"));
