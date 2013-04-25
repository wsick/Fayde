/// <reference path="../Engine/Dirty.ts" />
/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="../Primitives/Thickness.ts" />
/// <reference path="SizeChangedEventArgs.ts" />
/// <reference path="../Controls/Canvas.ts" />
/// <reference path="../Media/RectangleGeometry.ts" />

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

    export interface IMeasurable {
        MeasureOverride(availableSize: size): size;
    }
    export interface IMeasurableHidden {
        _MeasureOverride(availableSize: size, error: BError): size;
    }
    export interface IArrangeable {
        ArrangeOverride(finalSize: size): size;
    }
    export interface IArrangeableHidden {
        _ArrangeOverride(finalSize: size, error: BError): size;
    }
    export interface IRenderable {
        Render(ctx: RenderContext, lu:LayoutUpdater, region: rect);
    }
    export interface IActualSizeComputable {
        ComputeActualSize(baseComputer: () => size, lu: LayoutUpdater);
    }

    var maxPassCount = 250;
    export class LayoutUpdater {
        static LayoutExceptionUpdater: LayoutUpdater = undefined;

        Surface: Surface;

        LayoutClip: Media.Geometry = undefined;
        LayoutSlot: rect = undefined;
        PreviousConstraint: size = undefined;
        LastRenderSize: size = undefined;
        HiddenDesire: size = new size();
        DesiredSize: size = new size();
        RenderSize: size = new size();
        VisualOffset: Point = new Point();

        AbsoluteXform: number[]         ;//= mat3.identity();
        LayoutXform: number[]           ;//= mat3.identity();
        LocalXform: number[]            ;//= mat3.identity();
        RenderXform: number[]           ;//= mat3.identity();
        LocalProjection: number[]       ;//= mat4.identity();
        AbsoluteProjection: number[]    ;//= mat4.identity();
        RenderProjection: number[]      ;//= mat4.identity();

        TotalOpacity: number = 1.0;
        TotalIsRenderVisible: bool = true;
        TotalIsHitTestVisible: bool = true;

        Extents: rect = new rect();
        ExtentsWithChildren: rect = new rect();
        Bounds: rect = new rect();
        Global: rect = new rect();
        SurfaceBounds: rect = new rect();
        EffectPadding: Thickness = new Thickness();
        ClipBounds: rect = new rect();
        SubtreeExtents: rect;
        SubtreeBounds: rect;
        GlobalBounds: rect;
        LayoutClipBounds: rect = new rect();

        IsContainer: bool = false;
        IsLayoutContainer: bool = false;
        BreaksLayoutClipRender: bool = false;

        Flags: Fayde.UIElementFlags = Fayde.UIElementFlags.None;

        DirtyFlags: _Dirty = 0;
        InUpDirty: bool = false;
        InDownDirty: bool = false;
        DirtyRegion: rect = null;
        private _ForceInvalidateOfNewBounds: bool = false;

        constructor(public Node: UINode) { }

        OnIsAttachedChanged(newIsAttached: bool, visualParentNode: UINode) {
            this.UpdateTotalRenderVisibility();
            if (!newIsAttached) {
                this._CacheInvalidateHint();
                var surface = this.Surface;
                if (surface) surface.OnNodeDetached(this);
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

        SetContainerMode(isLayoutContainer: bool, isContainer?: bool) {
            if (isLayoutContainer != null)
                this.IsLayoutContainer = isLayoutContainer;
            if (isContainer != null)
                this.IsContainer = isContainer;
            else
                this.IsContainer = isLayoutContainer;
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
                    this.Surface._AddDirtyElement(this, dirtyEnum.NewBounds);

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
                        this.Surface._Invalidate(dirty);
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
            var s = this.Surface;
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
            this.DirtyFlags |= _Dirty.Measure;
            this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
        }
        InvalidateArrange() {
            this.DirtyFlags |= _Dirty.Arrange;
            this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
        }

        UpdateTransform() {
            if (this.Node.IsAttached)
                this.Surface._AddDirtyElement(this, _Dirty.LocalTransform);
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
            if (this.Node.IsAttached)
                this.Surface._AddDirtyElement(this, _Dirty.LocalProjection);
        }
        TransformPoint(p: Point) {
            //TODO: Implement
        }

        UpdateRenderVisibility(vpLu: Fayde.LayoutUpdater) {
            var uie = this.Node.XObject;
            if (vpLu) {
                var vp = vpLu.Node.XObject;
                this.TotalOpacity = vpLu.TotalOpacity * uie.Opacity;
                this.TotalIsRenderVisible = (vp.Visibility === 0) && (uie.Visibility === 0);
            } else {
                this.TotalOpacity = uie.Opacity;
                this.TotalIsRenderVisible = (uie.Visibility === 0);
            }
        }
        UpdateTotalRenderVisibility() {
            if (this.Node.IsAttached)
                this.Surface._AddDirtyElement(this, _Dirty.RenderVisibility);
        }
        UpdateHitTestVisibility(vpLu: Fayde.LayoutUpdater) {
            var uie = this.Node.XObject;
            if (vpLu) {
                this.TotalIsHitTestVisible = vpLu.TotalIsHitTestVisible && uie.IsHitTestVisible;
            } else {
                this.TotalIsHitTestVisible = uie.IsHitTestVisible;
            }
        }
        UpdateTotalHitTestVisibility() {
            if (this.Node.IsAttached)
                this.Surface._AddDirtyElement(this, _Dirty.HitTestVisibility);
        }
        
        UpdateBounds(forceRedraw?: bool) {
            if (this.Node.IsAttached)
                this.Surface._AddDirtyElement(this, _Dirty.Bounds);
            this._ForceInvalidateOfNewBounds = this._ForceInvalidateOfNewBounds || forceRedraw;
        }
        ComputeBounds() {
            //TODO: Implement
        }

        UpdateStretch() {
            rect.clear(this.Extents);
            rect.clear(this.ExtentsWithChildren);
        }

        SetLayoutClip(layoutClip: Media.Geometry) {
            this.LayoutClip = layoutClip;
            if (!layoutClip)
                rect.clear(this.LayoutClipBounds);
            else
                rect.copyTo(layoutClip.GetBounds(), this.LayoutClipBounds);
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
                        lu._UpdateActualSize();
                    }
                    //LayoutDebug(function () { return "Completed _SizeList Update"; });
                } else {
                    break;
                }
            }
        }

        private _UpdateActualSize() {
            var last = this.LastRenderSize;
            var fe = <FrameworkElement>this.Node.XObject;
            var s: size;
            if ((<IActualSizeComputable><any>fe).ComputeActualSize)
                s = (<IActualSizeComputable><any>fe).ComputeActualSize(this._ComputeActualSize, this);
            else
                s = this._ComputeActualSize();
            if (last && size.isEqual(last, s))
                return;
            this.LastRenderSize = s;
            fe.SizeChanged.Raise(fe, new SizeChangedEventArgs(last, s));
        }
        private _ComputeActualSize(): size {
            var node = this.Node;

            if (node.XObject.Visibility !== Fayde.Visibility.Visible)
                return new size();

            var parentNode = node.VisualParentNode;
            if ((parentNode && !(parentNode.XObject instanceof Controls.Canvas)) || this.IsLayoutContainer)
                return size.clone(this.RenderSize);

            return this.CoerceSize(new size());
        }
        CoerceSize(s: size): size {
            var fe = <FrameworkElement>this.Node.XObject;
            var spw = fe.Width;
            var sph = fe.Height;
            var minw = fe.MinWidth;
            var minh = fe.MinHeight;
            var cw = minw;
            var ch = minh;

            cw = Math.max(cw, s.Width);
            ch = Math.max(ch, s.Height);

            if (!isNaN(spw))
                cw = spw;

            if (!isNaN(sph))
                ch = sph;

            cw = Math.max(Math.min(cw, fe.MaxWidth), minw);
            ch = Math.max(Math.min(ch, fe.MaxHeight), minh);

            if (fe.UseLayoutRounding) {
                cw = Math.round(cw);
                ch = Math.round(ch);
            }

            s.Width = cw;
            s.Height = ch;
            return s;
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
            var last = this.PreviousConstraint;
            var node = this.Node;
            var visualParentNode = node.VisualParentNode;

            if (!node.IsAttached && !last && !visualParentNode && this.IsLayoutContainer) {
                last = size.createInfinite();
            }

            if (last) {
                var previousDesired = size.clone(this.DesiredSize);
                this._Measure(last, error);
                if (size.isEqual(previousDesired, this.DesiredSize))
                    return;
            }

            if (visualParentNode)
                visualParentNode.LayoutUpdater.InvalidateMeasure();

            this.DirtyFlags &= ~_Dirty.Measure;
        }
        _Measure(availableSize: size, error: BError) {
            if (error.Message)
                return;

            var node = <FENode>this.Node;
            var fe = node.XObject;

            if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
                error.Message = "Cannot call Measure using a size with NaN values";
                LayoutUpdater.LayoutExceptionUpdater = this;
                return;
            }

            var last = this.PreviousConstraint;
            var shouldMeasure = (this.DirtyFlags & _Dirty.Measure) > 0;
            shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);

            if (fe.Visibility !== Fayde.Visibility.Visible) {
                this.PreviousConstraint = availableSize;
                size.clear(this.DesiredSize);
                return;
            }

            node._ApplyTemplateWithError(error);

            if (!shouldMeasure)
                return;

            this.PreviousConstraint = availableSize;

            this.InvalidateArrange();
            this.UpdateBounds();

            var s = size.clone(availableSize);
            var margin = fe.Margin;
            if (margin)
                size.shrinkByThickness(s, margin);
            this.CoerceSize(s);

            if ((<any>fe).MeasureOverride) {
                s = (<IMeasurable><any>fe).MeasureOverride(s);
            } else {
                s = (<IMeasurableHidden>fe)._MeasureOverride(s, error);
            }

            if (error.Message)
                return;

            this.DirtyFlags &= ~_Dirty.Measure;
            this.HiddenDesire = size.clone(s);

            var visualParentNode = node.VisualParentNode;
            if (!visualParentNode || visualParentNode instanceof Controls.CanvasNode) {
                if (node instanceof Controls.CanvasNode || !this.IsLayoutContainer) {
                    size.clear(this.DesiredSize);
                    return;
                }
            }

            this.CoerceSize(s);
            if (margin)
                size.growByThickness(s, margin);
            size.min(s, availableSize);

            if (fe.UseLayoutRounding) {
                s.Width = Math.round(s.Width);
                s.Height = Math.round(s.Height);
            }

            size.copyTo(s, this.DesiredSize);
        }
        private _DoArrangeWithError(error: BError) {
            var last = this.LayoutSlot;
            if (last === null)
                last = undefined;

            var n = <FENode>this.Node;
            var fe = n.XObject;
            var visualParentNode = n.VisualParentNode;
            if (!visualParentNode) {
                var surface = this.Surface;
                var desired: size;
                if (this.IsLayoutContainer) {
                    desired = size.clone(this.DesiredSize);
                    if (n.IsAttached && n.IsTopLevel && !n.ParentNode) {
                        var measure = this.PreviousConstraint;
                        if (measure)
                            size.max(desired, measure);
                        else
                            desired = size.clone(surface.Extents);
                    }
                } else {
                    desired.Width = fe.ActualWidth;
                    desired.Height = fe.ActualHeight;
                }

                var viewport = rect.fromSize(desired);
                viewport.X = Controls.Canvas.GetLeft(fe);
                viewport.Y = Controls.Canvas.GetTop(fe);
                last = viewport;
            }

            if (last) {
                this._Arrange(last, error);
            } else {
                if (visualParentNode)
                    visualParentNode.LayoutUpdater.InvalidateArrange();
            }
        }
        _Arrange(finalRect: rect, error: BError) {
            if (error.Message)
                return;

            var node = <FENode>this.Node;
            var fe = node.XObject;

            if (fe.UseLayoutRounding) {
                rect.round(finalRect);
            }

            if (finalRect.Width < 0 || finalRect.Height < 0
                    || !isFinite(finalRect.Width) || !isFinite(finalRect.Height)
                    || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
                var desired = this.DesiredSize;
                Warn("Invalid arguments to Arrange. Desired = " + desired.toString());
                return;
            }


            if (fe.Visibility !== Fayde.Visibility.Visible) {
                this.LayoutSlot = finalRect;
                return;
            }

            var slot = this.LayoutSlot;
            var shouldArrange = (this.DirtyFlags & _Dirty.Arrange) > 0 || !slot || !rect.isEqual(slot, finalRect);
            if (!shouldArrange)
                return;

            var measure = this.PreviousConstraint;
            if (this.IsContainer && !measure) {
                this._Measure(size.fromRect(finalRect), error);
            }
            measure = this.PreviousConstraint;

            this.SetLayoutClip(undefined);

            var childRect = rect.clone(finalRect);
            var margin = fe.Margin;
            if (margin)
                rect.shrinkByThickness(childRect, margin);

            this.UpdateTransform();
            this.UpdateProjection();
            this.UpdateBounds();

            var offer = size.clone(this.HiddenDesire);

            var stretched = this.CoerceSize(size.fromRect(childRect));
            var framework = this.CoerceSize(new size());

            var horiz = fe.HorizontalAlignment;
            var vert = fe.VerticalAlignment;

            if (horiz === HorizontalAlignment.Stretch)
                framework.Width = Math.max(framework.Width, stretched.Width);

            if (vert === VerticalAlignment.Stretch)
                framework.Height = Math.max(framework.Height, stretched.Height);

            size.max(offer, framework);

            this.LayoutSlot = finalRect;

            var response: size;
            if ((<any>fe).ArrangeOverride) {
                response = (<IArrangeable><any>fe).ArrangeOverride(offer);
            } else {
                response = (<IArrangeableHidden>fe)._ArrangeOverride(offer, error);
            }

            if (horiz === HorizontalAlignment.Stretch)
                response.Width = Math.max(response.Width, framework.Width);

            if (vert === VerticalAlignment.Stretch)
                response.Height = Math.max(response.Height, framework.Height);

            var flipHoriz = false;
            var flowDirection = fe.FlowDirection;
            var visualParentNode = <FENode>node.VisualParentNode;
            if (visualParentNode)
                flipHoriz = visualParentNode.XObject.FlowDirection !== flowDirection;
            else if (node.ParentNode instanceof Controls.Primitives.PopupNode)
                flipHoriz = (<Controls.Primitives.PopupNode>node.ParentNode).XObject.FlowDirection !== flowDirection;
            else
                flipHoriz = flowDirection === FlowDirection.RightToLeft;

            var layoutXform = mat3.identity(this.LayoutXform);
            mat3.translate(layoutXform, childRect.X, childRect.Y);
            if (flipHoriz) {
                mat3.translate(layoutXform, offer.Width, 0);
                mat3.scale(layoutXform, -1, 1);
            }

            if (error.Message)
                return;

            this.DirtyFlags &= ~_Dirty.Arrange;
            var visualOffset = this.VisualOffset;
            visualOffset.X = childRect.X;
            visualOffset.Y = childRect.Y;

            var oldSize = size.clone(this.RenderSize);

            if (fe.UseLayoutRounding) {
                response.Width = Math.round(response.Width);
                response.Height = Math.round(response.Height);
            }

            size.copyTo(response, this.RenderSize);
            var constrainedResponse = this.CoerceSize(size.clone(response));
            size.min(constrainedResponse, response);

            if (!visualParentNode || visualParentNode instanceof Controls.CanvasNode) {
                if (!this.IsLayoutContainer) {
                    size.clear(this.RenderSize);
                    return;
                }
            }

            var isTopLevel = node.IsAttached && node.IsTopLevel;
            if (!isTopLevel) {
                switch (horiz) {
                    case HorizontalAlignment.Left:
                        break;
                    case HorizontalAlignment.Right:
                        visualOffset.X += childRect.Width - constrainedResponse.Width;
                        break;
                    case HorizontalAlignment.Center:
                        visualOffset.X += (childRect.Width - constrainedResponse.Width) * 0.5;
                        break;
                    default:
                        visualOffset.X += Math.max((childRect.Width - constrainedResponse.Width) * 0.5, 0);
                        break;
                }

                switch (vert) {
                    case VerticalAlignment.Top:
                        break;
                    case VerticalAlignment.Bottom:
                        visualOffset.Y += childRect.Height - constrainedResponse.Height;
                        break;
                    case VerticalAlignment.Center:
                        visualOffset.Y += (childRect.Height - constrainedResponse.Height) * 0.5;
                        break;
                    default:
                        visualOffset.Y += Math.max((childRect.Height - constrainedResponse.Height) * 0.5, 0);
                        break;
                }
            }

            if (fe.UseLayoutRounding) {
                visualOffset.X = Math.round(visualOffset.X);
                visualOffset.Y = Math.round(visualOffset.Y);
            }

            layoutXform = mat3.identity(this.LayoutXform);
            mat3.translate(layoutXform, visualOffset.X, visualOffset.Y);
            if (flipHoriz) {
                mat3.translate(layoutXform, response.Width, 0);
                mat3.scale(layoutXform, -1, 1);
            }

            var element = new rect();
            element.Width = response.Width;
            element.Height = response.Height;
            var layoutClip = rect.clone(childRect);
            layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
            layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
            if (fe.UseLayoutRounding) {
                layoutClip.X = Math.round(layoutClip.X);
                layoutClip.Y = Math.round(layoutClip.Y);
            }

            if (((!isTopLevel && rect.isRectContainedIn(element, layoutClip)) || !size.isEqual(constrainedResponse, response))
                && !(node instanceof Controls.CanvasNode) && ((visualParentNode && !(visualParentNode instanceof Controls.CanvasNode)) || this.IsContainer)) {
                var frameworkClip = this.CoerceSize(size.createInfinite());
                var frect = rect.fromSize(frameworkClip);
                rect.intersection(layoutClip, frect);
                var rectangle = new Media.RectangleGeometry();
                rectangle.Rect = layoutClip;
                this.SetLayoutClip(rectangle);
            }

            if (!size.isEqual(oldSize, response)) {
                if (!this.LastRenderSize) {
                    this.LastRenderSize = oldSize;
                    this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
                }
            }
        }
        DoRender(ctx: Fayde.RenderContext, r: rect) {
            if (!this.TotalIsRenderVisible)
                return;
            if ((this.TotalOpacity * 255) < 0.5)
                return;

            var region = new rect();
            if (false) {
                //TODO: Render to intermediate
            } else {
                rect.copyTo(this.SubtreeExtents, region);
                rect.transform(region, this.RenderXform);
                rect.transform(region, ctx.CurrentTransform);
                rect.roundOut(region);
                rect.intersection(region, r);
            }

            if (rect.isEmpty(region))
                return;

            ctx.Save();

            ctx.TransformMatrix(this.RenderXform);
            ctx.CanvasContext.globalAlpha = this.TotalOpacity;

            var uie = this.Node.XObject;
            var canvasCtx = ctx.CanvasContext;
            var clip = uie.Clip;
            if (clip) {
                clip.Draw(ctx);
                canvasCtx.clip();
            }

            /*
            if (window.RenderDebug) {
                RenderDebug.Count++;
                RenderDebug(this.__DebugToString());
            }
            */

            var effect = uie.Effect;
            if (effect) {
                canvasCtx.save();
                effect.PreRender(ctx);
            }
            if ((<IRenderable><any>uie).Render)
                (<IRenderable><any>uie).Render(ctx, this, region);
            if (effect) {
                canvasCtx.restore();
            }

            //if (window.RenderDebug) RenderDebug.Indent();
            var enumerator = this.Node.GetVisualTreeEnumerator(VisualTreeDirection.ZFoward);
            while (enumerator.MoveNext()) {
                (<UINode>enumerator.Current).LayoutUpdater.DoRender(ctx, region);
            }
            //if (window.RenderDebug) RenderDebug.Unindent();

            ctx.Restore();
        }
        _RenderLayoutClip(ctx: RenderContext) {
            var iX = 0;
            var iY = 0;

            var curNode = this.Node;
            while (curNode) {
                var lu = curNode.LayoutUpdater;
                var geom = lu.LayoutClip;
                if (geom)
                    ctx.ClipGeometry(geom);

                if (lu.BreaksLayoutClipRender) //Canvas or UserControl
                    break;
                var visualOffset = lu.VisualOffset;
                if (visualOffset) {
                    ctx.Translate(-visualOffset.X, -visualOffset.Y);
                    iX += visualOffset.X;
                    iY += visualOffset.Y;
                }

                curNode = curNode.VisualParentNode;
            }
            ctx.Translate(iX, iY);
        }
        _HasLayoutClip(): bool {
            var curNode = this.Node;
            var lu: LayoutUpdater;
            while (curNode) {
                lu = curNode.LayoutUpdater;
                if (lu.LayoutClip)
                    return true;
                if (lu.BreaksLayoutClipRender)
                    break;
                curNode = curNode.VisualParentNode;
            }
            return false;
        }
    }
    Nullstone.RegisterType(LayoutUpdater, "LayoutUpdater");
}