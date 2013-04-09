/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="../../Javascript/Primitives.ts" />

module Fayde {
    export class FENode extends UINode {
        XObject: FrameworkElement;
        constructor(xobj: FrameworkElement) {
            super(xobj);
        }
        SubtreeNode: XamlNode;
        SetSubtreeNode(subtreeNode: XamlNode) {
            subtreeNode.AttachTo(this);
            this.SubtreeNode = subtreeNode;
        }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator {
            if (this.SubtreeNode) {
                if (this.SubtreeNode instanceof InternalCollection)
                    return this.SubtreeNode.GetVisualTreeEnumerator();
                return ArrayEx.GetEnumerator([this.SubtreeNode]);
            }
        }
    }

    export class FrameworkElement extends UIElement {
        CreateNode(): XamlNode {
            return new FENode(this);
        }

        static DataContextProperty: DependencyProperty;
        static ActualWidthProperty: DependencyProperty;
        static ActualHeightProperty: DependencyProperty;

        _ComputeActualSize(): size {
            return new size();
        }
    }
}