/// <reference path="ContentControl.ts" />

module Fayde.Controls {
    export class ToolTip extends ContentControl {
        static HorizontalOffsetProperty = DependencyProperty.Register("HorizontalOffset", () => Number, ToolTip, 0, (d, args) => (<ToolTip>d).OnHorizontalOffsetChanged(args));
        static VerticalOffsetProperty = DependencyProperty.Register("VerticalOffset", () => Number, ToolTip, 0, (d, args) => (<ToolTip>d).OnVerticalOffsetChanged(args));
        static IsOpenProperty = DependencyProperty.Register("IsOpen", () => Boolean, ToolTip, false, (d, args) => (<ToolTip>d).OnIsOpenChanged(args));
        static PlacementProperty = DependencyProperty.Register("Placement", () => new Enum(PlacementMode), ToolTip, PlacementMode.Mouse);
        static PlacementTargetProperty = DependencyProperty.Register("PlacementTarget", () => UIElement, ToolTip);
        HorizontalOffset: number;
        VerticalOffset: number;
        IsOpen: boolean;
        Placement: PlacementMode;
        PlacementTarget: UIElement;

        private _TooltipParent: FrameworkElement = null;
        private _TooltipParentDCListener: Providers.IPropertyChangedListener = null;
        get TooltipParent(): FrameworkElement { return this._TooltipParent; }
        set TooltipParent(value: FrameworkElement) {
            if (this._TooltipParentDCListener)
                this._TooltipParentDCListener.Detach();
            this._TooltipParent = value;
            if (this._TooltipParent)
                this._TooltipParentDCListener = DependencyObject.DataContextProperty.Store.ListenToChanged(this._TooltipParent, DependencyObject.DataContextProperty, this.OnTooltipParentDataContextChanged, this);
        }
        PlacementOverride: PlacementMode = null;
        PlacementTargetOverride: UIElement = null;

        Opened = new RoutedEvent<RoutedEventArgs>();
        Closed = new RoutedEvent<RoutedEventArgs>();

        private _ParentPopup: Primitives.Popup = null;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        private OnHorizontalOffsetChanged(args: DependencyPropertyChangedEventArgs) {
            if (args.NewValue !== args.OldValue)
                this.OnOffsetChanged(args.NewValue, 0);
        }
        private OnVerticalOffsetChanged(args: DependencyPropertyChangedEventArgs) {
            if (args.NewValue !== args.OldValue)
                this.OnOffsetChanged(0, args.NewValue);
        }
        private OnIsOpenChanged(args: DependencyPropertyChangedEventArgs) {
            if (args.NewValue) {
                if (!this._ParentPopup)
                    this.HookupParentPopup();
                this._ParentPopup.IsOpen = true;
                this.PerformPlacement(this.HorizontalOffset, this.VerticalOffset);
            } else {
                this._ParentPopup.IsOpen = false;
            }
            this.UpdateVisualState();
        }
        private OnOffsetChanged(horizontalOffset: number, verticalOffset: number) {
            if (!this._ParentPopup || !this.IsOpen)
                return;
            this.PerformPlacement(horizontalOffset, verticalOffset);
        }
        private OnLayoutUpdated(sender: any, e: EventArgs) {
            if (this._ParentPopup)
                this.PerformPlacement(this.HorizontalOffset, this.VerticalOffset);
        }
        private OnTooltipParentDataContextChanged(sender: any, args: IDependencyPropertyChangedEventArgs) {
            if (this._ParentPopup && this.TooltipParent)
                this._ParentPopup.DataContext = this.TooltipParent.DataContext;
        }

