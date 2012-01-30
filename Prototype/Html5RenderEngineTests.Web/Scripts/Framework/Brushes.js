/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="Collections.js"/>
/// <reference path="Primitives.js"/>

//#region Brush

function Brush() {
    DependencyObject.call(this);
};
Brush.InheritFrom(DependencyObject);

Brush.prototype._Translate = function (ctx) {
    AbstractMethod("Brush._Translate()");
};

//#endregion

//#region SolidColorBrush

function SolidColorBrush(color) {
    Brush.call(this);
    this._Color = color;
}
SolidColorBrush.InheritFrom(Brush);

SolidColorBrush.prototype._Translate = function (ctx) {
    return this._Color.toString();
};

//#endregion

//#region GradientBrush

function GradientBrush() {
    Brush.call(this);
}
GradientBrush.InheritFrom(Brush);

//#region DEPENDENCY PROPERTIES

GradientBrush.GradientStopsProperty = DependencyProperty.RegisterFull("GradientStops", function () { return GradientStopCollection; }, GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.prototype.GetGradientStops = function () {
    return this.GetValue(GradientBrush.GradientStopsProperty);
};
GradientBrush.prototype.SetGradientStops = function (value) {
    this.SetValue(GradientBrush.GradientStopsProperty, value);
};

//#endregion

//#endregion

//#region LinearGradientBrush

function LinearGradientBrush() {
    GradientBrush.call(this);
}
LinearGradientBrush.InheritFrom(GradientBrush);

//#region DEPENDENCY PROPERTIES

LinearGradientBrush.StartPointProperty = DependencyProperty.RegisterFull("StartPoint", function () { return Point; }, LinearGradientBrush, new Point());
LinearGradientBrush.prototype.GetStartPoint = function () {
    return this.GetValue(LinearGradientBrush.StartPointProperty);
};
LinearGradientBrush.prototype.SetStartPoint = function (value) {
    this.SetValue(LinearGradientBrush.StartPointProperty, value);
};

LinearGradientBrush.EndPointProperty = DependencyProperty.RegisterFull("EndPoint", function () { return Point; }, LinearGradientBrush, new Point(1, 1));
LinearGradientBrush.prototype.GetEndPoint = function () {
    return this.GetValue(LinearGradientBrush.EndPointProperty);
};
LinearGradientBrush.prototype.SetEndPoint = function (value) {
    this.SetValue(LinearGradientBrush.EndPointProperty, value);
};

//#endregion

LinearGradientBrush.prototype._Translate = function (ctx, bounds) {
    var transform = new Matrix();
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

//#endregion

//#region RadialGradientBrush

function RadialGradientBrush() {
    GradientBrush.call(this);
}
RadialGradientBrush.InheritFrom(GradientBrush);

//#region DEPENDENCY PROPERTIES

RadialGradientBrush.CenterProperty = DependencyProperty.RegisterFull("Center", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetCenter = function () {
    return this.GetValue(RadialGradientBrush.CenterProperty);
};
RadialGradientBrush.prototype.SetCenter = function (value) {
    this.SetValue(RadialGradientBrush.CenterProperty, value);
};

RadialGradientBrush.GradientOriginProperty = DependencyProperty.RegisterFull("GradientOrigin", function () { return Point; }, RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetGradientOrigin = function () {
    return this.GetValue(RadialGradientBrush.GradientOriginProperty);
};
RadialGradientBrush.prototype.SetGradientoOrigin = function (value) {
    this.SetValue(RadialGradientBrush.GradientOriginProperty, value);
};

RadialGradientBrush.RadiusXProperty = DependencyProperty.RegisterFull("RadiusX", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusX = function () {
    return this.GetValue(RadialGradientBrush.RadiusXProperty);
};
RadialGradientBrush.prototype.SetRadiusX = function (value) {
    this.SetValue(RadialGradientBrush.RadiusXProperty, value);
};

RadialGradientBrush.RadiusYProperty = DependencyProperty.RegisterFull("RadiusY", function () { return Number; }, RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusY = function () {
    return this.GetValue(RadialGradientBrush.RadiusYProperty);
};
RadialGradientBrush.prototype.SetRadiusY = function (value) {
    this.SetValue(RadialGradientBrush.RadiusYProperty, value);
};

//#endregion

//#endregion