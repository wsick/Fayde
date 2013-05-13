var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// <reference path="../Primitives/Color.ts" />
    /// <reference path="../Core/XamlObjectCollection.ts" />
    /// CODE
    (function (Media) {
        var GradientStop = (function (_super) {
            __extends(GradientStop, _super);
            function GradientStop() {
                _super.apply(this, arguments);

            }
            GradientStop.ColorProperty = DependencyProperty.Register("Color", function () {
                return Color;
            }, GradientStop, undefined, function (d, args) {
                return (d)._GradientStopChanged();
            });
            GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () {
                return Number;
            }, GradientStop, 0.0, function (d, args) {
                return (d)._GradientStopChanged();
            });
            GradientStop.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            GradientStop.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            GradientStop.prototype._GradientStopChanged = function () {
                var listener = this._Listener;
                if(listener) {
                    listener.GradientStopChanged(this);
                }
            };
            GradientStop.prototype.toString = function () {
                return this.Color.toString() + " @ " + this.Offset.toString();
            };
            return GradientStop;
        })(Fayde.DependencyObject);
        Media.GradientStop = GradientStop;        
        Nullstone.RegisterType(GradientStop, "GradientStop");
        var GradientStopCollection = (function (_super) {
            __extends(GradientStopCollection, _super);
            function GradientStopCollection() {
                _super.apply(this, arguments);

            }
            GradientStopCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            GradientStopCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            GradientStopCollection.prototype.AddingToCollection = function (value, error) {
                if(!_super.prototype.AddingToCollection.call(this, value, error)) {
                    return false;
                }
                value.Listen(this);
                var listener = this._Listener;
                if(listener) {
                    listener.GradientStopsChanged(this);
                }
                return true;
            };
            GradientStopCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                if(!_super.prototype.RemovedFromCollection.call(this, value, isValueSafe)) {
                    return false;
                }
                value.Unlisten(this);
                var listener = this._Listener;
                if(listener) {
                    listener.GradientStopsChanged(this);
                }
            };
            GradientStopCollection.prototype.GradientStopChanged = function (newGradientStop) {
                var listener = this._Listener;
                if(listener) {
                    listener.GradientStopsChanged(this);
                }
            };
            return GradientStopCollection;
        })(Fayde.XamlObjectCollection);
        Media.GradientStopCollection = GradientStopCollection;        
        Nullstone.RegisterType(GradientStopCollection, "GradientStopCollection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=GradientStop.js.map
