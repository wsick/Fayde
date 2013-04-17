/// <reference path="../Engine/Dirty.ts" />
/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="../Primitives/Thickness.ts" />
/// <reference path="SizeChangedEventArgs.ts" />

module Fayde {
    var dirtyEnum = _Dirty;
    var localTransformFlag = _Dirty.LocalTransform;
    var localProjectionFlag = _Dirty.LocalProjection;
    var transformFlag = _Dirty.Transform;
    var rvFlag = _Dirty.RenderVisibility;
    var htvFlag = _Dirty.HitTestVisibility;
    var localClipFlag = _Dirty.LocalClip;
    var clipFlag = _Dirty.Clip;
    var downDirtyFlag = _Dirty.DownDirtyState
    var upDirtyFlag = _Dirty.UpDirtyState;

    export enum UIElementFlags {
        None = 0,

        RenderVisible = 0x02,
        HitTestVisible = 0x04,
        TotalRenderVisible = 0x08,
        TotalHitTestVisible = 0x10,

        DirtyArrangeHint = 0x800,
        DirtyMeasureHint = 0x1000,
        DirtySizeHint = 0x2000,

        RenderProjection = 0x4000,
    }

    export interface ILayoutPass {
        MeasureList: LayoutUpdater[];
        ArrangeList: LayoutUpdater[];
        SizeList: LayoutUpdater[];
        Count: number;
        Updated: bool;
    }
    
    var maxPassCount = 250;
    export class LayoutUpdater {
        private _Surface: Surface;

        LayoutClip: Media.Geometry = undefined;
        LayoutExceptionElement: UIElement = undefined;
        LayoutSlot: rect = undefined;

        PreviousConstraint: size = undefined;
        LastRenderSize: size = undefined;

        RenderSize: size = new size();

        TotalIsRenderVisible: bool = true;

        Extents: rect = new rect();
        Bounds: rect = new rect();
        Global: rect = new rect();
        Surface: rect = new rect();
        EffectPadding: Thickness = new Thickness();
        ClipBounds: rect = new rect();
        SubtreeExtents: rect;
        SubtreeBounds: rect;
        GlobalBounds: rect;
        LayoutClipBounds: rect = new rect();

        Flags: Fayde.UIElementFlags = Fayde.UIElementFlags.None;

        DirtyFlags: _Dirty = 0;
        InUpDirty: bool = false;
        InDownDirty: bool = false;
        DirtyRegion: rect = null;
        private _ForceInvalidateOfNewBounds: bool = false;

        constructor(public Node: UINode) { }

        SetSurface(surface: Surface) {
            this._Surface = surface;
        }
        OnIsAttachedChanged(newIsAttached: bool, visualParentNode: UINode) {
            this.UpdateTotalRenderVisibility();
            if (!newIsAttached) {
                this._CacheInvalidateHint();
                this._Surface.OnNodeDetached(this);
            } else if (visualParentNode) {
                this._Surface = visualParentNode.LayoutUpdater._Surface;
            }
        }
        OnAddedToTree() {
            this.UpdateTotalRenderVisibility();
            this.UpdateTotalHitTestVisibility();
            this.Invalidate();
            
            this.SetLayoutClip(undefined);

            size.clear(this.RenderSize);
            this.UpdateTransform();
            this.UpdateProjection();
            this.InvalidateMeasure();
            this.InvalidateArrange();
            if (this._HasFlag(UIElementFlags.DirtySizeHint) || this.LastRenderSize !== undefined)
                this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
        }
        OnRemovedFromTree() {
            this.LayoutSlot = new rect();
            this.SetLayoutClip(undefined);
        }
        
        IsContainer() {
            //TODO: Implement
        }

