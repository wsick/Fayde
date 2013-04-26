var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Runtime/Nullstone.ts" />
        /// <reference path="../../Core/DependencyObject.ts" />
        /// <reference path="../GeneralTransform.ts" />
        /// CODE
        /// <reference path="../../Primitives/Thickness.ts" />
        /// <reference path="../../Engine/RenderContext.ts" />
        (function (Effects) {
            var Effect = (function (_super) {
                __extends(Effect, _super);
                function Effect() {
                    _super.apply(this, arguments);

                }
                Effect.EffectMappingProperty = DependencyProperty.Register("EffectMapping", function () {
                    return Media.GeneralTransform;
                }, Effect, undefined, function (d, args) {
                    return (d)._EffectChanged(args);
                });
                Effect.prototype.Padding = function () {
                    return new Thickness();
                };
                Effect.prototype.GetPadding = function (thickness) {
                    return false;
                };
                Effect.prototype.PreRender = function (ctx) {
                    //Abstract Method
                                    };
                Effect.prototype.Listen = function (listener) {
                    this._Listener = listener;
                };
                Effect.prototype.Unlisten = function (listener) {
                    if(this._Listener === listener) {
                        this._Listener = null;
                    }
                };
                Effect.prototype._EffectChanged = function (args) {
                    var listener = this._Listener;
                    if(listener) {
                        listener.EffectChanged(this);
                    }
                };
                return Effect;
            })(Fayde.DependencyObject);
            Effects.Effect = Effect;            
            Nullstone.RegisterType(Effect, "Effect");
        })(Media.Effects || (Media.Effects = {}));
        var Effects = Media.Effects;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Effect.js.map
