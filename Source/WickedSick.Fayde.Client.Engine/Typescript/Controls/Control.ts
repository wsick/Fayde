/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/Providers/ControlProviderStore.ts" />
/// <reference path="../Media/VSM/VisualStateManager.ts" />

module Fayde.Controls {
    export class ControlNode extends FENode {
        XObject: Control;
        TemplateRoot: FrameworkElement;
        IsFocused: bool = false;

        constructor(xobj: Control) {
            super(xobj);
        }

        TabTo() {
            var xobj = this.XObject;
            return xobj.IsEnabled && xobj.IsTabStop && xobj.Focus();
        }

        _ElementAdded(uie: UIElement) {
            this.SetSubtreeNode(uie.XamlNode);
            super._ElementAdded(uie);
        }
        _ElementRemoved(uie: UIElement) {
            this.SetSubtreeNode(null);
            super._ElementRemoved(uie);
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
                this._ElementRemoved(this.TemplateRoot);
                this.TemplateRoot = null;
            }
            this.TemplateRoot = <FrameworkElement>root;
            this._ElementAdded(this.TemplateRoot);

            //TODO: Deployment Loaded Event (Async)

            return true;
        }

        OnIsAttachedChanged(newIsAttached: bool) {
            super.OnIsAttachedChanged(newIsAttached);
            //TODO: Propagate IsEnabled DataSource
            if (!newIsAttached)
                Media.VSM.VisualStateManager.DestroyStoryboards(this.XObject, this.TemplateRoot);
        }
    }
    Nullstone.RegisterType(ControlNode, "ControlNode");

    export class Control extends FrameworkElement {
        XamlNode: ControlNode;
        _Store: Providers.ControlProviderStore;
        CreateStore(): Providers.ControlProviderStore {
            return new Providers.ControlProviderStore(this);
        }
        CreateNode(): ControlNode {
            var n = new ControlNode(this);
            n.LayoutUpdater.SetContainerMode(true);
            return n;
        }
        
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
        
        Focus(): bool { return App.Instance.MainSurface.Focus(this); }
        OnGotFocus(e: RoutedEventArgs) { this.XamlNode.IsFocused = true; }
        OnLostFocus(e: RoutedEventArgs) { this.XamlNode.IsFocused = false; }

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