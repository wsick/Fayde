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

                    this._FromCached = null;
                    this._ToCached = null;
                    this._ByCached = null;
                    this._EasingCached = undefined;
                }
                PointAnimation.ByProperty = DependencyProperty.Register("By", function () {
                    return Point;
                }, PointAnimation, null, function (d, args) {
                    return (d)._ByChanged(args);
                });
                PointAnimation.EasingFunctionProperty = DependencyProperty.Register("EasingFunction", function () {
                    return Animation.EasingFunctionBase;
                }, PointAnimation, undefined, function (d, args) {
                    return (d)._EasingChanged(args);
                });
                PointAnimation.FromProperty = DependencyProperty.Register("From", function () {
                    return Point;
                }, PointAnimation, null, function (d, args) {
                    return (d)._FromChanged(args);
                });
                PointAnimation.ToProperty = DependencyProperty.Register("To", function () {
                    return Point;
                }, PointAnimation, null, function (d, args) {
                    return (d)._ToChanged(args);
                });
                PointAnimation.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
                    var start = new Point();
                    if(this._FromCached != null) {
                        start = this._FromCached;
                    } else if(defaultOriginalValue instanceof Point) {
                        start = defaultOriginalValue;
                    }
                    var end = start;
                    if(this._ToCached != null) {
                        end = this._ToCached;
                    } else if(this._ByCached != null) {
                        end = new Point(start.X + this._ByCached.X, start.Y + this._ByCached.Y);
                    } else if(defaultDestinationValue instanceof Point) {
                        end = defaultDestinationValue;
                    }
                    var easingFunc = this._EasingCached;
                    if(easingFunc != null) {
                        clockData.Progress = easingFunc.Ease(clockData.Progress);
                    }
                    return Point.LERP(start, end, clockData.Progress);
                };
                PointAnimation.prototype._FromChanged = function (args) {
                    this._FromCached = args.NewValue;
                };
                PointAnimation.prototype._ToChanged = function (args) {
                    this._ToCached = args.NewValue;
                };
                PointAnimation.prototype._ByChanged = function (args) {
                    this._ByCached = args.NewValue;
                };
                PointAnimation.prototype._EasingChanged = function (args) {
                    this._EasingCached = args.NewValue;
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
