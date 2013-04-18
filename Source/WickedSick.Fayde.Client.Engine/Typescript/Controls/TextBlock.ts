/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Controls {
    export class TextBlockNode extends UINode {
        GetInheritedWalker(): IEnumerator {
            var coll = (<DependencyObject>this.XObject).GetValue(TextBlock.InlinesProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }
    }
    Nullstone.RegisterType(TextBlockNode, "TextBlockNode");

    export class TextBlock extends FrameworkElement {
        static InlinesProperty;
        CreateNode(): XamlNode {
            return new TextBlockNode(this);
        }
    }
    Nullstone.RegisterType(TextBlock, "TextBlock");
}