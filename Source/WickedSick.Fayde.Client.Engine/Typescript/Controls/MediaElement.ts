/// <reference path="../Core/FrameworkElement.ts" />
/// CODE

module Fayde.Controls {
    export class MENode extends FENode {
        XObject: MediaElement;
        constructor(xobj: MediaElement) {
            super(xobj);
        }

        _InsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): bool {
            //TODO: Implement
            return false;
        }
    }
    Nullstone.RegisterType(MENode, "MENode");

    export class MediaElement extends FrameworkElement {
        XamlNode: MENode;
        CreateNode(): MENode { return new MENode(this); }
    }
    Nullstone.RegisterType(MediaElement, "MediaElement");
}