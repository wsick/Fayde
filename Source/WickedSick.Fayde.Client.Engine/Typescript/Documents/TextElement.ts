/// <reference path="../Core/DependencyObject.ts"/>
/// CODE

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

    export class TextElement extends DependencyObject {
        CreateNode(): XamlNode {
            return new TextElementNode(this);
        }
    }
}