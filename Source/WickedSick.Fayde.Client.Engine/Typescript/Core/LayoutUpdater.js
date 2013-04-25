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
var Fayde;
(function (Fayde) {
    var dirtyEnum = _Dirty;
    var localTransformFlag = _Dirty.LocalTransform;
    var localProjectionFlag = _Dirty.LocalProjection;
    var transformFlag = _Dirty.Transform;
    var rvFlag = _Dirty.RenderVisibility;
    var htvFlag = _Dirty.HitTestVisibility;
    var localClipFlag = _Dirty.LocalClip;
    var clipFlag = _Dirty.Clip;
    var downDirtyFlag = _Dirty.DownDirtyState;
    var upDirtyFlag = _Dirty.UpDirtyState;
    (function (UIElementFlags) {
        UIElementFlags._map = [];
        UIElementFlags.None = 0;
        UIElementFlags.RenderVisible = 2;
        UIElementFlags.HitTestVisible = 4;
        UIElementFlags.TotalRenderVisible = 8;
        UIElementFlags.TotalHitTestVisible = 16;
        UIElementFlags.DirtyArrangeHint = 2048;
        UIElementFlags.DirtyMeasureHint = 4096;
        UIElementFlags.DirtySizeHint = 8192;
        UIElementFlags.RenderProjection = 16384;
    })(Fayde.UIElementFlags || (Fayde.UIElementFlags = {}));
    var UIElementFlags = Fayde.UIElementFlags;
    var maxPassCount = 250;
    var LayoutUpdater = (function () {
        function LayoutUpdater(Node) {
            this.Node = Node;
            this.LayoutClip = undefined;
            this.LayoutSlot = undefined;
            this.PreviousConstraint = undefined;
            this.LastRenderSize = undefined;
            this.HiddenDesire = new size();
            this.DesiredSize = new size();
            this.RenderSize = new size();
            this.VisualOffset = new Point();
            //= mat4.identity();
            this.TotalOpacity = 1.0;
            this.TotalIsRenderVisible = true;
            this.TotalIsHitTestVisible = true;
            this.Extents = new rect();
            this.ExtentsWithChildren = new rect();
            this.Bounds = new rect();
            this.Global = new rect();
            this.SurfaceBounds = new rect();
            this.EffectPadding = new Thickness();
            this.ClipBounds = new rect();
            this.LayoutClipBounds = new rect();
            this.IsContainer = false;
            this.IsLayoutContainer = false;
            this.BreaksLayoutClipRender = false;
            this.Flags = Fayde.UIElementFlags.None;
            this.DirtyFlags = 0;
            this.InUpDirty = false;
            this.InDownDirty = false;
            this.DirtyRegion = null;
            this._ForceInvalidateOfNewBounds = false;
        }
        LayoutUpdater.LayoutExceptionUpdater = undefined;
        LayoutUpdater.prototype.OnIsAttachedChanged = function (newIsAttached, visualParentNode) {
            this.UpdateTotalRenderVisibility();
            if(!newIsAttached) {
                this._CacheInvalidateHint();
                var surface = this.Surface;
                if(surface) {
                    surface.OnNodeDetached(this);
                }
            }
        };
        LayoutUpdater.prototype.OnAddedToTree = function () {
            this.UpdateTotalRenderVisibility();
            this.UpdateTotalHitTestVisibility();
            this.Invalidate();
            this.SetLayoutClip(undefined);
            size.clear(this.RenderSize);
            this.UpdateTransform();
            this.UpdateProjection();
            this.InvalidateMeasure();
            this.InvalidateArrange();
            if(this._HasFlag(UIElementFlags.DirtySizeHint) || this.LastRenderSize !== undefined) {
                this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
            }
        };
        LayoutUpdater.prototype.OnRemovedFromTree = function () {
            this.LayoutSlot = new rect();
            this.SetLayoutClip(undefined);
        };
        LayoutUpdater.prototype.SetContainerMode = function (isLayoutContainer, isContainer) {
            if(isLayoutContainer != null) {
                this.IsLayoutContainer = isLayoutContainer;
            }
            if(isContainer != null) {
                this.IsContainer = isContainer;
            } else {
                this.IsContainer = isLayoutContainer;
            }
        };
        LayoutUpdater.prototype.HasMeasureArrangeHint = function () {
            return (this.Flags & (UIElementFlags.DirtyMeasureHint | UIElementFlags.DirtyArrangeHint)) > 0;
        };
        LayoutUpdater.prototype.ProcessDown = function () {
            var thisNode = this.Node;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu;
            if(visualParentNode) {
                visualParentLu = visualParentNode.LayoutUpdater;
            }
            var f = this.DirtyFlags;
            //i++;
            //DirtyDebug("Down Dirty Loop #" + i.toString() + " --> " + surface._DownDirty.__DebugToString());
            /*
            DirtyDebug.Level++;
            DirtyDebug("[" + uie.__DebugToString() + "]" + uie.__DebugDownDirtyFlags());
            */
            if(f & rvFlag) {
                f &= ~rvFlag;
                var ovisible = this.TotalIsRenderVisible;
                this.UpdateBounds();
                if(visualParentLu) {
                    visualParentLu.UpdateBounds();
                }
                //DirtyDebug("ComputeTotalRenderVisibility: [" + uie.__DebugToString() + "]");
                //uie._ComputeTotalRenderVisibility();
                this.UpdateRenderVisibility(visualParentLu);
                if(!this.TotalIsRenderVisible) {
                    this._CacheInvalidateHint();
                }
                if(ovisible !== this.TotalIsRenderVisible) {
                    this.Surface._AddDirtyElement(this, dirtyEnum.NewBounds);
                }
                this._PropagateDirtyFlagToChildren(rvFlag);
            }
            if(f & htvFlag) {
                f &= ~htvFlag;
                //uie._ComputeTotalHitTestVisibility();
                this.UpdateHitTestVisibility(visualParentLu);
                this._PropagateDirtyFlagToChildren(htvFlag);
            }
            var isLT = f & localTransformFlag;
            var isLP = f & localProjectionFlag;
            var isT = isLT || isLP || f & transformFlag;
            f &= ~(localTransformFlag | localProjectionFlag | transformFlag);
            if(isLT) {
                //DirtyDebug("ComputeLocalTransform: [" + uie.__DebugToString() + "]");
                this.ComputeLocalTransform();
                //DirtyDebug("--> " + xformer.LocalXform._Elements.toString());
                            }
            if(isLP) {
                //DirtyDebug("ComputeLocalProjection: [" + uie.__DebugToString() + "]");
                this.ComputeLocalProjection();
            }
            if(isT) {
                //DirtyDebug("ComputeTransform: [" + uie.__DebugToString() + "]");
                this.ComputeTransform();
                //DirtyDebug("--> " + xformer.AbsoluteProjection._Elements.slice(0, 8).toString());
                if(visualParentLu) {
                    visualParentLu.UpdateBounds();
                }
                this._PropagateDirtyFlagToChildren(dirtyEnum.Transform);
            }
            var isLocalClip = f & localClipFlag;
            var isClip = isLocalClip || f & clipFlag;
            f &= ~(localClipFlag | clipFlag);
            if(isClip) {
                this._PropagateDirtyFlagToChildren(dirtyEnum.Clip);
            }
            if(f & dirtyEnum.ChildrenZIndices) {
                f &= ~dirtyEnum.ChildrenZIndices;
                thisNode._ResortChildrenByZIndex();
            }
            //DirtyDebug.Level--;
            this.DirtyFlags = f;
            return !(f & downDirtyFlag);
        };
        LayoutUpdater.prototype.ProcessUp = function () {
            var thisNode = this.Node;
            var visualParentNode = thisNode.VisualParentNode;
            var visualParentLu;
            if(visualParentNode) {
                visualParentLu = visualParentNode.LayoutUpdater;
            }
            var f = this.DirtyFlags;
            //i++;
            //DirtyDebug("Up Dirty Loop #" + i.toString() + " --> " + surface._UpDirty.__DebugToString());
            var invalidateSubtreePaint = false;
            if(f & dirtyEnum.Bounds) {
                f &= ~dirtyEnum.Bounds;
                var oextents = rect.clone(this.SubtreeExtents);
                var oglobalbounds = rect.clone(this.GlobalBounds);
                var osubtreebounds = rect.clone(this.SubtreeBounds);
                this.ComputeBounds();
                if(!rect.isEqual(oglobalbounds, this.GlobalBounds)) {
                    if(visualParentLu) {
                        visualParentLu.UpdateBounds();
                        visualParentLu.Invalidate(osubtreebounds);
                        visualParentLu.Invalidate(this.SubtreeBounds);
                    }
                }
                invalidateSubtreePaint = !rect.isEqual(oextents, this.SubtreeExtents) || this._ForceInvalidateOfNewBounds;
                this._ForceInvalidateOfNewBounds = false;
            }
            if(f & dirtyEnum.NewBounds) {
                if(visualParentLu) {
                    visualParentLu.Invalidate(this.SubtreeBounds);
                } else if(thisNode.IsTopLevel) {
                    invalidateSubtreePaint = true;
                }
                f &= ~dirtyEnum.NewBounds;
            }
            if(invalidateSubtreePaint) {
                this.Invalidate(this.SubtreeBounds);
            }
            if(f & dirtyEnum.Invalidate) {
                f &= ~dirtyEnum.Invalidate;
                var dirty = this.DirtyRegion;
                if(visualParentLu) {
                    visualParentLu.Invalidate(dirty);
                } else {
                    if(thisNode.IsAttached) {
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
        };
        LayoutUpdater.prototype._PropagateDirtyFlagToChildren = function (dirt) {
            var enumerator = this.Node.GetVisualTreeEnumerator();
            if(!enumerator) {
                return;
            }
            var s = this.Surface;
            while(enumerator.MoveNext()) {
                s._AddDirtyElement((enumerator.Current).LayoutUpdater, dirt);
            }
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
            //TODO: Implement
                    };
        LayoutUpdater.prototype._CacheInvalidateHint = function () {
        };
        LayoutUpdater.prototype.InvalidateMeasure = function () {
            this.DirtyFlags |= _Dirty.Measure;
            this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
        };
        LayoutUpdater.prototype.InvalidateArrange = function () {
            this.DirtyFlags |= _Dirty.Arrange;
            this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
        };
        LayoutUpdater.prototype.UpdateTransform = function () {
            if(this.Node.IsAttached) {
                this.Surface._AddDirtyElement(this, _Dirty.LocalTransform);
            }
        };
        LayoutUpdater.prototype.ComputeLocalTransform = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.ComputeLocalProjection = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.ComputeTransform = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateProjection = function () {
            if(this.Node.IsAttached) {
                this.Surface._AddDirtyElement(this, _Dirty.LocalProjection);
            }
        };
        LayoutUpdater.prototype.TransformPoint = function (p) {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateRenderVisibility = function (vpLu) {
            var uie = this.Node.XObject;
            if(vpLu) {
                var vp = vpLu.Node.XObject;
                this.TotalOpacity = vpLu.TotalOpacity * uie.Opacity;
                this.TotalIsRenderVisible = (vp.Visibility === 0) && (uie.Visibility === 0);
            } else {
                this.TotalOpacity = uie.Opacity;
                this.TotalIsRenderVisible = (uie.Visibility === 0);
            }
        };
        LayoutUpdater.prototype.UpdateTotalRenderVisibility = function () {
            if(this.Node.IsAttached) {
                this.Surface._AddDirtyElement(this, _Dirty.RenderVisibility);
            }
        };
        LayoutUpdater.prototype.UpdateHitTestVisibility = function (vpLu) {
            var uie = this.Node.XObject;
            if(vpLu) {
                this.TotalIsHitTestVisible = vpLu.TotalIsHitTestVisible && uie.IsHitTestVisible;
            } else {
                this.TotalIsHitTestVisible = uie.IsHitTestVisible;
            }
        };
        LayoutUpdater.prototype.UpdateTotalHitTestVisibility = function () {
            if(this.Node.IsAttached) {
                this.Surface._AddDirtyElement(this, _Dirty.HitTestVisibility);
            }
        };
        LayoutUpdater.prototype.UpdateBounds = function (forceRedraw) {
            if(this.Node.IsAttached) {
                this.Surface._AddDirtyElement(this, _Dirty.Bounds);
            }
            this._ForceInvalidateOfNewBounds = this._ForceInvalidateOfNewBounds || forceRedraw;
        };
        LayoutUpdater.prototype.ComputeBounds = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateStretch = function () {
            rect.clear(this.Extents);
            rect.clear(this.ExtentsWithChildren);
        };
        LayoutUpdater.prototype.SetLayoutClip = function (layoutClip) {
            this.LayoutClip = layoutClip;
            if(!layoutClip) {
                rect.clear(this.LayoutClipBounds);
            } else {
                rect.copyTo(layoutClip.GetBounds(), this.LayoutClipBounds);
            }
        };
        LayoutUpdater.prototype.UpdateLayer = function (pass, error) {
            var elNode = this.Node;
            var parentNode;
            while(parentNode = elNode.VisualParentNode) {
                elNode = parentNode;
            }
            var element = elNode.XObject;
            var layout = elNode.LayoutUpdater;
            var lu;
            while(pass.Count < maxPassCount) {
                while(lu = pass.ArrangeList.shift()) {
                    lu._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
                    //LayoutDebug(function () { return "PropagateFlagUp DirtyArrangeHint"; });
                                    }
                while(lu = pass.SizeList.shift()) {
                    lu._PropagateFlagUp(UIElementFlags.DirtySizeHint);
                    //LayoutDebug(function () { return "PropagateFlagUp DirtySizeHint"; });
                                    }
                pass.Count = pass.Count + 1;
                var flag = UIElementFlags.None;
                if(element.Visibility === Fayde.Visibility.Visible) {
                    if(layout._HasFlag(UIElementFlags.DirtyMeasureHint)) {
                        flag = UIElementFlags.DirtyMeasureHint;
                    } else if(layout._HasFlag(UIElementFlags.DirtyArrangeHint)) {
                        flag = UIElementFlags.DirtyArrangeHint;
                    } else if(layout._HasFlag(UIElementFlags.DirtySizeHint)) {
                        flag = UIElementFlags.DirtySizeHint;
                    }
                }
                if(flag !== UIElementFlags.None) {
                    var measureWalker = Fayde.DeepTreeWalker(element);
                    var childNode;
                    while(childNode = measureWalker.Step()) {
                        lu = childNode.LayoutUpdater;
                        if(childNode.XObject.Visibility !== Fayde.Visibility.Visible || !lu._HasFlag(flag)) {
                            measureWalker.SkipBranch();
                            continue;
                        }
                        lu._ClearFlag(flag);
                        switch(flag) {
                            case UIElementFlags.DirtyMeasureHint:
                                if(lu.DirtyFlags & _Dirty.Measure) {
                                    pass.MeasureList.push(lu);
                                }
                                break;
                            case UIElementFlags.DirtyArrangeHint:
                                if(lu.DirtyFlags & _Dirty.Arrange) {
                                    pass.ArrangeList.push(lu);
                                }
                                break;
                            case UIElementFlags.DirtySizeHint:
                                if(lu.LastRenderSize !== undefined) {
                                    pass.SizeList.push(lu);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                }
                if(flag === UIElementFlags.DirtyMeasureHint) {
                    //LayoutDebug(function () { return "Starting _MeasureList Update: " + pass.MeasureList.length; });
                    while(lu = pass.MeasureList.shift()) {
                        //LayoutDebug(function () { return "Measure [" + uie.__DebugToString() + "]"; });
                        lu._DoMeasureWithError(error);
                        pass.Updated = true;
                    }
                } else if(flag === UIElementFlags.DirtyArrangeHint) {
                    //LayoutDebug(function () { return "Starting _ArrangeList Update: " + pass.ArrangeList.length; });
                    while(lu = pass.ArrangeList.shift()) {
                        //LayoutDebug(function () { return "Arrange [" + uie.__DebugToString() + "]"; });
                        lu._DoArrangeWithError(error);
                        pass.Updated = true;
                        if(layout._HasFlag(UIElementFlags.DirtyMeasureHint)) {
                            break;
                        }
                    }
                } else if(flag === UIElementFlags.DirtySizeHint) {
                    while(lu = pass.SizeList.shift()) {
                        pass.Updated = true;
                        lu._UpdateActualSize();
                    }
                    //LayoutDebug(function () { return "Completed _SizeList Update"; });
                                    } else {
                    break;
                }
            }
        };
        LayoutUpdater.prototype._UpdateActualSize = function () {
            var last = this.LastRenderSize;
            var fe = this.Node.XObject;
            var s;
            if((fe).ComputeActualSize) {
                s = (fe).ComputeActualSize(this._ComputeActualSize, this);
            } else {
                s = this._ComputeActualSize();
            }
            if(last && size.isEqual(last, s)) {
                return;
            }
            this.LastRenderSize = s;
            fe.SizeChanged.Raise(fe, new Fayde.SizeChangedEventArgs(last, s));
        };
        LayoutUpdater.prototype._ComputeActualSize = function () {
            var node = this.Node;
            if(node.XObject.Visibility !== Fayde.Visibility.Visible) {
                return new size();
            }
            var parentNode = node.VisualParentNode;
            if((parentNode && !(parentNode.XObject instanceof Fayde.Controls.Canvas)) || this.IsLayoutContainer) {
                return size.clone(this.RenderSize);
            }
            return this.CoerceSize(new size());
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
            if(!isNaN(spw)) {
                cw = spw;
            }
            if(!isNaN(sph)) {
                ch = sph;
            }
            cw = Math.max(Math.min(cw, fe.MaxWidth), minw);
            ch = Math.max(Math.min(ch, fe.MaxHeight), minh);
            if(fe.UseLayoutRounding) {
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
        LayoutUpdater.prototype._ClearFlag = function (flag) {
            this.Flags &= ~flag;
        };
        LayoutUpdater.prototype._SetFlag = function (flag) {
            this.Flags |= flag;
        };
        LayoutUpdater.prototype._PropagateFlagUp = function (flag) {
            this.Flags |= flag;
            var node = this.Node;
            var lu;
            while((node = node.VisualParentNode) && (lu = node.LayoutUpdater) && !lu._HasFlag(flag)) {
                lu.Flags |= flag;
            }
        };
        LayoutUpdater.prototype._DoMeasureWithError = function (error) {
            var last = this.PreviousConstraint;
            var node = this.Node;
            var visualParentNode = node.VisualParentNode;
            if(!node.IsAttached && !last && !visualParentNode && this.IsLayoutContainer) {
                last = size.createInfinite();
            }
            if(last) {
                var previousDesired = size.clone(this.DesiredSize);
                this._Measure(last, error);
                if(size.isEqual(previousDesired, this.DesiredSize)) {
                    return;
                }
            }
            if(visualParentNode) {
                visualParentNode.LayoutUpdater.InvalidateMeasure();
            }
            this.DirtyFlags &= ~_Dirty.Measure;
        };
        LayoutUpdater.prototype._Measure = function (availableSize, error) {
            if(error.Message) {
                return;
            }
            var node = this.Node;
            var fe = node.XObject;
            if(isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
                error.Message = "Cannot call Measure using a size with NaN values";
                LayoutUpdater.LayoutExceptionUpdater = this;
                return;
            }
            var last = this.PreviousConstraint;
            var shouldMeasure = (this.DirtyFlags & _Dirty.Measure) > 0;
            shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);
            if(fe.Visibility !== Fayde.Visibility.Visible) {
                this.PreviousConstraint = availableSize;
                size.clear(this.DesiredSize);
                return;
            }
            node._ApplyTemplateWithError(error);
            if(!shouldMeasure) {
                return;
            }
            this.PreviousConstraint = availableSize;
            this.InvalidateArrange();
            this.UpdateBounds();
            var s = size.clone(availableSize);
            var margin = fe.Margin;
            if(margin) {
                size.shrinkByThickness(s, margin);
            }
            this.CoerceSize(s);
            if((fe).MeasureOverride) {
                s = (fe).MeasureOverride(s);
            } else {
                s = (fe)._MeasureOverride(s, error);
            }
            if(error.Message) {
                return;
            }
            this.DirtyFlags &= ~_Dirty.Measure;
            this.HiddenDesire = size.clone(s);
            var visualParentNode = node.VisualParentNode;
            if(!visualParentNode || visualParentNode instanceof Fayde.Controls.CanvasNode) {
                if(node instanceof Fayde.Controls.CanvasNode || !this.IsLayoutContainer) {
                    size.clear(this.DesiredSize);
                    return;
                }
            }
            this.CoerceSize(s);
            if(margin) {
                size.growByThickness(s, margin);
            }
            size.min(s, availableSize);
            if(fe.UseLayoutRounding) {
                s.Width = Math.round(s.Width);
                s.Height = Math.round(s.Height);
            }
            size.copyTo(s, this.DesiredSize);
        };
        LayoutUpdater.prototype._DoArrangeWithError = function (error) {
            var last = this.LayoutSlot;
            if(last === null) {
                last = undefined;
            }
            var n = this.Node;
            var fe = n.XObject;
            var visualParentNode = n.VisualParentNode;
            if(!visualParentNode) {
                var surface = this.Surface;
                var desired;
                if(this.IsLayoutContainer) {
                    desired = size.clone(this.DesiredSize);
                    if(n.IsAttached && n.IsTopLevel && !n.ParentNode) {
                        var measure = this.PreviousConstraint;
                        if(measure) {
                            size.max(desired, measure);
                        } else {
                            desired = size.clone(surface.Extents);
                        }
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
            if(last) {
                this._Arrange(last, error);
            } else {
                if(visualParentNode) {
                    visualParentNode.LayoutUpdater.InvalidateArrange();
                }
            }
        };
        LayoutUpdater.prototype._Arrange = function (finalRect, error) {
            if(error.Message) {
                return;
            }
            var node = this.Node;
            var fe = node.XObject;
            if(fe.UseLayoutRounding) {
                rect.round(finalRect);
            }
            if(finalRect.Width < 0 || finalRect.Height < 0 || !isFinite(finalRect.Width) || !isFinite(finalRect.Height) || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
                var desired = this.DesiredSize;
                Warn("Invalid arguments to Arrange. Desired = " + desired.toString());
                return;
            }
            if(fe.Visibility !== Fayde.Visibility.Visible) {
                this.LayoutSlot = finalRect;
                return;
            }
            var slot = this.LayoutSlot;
            var shouldArrange = (this.DirtyFlags & _Dirty.Arrange) > 0 || !slot || !rect.isEqual(slot, finalRect);
            if(!shouldArrange) {
                return;
            }
            var measure = this.PreviousConstraint;
            if(this.IsContainer && !measure) {
                this._Measure(size.fromRect(finalRect), error);
            }
            measure = this.PreviousConstraint;
            this.SetLayoutClip(undefined);
            var childRect = rect.clone(finalRect);
            var margin = fe.Margin;
            if(margin) {
                rect.shrinkByThickness(childRect, margin);
            }
            this.UpdateTransform();
            this.UpdateProjection();
            this.UpdateBounds();
            var offer = size.clone(this.HiddenDesire);
            var stretched = this.CoerceSize(size.fromRect(childRect));
            var framework = this.CoerceSize(new size());
            var horiz = fe.HorizontalAlignment;
            var vert = fe.VerticalAlignment;
            if(horiz === Fayde.HorizontalAlignment.Stretch) {
                framework.Width = Math.max(framework.Width, stretched.Width);
            }
            if(vert === Fayde.VerticalAlignment.Stretch) {
                framework.Height = Math.max(framework.Height, stretched.Height);
            }
            size.max(offer, framework);
            this.LayoutSlot = finalRect;
            var response;
            if((fe).ArrangeOverride) {
                response = (fe).ArrangeOverride(offer);
            } else {
                response = (fe)._ArrangeOverride(offer, error);
            }
            if(horiz === Fayde.HorizontalAlignment.Stretch) {
                response.Width = Math.max(response.Width, framework.Width);
            }
            if(vert === Fayde.VerticalAlignment.Stretch) {
                response.Height = Math.max(response.Height, framework.Height);
            }
            var flipHoriz = false;
            var flowDirection = fe.FlowDirection;
            var visualParentNode = node.VisualParentNode;
            if(visualParentNode) {
                flipHoriz = visualParentNode.XObject.FlowDirection !== flowDirection;
            } else if(node.ParentNode instanceof Fayde.Controls.Primitives.PopupNode) {
                flipHoriz = (node.ParentNode).XObject.FlowDirection !== flowDirection;
            } else {
                flipHoriz = flowDirection === Fayde.FlowDirection.RightToLeft;
            }
            var layoutXform = mat3.identity(this.LayoutXform);
            mat3.translate(layoutXform, childRect.X, childRect.Y);
            if(flipHoriz) {
                mat3.translate(layoutXform, offer.Width, 0);
                mat3.scale(layoutXform, -1, 1);
            }
            if(error.Message) {
                return;
            }
            this.DirtyFlags &= ~_Dirty.Arrange;
            var visualOffset = this.VisualOffset;
            visualOffset.X = childRect.X;
            visualOffset.Y = childRect.Y;
            var oldSize = size.clone(this.RenderSize);
            if(fe.UseLayoutRounding) {
                response.Width = Math.round(response.Width);
                response.Height = Math.round(response.Height);
            }
            size.copyTo(response, this.RenderSize);
            var constrainedResponse = this.CoerceSize(size.clone(response));
            size.min(constrainedResponse, response);
            if(!visualParentNode || visualParentNode instanceof Fayde.Controls.CanvasNode) {
                if(!this.IsLayoutContainer) {
                    size.clear(this.RenderSize);
                    return;
                }
            }
            var isTopLevel = node.IsAttached && node.IsTopLevel;
            if(!isTopLevel) {
                switch(horiz) {
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
                switch(vert) {
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
            if(fe.UseLayoutRounding) {
                visualOffset.X = Math.round(visualOffset.X);
                visualOffset.Y = Math.round(visualOffset.Y);
            }
            layoutXform = mat3.identity(this.LayoutXform);
            mat3.translate(layoutXform, visualOffset.X, visualOffset.Y);
            if(flipHoriz) {
                mat3.translate(layoutXform, response.Width, 0);
                mat3.scale(layoutXform, -1, 1);
            }
            var element = new rect();
            element.Width = response.Width;
            element.Height = response.Height;
            var layoutClip = rect.clone(childRect);
            layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
            layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
            if(fe.UseLayoutRounding) {
                layoutClip.X = Math.round(layoutClip.X);
                layoutClip.Y = Math.round(layoutClip.Y);
            }
            if(((!isTopLevel && rect.isRectContainedIn(element, layoutClip)) || !size.isEqual(constrainedResponse, response)) && !(node instanceof Fayde.Controls.CanvasNode) && ((visualParentNode && !(visualParentNode instanceof Fayde.Controls.CanvasNode)) || this.IsContainer)) {
                var frameworkClip = this.CoerceSize(size.createInfinite());
                var frect = rect.fromSize(frameworkClip);
                rect.intersection(layoutClip, frect);
                var rectangle = new Fayde.Media.RectangleGeometry();
                rectangle.Rect = layoutClip;
                this.SetLayoutClip(rectangle);
            }
            if(!size.isEqual(oldSize, response)) {
                if(!this.LastRenderSize) {
                    this.LastRenderSize = oldSize;
                    this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
                }
            }
        };
        LayoutUpdater.prototype.DoRender = function (ctx, r) {
            if(!this.TotalIsRenderVisible) {
                return;
            }
            if((this.TotalOpacity * 255) < 0.5) {
                return;
            }
            var region = new rect();
            if(false) {
            } else {
                rect.copyTo(this.SubtreeExtents, region);
                rect.transform(region, this.RenderXform);
                rect.transform(region, ctx.CurrentTransform);
                rect.roundOut(region);
                rect.intersection(region, r);
            }
            if(rect.isEmpty(region)) {
                return;
            }
            ctx.Save();
            ctx.TransformMatrix(this.RenderXform);
            ctx.CanvasContext.globalAlpha = this.TotalOpacity;
            var uie = this.Node.XObject;
            var canvasCtx = ctx.CanvasContext;
            var clip = uie.Clip;
            if(clip) {
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
            if(effect) {
                canvasCtx.save();
                effect.PreRender(ctx);
            }
            if((uie).Render) {
                (uie).Render(ctx, this, region);
            }
            if(effect) {
                canvasCtx.restore();
            }
            //if (window.RenderDebug) RenderDebug.Indent();
            var enumerator = this.Node.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.ZFoward);
            while(enumerator.MoveNext()) {
                (enumerator.Current).LayoutUpdater.DoRender(ctx, region);
            }
            //if (window.RenderDebug) RenderDebug.Unindent();
            ctx.Restore();
        };
        LayoutUpdater.prototype._RenderLayoutClip = function (ctx) {
            var iX = 0;
            var iY = 0;
            var curNode = this.Node;
            while(curNode) {
                var lu = curNode.LayoutUpdater;
                var geom = lu.LayoutClip;
                if(geom) {
                    ctx.ClipGeometry(geom);
                }
                if(lu.BreaksLayoutClipRender) {
                    //Canvas or UserControl
                    break;
                }
                var visualOffset = lu.VisualOffset;
                if(visualOffset) {
                    ctx.Translate(-visualOffset.X, -visualOffset.Y);
                    iX += visualOffset.X;
                    iY += visualOffset.Y;
                }
                curNode = curNode.VisualParentNode;
            }
            ctx.Translate(iX, iY);
        };
        LayoutUpdater.prototype._HasLayoutClip = function () {
            var curNode = this.Node;
            var lu;
            while(curNode) {
                lu = curNode.LayoutUpdater;
                if(lu.LayoutClip) {
                    return true;
                }
                if(lu.BreaksLayoutClipRender) {
                    break;
                }
                curNode = curNode.VisualParentNode;
            }
            return false;
        };
        return LayoutUpdater;
    })();
    Fayde.LayoutUpdater = LayoutUpdater;    
    Nullstone.RegisterType(LayoutUpdater, "LayoutUpdater");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LayoutUpdater.js.map
