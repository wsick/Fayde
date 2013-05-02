/// <reference path="ContentControl.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class ScrollViewer extends ContentControl {
        private static _ScrollBarVisibilityChanged(d: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if (!d) return;
            if (d instanceof ScrollViewer) {
                var sv = <ScrollViewer>d;
                sv.XamlNode.LayoutUpdater.InvalidateMeasure();
                var scrollInfo = sv.ScrollInfo;
                if (scrollInfo) {
                    scrollInfo.CanHorizontallyScroll = sv.HorizontalScrollBarVisibility !== ScrollBarVisibility.Disabled;
                    scrollInfo.CanVerticallyScroll = sv.VerticalScrollBarVisibility !== ScrollBarVisibility.Disabled;
                }
                sv._UpdateScrollBarVisibility();
                return;
            }

            if (d instanceof ListBox) {
                var listbox = <ListBox>d;
                //if (listbox.$TemplateScrollViewer)
                    //listbox.$TemplateScrollViewer.SetValue(args.Property, args.NewValue);
                return;
            }
        }

        static HorizontalScrollBarVisibilityProperty: DependencyProperty = DependencyProperty.RegisterAttachedCore("HorizontalScrollBarVisibility", () => new Enum(ScrollBarVisibility), ScrollViewer, ScrollBarVisibility.Disabled, ScrollViewer._ScrollBarVisibilityChanged);
        static VerticalScrollBarVisibilityProperty: DependencyProperty = DependencyProperty.RegisterAttachedCore("VerticalScrollBarVisibility", () => new Enum(ScrollBarVisibility), ScrollViewer, ScrollBarVisibility.Disabled, ScrollViewer._ScrollBarVisibilityChanged);
        static ComputedHorizontalScrollBarVisibilityProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ComputedHorizontalScrollBarVisibility", () => new Enum(Visibility), ScrollViewer);
        static ComputedVerticalScrollBarVisibilityProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ComputedVerticalScrollBarVisibility", () => new Enum(Visibility), ScrollViewer);
        static HorizontalOffsetProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("HorizontalOffset", () => Number, ScrollViewer);
        static VerticalOffsetProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("VerticalOffset", () => Number, ScrollViewer);
        static ScrollableWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableWidth", () => Number, ScrollViewer);
        static ScrollableHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableHeight", () => Number, ScrollViewer);
        static ViewportWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ViewportWidth", () => Number, ScrollViewer);
        static ViewportHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ViewportHeight", () => Number, ScrollViewer);
        static ExtentWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ExtentWidth", () => Number, ScrollViewer);
        static ExtentHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ExtentHeight", () => Number, ScrollViewer);

        HorizontalScrollBarVisibility: ScrollBarVisibility;
        VerticalScrollBarVisibility: ScrollBarVisibility;
        ComputedHorizontalScrollBarVisibility: ScrollBarVisibility;
        ComputedVerticalScrollBarVisibility: ScrollBarVisibility;
        HorizontalOffset: number;
        VerticalOffset: number;
        ScrollableWidth: number;
        ScrollableHeight: number;
        ViewportWidth: number;
        ViewportHeight: number;
        ExtentWidth: number;
        ExtentHeight: number;

        constructor() {
            super();
            //this.RequestBringIntoView.Subscribe(this._OnRequestBringIntoView, this);
            this.DefaultStyleKey = (<any>this).constructor;
        }

        private _ScrollInfo: Primitives.IScrollInfo;
        get ScrollInfo(): Primitives.IScrollInfo { return this._ScrollInfo; }
        set ScrollInfo(value: Primitives.IScrollInfo) {
            this._ScrollInfo = value;
            if (value) {
                value.CanHorizontallyScroll = this.HorizontalScrollBarVisibility !== ScrollBarVisibility.Disabled;
                value.CanVerticallyScroll = this.VerticalScrollBarVisibility !== ScrollBarVisibility.Disabled;
            }
        }

        InvalidateScrollInfo() {
            //TODO: Implement
        }
        private _UpdateScrollBarVisibility() {
        }

    }
    Nullstone.RegisterType(ScrollViewer, "ScrollViewer");
}