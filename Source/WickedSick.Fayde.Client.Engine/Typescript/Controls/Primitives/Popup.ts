/// <reference path="../../Core/FrameworkElement.ts" />
/// CODE

module Fayde.Controls.Primitives {
    export class PopupNode extends FENode {
        XObject: Popup;
        GetInheritedWalker(): IEnumerator {
            var popup = (<Popup>this.XObject);
            if (!popup)
                return;
            var index = -1;
            return {
                MoveNext: function () {
                    index++;
                    return index === 0;
                },
                Current: popup.Child
            };
        }
    }
    Nullstone.RegisterType(PopupNode, "PopupNode");

    export class Popup extends FrameworkElement {
        Child: UIElement;
        CreateNode(): PopupNode {
            return new PopupNode(this);
        }
    }
    Nullstone.RegisterType(Popup, "Popup");
}