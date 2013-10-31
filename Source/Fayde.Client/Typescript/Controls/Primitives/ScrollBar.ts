/// <reference path="RangeBase.ts" />

module Fayde.Controls.Primitives {
    export class ScrollBar extends RangeBase {
        private _DragValue: number = 0;

        Scroll: RoutedEvent<ScrollEventArgs> = new RoutedEvent<ScrollEventArgs>();

        static OrientationProperty: DependencyProperty = DependencyProperty.Register("Orientation", () => new Enum(Orientation), ScrollBar, Orientation.Horizontal, (d, args) => (<ScrollBar>d)._OnOrientationChanged());
        static ViewportSizeProperty: DependencyProperty = DependencyProperty.Register("ViewportSize", () => Number, ScrollBar, 0, (d, args) => (<ScrollBar>d)._UpdateTrackLayout((<ScrollBar>d)._GetTrackLength()));
        Orientation: Orientation;
        ViewportSize: number;

        get IsDragging(): boolean {
            if (this.$HorizontalThumb)
                return this.$HorizontalThumb.IsDragging;
            if (this.$VerticalThumb)
                return this.$VerticalThumb.IsDragging;
            return false;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.SizeChanged.Subscribe(this._HandleSizeChanged, this);
        }

        private $HorizontalTemplate: FrameworkElement;
        private $HorizontalSmallIncrease: RepeatButton;
        private $HorizontalSmallDecrease: RepeatButton;
        private $HorizontalLargeIncrease: RepeatButton;
        private $HorizontalLargeDecrease: RepeatButton;
        private $HorizontalThumb: Thumb;

        private $VerticalTemplate: FrameworkElement;
        private $VerticalSmallIncrease: RepeatButton;
        private $VerticalSmallDecrease: RepeatButton;
        private $VerticalLargeIncrease: RepeatButton;
        private $VerticalLargeDecrease: RepeatButton;
        private $VerticalThumb: Thumb;
        
