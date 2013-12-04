/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls {
    export class MENode extends FENode implements IPostInsideObject {
        XObject: MediaElement;
        constructor(xobj: MediaElement) {
            super(xobj);
        }

        PostInsideObject(ctx: RenderContextEx, lu: LayoutUpdater, x: number, y: number): boolean {
            //TODO: Implement
            return false;
        }
    }
    Fayde.RegisterType(MENode, {
    	Name: "MENode",
    	Namespace: "Fayde.Controls"
    });

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
    Fayde.RegisterType(MediaElement, {
    	Name: "MediaElement",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}