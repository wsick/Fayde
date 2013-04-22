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
        (function (Animation) {
            var DoubleAnimation = (function (_super) {
                __extends(DoubleAnimation, _super);
                function DoubleAnimation() {
                    _super.apply(this, arguments);

                    this._HasCached = false;
                    this._FromCached = 0.0;
                    this._ToCached = 0.0;
                    this._ByCached = 0.0;
                }
                DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () {
                    return Number;
                }, DoubleAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                DoubleAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, DoubleAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () {
                    return Number;
                }, DoubleAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () {
                    return Number;
                }, DoubleAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                DoubleAnimation.prototype.GetTargetValue = function (defaultOriginalValue) {
                    this._EnsureCache();
                    var start = 0.0;
                    if(this._FromCached != null) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue != null && typeof defaultOriginalValue === "number") {
                        start = defaultOriginalValue;
                    }
                    if(this._ToCached != null) {
                        return this._ToCached;
                    } else if(this._ByCached != null) {
                        return start + this._ByCached;
                    }
                    return start;
                };
                DoubleAnimation.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
                    this._EnsureCache();
                    var start = 0.0;
                    if(this._FromCached != null) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue != null && typeof defaultOriginalValue === "number") {
                        start = defaultOriginalValue;
                    }
                    var end = start;
                    if(this._ToCached != null) {
                        end = this._ToCached;
                    } else if(this._ByCached != null) {
                        end = start + this._ByCached;
                    } else if(defaultDestinationValue != null && typeof defaultDestinationValue === "number") {
                        end = defaultDestinationValue;
                    }
                    var easingFunc = this.EasingFunction;
                    if(easingFunc != null) {
                        clockData.Progress = easingFunc.Ease(clockData.Progress);
                    }
                    return start + ((end - start) * clockData.Progress);
                };
                DoubleAnimation.prototype._EnsureCache = function () {
                    if(this._HasCached) {
                        return;
                    }
                    this._FromCached = this.From;
                    this._ToCached = this.To;
                    this._ByCached = this.By;
                    this._HasCached = true;
                };
                DoubleAnimation.prototype._InvalidateCache = function () {
                    this._FromCached = 0.0;
                    this._ToCached = 0.0;
                    this._ByCached = 0.0;
                    this._HasCached = false;
                };
                return DoubleAnimation;
            })(Animation.AnimationBase);
            Animation.DoubleAnimation = DoubleAnimation;            
            Nullstone.RegisterType(DoubleAnimation, "DoubleAnimation");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DoubleAnimation.js.map
