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

                    this._HasCached = false;
                    this._FromCached = null;
                    this._ToCached = null;
                    this._ByCached = null;
                }
                ColorAnimation.ByProperty = DependencyProperty.Register("By", function () {
                    return Color;
                }, ColorAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                ColorAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, ColorAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                ColorAnimation.FromProperty = DependencyProperty.Register("From", function () {
                    return Color;
                }, ColorAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                ColorAnimation.ToProperty = DependencyProperty.Register("To", function () {
                    return Color;
                }, ColorAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                ColorAnimation.prototype.GetTargetValue = function (defaultOriginalValue) {
                    this._EnsureCache();
                    var start = new Color();
                    if(this._FromCached != null) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue != null && defaultOriginalValue instanceof Color) {
                        start = defaultOriginalValue;
                    }
                    if(this._ToCached != null) {
                        return this._ToCached;
                    } else if(this._ByCached != null) {
                        return start.Add(this._ByCached);
                    }
                    return start;
                };
                ColorAnimation.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
                    this._EnsureCache();
                    var start = new Color();
                    if(this._FromCached != null) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue != null && defaultOriginalValue instanceof Color) {
                        start = defaultOriginalValue;
                    }
                    var end = start;
                    if(this._ToCached != null) {
                        end = this._ToCached;
                    } else if(this._ByCached != null) {
                        end = start.Add(this._ByCached);
                    } else if(defaultDestinationValue != null && defaultDestinationValue instanceof Color) {
                        end = defaultDestinationValue;
                    }
                    var easingFunc = this.EasingFunction;
                    if(easingFunc != null) {
                        clockData.Progress = easingFunc.Ease(clockData.Progress);
                    }
                    return Color.LERP(start, end, clockData.Progress);
                };
                ColorAnimation.prototype._EnsureCache = function () {
                    if(this._HasCached) {
                        return;
                    }
                    this._FromCached = this.From;
                    this._ToCached = this.To;
                    this._ByCached = this.By;
                    this._HasCached = true;
                };
                ColorAnimation.prototype._InvalidateCache = function () {
                    this._FromCached = null;
                    this._ToCached = null;
                    this._ByCached = null;
                    this._HasCached = false;
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