        HasMeasureArrangeHint(): bool {
            return (this.Flags & (UIElementFlags.DirtyMeasureHint | UIElementFlags.DirtyArrangeHint)) > 0;
        }
        ProcessDown() {
            var thisNode = this.Node;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu: Fayde.LayoutUpdater;
            if (visualParentNode)
                visualParentLu = visualParentNode.LayoutUpdater;
            var f = this.DirtyFlags;
            //i++;
            //DirtyDebug("Down Dirty Loop #" + i.toString() + " --> " + surface._DownDirty.__DebugToString());
            /*
            DirtyDebug.Level++;
            DirtyDebug("[" + uie.__DebugToString() + "]" + uie.__DebugDownDirtyFlags());
            */
            if (f & rvFlag) {
                f &= ~rvFlag;

                var ovisible = this.TotalIsRenderVisible;

                this.UpdateBounds();

                if (visualParentLu)
                    visualParentLu.UpdateBounds();

                //DirtyDebug("ComputeTotalRenderVisibility: [" + uie.__DebugToString() + "]");
                //uie._ComputeTotalRenderVisibility();
                this.UpdateRenderVisibility(visualParentLu);

                if (!this.TotalIsRenderVisible)
                    this._CacheInvalidateHint();

                if (ovisible !== this.TotalIsRenderVisible)
                    this._Surface._AddDirtyElement(this, dirtyEnum.NewBounds);

                this._PropagateDirtyFlagToChildren(rvFlag);
            }

            if (f & htvFlag) {
                f &= ~htvFlag;
                //uie._ComputeTotalHitTestVisibility();
                this.UpdateHitTestVisibility(visualParentLu);
                this._PropagateDirtyFlagToChildren(htvFlag);
            }

            var isLT = f & localTransformFlag;
            var isLP = f & localProjectionFlag;
            var isT = isLT || isLP || f & transformFlag;
            f &= ~(localTransformFlag | localProjectionFlag | transformFlag);

            if (isLT) {
                //DirtyDebug("ComputeLocalTransform: [" + uie.__DebugToString() + "]");
                this.ComputeLocalTransform();
                //DirtyDebug("--> " + xformer.LocalXform._Elements.toString());
            }
            if (isLP) {
                //DirtyDebug("ComputeLocalProjection: [" + uie.__DebugToString() + "]");
                this.ComputeLocalProjection();
            }
            if (isT) {
                //DirtyDebug("ComputeTransform: [" + uie.__DebugToString() + "]");
                this.ComputeTransform();
                //DirtyDebug("--> " + xformer.AbsoluteProjection._Elements.slice(0, 8).toString());
                if (visualParentLu)
                    visualParentLu.UpdateBounds();
                this._PropagateDirtyFlagToChildren(dirtyEnum.Transform);
            }

            var isLocalClip = f & localClipFlag;
            var isClip = isLocalClip || f & clipFlag;
            f &= ~(localClipFlag | clipFlag);

            if (isClip)
                this._PropagateDirtyFlagToChildren(dirtyEnum.Clip);

            if (f & dirtyEnum.ChildrenZIndices) {
                f &= ~dirtyEnum.ChildrenZIndices;
                thisNode._ResortChildrenByZIndex();
            }

            //DirtyDebug.Level--;
            this.DirtyFlags = f;

            return !(f & downDirtyFlag);
        }
        ProcessUp(): bool {
            var thisNode = this.Node;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu: Fayde.LayoutUpdater;
            if (visualParentNode)
                visualParentLu = visualParentNode.LayoutUpdater;

            var f = this.DirtyFlags;
            //i++;
            //DirtyDebug("Up Dirty Loop #" + i.toString() + " --> " + surface._UpDirty.__DebugToString());
            var invalidateSubtreePaint = false;
            if (f & dirtyEnum.Bounds) {
                f &= ~dirtyEnum.Bounds;

                var oextents = rect.clone(this.SubtreeExtents);
                var oglobalbounds = rect.clone(this.GlobalBounds);
                var osubtreebounds = rect.clone(this.SubtreeBounds);

                this.ComputeBounds();

                if (!rect.isEqual(oglobalbounds, this.GlobalBounds)) {
                    if (visualParentLu) {
                        visualParentLu.UpdateBounds();
                        visualParentLu.Invalidate(osubtreebounds);
                        visualParentLu.Invalidate(this.SubtreeBounds);
                    }
                }

                invalidateSubtreePaint = !rect.isEqual(oextents, this.SubtreeExtents) || this._ForceInvalidateOfNewBounds;
                this._ForceInvalidateOfNewBounds = false;
            }

            if (f & dirtyEnum.NewBounds) {
                if (visualParentLu)
                    visualParentLu.Invalidate(this.SubtreeBounds);
                else if (thisNode.IsTopLevel)
                    invalidateSubtreePaint = true;
                f &= ~dirtyEnum.NewBounds;
            }
            if (invalidateSubtreePaint)
                this.Invalidate(this.SubtreeBounds);


            if (f & dirtyEnum.Invalidate) {
                f &= ~dirtyEnum.Invalidate;
                var dirty = this.DirtyRegion;
                if (visualParentLu) {
                    visualParentLu.Invalidate(dirty);
                } else {
                    if (thisNode.IsAttached) {
                        this._Surface._Invalidate(dirty);
                        /*
                        OPTIMIZATION NOT IMPLEMENTED
                        var count = dirty.GetRectangleCount();
                        for (var i = count - 1; i >= 0; i--) {
                        surface._Invalidate(dirty.GetRectangle(i));
                        }
                        */
                    }
                }
                rect.clear(dirty);
            }
            this.DirtyFlags = f;
            return !(f & upDirtyFlag);
        }
        private _PropagateDirtyFlagToChildren(dirt: _Dirty) {
            var enumerator = this.Node.GetVisualTreeEnumerator();
            if (!enumerator)
                return;
            var s = this._Surface;
            while (enumerator.MoveNext()) {
                s._AddDirtyElement((<UINode>enumerator.Current).LayoutUpdater, dirt);
            }
        }

