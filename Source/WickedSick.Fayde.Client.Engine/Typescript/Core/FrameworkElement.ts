/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="ResourceDictionary.ts" />
/// <reference path="Providers/ActualSizeStore.ts" />
/// <reference path="Providers/LocalStyleBroker.ts" />
/// <reference path="Providers/ImplicitStyleBroker.ts" />

module Fayde {
    export class FENode extends UINode implements Providers.IStyleHolder, Providers.IImplicitStyleHolder {
        _LocalStyle: Style;
        _ImplicitStyles: Style[];
        _StyleMask: number;
        _Surface: Surface;

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
            while (enumerator.MoveNext()) {
                enumerator.Current.SetIsLoaded(newIsLoaded);
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
        }

        ApplyTemplateWithError(error: BError): boolean {
            if (this.SubtreeNode)
                return false;
            var result = this.DoApplyTemplateWithError(error);
            if (result)
                this.XObject.OnApplyTemplate();
            return result;
        }
        DoApplyTemplateWithError(error: BError): boolean { return false; }
        FinishApplyTemplateWithError(uie: UIElement, error: BError): boolean {
            if (!uie || error.Message)
                return false;
            this.AttachVisualChild(uie, error);
            return error.Message == null;
        }
        
        _HasFocus(): boolean {
            var curNode = this._Surface.FocusedNode
            while (curNode) {
                if (curNode === this)
                    return true;
                curNode = curNode.VisualParentNode;
            }
            return false;
        }
        GetFocusedElement(): UIElement {
            var node = this._Surface.FocusedNode;
            if (node)
                return node.XObject;
        }

        UpdateLayout() {
            var lu = this.LayoutUpdater;
            var error = new BError();
            if (this.IsAttached) {
                this._Surface._UpdateLayout(error);
            } else {
                var pass = {
                    MeasureList: [],
                    ArrangeList: [],
                    SizeList: [],
                    Count: 0,
                    Updated: true
                };
                lu.UpdateLayer(pass, error);
                if (pass.Updated)
                    this.XObject.LayoutUpdated.Raise(this, EventArgs.Empty);
            }
            if (error.Message)
                error.ThrowException();
        }

        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator<FENode> {
            if (this.SubtreeNode)
                return ArrayEx.GetEnumerator([<FENode>this.SubtreeNode]);
            return ArrayEx.EmptyEnumerator;
        }

        _SizeChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.LayoutUpdater;
            //TODO: var p = this._GetRenderTransformOrigin();
            //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
            lu.FullInvalidate(false);

            var vpNode = this.VisualParentNode;
            if (vpNode)
                vpNode.LayoutUpdater.InvalidateMeasure();

