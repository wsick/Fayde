/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="UIElement.js" />
/// <reference path="Matrix.js"/>
/// <reference path="List.js"/>
/// <reference path="TreeWalkers.js"/>
/// <reference path="PropertyValueProviders/PropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/Style.js"/>
/// <reference path="PropertyValueProviders/ImplicitStyle.js"/>
/// <reference path="PropertyValueProviders/InheritedDataContext.js"/>

FrameworkElement.prototype = new UIElement;
FrameworkElement.prototype.constructor = FrameworkElement;
function FrameworkElement() {
    UIElement.call(this);
    this._BoundsWithChildren = new Rect();
    this._GlobalBoundsWithChildren = new Rect();
    this._SurfaceBoundsWithChildren = new Rect();
    this._ExtentsWithChildren = new Rect();

    this._Providers[_PropertyPrecedence.LocalStyle] = new _StylePropertyValueProvider(this, _PropertyPrecedence.LocalStyle);
    this._Providers[_PropertyPrecedence.ImplicitStyle] = new _ImplicitStylePropertyValueProvider(this, _PropertyPrecedence.ImplicitStyle);
    this._Providers[_PropertyPrecedence.DynamicValue] = new _FrameworkElementProvider(this, _PropertyPrecedence.DynamicValue);
    this._Providers[_PropertyPrecedence.InheritedDataContext] = new _InheritedDataContextPropertyValueProvider(this, _PropertyPrecedence.InheritedDataContext);
}

//////////////////////////////////////////
// DEPENDENCY PROPERTIES
//////////////////////////////////////////
FrameworkElement.HeightProperty = DependencyProperty.Register("Height", FrameworkElement, NaN);
FrameworkElement.prototype.GetHeight = function () {
    return this.GetValue(FrameworkElement.HeightProperty);
};
FrameworkElement.prototype.SetHeight = function (value) {
    this.SetValue(FrameworkElement.HeightProperty, value);
};

FrameworkElement.WidthProperty = DependencyProperty.Register("Width", FrameworkElement, NaN);
FrameworkElement.prototype.GetWidth = function () {
    return this.GetValue(FrameworkElement.WidthProperty);
};
FrameworkElement.prototype.SetWidth = function (value) {
    this.SetValue(FrameworkElement.WidthProperty, value);
};

FrameworkElement.ActualHeightProperty = DependencyProperty.Register("ActualHeight", FrameworkElement);
FrameworkElement.prototype.GetActualHeight = function () {
    return this.GetValue(FrameworkElement.ActualHeightProperty);
};
FrameworkElement.prototype.SetActualHeight = function (value) {
    this.SetValue(FrameworkElement.ActualHeightProperty, value);
};

FrameworkElement.ActualWidthProperty = DependencyProperty.Register("ActualWidth", FrameworkElement);
FrameworkElement.prototype.GetActualWidth = function () {
    return this.GetValue(FrameworkElement.ActualWidthProperty);
};
FrameworkElement.prototype.SetActualWidth = function (value) {
    this.SetValue(FrameworkElement.ActualWidthProperty, value);
};

FrameworkElement.DataContextProperty = DependencyProperty.Register("DataContext", FrameworkElement);
FrameworkElement.prototype.GetDataContext = function () {
    return this.GetValue(FrameworkElement.DataContextProperty);
};
FrameworkElement.prototype.SetDataContext = function (value) {
    this.SetValue(FrameworkElement.DataContextProperty, value);
};

FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.Register("HorizontalAlignment", FrameworkElement);
FrameworkElement.prototype.GetHorizontalAlignment = function () {
    return this.GetValue(FrameworkElement.HorizontalAlignmentProperty);
};
FrameworkElement.prototype.SetHorizontalAlignment = function (value) {
    this.SetValue(FrameworkElement.HorizontalAlignmentProperty, value);
};

FrameworkElement.LanguageProperty = DependencyProperty.Register("Language", FrameworkElement);
FrameworkElement.prototype.GetLanguage = function () {
    return this.GetValue(FrameworkElement.LanguageProperty);
};
FrameworkElement.prototype.SetLanguage = function (value) {
    this.SetValue(FrameworkElement.LanguageProperty, value);
};

