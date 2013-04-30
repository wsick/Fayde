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
                this.DetachVisualChild(this.TemplateRoot, error)
                this.TemplateRoot = null;
            }
            if (error.Message)
                return false;

            this.TemplateRoot = <FrameworkElement>root;
            this.AttachVisualChild(this.TemplateRoot, error);
            if (error.Message)
                return false;

            //TODO: Deployment Loaded Event (Async)

            return true;
        }

        OnIsAttachedChanged(newIsAttached: bool) {
            super.OnIsAttachedChanged(newIsAttached);
            //TODO: Propagate IsEnabled DataSource
            if (!newIsAttached)
                Media.VSM.VisualStateManager.DestroyStoryboards(this.XObject, this.TemplateRoot);
        }

        OnIsEnabledChanged(newIsEnabled: bool) {
            var surface = this._Surface;
            if (surface) {
                surface._RemoveFocusFrom(this.LayoutUpdater);
                TabNavigationWalker.Focus(this, true);
            }
            this.ReleaseMouseCapture();
        }
        
        _FindElementsInHostCoordinates(ctx: RenderContext, p: Point, uinlist: UINode[]) {
            if (this.XObject.IsEnabled)
                super._FindElementsInHostCoordinates(ctx, p, uinlist);
        }
        _HitTestPoint(ctx: RenderContext, p: Point, uinlist: UINode[]) {
            if (this.XObject.IsEnabled)
                super._HitTestPoint(ctx, p, uinlist);
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

        static BackgroundProperty: DependencyProperty = DependencyProperty.RegisterCore("Background", () => Media.Brush, Control);
        static BorderBrushProperty: DependencyProperty = DependencyProperty.RegisterCore("BorderBrush", () => Media.Brush, Control);
        static BorderThicknessProperty: DependencyProperty = DependencyProperty.RegisterCore("BorderThickness", () => Thickness, Control, undefined, (d, args) => (<Control>d)._BorderThicknessChanged(args));
        static FontFamilyProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontFamily", () => String, Control, Font.DEFAULT_FAMILY, undefined, undefined, Providers._Inheritable.FontFamily);
        static FontSizeProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontSize", () => Number, Control, Font.DEFAULT_SIZE, undefined, undefined, Providers._Inheritable.FontSize);
        static FontStretchProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStretch", () => String, Control, Font.DEFAULT_STRETCH, undefined, undefined, Providers._Inheritable.FontStretch);
        static FontStyleProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStyle", () => String, Control, Font.DEFAULT_STYLE, undefined, undefined, Providers._Inheritable.FontStyle);
        static FontWeightProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontWeight", () => new Enum(FontWeight), Control, Font.DEFAULT_WEIGHT, undefined, undefined, Providers._Inheritable.FontWeight);
        static ForegroundProperty: DependencyProperty = DependencyProperty.RegisterInheritable("Foreground", () => Media.Brush, Control, undefined, undefined, undefined, Providers._Inheritable.Foreground);
        static HorizontalContentAlignmentProperty: DependencyProperty = DependencyProperty.RegisterCore("HorizontalContentAlignment", () => new Enum(HorizontalAlignment), Control, HorizontalAlignment.Center, (d, args) => (<Control>d)._ContentAlignmentChanged(args));
        static IsEnabledProperty: DependencyProperty = DependencyProperty.RegisterCore("IsEnabled", () => Boolean, Control, true, (d, args) => (<Control>d)._IsEnabledChanged(args));
        static IsTabStopProperty: DependencyProperty = DependencyProperty.Register("IsTabStop", () => Boolean, Control, true);
        static PaddingProperty: DependencyProperty = DependencyProperty.RegisterCore("Padding", () => Thickness, Control, undefined, (d, args) => (<Control>d)._BorderThicknessChanged(args));
        static TabIndexProperty: DependencyProperty = DependencyProperty.Register("TabIndex", () => Number, Control);
        static TabNavigationProperty: DependencyProperty = DependencyProperty.Register("TabNavigation", () => new Enum(Input.KeyboardNavigationMode), Control, Input.KeyboardNavigationMode.Local);
        static TemplateProperty: DependencyProperty = DependencyProperty.RegisterCore("Template", () => ControlTemplate, Control, undefined, (d, args) => (<Control>d)._TemplateChanged(args));
        static VerticalContentAlignmentProperty: DependencyProperty = DependencyProperty.RegisterCore("VerticalContentAlignment", () => new Enum(VerticalAlignment), Control, VerticalAlignment.Center, (d, args) => (<Control>d)._ContentAlignmentChanged(args));
        static DefaultStyleKeyProperty: DependencyProperty = DependencyProperty.Register("DefaultStyleKey", () => Function, Control);

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
        
        private _IsMouseOver: bool = false; //Defined in UIElement
        get IsFocused() { return this.XamlNode.IsFocused; }

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
        _IsEnabledChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!args.NewValue) {
                this._IsMouseOver = false;
                this.XamlNode.OnIsEnabledChanged(args.NewValue);
            }
            this.OnIsEnabledChanged(args);
            this.IsEnabledChanged.RaiseAsync(this, EventArgs.Empty);
        }
        OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs) { }

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

        UpdateVisualState(useTransitions?: bool) {
            useTransitions = useTransitions !== false;
            var states = this.GetVisualStateNamesToActivate();
            for (var i = 0; i < states.length; i++) {
                Media.VSM.VisualStateManager.GoToState(this, states[i], useTransitions);
            }
        }
        GetVisualStateNamesToActivate(): string[] {
            var commonState = this.GetVisualStateCommon();
            var focusedState = this.GetVisualStateFocus();
            return [commonState, focusedState];
        }
        GetVisualStateCommon() {
            if (!this.IsEnabled) {
                return "Disabled";
            } else if (this.IsMouseOver) {
                return "MouseOver";
            } else {
                return "Normal";
            }
        }
        GetVisualStateFocus() {
            if (this.IsFocused && this.IsEnabled)
                return "Focused";
            else
                return "Unfocused";
        }

        private _TemplateChanged(args: IDependencyPropertyChangedEventArgs) {
            var node = this.XamlNode;
            var subtree = node.SubtreeNode;
            if (subtree) {
                var error = new BError();
                if (!node.DetachVisualChild(<UIElement>subtree.XObject, error))
                    error.ThrowException();
            }
            node.LayoutUpdater.InvalidateMeasure();
        }
        private _PaddingChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        private _BorderThicknessChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateMeasure();
        }
        private _ContentAlignmentChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode.LayoutUpdater.InvalidateArrange();
        }
    }
    Nullstone.RegisterType(Control, "Control");
}