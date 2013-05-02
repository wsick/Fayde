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
                        if(this.$ElementHorizontalThumb) {
                            return this.$ElementHorizontalThumb.IsDragging;
                        }
                        if(this.$ElementVerticalThumb) {
                            return this.$ElementVerticalThumb.IsDragging;
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
                    this.$ElementHorizontalTemplate = this._GetChildOfType("HorizontalRoot", Fayde.FrameworkElement);
                    this.$ElementHorizontalLargeIncrease = this._GetChildOfType("HorizontalLargeIncrease", Primitives.RepeatButton);
                    this.$ElementHorizontalLargeDecrease = this._GetChildOfType("HorizontalLargeDecrease", Primitives.RepeatButton);
                    this.$ElementHorizontalSmallIncrease = this._GetChildOfType("HorizontalSmallIncrease", Primitives.RepeatButton);
                    this.$ElementHorizontalSmallDecrease = this._GetChildOfType("HorizontalSmallDecrease", Primitives.RepeatButton);
                    this.$ElementHorizontalThumb = this._GetChildOfType("HorizontalThumb", Primitives.Thumb);
                    this.$ElementVerticalTemplate = this._GetChildOfType("VerticalRoot", Fayde.FrameworkElement);
                    this.$ElementVerticalLargeIncrease = this._GetChildOfType("VerticalLargeIncrease", Primitives.RepeatButton);
                    this.$ElementVerticalLargeDecrease = this._GetChildOfType("VerticalLargeDecrease", Primitives.RepeatButton);
                    this.$ElementVerticalSmallIncrease = this._GetChildOfType("VerticalSmallIncrease", Primitives.RepeatButton);
                    this.$ElementVerticalSmallDecrease = this._GetChildOfType("VerticalSmallDecrease", Primitives.RepeatButton);
                    this.$ElementVerticalThumb = this._GetChildOfType("VerticalThumb", Primitives.Thumb);
                    if(this.$ElementHorizontalThumb) {
                        this.$ElementHorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                        this.$ElementHorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                        this.$ElementHorizontalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
                    }
                    if(this.$ElementHorizontalLargeIncrease) {
                        this.$ElementHorizontalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
                    }
                    if(this.$ElementHorizontalLargeDecrease) {
                        this.$ElementHorizontalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
                    }
                    if(this.$ElementHorizontalSmallIncrease) {
                        this.$ElementHorizontalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
                    }
                    if(this.$ElementHorizontalSmallDecrease) {
                        this.$ElementHorizontalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
                    }
                    if(this.$ElementVerticalThumb) {
                        this.$ElementVerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                        this.$ElementVerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                        this.$ElementVerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
                    }
                    if(this.$ElementVerticalLargeIncrease) {
                        this.$ElementVerticalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
                    }
                    if(this.$ElementVerticalLargeDecrease) {
                        this.$ElementVerticalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
                    }
                    if(this.$ElementVerticalSmallIncrease) {
                        this.$ElementVerticalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
                    }
                    if(this.$ElementVerticalSmallDecrease) {
                        this.$ElementVerticalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
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
                    if(this.$ElementVerticalThumb && !isHorizontal) {
                        change = num * e.VerticalChange / (trackLength - this.$ElementVerticalThumb.ActualHeight) * diff;
                    }
                    if(this.$ElementHorizontalThumb && isHorizontal) {
                        change = num * e.HorizontalChange / (trackLength - this.$ElementHorizontalThumb.ActualWidth) * diff;
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
                    if(this.$ElementHorizontalTemplate) {
                        this.$ElementHorizontalTemplate.Visibility = isHorizontal ? Fayde.Visibility.Visible : Fayde.Visibility.Collapsed;
                    }
                    if(this.$ElementVerticalTemplate) {
                        this.$ElementVerticalTemplate.Visibility = isHorizontal ? Fayde.Visibility.Collapsed : Fayde.Visibility.Visible;
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
                    if(isHorizontal && this.$ElementHorizontalLargeDecrease && this.$ElementHorizontalThumb) {
                        this.$ElementHorizontalLargeDecrease.Width = Math.max(0, multiplier * (trackLength - thumbSize));
                    } else if(!isHorizontal && this.$ElementVerticalLargeDecrease && this.$ElementVerticalThumb) {
                        this.$ElementVerticalLargeDecrease.Height = Math.max(0, multiplier * (trackLength - thumbSize));
                    }
                };
                ScrollBar.prototype._UpdateThumbSize = function (trackLength) {
                    var result = Number.NaN;
                    var hideThumb = trackLength <= 0;
                    if(trackLength > 0) {
                        var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                        var max = this.Maximum;
                        var min = this.Minimum;
                        if(isHorizontal && this.$ElementHorizontalThumb) {
                            if(max - min !== 0) {
                                result = Math.max(this.$ElementHorizontalThumb.MinWidth, this._ConvertViewportSizeToDisplayUnits(trackLength));
                            }
                            if(max - min === 0 || result > this.ActualWidth || trackLength <= this.$ElementHorizontalThumb.MinWidth) {
                                hideThumb = true;
                            } else {
                                this.$ElementHorizontalThumb.Visibility = Fayde.Visibility.Visible;
                                this.$ElementHorizontalThumb.Width = result;
                            }
                        } else if(!isHorizontal && this.$ElementVerticalThumb) {
                            if(max - min !== 0) {
                                result = Math.max(this.$ElementVerticalThumb.MinHeight, this._ConvertViewportSizeToDisplayUnits(trackLength));
                            }
                            if(max - min === 0 || result > this.ActualHeight || trackLength <= this.$ElementVerticalThumb.MinHeight) {
                                hideThumb = true;
                            } else {
                                this.$ElementVerticalThumb.Visibility = Fayde.Visibility.Visible;
                                this.$ElementVerticalThumb.Height = result;
                            }
                        }
                    }
                    if(hideThumb) {
                        if(this.$ElementHorizontalThumb) {
                            this.$ElementHorizontalThumb.Visibility = Fayde.Visibility.Collapsed;
                        }
                        if(this.$ElementVerticalThumb) {
                            this.$ElementVerticalThumb.Visibility = Fayde.Visibility.Collapsed;
                        }
                    }
                    return result;
                };
                ScrollBar.prototype._GetTrackLength = function () {
                    var actual = NaN;
                    if(this.Orientation === Fayde.Orientation.Horizontal) {
                        actual = this.ActualWidth;
                        if(this.$ElementHorizontalSmallDecrease) {
                            var thickness = this.$ElementHorizontalSmallDecrease.Margin;
                            actual = actual - (this.$ElementHorizontalSmallDecrease.ActualWidth + thickness.Left + thickness.Right);
                        }
                        if(this.$ElementHorizontalSmallIncrease) {
                            var thickness = this.$ElementHorizontalSmallIncrease.Margin;
                            actual = actual - (this.$ElementHorizontalSmallIncrease.ActualWidth + thickness.Left + thickness.Right);
                        }
                    } else {
                        actual = this.ActualHeight;
                        if(this.$ElementVerticalSmallDecrease) {
                            var thickness = this.$ElementVerticalSmallDecrease.Margin;
                            actual = actual - (this.$ElementVerticalSmallDecrease.ActualHeight + thickness.Top + thickness.Bottom);
                        }
                        if(this.$ElementVerticalSmallIncrease) {
                            var thickness = this.$ElementVerticalSmallIncrease.Margin;
                            actual = actual - (this.$ElementVerticalSmallIncrease.ActualHeight + thickness.Top + thickness.Bottom);
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
