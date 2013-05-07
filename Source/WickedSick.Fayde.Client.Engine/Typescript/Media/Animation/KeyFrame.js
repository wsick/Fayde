var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// <reference path="../../Core/XamlObjectCollection.ts" />
        /// CODE
        /// <reference path="../../Primitives/KeyTime.ts" />
        /// <reference path="AnimationBase.ts" />
        /// <reference path="../../Primitives/TimeSpan.ts" />
        (function (Animation) {
            var KeyFrame = (function (_super) {
                __extends(KeyFrame, _super);
                function KeyFrame() {
                    _super.apply(this, arguments);

                    this._ResolvedKeyTime = null;
                    this._Resolved = false;
                }
                KeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () {
                    return KeyTime;
                }, KeyFrame, undefined, function (d, args) {
                    return (d).InvalidateKeyFrame();
                });
                KeyFrame.prototype.CoerceKeyTime = function (dobj, propd, value, coerced, error) {
                    if(!value) {
                        coerced.Value = this.KeyTime;
                    } else {
                        coerced.Value = value;
                    }
                    return true;
                };
                KeyFrame.prototype.InterpolateValue = function (baseValue, keyFrameProgress) {
                    //Abstract Method
                    return undefined;
                };
                KeyFrame.prototype.CompareToTimeSpan = function (otherTs) {
                    return this._ResolvedKeyTime.CompareTo(otherTs);
                };
                KeyFrame.prototype.Listen = function (listener) {
                    this._Listener = listener;
                };
                KeyFrame.prototype.Unlisten = function (listener) {
                    if(this._Listener === listener) {
                        this._Listener = null;
                    }
                };
                KeyFrame.prototype.InvalidateKeyFrame = function () {
                    var listener = this._Listener;
                    if(listener) {
                        listener.KeyFrameChanged(this);
                    }
                };
                KeyFrame.Comparer = function Comparer(kf1, kf2) {
                    var ts1 = kf1._ResolvedKeyTime;
                    var ts2 = kf2._ResolvedKeyTime;
                    return ts1.CompareTo(ts2);
                };
                KeyFrame.ResolveKeyFrames = /// http://msdn2.microsoft.com/en-us/library/ms742524.aspx (Bottom of page)
                function ResolveKeyFrames(animation, arr) {
                    var totalInterpolationTime;
                    var hasTimeSpanKeyFrame = false;
                    var highestKeyTimeTimeSpan = new TimeSpan();
                    var keyFrame;
                    var len = arr.length;
                    var i;
                    for(i = 0; i < len; i++) {
                        keyFrame = arr[i];
                        keyFrame._ResolvedKeyTime = new TimeSpan();
                        keyFrame._Resolved = false;
                    }
                    var keyTime;
                    // resolve TimeSpan keyframes
                    for(i = 0; i < len; i++) {
                        keyFrame = arr[i];
                        keyTime = keyFrame.KeyTime;
                        if(keyTime.HasTimeSpan) {
                            hasTimeSpanKeyFrame = true;
                            var ts = keyTime.TimeSpan;
                            if(ts.CompareTo(highestKeyTimeTimeSpan) > 0) {
                                highestKeyTimeTimeSpan = ts;
                            }
                            keyFrame._ResolvedKeyTime = ts;
                            keyFrame._Resolved = true;
                        }
                    }
                    // calculate total animation interpolation time
                    var d = animation._Store.GetValue(Animation.Timeline.DurationProperty);
                    if(d.HasTimeSpan) {
                        totalInterpolationTime = d.TimeSpan;
                    } else if(hasTimeSpanKeyFrame) {
                        totalInterpolationTime = highestKeyTimeTimeSpan;
                    } else {
                        totalInterpolationTime = TimeSpan.FromTicks(TimeSpan._TicksPerSecond);
                    }
                    //LOOKS USELESS: animation._TotalKeyTime = totalInterpolationTime;
                    // use the total interpolation time to resolve percent keytime keyframes
                    for(i = 0; i < len; i++) {
                        keyFrame = arr[i];
                        keyTime = keyFrame.KeyTime;
                        if(keyTime.HasPercent) {
                            keyFrame._ResolvedKeyTime = totalInterpolationTime.Multiply(keyTime.Percent);
                            keyFrame._Resolved = true;
                        }
                    }
                    // if the last frame is KeyTime Uniform or Paced, resolve it to be equal to the total interpolation time
                    if(len > 0) {
                        keyFrame = arr[len - 1];
                        keyTime = keyFrame.KeyTime;
                        if(keyTime.IsPaced || keyTime.IsUniform) {
                            keyFrame._ResolvedKeyTime = totalInterpolationTime;
                            keyFrame._Resolved = true;
                        }
                    }
                    /* if the first frame is KeyTime Paced:
                    **   1. if there is only 1 frame, its KeyTime is the total interpolation time.
                    **   2. if there is more than 1 frame, its KeyTime is 0.
                    **
                    ** note 1 is handled in the above block so we only have to
                    ** handle 2 here.
                    */
                    if(len > 0) {
                        keyFrame = arr[len - 1];
                        keyTime = keyFrame.KeyTime;
                        if(!keyFrame._Resolved && keyTime.IsPaced) {
                            keyFrame._ResolvedKeyTime = new TimeSpan();
                            keyFrame._Resolved = true;
                        }
                    }
                    // XXX resolve remaining KeyTime::Uniform frames
                    // XXX resolve frames with unspecified keytimes -- is this possible?  is the default keytime NULL?  it seems to be Uniform?
                    // XXX resolve remaining KeyTime::Paced frames */
                    return arr;
                };
                return KeyFrame;
            })(Fayde.DependencyObject);
            Animation.KeyFrame = KeyFrame;            
            Nullstone.RegisterType(KeyFrame, "KeyFrame");
            var KeyFrameCollection = (function (_super) {
                __extends(KeyFrameCollection, _super);
                function KeyFrameCollection() {
                    _super.apply(this, arguments);

                    this._Resolved = false;
                    //Defined in XamlObjectCollection
                    this._SortedList = [];
                }
                KeyFrameCollection.prototype.GetKeyFrameForTime = function (t, prevFrameRef) {
                    var currentKeyFrame = null;
                    var previousKeyFrame = null;
                    var i;
                    var sortedList = this._SortedList;
                    if(sortedList.length == 0) {
                        prevFrameRef.Value = null;
                        return null;
                    }
                    var keyFrame;
                    var valuePropd;
                    // Crawl forward to figure out what segment to use (this assumes the list is sorted)
                    for(i = 0; i < sortedList.length; i++) {
                        keyFrame = sortedList[i];
                        if(keyFrame.CompareToTimeSpan(t) >= 0 || (i + 1) >= sortedList.length) {
                            break;
                        }
                    }
                    // Crawl backward to find first non-null frame
                    for(; i >= 0; i--) {
                        keyFrame = sortedList[i];
                        valuePropd = DependencyProperty.GetDependencyProperty((keyFrame).constructor, "Value");
                        if(keyFrame._Store.GetValue(valuePropd) !== undefined) {
                            currentKeyFrame = keyFrame;
                            break;
                        }
                    }
                    // Crawl backward some more to find first non-null prev frame
                    for(i--; i >= 0; i--) {
                        keyFrame = sortedList[i];
                        valuePropd = DependencyProperty.GetDependencyProperty((keyFrame).constructor, "Value");
                        if(keyFrame._Store.GetValue(valuePropd) !== undefined) {
                            previousKeyFrame = keyFrame;
                            break;
                        }
                    }
                    prevFrameRef.Value = previousKeyFrame;
                    return currentKeyFrame;
                };
                KeyFrameCollection.prototype.Clear = function () {
                    this._Resolved = false;
                    this._SortedList = [];
                    return _super.prototype.Clear.call(this);
                };
                KeyFrameCollection.prototype.AddedToCollection = function (value, error) {
                    if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                        return false;
                    }
                    this._Resolved = false;
                    value.Listen(this);
                    return true;
                };
                KeyFrameCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                    _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                    this._Resolved = false;
                    value.Unlisten(this);
                };
                KeyFrameCollection.prototype.KeyFrameChanged = function (source) {
                    this._Resolved = false;
                };
                KeyFrameCollection.ResolveKeyFrames = function ResolveKeyFrames(animation, coll) {
                    if(coll._Resolved) {
                        return coll._SortedList;
                    }
                    coll._SortedList = KeyFrame.ResolveKeyFrames(animation, coll._ht).slice(0);
                    coll._SortedList.sort(KeyFrame.Comparer);
                    coll._Resolved = true;
                    return coll._SortedList;
                };
                return KeyFrameCollection;
            })(Fayde.XamlObjectCollection);
            Animation.KeyFrameCollection = KeyFrameCollection;            
            Nullstone.RegisterType(KeyFrameCollection, "KeyFrameCollection");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=KeyFrame.js.map
