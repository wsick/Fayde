/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="ResourceDictionary.ts" />
/// <reference path="Providers/FrameworkProviderStore.ts" />
/// <reference path="Providers/FrameworkElementDynamicProvider.ts" />
/// <reference path="Providers/InheritedDataContextProvider.ts" />
/// <reference path="Providers/LocalStyleProvider.ts" />
/// <reference path="Providers/ImplicitStyleProvider.ts" />

module Fayde {
    export class FENode extends UINode {
        XObject: FrameworkElement;
        constructor(xobj: FrameworkElement) {
            super(xobj);
        }
        SubtreeNode: XamlNode;
        SetSubtreeNode(subtreeNode: XamlNode) {
            var error = new BError();
            if (subtreeNode && !subtreeNode.AttachTo(this, error))
                error.ThrowException();
            this.SubtreeNode = subtreeNode;
        }

        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) {
            var store = this.XObject._Store;
            var visualParentNode: FENode;
            if (newParentNode && newParentNode instanceof FENode)
                store.SetDataContextSource(<FrameworkElement>newParentNode.XObject);
            else if ((visualParentNode = <FENode>this.VisualParentNode) && visualParentNode instanceof FENode)
                store.SetDataContextSource(visualParentNode.XObject);
            else
                store.SetDataContextSource(null);

            if (this.IsLoaded)
                store.EmitDataContextChanged();
        }
        OnIsAttachedChanged(newIsAttached: bool) {
            if (this.SubtreeNode)
                this.SubtreeNode.SetIsAttached(newIsAttached);
            super.OnIsAttachedChanged(newIsAttached);
        }
        OnIsLoadedChanged(newIsLoaded: bool) {
            var res = this.XObject.Resources;
            var store = this.XObject._Store;
            if (!newIsLoaded) {
                store.ClearImplicitStyles(Providers._StyleMask.VisualTree);
                //Raise unloaded event
                //TODO: Should we set is loaded on resources that are FrameworkElements?
            } else {
                store.SetImplicitStyles(Providers._StyleMask.All);
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                (<UINode>enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if (newIsLoaded) {
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                //Raise loaded event
                this.XObject.InvokeLoaded();
                store.EmitDataContextChanged();
            }
        }

        _ApplyTemplateWithError(error: BError): bool {
            if (this.SubtreeNode)
                return false;
            var result = this._DoApplyTemplateWithError(error);
            if (result)
                this.XObject.OnApplyTemplate();
            return result;
        }
        _DoApplyTemplateWithError(error: BError): bool {
            var uie = <UIElement>this._GetDefaultTemplate();
            if (uie) {
                if (error.Message)
                    return false;
                this.SetSubtreeNode(uie.XamlNode);
                this._ElementAdded(uie);
            }
            return uie != null;
        }
        _GetDefaultTemplate(): UIElement { return undefined; }

        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            if (this.SubtreeNode) {
                if (this.SubtreeNode instanceof XamlObjectCollection)
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                return ArrayEx.GetEnumerator([this.SubtreeNode]);
            }
        }
    }
    Nullstone.RegisterType(FENode, "FENode");

    export class FrameworkElement extends UIElement {
        DefaultStyleKey: any;
        XamlNode: FENode;
        Resources: ResourceDictionary;
        constructor() {
            super();
            Object.defineProperty(this, "Resources", {
                value: new ResourceDictionary(),
                writable: false
            });
        }
        _Store: Providers.FrameworkProviderStore;
        CreateStore(): Providers.FrameworkProviderStore {
            var s = new Providers.FrameworkProviderStore(this);
            s.SetProviders([null,
                new Providers.LocalValueProvider(),
                new Providers.FrameworkElementDynamicProvider(),
                new Providers.LocalStyleProvider(s),
                new Providers.ImplicitStyleProvider(s),
                new Providers.InheritedProvider(),
                new Providers.InheritedDataContextProvider(s),
                new Providers.DefaultValueProvider(),
                new Providers.AutoCreateProvider()]
            );
            return s;
        }
        CreateNode(): FENode {
            return new FENode(this);
        }

        static ActualWidthProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", () => Number, FrameworkElement);
        static ActualHeightProperty: DependencyProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", () => Number, FrameworkElement);
        static DataContextProperty: DependencyProperty = DependencyProperty.RegisterCore("DataContext", () => Object, FrameworkElement);
        static StyleProperty: DependencyProperty = DependencyProperty.RegisterCore("Style", () => Style, FrameworkElement);
        ActualWidth: number;
        ActualHeight: number;
        DataContext: any;
        Style: Style;

        Width: number;
        Height: number;
        MinWidth: number;
        MinHeight: number;
        MaxWidth: number;
        MaxHeight: number;

        SizeChanged: RoutedEvent;

        _ComputeActualSize(): size {
            return new size();
        }

        InvokeLoaded() {
        }

        MeasureOverride(availableSize: size): size { return undefined; }
        ArrangeOverride(finalSize: size): size { return undefined; }
        OnApplyTemplate() { }
        FindName(name: string): any {
            var n = this.XamlNode.FindName(name);
            if (n)
                return n.XObject;
        }
    }
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");
}