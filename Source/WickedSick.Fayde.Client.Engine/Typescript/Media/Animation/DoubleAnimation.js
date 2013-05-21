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

                    this._FromCached = null;
                    this._ToCached = null;
                    this._ByCached = null;
                    this._EasingCached = undefined;
                }
                DoubleAnimation.ByProperty = DependencyProperty.Register("By", function () {
                    return Number;
                }, DoubleAnimation, null, function (d, args) {
                    return (d)._ByChanged(args);
                });
                DoubleAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, DoubleAnimation, undefined, function (d, args) {
                    return (d)._EasingChanged(args);
                });
                DoubleAnimation.FromProperty = DependencyProperty.Register("From", function () {
                    return Number;
                }, DoubleAnimation, null, function (d, args) {
                    return (d)._FromChanged(args);
                });
                DoubleAnimation.ToProperty = DependencyProperty.Register("To", function () {
                    return Number;
                }, DoubleAnimation, null, function (d, args) {
                    return (d)._ToChanged(args);
                });
                DoubleAnimation.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
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
                    var easingFunc = this._EasingCached;
                    if(easingFunc != null) {
                        clockData.Progress = easingFunc.Ease(clockData.Progress);
                    }
                    return start + ((end - start) * clockData.Progress);
                };
                DoubleAnimation.prototype._FromChanged = function (args) {
                    this._FromCached = args.NewValue;
                };
                DoubleAnimation.prototype._ToChanged = function (args) {
                    this._ToCached = args.NewValue;
                };
                DoubleAnimation.prototype._ByChanged = function (args) {
                    this._ByCached = args.NewValue;
                };
                DoubleAnimation.prototype._EasingChanged = function (args) {
                    this._EasingCached = args.NewValue;
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
