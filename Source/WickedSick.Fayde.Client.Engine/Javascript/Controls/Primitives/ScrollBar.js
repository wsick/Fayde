/// <reference path="RangeBase.js"/>
/// CODE
/// <reference path="ScrollEventArgs.js"/>
/// <reference path="Enums.js"/>
/// <reference path="DragStartedEventArgs.js"/>
/// <reference path="DragDeltaEventArgs.js"/>
/// <reference path="DragCompletedEventArgs.js"/>

(function (namespace) {
    var ScrollBar = Nullstone.Create("ScrollBar", namespace.RangeBase);

    ScrollBar.Instance.Init = function () {
        this.Init$RangeBase();
        this.Scroll = new MulticastEvent();
        this.SizeChanged.Subscribe(this._HandleSizeChanged, this);
        this.DefaultStyleKey = this.constructor;
    };

    //#region Properties

    ScrollBar._OnOrientationPropertyChanged = function (d, args) {
        d._OnOrientationChanged();
    };
    ScrollBar.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Orientation); }, ScrollBar, Orientation.Horizontal, ScrollBar._OnOrientationPropertyChanged);

    ScrollBar._OnViewportSizePropertyChanged = function (d, args) {
        d._UpdateTrackLayout(d._GetTrackLength());
    };
    ScrollBar.ViewportSizeProperty = DependencyProperty.Register("ViewportSize", function () { return Number; }, ScrollBar, 0, ScrollBar._OnViewportSizePropertyChanged);

    Nullstone.AutoProperties(ScrollBar, [
        ScrollBar.OrientationProperty,
        ScrollBar.ViewportSizeProperty
    ]);

    ScrollBar.Instance.GetIsDragging = function () {
        ///<returns type="Boolean"></returns>
        if (this.$ElementHorizontalThumb)
            return this.$ElementHorizontalThumb.IsDragging;
        if (this.$ElementVerticalThumb)
            return this.$ElementVerticalThumb.IsDragging;
        return false;
    };

    //#endregion

    ScrollBar.Instance.OnApplyTemplate = function () {
        this.OnApplyTemplate$RangeBase();
        this.$ElementHorizontalTemplate = Nullstone.As(this.GetTemplateChild("HorizontalRoot"), FrameworkElement);
        this.$ElementHorizontalLargeIncrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeIncrease"), namespace.RepeatButton);
        this.$ElementHorizontalLargeDecrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeDecrease"), namespace.RepeatButton);
        this.$ElementHorizontalSmallIncrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallIncrease"), namespace.RepeatButton);
        this.$ElementHorizontalSmallDecrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallDecrease"), namespace.RepeatButton);
        this.$ElementHorizontalThumb = Nullstone.As(this.GetTemplateChild("HorizontalThumb"), namespace.Thumb);
        this.$ElementVerticalTemplate = Nullstone.As(this.GetTemplateChild("VerticalRoot"), FrameworkElement);
        this.$ElementVerticalLargeIncrease = Nullstone.As(this.GetTemplateChild("VerticalLargeIncrease"), namespace.RepeatButton);
        this.$ElementVerticalLargeDecrease = Nullstone.As(this.GetTemplateChild("VerticalLargeDecrease"), namespace.RepeatButton);
        this.$ElementVerticalSmallIncrease = Nullstone.As(this.GetTemplateChild("VerticalSmallIncrease"), namespace.RepeatButton);
        this.$ElementVerticalSmallDecrease = Nullstone.As(this.GetTemplateChild("VerticalSmallDecrease"), namespace.RepeatButton);
        this.$ElementVerticalThumb = Nullstone.As(this.GetTemplateChild("VerticalThumb"), namespace.Thumb);

        if (this.$ElementHorizontalThumb) {
            this.$ElementHorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
            this.$ElementHorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
            this.$ElementHorizontalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
        }
        if (this.$ElementHorizontalLargeIncrease) {
            this.$ElementHorizontalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
        }
        if (this.$ElementHorizontalLargeDecrease) {
            this.$ElementHorizontalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
        }
        if (this.$ElementHorizontalSmallIncrease) {
            this.$ElementHorizontalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
        }
        if (this.$ElementHorizontalSmallDecrease) {
            this.$ElementHorizontalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
        }
        if (this.$ElementVerticalThumb) {
            this.$ElementVerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
            this.$ElementVerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
            this.$ElementVerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
        }
        if (this.$ElementVerticalLargeIncrease) {
            this.$ElementVerticalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
        }
        if (this.$ElementVerticalLargeDecrease) {
            this.$ElementVerticalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
        }
        if (this.$ElementVerticalSmallIncrease) {
            this.$ElementVerticalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
        }
        if (this.$ElementVerticalSmallDecrease) {
            this.$ElementVerticalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
        }

        this._OnOrientationChanged();
        this.$UpdateVisualState(false);
    };

    //#region Interaction

    ScrollBar.Instance.OnIsEnabledChanged = function (args) {
        this.OnIsEnabledChanged$RangeBase(args);
        this.$UpdateVisualState();
    };
    ScrollBar.Instance.OnLostMouseCapture = function (sender, args) {
        this.OnLostMouseCapture$RangeBase(sender, args);
        this.$UpdateVisualState();
    };
    ScrollBar.Instance.OnMouseEnter = function (args) {
        this.OnMouseEnter$RangeBase(args);
        var orientation = this.Orientation;
        var shouldUpdate = false;
        if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb && !this.$ElementHorizontalThumb.IsDragging)
            shouldUpdate = true;
        if (orientation === Orientation.Vertical && this.$ElementVerticalThumb && !this.$ElementVerticalThumb.IsDragging)
            shouldUpdate = true;
        if (shouldUpdate)
            this.$UpdateVisualState();
    };
    ScrollBar.Instance.OnMouseLeave = function (args) {
        this.OnMouseLeave$RangeBase(args);
        var orientation = this.Orientation;
        var shouldUpdate = false;
        if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb && !this.$ElementHorizontalThumb.IsDragging)
            shouldUpdate = true;
        if (orientation === Orientation.Vertical && this.$ElementVerticalThumb && !this.$ElementVerticalThumb.IsDragging)
            shouldUpdate = true;
        if (shouldUpdate)
            this.$UpdateVisualState();
    };
    ScrollBar.Instance.OnMouseLeftButtonDown = function (sender, args) {
        this.OnMouseLeftButtonDown$RangeBase(sender, args);
        if (args.Handled)
            return;
        args.Handled = true;
        this.CaptureMouse();
    };
    ScrollBar.Instance.OnMouseLeftButtonUp = function (sender, args) {
        this.OnMouseLeftButtonUp$RangeBase(sender, args);
        if (args.Handled)
            return;
        args.Handled = true;
        this.ReleaseMouseCapture();
        this.$UpdateVisualState();
    };

    //#endregion

    //#region RangeBase Changes

    ScrollBar.Instance.$OnMaximumChanged = function (oldMax, newMax) {
        var trackLength = this._GetTrackLength();
        this.$OnMaximumChanged$RangeBase(oldMax, newMax);
        this._UpdateTrackLayout(trackLength);
    };
    ScrollBar.Instance.$OnMinimumChanged = function (oldMin, newMin) {
        var trackLength = this._GetTrackLength();
        this.$OnMinimumChanged$RangeBase(oldMin, newMin);
        this._UpdateTrackLayout(trackLength);
    };
    ScrollBar.Instance.$OnValueChanged = function (oldValue, newValue) {
        var trackLength = this._GetTrackLength();
        this.$OnValueChanged$RangeBase(oldValue, newValue);
        this._UpdateTrackLayout(trackLength);
    };

    //#endregion

    //#region Thumb Drag

    ScrollBar.Instance._OnThumbDragStarted = function (sender, args) {
        /// <param name="args" type="DragStartedEventArgs"></param>
        this._DragValue = this.Value;
    };
    ScrollBar.Instance._OnThumbDragDelta = function (sender, args) {
        /// <param name="args" type="DragDeltaEventArgs"></param>
        var change = 0;
        var zoomFactor = 1; //TODO: FullScreen?
        var num = zoomFactor;
        var max = this.Maximum;
        var min = this.Minimum;
        var diff = max - min;
        var trackLength = this._GetTrackLength();
        var orientation = this.Orientation;
        if (this.$ElementVerticalThumb && orientation === Orientation.Vertical) {
            change = num * args.VerticalChange / (trackLength - this.$ElementVerticalThumb.ActualHeight) * diff;
        }
        if (this.$ElementHorizontalThumb && orientation === Orientation.Horizontal) {
            change = num * args.HorizontalChange / (trackLength - this.$ElementHorizontalThumb.ActualWidth) * diff;
        }
        if (!isNaN(change) && isFinite(change)) {
            this._DragValue += change;
            var num1 = Math.min(max, Math.max(min, this._DragValue));
            if (num1 !== this.Value) {
                this.Value = num1;
                this._RaiseScroll(ScrollEventType.ThumbTrack);
            }
        }
    };
    ScrollBar.Instance._OnThumbDragCompleted = function (sender, args) {
        /// <param name="args" type="DragCompletedEventArgs"></param>
        this._RaiseScroll(ScrollEventType.EndScroll);
    };

    //#endregion

    //#region Movement

    ScrollBar.Instance._SmallDecrement = function (sender, args) {
        var curValue = this.Value;
        var num = Math.max(curValue - this.SmallChange, this.Minimum);
        if (curValue !== num) {
            this.Value = num;
            this._RaiseScroll(ScrollEventType.SmallDecrement);
        }
    };
    ScrollBar.Instance._SmallIncrement = function (sender, args) {
        var curValue = this.Value;
        var num = Math.min(curValue + this.SmallChange, this.Maximum);
        if (curValue !== num) {
            this.Value = num;
            this._RaiseScroll(ScrollEventType.SmallIncrement);
        }
    };
    ScrollBar.Instance._LargeDecrement = function (sender, args) {
        var curValue = this.Value;
        var num = Math.max(curValue - this.LargeChange, this.Minimum);
        if (curValue !== num) {
            this.Value = num;
            this._RaiseScroll(ScrollEventType.LargeDecrement);
        }
    };
    ScrollBar.Instance._LargeIncrement = function (sender, args) {
        var curValue = this.Value;
        var num = Math.min(curValue + this.LargeChange, this.Maximum);
        if (curValue !== num) {
            this.Value = num;
            this._RaiseScroll(ScrollEventType.LargeIncrement);
        }
    };

    //#endregion

    ScrollBar.Instance._HandleSizeChanged = function () {
        this._UpdateTrackLayout(this._GetTrackLength());
    };
    ScrollBar.Instance._OnOrientationChanged = function () {
        var orientation = this.Orientation;
        if (this.$ElementHorizontalTemplate) {
            this.$ElementHorizontalTemplate.Visibility = orientation === Orientation.Horizontal ? Visibility.Visible : Visibility.Collapsed;
        }
        if (this.$ElementVerticalTemplate) {
            this.$ElementVerticalTemplate.Visibility = orientation === Orientation.Horizontal ? Visibility.Collapsed : Visibility.Visible;
        }
        this._UpdateTrackLayout(this._GetTrackLength());
    };
    ScrollBar.Instance._UpdateTrackLayout = function (trackLength) {
        var max = this.Maximum;
        var min = this.Minimum;
        var val = this.Value;
        var multiplier = (val - min) / (max - min);
        var thumbSize = this._UpdateThumbSize(trackLength);

        var orientation = this.Orientation;
        if (orientation === Orientation.Horizontal && this.$ElementHorizontalLargeDecrease && this.$ElementHorizontalThumb) {
            this.$ElementHorizontalLargeDecrease.Width = Math.max(0, multiplier * (trackLength - thumbSize));
        } else if (orientation === Orientation.Vertical && this.$ElementVerticalLargeDecrease && this.$ElementVerticalThumb) {
            this.$ElementVerticalLargeDecrease.Height = Math.max(0, multiplier * (trackLength - thumbSize));
        }
    };
    ScrollBar.Instance._UpdateThumbSize = function (trackLength) {
        var result = Number.NaN;
        var hideThumb = trackLength <= 0;
        if (trackLength > 0) {
            var orientation = this.Orientation;
            var max = this.Maximum;
            var min = this.Minimum;
            if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb) {
                if (max - min !== 0)
                    result = Math.max(this.$ElementHorizontalThumb.MinWidth, this._ConvertViewportSizeToDisplayUnits(trackLength));
                if (max - min === 0 || result > this.ActualWidth || trackLength <= this.$ElementHorizontalThumb.MinWidth) {
                    hideThumb = true;
                } else {
                    this.$ElementHorizontalThumb.Visibility = Visibility.Visible;
                    this.$ElementHorizontalThumb.Width = result;
                }
            } else if (orientation === Orientation.Vertical && this.$ElementVerticalThumb) {
                if (max - min !== 0)
                    result = Math.max(this.$ElementVerticalThumb.MinHeight, this._ConvertViewportSizeToDisplayUnits(trackLength));
                if (max - min === 0 || result > this.ActualHeight || trackLength <= this.$ElementVerticalThumb.MinHeight) {
                    hideThumb = true;
                } else {
                    this.$ElementVerticalThumb.Visibility = Visibility.Visible;
                    this.$ElementVerticalThumb.Height = result;
                }
            }
        }
        if (hideThumb) {
            if (this.$ElementHorizontalThumb) {
                this.$ElementHorizontalThumb.Visibility = Visibility.Collapsed;
            }
            if (this.$ElementVerticalThumb) {
                this.$ElementVerticalThumb.Visibility = Visibility.Collapsed;
            }
        }
        return result;
    };
    ScrollBar.Instance._GetTrackLength = function () {
        var actual = NaN;
        if (this.Orientation === Orientation.Horizontal) {
            actual = this.ActualWidth;
            if (this.$ElementHorizontalSmallDecrease) {
                var thickness = this.$ElementHorizontalSmallDecrease.Margin;
                actual = actual - (this.$ElementHorizontalSmallDecrease.ActualWidth + thickness.Left + thickness.Right);
            }
            if (this.$ElementHorizontalSmallIncrease) {
                var thickness = this.$ElementHorizontalSmallIncrease.Margin;
                actual = actual - (this.$ElementHorizontalSmallIncrease.ActualWidth + thickness.Left + thickness.Right);
            }
        } else {
            actual = this.ActualHeight;
            if (this.$ElementVerticalSmallDecrease) {
                var thickness = this.$ElementVerticalSmallDecrease.Margin;
                actual = actual - (this.$ElementVerticalSmallDecrease.ActualHeight + thickness.Top + thickness.Bottom);
            }
            if (this.$ElementVerticalSmallIncrease) {
                var thickness = this.$ElementVerticalSmallIncrease.Margin;
                actual = actual - (this.$ElementVerticalSmallIncrease.ActualHeight + thickness.Top + thickness.Bottom);
            }
        }
        return actual;
    };
    ScrollBar.Instance._ConvertViewportSizeToDisplayUnits = function (trackLength) {
        var viewportSize = this.ViewportSize;
        return trackLength * viewportSize / (viewportSize + this.Maximum - this.Minimum);
    };

    ScrollBar.Instance._RaiseScroll = function (scrollEvtType) {
        var args = new namespace.ScrollEventArgs(scrollEvtType, this.Value);
        args.OriginalSource = this;
        this.Scroll.Raise(this, args);
    };

    namespace.ScrollBar = Nullstone.FinishCreate(ScrollBar);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));