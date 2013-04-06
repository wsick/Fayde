/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="Walkers.ts" />

module Fayde {
    export class UINode extends XamlNode {
        VisualParentNode: UINode;
        GetInheritedWalker(): IEnumerator {
            return VisualTreeWalker.Logical(this);
        }
    }
    export class UIElement extends DependencyObject {
        CreateNode(): XamlNode {
            return new UINode(this);
        }
    }
}