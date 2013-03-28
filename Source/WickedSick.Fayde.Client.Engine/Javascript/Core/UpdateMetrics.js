/// <reference path="../Primitives.js"/>
/// <reference path="Enums.js"/>
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

    function CreateUpdatePass(fe, measureOverride, arrangeOverride) {
        /// <param name="fe" type="Fayde.FrameworkElement"></param>
        /// <param name="measureOverride" type="Function"></param>
        /// <param name="arrangeOverride" type="Function"></param>
        var pass = {
            IsContainer: fe.IsContainer(),
            IsLayoutContainer: fe.IsLayoutContainer(),
            VisualParent: fe._VisualParent,
            Parent: fe._Parent,
            Metrics: fe._UpdateMetrics,
            Xformer: fe._Xformer,
            IsAttached: fe._IsAttached,
            IsTopLevel: false,
            DoMeasure: function (error) {
                var last = this.Metrics.PreviousConstraint;
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

                var metrics = this.Metrics;
                var last = metrics.PreviousConstraint;
                var shouldMeasure = (fe._DirtyFlags & _Dirty.Measure) > 0;
                shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);

                if (metrics.Visibility !== Fayde.Visibility.Visible) {
                    metrics.PreviousConstraint = availableSize;
                    size.clear(fe._DesiredSize);
                    return;
                }

                fe._ApplyTemplateWithError(error);

                if (!shouldMeasure)
                    return;

                metrics.PreviousConstraint = availableSize;

                fe._InvalidateArrange();
                fe._UpdateBounds();

                var margin = fe.Margin;
                var s = size.clone(availableSize);
                size.shrinkByThickness(s, margin);
                metrics.CoerceSize(s);

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

                metrics.CoerceSize(s);
                size.growByThickness(s, margin);
                size.min(s, availableSize);

                if (metrics.UseLayoutRounding) {
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
                            var measure = this.Metrics.PreviousConstraint;
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

                var metrics = this.Metrics;
                var slot = Fayde.LayoutInformation.GetLayoutSlot(fe, true);
                if (slot === null)
                    slot = undefined;

                var shouldArrange = (fe._DirtyFlags & _Dirty.Arrange) > 0;

                if (metrics.UseLayoutRounding) {
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

                if (metrics.Visibility !== Fayde.Visibility.Visible) {
                    Fayde.LayoutInformation.SetLayoutSlot(fe, finalRect);
                    return;
                }

                if (!shouldArrange)
                    return;

                var measure = metrics.PreviousConstraint;
                if (this.IsContainer && !measure) {
                    this.Measure(size.fromRect(finalRect), error);
                }
                measure = metrics.PreviousConstraint;

                Fayde.LayoutInformation.SetLayoutClip(fe, undefined);

                var margin = fe.Margin;
                var childRect = rect.clone(finalRect);
                rect.shrinkByThickness(childRect, margin);

                fe._UpdateTransform();
                fe._UpdateProjection();
                fe._UpdateBounds();

                var offer = size.clone(fe._HiddenDesire);

                var stretched = metrics.CoerceSize(size.fromRect(childRect));
                var framework = metrics.CoerceSize(new size());

                var horiz = metrics.HorizontalAlignment;
                var vert = metrics.VerticalAlignment;

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
                    flipHoriz = visualParent.FlowDirection !== metrics.FlowDirection;
                else if (fe.Parent instanceof Fayde.Controls.Primitives.Popup)
                    flipHoriz = fe.Parent.FlowDirection !== metrics.FlowDirection;
                else
                    flipHoriz = metrics.FlowDirection === Fayde.FlowDirection.RightToLeft;

                var layoutXform = mat3.identity(this.Xformer.LayoutXform);
                mat3.translate(layoutXform, childRect.X, childRect.Y);
                if (flipHoriz) {
                    mat3.translate(layoutXform, offer.Width, 0);
                    mat3.scale(layoutXform, -1, 1);
                }

                if (error.Message)
                    return;

                fe._DirtyFlags &= ~_Dirty.Arrange;
                var visualOffset = new Point(childRect.X, childRect.Y);
                metrics.VisualOffset = visualOffset;

                var oldSize = size.clone(fe._RenderSize);

                if (metrics.UseLayoutRounding) {
                    response.Width = Math.round(response.Width);
                    response.Height = Math.round(response.Height);
                }

                size.copyTo(response, fe._RenderSize);
                var constrainedResponse = metrics.CoerceSize(size.clone(response));
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

                if (metrics.UseLayoutRounding) {
                    visualOffset.X = Math.round(visualOffset.X);
                    visualOffset.Y = Math.round(visualOffset.Y);
                }

                layoutXform = mat3.identity(this.Xformer.LayoutXform);
                mat3.translate(layoutXform, visualOffset.X, visualOffset.Y);
                if (flipHoriz) {
                    mat3.translate(layoutXform, response.Width, 0);
                    mat3.scale(layoutXform, -1, 1);
                }

                metrics.VisualOffset = visualOffset;

                var element = new rect();
                rect.Width = response.Width;
                rect.Height = response.Height;
                var layoutClip = rect.clone(childRect);
                layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
                layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
                if (metrics.UseLayoutRounding) {
                    layoutClip.X = Math.round(layoutClip.X);
                    layoutClip.Y = Math.round(layoutClip.Y);
                }

                if (((!isTopLevel && rect.isRectContainedIn(element, layoutClip)) || !size.isEqual(constrainedResponse, response)) && !(fe instanceof Fayde.Controls.Canvas) && ((visualParent && !(visualParent instanceof Fayde.Controls.Canvas)) || this.IsContainer)) {
                    var frameworkClip = metrics.CoerceSize(size.createInfinite());
                    var frect = rect.fromSize(frameworkClip);
                    rect.intersection(layoutClip, frect);
                    var rectangle = new Fayde.Media.RectangleGeometry();
                    rectangle.Rect = layoutClip;
                    Fayde.LayoutInformation.SetLayoutClip(fe, rectangle);
                }

                if (!size.isEqual(oldSize, response)) {
                    if (!metrics.LastRenderSize) {
                        metrics.LastRenderSize = oldSize;
                        fe._PropagateFlagUp(Fayde.UIElementFlags.DirtySizeHint);
                    }
                }
            }
        };
        return pass;
    };
    Fayde.CreateUpdatePass = CreateUpdatePass;
})(Fayde || (Fayde = {}));