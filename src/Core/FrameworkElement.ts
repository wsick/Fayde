/// <reference path="UIElement.ts" />
/// <reference path="Providers/ImmutableStore.ts" />
/// <reference path="Providers/ActualSizeStore.ts" />

module Fayde {
    export class FENode extends UINode implements Providers.IStyleHolder, Providers.IImplicitStyleHolder {
        _LocalStyle: Style;
        _ImplicitStyles: Style[];
        _StyleMask: number;

        XObject: FrameworkElement;
        constructor(xobj: FrameworkElement) {
            super(xobj);
        }
        SubtreeNode: XamlNode;
        SetSubtreeNode(subtreeNode: XamlNode, error: BError): boolean {
            if (this.SubtreeNode) {
                this.SubtreeNode.Detach();
                this.SubtreeNode = null;
            }
            if (subtreeNode && !subtreeNode.AttachTo(this, error))
                return false;
            this.SubtreeNode = subtreeNode;
            return true;
        }

        SetIsLoaded(value: boolean) {
            if (this.IsLoaded === value)
                return;
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        }
        OnIsLoadedChanged(newIsLoaded: boolean) {
            var xobj = this.XObject;
            var res = xobj.Resources;
            if (!newIsLoaded) {
                Providers.ImplicitStyleBroker.Clear(xobj, Providers.StyleMask.VisualTree);
                xobj.Unloaded.Raise(xobj, new RoutedEventArgs());
                //TODO: Should we set is loaded on resources that are FrameworkElements?
            } else {
                Providers.ImplicitStyleBroker.Set(xobj, Providers.StyleMask.All);
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while (enumerator.moveNext()) {
                enumerator.current.SetIsLoaded(newIsLoaded);
            }
            if (newIsLoaded) {
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                xobj.Loaded.Raise(xobj, new RoutedEventArgs());
                this.InvokeLoaded();
                //LOOKS USELESS: 
                //Providers.DataContextStore.EmitDataContextChanged(xobj);
            }
        }
        InvokeLoaded() { }

        AttachVisualChild(uie: UIElement, error: BError): boolean {
            this.OnVisualChildAttached(uie);
            if (!this.SetSubtreeNode(uie.XamlNode, error))
                return false;
            uie.XamlNode.SetIsLoaded(this.IsLoaded);
            return true;
        }
        DetachVisualChild(uie: UIElement, error: BError) {
            if (!this.SetSubtreeNode(null, error))
                return false;
            this.OnVisualChildDetached(uie);
            uie.XamlNode.SetIsLoaded(false);
            return true;
        }

        ApplyTemplateWithError(error: BError): boolean {
            if (this.SubtreeNode)
                return false;
            var result = this.DoApplyTemplateWithError(error);
            var xobj = this.XObject;
            if (result)
                xobj.OnApplyTemplate();
            xobj.TemplateApplied.Raise(xobj, EventArgs.Empty);
            return result;
        }
        DoApplyTemplateWithError(error: BError): boolean { return false; }
        FinishApplyTemplateWithError(uie: UIElement, error: BError): boolean {
            if (!uie || error.Message)
                return false;
            this.AttachVisualChild(uie, error);
            return error.Message == null;
        }

        UpdateLayout() {
            console.warn("FENode.UpdateLayout not implemented");
        }

        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode> {
            if (this.SubtreeNode)
                return ArrayEx.GetEnumerator([<FENode>this.SubtreeNode]);
            return ArrayEx.EmptyEnumerator;
        }
    }
    Fayde.RegisterType(FENode, "Fayde");

    export class FrameworkElement extends UIElement implements IResourcable, Providers.IIsPropertyInheritable {
        XamlNode: FENode;
        Resources: Fayde.ResourceDictionary;
        constructor() {
            super();
            var rd = FrameworkElement.ResourcesProperty.Initialize(this);
            rd.AttachTo(this);
        }
        CreateNode(): FENode { return new FENode(this); }
        
