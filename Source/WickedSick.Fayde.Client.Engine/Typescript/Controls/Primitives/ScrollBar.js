var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="RangeBase.ts" />
        /// CODE
        /// <reference path="RepeatButton.ts" />
        /// <reference path="Thumb.ts" />
        /// <reference path="ScrollEventArgs.ts" />
        (function (Primitives) {
            var ScrollBar = (function (_super) {
                __extends(ScrollBar, _super);
                function ScrollBar() {
                                _super.call(this);
                    this._DragValue = 0;
                    this.Scroll = new Fayde.RoutedEvent();
                    this.DefaultStyleKey = (this).constructor;
                    this.SizeChanged.Subscribe(this._HandleSizeChanged, this);
                }
                ScrollBar.OrientationProperty = DependencyProperty.Register("Orientation", function () {
                    return new Enum(Fayde.Orientation);
                }, ScrollBar, Fayde.Orientation.Horizontal, function (d, args) {
                    return (d)._OnOrientationChanged();
                });
                ScrollBar.ViewportSizeProperty = DependencyProperty.Register("ViewportSize", function () {
                    return Number;
                }, ScrollBar, 0, function (d, args) {
                    return (d)._UpdateTrackLayout((d)._GetTrackLength());
                });
                Object.defineProperty(ScrollBar.prototype, "IsDragging", {
                    get: function () {
                        if(this.$HorizontalThumb) {
                            return this.$HorizontalThumb.IsDragging;
                        }
                        if(this.$VerticalThumb) {
                            return this.$VerticalThumb.IsDragging;
                        }
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
                ScrollBar.prototype._GetChildOfType = function (name, type) {
                    var temp = this.GetTemplateChild(name);
                    if(temp instanceof type) {
                        return temp;
                    }
                };
                ScrollBar.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.$HorizontalTemplate = this._GetChildOfType("HorizontalRoot", Fayde.FrameworkElement);
                    this.$HorizontalLargeIncrease = this._GetChildOfType("HorizontalLargeIncrease", Primitives.RepeatButton);
                    this.$HorizontalLargeDecrease = this._GetChildOfType("HorizontalLargeDecrease", Primitives.RepeatButton);
                    this.$HorizontalSmallIncrease = this._GetChildOfType("HorizontalSmallIncrease", Primitives.RepeatButton);
                    this.$HorizontalSmallDecrease = this._GetChildOfType("HorizontalSmallDecrease", Primitives.RepeatButton);
                    this.$HorizontalThumb = this._GetChildOfType("HorizontalThumb", Primitives.Thumb);
                    this.$VerticalTemplate = this._GetChildOfType("VerticalRoot", Fayde.FrameworkElement);
                    this.$VerticalLargeIncrease = this._GetChildOfType("VerticalLargeIncrease", Primitives.RepeatButton);
                    this.$VerticalLargeDecrease = this._GetChildOfType("VerticalLargeDecrease", Primitives.RepeatButton);
                    this.$VerticalSmallIncrease = this._GetChildOfType("VerticalSmallIncrease", Primitives.RepeatButton);
                    this.$VerticalSmallDecrease = this._GetChildOfType("VerticalSmallDecrease", Primitives.RepeatButton);
                    this.$VerticalThumb = this._GetChildOfType("VerticalThumb", Primitives.Thumb);
                    if(this.$HorizontalThumb) {
                        this.$HorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                        this.$HorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                        this.$HorizontalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
                    }
                    if(this.$HorizontalLargeIncrease) {
                        this.$HorizontalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
                    }
                    if(this.$HorizontalLargeDecrease) {
                        this.$HorizontalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
                    }
                    if(this.$HorizontalSmallIncrease) {
                        this.$HorizontalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
                    }
                    if(this.$HorizontalSmallDecrease) {
                        this.$HorizontalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
                    }
                    if(this.$VerticalThumb) {
                        this.$VerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                        this.$VerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                        this.$VerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
                    }
                    if(this.$VerticalLargeIncrease) {
                        this.$VerticalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
                    }
                    if(this.$VerticalLargeDecrease) {
                        this.$VerticalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
                    }
                    if(this.$VerticalSmallIncrease) {
                        this.$VerticalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
                    }
                    if(this.$VerticalSmallDecrease) {
                        this.$VerticalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
                    }
                    this._OnOrientationChanged();
                    this.UpdateVisualState(false);
                };
                ScrollBar.prototype.OnMaximumChanged = function (oldMax, newMax) {
                    var trackLength = this._GetTrackLength();
                    _super.prototype.OnMaximumChanged.call(this, oldMax, newMax);
                    this._UpdateTrackLayout(trackLength);
                };
                ScrollBar.prototype.OnMinimumChanged = function (oldMin, newMin) {
                    var trackLength = this._GetTrackLength();
                    _super.prototype.OnMinimumChanged.call(this, oldMin, newMin);
                    this._UpdateTrackLayout(trackLength);
                };
                ScrollBar.prototype.OnValueChanged = function (oldValue, newValue) {
                    var trackLength = this._GetTrackLength();
                    _super.prototype.OnValueChanged.call(this, oldValue, newValue);
                    this._UpdateTrackLayout(trackLength);
                };
                ScrollBar.prototype._OnThumbDragStarted = function (sender, e) {
                    this._DragValue = this.Value;
                };
                ScrollBar.prototype._OnThumbDragDelta = function (sender, e) {
                    var change = 0;
                    var zoomFactor = 1;//TODO: FullScreen?
                    
                    var num = zoomFactor;
                    var max = this.Maximum;
                    var min = this.Minimum;
                    var diff = max - min;
                    var trackLength = this._GetTrackLength();
                    var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                    if(this.$VerticalThumb && !isHorizontal) {
                        change = num * e.VerticalChange / (trackLength - this.$VerticalThumb.ActualHeight) * diff;
                    }
                    if(this.$HorizontalThumb && isHorizontal) {
                        change = num * e.HorizontalChange / (trackLength - this.$HorizontalThumb.ActualWidth) * diff;
                    }
                    if(!isNaN(change) && isFinite(change)) {
                        this._DragValue += change;
                        var num1 = Math.min(max, Math.max(min, this._DragValue));
                        if(num1 !== this.Value) {
                            this.Value = num1;
                            this._RaiseScroll(Primitives.ScrollEventType.ThumbTrack);
                        }
                    }
                };
                ScrollBar.prototype._OnThumbDragCompleted = function (sender, e) {
                    this._RaiseScroll(Primitives.ScrollEventType.EndScroll);
                };
                ScrollBar.prototype._SmallDecrement = function (sender, e) {
                    var curValue = this.Value;
                    var num = Math.max(curValue - this.SmallChange, this.Minimum);
                    if(curValue !== num) {
                        this.Value = num;
                        this._RaiseScroll(Primitives.ScrollEventType.SmallDecrement);
                    }
                };
                ScrollBar.prototype._SmallIncrement = function (sender, e) {
                    var curValue = this.Value;
                    var num = Math.min(curValue + this.SmallChange, this.Maximum);
                    if(curValue !== num) {
                        this.Value = num;
                        this._RaiseScroll(Primitives.ScrollEventType.SmallIncrement);
                    }
                };
                ScrollBar.prototype._LargeDecrement = function (sender, e) {
                    var curValue = this.Value;
                    var num = Math.max(curValue - this.LargeChange, this.Minimum);
                    if(curValue !== num) {
                        this.Value = num;
                        this._RaiseScroll(Primitives.ScrollEventType.LargeDecrement);
                    }
                };
                ScrollBar.prototype._LargeIncrement = function (sender, e) {
                    var curValue = this.Value;
                    var num = Math.min(curValue + this.LargeChange, this.Maximum);
                    if(curValue !== num) {
                        this.Value = num;
                        this._RaiseScroll(Primitives.ScrollEventType.LargeIncrement);
                    }
                };
                ScrollBar.prototype._HandleSizeChanged = function (sender, e) {
                    this._UpdateTrackLayout(this._GetTrackLength());
                };
                ScrollBar.prototype._OnOrientationChanged = function () {
                    var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                    if(this.$HorizontalTemplate) {
                        this.$HorizontalTemplate.Visibility = isHorizontal ? Fayde.Visibility.Visible : Fayde.Visibility.Collapsed;
                    }
                    if(this.$VerticalTemplate) {
                        this.$VerticalTemplate.Visibility = isHorizontal ? Fayde.Visibility.Collapsed : Fayde.Visibility.Visible;
                    }
                    this._UpdateTrackLayout(this._GetTrackLength());
                };
                ScrollBar.prototype._UpdateTrackLayout = function (trackLength) {
                    var max = this.Maximum;
                    var min = this.Minimum;
                    var val = this.Value;
                    var multiplier = (val - min) / (max - min);
                    var thumbSize = this._UpdateThumbSize(trackLength);
                    var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                    if(isHorizontal && this.$HorizontalLargeDecrease && this.$HorizontalThumb) {
                        this.$HorizontalLargeDecrease.Width = Math.max(0, multiplier * (trackLength - thumbSize));
                    } else if(!isHorizontal && this.$VerticalLargeDecrease && this.$VerticalThumb) {
                        this.$VerticalLargeDecrease.Height = Math.max(0, multiplier * (trackLength - thumbSize));
                    }
                };
                ScrollBar.prototype._UpdateThumbSize = function (trackLength) {
                    var result = Number.NaN;
                    var hideThumb = trackLength <= 0;
                    if(trackLength > 0) {
                        var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                        var max = this.Maximum;
                        var min = this.Minimum;
                        if(isHorizontal && this.$HorizontalThumb) {
                            if(max - min !== 0) {
                                result = Math.max(this.$HorizontalThumb.MinWidth, this._ConvertViewportSizeToDisplayUnits(trackLength));
                            }
                            if(max - min === 0 || result > this.ActualWidth || trackLength <= this.$HorizontalThumb.MinWidth) {
                                hideThumb = true;
                            } else {
                                this.$HorizontalThumb.Visibility = Fayde.Visibility.Visible;
                                this.$HorizontalThumb.Width = result;
                            }
                        } else if(!isHorizontal && this.$VerticalThumb) {
                            if(max - min !== 0) {
                                result = Math.max(this.$VerticalThumb.MinHeight, this._ConvertViewportSizeToDisplayUnits(trackLength));
                            }
                            if(max - min === 0 || result > this.ActualHeight || trackLength <= this.$VerticalThumb.MinHeight) {
                                hideThumb = true;
                            } else {
                                this.$VerticalThumb.Visibility = Fayde.Visibility.Visible;
                                this.$VerticalThumb.Height = result;
                            }
                        }
                    }
                    if(hideThumb) {
                        if(this.$HorizontalThumb) {
                            this.$HorizontalThumb.Visibility = Fayde.Visibility.Collapsed;
                        }
                        if(this.$VerticalThumb) {
                            this.$VerticalThumb.Visibility = Fayde.Visibility.Collapsed;
                        }
                    }
                    return result;
                };
                ScrollBar.prototype._GetTrackLength = function () {
                    var actual = NaN;
                    if(this.Orientation === Fayde.Orientation.Horizontal) {
                        actual = this.ActualWidth;
                        if(this.$HorizontalSmallDecrease) {
                            var thickness = this.$HorizontalSmallDecrease.Margin;
                            actual = actual - (this.$HorizontalSmallDecrease.ActualWidth + thickness.Left + thickness.Right);
                        }
                        if(this.$HorizontalSmallIncrease) {
                            var thickness = this.$HorizontalSmallIncrease.Margin;
                            actual = actual - (this.$HorizontalSmallIncrease.ActualWidth + thickness.Left + thickness.Right);
                        }
                    } else {
                        actual = this.ActualHeight;
                        if(this.$VerticalSmallDecrease) {
                            var thickness = this.$VerticalSmallDecrease.Margin;
                            actual = actual - (this.$VerticalSmallDecrease.ActualHeight + thickness.Top + thickness.Bottom);
                        }
                        if(this.$VerticalSmallIncrease) {
                            var thickness = this.$VerticalSmallIncrease.Margin;
                            actual = actual - (this.$VerticalSmallIncrease.ActualHeight + thickness.Top + thickness.Bottom);
                        }
                    }
                    return actual;
                };
                ScrollBar.prototype._ConvertViewportSizeToDisplayUnits = function (trackLength) {
                    var viewportSize = this.ViewportSize;
                    return trackLength * viewportSize / (viewportSize + this.Maximum - this.Minimum);
                };
                ScrollBar.prototype._RaiseScroll = function (type) {
                    var args = new Primitives.ScrollEventArgs(type, this.Value);
                    args.OriginalSource = this;
                    this.Scroll.Raise(this, args);
                };
                return ScrollBar;
            })(Primitives.RangeBase);
            Primitives.ScrollBar = ScrollBar;            
            Nullstone.RegisterType(ScrollBar, "ScrollBar");
        })(Controls.Primitives || (Controls.Primitives = {}));
        var Primitives = Controls.Primitives;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ScrollBar.js.map
