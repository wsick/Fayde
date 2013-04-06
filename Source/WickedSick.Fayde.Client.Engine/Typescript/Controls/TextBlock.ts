/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/InternalCollection.ts" />

module Fayde.Controls {
    export class TextBlockNode extends UINode {
        GetInheritedWalker(): IEnumerator {
            var coll = (<DependencyObject>this.XObject).GetValue(TextBlock.InlinesProperty);
            if (coll)
                return (<InternalCollection>coll).GetEnumerator();
        }
    }

    export class TextBlock extends FrameworkElement {
        static InlinesProperty;
        CreateNode(): XamlNode {
            return new TextBlockNode(this);
        }
    }
}