        static ActualHeightProperty = DependencyProperty.RegisterReadOnly("ActualHeight", () => Number, FrameworkElement);
        static ActualWidthProperty = DependencyProperty.RegisterReadOnly("ActualWidth", () => Number, FrameworkElement);
        static CursorProperty = DependencyProperty.Register("Cursor", () => new Enum(CursorType), FrameworkElement, CursorType.Default);
        static FlowDirectionProperty = InheritableOwner.FlowDirectionProperty.ExtendTo(FrameworkElement);
        static HeightProperty = DependencyProperty.Register("Height", () => Length, FrameworkElement, NaN, MReaction('height'));
        static HorizontalAlignmentProperty = DependencyProperty.Register("HorizontalAlignment", () => new Enum(HorizontalAlignment), FrameworkElement, HorizontalAlignment.Stretch, MReaction('horizontalAlignment'));
        static LanguageProperty = InheritableOwner.LanguageProperty.ExtendTo(FrameworkElement);
        static MarginProperty = DependencyProperty.RegisterCore("Margin", () => minerva.Thickness, FrameworkElement, undefined, MReaction('margin', minerva.Thickness.copyTo));
        static MaxHeightProperty = DependencyProperty.Register("MaxHeight", () => Number, FrameworkElement, Number.POSITIVE_INFINITY, MReaction('maxHeight'));
        static MaxWidthProperty = DependencyProperty.Register("MaxWidth", () => Number, FrameworkElement, Number.POSITIVE_INFINITY, MReaction('maxWidth'));
        static MinHeightProperty = DependencyProperty.Register("MinHeight", () => Number, FrameworkElement, 0.0, (d, args) => MReaction('minHeight'));
        static MinWidthProperty = DependencyProperty.Register("MinWidth", () => Number, FrameworkElement, 0.0, (d, args) => MReaction('minWidth'));
        static StyleProperty = DependencyProperty.Register("Style", () => Style, FrameworkElement, undefined, (d, args) => Reaction(Providers.LocalStyleBroker.Set));
        static VerticalAlignmentProperty = DependencyProperty.Register("VerticalAlignment", () => new Enum(VerticalAlignment), FrameworkElement, VerticalAlignment.Stretch, MReaction('verticalAlignment'));
        static WidthProperty = DependencyProperty.Register("Width", () => Length, FrameworkElement, NaN, MReaction('width'));
        static ResourcesProperty = DependencyProperty.RegisterImmutable<ResourceDictionary>("Resources", () => ResourceDictionary, FrameworkElement);
        static DefaultStyleKeyProperty = DependencyProperty.Register("DefaultStyleKey", () => Function, FrameworkElement);
        
        IsInheritable(propd: DependencyProperty): boolean {
            if (propd === FrameworkElement.FlowDirectionProperty)
                return true;
            if (propd === FrameworkElement.LanguageProperty)
                return true;
            return super.IsInheritable(propd);
        }
                
        ActualHeight: number;
        ActualWidth: number;
        FlowDirection: FlowDirection;
        Height: number;
        HorizontalAlignment: HorizontalAlignment;
        Language: string;
        Margin: minerva.Thickness;
        MaxWidth: number;
        MaxHeight: number;
        MinWidth: number;
        MinHeight: number;
        Style: Style;
        VerticalAlignment: VerticalAlignment;
        Width: number;
        DefaultStyleKey: Function;

        SizeChanged = new RoutedEvent<RoutedEventArgs>();
        Loaded = new RoutedEvent<RoutedEventArgs>();
        Unloaded = new RoutedEvent<RoutedEventArgs>();
        LayoutUpdated = new MulticastEvent<EventArgs>();

        OnApplyTemplate() { }
        TemplateApplied = new MulticastEvent<EventArgs>();

        UpdateLayout() { this.XamlNode.UpdateLayout(); }
    }
    Fayde.RegisterType(FrameworkElement, "Fayde", Fayde.XMLNS);

    FrameworkElement.ActualWidthProperty.Store = Providers.ActualSizeStore.Instance;
    FrameworkElement.ActualHeightProperty.Store = Providers.ActualSizeStore.Instance;
}