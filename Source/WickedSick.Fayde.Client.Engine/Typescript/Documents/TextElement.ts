/// <reference path="../Core/DependencyObject.ts"/>
/// CODE

module Fayde.Documents {
    export class TextElementNode extends XamlNode {
        InheritedWalkProperty: DependencyProperty;
        GetInheritedEnumerator(): IEnumerator {
            var coll = (<DependencyObject>this.XObject).GetValue(this.InheritedWalkProperty);
            if (coll)
                return (<InternalCollection>coll).GetEnumerator();
        }
    }

    export class TextElement extends DependencyObject {
        CreateNode(): XamlNode {
            return new TextElementNode(this);
        }
    }
}