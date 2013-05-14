var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// <reference path="../Core/DependencyObject.ts" />
    /// <reference path="Transform.ts" />
    /// CODE
    /// <reference path="../Primitives/rect.ts" />
    (function (Media) {
        var Brush = (function (_super) {
            __extends(Brush, _super);
            function Brush() {
                        _super.call(this);
                this._CachedBounds = null;
                this._CachedBrush = null;
                this._Listeners = [];
                (this.XamlNode).IsShareable = true;
            }
            Brush.TransformProperty = DependencyProperty.RegisterCore("Transform", function () {
                return Fayde.Media.Transform;
            }, Brush, undefined, function (d, args) {
                return (d)._TransformChanged(args);
            });
            Brush.prototype.SetupBrush = function (ctx, bounds) {
                if(this._CachedBrush && this._CachedBounds && rect.isEqual(this._CachedBounds, bounds)) {
                    return;
                }
                this._CachedBounds = bounds;
                var transform = this.Transform;
                if(transform) {
                    var transformedBounds = transform.TransformBounds(bounds);
                    var raw = transform.Value._Raw;
                    var tmpBrush = this.CreateBrush(ctx, bounds);
                    var fillExtents = rect.copyTo(bounds);
                    rect.growBy(fillExtents, raw[2], raw[5], 0, 0);
                    var tmpCanvas = document.createElement("canvas");
                    tmpCanvas.width = Math.max(transformedBounds.Width, bounds.Width);
                    tmpCanvas.height = Math.max(transformedBounds.Height, bounds.Height);
                    var tmpCtx = tmpCanvas.getContext("2d");
                    tmpCtx.setTransform(raw[0], raw[1], raw[3], raw[4], raw[2], raw[5]);
                    tmpCtx.fillStyle = tmpBrush;
                    tmpCtx.fillRect(fillExtents.X, fillExtents.Y, fillExtents.Width, fillExtents.Height);
                    this._CachedBrush = ctx.createPattern(tmpCanvas, "no-repeat");
                } else {
                    this._CachedBrush = this.CreateBrush(ctx, bounds);
                }
            };
            Brush.prototype.CreateBrush = function (ctx, bounds) {
                return undefined;
            };
            Brush.prototype.ToHtml5Object = function () {
                return this._CachedBrush;
            };
            Brush.prototype.Listen = function (func) {
                var _this = this;
                var listener = {
                    Callback: func,
                    Detach: function () {
                        var listeners = _this._Listeners;
                        var index = listeners.indexOf(listener);
                        if(index > -1) {
                            listeners.splice(index, 1);
                        }
                    }
                };
                this._Listeners.push(listener);
                return listener;
            };
            Brush.prototype.InvalidateBrush = function () {
                this._CachedBrush = null;
                this._CachedBounds = null;
                var listeners = this._Listeners;
                var len = listeners.length;
                for(var i = 0; i < len; i++) {
                    listeners[i].Callback(this);
                }
            };
            Brush.prototype.TransformChanged = function (source) {
                this.InvalidateBrush();
            };
            Brush.prototype._TransformChanged = function (args) {
                var oldt = args.OldValue;
                var newt = args.NewValue;
                if(oldt) {
                    oldt.Unlisten(this);
                }
                if(newt) {
                    newt.Listen(this);
                }
                this.InvalidateBrush();
            };
            return Brush;
        })(Fayde.DependencyObject);
        Media.Brush = Brush;        
        Nullstone.RegisterType(Brush, "Brush");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Brush.js.map
