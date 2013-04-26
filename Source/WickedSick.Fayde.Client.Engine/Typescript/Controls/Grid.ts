/// <reference path="Panel.ts" />
/// CODE

module Fayde.Controls {
    export class GridNode extends PanelNode {
        XObject: Grid;
        constructor(xobj: Grid) {
            super(xobj);
        }
        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater) {
            super.ComputeBounds(baseComputer, lu);
            if (this.XObject.ShowGridLines) {
                rect.set(lu.Extents, 0, 0, lu.ActualWidth, lu.ActualHeight);
                rect.union(lu.ExtentsWithChildren, lu.Extents);
                lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
                rect.union(lu.BoundsWithChildren, lu.Bounds);

                lu.ComputeGlobalBounds();
                lu.ComputeSurfaceBounds();
            }
        }
    }
    Nullstone.RegisterType(GridNode, "GridNode");

    export class Grid extends Panel {
        CreateNode():GridNode { return new GridNode(this); }

        ShowGridLines: bool;
    }
    Nullstone.RegisterType(Grid, "Grid");
}