/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="UIElement.js" />

FrameworkElement.DataContextProperty = DependencyProperty.Register("DataContext", FrameworkElement);

FrameworkElement.prototype = new UIElement();
FrameworkElement.prototype.constructor = FrameworkElement;
function FrameworkElement() {
    UIElement.call(this);
}
FrameworkElement.prototype.GetActualWidth = function () {
    return this.ActualWidth;
};
FrameworkElement.prototype.SetActualWidth = function (value) {
    this.ActualWidth = value;
};
FrameworkElement.prototype.GetActualHeight = function () {
    return this.ActualHeight;
};
FrameworkElement.prototype.SetActualHeight = function (value) {
    this.ActualHeight = value;
};
FrameworkElement.prototype.GetWidth = function () {
    return this.Width;
};
FrameworkElement.prototype.SetWidth = function (value) {
    this.Width = value;
};
FrameworkElement.prototype.GetHeight = function () {
    return this.Height;
};
FrameworkElement.prototype.SetHeight = function (value) {
    this.Height = value;
};
FrameworkElement.prototype.GetMinWidth = function () {
    return this.MinWidth;
};
FrameworkElement.prototype.SetMinWidth = function (value) {
    this.MinWidth = value;
};
FrameworkElement.prototype.GetMinHeight = function () {
    return this.MinHeight;
};
FrameworkElement.prototype.SetMinHeight = function (value) {
    this.MinHeight = value;
};
FrameworkElement.prototype.GetMaxWidth = function () {
    return this.MaxWidth;
};
FrameworkElement.prototype.SetMaxWidth = function (value) {
    this.MaxWidth = value;
};
FrameworkElement.prototype.GetMaxHeight = function () {
    return this.MaxHeight;
};
FrameworkElement.prototype.SetMaxHeight = function (value) {
    this.MaxHeight = value;
};
FrameworkElement.prototype.GetMargin = function () {
    return this.Margin; //Thickness
};
FrameworkElement.prototype.SetMargin = function (value) {
    this.Margin = value;
};
FrameworkElement.prototype.GetVisibility = function () {
    return this.Visibility; //Visibility
};
FrameworkElement.prototype.SetVisibility = function (value) {
    this.Visibility = value;
};
FrameworkElement.prototype.GetHorizontalAlignment = function () {
    return this.HorizontalAlignment;
};
FrameworkElement.prototype.SetHorizontalAlignment = function (value) {
    this.HorizontalAlignment = value;
};
FrameworkElement.prototype.GetVerticalAlignment = function () {
    return this.VerticalAlignment;
};
FrameworkElement.prototype.SetVerticalAlignment = function (value) {
    this.VerticalAlignment = value;
};
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
FrameworkElement.prototype._ApplyTemplateWithError = function (error) {
    NotImplemented();
};
FrameworkElement.prototype._GetSubtreeExtents = function () {
    if (!this.GetSubtreeObject())
        return this._ExtentsWithChildren;
    return this._ExtentsWithChildren;
};
FrameworkElement.prototype._UpdateBounds = function () {
    NotImplemented();
};
FrameworkElement.prototype._ComputeBounds = function () {
    var size = new Size(this.GetActualWidth(), this.GetActualHeight());
    size = this._ApplySizeConstraints(size);

    this._Extents = new Rect(0, 0, size.Width, size.Height);
    this._ExtentsWithChildren = this._Extents;

    var walker = this._GetVisualTreeWalker();
    var item = walker.Step();
    while (item) {
        if (item._GetRenderVisible())
            this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
        item = walker.Step();
    }

    this._Bounds = IntersectBoundsWithClipPath(this._Extents.GrowByThickness(this._EffectPadding), false).Transform(this._AbsoluteXform);
    this._BoundsWithChildren = this._ExtentsWithChildren.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteXform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
FrameworkElement.prototype._MeasureWithError = function (availableSize, error) {
    if (error.IsErrored())
        return;

    if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
        error.SetErrored("Cannot call Measure using a size with NaN values");
        return;
    }

    var lastSize = GetPreviousConstraint(this);
    var shouldMeasure = this._DirtyFlags.Measure | (!lastSize || lastSize.Width != availableSize.Width || last.Height != availableSize.Height);

    if (this.GetVisibility() == Visibility.Visible) {
        SetPreviousConstraint(this, availableSize);
        this.SetDesiredSize(new Size(0, 0));
        return;
    }

    this._ApplyTemplateWithError(error);

    var parent = this.GetVisualParent();

    if (!shouldMeasure)
        return;

    SetPreviousConstraint(this, availableSize);

    this.InvalidateArrange();
    this.UpdateBounds();

    var margin = this.GetMargin();
    var size = availableSize.GrowByThickness(margin.Negate());

    size = this._ApplySizeConstraints(size);

    if (this.MeasureOverride)
        size = this.MeasureOverride(size);
    else
        size = this._MeasureOverrideWithEror(size, error);

    if (error.IsErrored())
        return;

    this._DirtyFlags.Measure = false;
    this._HiddenDesire = size;

    if (!parent || !parent.IsCanvas) {
        if (this._IsCanvas || !this.IsLayoutContainer()) {
            this.SetDesiredSize(new Size(0, 0));
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

    this.SetDesiredSize(size);
};
FrameworkElement.prototype._MeasureOverrideWithEror = function (availableSize, error) {
    var desired = new Size(0, 0);
    availableSize = availableSize.Max(desired);

    var walker = this._GetVisualTreeWalker();
    var child = walker.Step();
    while (child) {
        child._MeasureWithError(availableSize, error);
        desired = child.GetDesiredSize();
        child = walker.Step();
    }

    return desired.Min(availableSize);
};
FrameworkElement.prototype._ArrangeWithError = function (finalRect, error) {
    if (error.IsErrored())
        return;

    var slotValue = this.ReadLocalValue(LayoutSlotProperty);
    var slot = lastVal.IsNull() ? null : lastVal.AsRect();

    var shouldArrange = this._DirtyFlags.Arrange;

    if (this.GetUseLayoutRounding()) {
        finalRect = new Rect(Math.round(finalRect.X), Math.round(finalRect.Y), Math.round(finalRect.Width), Math.round(finalRect.Height));
    }

    shouldArrange = shouldArrange | (slot ? slot != finalRect : true); //TODO: "!=" for rect, need to implement operator

    if (finalRect.Width < 0 || finalRect.Height < 0
            || !isFinite(finalRect.Width) || !isFinite(finalRect.Height)
            || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
        var desired = this.GetDesiredSize();
        //Invalid arguments, error?
        return;
    }

    var parent = this.GetVisualParent();

    if (this.GetVisibility() != Visibility.Visible) {
        SetLayoutSlot(this, finalRect);
        return;
    }

    if (!shouldArrange)
        return;

    var measure = GetPreviousConstraint(this);
    if (this.IsContainer() && !measure)
        this._MeasureWithError(new Size(finalRect.Width, finalRect.Height), error);
    measure = GetPreviousConstraint(this);

    this.ClearValue(LayoutClipProperty);

    var margin = this.GetMargin();
    var childRect = finalRect.GrowBy(margin.Negate());

    this.UpdateTransform();
    this.UpdateProjection();
    this.UpdateBounds();

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

    SetLayoutSlot(this, finalRect);

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

    this._DirtyFlags.Arrange = false;
    var visualOffset = new Point(childRect.X, childRect.Y);
    SetVisualOffset(this, visualOffset);

    var oldSize = this._GetRenderSize();

    if (this.GetUseLayoutRounding()) {
        response.Width = Math.round(response.Width);
        response.Height = Math.round(response.Height);
    }

    this._SetRenderSize(response);
    var constrainedResponse = response.Min(this._ApplySizeConstraints(response));

    if (!parent || parent._IsCanvas()) {
        if (!this.IsLayoutContainer()) {
            this._SetRenderSize(new Size(0, 0));
            return;
        }
    }

    var isTopLevel = this._IsAttached && MainSurface.IsTopLevel(this);

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
    layoutXform = Matrix.BuildIdentity();
    layoutXform = layoutXform.Translate(visualOffset.X, visualOffset.Y);
    if (flipHoriz) {
    layoutXform = layoutXform.Translate(response.Width, 0);
    layoutXform = layoutXform.Scale(-1, 1);
    }
    */

    SetVisualOffset(this, visualOffset);

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
        SetLayoutClip(this, rectangle);
    }

    if (oldSize.NotEquals(response)) {
        if (!GetLastRenderSize(this)) {
            SetLastRenderSize(this, oldSize);
            this.SetSizeDirty();
        }
    }
};
FrameworkElement.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    var arranged = finalSize;

    var walker = this._GetVisualTreeWalker();
    var child = walker.Step();
    while (child) {
        var childRect = new Rect(0, 0, finalSize.Width, finalSize.Height);
        child._ArrangeWithError(childRect, error);
        arranged = arranged.Max(finalSize);
        child = walker.Step();
    }

    return arranged;
};
FrameworkElement.prototype._OnPropertyChanged = function (args, error) {
    this._NotifyPropertyChangeListeners(args, error);
};