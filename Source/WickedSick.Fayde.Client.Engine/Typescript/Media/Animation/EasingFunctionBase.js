var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// CODE
        /// <reference path="Enums.ts" />
        (function (Animation) {
            var EasingFunctionBase = (function (_super) {
                __extends(EasingFunctionBase, _super);
                function EasingFunctionBase() {
                    _super.apply(this, arguments);

                }
                EasingFunctionBase.EasingModeProperty = DependencyProperty.Register("EasingMode", function () {
                    return new Enum(Animation.EasingMode);
                }, EasingFunctionBase);
                EasingFunctionBase.prototype.Ease = function (normalizedTime) {
                    var easingMode = this.EasingMode;
                    switch(easingMode) {
                        case Animation.EasingMode.EaseIn:
                            return this.EaseInCore(normalizedTime);
                        case Animation.EasingMode.EaseOut:
                            return this.EaseInCore(1.0 - normalizedTime);
                        case Animation.EasingMode.EaseInOut:
                            return normalizedTime <= 0.5 ? this.EaseInCore(normalizedTime * 2) * 0.5 : 1.0 - this.EaseInCore(((1.0 - normalizedTime) * 2) * 0.5);
                        default:
                            return 0.0;
                    }
                };
                EasingFunctionBase.prototype.EaseInCore = function (t) {
                    //Abstract method
                    return t;
                };
                return EasingFunctionBase;
            })(Fayde.DependencyObject);
            Animation.EasingFunctionBase = EasingFunctionBase;            
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=EasingFunctionBase.js.map
