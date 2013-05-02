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
    (function (Controls) {
        var ScrollViewer = (function (_super) {
            __extends(ScrollViewer, _super);
            function ScrollViewer() {
                        _super.call(this);
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
            ScrollViewer.VerticalScrollBarVisibilityProperty = DependencyProperty.RegisterAttachedCore("VerticalScrollBarVisibility", function () {
                return new Enum(Controls.ScrollBarVisibility);
            }, ScrollViewer, Controls.ScrollBarVisibility.Disabled, ScrollViewer._ScrollBarVisibilityChanged);
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
                //TODO: Implement
                            };
            ScrollViewer.prototype._UpdateScrollBarVisibility = function () {
            };
            return ScrollViewer;
        })(Controls.ContentControl);
        Controls.ScrollViewer = ScrollViewer;        
        Nullstone.RegisterType(ScrollViewer, "ScrollViewer");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ScrollViewer.js.map
