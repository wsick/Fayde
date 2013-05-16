var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ContentControl.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    /// <reference path="Primitives/ScrollEventArgs.ts" />
    /// <reference path="Primitives/ScrollBar.ts" />
    /// <reference path="ScrollContentPresenter.ts" />
    (function (Controls) {
        var ScrollViewer = (function (_super) {
            __extends(ScrollViewer, _super);
            function ScrollViewer() {
                        _super.call(this);
                this.$TemplatedParentHandlesScrolling = false;
                //this.RequestBringIntoView.Subscribe(this._OnRequestBringIntoView, this);
                this.DefaultStyleKey = (this).constructor;
            }
            ScrollViewer._ScrollBarVisibilityChanged = function _ScrollBarVisibilityChanged(d, args) {
                if(!d) {
                    return;
                }
                if(d instanceof ScrollViewer) {
                    var sv = d;
                    sv.XamlNode.LayoutUpdater.InvalidateMeasure();
                    var scrollInfo = sv.ScrollInfo;
                    if(scrollInfo) {
                        scrollInfo.CanHorizontallyScroll = sv.HorizontalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                        scrollInfo.CanVerticallyScroll = sv.VerticalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                    }
                    sv._UpdateScrollBarVisibility();
                    return;
                }
                if(d instanceof Controls.ListBox) {
                    var listbox = d;
                    //if (listbox.$TemplateScrollViewer)
                    //listbox.$TemplateScrollViewer.SetValue(args.Property, args.NewValue);
                    return;
                }
            };
            ScrollViewer.HorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterAttachedCore("HorizontalScrollBarVisibility", function () {
                return new Enum(Controls.ScrollBarVisibility);
            }, ScrollViewer, Controls.ScrollBarVisibility.Disabled, ScrollViewer._ScrollBarVisibilityChanged);
            ScrollViewer.GetHorizontalScrollBarVisibility = function GetHorizontalScrollBarVisibility(d) {
                return d.GetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty);
            };
            ScrollViewer.SetHorizontalScrollBarVisibility = function SetHorizontalScrollBarVisibility(d, value) {
                d.SetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty, value);
            };
            Object.defineProperty(ScrollViewer.prototype, "HorizontalScrollBarVisibility", {
                get: function () {
                    return this.GetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty);
                },
                set: function (value) {
                    this.SetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            ScrollViewer.VerticalScrollBarVisibilityProperty = DependencyProperty.RegisterAttachedCore("VerticalScrollBarVisibility", function () {
                return new Enum(Controls.ScrollBarVisibility);
            }, ScrollViewer, Controls.ScrollBarVisibility.Disabled, ScrollViewer._ScrollBarVisibilityChanged);
            ScrollViewer.GetVerticalScrollBarVisibility = function GetVerticalScrollBarVisibility(d) {
                return d.GetValue(ScrollViewer.VerticalScrollBarVisibilityProperty);
            };
            ScrollViewer.SetVerticalScrollBarVisibility = function SetVerticalScrollBarVisibility(d, value) {
                d.SetValue(ScrollViewer.VerticalScrollBarVisibilityProperty, value);
            };
            Object.defineProperty(ScrollViewer.prototype, "VerticalScrollBarVisibility", {
                get: function () {
                    return this.GetValue(ScrollViewer.VerticalScrollBarVisibilityProperty);
                },
                set: function (value) {
                    this.SetValue(ScrollViewer.VerticalScrollBarVisibilityProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterReadOnlyCore("ComputedHorizontalScrollBarVisibility", function () {
                return new Enum(Fayde.Visibility);
            }, ScrollViewer);
            ScrollViewer.ComputedVerticalScrollBarVisibilityProperty = DependencyProperty.RegisterReadOnlyCore("ComputedVerticalScrollBarVisibility", function () {
                return new Enum(Fayde.Visibility);
            }, ScrollViewer);
            ScrollViewer.HorizontalOffsetProperty = DependencyProperty.RegisterReadOnlyCore("HorizontalOffset", function () {
                return Number;
            }, ScrollViewer);
            ScrollViewer.VerticalOffsetProperty = DependencyProperty.RegisterReadOnlyCore("VerticalOffset", function () {
                return Number;
            }, ScrollViewer);
            ScrollViewer.ScrollableWidthProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableWidth", function () {
                return Number;
            }, ScrollViewer);
            ScrollViewer.ScrollableHeightProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableHeight", function () {
                return Number;
            }, ScrollViewer);
            ScrollViewer.ViewportWidthProperty = DependencyProperty.RegisterReadOnlyCore("ViewportWidth", function () {
                return Number;
            }, ScrollViewer);
            ScrollViewer.ViewportHeightProperty = DependencyProperty.RegisterReadOnlyCore("ViewportHeight", function () {
                return Number;
            }, ScrollViewer);
            ScrollViewer.ExtentWidthProperty = DependencyProperty.RegisterReadOnlyCore("ExtentWidth", function () {
                return Number;
            }, ScrollViewer);
            ScrollViewer.ExtentHeightProperty = DependencyProperty.RegisterReadOnlyCore("ExtentHeight", function () {
                return Number;
            }, ScrollViewer);
            Object.defineProperty(ScrollViewer.prototype, "ScrollInfo", {
                get: function () {
                    return this._ScrollInfo;
                },
                set: function (value) {
                    this._ScrollInfo = value;
                    if(value) {
                        value.CanHorizontallyScroll = this.HorizontalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                        value.CanVerticallyScroll = this.VerticalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ScrollViewer.prototype.InvalidateScrollInfo = function () {
                var scrollInfo = this.ScrollInfo;
                if(scrollInfo) {
                    this.SetValueInternal(ScrollViewer.ExtentWidthProperty, scrollInfo.ExtentWidth);
                    this.SetValueInternal(ScrollViewer.ExtentHeightProperty, scrollInfo.ExtentHeight);
                    this.SetValueInternal(ScrollViewer.ViewportWidthProperty, scrollInfo.ViewportWidth);
                    this.SetValueInternal(ScrollViewer.ViewportHeightProperty, scrollInfo.ViewportHeight);
                    this._UpdateScrollBar(Fayde.Orientation.Horizontal, scrollInfo.HorizontalOffset);
                    this._UpdateScrollBar(Fayde.Orientation.Vertical, scrollInfo.VerticalOffset);
                    this._UpdateScrollBarVisibility();
                }
                var lu = this.XamlNode.LayoutUpdater;
                var w = Math.max(0, this.ExtentWidth - this.ViewportWidth);
                if(w !== this.ScrollableWidth) {
                    this.SetValueInternal(ScrollViewer.ScrollableWidthProperty, w);
                    lu.InvalidateMeasure();
                }
                var h = Math.max(0, this.ExtentHeight - this.ViewportHeight);
                if(h !== this.ScrollableHeight) {
                    this.SetValueInternal(ScrollViewer.ScrollableHeightProperty, h);
                    lu.InvalidateMeasure();
                }
            };
            ScrollViewer.prototype._UpdateScrollBarVisibility = function () {
                var lu = this.XamlNode.LayoutUpdater;
                var scrollInfo = this.ScrollInfo;
                var horizontalVisibility = Fayde.Visibility.Visible;
                var hsbv = this.HorizontalScrollBarVisibility;
                switch(hsbv) {
                    case Controls.ScrollBarVisibility.Visible:
                        break;
                    case Controls.ScrollBarVisibility.Disabled:
                    case Controls.ScrollBarVisibility.Hidden:
                        horizontalVisibility = Fayde.Visibility.Collapsed;
                        break;
                    case Controls.ScrollBarVisibility.Auto:
                    default:
                        horizontalVisibility = (!scrollInfo || scrollInfo.ExtentWidth <= scrollInfo.ViewportWidth) ? Fayde.Visibility.Collapsed : Fayde.Visibility.Visible;
                        break;
                }
                if(horizontalVisibility !== this.ComputedHorizontalScrollBarVisibility) {
                    this.SetValueInternal(ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty, horizontalVisibility);
                    lu.InvalidateMeasure();
                }
                var verticalVisibility = Fayde.Visibility.Visible;
                var vsbv = this.VerticalScrollBarVisibility;
                switch(vsbv) {
                    case Controls.ScrollBarVisibility.Visible:
                        break;
                    case Controls.ScrollBarVisibility.Disabled:
                    case Controls.ScrollBarVisibility.Hidden:
                        verticalVisibility = Fayde.Visibility.Collapsed;
                        break;
                    case Controls.ScrollBarVisibility.Auto:
                    default:
                        verticalVisibility = (!scrollInfo || scrollInfo.ExtentHeight <= scrollInfo.ViewportHeight) ? Fayde.Visibility.Collapsed : Fayde.Visibility.Visible;
                        break;
                }
                if(verticalVisibility !== this.ComputedVerticalScrollBarVisibility) {
                    this.SetValueInternal(ScrollViewer.ComputedVerticalScrollBarVisibilityProperty, verticalVisibility);
                    lu.InvalidateMeasure();
                }
            };
            ScrollViewer.prototype._UpdateScrollBar = function (orientation, value) {
                try  {
                    var scrollInfo = this.ScrollInfo;
                    if(orientation === Fayde.Orientation.Horizontal) {
                        this.SetValueInternal(ScrollViewer.HorizontalOffsetProperty, value);
                        if(this.$HorizontalScrollBar) {
                            this.$HorizontalScrollBar.Value = value;
                        }
                    } else {
                        this.SetValueInternal(ScrollViewer.VerticalOffsetProperty, value);
                        if(this.$VerticalScrollBar) {
                            this.$VerticalScrollBar.Value = value;
                        }
                    }
                }finally {
                }
            };
            ScrollViewer.prototype._GetChildOfType = function (name, type) {
                var temp = this.GetTemplateChild(name);
                if(temp instanceof type) {
                    return temp;
                }
            };
            ScrollViewer.prototype.OnApplyTemplate = function () {
                var _this = this;
                _super.prototype.OnApplyTemplate.call(this);
                this.$ScrollContentPresenter = this._GetChildOfType("ScrollContentPresenter", Controls.ScrollContentPresenter);
                this.$HorizontalScrollBar = this._GetChildOfType("HorizontalScrollBar", Controls.Primitives.ScrollBar);
                if(this.$HorizontalScrollBar) {
                    this.$HorizontalScrollBar.Scroll.Subscribe(function (sender, e) {
                        return _this._HandleScroll(Fayde.Orientation.Horizontal, e);
                    }, this);
                }
                this.$VerticalScrollBar = this._GetChildOfType("VerticalScrollBar", Controls.Primitives.ScrollBar);
                if(this.$VerticalScrollBar) {
                    this.$VerticalScrollBar.Scroll.Subscribe(function (sender, e) {
                        return _this._HandleScroll(Fayde.Orientation.Vertical, e);
                    }, this);
                }
                this._UpdateScrollBarVisibility();
            };
            ScrollViewer.prototype.OnMouseLeftButtonDown = function (e) {
                if(!e.Handled && this.Focus()) {
                    e.Handled = true;
                }
                _super.prototype.OnMouseLeftButtonDown.call(this, e);
            };
            ScrollViewer.prototype.OnMouseWheel = function (e) {
                _super.prototype.OnMouseWheel.call(this, e);
                if(e.Handled) {
                    return;
                }
                var scrollInfo = this.ScrollInfo;
                if(!scrollInfo) {
                    return;
                }
                if((e.Delta > 0 && scrollInfo.VerticalOffset !== 0) || (e.Delta < 0 && scrollInfo.VerticalOffset < this.ScrollableHeight)) {
                    if(e.Delta >= 0) {
                        scrollInfo.MouseWheelUp();
                    } else {
                        scrollInfo.MouseWheelDown();
                    }
                    e.Handled = true;
                }
            };
            ScrollViewer.prototype.OnKeyDown = function (e) {
                _super.prototype.OnKeyDown.call(this, e);
                this._HandleKeyDown(e);
            };
            ScrollViewer.prototype._HandleKeyDown = function (e) {
                if(e.Handled) {
                    return;
                }
                if(!this.$TemplatedParentHandlesScrolling) {
                    return;
                }
                var orientation = Fayde.Orientation.Vertical;
                var scrollEventType = Controls.Primitives.ScrollEventType.ThumbTrack;
                //TODO: FlowDirection
                //var flowDirection = this.FlowDirection === Fayde.FlowDirection.RightToLeft;
                switch(e.Key) {
                    case Fayde.Input.Key.PageUp:
                        scrollEventType = Controls.Primitives.ScrollEventType.LargeDecrement;
                        break;
                    case Fayde.Input.Key.PageDown:
                        scrollEventType = Controls.Primitives.ScrollEventType.LargeIncrement;
                        break;
                    case Fayde.Input.Key.End:
                        if(!e.Modifiers.Ctrl) {
                            orientation = Fayde.Orientation.Horizontal;
                        }
                        scrollEventType = Controls.Primitives.ScrollEventType.Last;
                        break;
                    case Fayde.Input.Key.Home:
                        if(!e.Modifiers.Ctrl) {
                            orientation = Fayde.Orientation.Horizontal;
                        }
                        scrollEventType = Controls.Primitives.ScrollEventType.First;
                        break;
                    case Fayde.Input.Key.Left:
                        orientation = Fayde.Orientation.Horizontal;
                        scrollEventType = Controls.Primitives.ScrollEventType.SmallDecrement;
                    case Fayde.Input.Key.Up:
                        scrollEventType = Controls.Primitives.ScrollEventType.SmallDecrement;
                        break;
                    case Fayde.Input.Key.Right:
                        orientation = Fayde.Orientation.Horizontal;
                        scrollEventType = Controls.Primitives.ScrollEventType.SmallIncrement;
                    case Fayde.Input.Key.Down:
                        scrollEventType = Controls.Primitives.ScrollEventType.SmallIncrement;
                        break;
                }
                if(scrollEventType !== Controls.Primitives.ScrollEventType.ThumbTrack) {
                    this._HandleScroll(orientation, new Controls.Primitives.ScrollEventArgs(scrollEventType, 0));
                    e.Handled = true;
                }
            };
            ScrollViewer.prototype.ScrollInDirection = function (key) {
                switch(key) {
                    case Fayde.Input.Key.PageUp:
                        this.PageUp();
                        break;
                    case Fayde.Input.Key.PageDown:
                        this.PageDown();
                        break;
                    case Fayde.Input.Key.End:
                        this.PageEnd();
                        break;
                    case Fayde.Input.Key.Home:
                        this.PageHome();
                        break;
                    case Fayde.Input.Key.Left:
                        this.LineLeft();
                        break;
                    case Fayde.Input.Key.Up:
                        this.LineUp();
                        break;
                    case Fayde.Input.Key.Right:
                        this.LineRight();
                        break;
                    case Fayde.Input.Key.Down:
                        this.LineDown();
                        break;
                }
            };
            ScrollViewer.prototype.ScrollToHorizontalOffset = function (offset) {
                this._HandleHorizontalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.ThumbPosition, offset));
            };
            ScrollViewer.prototype.ScrollToVerticalOffset = function (offset) {
                this._HandleVerticalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.ThumbPosition, offset));
            };
            ScrollViewer.prototype.LineUp = function () {
                this._HandleVerticalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.SmallDecrement, 0));
            };
            ScrollViewer.prototype.LineDown = function () {
                this._HandleVerticalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.SmallIncrement, 0));
            };
            ScrollViewer.prototype.LineLeft = function () {
                this._HandleHorizontalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.SmallDecrement, 0));
            };
            ScrollViewer.prototype.LineRight = function () {
                this._HandleHorizontalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.SmallIncrement, 0));
            };
            ScrollViewer.prototype.PageHome = function () {
                this._HandleHorizontalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.First, 0));
            };
            ScrollViewer.prototype.PageEnd = function () {
                this._HandleHorizontalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.Last, 0));
            };
            ScrollViewer.prototype.PageUp = function () {
                this._HandleVerticalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.LargeDecrement, 0));
            };
            ScrollViewer.prototype.PageDown = function () {
                this._HandleVerticalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.LargeIncrement, 0));
            };
            ScrollViewer.prototype.PageLeft = function () {
                this._HandleHorizontalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.LargeDecrement, 0));
            };
            ScrollViewer.prototype.PageRight = function () {
                this._HandleHorizontalScroll(new Controls.Primitives.ScrollEventArgs(Controls.Primitives.ScrollEventType.LargeIncrement, 0));
            };
            ScrollViewer.prototype._HandleScroll = function (orientation, e) {
                if(orientation !== Fayde.Orientation.Horizontal) {
                    this._HandleVerticalScroll(e);
                } else {
                    this._HandleHorizontalScroll(e);
                }
            };
            ScrollViewer.prototype._HandleHorizontalScroll = function (e) {
                var scrollInfo = this.ScrollInfo;
                if(!scrollInfo) {
                    return;
                }
                var offset = scrollInfo.HorizontalOffset;
                var newValue = offset;
                switch(e.ScrollEventType) {
                    case Controls.Primitives.ScrollEventType.SmallDecrement:
                        scrollInfo.LineLeft();
                        break;
                    case Controls.Primitives.ScrollEventType.SmallIncrement:
                        scrollInfo.LineRight();
                        break;
                    case Controls.Primitives.ScrollEventType.LargeDecrement:
                        scrollInfo.PageLeft();
                        break;
                    case Controls.Primitives.ScrollEventType.LargeIncrement:
                        scrollInfo.PageRight();
                        break;
                    case Controls.Primitives.ScrollEventType.ThumbPosition:
                    case Controls.Primitives.ScrollEventType.ThumbTrack:
                        newValue = e.Value;
                        break;
                    case Controls.Primitives.ScrollEventType.First:
                        newValue = Number.NEGATIVE_INFINITY;
                        break;
                    case Controls.Primitives.ScrollEventType.Last:
                        newValue = Number.POSITIVE_INFINITY;
                        break;
                }
                newValue = Math.max(newValue, 0);
                newValue = Math.min(this.ScrollableWidth, newValue);
                if(!areNumbersClose(offset, newValue)) {
                    scrollInfo.SetHorizontalOffset(newValue);
                }
            };
            ScrollViewer.prototype._HandleVerticalScroll = function (e) {
                var scrollInfo = this.ScrollInfo;
                if(!scrollInfo) {
                    return;
                }
                var offset = scrollInfo.VerticalOffset;
                var newValue = offset;
                switch(e.ScrollEventType) {
                    case Controls.Primitives.ScrollEventType.SmallDecrement:
                        scrollInfo.LineUp();
                        break;
                    case Controls.Primitives.ScrollEventType.SmallIncrement:
                        scrollInfo.LineDown();
                        break;
                    case Controls.Primitives.ScrollEventType.LargeDecrement:
                        scrollInfo.PageUp();
                        break;
                    case Controls.Primitives.ScrollEventType.LargeIncrement:
                        scrollInfo.PageDown();
                        break;
                    case Controls.Primitives.ScrollEventType.ThumbPosition:
                    case Controls.Primitives.ScrollEventType.ThumbTrack:
                        newValue = e.Value;
                        break;
                    case Controls.Primitives.ScrollEventType.First:
                        newValue = Number.NEGATIVE_INFINITY;
                        break;
                    case Controls.Primitives.ScrollEventType.Last:
                        newValue = Number.POSITIVE_INFINITY;
                        break;
                }
                newValue = Math.max(newValue, 0);
                newValue = Math.min(this.ScrollableHeight, newValue);
                if(!areNumbersClose(offset, newValue)) {
                    scrollInfo.SetVerticalOffset(newValue);
                }
            };
            return ScrollViewer;
        })(Controls.ContentControl);
        Controls.ScrollViewer = ScrollViewer;        
        Nullstone.RegisterType(ScrollViewer, "ScrollViewer");
        function areNumbersClose(val1, val2) {
            if(val1 === val2) {
                return true;
            }
            var num1 = (Math.abs(val1) + Math.abs(val2) + 10) * 1.11022302462516e-16;
            var num2 = val1 - val2;
            return -num1 < num2 && num1 > num2;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ScrollViewer.js.map
