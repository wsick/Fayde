/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="../Engine/Dirty.ts" />

module Fayde {
    export class LayoutUpdater {
        private _Surface: Surface;

        LayoutClip: Media.Geometry = undefined;
        LayoutExceptionElement: UIElement = undefined;
        LayoutSlot: rect = undefined;

        PreviousConstraint: size = undefined;
        LastRenderSize: size = undefined;

        RenderSize: size = new size();

        SubtreeBounds: rect = new rect();

        DirtyFlags: _Dirty = 0;
        UpDirtyIndex: number = -1;
        DownDirtyIndex: number = -1;

        constructor(public Node: UINode) { }

        SetSurface(surface: Surface) {
            this._Surface = surface;
        }
        OnIsAttachedChanged(newIsAttached: bool, visualParentNode: UINode) {
            this.UpdateTotalRenderVisibility();
            if (!newIsAttached) {
                // cache invalidate hint
                this._Surface.OnNodeDetached(this);
            } else if (visualParentNode) {
                this._Surface = visualParentNode.LayoutUpdater._Surface;
            }
        }
        OnAddedToTree() {
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
        }
        OnRemovedFromTree() {
            this.LayoutSlot = new rect();
            this.LayoutClip = undefined;
            //  UpdateLayoutClipBounds
        }

        FullInvalidate(invTransforms?:bool) {
            this.Invalidate();
            if (invTransforms) {
                this.UpdateTransform();
                this.UpdateProjection();
            }
            this.UpdateBounds(true);
        }
        Invalidate(r?: rect) {
        }
        InvalidateMeasure() {
        }
        InvalidateArrange() {
        }

        UpdateBounds(forceRedraw?: bool) {
        }
        UpdateTransform() {
        }
        UpdateProjection() {
        }
        UpdateTotalRenderVisibility() {
        }
        UpdateTotalHitTestVisibility() {
        }

        GetRenderVisible(): bool {
            //TODO: Implement
            return true;
        }
    }
}