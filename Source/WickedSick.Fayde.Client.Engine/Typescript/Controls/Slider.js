var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Primitives/RangeBase.ts" />
    /// CODE
    /// <reference path="Primitives/RepeatButton.ts" />
    /// <reference path="Primitives/Thumb.ts" />
    (function (Controls) {
        var Slider = (function (_super) {
            __extends(Slider, _super);
            function Slider() {
                        _super.call(this);
                this._DragValue = 0;
                this.DefaultStyleKey = (this).constructor;
            }
            Slider.IsDirectionReversedProperty = DependencyProperty.RegisterCore("IsDirectionReversed", function () {
                return Boolean;
            }, Slider, false, function (d, args) {
                return (d)._UpdateTrackLayout();
            });
            Slider.IsFocusedProperty = DependencyProperty.RegisterReadOnlyCore("IsFocused", function () {
                return Boolean;
            }, Slider, false, function (d, args) {
                return (d).UpdateVisualState();
            });
            Slider.OrientationProperty = DependencyProperty.RegisterCore("Orientation", function () {
                return new Enum(Fayde.Orientation);
            }, Slider, Fayde.Orientation.Horizontal, function (d, args) {
                return (d)._OnOrientationChanged();
            });
            Slider.prototype._GetChildOfType = function (name, type) {
                var temp = this.GetTemplateChild(name);
                if(temp instanceof type) {
                    return temp;
                }
            };
            Slider.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this.$HorizontalTemplate = this._GetChildOfType("HorizontalTemplate", Fayde.FrameworkElement);
                this.$HorizontalLargeIncrease = this._GetChildOfType("HorizontalTrackLargeChangeIncreaseRepeatButton", Controls.Primitives.RepeatButton);
                this.$HorizontalLargeDecrease = this._GetChildOfType("HorizontalTrackLargeChangeDecreaseRepeatButton", Controls.Primitives.RepeatButton);
                this.$HorizontalThumb = this._GetChildOfType("HorizontalThumb", Controls.Primitives.Thumb);
                this.$VerticalTemplate = this._GetChildOfType("VerticalTemplate", Fayde.FrameworkElement);
                this.$VerticalLargeIncrease = this._GetChildOfType("VerticalTrackLargeChangeIncreaseRepeatButton", Controls.Primitives.RepeatButton);
                this.$VerticalLargeDecrease = this._GetChildOfType("VerticalTrackLargeChangeDecreaseRepeatButton", Controls.Primitives.RepeatButton);
                this.$VerticalThumb = this._GetChildOfType("VerticalThumb", Controls.Primitives.Thumb);
                if(this.$HorizontalThumb != null) {
                    this.$HorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                    this.$HorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                }
                if(this.$HorizontalLargeDecrease != null) {
                    this.$HorizontalLargeDecrease.Click.Subscribe(function (sender, e) {
                        this.Focus();
                        this.Value -= this.LargeChange;
                    }, this);
                }
                if(this.$HorizontalLargeIncrease != null) {
                    this.$HorizontalLargeIncrease.Click.Subscribe(function (sender, e) {
                        this.Focus();
                        this.Value += this.LargeChange;
                    }, this);
                }
                if(this.$VerticalThumb != null) {
                    this.$VerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                    this.$VerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                }
                if(this.$VerticalLargeDecrease != null) {
                    this.$VerticalLargeDecrease.Click.Subscribe(function (sender, e) {
                        this.Focus();
                        this.Value -= this.LargeChange;
                    }, this);
                }
                if(this.$VerticalLargeIncrease != null) {
                    this.$VerticalLargeIncrease.Click.Subscribe(function (sender, e) {
                        this.Focus();
                        this.Value += this.LargeChange;
                    }, this);
                }
                this._OnOrientationChanged();
                this.UpdateVisualState(false);
            };
            Slider.prototype.OnIsEnabledChanged = function (e) {
                _super.prototype.OnIsEnabledChanged.call(this, e);
                this.UpdateVisualState();
            };
            Slider.prototype.OnMinimumChanged = function (oldMin, newMin) {
                _super.prototype.OnMinimumChanged.call(this, oldMin, newMin);
                this._UpdateTrackLayout();
            };
            Slider.prototype.OnMaximumChanged = function (oldMax, newMax) {
                _super.prototype.OnMaximumChanged.call(this, oldMax, newMax);
                this._UpdateTrackLayout();
            };
            Slider.prototype.OnValueChanged = function (oldValue, newValue) {
                _super.prototype.OnValueChanged.call(this, oldValue, newValue);
                this._UpdateTrackLayout();
            };
            Slider.prototype._OnOrientationChanged = function () {
                var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                if(this.$HorizontalTemplate != null) {
                    this.$HorizontalTemplate.Visibility = isHorizontal ? Fayde.Visibility.Visible : Fayde.Visibility.Collapsed;
                }
                if(this.$VerticalTemplate != null) {
                    this.$VerticalTemplate.Visibility = !isHorizontal ? Fayde.Visibility.Visible : Fayde.Visibility.Collapsed;
                }
                this._UpdateTrackLayout();
            };
            Slider.prototype._UpdateTrackLayout = function () {
                var max = this.Maximum;
                var min = this.Minimum;
                var val = this.Value;
                var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                var temp = isHorizontal ? this.$HorizontalTemplate : this.$VerticalTemplate;
                if(!(temp instanceof Controls.Grid)) {
                    return;
                }
                var templateGrid = temp;
                var isReversed = this.IsDirectionReversed;
                var largeDecrease;
                var largeIncrease;
                var thumb;
                if(isHorizontal) {
                    var coldefs = templateGrid.ColumnDefinitions;
                    largeDecrease = this.$HorizontalLargeDecrease;
                    largeIncrease = this.$HorizontalLargeIncrease;
                    thumb = this.$HorizontalThumb;
                    if(coldefs && coldefs.Count === 3) {
                        (coldefs.GetValueAt(0)).Width = new Controls.GridLength(1, isReversed ? Controls.GridUnitType.Star : Controls.GridUnitType.Auto);
                        (coldefs.GetValueAt(2)).Width = new Controls.GridLength(1, isReversed ? Controls.GridUnitType.Auto : Controls.GridUnitType.Star);
                        if(largeDecrease != null) {
                            Controls.Grid.SetColumn(largeDecrease, isReversed ? 2 : 0);
                        }
                        if(largeIncrease != null) {
                            Controls.Grid.SetColumn(largeIncrease, isReversed ? 0 : 2);
                        }
                    }
                } else {
                    var rowdefs = templateGrid.RowDefinitions;
                    largeDecrease = this.$VerticalLargeDecrease;
                    largeIncrease = this.$VerticalLargeIncrease;
                    thumb = this.$VerticalThumb;
                    if(rowdefs && rowdefs.Count === 3) {
                        (rowdefs.GetValueAt(0)).Height = new Controls.GridLength(1, isReversed ? Controls.GridUnitType.Auto : Controls.GridUnitType.Star);
                        (rowdefs.GetValueAt(2)).Height = new Controls.GridLength(1, isReversed ? Controls.GridUnitType.Star : Controls.GridUnitType.Auto);
                        if(largeDecrease != null) {
                            Controls.Grid.SetRow(largeDecrease, isReversed ? 0 : 2);
                        }
                        if(largeIncrease != null) {
                            Controls.Grid.SetRow(largeIncrease, isReversed ? 2 : 0);
                        }
                    }
                }
                if(max === min) {
                    return;
                }
                var percent = val / (max - min);
                if(largeDecrease != null && thumb != null) {
                    if(isHorizontal) {
                        largeDecrease.Width = Math.max(0, percent * (this.ActualWidth - thumb.ActualWidth));
                    } else {
                        largeDecrease.Height = Math.max(0, percent * (this.ActualHeight - thumb.ActualHeight));
                    }
                }
            };
            Slider.prototype._OnThumbDragStarted = function (sender, e) {
                this.Focus();
                this._DragValue = this.Value;
            };
            Slider.prototype._OnThumbDragDelta = function (sender, e) {
                var offset = 0;
                var isHorizontal = this.Orientation === Fayde.Orientation.Horizontal;
                if(isHorizontal && this.$HorizontalThumb != null) {
                    offset = e.HorizontalChange / (this.ActualWidth - this.$HorizontalThumb.ActualWidth) * (this.Maximum - this.Minimum);
                } else if(!isHorizontal && this.$VerticalThumb != null) {
                    offset = -e.VerticalChange / (this.ActualHeight - this.$VerticalThumb.ActualHeight) * (this.Maximum - this.Minimum);
                }
                if(!isNaN(offset) && isFinite(offset)) {
                    this._DragValue += this.IsDirectionReversed ? -offset : offset;
                    var newValue = Math.min(this.Maximum, Math.max(this.Minimum, this._DragValue));
                    if(newValue != this.Value) {
                        this.Value = newValue;
                    }
                }
            };
            Slider.prototype.OnMouseEnter = function (e) {
                _super.prototype.OnMouseEnter.call(this, e);
                if((this.Orientation === Fayde.Orientation.Horizontal && this.$HorizontalThumb != null && this.$HorizontalThumb.IsDragging) || (this.Orientation === Fayde.Orientation.Vertical && this.$VerticalThumb != null && this.$VerticalThumb.IsDragging)) {
                    this.UpdateVisualState();
                }
            };
            Slider.prototype.OnMouseLeave = function (e) {
                _super.prototype.OnMouseLeave.call(this, e);
                if((this.Orientation === Fayde.Orientation.Horizontal && this.$HorizontalThumb != null && this.$HorizontalThumb.IsDragging) || (this.Orientation === Fayde.Orientation.Vertical && this.$VerticalThumb != null && this.$VerticalThumb.IsDragging)) {
                    this.UpdateVisualState();
                }
            };
            Slider.prototype.OnMouseLeftButtonDown = function (e) {
                _super.prototype.OnMouseLeftButtonDown.call(this, e);
                if(e.Handled) {
                    return;
                }
                e.Handled = true;
                this.Focus();
                this.CaptureMouse();
            };
            Slider.prototype.OnLostMouseCapture = function (e) {
                _super.prototype.OnLostMouseCapture.call(this, e);
                this.UpdateVisualState();
            };
            Slider.prototype.OnKeyDown = function (e) {
                _super.prototype.OnKeyDown.call(this, e);
                if(e.Handled) {
                    return;
                }
                if(!this.IsEnabled) {
                    return;
                }
                switch(e.Key) {
                    case Fayde.Input.Key.Left:
                    case Fayde.Input.Key.Down:
                        this.Value += (this.IsDirectionReversed ? this.SmallChange : -this.SmallChange);
                        break;
                    case Fayde.Input.Key.Right:
                    case Fayde.Input.Key.Up:
                        this.Value += (this.IsDirectionReversed ? -this.SmallChange : this.SmallChange);
                        break;
                    case Fayde.Input.Key.Home:
                        this.Value = this.Minimum;
                        break;
                    case Fayde.Input.Key.End:
                        this.Value = this.Maximum;
                        break;
                }
            };
            Slider.prototype.OnGotFocus = function (e) {
                _super.prototype.OnGotFocus.call(this, e);
                this.SetValueInternal(Slider.IsFocusedProperty, true);
            };
            Slider.prototype.OnLostFocus = function (e) {
                _super.prototype.OnLostFocus.call(this, e);
                this.SetValueInternal(Slider.IsFocusedProperty, false);
            };
            return Slider;
        })(Controls.Primitives.RangeBase);
        Controls.Slider = Slider;        
        Nullstone.RegisterType(Slider, "Slider");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Slider.js.map
