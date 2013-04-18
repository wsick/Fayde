/// <reference path="../Core/DependencyObject.ts"/>
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts"/>
/// <reference path="../Core/Providers/InheritedProviderStore.ts"/>

module Fayde.Documents {
    export class TextElementNode extends XamlNode {
        XObject: TextElement;
        InheritedWalkProperty: DependencyProperty;
        GetInheritedEnumerator(): IEnumerator {
            var coll = this.XObject.GetValue(this.InheritedWalkProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }
    }
    Nullstone.RegisterType(TextElementNode, "TextElementNode");

    export class TextElement extends DependencyObject {
        _Store: Providers.InheritedProviderStore;
        CreateStore(): Providers.BasicProviderStore {
            return new Providers.InheritedProviderStore(this);
        }
        CreateNode(): XamlNode {
            return new TextElementNode(this);
        }
    }
    Nullstone.RegisterType(TextElement, "TextElement");
}