            lu.InvalidateMeasure();
            lu.InvalidateArrange();
            lu.UpdateBounds();
        }
        _FlowDirectionChanged(args: IDependencyPropertyChangedEventArgs) {
            this._SizeChanged(args);
        }
    }
    Nullstone.RegisterType(FENode, "FENode");

    export class FrameworkElement extends UIElement implements IResourcable, IMeasurableHidden, IArrangeableHidden, Providers.IIsPropertyInheritable {
        DefaultStyleKey: any;
        XamlNode: FENode;
        Resources: ResourceDictionary;
        constructor() {
            super();
            var rd = FrameworkElement.ResourcesProperty.Initialize<ResourceDictionary>(this);
            rd.AttachTo(this);
        }
        CreateNode(): FENode { return new FENode(this); }
        
        static ActualHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("ActualHeight", () => Number, FrameworkElement);
        static ActualWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("ActualWidth", () => Number, FrameworkElement);
        static CursorProperty: DependencyProperty = DependencyProperty.RegisterFull("Cursor", () => new Enum(CursorType), FrameworkElement, CursorType.Default);
        static FlowDirectionProperty: DependencyProperty = InheritableOwner.FlowDirectionProperty.ExtendTo(FrameworkElement);
        static HeightProperty: DependencyProperty = DependencyProperty.Register("Height", () => Number, FrameworkElement, NaN, (d, args) => (<FrameworkElement>d)._HeightChanged(args));
        static HorizontalAlignmentProperty: DependencyProperty = DependencyProperty.Register("HorizontalAlignment", () => new Enum(HorizontalAlignment), FrameworkElement, HorizontalAlignment.Stretch, (d, args) => (<FrameworkElement>d)._AlignmentChanged(args));
        static LanguageProperty: DependencyProperty = InheritableOwner.LanguageProperty.ExtendTo(FrameworkElement);
        static MarginProperty: DependencyProperty = DependencyProperty.RegisterCore("Margin", () => Thickness, FrameworkElement, undefined, (d, args) => (<FrameworkElement>d).XamlNode._SizeChanged(args));
        static MaxHeightProperty: DependencyProperty = DependencyProperty.Register("MaxHeight", () => Number, FrameworkElement, Number.POSITIVE_INFINITY, (d, args) => (<FrameworkElement>d).XamlNode._SizeChanged(args));
        static MaxWidthProperty: DependencyProperty = DependencyProperty.Register("MaxWidth", () => Number, FrameworkElement, Number.POSITIVE_INFINITY, (d, args) => (<FrameworkElement>d).XamlNode._SizeChanged(args));
        static MinHeightProperty: DependencyProperty = DependencyProperty.Register("MinHeight", () => Number, FrameworkElement, 0.0, (d, args) => (<FrameworkElement>d).XamlNode._SizeChanged(args));
        static MinWidthProperty: DependencyProperty = DependencyProperty.Register("MinWidth", () => Number, FrameworkElement, 0.0, (d, args) => (<FrameworkElement>d).XamlNode._SizeChanged(args));
        static StyleProperty: DependencyProperty = DependencyProperty.Register("Style", () => Style, FrameworkElement, undefined, (d, args) => (<FrameworkElement>d)._StyleChanged(args));
        static VerticalAlignmentProperty: DependencyProperty = DependencyProperty.Register("VerticalAlignment", () => new Enum(VerticalAlignment), FrameworkElement, VerticalAlignment.Stretch, (d, args) => (<FrameworkElement>d)._AlignmentChanged(args));
        static WidthProperty: DependencyProperty = DependencyProperty.Register("Width", () => Number, FrameworkElement, NaN, (d, args) => (<FrameworkElement>d)._WidthChanged(args));
        static ResourcesProperty = DependencyProperty.RegisterImmutable("Resources", () => ResourceDictionary, FrameworkElement);
        
        IsInheritable(propd: DependencyProperty): boolean {
            if (propd === FrameworkElement.FlowDirectionProperty)
                return true;
            if (propd === FrameworkElement.LanguageProperty)
                return true;
            return (<Providers.IIsPropertyInheritable>super).IsInheritable.call(this, propd);
        }
                
        ActualHeight: number;
        ActualWidth: number;
        FlowDirection: FlowDirection;
        Height: number;
        HorizontalAlignment: HorizontalAlignment;
        Language: string;
        Margin: Thickness;
        MaxWidth: number;
        MaxHeight: number;
        MinWidth: number;
        MinHeight: number;
        Style: Style;
        VerticalAlignment: VerticalAlignment;
        Width: number;

        SizeChanged: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();
        Loaded: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();
        Unloaded: RoutedEvent<RoutedEventArgs> = new RoutedEvent<RoutedEventArgs>();
        LayoutUpdated: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

        OnApplyTemplate() { }
        FindName(name: string): XamlObject {
            var n = this.XamlNode.FindName(name);
            if (n)
                return n.XObject;
        }

        UpdateLayout() { this.XamlNode.UpdateLayout(); }

        _MeasureOverride(availableSize: size, error: BError): size {
            var desired = new size();

            availableSize = size.copyTo(availableSize);
            size.max(availableSize, desired);

            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = <FENode>enumerator.Current;
                var childLu = childNode.LayoutUpdater;
                childLu._Measure(availableSize, error);
                desired = size.copyTo(childLu.DesiredSize);
            }

            size.min(desired, availableSize);
            return desired;
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var arranged = size.copyTo(finalSize);

            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = <FENode>enumerator.Current;
                var childRect = rect.fromSize(finalSize);
                childNode.LayoutUpdater._Arrange(childRect, error);
                size.max(arranged, finalSize);
            }

            return arranged;
        }
        
        private _StyleChanged(args: IDependencyPropertyChangedEventArgs) {
            Providers.LocalStyleBroker.Set(this, <Style>args.NewValue);
        }
        private _AlignmentChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateArrange();
            lu.FullInvalidate(true);
        }
        _WidthChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode._SizeChanged(args);
        }
        _HeightChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode._SizeChanged(args);
        }
    }
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");

    FrameworkElement.ActualWidthProperty.Store = Providers.ActualSizeStore.Instance;
    FrameworkElement.ActualHeightProperty.Store = Providers.ActualSizeStore.Instance;
}