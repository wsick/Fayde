var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="AnimationBase.ts" />
        /// CODE
        /// <reference path="KeyFrame.ts"/>
        /// <reference path="ObjectKeyFrame.ts"/>
        (function (Animation) {
            var AnimationUsingKeyFrames = (function (_super) {
                __extends(AnimationUsingKeyFrames, _super);
                function AnimationUsingKeyFrames() {
                                _super.call(this);
                    var coll = new Animation.KeyFrameCollection();
                    coll.AttachTo(this);
                    Object.defineProperty(this, "KeyFrames", {
                        value: coll,
                        writable: false
                    });
                }
                AnimationUsingKeyFrames.prototype.Resolve = function (target, propd) {
                    var keyFrames = this.KeyFrames;
                    var sortedList = Animation.KeyFrameCollection.ResolveKeyFrames(this, keyFrames);
                    var count = sortedList.length;
                    for(var j = 0; j < count; j++) {
                        if(!sortedList[j].KeyTime.IsValid) {
                            return false;
                        }
                    }
                    return true;
                };
                AnimationUsingKeyFrames.prototype.GetCurrentValue = function (defaultOriginValue, defaultDestinationValue, clockData) {
                    var keyFrames = this.KeyFrames;
                    var prevFrameRef = {
                        Value: null
                    };
                    var currentKeyFrame = keyFrames.GetKeyFrameForTime(clockData.CurrentTime, prevFrameRef);
                    var prevFrame = prevFrameRef.Value;
                    if(!currentKeyFrame) {
                        return null;
                    }
                    var baseValue;
                    var keyStartTime;
                    var keyEndTime = currentKeyFrame._ResolvedKeyTime;
                    if(!prevFrame) {
                        // the first keyframe, start at the animation's base value
                        baseValue = defaultOriginValue;
                        keyStartTime = new TimeSpan();
                    } else {
                        // start at the previous keyframe's target value
                        if(prevFrame instanceof Animation.ObjectKeyFrame) {
                            baseValue = (prevFrame).ConvertedValue;
                        } else {
                            baseValue = prevFrame.Value;
                        }
                        keyStartTime = prevFrame._ResolvedKeyTime;
                    }
                    var progress;
                    if(clockData.CurrentTime.CompareTo(keyEndTime) >= 0) {
                        progress = 1.0;
                    } else {
                        var keyDuration = keyEndTime.Ticks - keyStartTime.Ticks;
                        if(keyDuration <= 0) {
                            progress = 1.0;
                        } else {
                            progress = (clockData.CurrentTime.Ticks - keyStartTime.Ticks) / keyDuration;
                        }
                    }
                    return currentKeyFrame.InterpolateValue(baseValue, progress);
                };
                AnimationUsingKeyFrames.prototype.GetNaturalDurationCore = function () {
                    var keyFrames = this.KeyFrames;
                    var sortedList = Animation.KeyFrameCollection.ResolveKeyFrames(this, keyFrames);
                    var len = sortedList.length;
                    var ts;
                    if(len > 0) {
                        ts = sortedList[len - 1]._ResolvedKeyTime;
                    } else {
                        ts = new TimeSpan();
                    }
                    return Duration.CreateTimeSpan(ts);
                };
                AnimationUsingKeyFrames.prototype.AddKeyFrame = function (kf) {
                    this.KeyFrames.Add(kf);
                };
                AnimationUsingKeyFrames.prototype.RemoveKeyFrame = function (kf) {
                    this.KeyFrames.Remove(kf);
                };
                return AnimationUsingKeyFrames;
            })(Animation.AnimationBase);
            Animation.AnimationUsingKeyFrames = AnimationUsingKeyFrames;            
            Nullstone.RegisterType(AnimationUsingKeyFrames, "AnimationUsingKeyFrames");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=AnimationUsingKeyFrames.js.map