        private HookupParentPopup() {
            console.assert(!this._ParentPopup, "this._parentPopup should be null, we want to set visual tree once");

            var pp = this._ParentPopup = new Primitives.Popup();
            pp.DataContext = !this.TooltipParent ? null : this.TooltipParent.DataContext;

            pp.Opened.Subscribe(this.OnPopupOpened, this);
            pp.Closed.Subscribe(this.OnPopupClosed, this);
            this.IsTabStop = false;

            pp.Child = this;

            pp.IsHitTestVisible = false;
            this.IsHitTestVisible = false;
        }
        private OnPopupOpened(sender: any, e: EventArgs) {
            var args = new RoutedEventArgs();
            args.OriginalSource = this;
            this.Opened.Raise(this, args);
            this.LayoutUpdated.Subscribe(this.OnLayoutUpdated, this);
        }
        private OnPopupClosed(sender: any, e: EventArgs) {
            var args = new RoutedEventArgs();
            args.OriginalSource = this;
            this.Closed.Raise(this, args);
            this.LayoutUpdated.Unsubscribe(this.OnLayoutUpdated, this);
        }
        private PerformPlacement(horizontalOffset: number, verticalOffset: number) {
            if (!this.IsOpen)
                return;
            var root = <FrameworkElement>Application.Current.RootVisual;
            if (!root)
                return;

            var mode = this.PlacementOverride != null ? this.PlacementOverride : this.Placement;
            var target = <FrameworkElement>(this.PlacementTargetOverride || this.PlacementTarget);
            var targetBounds = new rect();

            var point: Point = ToolTipService.MousePosition;
            if (mode !== PlacementMode.Mouse) {
                point = new Point();
                try {
                    if (target != null) {
                        targetBounds = new rect();
                        rect.set(targetBounds, 0, 0, target.ActualWidth, target.ActualHeight);
                        targetBounds = target.TransformToVisual(null).TransformBounds(targetBounds);
                        point.X = targetBounds.X;
                        point.Y = targetBounds.Y;
                    }
                } catch (err) {
                    console.warn("Could not transform the tooltip point.");
                    return;
                }
            }

            //TODO: Handle FlowDirection

            //Move based on PlacementMode
            switch (mode) {
                case PlacementMode.Top:
                    point.Y = targetBounds.Y - this.ActualHeight;
                    break;
                case PlacementMode.Bottom:
                    point.Y = targetBounds.Y + targetBounds.Height;
                    break;
                case PlacementMode.Left:
                    point.X = targetBounds.X - this.ActualWidth;
                    break;
                case PlacementMode.Right:
                    point.X = targetBounds.X + targetBounds.Width;
                    break;
                case PlacementMode.Mouse:
                    point.Y += new TextBox().FontSize; // FIXME: Just a guess, it's about right.
                    break;
                default:
                    throw new NotSupportedException("PlacementMode '" + mode + "' is not supported.");
            }

            //Constrain X
            var rootWidth = root.ActualWidth;
            if ((point.X + this.ActualWidth) > rootWidth) {
                if (mode === PlacementMode.Right)
                    point.X = targetBounds.X - this.ActualWidth;
                else
                    point.X = rootWidth - this.ActualWidth;
            } else if (point.X < 0) {
                if (mode === PlacementMode.Left)
                    point.X = targetBounds.X + targetBounds.Width;
                else
                    point.X = 0;
            }

            //Constrain Y
            var rootHeight = root.ActualHeight;
            if ((point.Y + this.ActualHeight) > rootHeight) {
                if (mode === PlacementMode.Bottom)
                    point.Y = targetBounds.Y - this.ActualHeight;
                else
                    point.Y = rootHeight - this.ActualHeight;
            } else if (point.Y < 0) {
                if (mode === PlacementMode.Top)
                    point.Y = targetBounds.Y + targetBounds.Height;
                else
                    point.Y = 0;
            }

            this._ParentPopup.VerticalOffset = point.Y;
            this._ParentPopup.HorizontalOffset = point.X;
        }

        GoToStates(gotoFunc: (state: string) => boolean) {
            if (this.IsOpen)
                gotoFunc("Open");
            else
                gotoFunc("Closed");
        }
    }
    Fayde.RegisterType(ToolTip, "Fayde.Controls", Fayde.XMLNS);
    TemplateVisualStates(ToolTip,
        { GroupName: "OpenStates", Name: "Closed" },
        { GroupName: "OpenStates", Name: "Open" });
}