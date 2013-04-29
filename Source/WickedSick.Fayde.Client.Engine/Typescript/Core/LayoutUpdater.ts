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
    export interface IBoundsComputable {
        ComputeBounds(baseComputer: () => void , lu: LayoutUpdater);
    }

    var maxPassCount = 250;
    export class LayoutUpdater {
        static LayoutExceptionUpdater: LayoutUpdater = undefined;

        Surface: Surface;

        LayoutClip: Media.Geometry = undefined;
        LayoutSlot: rect = undefined;
        PreviousConstraint: size = undefined;
        LastRenderSize: size = undefined;
        HiddenDesire: size = size.createNegativeInfinite();
        DesiredSize: size = new size();
        RenderSize: size = new size();
        VisualOffset: Point = new Point();
        
        ActualHeight: number = NaN;
        ActualWidth: number = NaN;

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
        BoundsWithChildren: rect = new rect();
        GlobalBounds: rect = new rect();
        GlobalBoundsWithChildren: rect = new rect();
        SurfaceBounds: rect = new rect();
        SurfaceBoundsWithChildren: rect = new rect();
        LayoutClipBounds: rect = new rect();
        EffectPadding: Thickness = new Thickness();
        ClipBounds: rect = new rect();

        SubtreeExtents: rect;
        SubtreeBounds: rect;

        IsContainer: bool = false;
        IsLayoutContainer: bool = false;
        BreaksLayoutClipRender: bool = false;

        Flags: Fayde.UIElementFlags = Fayde.UIElementFlags.RenderVisible | Fayde.UIElementFlags.HitTestVisible;

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
            var thisUie = thisNode.XObject;
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
                this.ComputeLocalTransform(thisUie);
                //DirtyDebug("--> " + xformer.LocalXform._Elements.toString());
            }
            if (isLP) {
                //DirtyDebug("ComputeLocalProjection: [" + uie.__DebugToString() + "]");
                this.ComputeLocalProjection(thisUie);
            }
            if (isT) {
                //DirtyDebug("ComputeTransform: [" + uie.__DebugToString() + "]");
                this.ComputeTransform(thisNode, visualParentLu);
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

                if ((<IBoundsComputable><any>thisNode).ComputeBounds)
                    (<IBoundsComputable><any>thisNode).ComputeBounds(this.ComputeBounds, this);
                else
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
            if (!r)
                r = this.SurfaceBounds;
            if (!this.TotalIsRenderVisible || (this.TotalOpacity * 255) < 0.5)
                return;

            if (this.Node.IsAttached) {
                this.Surface._AddDirtyElement(this, _Dirty.Invalidate);
                this.InvalidateBitmapCache();
                if (false) {
                    //TODO: Render Intermediate not implemented
                    rect.union(this.DirtyRegion, this.SubtreeBounds);
                } else {
                    rect.union(this.DirtyRegion, r);
                }
                //this._OnInvalidated();
            }
        }
        private _CacheInvalidateHint() {
        }
        ComputeComposite() {
            //NotImplemented
        }
        InvalidateBitmapCache() {
            //NotImplemented
        }
        InvalidateMeasure() {
            this.DirtyFlags |= _Dirty.Measure;
            this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
        }
        InvalidateArrange() {
            this.DirtyFlags |= _Dirty.Arrange;
            this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
        }
        InvalidateSubtreePaint() {
            this.Invalidate(this.SubtreeBounds);
        }

        UpdateTransform() {
            if (this.Node.IsAttached)
                this.Surface._AddDirtyElement(this, _Dirty.LocalTransform);
        }
        ComputeLocalTransform(uie: UIElement) {
            var transform = uie.RenderTransform;
            if (!transform)
                return;

            var transformOrigin: IPoint;
            if (uie instanceof Controls.TextBlock)
                transformOrigin = this.GetTextBlockTransformOrigin(<Controls.TextBlock>uie);
            else
                transformOrigin = this.GetTransformOrigin(uie);
            mat3.identity(this.LocalXform);
            var render = mat3.create();
            mat3.set(transform.Value._Raw, render);

            mat3.translate(this.LocalXform, transformOrigin.X, transformOrigin.Y);
            mat3.multiply(this.LocalXform, render, this.LocalXform); //local = render * local
            mat3.translate(this.LocalXform, -transformOrigin.X, -transformOrigin.Y);
        }
        ComputeLocalProjection(uie: UIElement) {
            var projection = uie.Projection;
            if (!projection) {
                Controls.Panel.SetZ(uie, NaN);
                return;
            }

            var objectSize: ISize = (uie instanceof Shapes.Shape) ? this._GetShapeBrushSize(<Shapes.Shape>uie) : this._GetBrushSize();
            var z = projection.GetDistanceFromXYPlane(objectSize);
            Controls.Panel.SetZ(uie, z);
        }
        ComputeTransform(uin: UINode, vplu: LayoutUpdater) {
            var uie = uin.XObject;
            var projection = uie.Projection;

            var oldProjection = mat4.clone(this.LocalProjection);
            var old = mat3.clone(this.AbsoluteXform);

            var renderXform = mat3.identity(this.RenderXform);
            mat4.identity(this.LocalProjection);
            this._CarryParentTransform(vplu, uin.ParentNode);
            mat3.multiply(renderXform, this.LayoutXform, renderXform); //render = layout * render
            mat3.multiply(renderXform, this.LocalXform, renderXform); //render = local * render

            var m = mat3.toAffineMat4(renderXform);
            mat4.multiply(this.LocalProjection, m, this.LocalProjection); //local = m * local

            if (false) {
                //TODO: Render To Intermediate not implemented
            } else {
                mat3.multiply(this.AbsoluteXform, this.RenderXform, this.AbsoluteXform); //abs = render * abs
            }

            if (projection) {
                m = projection.GetTransform();
                mat4.multiply(m, this.LocalProjection, this.LocalProjection); //local = local * m
                this.Flags |= UIElementFlags.RenderProjection;
            }

            mat4.multiply(this.LocalProjection, this.AbsoluteProjection, this.AbsoluteProjection); //abs = abs * local

            if (uin instanceof Controls.Primitives.PopupNode) {
                var popupChildNode = <UINode>(<Controls.Primitives.PopupNode>uin).SubtreeNode;
                if (popupChildNode)
                    popupChildNode.LayoutUpdater.UpdateTransform();
            }
            if (!mat4.equal(oldProjection, this.LocalProjection)) {
                if (vplu)
                    vplu.Invalidate(this.SubtreeBounds);
                else if (uin.IsTopLevel)
                    this.InvalidateSubtreePaint();

                if (uin.IsAttached)
                    this.Surface._AddDirtyElement(this, _Dirty.NewBounds);
            }

            // render = local
            mat4.set(this.LocalProjection, this.RenderProjection);

            //TODO: We can optimize to shift bounds rather than going through an UpdateBounds invalidation
            this.UpdateBounds();
            
            this.ComputeComposite();
        }
        private _CarryParentTransform(vpLu: LayoutUpdater, parentNode: XamlNode) {
            if (vpLu) {
                mat3.set(vpLu.AbsoluteXform, this.AbsoluteXform);
                mat4.set(vpLu.AbsoluteProjection, this.AbsoluteProjection);
                return;
            }

            mat3.identity(this.AbsoluteXform);
            mat4.identity(this.AbsoluteProjection);

            if (parentNode instanceof Controls.Primitives.PopupNode) {
                var popupNode = <Controls.Primitives.PopupNode>parentNode;
                var elNode: UINode = popupNode;
                while (elNode) {
                    this.Flags |= (elNode.LayoutUpdater.Flags & UIElementFlags.RenderProjection);
                    elNode = elNode.VisualParentNode;
                }
                
                var popup = popupNode.XObject;
                var popupLu = popupNode.LayoutUpdater;
                if (this.Flags & UIElementFlags.RenderProjection) {
                    mat4.set(popupLu.AbsoluteProjection, this.LocalProjection);
                    var m = mat4.createTranslate(popup.HorizontalOffset, popup.VerticalOffset, 0.0);
                    mat4.multiply(m, this.LocalProjection, this.LocalProjection); //local = local * m
                } else {
                    var pap = popupLu.AbsoluteProjection;
                    var renderXform = this.RenderXform;
                    renderXform[0] = pap[0];
                    renderXform[1] = pap[1];
                    renderXform[2] = pap[3];
                    renderXform[3] = pap[4];
                    renderXform[4] = pap[5];
                    renderXform[5] = pap[7];
                    mat3.translate(renderXform, popup.HorizontalOffset, popup.VerticalOffset);
                }
            }
        }
        UpdateProjection() {
            if (this.Node.IsAttached)
                this.Surface._AddDirtyElement(this, _Dirty.LocalProjection);
        }
        TransformPoint(p: Point) {
            var inverse: number[] = mat4.inverse(this.AbsoluteProjection, mat4.create());
            if (!inverse) {
                Warn("Could not get inverse of Absolute Projection for UIElement.");
                return;
            }

            var p4: number[] = vec4.createFrom(p.X, p.Y, 0.0, 1.0);
            var m20 = inverse[2];
            var m21 = inverse[6];
            var m22 = inverse[10];
            var m23 = inverse[14];
            p4[2] = -(m20 * p4[0] + m21 * p4[1] + m23) / m22;

            mat4.transformVec4(inverse, p4);
            p.X = p4[0] / p4[3];
            p.Y = p4[1] / p4[3];
        }
        TransformToVisual(toUin: UINode): Media.GeneralTransform {
            //1. invert transform from input element to top level
            //2. transform back down to this element
            var result = mat4.create();
            // A = From, B = To, M = what we want
            // A = M * B
            // => M = inv (B) * A
            if (toUin) {
                var inverse = mat4.create();
                mat4.inverse(toUin.LayoutUpdater.AbsoluteProjection, inverse);
                mat4.multiply(this.AbsoluteProjection, inverse, result); //result = inverse * abs
            } else {
                mat4.set(this.AbsoluteProjection, result); //result = absolute
            }

            var raw = mat4.toAffineMat3(result);
            if (raw) {
                var mt = new Media.MatrixTransform();
                mt._Store.SetValue(Media.MatrixTransform.MatrixProperty, new Media.Matrix(raw));
                return mt;
            }

            return new Media.InternalTransform(result);
        }
        GetTransformOrigin(uie: UIElement): IPoint {
            var userXformOrigin = uie.RenderTransformOrigin;
            if (!userXformOrigin)
                return { X: 0, Y: 0 };
            return { X: this.ActualWidth * userXformOrigin.X, Y: this.ActualHeight * userXformOrigin.Y };
        }
        GetTextBlockTransformOrigin(tb: Controls.TextBlock): IPoint {
            var userXformOrigin = tb.RenderTransformOrigin;
            if (!userXformOrigin)
                return { X: 0, Y: 0 };
            var xformSize = this.CoerceSize(this.RenderSize);
            return {
                X: xformSize.Width * userXformOrigin.X,
                Y: xformSize.Height * userXformOrigin.Y
            };
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
            var s = this.CoerceSize(size.fromRaw(this.ActualWidth, this.ActualHeight));

            rect.set(this.Extents, 0, 0, s.Width, s.Height);
            rect.copyTo(this.Extents, this.ExtentsWithChildren);
            
            var node = this.Node;
            var enumerator = node.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var item = <UINode>enumerator.Current;
                var itemlu = item.LayoutUpdater;
                if (itemlu.TotalIsRenderVisible)
                    rect.union(this.ExtentsWithChildren, itemlu.GlobalBounds);
            }

            this.IntersectBoundsWithClipPath(this.Bounds, this.AbsoluteXform);
            rect.copyGrowTransform(this.BoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, this.AbsoluteXform);

            this.ComputeGlobalBounds();
            this.ComputeSurfaceBounds();
        }
        ComputeGlobalBounds() {
            this.IntersectBoundsWithClipPath(this.GlobalBounds, this.LocalXform);
            rect.copyGrowTransform4(this.GlobalBoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, this.LocalProjection);
        }
        ComputeSurfaceBounds() {
            this.IntersectBoundsWithClipPath(this.SurfaceBounds, this.AbsoluteXform);
            rect.copyGrowTransform4(this.SurfaceBoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, this.AbsoluteProjection);
        }
        IntersectBoundsWithClipPath(dest: rect, xform: number[]) {
            var isClipEmpty = rect.isEmpty(this.ClipBounds);
            var isLayoutClipEmpty = rect.isEmpty(this.LayoutClipBounds);

            if ((!isClipEmpty || !isLayoutClipEmpty) && !this.TotalIsRenderVisible) {
                rect.clear(dest);
                return;
            }

            rect.copyGrowTransform(dest, this.Extents, this.EffectPadding, xform);

            if (!isClipEmpty)
                rect.intersection(dest, this.ClipBounds);
            if (!isLayoutClipEmpty)
                rect.intersection(dest, this.LayoutClipBounds);
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
                    var measureWalker = Fayde.DeepTreeWalker(elNode);
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
            this.ActualWidth = s.Width;
            this.ActualHeight;
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
        private _GetBrushSize(): ISize {
            return {
                Width: this.ActualWidth,
                Height: this.ActualHeight
            };
        }
        private _GetShapeBrushSize(shape: Shapes.Shape): ISize {
            return size.fromRect(shape.XamlNode.GetStretchExtents(shape, this));
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