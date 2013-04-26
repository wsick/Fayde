/// <reference path="../../Core/FrameworkElement.ts" />
/// CODE

module Fayde.Controls.Primitives {
    export class PopupNode extends FENode implements IBoundsComputable {
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

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) { }
    }
    Nullstone.RegisterType(PopupNode, "PopupNode");

    export class Popup extends FrameworkElement {
        CreateNode(): PopupNode {
            return new PopupNode(this);
        }

        Child: UIElement;
        HorizontalOffset: number;
        VerticalOffset: number;
    }
    Nullstone.RegisterType(Popup, "Popup");
}