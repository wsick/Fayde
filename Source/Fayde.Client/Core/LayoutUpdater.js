/// <reference path="../Runtime/TypeManagement.ts" />
var Fayde;
(function (Fayde) {
    var _Dirty;
    (function (_Dirty) {
        _Dirty[_Dirty["Transform"] = 1 << 0] = "Transform";
        _Dirty[_Dirty["LocalTransform"] = 1 << 1] = "LocalTransform";
        _Dirty[_Dirty["LocalProjection"] = 1 << 2] = "LocalProjection";
        _Dirty[_Dirty["Clip"] = 1 << 3] = "Clip";
        _Dirty[_Dirty["LocalClip"] = 1 << 4] = "LocalClip";
        _Dirty[_Dirty["LayoutClip"] = 1 << 5] = "LayoutClip";
        _Dirty[_Dirty["RenderVisibility"] = 1 << 6] = "RenderVisibility";
        _Dirty[_Dirty["HitTestVisibility"] = 1 << 7] = "HitTestVisibility";
        _Dirty[_Dirty["Measure"] = 1 << 8] = "Measure";
        _Dirty[_Dirty["Arrange"] = 1 << 9] = "Arrange";
        _Dirty[_Dirty["ChildrenZIndices"] = 1 << 10] = "ChildrenZIndices";
        _Dirty[_Dirty["Bounds"] = 1 << 20] = "Bounds";
        _Dirty[_Dirty["NewBounds"] = 1 << 21] = "NewBounds";
        _Dirty[_Dirty["Invalidate"] = 1 << 22] = "Invalidate";
        _Dirty[_Dirty["InUpDirtyList"] = 1 << 30] = "InUpDirtyList";
        _Dirty[_Dirty["InDownDirtyList"] = 1 << 31] = "InDownDirtyList";

        _Dirty[_Dirty["DownDirtyState"] = _Dirty.Transform | _Dirty.LocalTransform | _Dirty.LocalProjection | _Dirty.Clip | _Dirty.LocalClip | _Dirty.LayoutClip | _Dirty.RenderVisibility | _Dirty.HitTestVisibility | _Dirty.ChildrenZIndices] = "DownDirtyState";
        _Dirty[_Dirty["UpDirtyState"] = _Dirty.Bounds | _Dirty.Invalidate] = "UpDirtyState";
    })(_Dirty || (_Dirty = {}));

    var UIElementFlags;
    (function (UIElementFlags) {
        UIElementFlags[UIElementFlags["None"] = 0] = "None";

        UIElementFlags[UIElementFlags["RenderVisible"] = 0x02] = "RenderVisible";
        UIElementFlags[UIElementFlags["HitTestVisible"] = 0x04] = "HitTestVisible";
        UIElementFlags[UIElementFlags["TotalRenderVisible"] = 0x08] = "TotalRenderVisible";
        UIElementFlags[UIElementFlags["TotalHitTestVisible"] = 0x10] = "TotalHitTestVisible";

        UIElementFlags[UIElementFlags["DirtyArrangeHint"] = 0x800] = "DirtyArrangeHint";
        UIElementFlags[UIElementFlags["DirtyMeasureHint"] = 0x1000] = "DirtyMeasureHint";
        UIElementFlags[UIElementFlags["DirtySizeHint"] = 0x2000] = "DirtySizeHint";
    })(UIElementFlags || (UIElementFlags = {}));

    var maxPassCount = 250;
    var LayoutUpdater = (function () {
        function LayoutUpdater(Node) {
            this.Node = Node;
            this.LayoutClip = undefined;
            this.CompositeLayoutClip = undefined;
            this.LayoutSlot = undefined;
            this.PreviousConstraint = undefined;
            this.LastRenderSize = undefined;
            this.HiddenDesire = size.createNegativeInfinite();
            this.DesiredSize = new size();
            this.RenderSize = new size();
            this.VisualOffset = new Point();
            this.ActualHeight = NaN;
            this.ActualWidth = NaN;
            this.AbsoluteXform = mat3.identity();
            this.LayoutXform = mat3.identity();
            this.LocalXform = mat3.identity();
            this.RenderXform = mat3.identity();
            this.CarrierXform = null;
            this.LocalProjection = mat4.identity();
            this.AbsoluteProjection = mat4.identity();
            this.RenderProjection = mat4.identity();
            this.CarrierProjection = null;
            this.TotalOpacity = 1.0;
            this.TotalIsRenderVisible = true;
            this.TotalIsHitTestVisible = true;
            this.TotalRenderProjection = false;
            this.Extents = new rect();
            this.ExtentsWithChildren = new rect();
            this.Bounds = new rect();
            this.BoundsWithChildren = new rect();
            this.GlobalBounds = new rect();
            this.GlobalBoundsWithChildren = new rect();
            this.SurfaceBounds = new rect();
            this.SurfaceBoundsWithChildren = new rect();
            this.EffectPadding = new Thickness();
            this.ClipBounds = new rect();
            this.IsContainer = false;
            this.IsLayoutContainer = false;
            this.BreaksLayoutClipRender = false;
            this.CanHitElement = false;
            this.ShouldSkipHitTest = false;
            this.IsNeverInsideObject = false;
            this.Flags = UIElementFlags.RenderVisible | UIElementFlags.HitTestVisible;
            this.DirtyFlags = 0;
            this.InUpDirty = false;
            this.InDownDirty = false;
            this.DirtyRegion = new rect();
            this._ForceInvalidateOfNewBounds = false;
        }
        LayoutUpdater.prototype.OnIsAttachedChanged = function (newIsAttached, visualParentNode) {
            this.UpdateTotalRenderVisibility();
            this.UpdateTotalHitTestVisibility();
            if (!newIsAttached) {
                this._CacheInvalidateHint();
                var surface = this.Surface;
                if (surface)
                    surface.OnNodeDetached(this);
            }
        };
        LayoutUpdater.prototype.OnAddedToTree = function () {
            this.UpdateTotalRenderVisibility();
            this.UpdateTotalHitTestVisibility();
            this.Invalidate();

            this.LayoutClip = undefined;

            size.clear(this.RenderSize);
            this.UpdateTransform();
            this.UpdateProjection();
            this.InvalidateMeasure();
            this.InvalidateArrange();
            if (this._HasFlag(UIElementFlags.DirtySizeHint) || this.LastRenderSize !== undefined)
                this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
        };
        LayoutUpdater.prototype.OnRemovedFromTree = function () {
            this.LayoutSlot = new rect();
            this.LayoutClip = undefined;
        };

        LayoutUpdater.prototype.SetContainerMode = function (isLayoutContainer, isContainer) {
            if (isLayoutContainer != null)
                this.IsLayoutContainer = isLayoutContainer;
            if (isContainer != null)
                this.IsContainer = isContainer;
else
                this.IsContainer = isLayoutContainer;
        };

        LayoutUpdater.prototype.HasMeasureArrangeHint = function () {
            return (this.Flags & (UIElementFlags.DirtyMeasureHint | UIElementFlags.DirtyArrangeHint)) > 0;
        };
        LayoutUpdater.prototype.ProcessDown = function () {
            var thisNode = this.Node;
            var thisUie = thisNode.XObject;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu;
            if (visualParentNode)
                visualParentLu = visualParentNode.LayoutUpdater;

            if (this.DirtyFlags & _Dirty.RenderVisibility) {
                this.DirtyFlags &= ~_Dirty.RenderVisibility;

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
                    this._AddDirtyElement(_Dirty.NewBounds);

                this._PropagateDirtyFlagToChildren(_Dirty.RenderVisibility);
            }

            if (this.DirtyFlags & _Dirty.HitTestVisibility) {
                this.DirtyFlags &= ~_Dirty.HitTestVisibility;

                //uie._ComputeTotalHitTestVisibility();
                this.UpdateHitTestVisibility(visualParentLu);
                this._PropagateDirtyFlagToChildren(_Dirty.HitTestVisibility);
            }

            var isLT = this.DirtyFlags & _Dirty.LocalTransform;
            var isLP = this.DirtyFlags & _Dirty.LocalProjection;
            var isT = isLT || isLP || this.DirtyFlags & _Dirty.Transform;
            this.DirtyFlags &= ~(_Dirty.LocalTransform | _Dirty.LocalProjection | _Dirty.Transform);

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

                if (visualParentLu)
                    visualParentLu.UpdateBounds();
                this._PropagateDirtyFlagToChildren(_Dirty.Transform);
            }

            var isLocalClip = this.DirtyFlags & _Dirty.LocalClip;
            var isLayoutClip = this.DirtyFlags & _Dirty.LayoutClip;
            var isClip = isLocalClip || this.DirtyFlags & _Dirty.Clip;
            this.DirtyFlags &= ~(_Dirty.LocalClip | _Dirty.LayoutClip | _Dirty.Clip);

            if (isLayoutClip) {
                this.ComputeLayoutClip(visualParentLu);
                this._PropagateDirtyFlagToChildren(_Dirty.LayoutClip);
            }

            if (this.DirtyFlags & _Dirty.ChildrenZIndices) {
                this.DirtyFlags &= ~_Dirty.ChildrenZIndices;
                thisNode._ResortChildrenByZIndex();
            }

            //DirtyDebug.Level--;
            return !(this.DirtyFlags & _Dirty.DownDirtyState);
        };
        LayoutUpdater.prototype.ProcessUp = function () {
            var thisNode = this.Node;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu;
            if (visualParentNode)
                visualParentLu = visualParentNode.LayoutUpdater;

            //i++;
            //DirtyDebug("Up Dirty Loop #" + i.toString() + " --> " + surface._UpDirty.__DebugToString());
            var invalidateSubtreePaint = false;
            if (this.DirtyFlags & _Dirty.Bounds) {
                this.DirtyFlags &= ~_Dirty.Bounds;

                var oextents = rect.copyTo(this.ExtentsWithChildren);
                var oglobalbounds = rect.copyTo(this.GlobalBoundsWithChildren);
                var osubtreebounds = rect.copyTo(this.SurfaceBoundsWithChildren);

                if ((thisNode).ComputeBounds)
                    (thisNode).ComputeBounds(this.ComputeBounds, this);
else
                    this.ComputeBounds();

                if (!rect.isEqual(oglobalbounds, this.GlobalBoundsWithChildren)) {
                    if (visualParentLu) {
                        visualParentLu.UpdateBounds();
                        visualParentLu.Invalidate(osubtreebounds);
                        visualParentLu.Invalidate(this.SurfaceBoundsWithChildren);
                    }
                }

                invalidateSubtreePaint = !rect.isEqual(oextents, this.ExtentsWithChildren) || this._ForceInvalidateOfNewBounds;
                this._ForceInvalidateOfNewBounds = false;
            }

            if (this.DirtyFlags & _Dirty.NewBounds) {
                if (visualParentLu)
                    visualParentLu.Invalidate(this.SurfaceBoundsWithChildren);
else if (thisNode.IsTopLevel)
                    invalidateSubtreePaint = true;
                this.DirtyFlags &= ~_Dirty.NewBounds;
            }
            if (invalidateSubtreePaint)
                this.Invalidate(this.SurfaceBoundsWithChildren);

            if (this.DirtyFlags & _Dirty.Invalidate) {
                this.DirtyFlags &= ~_Dirty.Invalidate;
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
            return !(this.DirtyFlags & _Dirty.UpDirtyState);
        };
        LayoutUpdater.prototype._PropagateDirtyFlagToChildren = function (dirt) {
            var enumerator = this.Node.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                (enumerator.Current).LayoutUpdater._AddDirtyElement(dirt);
            }
        };
        LayoutUpdater.prototype._AddDirtyElement = function (dirt) {
            if (this.Node.VisualParentNode == null && !this.Node.IsTopLevel)
                return;
            this.DirtyFlags |= dirt;
            var s = this.Surface;
            if (dirt & _Dirty.DownDirtyState && !this.InDownDirty) {
                (s)._DownDirty.push(this);
                this.InDownDirty = true;
            }
            if (dirt & _Dirty.UpDirtyState && !this.InUpDirty) {
                (s)._UpDirty.push(this);
                this.InUpDirty = true;
            }
        };

        LayoutUpdater.prototype.FullInvalidate = function (invTransforms) {
            this.Invalidate();
            if (invTransforms) {
                this.UpdateTransform();
                this.UpdateProjection();
            }
            this.UpdateBounds(true);
        };
        LayoutUpdater.prototype.Invalidate = function (r) {
            if (!r)
                r = this.SurfaceBounds;
            if (!this.TotalIsRenderVisible || (this.TotalOpacity * 255) < 0.5)
                return;

            if (this.Node.IsAttached) {
                this._AddDirtyElement(_Dirty.Invalidate);
                this.InvalidateBitmapCache();
                if (false) {
                    //TODO: Render Intermediate not implemented
                    rect.union(this.DirtyRegion, this.SurfaceBoundsWithChildren);
                } else {
                    rect.union(this.DirtyRegion, r);
                }
                //this._OnInvalidated();
            }
        };
        LayoutUpdater.prototype._CacheInvalidateHint = function () {
        };
        LayoutUpdater.prototype.ComputeComposite = function () {
            //NotImplemented
        };
        LayoutUpdater.prototype.InvalidateBitmapCache = function () {
            //NotImplemented
        };
        LayoutUpdater.prototype.InvalidateMeasure = function () {
            this.DirtyFlags |= _Dirty.Measure;
            this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
        };
        LayoutUpdater.prototype.InvalidateArrange = function () {
            this.DirtyFlags |= _Dirty.Arrange;
            this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
        };
        LayoutUpdater.prototype.InvalidateSubtreePaint = function () {
            this.Invalidate(this.SurfaceBoundsWithChildren);
        };
        LayoutUpdater.prototype.InvalidateVisibility = function (newVisibility) {
            if (newVisibility === Fayde.Visibility.Visible)
                this.Flags |= UIElementFlags.RenderVisible;
else
                this.Flags &= ~UIElementFlags.RenderVisible;
        };
        LayoutUpdater.prototype.InvalidateHitTestVisibility = function (newHitTestVisibility) {
            if (newHitTestVisibility)
                this.Flags |= UIElementFlags.HitTestVisible;
else
                this.Flags &= ~UIElementFlags.HitTestVisible;
        };

        LayoutUpdater.prototype.UpdateClip = function () {
            if (this.Node.IsAttached)
                this._AddDirtyElement(_Dirty.LocalClip);
        };
        LayoutUpdater.prototype.SetLayoutClip = function (layoutClip) {
            var old = this.LayoutClip;
            this.LayoutClip = layoutClip;
            if (old === layoutClip)
                return;
            if (old && layoutClip && rect.isEqual(old, layoutClip))
                return;
            if (this.Node.IsAttached)
                this._AddDirtyElement(_Dirty.LayoutClip);
        };
        LayoutUpdater.prototype.ComputeLayoutClip = function (vpLu) {
            if (this.BreaksLayoutClipRender) {
                this.CompositeLayoutClip = undefined;
                return;
            }

            var vpcomposite = (vpLu) ? vpLu.CompositeLayoutClip : undefined;
            var local = this.LayoutClip;

            if (vpcomposite && local)
                this.CompositeLayoutClip = rect.intersection(rect.copyTo(local), vpcomposite);
else if (vpcomposite)
                this.CompositeLayoutClip = rect.copyTo(vpcomposite);
else if (local)
                this.CompositeLayoutClip = rect.copyTo(local);
else
                this.CompositeLayoutClip = undefined;
        };

        LayoutUpdater.prototype.UpdateTransform = function () {
            if (this.Node.IsAttached)
                this._AddDirtyElement(_Dirty.LocalTransform);
        };
        LayoutUpdater.prototype.ComputeLocalTransform = function (uie) {
            var transform = uie.RenderTransform;
            if (!transform)
                return;

            var transformOrigin;
            if (uie instanceof Fayde.Controls.TextBlock)
                transformOrigin = this.GetTextBlockTransformOrigin(uie);
else
                transformOrigin = this.GetTransformOrigin(uie);
            mat3.identity(this.LocalXform);
            var render = mat3.create();
            mat3.set(transform.Value._Raw, render);

            mat3.translate(this.LocalXform, transformOrigin.X, transformOrigin.Y);
            mat3.multiply(this.LocalXform, render, this.LocalXform);
            mat3.translate(this.LocalXform, -transformOrigin.X, -transformOrigin.Y);
        };
        LayoutUpdater.prototype.ComputeLocalProjection = function (uie) {
            var projection = uie.Projection;
            if (!projection) {
                Fayde.Controls.Panel.SetZ(uie, NaN);
                return;
            }

            var objectSize = (uie instanceof Fayde.Shapes.Shape) ? this._GetShapeBrushSize(uie) : this._GetBrushSize();
            projection.SetObjectSize(objectSize);
            var z = projection.GetDistanceFromXYPlane();
            Fayde.Controls.Panel.SetZ(uie, z);
        };
        LayoutUpdater.prototype.ComputeTransform = function (uin, vplu) {
            var uie = uin.XObject;
            var projection = uie.Projection;

            var oldProjection = mat4.clone(this.LocalProjection);
            var old = mat3.clone(this.AbsoluteXform);

            mat4.identity(this.LocalProjection);
            if (vplu) {
                mat3.set(vplu.AbsoluteXform, this.AbsoluteXform);
                mat4.set(vplu.AbsoluteProjection, this.AbsoluteProjection);
                this.TotalRenderProjection = vplu.TotalRenderProjection;
            } else {
                mat3.identity(this.AbsoluteXform);
                mat4.identity(this.AbsoluteProjection);
                this.TotalRenderProjection = false;
            }
            var carrierProjection = this.CarrierProjection;
            var carrierXform = this.CarrierXform;
            if (carrierProjection)
                mat4.set(carrierProjection, this.LocalProjection);

            var renderXform = this.RenderXform;
            if (carrierXform)
                mat3.set(carrierXform, renderXform);
else
                mat3.identity(renderXform);

            mat3.multiply(renderXform, this.LayoutXform, renderXform);
            mat3.multiply(renderXform, this.LocalXform, renderXform);

            var m = mat3.toAffineMat4(renderXform);
            mat4.multiply(this.LocalProjection, m, this.LocalProjection);

            if (false) {
                //TODO: Render To Intermediate not implemented
            } else {
                mat3.multiply(this.RenderXform, this.AbsoluteXform, this.AbsoluteXform);
            }

            if (projection) {
                m = projection.GetTransform();
                mat4.multiply(m, this.LocalProjection, this.LocalProjection);
                this.TotalRenderProjection = true;
            }

            mat4.multiply(this.LocalProjection, this.AbsoluteProjection, this.AbsoluteProjection);

            if (uin instanceof Fayde.Controls.Primitives.PopupNode) {
                var popupChildNode = (uin).SubtreeNode;
                if (popupChildNode)
                    popupChildNode.LayoutUpdater.UpdateTransform();
            }
            if (!mat4.equal(oldProjection, this.LocalProjection)) {
                if (vplu)
                    vplu.Invalidate(this.SurfaceBoundsWithChildren);
else if (uin.IsTopLevel)
                    this.InvalidateSubtreePaint();

                if (uin.IsAttached)
                    this._AddDirtyElement(_Dirty.NewBounds);
            }

            // render = local
            mat4.set(this.LocalProjection, this.RenderProjection);

            //TODO: We can optimize to shift bounds rather than going through an UpdateBounds invalidation
            this.UpdateBounds();

            this.ComputeComposite();

            var post = uin;
            if (post.PostCompute)
                post.PostCompute(this, projection != null);
        };
        LayoutUpdater.prototype.UpdateProjection = function () {
            if (this.Node.IsAttached)
                this._AddDirtyElement(_Dirty.LocalProjection);
        };
        LayoutUpdater.prototype.TransformPoint = function (p) {
            var inverse = mat4.inverse(this.AbsoluteProjection, mat4.create());
            if (!inverse) {
                Warn("Could not get inverse of Absolute Projection for UIElement.");
                return;
            }

            var p4 = vec4.createFrom(p.X, p.Y, 0.0, 1.0);
            var m20 = inverse[2];
            var m21 = inverse[6];
            var m22 = inverse[10];
            var m23 = inverse[14];
            p4[2] = -(m20 * p4[0] + m21 * p4[1] + m23) / m22;

            mat4.transformVec4(inverse, p4);
            p.X = p4[0] / p4[3];
            p.Y = p4[1] / p4[3];
        };
        LayoutUpdater.prototype.TransformToVisual = function (toUin) {
            //1. invert transform from input element to top level
            //2. transform back down to this element
            var result = mat4.create();

            if (toUin) {
                var inverse = mat4.create();
                mat4.inverse(toUin.LayoutUpdater.AbsoluteProjection, inverse);
                mat4.multiply(this.AbsoluteProjection, inverse, result);
            } else {
                mat4.set(this.AbsoluteProjection, result);
            }

            var raw = mat4.toAffineMat3(result);
            if (raw) {
                var mt = new Fayde.Media.MatrixTransform();
                mt.SetStoreValue(Fayde.Media.MatrixTransform.MatrixProperty, new Fayde.Media.Matrix(raw));
                return mt;
            }

            return new Fayde.Media.InternalTransform(result);
        };
        LayoutUpdater.prototype.GetTransformOrigin = function (uie) {
            var userXformOrigin = uie.RenderTransformOrigin;
            if (!userXformOrigin)
                return { X: 0, Y: 0 };
            return { X: this.ActualWidth * userXformOrigin.X, Y: this.ActualHeight * userXformOrigin.Y };
        };
        LayoutUpdater.prototype.GetTextBlockTransformOrigin = function (tb) {
            var userXformOrigin = tb.RenderTransformOrigin;
            if (!userXformOrigin)
                return { X: 0, Y: 0 };
            var xformSize = this.CoerceSize(this.RenderSize);
            return {
                X: xformSize.Width * userXformOrigin.X,
                Y: xformSize.Height * userXformOrigin.Y
            };
        };

        LayoutUpdater.prototype.UpdateRenderVisibility = function (vpLu) {
            var uie = this.Node.XObject;
            if (vpLu) {
                var vp = vpLu.Node.XObject;
                this.TotalOpacity = vpLu.TotalOpacity * uie.Opacity;
                this.TotalIsRenderVisible = (vp.Visibility === 0) && (uie.Visibility === 0);
            } else {
                this.TotalOpacity = uie.Opacity;
                this.TotalIsRenderVisible = (uie.Visibility === 0);
            }
        };
        LayoutUpdater.prototype.UpdateTotalRenderVisibility = function () {
            if (this.Node.IsAttached)
                this._AddDirtyElement(_Dirty.RenderVisibility);
        };
        LayoutUpdater.prototype.UpdateHitTestVisibility = function (vpLu) {
            var uie = this.Node.XObject;
            if (vpLu) {
                this.TotalIsHitTestVisible = vpLu.TotalIsHitTestVisible && uie.IsHitTestVisible;
            } else {
                this.TotalIsHitTestVisible = uie.IsHitTestVisible;
            }
        };
        LayoutUpdater.prototype.UpdateTotalHitTestVisibility = function () {
            if (this.Node.IsAttached)
                this._AddDirtyElement(_Dirty.HitTestVisibility);
        };

        LayoutUpdater.prototype.UpdateBounds = function (forceRedraw) {
            if (this.Node.IsAttached)
                this._AddDirtyElement(_Dirty.Bounds);
            this._ForceInvalidateOfNewBounds = this._ForceInvalidateOfNewBounds || forceRedraw;
        };
        LayoutUpdater.prototype.ComputeBounds = function () {
            var s = this.CoerceSize(size.fromRaw(this.ActualWidth, this.ActualHeight));
            if (isNaN(s.Width))
                s.Width = 0;
            if (isNaN(s.Height))
                s.Height = 0;

            rect.set(this.Extents, 0, 0, s.Width, s.Height);
            rect.copyTo(this.Extents, this.ExtentsWithChildren);

            var node = this.Node;
            var enumerator = node.GetVisualTreeEnumerator();
            while (enumerator.MoveNext()) {
                var item = enumerator.Current;
                var itemlu = item.LayoutUpdater;
                if (itemlu.TotalIsRenderVisible)
                    rect.union(this.ExtentsWithChildren, itemlu.GlobalBoundsWithChildren);
            }

            this.IntersectBoundsWithClipPath(this.Bounds, this.AbsoluteXform);
            rect.copyGrowTransform(this.BoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, this.AbsoluteXform);

            this.ComputeGlobalBounds();
            this.ComputeSurfaceBounds();
        };
        LayoutUpdater.prototype.ComputeGlobalBounds = function () {
            this.IntersectBoundsWithClipPath(this.GlobalBounds, this.LocalXform);
            rect.copyGrowTransform4(this.GlobalBoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, this.LocalProjection);
        };
        LayoutUpdater.prototype.ComputeSurfaceBounds = function () {
            this.IntersectBoundsWithClipPath(this.SurfaceBounds, this.AbsoluteXform);
            rect.copyGrowTransform4(this.SurfaceBoundsWithChildren, this.ExtentsWithChildren, this.EffectPadding, this.AbsoluteProjection);
        };
        LayoutUpdater.prototype.IntersectBoundsWithClipPath = function (dest, xform) {
            var isClipEmpty = rect.isEmpty(this.ClipBounds);
            var isLayoutClipEmpty = this.LayoutClip ? rect.isEmpty(this.LayoutClip) : true;

            if ((!isClipEmpty || !isLayoutClipEmpty) && !this.TotalIsRenderVisible) {
                rect.clear(dest);
                return dest;
            }

            rect.copyGrowTransform(dest, this.Extents, this.EffectPadding, null);

            if (!isClipEmpty)
                rect.intersection(dest, this.ClipBounds);
            if (!isLayoutClipEmpty)
                rect.intersection(dest, this.LayoutClip);

            return rect.transform(dest, xform);
        };

        LayoutUpdater.prototype._UpdateActualSize = function () {
            var last = this.LastRenderSize;
            var fe = this.Node.XObject;
            var s;
            if ((fe).ComputeActualSize)
                s = (fe).ComputeActualSize(this._ComputeActualSize, this);
else
                s = this._ComputeActualSize();
            this.ActualWidth = s.Width;
            this.ActualHeight = s.Height;
            if (last && size.isEqual(last, s))
                return;

            var propd = Fayde.FrameworkElement.ActualWidthProperty;
            propd.Store.SetLocalValue(Fayde.Providers.GetStorage(fe, propd), s.Width);
            var propd = Fayde.FrameworkElement.ActualHeightProperty;
            propd.Store.SetLocalValue(Fayde.Providers.GetStorage(fe, propd), s.Height);

            this.LastRenderSize = undefined;
            return {
                Element: fe,
                PreviousSize: last,
                NewSize: s
            };
        };
        LayoutUpdater.prototype._ComputeActualSize = function () {
            var node = this.Node;

            if (node.XObject.Visibility !== Fayde.Visibility.Visible)
                return new size();

            var parentNode = node.VisualParentNode;
            if ((parentNode && !(parentNode.XObject instanceof Fayde.Controls.Canvas)) || this.IsLayoutContainer)
                return size.copyTo(this.RenderSize);

            return this.CoerceSize(new size());
        };
        LayoutUpdater.prototype._GetBrushSize = function () {
            return {
                Width: this.ActualWidth,
                Height: this.ActualHeight
            };
        };
        LayoutUpdater.prototype._GetShapeBrushSize = function (shape) {
            return size.fromRect(shape.XamlNode.GetStretchExtents(shape, this));
        };
        LayoutUpdater.prototype.CoerceSize = function (s) {
            var fe = this.Node.XObject;
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
        };

        LayoutUpdater.prototype._HasFlag = function (flag) {
            return (this.Flags & flag) === flag;
        };
        LayoutUpdater.prototype._PropagateFlagUp = function (flag) {
            this.Flags |= flag;
            var node = this.Node;
            var lu;
            while ((node = node.VisualParentNode) && (lu = node.LayoutUpdater) && !lu._HasFlag(flag)) {
                lu.Flags |= flag;
            }
        };

        LayoutUpdater.prototype.UpdateLayer = function (pass, error) {
            var elNode = this.Node;
            var parentNode;
            while (parentNode = elNode.VisualParentNode)
                elNode = parentNode;
            var element = elNode.XObject;
            var layout = elNode.LayoutUpdater;

            var lu;
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
                    var childNode;
                    while (childNode = measureWalker.Step()) {
                        lu = childNode.LayoutUpdater;
                        if (childNode.XObject.Visibility !== Fayde.Visibility.Visible || !lu._HasFlag(flag)) {
                            measureWalker.SkipBranch();
                            continue;
                        }
                        lu.Flags &= ~flag;
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
                    if (Fayde.Layout.Debug)
                        console.log("[MEASURE PASS] " + pass.MeasureList.length);
                    while (lu = pass.MeasureList.shift()) {
                        if (Fayde.Layout.Debug)
                            console.log("[DOMEASURE] " + lu._DebugToString());
                        lu._DoMeasureWithError(error);
                        pass.Updated = true;
                    }
                } else if (flag === UIElementFlags.DirtyArrangeHint) {
                    if (Fayde.Layout.Debug)
                        console.log("[ARRANGE PASS] " + pass.ArrangeList.length);
                    while (lu = pass.ArrangeList.shift()) {
                        if (Fayde.Layout.Debug)
                            console.log("[DOARRANGE] " + lu._DebugToString());
                        lu._DoArrangeWithError(error);
                        pass.Updated = true;
                        if (layout._HasFlag(UIElementFlags.DirtyMeasureHint))
                            break;
                    }
                } else if (flag === UIElementFlags.DirtySizeHint) {
                    var changes = [];
                    while (lu = pass.SizeList.pop()) {
                        pass.Updated = true;
                        changes.push(lu._UpdateActualSize());
                    }
                    var change;
                    while (change = changes.pop()) {
                        change.Element.SizeChanged.Raise(change.Element, new Fayde.SizeChangedEventArgs(change.PreviousSize, change.NewSize));
                    }
                    //LayoutDebug(function () { return "Completed _SizeList Update"; });
                } else {
                    break;
                }
            }
        };
        LayoutUpdater.prototype._DoMeasureWithError = function (error) {
            var last = this.PreviousConstraint;
            var node = this.Node;
            var visualParentNode = node.VisualParentNode;

            if (!node.IsAttached && !last && !visualParentNode && this.IsLayoutContainer) {
                last = size.createInfinite();
            }

            if (last) {
                var previousDesired = size.copyTo(this.DesiredSize);
                this._Measure(last, error);
                if (size.isEqual(previousDesired, this.DesiredSize))
                    return;
            }

            if (visualParentNode)
                visualParentNode.LayoutUpdater.InvalidateMeasure();

            this.DirtyFlags &= ~_Dirty.Measure;
        };
        LayoutUpdater.prototype._Measure = function (availableSize, error) {
            if (error.Message)
                return;

            var node = this.Node;
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

            node.ApplyTemplateWithError(error);

            if (!shouldMeasure)
                return;

            if (Fayde.Layout.Debug)
                console.log(new Array(Fayde.Layout.DebugIndent).join("\t") + "[MEASURING] " + this._DebugToString());

            this.PreviousConstraint = availableSize;

            this.InvalidateArrange();
            this.UpdateBounds();

            var s = size.copyTo(availableSize);
            var margin = fe.Margin;
            if (margin)
                size.shrinkByThickness(s, margin);
            this.CoerceSize(s);

            Fayde.Layout.DebugIndent++;
            if ((fe).MeasureOverride) {
                s = (fe).MeasureOverride(s);
            } else {
                s = (fe)._MeasureOverride(s, error);
            }
            Fayde.Layout.DebugIndent--;

            if (error.Message)
                return;

            this.DirtyFlags &= ~_Dirty.Measure;
            this.HiddenDesire = size.copyTo(s);

            var visualParentNode = node.VisualParentNode;
            if (!visualParentNode || visualParentNode instanceof Fayde.Controls.CanvasNode) {
                if (node instanceof Fayde.Controls.CanvasNode || !this.IsLayoutContainer) {
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
        };
        LayoutUpdater.prototype._DoArrangeWithError = function (error) {
            var last = this.LayoutSlot;
            if (last === null)
                last = undefined;

            var n = this.Node;
            var fe = n.XObject;
            var visualParentNode = n.VisualParentNode;
            if (!visualParentNode) {
                var surface = this.Surface;
                var desired;
                if (this.IsLayoutContainer) {
                    desired = size.copyTo(this.DesiredSize);
                    if (n.IsAttached && n.IsTopLevel && !n.ParentNode) {
                        var measure = this.PreviousConstraint;
                        if (measure)
                            size.max(desired, measure);
else
                            desired = size.copyTo(surface.Extents);
                    }
                } else {
                    desired.Width = fe.ActualWidth;
                    desired.Height = fe.ActualHeight;
                }

                var viewport = rect.fromSize(desired);
                viewport.X = Fayde.Controls.Canvas.GetLeft(fe);
                viewport.Y = Fayde.Controls.Canvas.GetTop(fe);
                last = viewport;
            }

            if (last) {
                this._Arrange(last, error);
            } else {
                if (visualParentNode)
                    visualParentNode.LayoutUpdater.InvalidateArrange();
            }
        };
        LayoutUpdater.prototype._Arrange = function (finalRect, error) {
            if (error.Message)
                return;

            var node = this.Node;
            var fe = node.XObject;

            if (fe.UseLayoutRounding) {
                rect.round(finalRect);
            }

            if (finalRect.Width < 0 || finalRect.Height < 0 || !isFinite(finalRect.Width) || !isFinite(finalRect.Height) || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
                var desired = this.DesiredSize;
                error.Number = BError.Argument;
                error.Message = "Invalid arguments to Arrange. Desired = " + desired.toString();
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

            if (Fayde.Layout.Debug)
                console.log(new Array(Fayde.Layout.DebugIndent).join("\t") + "[ARRANGING] " + this._DebugToString());

            var measure = this.PreviousConstraint;
            if (this.IsContainer && !measure) {
                this._Measure(size.fromRect(finalRect), error);
            }
            measure = this.PreviousConstraint;

            this.SetLayoutClip(undefined);

            var childRect = rect.copyTo(finalRect);
            var margin = fe.Margin;
            if (margin)
                rect.shrinkByThickness(childRect, margin);

            this.UpdateTransform();
            this.UpdateProjection();
            this.UpdateBounds();

            var offer = size.copyTo(this.HiddenDesire);

            var stretched = this.CoerceSize(size.fromRect(childRect));
            var framework = this.CoerceSize(new size());

            var horiz = fe.HorizontalAlignment;
            var vert = fe.VerticalAlignment;

            if (horiz === Fayde.HorizontalAlignment.Stretch)
                framework.Width = Math.max(framework.Width, stretched.Width);

            if (vert === Fayde.VerticalAlignment.Stretch)
                framework.Height = Math.max(framework.Height, stretched.Height);

            size.max(offer, framework);

            this.LayoutSlot = finalRect;

            Fayde.Layout.DebugIndent++;
            var response;
            if ((fe).ArrangeOverride) {
                response = (fe).ArrangeOverride(offer);
            } else {
                response = (fe)._ArrangeOverride(offer, error);
            }
            Fayde.Layout.DebugIndent--;

            if (horiz === Fayde.HorizontalAlignment.Stretch)
                response.Width = Math.max(response.Width, framework.Width);

            if (vert === Fayde.VerticalAlignment.Stretch)
                response.Height = Math.max(response.Height, framework.Height);

            var flipHoriz = false;
            var flowDirection = fe.FlowDirection;
            var visualParentNode = node.VisualParentNode;
            if (visualParentNode)
                flipHoriz = visualParentNode.XObject.FlowDirection !== flowDirection;
else if (node.ParentNode instanceof Fayde.Controls.Primitives.PopupNode)
                flipHoriz = (node.ParentNode).XObject.FlowDirection !== flowDirection;
else
                flipHoriz = flowDirection === Fayde.FlowDirection.RightToLeft;

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

            var oldSize = size.copyTo(this.RenderSize);

            if (fe.UseLayoutRounding) {
                response.Width = Math.round(response.Width);
                response.Height = Math.round(response.Height);
            }

            size.copyTo(response, this.RenderSize);
            var constrainedResponse = this.CoerceSize(size.copyTo(response));
            size.min(constrainedResponse, response);

            if (!visualParentNode || visualParentNode instanceof Fayde.Controls.CanvasNode) {
                if (!this.IsLayoutContainer) {
                    size.clear(this.RenderSize);
                    return;
                }
            }

            var isTopLevel = node.IsAttached && node.IsTopLevel;
            if (!isTopLevel) {
                switch (horiz) {
                    case Fayde.HorizontalAlignment.Left:
                        break;
                    case Fayde.HorizontalAlignment.Right:
                        visualOffset.X += childRect.Width - constrainedResponse.Width;
                        break;
                    case Fayde.HorizontalAlignment.Center:
                        visualOffset.X += (childRect.Width - constrainedResponse.Width) * 0.5;
                        break;
                    default:
                        visualOffset.X += Math.max((childRect.Width - constrainedResponse.Width) * 0.5, 0);
                        break;
                }

                switch (vert) {
                    case Fayde.VerticalAlignment.Top:
                        break;
                    case Fayde.VerticalAlignment.Bottom:
                        visualOffset.Y += childRect.Height - constrainedResponse.Height;
                        break;
                    case Fayde.VerticalAlignment.Center:
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
            var layoutClip = rect.copyTo(childRect);
            layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
            layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
            if (fe.UseLayoutRounding) {
                layoutClip.X = Math.round(layoutClip.X);
                layoutClip.Y = Math.round(layoutClip.Y);
            }

            var oldLayoutClip = this.LayoutClip;
            if (((!isTopLevel && !rect.isRectContainedIn(element, layoutClip)) || !size.isEqual(constrainedResponse, response)) && !(node instanceof Fayde.Controls.CanvasNode) && ((visualParentNode && !(visualParentNode instanceof Fayde.Controls.CanvasNode)) || this.IsContainer)) {
                var frameworkClip = this.CoerceSize(size.createInfinite());
                var frect = rect.fromSize(frameworkClip);
                rect.intersection(layoutClip, frect);
                this.SetLayoutClip(layoutClip);
            }

            if (!size.isEqual(oldSize, response)) {
                if (!this.LastRenderSize) {
                    this.LastRenderSize = oldSize;
                    this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
                }
            }
        };

        LayoutUpdater.prototype.DoRender = function (ctx, r) {
            if (!this.TotalIsRenderVisible)
                return;
            if ((this.TotalOpacity * 255) < 0.5)
                return;

            var region = new rect();
            if (false) {
                //TODO: Render to intermediate
            } else {
                rect.copyTo(this.ExtentsWithChildren, region);
                rect.transform(region, this.RenderXform);
                rect.transform(region, ctx.CurrentTransform);
                rect.roundOut(region);
                rect.intersection(region, r);
            }

            if (rect.isEmpty(region))
                return;

            ctx.Save();

            ctx.PreTransformMatrix(this.RenderXform);
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
            if ((uie).Render)
                (uie).Render(ctx, this, region);
            if (effect) {
                canvasCtx.restore();
            }

            //if (window.RenderDebug) RenderDebug.Indent();
            var enumerator = this.Node.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.ZFoward);
            while (enumerator.MoveNext()) {
                (enumerator.Current).LayoutUpdater.DoRender(ctx, region);
            }

            //if (window.RenderDebug) RenderDebug.Unindent();
            ctx.Restore();
        };

        LayoutUpdater.prototype.FindElementsInHostCoordinates = function (p) {
            var uinlist = [];
            this._FindElementsInHostCoordinates(this.Surface.TestRenderContext, p, uinlist, false);
            return uinlist;
        };
        LayoutUpdater.prototype._FindElementsInHostCoordinates = function (ctx, p, uinlist, applyXform) {
            if (this.ShouldSkipHitTest)
                return;
            if (!this.TotalIsRenderVisible)
                return;
            if (!this.TotalIsHitTestVisible)
                return;
            if (this.SurfaceBoundsWithChildren.Height <= 0)
                return;

            var thisNode = this.Node;

            ctx.Save();
            if (applyXform)
                ctx.TransformMatrix(this.RenderXform);

            if (!this._InsideClip(ctx, p.X, p.Y)) {
                ctx.Restore();
                return;
            }

            uinlist.unshift(thisNode);
            var enumerator = thisNode.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.ZFoward);
            while (enumerator.MoveNext()) {
                (enumerator.Current).LayoutUpdater._FindElementsInHostCoordinates(ctx, p, uinlist, true);
            }

            if (thisNode === uinlist[0]) {
                if (!this.CanHitElement || !this._InsideObject(ctx, p.X, p.Y))
                    uinlist.shift();
            }

            ctx.Restore();
        };
        LayoutUpdater.prototype.HitTestPoint = function (ctx, p, uinlist) {
            if (this.ShouldSkipHitTest)
                return;
            if (!this.TotalIsRenderVisible)
                return;
            if (!this.TotalIsHitTestVisible)
                return;

            ctx.Save();
            ctx.TransformMatrix(this.RenderXform);

            if (!this._InsideClip(ctx, p.X, p.Y)) {
                ctx.Restore();
                return;
            }

            var thisNode = this.Node;

            uinlist.unshift(thisNode);
            var hit = false;
            var enumerator = thisNode.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.ZReverse);
            while (enumerator.MoveNext()) {
                var childNode = (enumerator.Current);
                childNode.LayoutUpdater.HitTestPoint(ctx, p, uinlist);
                if (thisNode !== uinlist[0]) {
                    hit = true;
                    break;
                }
            }

            if (!hit && !(this.CanHitElement && this._InsideObject(ctx, p.X, p.Y))) {
                if (uinlist.shift() !== thisNode) {
                    throw new Exception("Look at my code! -> FENode._HitTestPoint");
                }
            }

            ctx.Restore();
        };
        LayoutUpdater.prototype._InsideObject = function (ctx, x, y) {
            if (this.IsNeverInsideObject)
                return false;

            var bounds = new rect();
            var fe = this.Node.XObject;
            rect.set(bounds, 0, 0, fe.ActualWidth, fe.ActualHeight);

            //TODO: Use local variable bounds, figure out which one matches up
            rect.transform(bounds, ctx.CurrentTransform);
            if (!rect.containsPointXY(bounds, x, y))
                return false;

            if (!this._InsideLayoutClip(ctx, x, y))
                return false;

            if ((this.Node).PostInsideObject)
                return (this.Node).PostInsideObject(ctx, this, x, y);
            return true;
        };
        LayoutUpdater.prototype._InsideClip = function (ctx, x, y) {
            var clip = this.Node.XObject.Clip;
            if (!clip)
                return true;

            var bounds = clip.GetBounds();
            rect.transform(bounds, ctx.CurrentTransform);
            if (!rect.containsPointXY(bounds, x, y))
                return false;

            return ctx.IsPointInClipPath(clip, x, y);
        };
        LayoutUpdater.prototype._InsideLayoutClip = function (ctx, x, y) {
            var layoutClip = this.LayoutClip;
            if (!layoutClip)
                return true;

            //TODO: Handle composite LayoutClip
            var layoutClipBounds = rect.copyTo(layoutClip);
            rect.transform(layoutClipBounds, ctx.CurrentTransform);
            return rect.containsPointXY(layoutClipBounds, x, y);
        };
        LayoutUpdater.prototype.RenderLayoutClip = function (ctx) {
            var composite = this.CompositeLayoutClip;
            if (composite)
                ctx.ClipRect(composite);
        };

        LayoutUpdater.prototype._DebugLayout = function () {
            var str = this._SerializeDirt();
            str += this._SerializeFlags();
            str += " (";
            str += this.HiddenDesire.toString();
            str += " ";
            str += this.RenderSize.toString();
            str += ")";
            return str;
        };
        LayoutUpdater.prototype._SerializeDirt = function () {
            var curdirt = this.DirtyFlags;

            var down = "";
            if (curdirt & _Dirty.ChildrenZIndices) {
                curdirt &= ~_Dirty.ChildrenZIndices;
                down += "ZI+";
            }
            if (curdirt & _Dirty.Arrange) {
                curdirt &= ~_Dirty.Arrange;
                down += "A+";
            }
            if (curdirt & _Dirty.Measure) {
                curdirt &= ~_Dirty.Measure;
                down += "M+";
            }
            if (curdirt & _Dirty.HitTestVisibility) {
                curdirt &= ~_Dirty.HitTestVisibility;
                down += "HTV+";
            }
            if (curdirt & _Dirty.RenderVisibility) {
                curdirt &= ~_Dirty.RenderVisibility;
                down += "RV+";
            }
            if (curdirt & _Dirty.LocalClip) {
                curdirt &= ~_Dirty.LocalClip;
                down += "LC+";
            }
            if (curdirt & _Dirty.Clip) {
                curdirt &= ~_Dirty.Clip;
                down += "C+";
            }
            if (curdirt & _Dirty.LocalProjection) {
                curdirt &= ~_Dirty.LocalProjection;
                down += "LP+";
            }
            if (curdirt & _Dirty.LocalTransform) {
                curdirt &= ~_Dirty.LocalTransform;
                down += "LT+";
            }
            if (curdirt & _Dirty.Transform) {
                curdirt &= ~_Dirty.Transform;
                down += "T+";
            }
            if (down)
                down = down.substr(0, down.length - 1);

            var up = "";
            if (curdirt & _Dirty.Invalidate) {
                curdirt &= ~_Dirty.Invalidate;
                up += "I+";
            }
            if (curdirt & _Dirty.Bounds) {
                curdirt &= ~_Dirty.Bounds;
                up += "B+";
            }
            if (up)
                up = up.substr(0, up.length - 1);

            return "[" + down + ":" + up + "]";
        };
        LayoutUpdater.prototype._SerializeFlags = function () {
            var flags = this.Flags;
            var str = "";
            if (flags & UIElementFlags.DirtySizeHint) {
                flags &= ~UIElementFlags.DirtySizeHint;
                str += "S+";
            }
            if (flags & UIElementFlags.DirtyMeasureHint) {
                flags &= ~UIElementFlags.DirtyMeasureHint;
                str += "M+";
            }
            if (flags & UIElementFlags.DirtyArrangeHint) {
                flags &= ~UIElementFlags.DirtyArrangeHint;
                str += "A+";
            }
            if (flags & UIElementFlags.TotalHitTestVisible) {
                flags &= ~UIElementFlags.TotalHitTestVisible;
                str += "THT+";
            }
            if (flags & UIElementFlags.TotalRenderVisible) {
                flags &= ~UIElementFlags.TotalRenderVisible;
                str += "TRV+";
            }
            if (flags & UIElementFlags.HitTestVisible) {
                flags &= ~UIElementFlags.HitTestVisible;
                str += "HT+";
            }
            if (flags & UIElementFlags.RenderVisible) {
                flags &= ~UIElementFlags.RenderVisible;
                str += "RV+";
            }

            if (str)
                str = str.substring(0, str.length - 1);

            return "[" + str + "]";
        };

        LayoutUpdater.prototype._DebugToString = function () {
            var xobj = this.Node.XObject;
            var ctor = (xobj).constructor;
            var o = {
                "ID": (xobj)._ID,
                "Type": ctor._TypeName
            };
            return JSON.stringify(o);
        };
        LayoutUpdater.LayoutExceptionUpdater = undefined;
        return LayoutUpdater;
    })();
    Fayde.LayoutUpdater = LayoutUpdater;
    Fayde.RegisterType(LayoutUpdater, {
        Name: "LayoutUpdater",
        Namespace: "Fayde"
    });
})(Fayde || (Fayde = {}));
//# sourceMappingURL=LayoutUpdater.js.map