        FullInvalidate(invTransforms?: bool) {
            this.Invalidate();
            if (invTransforms) {
                this.UpdateTransform();
                this.UpdateProjection();
            }
            this.UpdateBounds(true);
        }
        Invalidate(r?: rect) {
            //TODO: Implement
        }
        private _CacheInvalidateHint() {
        }
        InvalidateMeasure() {
            //TODO: Implement
        }
        InvalidateArrange() {
            //TODO: Implement
        }

        UpdateBounds(forceRedraw?: bool) {
            //TODO: Implement
        }
        UpdateTransform() {
            //TODO: Implement
        }
        ComputeLocalTransform() {
            //TODO: Implement
        }
        ComputeLocalProjection() {
            //TODO: Implement
        }
        ComputeTransform() {
            //TODO: Implement
        }
        UpdateProjection() {
            //TODO: Implement
        }
        UpdateRenderVisibility(vpLu: Fayde.LayoutUpdater) {
            //TODO: Implement
        }
        UpdateTotalRenderVisibility() {
            //TODO: Implement
        }
        UpdateHitTestVisibility(vpLu: Fayde.LayoutUpdater) {
            //TODO: Implement
        }
        UpdateTotalHitTestVisibility() {
            //TODO: Implement
        }

        ComputeBounds() {
            //TODO: Implement
        }
        SetLayoutClip(layoutClip: Media.Geometry) {
            this.LayoutClip = layoutClip;
            if (!layoutClip)
                rect.clear(this.LayoutClipBounds);
            else
                rect.copyTo(layoutClip.GetBounds(), this.LayoutClipBounds);
        }

        GetRenderVisible(): bool {
            //TODO: Implement
            return true;
        }
        
