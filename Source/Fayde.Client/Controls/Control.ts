/// <reference path="../Core/FrameworkElement.ts" />
/// <reference path="../Core/Providers/IsEnabledStore.ts" />
/// <reference path="../Input/Keyboard.ts" />

module Fayde.Controls {
    export interface IIsEnabledListener {
        Callback: (newIsEnabled: boolean) => void;
        Detach();
    }

    export class ControlNode extends FENode {
        _Surface: Surface;
        XObject: Control;
        TemplateRoot: FrameworkElement;
        IsFocused: boolean = false;

        constructor(xobj: Control) {
            super(xobj);
            this.LayoutUpdater.SetContainerMode(true);
            this.LayoutUpdater.IsNeverInsideObject = true;
        }

        TabTo() {
            var xobj = this.XObject;
            return xobj.IsEnabled && xobj.IsTabStop && this.Focus();
        }

        DoApplyTemplateWithError(error: BError): boolean {
            var xobj = this.XObject;
            var t = xobj.Template;
            var root: UIElement;
            if (t) root = t.GetVisualTree(xobj);
            if (!root && !(root = this.GetDefaultVisualTree()))
                return false;

            if (this.TemplateRoot && this.TemplateRoot !== root)
                this.DetachVisualChild(this.TemplateRoot, error)
            this.TemplateRoot = <FrameworkElement>root;
            if (this.TemplateRoot)
                this.AttachVisualChild(this.TemplateRoot, error);
            if (error.Message)
                return false;
                
            //TODO: Deployment Loaded Event (Async)

            return true;
        }
        GetDefaultVisualTree(): UIElement { return undefined; }

        OnIsAttachedChanged(newIsAttached: boolean) {
            super.OnIsAttachedChanged(newIsAttached);
            if (!newIsAttached)
                Media.VSM.VisualStateManager.DestroyStoryboards(this.XObject, this.TemplateRoot);
        }

        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) {
            super.OnParentChanged(oldParentNode, newParentNode);
            this.IsEnabled = newParentNode ? newParentNode.IsEnabled : true;
        }
        
        get IsEnabled(): boolean { return this.XObject.IsEnabled; }
        set IsEnabled(value: boolean) {
            Providers.IsEnabledStore.EmitInheritedChanged(this, value);
            this.OnIsEnabledChanged(undefined, value);
        }
        OnIsEnabledChanged(oldValue: boolean, newValue: boolean) {
            if (!newValue) {
                this.IsMouseOver = false;
                var surface = this._Surface;
                if (surface) {
                    surface.RemoveFocusFrom(this.LayoutUpdater);
                    TabNavigationWalker.Focus(this, true);
                }
                this.ReleaseMouseCapture();
            }
            super.OnIsEnabledChanged(oldValue, newValue);
        }

        Focus(recurse?: boolean): boolean {
            var surface = this._Surface || Fayde.Application.Current.MainSurface;
            return surface.Focus(this, recurse);
        }

