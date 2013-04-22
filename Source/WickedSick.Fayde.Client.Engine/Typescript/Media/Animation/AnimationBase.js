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
            var AnimationBase = (function (_super) {
                __extends(AnimationBase, _super);
                function AnimationBase() {
                    _super.apply(this, arguments);

                }
                AnimationBase.prototype.Resolve = function (target, propd) {
                    return true;
                };
                AnimationBase.prototype.HookupStorage = function (targetObj, targetProp) {
                    return (this._Storage = new Animation.AnimationStorage(this, targetObj, targetProp));
                };
                AnimationBase.prototype.Disable = function () {
                    var storage = this._Storage;
                    if(storage) {
                        storage.Disable();
                    }
                };
                AnimationBase.prototype.Stop = function () {
                    var storage = this._Storage;
                    if(storage) {
                        storage.Stop();
                    }
                };
                AnimationBase.prototype.UpdateInternal = function (clockData) {
                    var storage = this._Storage;
                    if(storage) {
                        storage.UpdateCurrentValueAndApply(clockData);
                    }
                };
                AnimationBase.prototype.GetNaturalDurationCore = function () {
                    return Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 1));
                };
                AnimationBase.prototype.GetTargetValue = function (defaultOriginalValue) {
                    return undefined;
                };
                AnimationBase.prototype.GetCurrentValue = function (defaultOriginalValue, defaultDestinationValue, clockData) {
                    return undefined;
                };
                return AnimationBase;
            })(Animation.Timeline);
            Animation.AnimationBase = AnimationBase;            
            Nullstone.RegisterType(AnimationBase, "AnimationBase");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=AnimationBase.js.map
