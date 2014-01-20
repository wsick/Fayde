/// <reference path="../../../jsbin/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var MouseEventArgs = Fayde.Input.MouseEventArgs;

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
            }
        };

        Map.prototype._MouseEnter = function (sender, e) {
            var path = sender;
            path.StrokeThickness = 10;
            Fayde.Controls.Canvas.SetZIndex(path, 9999);
        };
        Map.prototype._MouseLeave = function (sender, e) {
            var path = sender;
            path.StrokeThickness = 2;
            Fayde.Controls.Canvas.SetZIndex(path, 0);
        };
        return Map;
    })(Fayde.Application);
    
    return Map;
});
