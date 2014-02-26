/// <reference path="../../../jsbin/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var MouseEventArgs = Fayde.Input.MouseEventArgs;
    var TouchEventArgs = Fayde.Input.TouchEventArgs;

    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            _super.call(this);
            this.Loaded.Subscribe(this._Load, this);
        }
        Map.prototype._Load = function (sender, e) {
            var canvas = this.RootVisual;
            var enumerator = canvas.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var cur = enumerator.Current;
                cur.MouseEnter.Subscribe(this._MouseEnter, this);
                cur.MouseLeave.Subscribe(this._MouseLeave, this);
                cur.TouchDown.Subscribe(this._TouchDown, this);
                cur.TouchUp.Subscribe(this._TouchUp, this);
                cur.TouchEnter.Subscribe(this._TouchEnter, this);
                cur.TouchLeave.Subscribe(this._TouchLeave, this);
            }
        };

        Map.prototype._MouseEnter = function (sender, e) {
            this.HighlightShape(sender);
        };
        Map.prototype._MouseLeave = function (sender, e) {
            this.UnhighlightShape(sender);
        };
        Map.prototype._TouchEnter = function (sender, e) {
            this.HighlightShape(sender);
        };
        Map.prototype._TouchLeave = function (sender, e) {
            this.UnhighlightShape(sender);
        };
        Map.prototype._TouchDown = function (sender, e) {
            this.HighlightShape(sender);
        };
        Map.prototype._TouchUp = function (sender, e) {
            this.UnhighlightShape(sender);
        };

        Map.prototype.HighlightShape = function (shape) {
            shape.StrokeThickness = 10;
            Fayde.Controls.Canvas.SetZIndex(shape, 9999);
        };
        Map.prototype.UnhighlightShape = function (shape) {
            shape.StrokeThickness = 2;
            Fayde.Controls.Canvas.SetZIndex(shape, 0);
        };
        return Map;
    })(Fayde.Application);
    
    return Map;
});
