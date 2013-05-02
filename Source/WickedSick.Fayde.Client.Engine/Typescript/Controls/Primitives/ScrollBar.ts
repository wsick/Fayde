/// <reference path="RangeBase.ts" />
/// CODE
/// <reference path="RepeatButton.ts" />
/// <reference path="Thumb.ts" />
/// <reference path="ScrollEventArgs.ts" />

module Fayde.Controls.Primitives {
    export class ScrollBar extends RangeBase {
        private _DragValue: number = 0;

        Scroll: RoutedEvent = new RoutedEvent();

        static OrientationProperty: DependencyProperty = DependencyProperty.Register("Orientation", () => new Enum(Orientation), ScrollBar, Orientation.Horizontal, (d, args) => (<ScrollBar>d)._OnOrientationChanged());
        static ViewportSizeProperty: DependencyProperty = DependencyProperty.Register("ViewportSize", () => Number, ScrollBar, 0, (d, args) => (<ScrollBar>d)._UpdateTrackLayout((<ScrollBar>d)._GetTrackLength()));
        Orientation: Orientation;
        ViewportSize: number;

        get IsDragging(): bool {
            if (this.$ElementHorizontalThumb)
                return this.$ElementHorizontalThumb.IsDragging;
            if (this.$ElementVerticalThumb)
                return this.$ElementVerticalThumb.IsDragging;
            return false;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.SizeChanged.Subscribe(this._HandleSizeChanged, this);
        }

        private $ElementHorizontalTemplate: FrameworkElement;
        private $ElementHorizontalSmallIncrease: RepeatButton;
        private $ElementHorizontalSmallDecrease: RepeatButton;
        private $ElementHorizontalLargeIncrease: RepeatButton;
        private $ElementHorizontalLargeDecrease: RepeatButton;
        private $ElementHorizontalThumb: Thumb;

        private $ElementVerticalTemplate: FrameworkElement;
        private $ElementVerticalSmallIncrease: RepeatButton;
        private $ElementVerticalSmallDecrease: RepeatButton;
        private $ElementVerticalLargeIncrease: RepeatButton;
        private $ElementVerticalLargeDecrease: RepeatButton;
        private $ElementVerticalThumb: Thumb;
        
        private _GetChildOfType(name: string, type: Function): any {
            var temp = this.GetTemplateChild(name);
            if (temp instanceof type)
                return temp;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.$ElementHorizontalTemplate = this._GetChildOfType("HorizontalRoot", FrameworkElement);
            this.$ElementHorizontalLargeIncrease = this._GetChildOfType("HorizontalLargeIncrease", RepeatButton);
            this.$ElementHorizontalLargeDecrease = this._GetChildOfType("HorizontalLargeDecrease", RepeatButton);
            this.$ElementHorizontalSmallIncrease = this._GetChildOfType("HorizontalSmallIncrease", RepeatButton);
            this.$ElementHorizontalSmallDecrease = this._GetChildOfType("HorizontalSmallDecrease", RepeatButton);
            this.$ElementHorizontalThumb = this._GetChildOfType("HorizontalThumb", Thumb);
            this.$ElementVerticalTemplate = this._GetChildOfType("VerticalRoot", Fayde.FrameworkElement);
            this.$ElementVerticalLargeIncrease = this._GetChildOfType("VerticalLargeIncrease", RepeatButton);
            this.$ElementVerticalLargeDecrease = this._GetChildOfType("VerticalLargeDecrease", RepeatButton);
            this.$ElementVerticalSmallIncrease = this._GetChildOfType("VerticalSmallIncrease", RepeatButton);
            this.$ElementVerticalSmallDecrease = this._GetChildOfType("VerticalSmallDecrease", RepeatButton);
            this.$ElementVerticalThumb = this._GetChildOfType("VerticalThumb", Thumb);

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
            this.UpdateVisualState(false);
        }

        OnMaximumChanged(oldMax: number, newMax: number) {
            var trackLength = this._GetTrackLength();
            super.OnMaximumChanged(oldMax, newMax);
            this._UpdateTrackLayout(trackLength);
        }
        OnMinimumChanged(oldMin: number, newMin: number) {
            var trackLength = this._GetTrackLength();
            super.OnMinimumChanged(oldMin, newMin);
            this._UpdateTrackLayout(trackLength);
        }
        OnValueChanged(oldValue: number, newValue: number) {
            var trackLength = this._GetTrackLength();
            super.OnValueChanged(oldValue, newValue);
            this._UpdateTrackLayout(trackLength);
        }

