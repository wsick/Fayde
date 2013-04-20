var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="Timeline.ts" />
        /// CODE
        /// <reference path="AnimationStorage.ts"/>
        (function (Animation) {
            var Animation = (function (_super) {
                __extends(Animation, _super);
                function Animation() {
                    _super.apply(this, arguments);

                }
                Animation.prototype.Resolve = function (target, propd) {
                    return true;
                };
                Animation.prototype.HookupStorage = function (targetObj, targetProp) {
                    return (this._Storage = new Animation.AnimationStorage(this, targetObj, targetProp));
                };
                Animation.prototype.Disable = function () {
                    var storage = this._Storage;
                    if(storage) {
                        storage.Disable();
                    }
                };
                Animation.prototype.Stop = function () {
                    var storage = this._Storage;
                    if(storage) {
                        storage.Stop();
                    }
                };
                Animation.prototype.UpdateInternal = function (clockData) {
                    var storage = this._Storage;
                    if(storage) {
                        storage.UpdateCurrentValueAndApply(clockData);
                    }
                };
                Animation.prototype.GetNaturalDurationCore = function () {
                    return Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 1));
                };
                Animation.prototype.GetTargetValue = function (defaultOriginalValue) {
                    return undefined;
                };
                Animation.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
                    return undefined;
                };
                return Animation;
            })(Animation.Timeline);
            Animation.Animation = Animation;            
            Nullstone.RegisterType(Animation, "Animation");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Animation.js.map
