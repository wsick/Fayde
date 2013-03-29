/// <reference path="../Primitives.js"/>
/// <reference path="Enums.js"/>
/// <reference path="../Engine/Dirty.js"/>
/// CODE

(function (Fayde) {
    "use asm";
    function CreateUpdateMetrics() {
        var metrics = {
            //UIElement
            Opacity: +1,
            UseLayoutRounding: 1 | 0,
            Visibility: 0 | 0, //Fayde.Visibility.Visible
            //FrameworkElement
            Width: +NaN,
            Height: +NaN,
            MinWidth: +0,
            MinHeight: +0,
            MaxWidth: +Infinity,
            MaxHeight: +Infinity,
            HorizontalAlignment: 3 | 0, //Fayde.HorizontalAlignment.Stretch
            VerticalAlignment: 3 | 0, //Fayde.VerticalAlignment.Stretch
            FlowDirection: 0 | 0, //Fayde.FlowDirection.LeftToRight
            Margin: null, //Thickness
            //LayoutInformation
            PreviousConstraint: null, //size
            FinalRect: null, //rect
            LastRenderSize: null, //size
            VisualOffset: null, //Point
            CoerceSize: function (s) {
                var spw = this.Width;
                var sph = this.Height;
                var cw = this.MinWidth;
                var ch = this.MinHeight;

                cw = Math.max(cw, s.Width);
                ch = Math.max(ch, s.Height);

                if (!isNaN(spw))
                    cw = spw;

                if (!isNaN(sph))
                    ch = sph;

                cw = Math.max(Math.min(cw, this.MaxWidth), this.MinWidth);
                ch = Math.max(Math.min(ch, this.MaxHeight), this.MinHeight);

                if (this.UseLayoutRounding) {
                    cw = Math.round(cw);
                    ch = Math.round(ch);
                }

                s.Width = cw;
                s.Height = ch;
                return s;
            }
        };
        return metrics;
    };
    Fayde.CreateUpdateMetrics = CreateUpdateMetrics;

    var dirtyEnum = _Dirty;
    var localTransformFlag = dirtyEnum.LocalTransform;
    var localProjectionFlag = dirtyEnum.LocalProjection;
    var transformFlag = dirtyEnum.Transform;
    var downDirtyFlag = dirtyEnum.DownDirtyState;
    var upDirtyFlag = dirtyEnum.UpDirtyState;

    function CreateUpdatePass(fe, measureOverride, arrangeOverride) {
        /// <param name="fe" type="Fayde.FrameworkElement"></param>
        /// <param name="measureOverride" type="Function"></param>
        /// <param name="arrangeOverride" type="Function"></param>

        var xformer = fe._Xformer;
        var updateMetrics = fe._UpdateMetrics;
        var metrics = fe._Metrics;
        var pass = {
            IsContainer: fe.IsContainer(),
            IsLayoutContainer: fe.IsLayoutContainer(),
            VisualParent: fe._VisualParent,
            Parent: fe._Parent,
            IsAttached: fe._IsAttached,
            IsTopLevel: false,
            Xformer: xformer,
            UpdateMetrics: updateMetrics,
            Metrics: metrics,
            DoMeasure: function (error) {
                var last = updateMetrics.PreviousConstraint;
                var parent = this.VisualParent;

                if (!this.IsAttached && !last && !parent && this.IsLayoutContainer) {
                    last = size.createInfinite();
                }

                if (last) {
                    var previousDesired = size.clone(fe._DesiredSize);
                    this.Measure(last, error);
                    if (size.isEqual(previousDesired, fe._DesiredSize))
                        return;
                }

                if (parent)
                    parent._InvalidateMeasure();

                fe._DirtyFlags &= ~_Dirty.Measure;
            },
            Measure: function (availableSize, error) {
                if (error.Message)
                    return;

                if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
                    error.Message = "Cannot call Measure using a size with NaN values";
                    Fayde.LayoutInformation.SetLayoutExceptionElement(fe);
                    return;
                }

                var last = updateMetrics.PreviousConstraint;
                var shouldMeasure = (fe._DirtyFlags & _Dirty.Measure) > 0;
                shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);

                if (updateMetrics.Visibility !== Fayde.Visibility.Visible) {
                    updateMetrics.PreviousConstraint = availableSize;
                    size.clear(fe._DesiredSize);
                    return;
                }

                fe._ApplyTemplateWithError(error);

                if (!shouldMeasure)
                    return;

                updateMetrics.PreviousConstraint = availableSize;

                fe._InvalidateArrange();
                fe._UpdateBounds();

                var s = size.clone(availableSize);
                var margin = updateMetrics.Margin;
                if (margin)
                    size.shrinkByThickness(s, margin);
                updateMetrics.CoerceSize(s);

                s = measureOverride.call(fe, s, pass, error);

                if (error.Message)
                    return;

                fe._DirtyFlags &= ~_Dirty.Measure;
                fe._HiddenDesire = size.clone(s);

                var parent = this.VisualParent;
                if (!parent || parent instanceof Fayde.Controls.Canvas) {
                    if (fe instanceof Fayde.Controls.Canvas || !this.IsLayoutContainer) {
                        size.clear(fe._DesiredSize);
                        return;
                    }
                }

                updateMetrics.CoerceSize(s);
                if (margin)
                    size.growByThickness(s, margin);
                size.min(s, availableSize);

                if (updateMetrics.UseLayoutRounding) {
                    s.Width = Math.round(s.Width);
                    s.Height = Math.round(s.Height);
                }

                size.copyTo(s, fe._DesiredSize);
            },
            DoArrange: function (error) {
                var last = Fayde.LayoutInformation.GetLayoutSlot(fe, true);
                if (last === null)
                    last = undefined;

                var parent = this.VisualParent;
                if (!parent) {
                    var surface = App.Instance.MainSurface;
                    var desired = new size();
                    if (this.IsLayoutContainer) {
                        desired.Width = fe._DesiredSize.Width;
                        desired.Height = fe._DesiredSize.Height;
                        if (this.IsAttached && this.IsTopLevel && !this.Parent) {
                            var measure = updateMetrics.PreviousConstraint;
                            if (measure)
                                size.max(desired, measure);
                            else {
                                desired.Width = surface.GetWidth();
                                desired.Height = surface.GetHeight();
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

                if (last) {
                    this.Arrange(last, error);
                } else {
                    if (parent)
                        parent._InvalidateArrange();
                }
            },
            Arrange: function (finalRect, error) {
                if (error.Message)
                    return;

                var slot = Fayde.LayoutInformation.GetLayoutSlot(fe, true);
                if (slot === null)
                    slot = undefined;

                var shouldArrange = (fe._DirtyFlags & _Dirty.Arrange) > 0;

                if (updateMetrics.UseLayoutRounding) {
                    rect.round(finalRect);
                }

                shouldArrange |= slot ? !rect.isEqual(slot, finalRect) : true;

                if (finalRect.Width < 0 || finalRect.Height < 0
                        || !isFinite(finalRect.Width) || !isFinite(finalRect.Height)
                        || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
                    var desired = fe._DesiredSize;
                    Warn("Invalid arguments to Arrange. Desired = " + desired.toString());
                    return;
                }

                var visualParent = this.VisualParent;

                if (updateMetrics.Visibility !== Fayde.Visibility.Visible) {
                    Fayde.LayoutInformation.SetLayoutSlot(fe, finalRect);
                    return;
                }

                if (!shouldArrange)
                    return;

                var measure = updateMetrics.PreviousConstraint;
                if (this.IsContainer && !measure) {
                    this.Measure(size.fromRect(finalRect), error);
                }
                measure = updateMetrics.PreviousConstraint;

                Fayde.LayoutInformation.SetLayoutClip(fe, undefined);

                var childRect = rect.clone(finalRect);
                var margin = updateMetrics.Margin;
                if (margin)
                    rect.shrinkByThickness(childRect, margin);

                fe._UpdateTransform();
                fe._UpdateProjection();
                fe._UpdateBounds();

                var offer = size.clone(fe._HiddenDesire);

                var stretched = updateMetrics.CoerceSize(size.fromRect(childRect));
                var framework = updateMetrics.CoerceSize(new size());

                var horiz = updateMetrics.HorizontalAlignment;
                var vert = updateMetrics.VerticalAlignment;

                if (horiz === Fayde.HorizontalAlignment.Stretch)
                    framework.Width = Math.max(framework.Width, stretched.Width);

                if (vert === Fayde.VerticalAlignment.Stretch)
                    framework.Height = Math.max(framework.Height, stretched.Height);

                size.max(offer, framework);

                Fayde.LayoutInformation.SetLayoutSlot(fe, finalRect);

                var response = arrangeOverride.call(fe, offer, pass, error);

                if (horiz === Fayde.HorizontalAlignment.Stretch)
                    response.Width = Math.max(response.Width, framework.Width);

                if (vert === Fayde.VerticalAlignment.Stretch)
                    response.Height = Math.max(response.Height, framework.Height);

                var flipHoriz = false;
                if (visualParent)
                    flipHoriz = visualParent.FlowDirection !== updateMetrics.FlowDirection;
                else if (fe.Parent instanceof Fayde.Controls.Primitives.Popup)
                    flipHoriz = fe.Parent.FlowDirection !== updateMetrics.FlowDirection;
                else
                    flipHoriz = updateMetrics.FlowDirection === Fayde.FlowDirection.RightToLeft;

                var layoutXform = mat3.identity(xformer.LayoutXform);
                mat3.translate(layoutXform, childRect.X, childRect.Y);
                if (flipHoriz) {
                    mat3.translate(layoutXform, offer.Width, 0);
                    mat3.scale(layoutXform, -1, 1);
                }

                if (error.Message)
                    return;

                fe._DirtyFlags &= ~_Dirty.Arrange;
                var visualOffset = new Point(childRect.X, childRect.Y);
                updateMetrics.VisualOffset = visualOffset;

                var oldSize = size.clone(fe._RenderSize);

                if (updateMetrics.UseLayoutRounding) {
                    response.Width = Math.round(response.Width);
                    response.Height = Math.round(response.Height);
                }

                size.copyTo(response, fe._RenderSize);
                var constrainedResponse = updateMetrics.CoerceSize(size.clone(response));
                size.min(constrainedResponse, response);

                if (!visualParent || visualParent instanceof Fayde.Controls.Canvas) {
                    if (!this.IsLayoutContainer) {
                        size.clear(fe._RenderSize);
                        return;
                    }
                }

                var isTopLevel = this.IsAttached && this.IsTopLevel;
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

                if (updateMetrics.UseLayoutRounding) {
                    visualOffset.X = Math.round(visualOffset.X);
                    visualOffset.Y = Math.round(visualOffset.Y);
                }

                layoutXform = mat3.identity(xformer.LayoutXform);
                mat3.translate(layoutXform, visualOffset.X, visualOffset.Y);
                if (flipHoriz) {
                    mat3.translate(layoutXform, response.Width, 0);
                    mat3.scale(layoutXform, -1, 1);
                }

                updateMetrics.VisualOffset = visualOffset;

                var element = new rect();
                rect.Width = response.Width;
                rect.Height = response.Height;
                var layoutClip = rect.clone(childRect);
                layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
                layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
                if (updateMetrics.UseLayoutRounding) {
                    layoutClip.X = Math.round(layoutClip.X);
                    layoutClip.Y = Math.round(layoutClip.Y);
                }

                if (((!isTopLevel && rect.isRectContainedIn(element, layoutClip)) || !size.isEqual(constrainedResponse, response)) && !(fe instanceof Fayde.Controls.Canvas) && ((visualParent && !(visualParent instanceof Fayde.Controls.Canvas)) || this.IsContainer)) {
                    var frameworkClip = updateMetrics.CoerceSize(size.createInfinite());
                    var frect = rect.fromSize(frameworkClip);
                    rect.intersection(layoutClip, frect);
                    var rectangle = new Fayde.Media.RectangleGeometry();
                    rectangle.Rect = layoutClip;
                    Fayde.LayoutInformation.SetLayoutClip(fe, rectangle);
                }

                if (!size.isEqual(oldSize, response)) {
                    if (!updateMetrics.LastRenderSize) {
                        updateMetrics.LastRenderSize = oldSize;
                        fe._PropagateFlagUp(Fayde.UIElementFlags.DirtySizeHint);
                    }
                }
            },
            //Down --> RenderVisibility, HitTestVisibility, Transformation, Clip, ChildrenZIndices
            ProcessDown: function (surface, uie) {
                var visualParent = this.VisualParent;
                var f = uie._DirtyFlags;
                //i++;
                //DirtyDebug("Down Dirty Loop #" + i.toString() + " --> " + surface._DownDirty.__DebugToString());
                /*
                DirtyDebug.Level++;
                DirtyDebug("[" + uie.__DebugToString() + "]" + uie.__DebugDownDirtyFlags());
                */
                if (f & dirtyEnum.RenderVisibility) {
                    f &= ~dirtyEnum.RenderVisibility;

                    var ovisible = uie._GetRenderVisible();

                    uie._UpdateBounds();

                    if (visualParent)
                        visualParent._UpdateBounds();

                    //DirtyDebug("ComputeTotalRenderVisibility: [" + uie.__DebugToString() + "]");
                    uie._ComputeTotalRenderVisibility();

                    if (!uie._GetRenderVisible())
                        uie._CacheInvalidateHint();

                    if (ovisible !== uie._GetRenderVisible())
                        surface._AddDirtyElement(uie, dirtyEnum.NewBounds);

                    surface._PropagateDirtyFlagToChildren(uie, dirtyEnum.RenderVisibility);
                }

                if (f & dirtyEnum.HitTestVisibility) {
                    f &= ~dirtyEnum.HitTestVisibility;
                    uie._ComputeTotalHitTestVisibility();
                    surface._PropagateDirtyFlagToChildren(uie, dirtyEnum.HitTestVisibility);
                }

                f = this.ComputeXforms(surface, f);

                if (f & dirtyEnum.LocalClip) {
                    f &= ~dirtyEnum.LocalClip;
                    f |= dirtyEnum.Clip;
                }
                if (f & dirtyEnum.Clip) {
                    f &= ~dirtyEnum.Clip;
                    surface._PropagateDirtyFlagToChildren(uie, dirtyEnum.Clip);
                }

                if (f & dirtyEnum.ChildrenZIndices) {
                    f &= ~dirtyEnum.ChildrenZIndices;
                    if (!(uie instanceof Fayde.Controls.Panel)) {
                        Warn("_Dirty.ChildrenZIndices only applies to Panel subclasses");
                    } else {
                        //DirtyDebug("ResortByZIndex: [" + uie.__DebugToString() + "]");
                        uie.Children.ResortByZIndex();
                    }
                }

                //DirtyDebug.Level--;
                uie._DirtyFlags = f;

                return !(f & downDirtyFlag);
            },
            //Up --> Bounds, Invalidation
            ProcessUp: function (surface, uie) {
                var visualParent = this.VisualParent;
                var f = uie._DirtyFlags;
                //i++;
                //DirtyDebug("Up Dirty Loop #" + i.toString() + " --> " + surface._UpDirty.__DebugToString());
                var invalidateSubtreePaint = false;
                if (f & dirtyEnum.Bounds) {
                    f &= ~dirtyEnum.Bounds;

                    var oextents = rect.clone(metrics.SubtreeExtents);
                    var oglobalbounds = rect.clone(metrics.GlobalBounds);
                    var osubtreebounds = rect.clone(metrics.SubtreeBounds);

                    metrics.ComputeBounds(uie);

                    if (!rect.isEqual(oglobalbounds, metrics.GlobalBounds)) {
                        if (visualParent) {
                            visualParent._UpdateBounds();
                            visualParent._Invalidate(osubtreebounds);
                            visualParent._Invalidate(metrics.SubtreeBounds);
                        }
                    }

                    invalidateSubtreePaint = !rect.isEqual(oextents, metrics.SubtreeExtents) || uie._ForceInvalidateOfNewBounds;
                    uie._ForceInvalidateOfNewBounds = false;
                }

                if (f & dirtyEnum.NewBounds) {
                    if (visualParent)
                        visualParent._Invalidate(metrics.SubtreeBounds);
                    else if (this.IsTopLevel)
                        invalidateSubtreePaint = true;
                    f &= ~dirtyEnum.NewBounds;
                }
                if (invalidateSubtreePaint)
                    uie._Invalidate(metrics.SubtreeBounds);


                if (f & dirtyEnum.Invalidate) {
                    f &= ~dirtyEnum.Invalidate;
                    var dirty = uie._DirtyRegion;
                    if (visualParent) {
                        visualParent._Invalidate(dirty);
                    } else {
                        if (this.IsAttached) {
                            surface._Invalidate(dirty);
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
                uie._DirtyFlags = f;
                return !(f & upDirtyFlag);
            },
            ComputeXforms: function (surface, f) {
                var uie = fe;
                var visualParent = this.VisualParent;

                var isLT = f & localTransformFlag;
                var isLP = f & localProjectionFlag;
                var isT = isLT || isLP || f & transformFlag;
                f &= ~(localTransformFlag | localProjectionFlag | transformFlag);

                if (isLT) {
                    //DirtyDebug("ComputeLocalTransform: [" + uie.__DebugToString() + "]");
                    xformer.ComputeLocalTransform(uie);
                    //DirtyDebug("--> " + xformer.LocalXform._Elements.toString());
                }
                if (isLP) {
                    //DirtyDebug("ComputeLocalProjection: [" + uie.__DebugToString() + "]");
                    xformer.ComputeLocalProjection(uie);
                }
                if (isT) {
                    //DirtyDebug("ComputeTransform: [" + uie.__DebugToString() + "]");
                    xformer.ComputeTransform(uie, this);
                    //DirtyDebug("--> " + xformer.AbsoluteProjection._Elements.slice(0, 8).toString());
                    if (visualParent)
                        visualParent._UpdateBounds();
                    surface._PropagateDirtyFlagToChildren(uie, dirtyEnum.Transform);
                }
                return f;
            },
        };
        return pass;
    };
    Fayde.CreateUpdatePass = CreateUpdatePass;
})(Fayde || (Fayde = {}));