        private _OnThumbDragStarted(sender, e: DragStartedEventArgs) {
            this._DragValue = this.Value;
        }
        private _OnThumbDragDelta(sender, e: DragDeltaEventArgs) {
            var change = 0;
            var zoomFactor = 1; //TODO: FullScreen?
            var num = zoomFactor;
            var max = this.Maximum;
            var min = this.Minimum;
            var diff = max - min;
            var trackLength = this._GetTrackLength();
            var isHorizontal = this.Orientation === Orientation.Horizontal;
            if (this.$ElementVerticalThumb && !isHorizontal) {
                change = num * e.VerticalChange / (trackLength - this.$ElementVerticalThumb.ActualHeight) * diff;
            }
            if (this.$ElementHorizontalThumb && isHorizontal) {
                change = num * e.HorizontalChange / (trackLength - this.$ElementHorizontalThumb.ActualWidth) * diff;
            }
            if (!isNaN(change) && isFinite(change)) {
                this._DragValue += change;
                var num1 = Math.min(max, Math.max(min, this._DragValue));
                if (num1 !== this.Value) {
                    this.Value = num1;
                    this._RaiseScroll(ScrollEventType.ThumbTrack);
                }
            }
        }
        private _OnThumbDragCompleted(sender, e: DragCompletedEventArgs) {
            this._RaiseScroll(ScrollEventType.EndScroll);
        }

        private _SmallDecrement(sender, e: RoutedEventArgs) {
            var curValue = this.Value;
            var num = Math.max(curValue - this.SmallChange, this.Minimum);
            if (curValue !== num) {
                this.Value = num;
                this._RaiseScroll(ScrollEventType.SmallDecrement);
            }
        }
        private _SmallIncrement(sender, e: RoutedEventArgs) {
            var curValue = this.Value;
            var num = Math.min(curValue + this.SmallChange, this.Maximum);
            if (curValue !== num) {
                this.Value = num;
                this._RaiseScroll(ScrollEventType.SmallIncrement);
            }
        }
        private _LargeDecrement(sender, e: RoutedEventArgs) {
            var curValue = this.Value;
            var num = Math.max(curValue - this.LargeChange, this.Minimum);
            if (curValue !== num) {
                this.Value = num;
                this._RaiseScroll(ScrollEventType.LargeDecrement);
            }
        }
        private _LargeIncrement(sender, e: RoutedEventArgs) {
            var curValue = this.Value;
            var num = Math.min(curValue + this.LargeChange, this.Maximum);
            if (curValue !== num) {
                this.Value = num;
                this._RaiseScroll(ScrollEventType.LargeIncrement);
            }
        }

        private _HandleSizeChanged(sender, e: EventArgs) {
            this._UpdateTrackLayout(this._GetTrackLength());
        }
        private _OnOrientationChanged() {
            var isHorizontal = this.Orientation === Orientation.Horizontal;
            if (this.$ElementHorizontalTemplate) {
                this.$ElementHorizontalTemplate.Visibility = isHorizontal ? Visibility.Visible : Visibility.Collapsed;
            }
            if (this.$ElementVerticalTemplate) {
                this.$ElementVerticalTemplate.Visibility = isHorizontal ? Visibility.Collapsed : Visibility.Visible;
            }
            this._UpdateTrackLayout(this._GetTrackLength());
        }
        private _UpdateTrackLayout(trackLength: number) {
            var max = this.Maximum;
            var min = this.Minimum;
            var val = this.Value;
            var multiplier = (val - min) / (max - min);
            var thumbSize = this._UpdateThumbSize(trackLength);

            var isHorizontal = this.Orientation === Orientation.Horizontal;
            if (isHorizontal && this.$ElementHorizontalLargeDecrease && this.$ElementHorizontalThumb) {
                this.$ElementHorizontalLargeDecrease.Width = Math.max(0, multiplier * (trackLength - thumbSize));
            } else if (!isHorizontal && this.$ElementVerticalLargeDecrease && this.$ElementVerticalThumb) {
                this.$ElementVerticalLargeDecrease.Height = Math.max(0, multiplier * (trackLength - thumbSize));
            }
        }
        private _UpdateThumbSize(trackLength: number): number {
            var result = Number.NaN;
            var hideThumb = trackLength <= 0;
            if (trackLength > 0) {
                var isHorizontal = this.Orientation === Orientation.Horizontal;
                var max = this.Maximum;
                var min = this.Minimum;
                if (isHorizontal && this.$ElementHorizontalThumb) {
                    if (max - min !== 0)
                        result = Math.max(this.$ElementHorizontalThumb.MinWidth, this._ConvertViewportSizeToDisplayUnits(trackLength));
                    if (max - min === 0 || result > this.ActualWidth || trackLength <= this.$ElementHorizontalThumb.MinWidth) {
                        hideThumb = true;
                    } else {
                        this.$ElementHorizontalThumb.Visibility = Visibility.Visible;
                        this.$ElementHorizontalThumb.Width = result;
                    }
                } else if (!isHorizontal && this.$ElementVerticalThumb) {
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
        }
        private _GetTrackLength(): number {
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
        }
        private _ConvertViewportSizeToDisplayUnits(trackLength: number): number {
            var viewportSize = this.ViewportSize;
            return trackLength * viewportSize / (viewportSize + this.Maximum - this.Minimum);
        }
        private _RaiseScroll(type: Primitives.ScrollEventType) {
            var args = new ScrollEventArgs(type, this.Value);
            args.OriginalSource = this;
            this.Scroll.Raise(this, args);
        }
    }
    Nullstone.RegisterType(ScrollBar, "ScrollBar");
}