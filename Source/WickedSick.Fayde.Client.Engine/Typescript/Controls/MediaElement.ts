/// <reference path="../Core/FrameworkElement.ts" />
/// CODE

module Fayde.Controls {
    export class MENode extends FENode implements IPostInsideObject {
        XObject: MediaElement;
        constructor(xobj: MediaElement) {
            super(xobj);
        }

        PostInsideObject(ctx: RenderContext, lu: LayoutUpdater, x: number, y: number): boolean {
            //TODO: Implement
            return false;
        }
    }
    Nullstone.RegisterType(MENode, "MENode");

    export class MediaElement extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden {
        XamlNode: MENode;
        CreateNode(): MENode { return new MENode(this); }
        
        _MeasureOverride(availableSize: size, error: BError): size {
            //NotImplemented
            return availableSize;
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            //NotImplemented
            return finalSize;
        }
    }
    Nullstone.RegisterType(MediaElement, "MediaElement");
}