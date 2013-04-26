/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/Providers/ControlProviderStore.ts" />
/// <reference path="../Media/VSM/VisualStateManager.ts" />

module Fayde.Controls {
    export class ControlNode extends FENode {
        private _Surface: Surface;
        XObject: Control;
        TemplateRoot: FrameworkElement;
        IsFocused: bool = false;

        constructor(xobj: Control) {
            super(xobj);
            this.LayoutUpdater.SetContainerMode(true);
        }

        TabTo() {
            var xobj = this.XObject;
            return xobj.IsEnabled && xobj.IsTabStop && this.Focus();
        }

        _DoApplyTemplateWithError(error: BError): bool {
            var xobj = this.XObject;
            var t = xobj.Template;
            if (!t)
                return super._DoApplyTemplateWithError(error);

            var root = <UIElement>t._GetVisualTreeWithError(xobj, error);
            if (root && !(root instanceof UIElement)) {
                Warn("Root element in template was not a UIElement.");
                root = null;
            }

            if (!root)
                return super._DoApplyTemplateWithError(error);

            if (this.TemplateRoot && this.TemplateRoot !== root) {
                this.DetachVisualChild(this.TemplateRoot);
                this.TemplateRoot = null;
            }
            this.TemplateRoot = <FrameworkElement>root;
            this.AttachVisualChild(this.TemplateRoot);

            //TODO: Deployment Loaded Event (Async)

            return true;
        }

        OnIsAttachedChanged(newIsAttached: bool) {
            super.OnIsAttachedChanged(newIsAttached);
            //TODO: Propagate IsEnabled DataSource
            if (!newIsAttached)
                Media.VSM.VisualStateManager.DestroyStoryboards(this.XObject, this.TemplateRoot);
        }

        _HitTestPoint(ctx: RenderContext, p: Point, uielist: UINode[]) {
            if (this.XObject.IsEnabled)
                super._HitTestPoint(ctx, p, uielist);
        }
        _CanFindElement(): bool { return this.XObject.IsEnabled; }
        _InsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool { return false; }
        
        Focus(): bool { return this._Surface.Focus(this); }
        
        CanCaptureMouse(): bool { return this.XObject.IsEnabled; }
    }
    Nullstone.RegisterType(ControlNode, "ControlNode");

    export class Control extends FrameworkElement {
        XamlNode: ControlNode;
        _Store: Providers.ControlProviderStore;
        CreateStore(): Providers.ControlProviderStore {
            return new Providers.ControlProviderStore(this);
        }
        CreateNode(): ControlNode { return new ControlNode(this); }
        
        static BackgroundProperty: DependencyProperty;
        static BorderBrushProperty: DependencyProperty;
        static BorderThicknessProperty: DependencyProperty;
        static FontFamilyProperty: DependencyProperty;
        static FontSizeProperty: DependencyProperty;
        static FontStretchProperty: DependencyProperty;
        static FontStyleProperty: DependencyProperty;
        static FontWeightProperty: DependencyProperty;
        static ForegroundProperty: DependencyProperty;
        static HorizontalContentAlignmentProperty: DependencyProperty;
        static IsEnabledProperty: DependencyProperty;
        static IsTabStopProperty: DependencyProperty;
        static PaddingProperty: DependencyProperty;
        static TabIndexProperty: DependencyProperty;
        static TabNavigationProperty: DependencyProperty;
        static TemplateProperty: DependencyProperty;
        static VerticalContentAlignmentProperty: DependencyProperty;
        static DefaultStyleKeyProperty: DependencyProperty;

        Background: Media.Brush;
        BorderBrush: Media.Brush;
        BorderThickness: Thickness;
        FontFamily: string;
        FontSize: number;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        Foreground: Media.Brush;
        HorizontalContentAlignment: HorizontalAlignment;
        IsEnabled: bool;
        IsTabStop: bool;
        Padding: Thickness;
        TabIndex: number;
        TabNavigation: Input.KeyboardNavigationMode;
        Template: ControlTemplate;
        VerticalContentAlignment: VerticalAlignment;
        DefaultStyleKey: Function;

        GetTemplateChild(childName: string): DependencyObject {
            var root = this.XamlNode.TemplateRoot;
            if (root) {
                var n = root.XamlNode.FindName(name);
                if (n) return <DependencyObject>n.XObject;
            }
        }

        ApplyTemplate(): bool {
            var error = new BError();
            var result = this.XamlNode._ApplyTemplateWithError(error);
            if (error.Message)
                error.ThrowException();
            return result;
        }
        
        GetDefaultStyle(): Style {
            return undefined;
        }
        
        IsEnabledChanged: MulticastEvent = new MulticastEvent();

        OnGotFocus(e: RoutedEventArgs) { this.XamlNode.IsFocused = true; }
        OnLostFocus(e: RoutedEventArgs) { this.XamlNode.IsFocused = false; }
        OnLostMouseCapture(e: Input.MouseEventArgs) { }
        OnKeyDown(e: Input.KeyEventArgs) { }
        OnKeyUp(e: Input.KeyEventArgs) { }
        OnMouseEnter(e: Input.MouseEventArgs) { }
        OnMouseLeave(e: Input.MouseEventArgs) { }
        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) { }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) { }
        OnMouseMove(e: Input.MouseEventArgs) { }
        OnMouseRightButtonDown(e: Input.MouseButtonEventArgs) { }
        OnMouseRightButtonUp(e: Input.MouseButtonEventArgs) { }
        OnMouseWheel(e: Input.MouseWheelEventArgs) { }
    }
    Nullstone.RegisterType(Control, "Control");
}