        private _GetChildOfType(name: string, type: Function): any {
            var temp = this.GetTemplateChild(name);
            if (temp instanceof type)
                return temp;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.$HorizontalTemplate = this._GetChildOfType("HorizontalRoot", FrameworkElement);
            this.$HorizontalLargeIncrease = this._GetChildOfType("HorizontalLargeIncrease", RepeatButton);
            this.$HorizontalLargeDecrease = this._GetChildOfType("HorizontalLargeDecrease", RepeatButton);
            this.$HorizontalSmallIncrease = this._GetChildOfType("HorizontalSmallIncrease", RepeatButton);
            this.$HorizontalSmallDecrease = this._GetChildOfType("HorizontalSmallDecrease", RepeatButton);
            this.$HorizontalThumb = this._GetChildOfType("HorizontalThumb", Thumb);
            this.$VerticalTemplate = this._GetChildOfType("VerticalRoot", Fayde.FrameworkElement);
            this.$VerticalLargeIncrease = this._GetChildOfType("VerticalLargeIncrease", RepeatButton);
            this.$VerticalLargeDecrease = this._GetChildOfType("VerticalLargeDecrease", RepeatButton);
            this.$VerticalSmallIncrease = this._GetChildOfType("VerticalSmallIncrease", RepeatButton);
            this.$VerticalSmallDecrease = this._GetChildOfType("VerticalSmallDecrease", RepeatButton);
            this.$VerticalThumb = this._GetChildOfType("VerticalThumb", Thumb);

            if (this.$HorizontalThumb) {
                this.$HorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                this.$HorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                this.$HorizontalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
            }
            if (this.$HorizontalLargeIncrease) {
                this.$HorizontalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
            }
            if (this.$HorizontalLargeDecrease) {
                this.$HorizontalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
            }
            if (this.$HorizontalSmallIncrease) {
                this.$HorizontalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
            }
            if (this.$HorizontalSmallDecrease) {
                this.$HorizontalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
            }
            if (this.$VerticalThumb) {
                this.$VerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
                this.$VerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
                this.$VerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
            }
            if (this.$VerticalLargeIncrease) {
                this.$VerticalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
            }
            if (this.$VerticalLargeDecrease) {
                this.$VerticalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
            }
            if (this.$VerticalSmallIncrease) {
                this.$VerticalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
            }
            if (this.$VerticalSmallDecrease) {
                this.$VerticalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
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
            if (this.$VerticalThumb && !isHorizontal) {
                change = num * e.VerticalChange / (trackLength - this.$VerticalThumb.ActualHeight) * diff;
            }
            if (this.$HorizontalThumb && isHorizontal) {
                change = num * e.HorizontalChange / (trackLength - this.$HorizontalThumb.ActualWidth) * diff;
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
            if (this.$HorizontalTemplate) {
                this.$HorizontalTemplate.Visibility = isHorizontal ? Visibility.Visible : Visibility.Collapsed;
            }
            if (this.$VerticalTemplate) {
                this.$VerticalTemplate.Visibility = isHorizontal ? Visibility.Collapsed : Visibility.Visible;
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
            if (isHorizontal && this.$HorizontalLargeDecrease && this.$HorizontalThumb) {
                this.$HorizontalLargeDecrease.Width = Math.max(0, multiplier * (trackLength - thumbSize));
            } else if (!isHorizontal && this.$VerticalLargeDecrease && this.$VerticalThumb) {
                this.$VerticalLargeDecrease.Height = Math.max(0, multiplier * (trackLength - thumbSize));
            }
        }
        private _UpdateThumbSize(trackLength: number): number {
            var result = Number.NaN;
            var hideThumb = trackLength <= 0;
            if (trackLength > 0) {
                var isHorizontal = this.Orientation === Orientation.Horizontal;
                var max = this.Maximum;
                var min = this.Minimum;
                if (isHorizontal && this.$HorizontalThumb) {
                    if (max - min !== 0)
                        result = Math.max(this.$HorizontalThumb.MinWidth, this._ConvertViewportSizeToDisplayUnits(trackLength));
                    if (max - min === 0 || result > this.ActualWidth || trackLength <= this.$HorizontalThumb.MinWidth) {
                        hideThumb = true;
                    } else {
                        this.$HorizontalThumb.Visibility = Visibility.Visible;
                        this.$HorizontalThumb.Width = result;
                    }
                } else if (!isHorizontal && this.$VerticalThumb) {
                    if (max - min !== 0)
                        result = Math.max(this.$VerticalThumb.MinHeight, this._ConvertViewportSizeToDisplayUnits(trackLength));
                    if (max - min === 0 || result > this.ActualHeight || trackLength <= this.$VerticalThumb.MinHeight) {
                        hideThumb = true;
                    } else {
                        this.$VerticalThumb.Visibility = Visibility.Visible;
                        this.$VerticalThumb.Height = result;
                    }
                }
            }
            if (hideThumb) {
                if (this.$HorizontalThumb) {
                    this.$HorizontalThumb.Visibility = Visibility.Collapsed;
                }
                if (this.$VerticalThumb) {
                    this.$VerticalThumb.Visibility = Visibility.Collapsed;
                }
            }
            return result;
        }
        private _GetTrackLength(): number {
            var actual = NaN;
            if (this.Orientation === Orientation.Horizontal) {
                actual = this.ActualWidth;
                if (this.$HorizontalSmallDecrease) {
                    var thickness = this.$HorizontalSmallDecrease.Margin;
                    actual = actual - (this.$HorizontalSmallDecrease.ActualWidth + thickness.Left + thickness.Right);
                }
                if (this.$HorizontalSmallIncrease) {
                    var thickness = this.$HorizontalSmallIncrease.Margin;
                    actual = actual - (this.$HorizontalSmallIncrease.ActualWidth + thickness.Left + thickness.Right);
                }
            } else {
                actual = this.ActualHeight;
                if (this.$VerticalSmallDecrease) {
                    var thickness = this.$VerticalSmallDecrease.Margin;
                    actual = actual - (this.$VerticalSmallDecrease.ActualHeight + thickness.Top + thickness.Bottom);
                }
                if (this.$VerticalSmallIncrease) {
                    var thickness = this.$VerticalSmallIncrease.Margin;
                    actual = actual - (this.$VerticalSmallIncrease.ActualHeight + thickness.Top + thickness.Bottom);
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
    Fayde.RegisterType(ScrollBar, {
    	Name: "ScrollBar",
    	Namespace: "Fayde.Controls.Primitives",
    	XmlNamespace: Fayde.XMLNS
    });
}