FrameworkElement.MarginProperty = DependencyProperty.Register("Margin", FrameworkElement);
FrameworkElement.prototype.GetMargin = function () {
    return this.GetValue(FrameworkElement.MarginProperty);
};
FrameworkElement.prototype.SetMargin = function (value) {
    this.SetValue(FrameworkElement.MarginProperty, value);
};

FrameworkElement.MaxHeightProperty = DependencyProperty.Register("MaxHeight", FrameworkElement);
FrameworkElement.prototype.GetMaxHeight = function () {
    return this.GetValue(FrameworkElement.MaxHeightProperty);
};
FrameworkElement.prototype.SetMaxHeight = function (value) {
    this.SetValue(FrameworkElement.MaxHeightProperty, value);
};

FrameworkElement.MaxWidthProperty = DependencyProperty.Register("MaxWidth", FrameworkElement);
FrameworkElement.prototype.GetMaxWidth = function () {
    return this.GetValue(FrameworkElement.MaxWidthProperty);
};
FrameworkElement.prototype.SetMaxWidth = function (value) {
    this.SetValue(FrameworkElement.MaxWidthProperty, value);
};

FrameworkElement.MinHeightProperty = DependencyProperty.Register("MinHeight", FrameworkElement);
FrameworkElement.prototype.GetMinHeight = function () {
    return this.GetValue(FrameworkElement.MinHeightProperty);
};
FrameworkElement.prototype.SetMinHeight = function (value) {
    this.SetValue(FrameworkElement.MinHeightProperty, value);
};

FrameworkElement.MinWidthProperty = DependencyProperty.Register("MinWidth", FrameworkElement);
FrameworkElement.prototype.GetMinWidth = function () {
    return this.GetValue(FrameworkElement.MinWidthProperty);
};
FrameworkElement.prototype.SetMinWidth = function (value) {
    this.SetValue(FrameworkElement.MinWidthProperty, value);
};

FrameworkElement.VerticalAlignmentProperty = DependencyProperty.Register("VerticalAlignment", FrameworkElement);
FrameworkElement.prototype.GetVerticalAlignment = function () {
    return this.GetValue(FrameworkElement.VerticalAlignmentProperty);
};
FrameworkElement.prototype.SetVerticalAlignment = function (value) {
    this.SetValue(FrameworkElement.VerticalAlignmentProperty, value);
};

FrameworkElement.StyleProperty = DependencyProperty.Register("Style", FrameworkElement);
FrameworkElement.prototype.GetStyle = function () {
    return this.GetValue(FrameworkElement.StyleProperty);
};
FrameworkElement.prototype.SetStyle = function (value) {
    this.SetValue(FrameworkElement.StyleProperty, value);
};

FrameworkElement.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", FrameworkElement);
FrameworkElement.prototype.GetFlowDirection = function () {
    return this.GetValue(FrameworkElement.FlowDirectionProperty);
};
FrameworkElement.prototype.SetFlowDirection = function (value) {
    this.SetValue(FrameworkElement.FlowDirectionProperty, value);
};

//////////////////////////////////////////
// INSTANCE METHODS
//////////////////////////////////////////
FrameworkElement.prototype._ApplySizeConstraints = function (size) {
    var specified = new Size(this.GetWidth(), this.GetHeight());
    var constrained = new Size(this.GetMinWidth(), this.GetMinHeight());

    constrained = constrained.Max(size);

    if (!isNaN(specified.Width))
        constrained.Width = specified.Width;

    if (!isNaN(specified.Height))
        constrained.Height = specified.Height;

    constrained = constrained.Min(new Size(this.GetMaxWidth(), this.GetMaxHeight()));
    constrained = constrained.Max(new Size(this.GetMinWidth(), this.GetMinHeight()));

    if (this.GetUseLayoutRounding()) {
        constrained.Width = Math.round(constrained.Width);
        constrained.Height = Math.round(constrained.Height);
    }

    return constrained;
};
FrameworkElement.prototype._GetSubtreeExtents = function () {
    if (this._GetSubtreeObject())
        return this._ExtentsWithChildren;
    return this._Extents;
};
FrameworkElement.prototype._UpdateBounds = function () {
    NotImplemented("FrameworkElement._UpdateBounds()");
};
FrameworkElement.prototype._ComputeBounds = function () {
    var size = new Size(this.GetActualWidth(), this.GetActualHeight());
    size = this._ApplySizeConstraints(size);

    this._Extents = new Rect(0, 0, size.Width, size.Height);
    this._ExtentsWithChildren = this._Extents;

    var walker = this._GetVisualTreeWalker();
    var item;
    while (item = walker.Step()) {
        if (item._GetRenderVisible())
            this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
    }

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteXform);
    this._BoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteXform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
