var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// <reference path="../../Primitives/TimeSpan.ts" />
        /// <reference path="../../Primitives/Duration.ts" />
        /// <reference path="RepeatBehavior.ts" />
        /// <reference path="Enums.ts" />
        /// <reference path="../../Runtime/Enum.ts" />
        /// <reference path="../../Core/XamlObjectCollection.ts" />
        /// CODE
        /// <reference path="../../Runtime/MulticastEvent.ts" />
        /// <reference path="../../Runtime/EventArgs.ts" />
        (function (Animation) {
            var Timeline = (function (_super) {
                __extends(Timeline, _super);
                function Timeline() {
                    _super.apply(this, arguments);

                    this.Completed = new MulticastEvent();
                    this._IsPaused = false;
                    this._BeginPauseTime = 0;
                    this._TicksPaused = 0;
                    this._IsFirstUpdate = true;
                    this._HasBegun = false;
                    this._BeginTicks = undefined;
                    this._InitialStep = undefined;
                    this._ManualTarget = undefined;
                }
                Timeline.DEFAULT_REPEAT_BEHAVIOR = Animation.RepeatBehavior.FromIterationCount(1);
                Timeline.AutoReverseProperty = DependencyProperty.Register("AutoReverse", function () {
                    return Boolean;
                }, Timeline, false);
                Timeline.BeginTimeProperty = DependencyProperty.Register("BeginTime", function () {
                    return TimeSpan;
                }, Timeline);
                Timeline.DurationProperty = DependencyProperty.Register("Duration", function () {
                    return Duration;
                }, Timeline);
                Timeline.RepeatBehaviorProperty = DependencyProperty.Register("RepeatBehavior", function () {
                    return Animation.RepeatBehavior;
                }, Timeline);
                Timeline.SpeedRatioProperty = DependencyProperty.Register("SpeedRatio", function () {
                    return Number;
                }, Timeline, 1.0);
                Timeline.FillBehaviorProperty = DependencyProperty.Register("FillBehavior", function () {
                    return new Enum(Animation.FillBehavior);
                }, Timeline, Animation.FillBehavior.HoldEnd);
                Object.defineProperty(Timeline.prototype, "HasManualTarget", {
                    get: function () {
                        return this._ManualTarget != null;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Timeline.prototype, "ManualTarget", {
                    get: function () {
                        return this._ManualTarget;
                    },
                    enumerable: true,
                    configurable: true
                });
                Timeline.prototype.Reset = function () {
                    this._TicksPaused = 0;
                    this._IsFirstUpdate = true;
                    this._BeginTicks = undefined;
                    this._HasBegun = false;
                };
                Timeline.prototype.Pause = function () {
                    if(this._IsPaused) {
                        return;
                    }
                    this._BeginPauseTime = new Date().getTime();
                    this._IsPaused = true;
                };
                Timeline.prototype.Resume = function () {
                    if(!this._IsPaused) {
                        return;
                    }
                    this._IsPaused = false;
                    var nowTime = new Date().getTime();
                    this._TicksPaused = nowTime - this._BeginPauseTime;
                };
                Timeline.prototype.Stop = function () {
                    this.Reset();
                };
                Timeline.prototype.OnCompleted = function () {
                    var fill = this.FillBehavior;
                    switch(fill) {
                        case Animation.FillBehavior.HoldEnd:
                            this.Disable();
                            break;
                        case Animation.FillBehavior.Stop:
                            this.Stop();
                            break;
                    }
                    this.Completed.Raise(this, EventArgs.Empty);
                };
                Timeline.prototype.Update = function (nowTime) {
                    var clockData = this.CreateClockData(nowTime);
                    if(!clockData) {
                        return;
                    }
                    if(this._IsPaused) {
                        return;
                    }
                    this.UpdateInternal(clockData);
                    if(clockData.Completed) {
                        this.OnCompleted();
                    }
                };
                Timeline.prototype.UpdateInternal = function (clockData) {
                };
                Timeline.prototype.Disable = function () {
                };
                Timeline.prototype.CreateClockData = function (nowTime) {
                    if(this._IsFirstUpdate) {
                        this._InitialStep = nowTime;
                        this._HasBegun = false;
                        this._IsFirstUpdate = false;
                    }
                    if(!this._HasBegun) {
                        if(!this.IsAfterBeginTime(nowTime)) {
                            return;
                        }
                        this._BeginTicks = nowTime;
                        this._HasBegun = true;
                    }
                    var elapsedTicks = nowTime - this._BeginTicks - this._TicksPaused;
                    var currentTimeTicks = elapsedTicks;
                    var progress = 0.0;
                    var completed = false;
                    var duration = this.GetNaturalDuration();
                    if(!duration || duration.IsAutomatic) {
                        progress = 1.0;
                        completed = true;
                    } else if(duration.HasTimeSpan) {
                        var d = duration.TimeSpan.Ticks;
                        if(d === 0) {
                            progress = 1.0;
                        } else if(this.AutoReverse === true) {
                            d = d / 2;
                            // Progress - Graph that repeats 3 times has shape: /\/\/\/\/\/\
                            progress = 1 - (Math.abs((elapsedTicks % (d + d)) - d) / d);
                        } else {
                            // Progress - Graph that repeats 3 times has shape: //////
                            progress = (elapsedTicks / d) - Math.floor(elapsedTicks / d);
                        }
                        var repeat = this.RepeatBehavior || Timeline.DEFAULT_REPEAT_BEHAVIOR;
                        if(repeat.IsForever) {
                        } else if(repeat.HasCount) {
                            if((d === 0) || (Math.floor(elapsedTicks / d) >= repeat.Count)) {
                                progress = 1.0;
                                completed = true;
                            }
                        } else if(repeat.HasDuration) {
                            if(elapsedTicks >= repeat.Duration.TimeSpan.Ticks) {
                                progress = 1.0;
                                completed = true;
                            }
                        }
                        if(d !== 0) {
                            currentTimeTicks = progress * d;
                        }//normalizes CurrentTime within [0,duration] constraints
                        
                    }
                    // else if (duration.IsForever) { // do nothing }
                    return {
                        CurrentTime: TimeSpan.FromTicks(currentTimeTicks),
                        Progress: progress,
                        Completed: completed
                    };
                };
                Timeline.prototype.IsAfterBeginTime = function (nowTime) {
                    var beginTime = this.BeginTime;
                    if(beginTime == null) {
                        return true;
                    }
                    var beginTicks = beginTime.Ticks;
                    if(beginTicks <= 0) {
                        return true;
                    }
                    var elapsedTicks = nowTime - this._InitialStep;
                    if(elapsedTicks < beginTicks) {
                        return false;
                    }
                    return true;
                };
                Timeline.prototype.GetNaturalDuration = function () {
                    var d = this.Duration;
                    if(!d || d.IsAutomatic) {
                        return this.GetNaturalDurationCore();
                    }
                    return d;
                };
                Timeline.prototype.GetNaturalDurationCore = function () {
                    return Duration.CreateAutomatic();
                };
                return Timeline;
            })(Fayde.DependencyObject);
            Animation.Timeline = Timeline;            
            Nullstone.RegisterType(Timeline, "Timeline");
            var TimelineCollection = (function (_super) {
                __extends(TimelineCollection, _super);
                function TimelineCollection() {
                    _super.apply(this, arguments);

                }
                return TimelineCollection;
            })(Fayde.XamlObjectCollection);
            Animation.TimelineCollection = TimelineCollection;            
            Nullstone.RegisterType(TimelineCollection, "TimelineCollection");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Timeline.js.map
