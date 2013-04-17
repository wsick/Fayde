/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="../Engine/Dirty.ts" />
var Fayde;
(function (Fayde) {
    var LayoutUpdater = (function () {
        function LayoutUpdater(Node) {
            this.Node = Node;
            this.LayoutClip = undefined;
            this.LayoutExceptionElement = undefined;
            this.LayoutSlot = undefined;
            this.PreviousConstraint = undefined;
            this.LastRenderSize = undefined;
            this.RenderSize = new size();
            this.SubtreeBounds = new rect();
            this.DirtyFlags = 0;
            this.UpDirtyIndex = -1;
            this.DownDirtyIndex = -1;
        }
        LayoutUpdater.prototype.SetSurface = function (surface) {
            this._Surface = surface;
        };
        LayoutUpdater.prototype.OnIsAttachedChanged = function (newIsAttached, visualParentNode) {
            this.UpdateTotalRenderVisibility();
            if(!newIsAttached) {
                // cache invalidate hint
                this._Surface.OnNodeDetached(this);
            } else if(visualParentNode) {
                this._Surface = visualParentNode.LayoutUpdater._Surface;
            }
        };
        LayoutUpdater.prototype.OnAddedToTree = function () {
            this.UpdateTotalRenderVisibility();
            this.UpdateTotalHitTestVisibility();
            this.Invalidate();
            this.LayoutClip = undefined;
            //  UpdateLayoutClipBounds
            size.clear(this.RenderSize);
            this.UpdateTransform();
            this.UpdateProjection();
            this.InvalidateMeasure();
            this.InvalidateArrange();
            //if uie has dirtysizehint or uie LastRenderSize !== undefined --> uie.propagateflagup dirtysizeup
                    };
        LayoutUpdater.prototype.OnRemovedFromTree = function () {
            this.LayoutSlot = new rect();
            this.LayoutClip = undefined;
            //  UpdateLayoutClipBounds
                    };
        LayoutUpdater.prototype.FullInvalidate = function (invTransforms) {
            this.Invalidate();
            if(invTransforms) {
                this.UpdateTransform();
                this.UpdateProjection();
            }
            this.UpdateBounds(true);
        };
        LayoutUpdater.prototype.Invalidate = function (r) {
        };
        LayoutUpdater.prototype.InvalidateMeasure = function () {
        };
        LayoutUpdater.prototype.InvalidateArrange = function () {
        };
        LayoutUpdater.prototype.UpdateBounds = function (forceRedraw) {
        };
        LayoutUpdater.prototype.UpdateTransform = function () {
        };
        LayoutUpdater.prototype.UpdateProjection = function () {
        };
        LayoutUpdater.prototype.UpdateTotalRenderVisibility = function () {
        };
        LayoutUpdater.prototype.UpdateTotalHitTestVisibility = function () {
        };
        LayoutUpdater.prototype.GetRenderVisible = function () {
            //TODO: Implement
            return true;
        };
        return LayoutUpdater;
    })();
    Fayde.LayoutUpdater = LayoutUpdater;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LayoutUpdater.js.map
