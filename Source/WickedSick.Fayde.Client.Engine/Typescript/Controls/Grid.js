var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Panel.ts" />
    /// CODE
    (function (Controls) {
        var GridNode = (function (_super) {
            __extends(GridNode, _super);
            function GridNode(xobj) {
                        _super.call(this, xobj);
            }
            GridNode.prototype.ComputeBounds = function (baseComputer, lu) {
                _super.prototype.ComputeBounds.call(this, baseComputer, lu);
                if(this.XObject.ShowGridLines) {
                    rect.set(lu.Extents, 0, 0, lu.ActualWidth, lu.ActualHeight);
                    rect.union(lu.ExtentsWithChildren, lu.Extents);
                    lu.IntersectBoundsWithClipPath(lu.Bounds, lu.AbsoluteXform);
                    rect.union(lu.BoundsWithChildren, lu.Bounds);
                    lu.ComputeGlobalBounds();
                    lu.ComputeSurfaceBounds();
                }
            };
            return GridNode;
        })(Controls.PanelNode);
        Controls.GridNode = GridNode;        
        Nullstone.RegisterType(GridNode, "GridNode");
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid() {
                _super.apply(this, arguments);

            }
            Grid.prototype.CreateNode = function () {
                return new GridNode(this);
            };
            return Grid;
        })(Controls.Panel);
        Controls.Grid = Grid;        
        Nullstone.RegisterType(Grid, "Grid");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Grid.js.map
