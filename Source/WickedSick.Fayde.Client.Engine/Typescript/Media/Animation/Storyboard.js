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
        /// <reference path="../../Engine/App.ts" />
        /// <reference path="../../Data/PropertyPath.ts" />
        (function (Animation) {
            var Storyboard = (function (_super) {
                __extends(Storyboard, _super);
                function Storyboard() {
                                _super.call(this);
                    var coll = new Animation.TimelineCollection();
                    coll.AttachTo(this);
                    Object.defineProperty(this, "Children", {
                        value: coll,
                        writable: false
                    });
                }
                Storyboard.TargetNameProperty = DependencyProperty.RegisterAttached("TargetName", function () {
                    return String;
                }, Storyboard);
                Storyboard.GetTargetName = function GetTargetName(d) {
                    return d.GetValue(Storyboard.TargetNameProperty);
                };
                Storyboard.SetTargetName = function SetTargetName(d, value) {
                    return d.SetValue(Storyboard.TargetNameProperty, value);
                };
                Storyboard.TargetPropertyProperty = DependencyProperty.RegisterAttached("TargetProperty", function () {
                    return Fayde.Data.PropertyPath;
                }, Storyboard);
                Storyboard.GetTargetProperty = function GetTargetProperty(d) {
                    return d.GetValue(Storyboard.TargetPropertyProperty);
                };
                Storyboard.SetTargetProperty = function SetTargetProperty(d, value) {
                    return d.SetValue(Storyboard.TargetPropertyProperty, value);
                };
                Storyboard.Annotations = {
                    ContentProperty: "Children"
                };
                Storyboard.prototype.Begin = function () {
                    this.Reset();
                    var error = new BError();
                    var promotedValues = [];
                    if(this._HookupAnimations(promotedValues, error)) {
                        App.Instance.RegisterStoryboard(this);
                    } else {
                        error.ThrowException();
                    }
                };
                Storyboard.prototype.Pause = function () {
                    _super.prototype.Pause.call(this);
                    var enumerator = this.Children.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        (enumerator.Current).Pause();
                    }
                };
                Storyboard.prototype.Resume = function () {
                    _super.prototype.Resume.call(this);
                    var enumerator = this.Children.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        (enumerator.Current).Resume();
                    }
                };
                Storyboard.prototype.Stop = function () {
                    _super.prototype.Stop.call(this);
                    App.Instance.UnregisterStoryboard(this);
                    var enumerator = this.Children.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        (enumerator.Current).Stop();
                    }
                };
                Storyboard.prototype._HookupAnimations = function (promotedValues, error) {
                    var enumerator = this.Children.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        if(!this._HookupAnimation((enumerator.Current), null, null, promotedValues, error)) {
                            return false;
                        }
                    }
                    return true;
                };
                Storyboard.prototype._HookupAnimation = function (animation, targetObject, targetPropertyPath, promotedValues, error) {
                    animation.Reset();
                    var localTargetObject = null;
                    var localTargetPropertyPath = null;
                    if(animation.HasManualTarget) {
                        localTargetObject = animation.ManualTarget;
                    } else {
                        var name = Storyboard.GetTargetName(animation);
                        if(name) {
                            var n = animation.XamlNode.FindName(name);
                            localTargetObject = n.XObject;
                        }
                    }
                    localTargetPropertyPath = Storyboard.GetTargetProperty(animation);
                    if(localTargetObject != null) {
                        targetObject = localTargetObject;
                    }
                    if(localTargetPropertyPath != null) {
                        targetPropertyPath = localTargetPropertyPath;
                    }
                    var refobj = {
                        Value: targetObject
                    };
                    var targetProperty = targetPropertyPath.TryResolveDependencyProperty(refobj, promotedValues);
                    if(!targetProperty) {
                        error.Number = BError.XamlParse;
                        error.Message = "Could not resolve property for storyboard. [" + localTargetPropertyPath.Path.toString() + "]";
                        return false;
                    }
                    if(!animation.Resolve(refobj.Value, targetProperty)) {
                        error.Number = BError.InvalidOperation;
                        error.Message = "Storyboard value could not be converted to the correct type";
                        return false;
                    }
                    //AnimationDebug(function () { return "Hookup (" + Storyboard.GetTargetName(animation) + "." + targetPropertyPath.Path + ")"; });
                    animation.HookupStorage(refobj.Value, targetProperty);
                    return true;
                };
                Storyboard.prototype.UpdateInternal = function (clockData) {
                    var enumerator = this.Children.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        (enumerator.Current).Update(clockData.CurrentTime.Ticks);
                    }
                };
                Storyboard.prototype.GetNaturalDurationCore = function () {
                    var fullTicks = 0;
                    var enumerator = this.Children.GetEnumerator();
                    while(enumerator.MoveNext()) {
                        var timeline = enumerator.Current;
                        var dur = timeline.GetNaturalDuration();
                        if(dur.IsAutomatic) {
                            continue;
                        }
                        if(dur.IsForever) {
                            return Duration.CreateForever();
                        }
                        //duration must have a timespan if we got here
                        var spanTicks = dur.TimeSpan.Ticks;
                        var repeat = timeline.RepeatBehavior || Animation.Timeline.DEFAULT_REPEAT_BEHAVIOR;
                        if(repeat.IsForever) {
                            return Duration.CreateForever();
                        }
                        if(repeat.HasCount) {
                            spanTicks = spanTicks * repeat.Count;
                        }
                        if(timeline.AutoReverse) {
                            spanTicks *= 2;
                        }
                        if(repeat.HasDuration) {
                            spanTicks = repeat.Duration.TimeSpan.Ticks;
                        }
                        if(spanTicks !== 0) {
                            spanTicks = spanTicks / timeline.SpeedRatio;
                        }
                        var bt = timeline.BeginTime;
                        if(bt) {
                            spanTicks += bt.Ticks;
                        }
                        if(fullTicks === 0 || fullTicks <= spanTicks) {
                            fullTicks = spanTicks;
                        }
                    }
                    if(!fullTicks) {
                        return Duration.CreateAutomatic();
                    }
                    return Duration.CreateTimeSpan(TimeSpan.FromTicks(fullTicks));
                };
                return Storyboard;
            })(Animation.Timeline);
            Animation.Storyboard = Storyboard;            
            Nullstone.RegisterType(Storyboard, "Storyboard");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Storyboard.js.map
