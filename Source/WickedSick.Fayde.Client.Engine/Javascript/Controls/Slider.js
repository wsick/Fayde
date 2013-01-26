/// <reference path="Primitives/RangeBase.js"/>
/// CODE
/// <reference path="Grid.js"/>
/// <reference path="GridLength.js"/>

(function (namespace) {
    var Slider = Nullstone.Create("Slider", namespace.Primitives.RangeBase);

    Slider.Instance.Init = function () {
        this.Init$RangeBase();
        this.DefaultStyleKey = this.constructor;

        this.SizeChanged.Subscribe(function () { this._UpdateTrackLayout(); }, this);
    };

    //#region Properties

    Slider.IsDirectionReversedPropertyChanged = function (d, args) {
        d._UpdateTrackLayout();
    };
    Slider.IsDirectionReversedProperty = DependencyProperty.RegisterCore("IsDirectionReversed", function () { return Boolean; }, Slider, false, Slider.IsDirectionReversedPropertyChanged);
    Slider.IsFocusedPropertyChanged = function (d, args) {
        d.$UpdateVisualState();
    };
    Slider.IsFocusedProperty = DependencyProperty.RegisterReadOnlyCore("IsFocused", function () { return Boolean; }, Slider, false, Slider.IsFocusedPropertyChanged);
    Slider.OrientationPropertyChanged = function (d, args) {
        d._OnOrientationChanged();
    };
    Slider.OrientationProperty = DependencyProperty.RegisterCore("Orientation", function () { return Orientation; }, Slider, Orientation.Horizontal, Slider.OrientationPropertyChanged);

    Nullstone.AutoProperties(Slider, [
        Slider.IsDirectionReversedProperty,
        Slider.OrientationProperty
    ]);
    Nullstone.AutoPropertyReadOnly(Slider, Slider.IsFocusedProperty, true);

    //#endregion

    Slider.Instance.OnApplyTemplate = function () {
        this.OnApplyTemplate$RangeBase();

        this.$HorizontalTemplate = Nullstone.As(this.GetTemplateChild("HorizontalTemplate"), FrameworkElement);
        this.$HorizontalLargeIncrease = Nullstone.As(this.GetTemplateChild("HorizontalTrackLargeChangeIncreaseRepeatButton"), namespace.Primitives.RepeatButton);
        this.$HorizontalLargeDecrease = Nullstone.As(this.GetTemplateChild("HorizontalTrackLargeChangeDecreaseRepeatButton"), namespace.Primitives.RepeatButton);
        this.$HorizontalThumb = Nullstone.As(this.GetTemplateChild("HorizontalThumb"), namespace.Primitives.Thumb);

        if (this.$HorizontalThumb != null) {
            this.$HorizontalThumb.DragStarted.Subscribe(function (sender, e) { this.Focus(); this._OnThumbDragStarted(); }, this);
            this.$HorizontalThumb.DragDelta.Subscribe(function (sender, e) { this._OnThumbDragDelta(e); }, this);
        }
        if (this.$HorizontalLargeDecrease != null) {
            this.$HorizontalLargeDecrease.Click.Subscribe(function (sender, e) { this.Focus(); this.Value -= this.LargeChange; }, this);
        }
        if (this.$HorizontalLargeIncrease != null) {
            this.$HorizontalLargeIncrease.Click.Subscribe(function (sender, e) { this.Focus(); this.Value += this.LargeChange; }, this);
        }

        this.$VerticalTemplate = Nullstone.As(this.GetTemplateChild("VerticalTemplate"), FrameworkElement);
        this.$VerticalLargeIncrease = Nullstone.As(this.GetTemplateChild("VerticalTrackLargeChangeIncreaseRepeatButton"), namespace.Primitives.RepeatButton);
        this.$VerticalLargeDecrease = Nullstone.As(this.GetTemplateChild("VerticalTrackLargeChangeDecreaseRepeatButton"), namespace.Primitives.RepeatButton);
        this.$VerticalThumb = Nullstone.As(this.GetTemplateChild("VerticalThumb"), namespace.Primitives.Thumb);

        if (this.$VerticalThumb != null) {
            this.$VerticalThumb.DragStarted.Subscribe(function (sender, e) { this.Focus(); this._OnThumbDragStarted(); }, this);
            this.$VerticalThumb.DragDelta.Subscribe(function (sender, e) { this._OnThumbDragDelta(e); }, this);
        }
        if (this.$VerticalLargeDecrease != null) {
            this.$VerticalLargeDecrease.Click.Subscribe(function (sender, e) { this.Focus(); this.Value -= this.LargeChange; }, this);
        }
        if (this.$VerticalLargeIncrease != null) {
            this.$VerticalLargeIncrease.Click.Subscribe(function (sender, e) { this.Focus(); this.Value += this.LargeChange; }, this);
        }

        this._OnOrientationChanged();
        this.$UpdateVisualState(false);
    };

    Slider.Instance.OnIsEnabledChanged = function (args) {
        this.OnIsEnabledChanged$RangeBase(args);
        this.$UpdateVisualState();
    };

    Slider.Instance.$OnMinimumChanged = function (oldMin, newMin) {
        this.$OnMinimumChanged$RangeBase(oldMin, newMin);
        this._UpdateTrackLayout();
    };
    Slider.Instance.$OnMaximumChanged = function (oldMax, newMax) {
        this.$OnMaximumChanged$RangeBase(oldMax, newMax);
        this._UpdateTrackLayout();
    };
    Slider.Instance.$OnValueChanged = function (oldValue, newValue) {
        this.$OnValueChanged$RangeBase(oldValue, newValue);
        this._UpdateTrackLayout();
    };

    Slider.Instance._OnOrientationChanged = function () {
        var isHorizontal = this.Orientation === Orientation.Horizontal;
        if (this.$HorizontalTemplate != null)
            this.$HorizontalTemplate.Visibility = isHorizontal ? Visibility.Visible : Visibility.Collapsed;
        if (this.$VerticalTemplate != null)
            this.$VerticalTemplate.Visibility = !isHorizontal ? Visibility.Visible : Visibility.Collapsed;
        this._UpdateTrackLayout();
    };
    Slider.Instance._UpdateTrackLayout = function () {
        var max = this.Maximum;
        var min = this.Minimum;
        var val = this.Value;

        var isHorizontal = this.Orientation === Orientation.Horizontal;
        var templateGrid = Nullstone.As(isHorizontal ? this.$HorizontalTemplate : this.$VerticalTemplate, namespace.Grid);
        if (templateGrid == null)
            return;

        var isReversed = this.IsDirectionReversed;
        var defs;
        var largeDecrease;
        var largeIncrease;
        var thumb;
        if (isHorizontal) {
            defs = templateGrid.ColumnDefinitions;
            largeDecrease = this.$HorizontalLargeDecrease;
            largeIncrease = this.$HorizontalLargeIncrease;
            thumb = this.$HorizontalThumb;
        } else {
            defs = templateGrid.RowDefinitions;
            largeDecrease = this.$VerticalLargeDecrease;
            largeIncrease = this.$VerticalLargeIncrease;
            thumb = this.$VerticalThumb;
        }

        if (defs != null && defs.GetCount() === 3) {
            if (isHorizontal) {
                defs.GetValueAt(0).Width = new namespace.GridLength(1, isReversed ? namespace.GridUnitType.Star : namespace.GridUnitType.Auto);
                defs.GetValueAt(2).Width = new namespace.GridLength(1, isReversed ? namespace.GridUnitType.Auto : namespace.GridUnitType.Star);

                if (largeDecrease != null)
                    namespace.Grid.SetColumn(largeDecrease, isReversed ? 2 : 0);
                if (largeIncrease != null)
                    namespace.Grid.SetColumn(largeIncrease, isReversed ? 0 : 2);
            } else {
                defs.GetValueAt(0).Height = new namespace.GridLength(1, isReversed ? namespace.GridUnitType.Auto : namespace.GridUnitType.Star);
                defs.GetValueAt(2).Height = new namespace.GridLength(1, isReversed ? namespace.GridUnitType.Star : namespace.GridUnitType.Auto);

                if (largeDecrease != null)
                    namespace.Grid.SetRow(largeDecrease, isReversed ? 0 : 2);
                if (largeIncrease != null)
                    namespace.Grid.SetRow(largeIncrease, isReversed ? 2 : 0);
            }
        }

        if (max === min)
            return;
        var percent = val / (max - min);
        if (largeDecrease != null && thumb != null) {
            if (isHorizontal)
                largeDecrease.Width = Math.max(0, percent * (this.ActualWidth - thumb.ActualWidth));
            else
                largeDecrease.Height = Math.max(0, percent * (this.ActualHeight - thumb.ActualHeight));
        }

    };

    Slider.Instance._OnThumbDragStarted = function () {
        this._DragValue = this.Value;
    };
    Slider.Instance._OnThumbDragDelta = function (e) {
        var offset = 0;
        if (this.Orientation === Orientation.Horizontal && this.$HorizontalThumb != null) {
            offset = e.HorizontalChange / (this.ActualWidth - this.$HorizontalThumb.ActualWidth) * (this.Maximum - this.Minimum);
        } else if (this.Orientation === Orientation.Vertical && this.$VerticalThumb != null) {
            offset = -e.VerticalChange / (this.ActualHeight - this.$VerticalThumb.ActualHeight) * (this.Maximum - this.Minimum);
        }
        if (!isNaN(offset) && isFinite(offset)) {
            this._DragValue += this.IsDirectionReversed ? -offset : offset;
            var newValue = Math.min(this.Maximum, Math.max(this.Minimum, this._DragValue));
            if (newValue != this.Value)
                this.Value = newValue;
        }
    };

    //#region Mouse Response

    Slider.Instance.OnMouseEnter = function (e) {
        this.OnMouseEnter$RangeBase(e);
        if ((this.Orientation === Orientation.Horizontal && this.$HorizontalThumb != null && this.$HorizontalThumb.IsDragging) ||
            (this.Orientation === Orientation.Vertical && this.$VerticalThumb != null && this.$VerticalThumb.IsDragging)) {
            this.$UpdateVisualState();
        }
    };
    Slider.Instance.OnMouseLeave = function (e) {
        this.OnMouseLeave$RangeBase(e);
        if ((this.Orientation === Orientation.Horizontal && this.$HorizontalThumb != null && this.$HorizontalThumb.IsDragging) ||
            (this.Orientation === Orientation.Vertical && this.$VerticalThumb != null && this.$VerticalThumb.IsDragging)) {
            this.$UpdateVisualState();
        }
    };
    Slider.Instance.OnMouseLeftButtonDown = function (e) {
        this.OnMouseLeftButtonDown$RangeBase(e);
        if (e.Handled)
            return;
        e.Handled = true;
        this.Focus();
        this.CaptureMouse();
    };
    Slider.Instance.OnLostMouseCapture = function (sender, e) {
        this.OnLostMouseCapture$RangeBase(sender, e);
        this.$UpdateVisualState();
    };

    //#endregion

    //#region Keyboard Response

    Slider.Instance.OnKeyDown = function (e) {
        this.OnKeyDown$RangeBase(e);
        if (e.Handled)
            return;
        if (!this.IsEnabled)
            return;

        switch (e.Key) {
            case Key.Left:
            case Key.Down:
                this.Value += (this.IsDirectionReversed ? this.SmallChange : -this.SmallChange);
                break;
            case Key.Right:
            case Key.Up:
                this.Value += (this.IsDirectionReversed ? -this.SmallChange : this.SmallChange);
                break;
            case Key.Home:
                this.Value = this.Minimum;
                break;
            case Key.End:
                this.Value = this.Maximum;
                break;
        }

    };

    //#endregion

    //#region Focus Response

    Slider.Instance.OnGotFocus = function (e) {
        this.OnGotFocus$RangeBase(e);
        this.$SetValueInternal(Slider.IsFocusedProperty, true);
    };
    Slider.Instance.OnLostFocus = function (e) {
        this.OnLostFocus$RangeBase(e);
        this.$SetValueInternal(Slider.IsFocusedProperty, false);
    };

    //#endregion

    namespace.Slider = Nullstone.FinishCreate(Slider);
})(Nullstone.Namespace("Fayde.Controls"));