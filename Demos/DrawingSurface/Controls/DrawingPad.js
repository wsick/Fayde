/// <reference path="../scripts/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DrawingSurface;
(function (DrawingSurface) {
    var DrawingPad = (function (_super) {
        __extends(DrawingPad, _super);
        function DrawingPad() {
            _super.call(this);
            this._Fingers = [];
        }
        DrawingPad.prototype.OnTouchDown = function (e) {
            var finger = this._Fingers[e.Device.Identifier] = new DrawingFinger(e.Device);
            finger.Attach(this);
            var tp = e.GetTouchPoint(this);
            finger.Start(tp.Position);
        };
        DrawingPad.prototype.OnTouchUp = function (e) {
            var finger = this._Fingers[e.Device.Identifier];
            if (!finger)
                return;
            var tp = e.GetTouchPoint(this);
            finger.End(tp.Position);
        };
        DrawingPad.prototype.OnTouchMove = function (e) {
            var finger = this._Fingers[e.Device.Identifier];
            if (!finger)
                return;
            var tp = e.GetTouchPoint(this);
            finger.Move(tp.Position);
        };
        DrawingPad.prototype.OnTouchEnter = function (e) {
        };
        DrawingPad.prototype.OnTouchLeave = function (e) {
        };
        return DrawingPad;
    })(Fayde.Controls.Canvas);
    DrawingSurface.DrawingPad = DrawingPad;
    Fayde.RegisterType(DrawingPad, {
        Name: "DrawingPad",
        Namespace: "DrawingSurface",
        XmlNamespace: "http://schemas.wsick.com/demos/drawing/controls"
    });

    var DrawingFinger = (function () {
        function DrawingFinger(device) {
            this.Device = device;
            var path = this.Path = new Fayde.Shapes.Path();
            path.Stroke = Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Black);
            path.StrokeThickness = 4.0;
        }
        DrawingFinger.prototype.Attach = function (pad) {
            pad.Children.Add(this.Path);
        };

        DrawingFinger.prototype.Start = function (pos) {
            var path = this.Path;
            var geom = path.Data = new Fayde.Media.PathGeometry();
            var figure = new Fayde.Media.PathFigure();
            figure.StartPoint = pos;
            geom.Figures.Add(figure);
        };
        DrawingFinger.prototype.Move = function (pos) {
            var geom = this.Path.Data;
            var figure = geom.Figures.GetValueAt(0);
            var segment = new Fayde.Media.LineSegment();
            segment.Point = pos;
            figure.Segments.Add(segment);
        };
        DrawingFinger.prototype.End = function (pos) {
            var geom = this.Path.Data;
        };
        return DrawingFinger;
    })();
})(DrawingSurface || (DrawingSurface = {}));
//# sourceMappingURL=DrawingPad.js.map
