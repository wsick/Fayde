/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="Walkers.ts" />

module Fayde {
    export class UINode extends XamlNode {
        XObject: UIElement;
        constructor(xobj: UIElement) {
            super(xobj);
        }
        VisualParentNode: UINode;
        GetInheritedEnumerator(): IEnumerator {
            return this.GetVisualTreeEnumerator(VisualTreeDirection.Logical);
        }
        
        _ElementAdded(uie: UIElement) {
        }
        _ElementRemoved(uie: UIElement) {
        }
    }
    export class UIElement extends DependencyObject {
        XamlNode: UINode;
        CreateNode(): XamlNode {
            return new UINode(this);
        }
    }
}