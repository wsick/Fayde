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
        /// <reference path="../../Primitives/Point.ts" />
        (function (Animation) {
            var PointAnimation = (function (_super) {
                __extends(PointAnimation, _super);
                function PointAnimation() {
                    _super.apply(this, arguments);

                    this._HasCached = false;
                    this._FromCached = null;
                    this._ToCached = null;
                    this._ByCached = null;
                }
                PointAnimation.ByProperty = DependencyProperty.Register("By", function () {
                    return Point;
                }, PointAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                PointAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, PointAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                PointAnimation.FromProperty = DependencyProperty.Register("From", function () {
                    return Point;
                }, PointAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                PointAnimation.ToProperty = DependencyProperty.Register("To", function () {
                    return Point;
                }, PointAnimation, undefined, function (d, args) {
                    return (d)._InvalidateCache();
                });
                PointAnimation.prototype.GetTargetValue = function (defaultOriginalValue) {
                    this._EnsureCache();
                    var start = new Point();
                    if(this._FromCached != null) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue != null && defaultOriginalValue instanceof Point) {
                        start = defaultOriginalValue;
                    }
                    if(this._ToCached != null) {
                        return this._ToCached;
                    } else if(this._ByCached != null) {
                        return new Point(start.X + this._ByCached.X, start.Y + this._ByCached.Y);
                    }
                    return start;
                };
                PointAnimation.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
                    this._EnsureCache();
                    var start = new Point();
                    if(this._FromCached != null) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue != null && defaultOriginalValue instanceof Point) {
                        start = defaultOriginalValue;
                    }
                    var end = start;
                    if(this._ToCached != null) {
                        end = this._ToCached;
                    } else if(this._ByCached != null) {
                        end = new Point(start.X + this._ByCached.X, start.Y + this._ByCached.Y);
                    } else if(defaultDestinationValue != null && defaultDestinationValue instanceof Point) {
                        end = defaultDestinationValue;
                    }
                    var easingFunc = this.EasingFunction;
                    if(easingFunc != null) {
                        clockData.Progress = easingFunc.Ease(clockData.Progress);
                    }
                    return Point.LERP(start, end, clockData.Progress);
                };
                PointAnimation.prototype._EnsureCache = function () {
                    if(this._HasCached) {
                        return;
                    }
                    this._FromCached = this.From;
                    this._ToCached = this.To;
                    this._ByCached = this.By;
                    this._HasCached = true;
                };
                PointAnimation.prototype._InvalidateCache = function () {
                    this._FromCached = null;
                    this._ToCached = null;
                    this._ByCached = null;
                    this._HasCached = false;
                };
                return PointAnimation;
            })(Animation.AnimationBase);
            Animation.PointAnimation = PointAnimation;            
            Nullstone.RegisterType(PointAnimation, "PointAnimation");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PointAnimation.js.map
