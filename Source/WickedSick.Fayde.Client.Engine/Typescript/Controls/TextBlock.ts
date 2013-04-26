/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts" />

module Fayde.Controls {
    export class TextBlockNode extends FENode implements IBoundsComputable {
        XObject: TextBlock;
        private _Layout: any;
        constructor(xobj: TextBlock) {
            super(xobj);
        }

        GetInheritedWalker(): IEnumerator {
            var coll = (<DependencyObject>this.XObject).GetValue(TextBlock.InlinesProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }

        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            rect.copyTo(this._Layout.GetRenderExtents(), lu.Extents);
            var padding = this.XObject.Padding;
            lu.Extents.X += padding.Left;
            lu.Extents.Y += padding.Top;
            rect.copyTo(lu.Extents, lu.ExtentsWithChildren);

            lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
            rect.copyTo(lu.Bounds, lu.BoundsWithChildren);

            lu.ComputeGlobalBounds();
            lu.ComputeSurfaceBounds();
        }
    }
    Nullstone.RegisterType(TextBlockNode, "TextBlockNode");

    export class TextBlock extends FrameworkElement {
        CreateNode(): TextBlockNode { return new TextBlockNode(this); }

        static InlinesProperty: DependencyProperty;
        static PaddingPropert: DependencyProperty;
        Padding: Thickness;
    }
    Nullstone.RegisterType(TextBlock, "TextBlock");
}