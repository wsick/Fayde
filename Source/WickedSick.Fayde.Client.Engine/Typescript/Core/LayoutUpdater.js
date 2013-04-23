/// <reference path="../Engine/Dirty.ts" />
/// CODE
/// <reference path="UIElement.ts" />
/// <reference path="../Media/Geometry.ts" />
/// <reference path="../Primitives/rect.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="../Primitives/Thickness.ts" />
/// <reference path="SizeChangedEventArgs.ts" />
/// <reference path="../Controls/Canvas.ts" />
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
            this.LayoutExceptionElement = undefined;
            this.LayoutSlot = undefined;
            this.PreviousConstraint = undefined;
            this.LastRenderSize = undefined;
            this.RenderSize = new size();
            this.TotalIsRenderVisible = true;
            this.Extents = new rect();
            this.Bounds = new rect();
            this.Global = new rect();
            this.Surface = new rect();
            this.EffectPadding = new Thickness();
            this.ClipBounds = new rect();
            this.LayoutClipBounds = new rect();
            this.Flags = Fayde.UIElementFlags.None;
            this.DirtyFlags = 0;
            this.InUpDirty = false;
            this.InDownDirty = false;
            this.DirtyRegion = null;
            this._ForceInvalidateOfNewBounds = false;
        }
        LayoutUpdater.prototype.SetSurface = function (surface) {
            this._Surface = surface;
        };
        LayoutUpdater.prototype.OnIsAttachedChanged = function (newIsAttached, visualParentNode) {
            this.UpdateTotalRenderVisibility();
            if(!newIsAttached) {
                this._CacheInvalidateHint();
                this._Surface.OnNodeDetached(this);
            } else if(visualParentNode) {
                this._Surface = visualParentNode.LayoutUpdater._Surface;
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
        LayoutUpdater.prototype.IsContainer = function () {
            //TODO: Implement
            return true;
        };
        LayoutUpdater.prototype.IsLayoutContainer = function () {
            //TODO: Implement
            return true;
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
                    this._Surface._AddDirtyElement(this, dirtyEnum.NewBounds);
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
        };
        LayoutUpdater.prototype._PropagateDirtyFlagToChildren = function (dirt) {
            var enumerator = this.Node.GetVisualTreeEnumerator();
            if(!enumerator) {
                return;
            }
            var s = this._Surface;
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
            //TODO: Implement
                    };
        LayoutUpdater.prototype.InvalidateArrange = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateBounds = function (forceRedraw) {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateTransform = function () {
            //TODO: Implement
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
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateRenderVisibility = function (vpLu) {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateTotalRenderVisibility = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateHitTestVisibility = function (vpLu) {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.UpdateTotalHitTestVisibility = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.ComputeBounds = function () {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.SetLayoutClip = function (layoutClip) {
            this.LayoutClip = layoutClip;
            if(!layoutClip) {
                rect.clear(this.LayoutClipBounds);
            } else {
                rect.copyTo(layoutClip.GetBounds(), this.LayoutClipBounds);
            }
        };
        LayoutUpdater.prototype.GetRenderVisible = function () {
            //TODO: Implement
            return true;
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
            var s = this._ComputeActualSize();
            if(last && size.isEqual(last, s)) {
                return;
            }
            this.LastRenderSize = s;
            var fe = this.Node.XObject;
            fe.SizeChanged.Raise(fe, new Fayde.SizeChangedEventArgs(last, s));
        };
        LayoutUpdater.prototype._ComputeActualSize = function () {
            var node = this.Node;
            if(node.XObject.Visibility !== Fayde.Visibility.Visible) {
                return new size();
            }
            var parentNode = node.VisualParentNode;
            if((parentNode && !(parentNode.XObject instanceof Fayde.Controls.Canvas)) || this.IsLayoutContainer()) {
                return size.clone(this.RenderSize);
            }
            return this._CoerceSize(new size());
        };
        LayoutUpdater.prototype._CoerceSize = function (s) {
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
            //TODO: Implement
                    };
        LayoutUpdater.prototype._DoArrangeWithError = function (error) {
            //TODO: Implement
                    };
        LayoutUpdater.prototype.DoRender = function (ctx, r) {
            //TODO: Implement
                    };
        return LayoutUpdater;
    })();
    Fayde.LayoutUpdater = LayoutUpdater;    
    Nullstone.RegisterType(LayoutUpdater, "LayoutUpdater");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=LayoutUpdater.js.map
