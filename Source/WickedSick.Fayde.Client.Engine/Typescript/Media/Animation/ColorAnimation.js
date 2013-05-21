var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="AnimationBase.ts" />
        /// <reference path="EasingFunctionBase.ts" />
        /// CODE
        /// <reference path="../../Primitives/Color.ts" />
        (function (Animation) {
            var ColorAnimation = (function (_super) {
                __extends(ColorAnimation, _super);
                function ColorAnimation() {
                    _super.apply(this, arguments);

                    this._FromCached = null;
                    this._ToCached = null;
                    this._ByCached = null;
                    this._EasingCached = undefined;
                }
                ColorAnimation.ByProperty = DependencyProperty.Register("By", function () {
                    return Color;
                }, ColorAnimation, null, function (d, args) {
                    return (d)._ByChanged(args);
                });
                ColorAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, ColorAnimation, undefined, function (d, args) {
                    return (d)._EasingChanged(args);
                });
                ColorAnimation.FromProperty = DependencyProperty.Register("From", function () {
                    return Color;
                }, ColorAnimation, null, function (d, args) {
                    return (d)._FromChanged(args);
                });
                ColorAnimation.ToProperty = DependencyProperty.Register("To", function () {
                    return Color;
                }, ColorAnimation, null, function (d, args) {
                    return (d)._ToChanged(args);
                });
                ColorAnimation.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
                    var start = new Color();
                    if(this._FromCached) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue instanceof Color) {
                        start = defaultOriginalValue;
                    }
                    var end = start;
                    if(this._ToCached) {
                        end = this._ToCached;
                    } else if(this._ByCached) {
                        end = start.Add(this._ByCached);
                    } else if(defaultDestinationValue instanceof Color) {
                        end = defaultDestinationValue;
                    }
                    var easingFunc = this._EasingCached;
                    if(easingFunc) {
                        clockData.Progress = easingFunc.Ease(clockData.Progress);
                    }
                    return Color.LERP(start, end, clockData.Progress);
                };
                ColorAnimation.prototype._FromChanged = function (args) {
                    this._FromCached = args.NewValue;
                };
                ColorAnimation.prototype._ToChanged = function (args) {
                    this._ToCached = args.NewValue;
                };
                ColorAnimation.prototype._ByChanged = function (args) {
                    this._ByCached = args.NewValue;
                };
                ColorAnimation.prototype._EasingChanged = function (args) {
                    this._EasingCached = args.NewValue;
                };
                return ColorAnimation;
            })(Animation.AnimationBase);
            Animation.ColorAnimation = ColorAnimation;            
            Nullstone.RegisterType(ColorAnimation, "ColorAnimation");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ColorAnimation.js.map
