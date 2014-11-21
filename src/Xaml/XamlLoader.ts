/// <reference path="../Core/XamlObject.ts" />

module Fayde.Xaml {
    export class FrameworkTemplate extends Fayde.XamlObject {
        private ResourceChain: ResourceDictionary[] = [];
        private TemplateElement: Element;
        constructor() {
            super();
        }
        GetVisualTree(bindingSource: DependencyObject): UIElement {
            /*
            var ctx: IXamlLoadContext = {
                Document: this.TemplateElement.ownerDocument,
                ResourceChain: this.ResourceChain,
                NameScope: new NameScope(true),
                ObjectStack: [],
                TemplateBindingSource: bindingSource,
            };
            var uie = <UIElement>createObject(this.TemplateElement.firstElementChild, ctx);
            if (!(uie instanceof UIElement))
                throw new XamlParseException("Template root visual is not a UIElement.");
            uie.XamlNode.NameScope = ctx.NameScope;
            return uie;
            */
            return null;
        }
    }
}