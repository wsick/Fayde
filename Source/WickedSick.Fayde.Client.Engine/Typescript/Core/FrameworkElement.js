var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var Fayde;
(function (Fayde) {
    var FENode = (function (_super) {
        __extends(FENode, _super);
        function FENode(xobj) {
                _super.call(this, xobj);
        }
        FENode.prototype.SetSubtreeNode = function (subtreeNode) {
            var error = new BError();
            if(!subtreeNode.AttachTo(this, error)) {
                error.ThrowException();
            }
            this.SubtreeNode = subtreeNode;
        };
        FENode.prototype.OnParentChanged = function (oldParentNode, newParentNode) {
            var store = this.XObject._Store;
            var visualParentNode;
            if(newParentNode && newParentNode instanceof FENode) {
                store.SetDataContextSource(newParentNode.XObject);
            } else if((visualParentNode = this.VisualParentNode) && visualParentNode instanceof FENode) {
                store.SetDataContextSource(visualParentNode.XObject);
            } else {
                store.SetDataContextSource(null);
            }
            if(this.IsLoaded) {
                store.EmitDataContextChanged();
            }
        };
        FENode.prototype.OnIsAttachedChanged = function (newIsAttached) {
            if(this.SubtreeNode) {
                this.SubtreeNode.SetIsAttached(newIsAttached);
            }
            _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
        };
        FENode.prototype.OnIsLoadedChanged = function (newIsLoaded) {
            var res = this.XObject.Resources;
            var store = this.XObject._Store;
            if(!newIsLoaded) {
                store.ClearImplicitStyles(Fayde.Providers._StyleMask.VisualTree);
                //Raise unloaded event
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                            } else {
                store.SetImplicitStyles(Fayde.Providers._StyleMask.All);
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if(newIsLoaded) {
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                //Raise loaded event
                this.XObject.InvokeLoaded();
                store.EmitDataContextChanged();
            }
        };
        FENode.prototype.GetVisualTreeEnumerator = function (direction) {
            if(this.SubtreeNode) {
                if(this.SubtreeNode instanceof Fayde.XamlObjectCollection) {
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                }
                return Fayde.ArrayEx.GetEnumerator([
                    this.SubtreeNode
                ]);
            }
        };
        return FENode;
    })(Fayde.UINode);
    Fayde.FENode = FENode;    
    Nullstone.RegisterType(FENode, "FENode");
    var FrameworkElement = (function (_super) {
        __extends(FrameworkElement, _super);
        function FrameworkElement() {
                _super.call(this);
            Object.defineProperty(this, "Resources", {
                value: new Fayde.ResourceDictionary(),
                writable: false
            });
        }
        FrameworkElement.prototype.CreateStore = function () {
            var s = new Fayde.Providers.FrameworkProviderStore(this);
            s.SetProviders([
                null, 
                new Fayde.Providers.LocalValueProvider(), 
                new Fayde.Providers.FrameworkElementDynamicProvider(), 
                new Fayde.Providers.LocalStyleProvider(s), 
                new Fayde.Providers.ImplicitStyleProvider(s), 
                new Fayde.Providers.InheritedProvider(), 
                new Fayde.Providers.InheritedDataContextProvider(s), 
                new Fayde.Providers.DefaultValueProvider(), 
                new Fayde.Providers.AutoCreateProvider()
            ]);
            return s;
        };
        FrameworkElement.prototype.CreateNode = function () {
            return new FENode(this);
        };
        FrameworkElement.ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () {
            return Number;
        }, FrameworkElement);
        FrameworkElement.ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () {
            return Number;
        }, FrameworkElement);
        FrameworkElement.DataContextProperty = DependencyProperty.RegisterCore("DataContext", function () {
            return Object;
        }, FrameworkElement);
        FrameworkElement.StyleProperty = DependencyProperty.RegisterCore("Style", function () {
            return Fayde.Style;
        }, FrameworkElement);
        FrameworkElement.prototype._ComputeActualSize = function () {
            return new size();
        };
        FrameworkElement.prototype.InvokeLoaded = function () {
        };
        return FrameworkElement;
    })(Fayde.UIElement);
    Fayde.FrameworkElement = FrameworkElement;    
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElement.js.map
