/// <reference path="../../Core/FrameworkElement.ts" />
/// CODE

module Fayde.Controls.Primitives {
    export class PopupNode extends UINode {
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

    export class Popup extends Fayde.FrameworkElement {
        Child: UIElement;
        CreateNode(): XamlNode {
            return new PopupNode(this);
        }
    }
}