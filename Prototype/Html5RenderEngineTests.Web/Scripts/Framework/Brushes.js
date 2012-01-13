/// <reference path="DependencyProperty.js"/>
/// <reference path="DependencyObject.js"/>

//#region Brush

Brush.prototype = new DependencyObject;
Brush.prototype.constructor = Brush;
function Brush() {
    DependencyObject.call(this);
};
Brush.GetBaseClass = function () { return DependencyObject; };

Brush.prototype._Translate = function (ctx) {
    AbstractMethod("Brush._Translate()");
};

//#endregion

//#region SolidColorBrush

SolidColorBrush.prototype = new Brush;
SolidColorBrush.prototype.constructor = SolidColorBrush;
function SolidColorBrush(color) {
    Brush.call(this);
    this._Color = color;
}
SolidColorBrush.GetBaseClass = function () { return Brush; };

SolidColorBrush.prototype._Translate = function (ctx) {
    return this._Color.toString();
};

//#endregion

//#region GradientBrush

GradientBrush.prototype = new Brush;
GradientBrush.prototype.constructor = GradientBrush;
function GradientBrush() {
    Brush.call(this);
}
GradientBrush.GetBaseClass = function () { return Brush; };

GradientBrush.GradientStopsProperty = DependencyProperty.Register("GradientStops", GradientBrush, null, { GetValue: function () { return new GradientStopCollection(); } });
GradientBrush.prototype.GetGradientStops = function () {
    return this.GetValue(GradientBrush.GradientStopsProperty);
};
GradientBrush.prototype.SetGradientStops = function (value) {
    this.SetValue(GradientBrush.GradientStopsProperty, value);
};

//#endregion

//#region LinearGradientBrush

LinearGradientBrush.prototype = new GradientBrush;
LinearGradientBrush.prototype.constructor = LinearGradientBrush;
function LinearGradientBrush() {
    GradientBrush.call(this);
}
LinearGradientBrush.GetBaseClass = function () { return GradientBrush; };

//#region DEPENDENCY PROPERTIES

LinearGradientBrush.StartPointProperty = DependencyProperty.Register("StartPoint", LinearGradientBrush);
LinearGradientBrush.prototype.GetStartPoint = function () {
    return this.GetValue(LinearGradientBrush.StartPointProperty);
};
LinearGradientBrush.prototype.SetStartPoint = function (value) {
    this.SetValue(LinearGradientBrush.StartPointProperty, value);
};

LinearGradientBrush.EndPointProperty = DependencyProperty.Register("EndPoint", LinearGradientBrush);
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

RadialGradientBrush.prototype = new GradientBrush;
RadialGradientBrush.prototype.constructor = RadialGradientBrush;
function RadialGradientBrush() {
    GradientBrush.call(this);
}
RadialGradientBrush.GetBaseClass = function () { return GradientBrush; };

//#region DEPENDENCY PROPERTIES

RadialGradientBrush.CenterProperty = DependencyProperty.Register("Center", RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetCenter = function () {
    return this.GetValue(RadialGradientBrush.CenterProperty);
};
RadialGradientBrush.prototype.SetCenter = function (value) {
    this.SetValue(RadialGradientBrush.CenterProperty, value);
};

RadialGradientBrush.GradientOriginProperty = DependencyProperty.Register("GradientOrigin", RadialGradientBrush, new Point(0.5, 0.5));
RadialGradientBrush.prototype.GetGradientOrigin = function () {
    return this.GetValue(RadialGradientBrush.GradientOriginProperty);
};
RadialGradientBrush.prototype.SetGradientoOrigin = function (value) {
    this.SetValue(RadialGradientBrush.GradientOriginProperty, value);
};

RadialGradientBrush.RadiusXProperty = DependencyProperty.Register("RadiusX", RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusX = function () {
    return this.GetValue(RadialGradientBrush.RadiusXProperty);
};
RadialGradientBrush.prototype.SetRadiusX = function (value) {
    this.SetValue(RadialGradientBrush.RadiusXProperty, value);
};

RadialGradientBrush.RadiusYProperty = DependencyProperty.Register("RadiusY", RadialGradientBrush, 0.5);
RadialGradientBrush.prototype.GetRadiusY = function () {
    return this.GetValue(RadialGradientBrush.RadiusYProperty);
};
RadialGradientBrush.prototype.SetRadiusY = function (value) {
    this.SetValue(RadialGradientBrush.RadiusYProperty, value);
};

//#endregion

//#endregion