        UpdateLayer(pass: Fayde.ILayoutPass, error: BError) {
            var elNode = this.Node;
            var parentNode: Fayde.UINode;
            while (parentNode = elNode.VisualParentNode)
                elNode = parentNode;
            var element = elNode.XObject;
            var layout = elNode.LayoutUpdater;
            
            var lu: Fayde.LayoutUpdater;
            while (pass.Count < maxPassCount) {
                while (lu = pass.ArrangeList.shift()) {
                    lu._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
                    //LayoutDebug(function () { return "PropagateFlagUp DirtyArrangeHint"; });
                }
                while (lu = pass.SizeList.shift()) {
                    lu._PropagateFlagUp(UIElementFlags.DirtySizeHint);
                    //LayoutDebug(function () { return "PropagateFlagUp DirtySizeHint"; });
                }
                pass.Count = pass.Count + 1;

                var flag = UIElementFlags.None;
                if (element.Visibility === Fayde.Visibility.Visible) {
                    if (layout._HasFlag(UIElementFlags.DirtyMeasureHint))
                        flag = UIElementFlags.DirtyMeasureHint;
                    else if (layout._HasFlag(UIElementFlags.DirtyArrangeHint))
                        flag = UIElementFlags.DirtyArrangeHint;
                    else if (layout._HasFlag(UIElementFlags.DirtySizeHint))
                        flag = UIElementFlags.DirtySizeHint;
                }

                if (flag !== UIElementFlags.None) {
                    var measureWalker = Fayde.DeepTreeWalker(element);
                    var childNode: Fayde.UINode;
                    while (childNode = measureWalker.Step()) {
                        lu = childNode.LayoutUpdater;
                        if (childNode.XObject.Visibility !== Fayde.Visibility.Visible || !lu._HasFlag(flag)) {
                            measureWalker.SkipBranch();
                            continue;
                        }
                        lu._ClearFlag(flag);
                        switch (flag) {
                            case UIElementFlags.DirtyMeasureHint:
                                if (lu.DirtyFlags & _Dirty.Measure)
                                    pass.MeasureList.push(lu);
                                break;
                            case UIElementFlags.DirtyArrangeHint:
                                if (lu.DirtyFlags & _Dirty.Arrange)
                                    pass.ArrangeList.push(lu);
                                break;
                            case UIElementFlags.DirtySizeHint:
                                if (lu.LastRenderSize !== undefined)
                                    pass.SizeList.push(lu);
                                break;
                            default:
                                break;
                        }
                    }
                }

                if (flag === UIElementFlags.DirtyMeasureHint) {
                    //LayoutDebug(function () { return "Starting _MeasureList Update: " + pass.MeasureList.length; });
                    while (lu = pass.MeasureList.shift()) {
                        //LayoutDebug(function () { return "Measure [" + uie.__DebugToString() + "]"; });
                        lu._DoMeasureWithError(error);
                        pass.Updated = true;
                    }
                } else if (flag === UIElementFlags.DirtyArrangeHint) {
                    //LayoutDebug(function () { return "Starting _ArrangeList Update: " + pass.ArrangeList.length; });
                    while (lu = pass.ArrangeList.shift()) {
                        //LayoutDebug(function () { return "Arrange [" + uie.__DebugToString() + "]"; });
                        lu._DoArrangeWithError(error);
                        pass.Updated = true;
                        if (layout._HasFlag(UIElementFlags.DirtyMeasureHint))
                            break;
                    }
                } else if (flag === UIElementFlags.DirtySizeHint) {
                    while (lu = pass.SizeList.shift()) {
                        pass.Updated = true;

                        var last = lu.LastRenderSize
                        if (last) {
                            lu.LastRenderSize = undefined;
                            lu._UpdateActualSize();
                            var fe = <FrameworkElement>lu.Node.XObject;
                            fe.SizeChanged.Raise(fe, new Fayde.SizeChangedEventArgs(last, lu.RenderSize));
                        }
                    }
                    //LayoutDebug(function () { return "Completed _SizeList Update"; });
                } else {
                    break;
                }
            }
        }
        private _UpdateActualSize() {
            //TODO: Implement
        }
        private _HasFlag(flag: Fayde.UIElementFlags): bool { return (this.Flags & flag) === flag; }
        private _ClearFlag(flag: Fayde.UIElementFlags) { this.Flags &= ~flag; }
        private _SetFlag(flag: Fayde.UIElementFlags) { this.Flags |= flag; }
        private _PropagateFlagUp(flag: Fayde.UIElementFlags) {
            this.Flags |= flag;
            var node = this.Node;
            var lu: Fayde.LayoutUpdater;
            while ((node = node.VisualParentNode) && (lu = node.LayoutUpdater) && !lu._HasFlag(flag)) {
                lu.Flags |= flag;
            }
        }

        private _DoMeasureWithError(error: BError) {
            //TODO: Implement
        }
        private _DoArrangeWithError(error: BError) {
            //TODO: Implement
        }
        DoRender(ctx: Fayde.RenderContext, r: rect) {
            //TODO: Implement
        }
    }
}