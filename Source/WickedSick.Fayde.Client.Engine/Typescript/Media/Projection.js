var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// CODE
    (function (Media) {
        var Projection = (function (_super) {
            __extends(Projection, _super);
            function Projection() {
                _super.apply(this, arguments);

                this._ProjectionMatrix = null;
                this._ObjectWidth = 1.0;
                this._ObjectHeight = 1.0;
                this._Listeners = [];
            }
            Projection.prototype.SetObjectSize = function (size) {
                var w = Math.max(size.Width, 1.0);
                var h = Math.max(size.Height, 1.0);
                if(w !== this._ObjectWidth && h !== this._ObjectHeight) {
                    this._ObjectWidth = w;
                    this._ObjectHeight = h;
                    this._ProjectionMatrix = null;
                }
            };
            Projection.prototype.GetDistanceFromXYPlane = function () {
                return NaN;
            };
            Projection.prototype.GetTransform = function () {
                var m3 = this._ProjectionMatrix;
                if(!m3) {
                    m3 = this._ProjectionMatrix = this.CreateProjectionMatrix();
                }
                if(m3) {
                    return mat4.clone(m3._Raw);
                }
                return mat4.identity();
            };
            Projection.prototype.CreateProjectionMatrix = function () {
                return null;
            };
            Projection.prototype.Listen = function (func) {
                var listeners = this._Listeners;
                var listener = {
                    Callback: func,
                    Detach: function () {
                        var index = listeners.indexOf(listener);
                        if(index > -1) {
                            listeners.splice(index, 1);
                        }
                    }
                };
                listeners.push(listener);
                return listener;
            };
            Projection.prototype._InvalidateProjection = function () {
                this._ProjectionMatrix = null;
                var listeners = this._Listeners;
                var len = listeners.length;
                for(var i = 0; i < len; i++) {
                    listeners[i].Callback(this);
                }
            };
            return Projection;
        })(Fayde.DependencyObject);
        Media.Projection = Projection;        
        Nullstone.RegisterType(Projection, "Projection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Projection.js.map