        CanCaptureMouse(): boolean { return this.XObject.IsEnabled; }
    }
    Fayde.RegisterType(ControlNode, {
    	Name: "ControlNode",
    	Namespace: "Fayde.Controls"
    });

    export class Control extends FrameworkElement implements Providers.IIsPropertyInheritable {
        XamlNode: ControlNode;
        CreateNode(): ControlNode { return new ControlNode(this); }

        static BackgroundProperty: DependencyProperty = DependencyProperty.RegisterCore("Background", () => Media.Brush, Control);
        static BorderBrushProperty: DependencyProperty = DependencyProperty.RegisterCore("BorderBrush", () => Media.Brush, Control);
        static BorderThicknessProperty: DependencyProperty = DependencyProperty.RegisterCore("BorderThickness", () => Thickness, Control, undefined, (d, args) => (<Control>d)._BorderThicknessChanged(args));
        static FontFamilyProperty: DependencyProperty = InheritableOwner.FontFamilyProperty.ExtendTo(Control);
        static FontSizeProperty: DependencyProperty = InheritableOwner.FontSizeProperty.ExtendTo(Control);
        static FontStretchProperty: DependencyProperty = InheritableOwner.FontStretchProperty.ExtendTo(Control);
        static FontStyleProperty: DependencyProperty = InheritableOwner.FontStyleProperty.ExtendTo(Control);
        static FontWeightProperty: DependencyProperty = InheritableOwner.FontWeightProperty.ExtendTo(Control);
        static ForegroundProperty: DependencyProperty = InheritableOwner.ForegroundProperty.ExtendTo(Control);
        static HorizontalContentAlignmentProperty: DependencyProperty = DependencyProperty.Register("HorizontalContentAlignment", () => new Enum(HorizontalAlignment), Control, HorizontalAlignment.Center, (d, args) => (<Control>d)._ContentAlignmentChanged(args));
        static IsEnabledProperty: DependencyProperty = DependencyProperty.Register("IsEnabled", () => Boolean, Control, true, (d, args) => (<Control>d)._IsEnabledChanged(args));
        static IsTabStopProperty: DependencyProperty = DependencyProperty.Register("IsTabStop", () => Boolean, Control, true);
        static PaddingProperty: DependencyProperty = DependencyProperty.RegisterCore("Padding", () => Thickness, Control, undefined, (d, args) => (<Control>d)._BorderThicknessChanged(args));
        static TabIndexProperty: DependencyProperty = DependencyProperty.Register("TabIndex", () => Number, Control);
        static TabNavigationProperty: DependencyProperty = DependencyProperty.Register("TabNavigation", () => new Enum(Input.KeyboardNavigationMode), Control, Input.KeyboardNavigationMode.Local);
        static TemplateProperty: DependencyProperty = DependencyProperty.Register("Template", () => ControlTemplate, Control, undefined, (d, args) => (<Control>d)._TemplateChanged(args));
        static VerticalContentAlignmentProperty: DependencyProperty = DependencyProperty.Register("VerticalContentAlignment", () => new Enum(VerticalAlignment), Control, VerticalAlignment.Center, (d, args) => (<Control>d)._ContentAlignmentChanged(args));
        static DefaultStyleKeyProperty: DependencyProperty = DependencyProperty.Register("DefaultStyleKey", () => Function, Control);

        IsInheritable(propd: DependencyProperty): boolean {
            if (ControlInheritedProperties.indexOf(propd) > -1)
                return true;
            return (<Providers.IIsPropertyInheritable>super).IsInheritable.call(this, propd);
        }

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
        IsEnabled: boolean;
        IsTabStop: boolean;
        Padding: Thickness;
        TabIndex: number;
        TabNavigation: Input.KeyboardNavigationMode;
        Template: ControlTemplate;
        VerticalContentAlignment: VerticalAlignment;
        DefaultStyleKey: Function;
        
        private _IsMouseOver: boolean = false; //Defined in UIElement
        get IsFocused() { return this.XamlNode.IsFocused; }

        GetTemplateChild(childName: string): DependencyObject {
            var root = this.XamlNode.TemplateRoot;
            if (root) {
                var n = root.XamlNode.FindName(childName);
                if (n) return <DependencyObject>n.XObject;
            }
        }

        ApplyTemplate(): boolean {
            var error = new BError();
            var result = this.XamlNode.ApplyTemplateWithError(error);
            if (error.Message)
                error.ThrowException();
            return result;
        }

        GetDefaultStyle(): Style {
            return undefined;
        }

        IsEnabledChanged: MulticastEvent<DependencyPropertyChangedEventArgs> = new MulticastEvent<DependencyPropertyChangedEventArgs>();
        _IsEnabledChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.ShouldSkipHitTest = args.NewValue === false;
            lu.CanHitElement = args.NewValue !== false;
            this.OnIsEnabledChanged(args);
            if (args.NewValue !== true)
                this.XamlNode.IsMouseOver = false;
            this.UpdateVisualState();
            this.IsEnabledChanged.RaiseAsync(this, args);
        }
        OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs) { }

        OnGotFocus(e: RoutedEventArgs) { this.XamlNode.IsFocused = true; }
        OnLostFocus(e: RoutedEventArgs) { this.XamlNode.IsFocused = false; }

        UpdateVisualState(useTransitions?: boolean) {
            useTransitions = useTransitions !== false;
            var gotoFunc = (state: string) => Media.VSM.VisualStateManager.GoToState(this, state, useTransitions);
            this.GoToStates(gotoFunc);
        }
        GoToStates(gotoFunc: (state: string) => boolean) {
            this.GoToStateCommon(gotoFunc);
            this.GoToStateFocus(gotoFunc);
            this.GoToStateSelection(gotoFunc);
        }
        GoToStateCommon(gotoFunc: (state: string) => boolean): boolean {
            if (!this.IsEnabled)
                return gotoFunc("Disabled");
            if (this.IsMouseOver)
                return gotoFunc("MouseOver");
            return gotoFunc("Normal");
        }
        GoToStateFocus(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsFocused && this.IsEnabled)
                return gotoFunc("Focused");
            return gotoFunc("Unfocused");
        }
        GoToStateSelection(gotoFunc: (state: string) => boolean): boolean {
            return false;
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
    Fayde.RegisterType(Control, {
    	Name: "Control",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });

    Control.IsEnabledProperty.Store = Providers.IsEnabledStore.Instance;

    var ControlInheritedProperties = [
        Control.FontFamilyProperty,
        Control.FontSizeProperty,
        Control.FontStretchProperty,
        Control.FontStyleProperty,
        Control.FontWeightProperty,
        Control.ForegroundProperty
    ];
}