FrameworkElement.prototype._ComputeGlobalBounds = function () {
    UIElement.prototype._ComputeGlobalBounds.call(this);
    this._GlobalBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._LocalProjection);
};
FrameworkElement.prototype._ComputeSurfaceBounds = function () {
    UIElement.prototype._ComputeSurfaceBounds.call(this);
    this._SurfaceBoundsWithChildren = this._ExtentsWithChildren; //.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteProjection);
};
FrameworkElement.prototype._GetGlobalBounds = function () {
    if (this._GetSubtreeObject())
        return this._GlobalBoundsWithChildren;
    return this._GlobalBounds;
};
FrameworkElement.prototype._MeasureWithError = function (availableSize, error) {
    if (error.IsErrored())
        return;

    if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
        error.SetErrored("Cannot call Measure using a size with NaN values");
        //LayoutInformation.SetLayoutExceptionElement(this);
        return;
    }

    var last = LayoutInformation.GetPreviousConstraint(this);
    var shouldMeasure = this._DirtyFlags & _Dirty.Measure > 0;
    shouldMeasure |= (!last || last.Width != availableSize.Width || last.Height != availableSize.Height);

    if (this.GetVisibility() != Visibility.Visible) {
        LayoutInformation.SetPreviousConstraint(this, availableSize);
        this._DesiredSize = new Size(0, 0);
        return;
    }

    this._ApplyTemplateWithError(error);

    var parent = this.GetVisualParent();

    if (!shouldMeasure)
        return;

    LayoutInformation.SetPreviousConstraint(this, availableSize);

    this._InvalidateArrange();
    this._UpdateBounds();

    var margin = this.GetMargin();
    var size = availableSize.GrowByThickness(margin.Negate());

    size = this._ApplySizeConstraints(size);

    if (this.MeasureOverride)
        size = this.MeasureOverride(size);
    else
        size = this._MeasureOverrideWithEror(size, error);

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Measure;
    this._HiddenDesire = size;

    if (!parent || !parent.IsCanvas) {
        if (this._IsCanvas || !this.IsLayoutContainer()) {
            this._DesiredSize = new Size(0, 0);
            return;
        }
    }

    size = this._ApplySizeConstraints(size);

    size = size.GrowByThickness(margin);
    size = size.Min(availableSize);

    if (this.GetUseLayoutRounding()) {
        size.Width = Math.round(size.Width);
        size.Height = Math.round(size.Height);
    }

    this._DesiredSize = size;
};
FrameworkElement.prototype._MeasureOverrideWithEror = function (availableSize, error) {
    var desired = new Size(0, 0);
    availableSize = availableSize.Max(desired);

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        child._MeasureWithError(availableSize, error);
        desired = child._DesiredSize;
    }

    return desired.Min(availableSize);
};
FrameworkElement.prototype._ArrangeWithError = function (finalRect, error) {
    if (error.IsErrored())
        return;

    var slot = this.ReadLocalValue(LayoutInformation.LayoutSlotProperty);

    var shouldArrange = this._DirtyFlags & _Dirty.Arrange > 0;

    if (this.GetUseLayoutRounding()) {
        finalRect = new Rect(Math.round(finalRect.X), Math.round(finalRect.Y), Math.round(finalRect.Width), Math.round(finalRect.Height));
    }

    shouldArrange = shouldArrange | (slot ? !slot.Equals(finalRect) : true);

    if (finalRect.Width < 0 || finalRect.Height < 0
            || !isFinite(finalRect.Width) || !isFinite(finalRect.Height)
            || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
        var desired = this._DesiredSize;
        //Warn: Invalid arguments
        return;
    }

    var parent = this.GetVisualParent();

    if (this.GetVisibility() != Visibility.Visible) {
        LayoutInformation.SetLayoutSlot(this, finalRect);
        return;
    }

    if (!shouldArrange)
        return;

    var measure = LayoutInformation.GetPreviousConstraint(this);
    if (this.IsContainer() && !measure)
        this._MeasureWithError(new Size(finalRect.Width, finalRect.Height), error);
    measure = LayoutInformation.GetPreviousConstraint(this);

    this.ClearValue(LayoutInformation.LayoutClipProperty);

    var margin = this.GetMargin();
    var childRect = finalRect.GrowBy(margin.Negate());

    this._UpdateTransform();
    this._UpdateProjection();
    this._UpdateBounds();

    var offer = this._HiddenDesire;

    var stretched = this._ApplySizeConstraints(new Size(childRect.Width, childRect.Height));
    var framework = this._ApplySizeConstraints(new Size());

    var horiz = this.GetHorizontalAlignment();
    var vert = this.GetVerticalAlignment();

    if (horiz == HorizontalAlignment.Stretch)
        framework.Width = Math.max(framework.Width, stretched.Width);

    if (vert == VerticalAlignment.Stretch)
        framework.Height = Math.max(framework.Height, stretched.Height);

    offer = offer.Max(framework);

    LayoutInformation.SetLayoutSlot(this, finalRect);

    if (this.ArrangeOverride)
        response = this.ArrangeOverride(this, offer, error);
    else
        response = this._ArrangeOverrideWithError(offer, error);

    /*
    LAYOUT TRANSFORM NOT IMPLEMENTED YET
    FLOW DIRECTION NOT IMPLEMENTED YET

    var flipHoriz = false;
    if (parent)
    flipHoriz = parent.GetFlowDirection() != this.GetFlowDirection();
    else if (this.GetParent() && this.GetParent()._IsPopup())
    flipHoriz = this.GetParent().GetFlowDirection() != this.GetFlowDirection();
    else
    flipHoriz = this.GetFlowDirection() == FlowDirection.RightToLeft;

    var layoutXform = Matrix.BuildIdentity();
    layoutXform = layoutXform.Translate(childRect.X, childRect.Y);
    if (flipHoriz)  {
    layoutXform = layoutXform.Translate(offer.Width, 0);
    layoutXform = layoutXform.Scale(-1, 1);
    }
    */

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Arrange;
    var visualOffset = new Point(childRect.X, childRect.Y);
    LayoutInformation.SetVisualOffset(this, visualOffset);

    var oldSize = this._RenderSize;

    if (this.GetUseLayoutRounding()) {
        response.Width = Math.round(response.Width);
        response.Height = Math.round(response.Height);
    }

    this._RenderSize = response;
    var constrainedResponse = response.Min(this._ApplySizeConstraints(response));

    if (!parent || parent._IsCanvas()) {
        if (!this.IsLayoutContainer()) {
            this._RenderSize = new Size(0, 0);
            return;
        }
    }

    var isTopLevel = this._IsAttached && App.Instance.MainSurface._IsTopLevel(this);

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
            case VerticalAlignment.Center:
                visualOffset.Y += childRect.Height - constrainedResponse.Height;
                break;
            case VerticalAlignment.Bottom:
                visualOffset.Y += (childRect.Height - constrainedResponse.Height) * 0.5;
                break;
            default:
                visualOffset.Y += Math.max((childRect.Height - constrainedResponse.Height) * 0.5, 0);
                break;
        }
    }

    if (this.GetUseLayoutRounding()) {
        visualOffset.X = Math.round(visualOffset.X);
        visualOffset.Y = Math.round(visualOffset.Y);
    }

    /* 
    LAYOUT TRANSFORM NOT IMPLEMENTED YET
    layoutXform = new Matrix();
    layoutXform = layoutXform.Translate(visualOffset.X, visualOffset.Y);
    if (flipHoriz) {
    layoutXform = layoutXform.Translate(response.Width, 0);
    layoutXform = layoutXform.Scale(-1, 1);
    }
    */

    LayoutInformation.SetVisualOffset(this, visualOffset);

    var element = new Rect(0, 0, response.Width, response.Height);
    var layoutClip = childRect;
    layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
    layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
    if (this.GetUseLayoutRounding()) {
        layoutClip.X = Math.round(layoutClip.X);
        layoutClip.Y = Math.round(layoutClip.Y);
    }

    if (((!isTopLevel && element.NotEquals(element.Intersection(layoutClip))) || constrainedResponse.NotEquals(response)) && !this._IsCanvas() && ((parent && !parent._IsCanvas()) || this.IsContainer())) {
        var frameworkClip = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
        layoutClip = layoutClip.Intersection(new Rect(0, 0, frameworkClip.Width, frameworkClip.Height));
        var rectangle = new RectangleGeometry();
        rectangle.SetRect(layoutClip);
        LayoutInformation.SetLayoutClip(this, rectangle);
    }

    if (oldSize.NotEquals(response)) {
        if (!LayoutInformation.GetLastRenderSize(this)) {
            LayoutInformation.SetLastRenderSize(this, oldSize);
            this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
        }
    }
};
FrameworkElement.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var arranged = finalSize;

    var walker = new _VisualTreeWalker(this);
    var child;
    while (child = walker.Step()) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        child._ArrangeWithError(childRect, error);
        arranged = arranged.Max(finalSize);
    }

    return arranged;
};
FrameworkElement.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== FrameworkElement) {
        UIElement.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == FrameworkElement.WidthProperty
        || args.Property == FrameworkElement.MaxWidthProperty
        || args.Property == FrameworkElement.MinWidthProperty
        || args.Property == FrameworkElement.HeightProperty
        || args.Property == FrameworkElement.MaxHeightProperty
        || args.Property == FrameworkElement.MinHeightProperty
        || args.Property == FrameworkElement.MarginProperty
        || args.Property == FrameworkElement.FlowDirectionProperty) {
        //var p = this._GetRenderTransformOrigin();
        //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
        this._FullInvalidate(false);

        var visualParent = this.GetVisualParent();
        if (visualParent)
            visualParent._InvalidateMeasure();

        this._InvalidateMeasure();
        this._InvalidateArrange();
        this._UpdateBounds();
    } else if (args.Property == FrameworkElement.StyleProperty) {
        var newStyle = args.NewValue;
        if (!error.IsErrored())
            this._Providers[_PropertyPrecedence.LocalStyle]._UpdateStyle(newStyle, error);
        if (error.IsErrored())
            return;
    } else if (args.Property == FrameworkElement.HorizontalAlignmentProperty
        || args.Property == FrameworkElement.VerticalAlignmentProperty) {
        this._InvalidateArrange();
        this._FullInvalidate(true);
    }
    this.PropertyChanged.Raise(this, args);
};
FrameworkElement.prototype._InsideObject = function (x, y) {
    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    var nx = x;
    var ny = y;

    //this._TransformPoint(nx, ny);
    //if (nx < 0 || ny < 0 || nx > framework.Width || ny > framework.Height)
    //    return false;

    if (!this._InsideLayoutClip(x, y))
        return false;

    return UIElement.prototype._InsideObject.call(this, x, y);
};
FrameworkElement.prototype._InsideLayoutClip = function (x, y) {
    NotImplemented("FrameworkElement._InsideLayoutClip(x, y)");
};
FrameworkElement.prototype._HasLayoutClip = function () {
    var element = this;
    while (element) {
        if (LayoutInformation.GetLayoutClip(element))
            return true;
        if (element instanceof Canvas || element instanceof UserControl)
            break;
        element = element.GetVisualParent();
    }
    return false;
};
FrameworkElement.prototype._RenderLayoutClip = function (ctx) {
    var element = this;

    ctx.Save();
    while (element) {
        var geom = LayoutInformation.GetLayoutClip(element);
        if (geom)
            ctx.Clip(geom);

        if (element instanceof Canvas || element instanceof UserControl)
            break;
        var visualOffset = LayoutInformation.GetVisualOffset(element);
        if (visualOffset)
            ctx.Transform(new TranslationMatrix(-visualOffset.X, -visualOffset.Y));

        element = element.GetVisualParent();
    }
    ctx.Restore();
};
FrameworkElement.prototype._ElementRemoved = function (value) {
    UIElement.prototype._ElementRemoved.call(this, value);
    if (this._GetSubtreeObject() == value)
        this._SetSubtreeObject(null);
};
FrameworkElement.prototype._UpdateLayer = function (pass, error) {
    var element = this;
    var parent;
    while (parent = element.GetVisualParent())
        element = parent;

    while (pass._Count < LayoutPass.MaxCount) {
        var node;
        while (node = pass._ArrangeList.First()) {
            node.UIElement._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
            pass._ArrangeList.Remove(node);
        }
        while (node = pass._SizeList.First()) {
            node.UIElement._PropagateFlagUp(UIElementFlags.DirtySizeHint);
            pass._SizeList.Remove(node);
        }
        pass._Count = pass._Count + 1;

        var flag = UIElementFlags.None;
        if (element.GetVisibility() == Visibility.Visible) {
            if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                flag = UIElementFlags.DirtyMeasureHint;
            else if (element._HasFlag(UIElementFlags.DirtyArrangeHint))
                flag = UIElementFlags.DirtyArrangeHint;
            else if (element._HasFlag(UIElementFlags.DirtySizeHint))
                flag = UIElementFlags.DirtySizeHint;
        }

        if (flag != UIElementFlags.None) {
            var measureWalker = new _DeepTreeWalker(element);
            var child;
            while (child = measureWalker.Step()) {
                if (child.GetVisibility() != Visibility.Visible || !child._HasFlag(flag)) {
                    measureWalker.SkipBranch();
                    continue;
                }
                child._ClearFlag(flag);
                switch (flag) {
                    case UIElementFlags.DirtyMeasureHint:
                        if (child._DirtyFlags & _Dirty.Measure)
                            pass._MeasureList.Append(new UIElementNode(child));
                        break;
                    case UIElementFlags.DirtyArrangeHint:
                        if (child._DirtyFlags & _Dirty.Arrange)
                            pass._ArrangeList.Append(new UIElementNode(child));
                        break;
                    case UIElementFlags.DirtySizeHint:
                        if (child.ReadLocalValue(LayoutInformation.LastRenderSizeProperty))
                            pass._SizeList.Append(new UIElementNode(child));
                        break;
                    default:
                        break;
                }
            }
        }

        if (flag == UIElementFlags.DirtyMeasureHint) {
            while (node = pass._MeasureList.First()) {
                pass._MeasureList.Remove(node);
                node.UIElement._DoMeasureWithError(error);
                pass._Updated = true;
            }
        } else if (flag == UIElementFlags.DirtyArrangeHint) {
            while (node = pass._ArrangeList.First()) {
                pass._ArrangeList.Remove(node);
                node.UIElement._DoArrangeWithError(error);
                pass._Updated = true;
                if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                    break;
            }
        } else if (flag == UIElementFlags.DirtySizeHint) {
            while (node = pass._SizeList.First()) {
                pass._SizeList.Remove(node);
                var fe = node.UIElement;
                pass._Updated = true;
                var last = LayoutInformation.GetLastRenderSize(fe);
                if (last) {
                    fe.ClearValue(LayoutInformation.LastRenderSizeProperty, false);
                    //TODO: SizeChanged Event 
                }
            }
        } else {
            break;
        }
    }
};
FrameworkElement.prototype._ApplyTemplateWithError = function (error) {
    if (this._GetSubtreeObject())
        return false;

    var result = this._DoApplyTemplateWithError(error);
    if (result)
        this._OnApplyTemplate();
    return result;
};
FrameworkElement.prototype._DoApplyTemplateWithError = function (error) {
    var d = this._GetDefaultTemplate();
    if (d) {
        d._AddParent(this, error);
        if (error.IsErrored())
            return false;
        this._SetSubtreeObject(d);
        this._ElementAdded(d);
    }
    return d != null;
};
FrameworkElement.prototype._GetDefaultTemplate = function () {
    if (this._GetDefaultTemplateCallback)
        return this._GetDefaultTemplateCallback(this);
    return null;
};

FrameworkElement.prototype.TemplatedApplied = new MulticastEvent();
FrameworkElement.prototype._OnApplyTemplate = function () {
    this.TemplatedApplied.Raise(this, null);
};



_FrameworkElementProvider.prototype = new _PropertyValueProvider;
_FrameworkElementProvider.prototype.constructor = _FrameworkElementProvider;
function _FrameworkElementProvider(obj, propPrecedence) {
    _PropertyValueProvider.call(this, obj, propPrecedence, 0);
    this._ActualHeight = null;
    this._ActualWidth = null;
    this._Last = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
_FrameworkElementProvider.prototype.GetPropertyValue = function (propd) {
    if (propd != FrameworkElement.ActualHeightProperty && propd != FrameworkElement.ActualWidthProperty)
        return undefined;

    var actual = this._Object._ComputeActualSize();
    if (!this._Last.Equals(actual)) {
        this._Last = actual;
        this._ActualHeight = actual.Height;
        this._ActualWidth = actual.Width;
    }

    if (propd == FrameworkElement.ActualHeightProperty) {
        return this._ActualHeight;
    } else {
        return this._ActualWidth;
    }
};
