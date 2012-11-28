/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="UIElement.js"/>
/// <reference path="../Runtime/MulticastEvent.js"/>
/// <reference path="../Primitives/Rect.js"/>
/// <reference path="PropertyValueProviders/StylePropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/ImplicitStylePropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/FrameworkElementPropertyValueProvider.js"/>
/// <reference path="PropertyValueProviders/InheritedDataContextPropertyValueProvider.js"/>
/// CODE
/// <reference path="../Runtime/BError.js"/>
/// <reference path="Style.js"/>
/// <reference path="VisualTreeHelper.js"/>

//#region FrameworkElement
var FrameworkElement = Nullstone.Create("FrameworkElement", UIElement);

FrameworkElement.Instance.Init = function () {
    this.Init$UIElement();

    this._BoundsWithChildren = new Rect();
    this._GlobalBoundsWithChildren = new Rect();
    this._SurfaceBoundsWithChildren = new Rect();
    this._ExtentsWithChildren = new Rect();

    this.AddProvider(new _StylePropertyValueProvider(this, _PropertyPrecedence.LocalStyle));
    this.AddProvider(new _ImplicitStylePropertyValueProvider(this, _PropertyPrecedence.ImplicitStyle));
    this.AddProvider(new FrameworkElementPropertyValueProvider(this, _PropertyPrecedence.DynamicValue));
    this.AddProvider(new _InheritedDataContextPropertyValueProvider(this, _PropertyPrecedence.InheritedDataContext));

    this.SizeChanged = new MulticastEvent();
    this.LayoutUpdated = {
        Subscribe: function (callback, closure) {
            var surface = App.Instance.MainSurface;
            if (surface)
                surface.LayoutUpdated.Subscribe(callback, closure);
        },
        Unsubscribe: function (callback, closure) {
            var surface = App.Instance.MainSurface;
            if (surface)
                surface.LayoutUpdated.Unsubscribe(callback, closure);
        }
    };
};

//#region Properties

FrameworkElement.CursorProperty = DependencyProperty.RegisterFull("Cursor", function () { return new Enum(CursorType); }, FrameworkElement, CursorType.Default); //TODO: AutoCreator: FrameworkElement._CoerceCursor);
FrameworkElement.HeightProperty = DependencyProperty.RegisterCore("Height", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.WidthProperty = DependencyProperty.RegisterCore("Width", function () { return Number; }, FrameworkElement, NaN);
FrameworkElement.ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () { return Number; }, FrameworkElement);
FrameworkElement.ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () { return Number; }, FrameworkElement);
FrameworkElement.DataContextProperty = DependencyProperty.RegisterCore("DataContext", function () { return Object; }, FrameworkElement);
FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.RegisterCore("HorizontalAlignment", function () { return new Enum(HorizontalAlignment); }, FrameworkElement, HorizontalAlignment.Stretch);
FrameworkElement.LanguageProperty = DependencyProperty.RegisterCore("Language", function () { return String; }, FrameworkElement);
FrameworkElement.MarginProperty = DependencyProperty.RegisterCore("Margin", function () { return Thickness; }, FrameworkElement, new Thickness());
FrameworkElement.MaxHeightProperty = DependencyProperty.RegisterCore("MaxHeight", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.MaxWidthProperty = DependencyProperty.RegisterCore("MaxWidth", function () { return Number; }, FrameworkElement, Number.POSITIVE_INFINITY);
FrameworkElement.MinHeightProperty = DependencyProperty.RegisterCore("MinHeight", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.MinWidthProperty = DependencyProperty.RegisterCore("MinWidth", function () { return Number; }, FrameworkElement, 0.0);
FrameworkElement.VerticalAlignmentProperty = DependencyProperty.RegisterCore("VerticalAlignment", function () { return new Enum(VerticalAlignment); }, FrameworkElement, VerticalAlignment.Stretch);
FrameworkElement.StyleProperty = DependencyProperty.RegisterCore("Style", function () { return Style; }, FrameworkElement);
FrameworkElement.FlowDirectionProperty = DependencyProperty.RegisterInheritable("FlowDirection", function () { return new Enum(FlowDirection); }, FrameworkElement, FlowDirection.LeftToRight, undefined, undefined, _Inheritable.FlowDirection);

Nullstone.AutoProperties(FrameworkElement, [
    FrameworkElement.CursorProperty,
    FrameworkElement.WidthProperty,
    FrameworkElement.HeightProperty,
    FrameworkElement.DataContextProperty,
    FrameworkElement.HorizontalAlignmentProperty,
    FrameworkElement.LanguageProperty,
    FrameworkElement.MarginProperty,
    FrameworkElement.MaxWidthProperty,
    FrameworkElement.MaxHeightProperty,
    FrameworkElement.MinWidthProperty,
    FrameworkElement.MinHeightProperty,
    FrameworkElement.VerticalAlignmentProperty,
    FrameworkElement.StyleProperty,
    FrameworkElement.FlowDirectionProperty
]);

Nullstone.AutoPropertiesReadOnly(FrameworkElement, [
    FrameworkElement.ActualWidthProperty,
    FrameworkElement.ActualHeightProperty
]);

Nullstone.Property(FrameworkElement, "Parent", {
    get: function () {
        return this._LogicalParent;
    }
});

//#endregion

//#region Instance Methods

FrameworkElement.Instance.SetTemplateBinding = function (propd, tb) {
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="tb" type="TemplateBindingExpression"></param>
    try {
        this.$SetValue(propd, tb);
    } catch (err) {
    }
};
FrameworkElement.Instance.SetBinding = function (propd, binding) {
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="binding" type="Binding"></param>
    /// <returns type="BindingExpressionBase" />
    return BindingOperations.SetBinding(this, propd, binding);
};

FrameworkElement.Instance._GetTransformOrigin = function () {
    var userXformOrigin = this.RenderTransformOrigin;
    var width = this.ActualWidth;
    var height = this.ActualHeight;
    return new Point(width * userXformOrigin.X, height * userXformOrigin.Y);
};

//#region Actual Size

FrameworkElement.Instance._GetSizeForBrush = function () {
    return {
        Width: this.ActualWidth,
        Height: this.ActualHeight
    };
};

FrameworkElement.Instance._PurgeSizeCache = function () {
    delete this._CachedValues[FrameworkElement.ActualWidthProperty];
    delete this._CachedValues[FrameworkElement.ActualHeightProperty];
};
FrameworkElement.Instance._ComputeActualSize = function () {
    if (this.Visibility !== Visibility.Visible)
        return new Size(0.0, 0.0);

    var parent = this.GetVisualParent();
    if ((parent && !(parent instanceof Canvas)) || this.IsLayoutContainer())
        return this._RenderSize;

    var actual = new Size(0, 0);
    actual = this._ApplySizeConstraints(actual);
    return actual;
};

FrameworkElement.Instance._ApplySizeConstraints = function (size) {
    var specified = new Size(this.Width, this.Height);
    var constrained = new Size(this.MinWidth, this.MinHeight);

    constrained = constrained.Max(size);

    if (!isNaN(specified.Width))
        constrained.Width = specified.Width;

    if (!isNaN(specified.Height))
        constrained.Height = specified.Height;

    constrained = constrained.Min(new Size(this.MaxWidth, this.MaxHeight));
    constrained = constrained.Max(new Size(this.MinWidth, this.MinHeight));

    if (this.UseLayoutRounding) {
        constrained.Width = Math.round(constrained.Width);
        constrained.Height = Math.round(constrained.Height);
    }

    return constrained;
};

//#endregion

//#region Bounds

FrameworkElement.Instance._GetSubtreeExtents = function () {
    if (this._SubtreeObject)
        return this._ExtentsWithChildren;
    return this._Extents;
};

//#region Bounds

FrameworkElement.Instance._ComputeBounds = function () {
    var size = new Size(this.ActualWidth, this.ActualHeight);
    size = this._ApplySizeConstraints(size);

    this._Extents = new Rect(0, 0, size.Width, size.Height);
    this._ExtentsWithChildren = this._Extents;

    var walker = new _VisualTreeWalker(this);
    var item;
    while (item = walker.Step()) {
        if (item._GetRenderVisible())
            this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
    }

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents.GrowByThickness(this._EffectPadding), false).Transform(this._AbsoluteXform);
    this._BoundsWithChildren = this._ExtentsWithChildren.GrowByThickness(this._EffectPadding).Transform(this._AbsoluteXform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};

//#endregion

//#region Global Bounds

FrameworkElement.Instance._ComputeGlobalBounds = function () {
    this._ComputeGlobalBounds$UIElement();
    this._GlobalBoundsWithChildren = this._ExtentsWithChildren.GrowByThickness(this._EffectPadding).Transform4(this._LocalProjection);
};
FrameworkElement.Instance._GetGlobalBounds = function () {
    if (this._SubtreeObject)
        return this._GlobalBoundsWithChildren;
    return this._GlobalBounds;
};

//#endregion

//#region Surface Bounds

FrameworkElement.Instance._ComputeSurfaceBounds = function () {
    this._ComputeSurfaceBounds$UIElement();
    this._SurfaceBoundsWithChildren = this._ExtentsWithChildren.GrowByThickness(this._EffectPadding).Transform4(this._AbsoluteProjection);
};
FrameworkElement.Instance._GetSubtreeBounds = function () {
    if (this._SubtreeObject)
        return this._SurfaceBoundsWithChildren;
    return this._SurfaceBounds;
};

//#endregion

//#endregion

//#region Measure

FrameworkElement.Instance.Measure = function (availableSize) {
    var error = new BError();
    this._MeasureWithError(availableSize, error);
    if (error.IsErrored())
        throw error.CreateException();
};
FrameworkElement.Instance._MeasureWithError = function (availableSize, error) {
    if (error.IsErrored())
        return;

    if (isNaN(availableSize.Width) || isNaN(availableSize.Height)) {
        error.SetErrored("Cannot call Measure using a size with NaN values");
        //LayoutInformation.SetLayoutExceptionElement(this);
        return;
    }

    var last = LayoutInformation.GetPreviousConstraint(this);
    var shouldMeasure = (this._DirtyFlags & _Dirty.Measure) > 0;
    shouldMeasure = shouldMeasure || (!last || last.Width !== availableSize.Width || last.Height !== availableSize.Height);

    if (this.Visibility !== Visibility.Visible) {
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

    var margin = this.Margin;
    var size = availableSize.ShrinkByThickness(margin);

    size = this._ApplySizeConstraints(size);

    if (this.MeasureOverride)
        size = this.MeasureOverride(size);
    else
        size = this._MeasureOverrideWithError(size, error);

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Measure;
    this._HiddenDesire = size;

    if (!parent || parent instanceof Canvas) {
        if (this instanceof Canvas || !this.IsLayoutContainer()) {
            this._DesiredSize = new Size(0, 0);
            return;
        }
    }

    size = this._ApplySizeConstraints(size);

    size = size.GrowByThickness(margin);
    size = size.Min(availableSize);

    if (this.UseLayoutRounding) {
        size.Width = Math.round(size.Width);
        size.Height = Math.round(size.Height);
    }

    this._DesiredSize = size;
};
FrameworkElement.Instance._MeasureOverrideWithError = function (availableSize, error) {
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

//#endregion

//#region Arrange

FrameworkElement.Instance.Arrange = function (finalRect) {
    var error = new BError();
    this._ArrangeWithError(finalRect, error);
    if (error.IsErrored())
        throw error.CreateException();
};
FrameworkElement.Instance._ArrangeWithError = function (finalRect, error) {
    if (error.IsErrored())
        return;

    var slot = this._ReadLocalValue(LayoutInformation.LayoutSlotProperty);
    if (slot === null)
        slot = undefined;

    var shouldArrange = (this._DirtyFlags & _Dirty.Arrange) > 0;

    if (this.UseLayoutRounding) {
        finalRect = new Rect(Math.round(finalRect.X), Math.round(finalRect.Y), Math.round(finalRect.Width), Math.round(finalRect.Height));
    }

    shouldArrange |= slot ? !Rect.Equals(slot, finalRect) : true;

    if (finalRect.Width < 0 || finalRect.Height < 0
            || !isFinite(finalRect.Width) || !isFinite(finalRect.Height)
            || isNaN(finalRect.Width) || isNaN(finalRect.Height)) {
        var desired = this._DesiredSize;
        Warn("Invalid arguments to Arrange. Desired = " + desired.toString());
        return;
    }

    var parent = this.GetVisualParent();

    if (this.Visibility !== Visibility.Visible) {
        LayoutInformation.SetLayoutSlot(this, finalRect);
        return;
    }

    if (!shouldArrange)
        return;

    var measure = LayoutInformation.GetPreviousConstraint(this);
    if (this.IsContainer() && !measure)
        this._MeasureWithError(new Size(finalRect.Width, finalRect.Height), error);
    measure = LayoutInformation.GetPreviousConstraint(this);

    this._ClearValue(LayoutInformation.LayoutClipProperty);

    var margin = this.Margin;
    var childRect = finalRect.ShrinkByThickness(margin);

    this._UpdateTransform();
    this._UpdateProjection();
    this._UpdateBounds();

    var offer = this._HiddenDesire;

    var stretched = this._ApplySizeConstraints(new Size(childRect.Width, childRect.Height));
    var framework = this._ApplySizeConstraints(new Size());

    var horiz = this.HorizontalAlignment;
    var vert = this.VerticalAlignment;

    if (horiz === HorizontalAlignment.Stretch)
        framework.Width = Math.max(framework.Width, stretched.Width);

    if (vert === VerticalAlignment.Stretch)
        framework.Height = Math.max(framework.Height, stretched.Height);

    offer = offer.Max(framework);

    LayoutInformation.SetLayoutSlot(this, finalRect);

    var response;
    if (this.ArrangeOverride)
        response = this.ArrangeOverride(offer);
    else
        response = this._ArrangeOverrideWithError(offer, error);

    if (horiz === HorizontalAlignment.Stretch)
        response.Width = Math.max(response.Width, framework.Width);

    if (vert === VerticalAlignment.Stretch)
        response.Height = Math.max(response.Height, framework.Height);

    var flipHoriz = false;
    if (parent)
        flipHoriz = parent.FlowDirection !== this.FlowDirection;
    else if (this._Parent instanceof Popup)
        flipHoriz = this._Parent.FlowDirection !== this.FlowDirection;
    else
        flipHoriz = this.FlowDirection === FlowDirection.RightToLeft;

    var layoutXform = mat3.identity();
    mat3.translate(layoutXform, childRect.X, childRect.Y);
    if (flipHoriz) {
        mat3.translate(layoutXform, offer.Width, 0);
        mat3.scale(layoutXform, -1, 1);
    }
    this._LayoutXform = layoutXform;

    if (error.IsErrored())
        return;

    this._DirtyFlags &= ~_Dirty.Arrange;
    var visualOffset = new Point(childRect.X, childRect.Y);
    LayoutInformation.SetVisualOffset(this, visualOffset);

    var oldSize = this._RenderSize;

    if (this.UseLayoutRounding) {
        response.Width = Math.round(response.Width);
        response.Height = Math.round(response.Height);
    }

    this._RenderSize = response;
    var constrainedResponse = response.Min(this._ApplySizeConstraints(response));

    if (!parent || parent instanceof Canvas) {
        if (!this.IsLayoutContainer()) {
            this._RenderSize = new Size(0, 0);
            return;
        }
    }

    var surface = App.Instance.MainSurface;
    var isTopLevel = this._IsAttached && surface._IsTopLevel(this);
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

    if (this.UseLayoutRounding) {
        visualOffset.X = Math.round(visualOffset.X);
        visualOffset.Y = Math.round(visualOffset.Y);
    }

    layoutXform = mat3.identity();
    mat3.translate(layoutXform, visualOffset.X, visualOffset.Y);
    if (flipHoriz) {
        mat3.translate(layoutXform, response.Width, 0);
        mat3.scale(layoutXform, -1, 1);
    }
    this._LayoutXform = layoutXform;

    LayoutInformation.SetVisualOffset(this, visualOffset);

    var element = new Rect(0, 0, response.Width, response.Height);
    var layoutClip = childRect;
    layoutClip.X = Math.max(childRect.X - visualOffset.X, 0);
    layoutClip.Y = Math.max(childRect.Y - visualOffset.Y, 0);
    if (this.UseLayoutRounding) {
        layoutClip.X = Math.round(layoutClip.X);
        layoutClip.Y = Math.round(layoutClip.Y);
    }

    if (((!isTopLevel && !Rect.Equals(element, element.Intersection(layoutClip))) || !Rect.Equals(constrainedResponse, response)) && !(this instanceof Canvas) && ((parent && !(parent instanceof Canvas)) || this.IsContainer())) {
        var frameworkClip = this._ApplySizeConstraints(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
        layoutClip = layoutClip.Intersection(new Rect(0, 0, frameworkClip.Width, frameworkClip.Height));
        var rectangle = new RectangleGeometry();
        rectangle.Rect = layoutClip;
        LayoutInformation.SetLayoutClip(this, rectangle);
    }

    if (!Rect.Equals(oldSize, response)) {
        if (!LayoutInformation.GetLastRenderSize(this)) {
            LayoutInformation.SetLastRenderSize(this, oldSize);
            this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
        }
    }
};
FrameworkElement.Instance._ArrangeOverrideWithError = function (finalSize, error) {
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

//#endregion

//#region Hit Testing

FrameworkElement.Instance._HitTestPoint = function (ctx, p, uielist) {
    if (!this._GetRenderVisible())
        return;
    if (!this._GetIsHitTestVisible())
        return;

    if (!this._InsideClip(ctx, p.X, p.Y))
        return;

    var node = uielist.Prepend(new UIElementNode(this));
    var hit = false;
    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.ZReverse, false);
    var child;
    while (child = walker.Step()) {
        child._HitTestPoint(ctx, p, uielist);
        if (!Nullstone.RefEquals(node, uielist.Head)) {
            hit = true;
            break;
        }
    }

    if (!hit && !(this._CanFindElement() && this._InsideObject(ctx, p.X, p.Y)))
        uielist.Remove(node);
};
FrameworkElement.Instance._InsideObject = function (ctx, x, y) {
    var np = new Point(x, y);
    this._TransformPoint(np);
    if (np.X < 0 || np.Y < 0 || np.X > this.ActualWidth || np.Y > this.ActualHeight)
        return false;

    if (!this._InsideLayoutClip(x, y))
        return false;

    return this._InsideObject$UIElement(ctx, x, y);
};
FrameworkElement.Instance._InsideLayoutClip = function (x, y) {
    //NotImplemented("FrameworkElement._InsideLayoutClip(x, y)");
    return true;
};

//#endregion

FrameworkElement.Instance._HasLayoutClip = function () {
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
FrameworkElement.Instance._RenderLayoutClip = function (ctx) {
    var element = this;
    var iX = 0;
    var iY = 0;

    while (element) {
        var geom = LayoutInformation.GetLayoutClip(element);
        if (geom)
            ctx.Clip(geom);

        if (element instanceof Canvas || element instanceof UserControl)
            break;
        var visualOffset = LayoutInformation.GetVisualOffset(element);
        if (visualOffset) {
            ctx.Translate(-visualOffset.X, -visualOffset.Y);
            iX += visualOffset.X;
            iY += visualOffset.Y;
        }

        element = element.GetVisualParent();
    }
    ctx.Translate(iX, iY);
};

FrameworkElement.Instance._ElementRemoved = function (value) {
    this._ElementRemoved$UIElement(value);
    if (Nullstone.RefEquals(this._SubtreeObject, value))
        this._SubtreeObject = null;
};

FrameworkElement.Instance.UpdateLayout = function () {
    var error = new BError();
    if (this._IsAttached) {
        App.Instance.MainSurface._UpdateLayout(error);
    } else {
        var pass = LayoutPass.Create();
        this._UpdateLayer(pass, error);
        if (pass.Updated)
            App.Instance.MainSurface.LayoutUpdated.Raise(this, new EventArgs());
    }
    if (error.IsErrored())
        throw error.CreateException();
};
FrameworkElement.Instance._UpdateLayer = function (pass, error) {
    var element = this;
    var parent;
    while (parent = element.GetVisualParent())
        element = parent;

    var uie;
    while (pass.Count < LayoutPass.MaxCount) {
        while (uie = pass.ArrangeList.shift()) {
            uie._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
            LayoutDebug("PropagateFlagUp DirtyArrangeHint");
        }
        while (uie = pass.SizeList.shift()) {
            uie._PropagateFlagUp(UIElementFlags.DirtySizeHint);
            LayoutDebug("PropagateFlagUp DirtySizeHint");
        }
        pass.Count = pass.Count + 1;

        var flag = UIElementFlags.None;
        if (element.Visibility === Visibility.Visible) {
            if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                flag = UIElementFlags.DirtyMeasureHint;
            else if (element._HasFlag(UIElementFlags.DirtyArrangeHint))
                flag = UIElementFlags.DirtyArrangeHint;
            else if (element._HasFlag(UIElementFlags.DirtySizeHint))
                flag = UIElementFlags.DirtySizeHint;
        }

        if (flag !== UIElementFlags.None) {
            var measureWalker = new _DeepTreeWalker(element);
            var child;
            while (child = measureWalker.Step()) {
                if (child.Visibility !== Visibility.Visible || !child._HasFlag(flag)) {
                    measureWalker.SkipBranch();
                    continue;
                }
                child._ClearFlag(flag);
                switch (flag) {
                    case UIElementFlags.DirtyMeasureHint:
                        if (child._DirtyFlags & _Dirty.Measure)
                            pass.MeasureList.push(child);
                        break;
                    case UIElementFlags.DirtyArrangeHint:
                        if (child._DirtyFlags & _Dirty.Arrange)
                            pass.ArrangeList.push(child);
                        break;
                    case UIElementFlags.DirtySizeHint:
                        if (child._ReadLocalValue(LayoutInformation.LastRenderSizeProperty) !== undefined)
                            pass.SizeList.push(child);
                        break;
                    default:
                        break;
                }
            }
        }

        if (flag === UIElementFlags.DirtyMeasureHint) {
            LayoutDebug("Starting _MeasureList Update: " + pass.MeasureList.length);
            while (uie = pass.MeasureList.shift()) {
                LayoutDebug("Measure [" + uie.__DebugToString() + "]");
                uie._DoMeasureWithError(error);
                pass.Updated = true;
            }
        } else if (flag === UIElementFlags.DirtyArrangeHint) {
            LayoutDebug("Starting _ArrangeList Update: " + pass.ArrangeList.length);
            while (uie = pass.ArrangeList.shift()) {
                LayoutDebug("Arrange [" + uie.__DebugToString() + "]");
                uie._DoArrangeWithError(error);
                pass.Updated = true;
                if (element._HasFlag(UIElementFlags.DirtyMeasureHint))
                    break;
            }
        } else if (flag === UIElementFlags.DirtySizeHint) {
            while (uie = pass.SizeList.shift()) {
                pass.Updated = true;
                var last = LayoutInformation.GetLastRenderSize(uie);
                if (last) {
                    uie._ClearValue(LayoutInformation.LastRenderSizeProperty, false);
                    uie._PurgeSizeCache();
                    uie.SizeChanged.Raise(uie, new SizeChangedEventArgs(last, uie._RenderSize));
                }
            }
            LayoutDebug("Completed _SizeList Update");
        } else {
            break;
        }
    }
};

//#region Implicit Styles

FrameworkElement.Instance._SetImplicitStyles = function (styleMask, styles) {
    var app = App.Instance;
    if (!app)
        return;

    if (!styles)
        styles = app._GetImplicitStyles(this, styleMask);

    var error = new BError();

    if (styles) {
        for (var i = 0; i < _StyleIndex.Count; i++) {
            var style = styles[i];
            if (!style)
                continue;
            if (!Validators.StyleValidator(this, FrameworkElement.StyleProperty, style, error)) {
                Warn("Style validation failed. [" + error.Message + "]");
                return;
            }
        }
    }

    this._Providers[_PropertyPrecedence.ImplicitStyle].SetStyles(styleMask, styles, error);
};
FrameworkElement.Instance._ClearImplicitStyles = function (styleMask) {
    var error = new BError();
    this._Providers[_PropertyPrecedence.ImplicitStyle].ClearStyles(styleMask, error);
};

//#endregion

//#region Template

FrameworkElement.Instance.OnApplyTemplate = function () { };
FrameworkElement.Instance.ApplyTemplate = function () {
    var error = new BError();
    this._ApplyTemplateWithError(error);
    if (error.IsErrored())
        throw error.CreateException();
};
FrameworkElement.Instance._ApplyTemplateWithError = function (error) {
    if (this._SubtreeObject)
        return false;

    var result = this._DoApplyTemplateWithError(error);
    if (result)
        this.OnApplyTemplate();
    return result;
};
FrameworkElement.Instance._DoApplyTemplateWithError = function (error) {
    var uie = this._GetDefaultTemplate();
    if (uie) {
        uie._AddParent(this, true, error);
        if (error.IsErrored())
            return false;
        this._SubtreeObject = uie;
        this._ElementAdded(uie);
    }
    return uie != null;
};
FrameworkElement.Instance._GetDefaultTemplate = function () {
    if (this._GetDefaultTemplateCallback)
        return this._GetDefaultTemplateCallback();
    return null;
};

//#endregion

//#region Property Changed

FrameworkElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== FrameworkElement) {
        this._OnPropertyChanged$UIElement(args, error);
        return;
    }

    if (args.Property._ID === FrameworkElement.WidthProperty._ID
        || args.Property._ID === FrameworkElement.MaxWidthProperty._ID
        || args.Property._ID === FrameworkElement.MinWidthProperty._ID
        || args.Property._ID === FrameworkElement.HeightProperty._ID
        || args.Property._ID === FrameworkElement.MaxHeightProperty._ID
        || args.Property._ID === FrameworkElement.MinHeightProperty._ID
        || args.Property._ID === FrameworkElement.MarginProperty._ID
        || args.Property._ID === FrameworkElement.FlowDirectionProperty._ID) {
        this._PurgeSizeCache();

        //var p = this._GetRenderTransformOrigin();
        //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
        this._FullInvalidate(false);

        var visualParent = this.GetVisualParent();
        if (visualParent)
            visualParent._InvalidateMeasure();

        this._InvalidateMeasure();
        this._InvalidateArrange();
        this._UpdateBounds();
    } else if (args.Property._ID === FrameworkElement.StyleProperty._ID) {
        var newStyle = args.NewValue;
        if (!error.IsErrored())
            this._Providers[_PropertyPrecedence.LocalStyle]._UpdateStyle(newStyle, error);
        if (error.IsErrored())
            return;
    } else if (args.Property._ID === FrameworkElement.HorizontalAlignmentProperty._ID
        || args.Property._ID === FrameworkElement.VerticalAlignmentProperty._ID) {
        this._InvalidateArrange();
        this._FullInvalidate(true);
    }
    this.PropertyChanged.Raise(this, args);
};

//#endregion

//#region Loaded

FrameworkElement.Instance.InvokeLoaded = function () {
};
FrameworkElement.Instance._OnIsLoadedChanged = function (loaded) {
    if (loaded)
        this._SetImplicitStyles(_StyleMask.All);
    else
        this._ClearImplicitStyles(_StyleMask.VisualTree);

    this._OnIsLoadedChanged$UIElement(loaded);
    if (loaded)
        this.InvokeLoaded();

    if (this._Providers[_PropertyPrecedence.InheritedDataContext])
        this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
};

//#endregion

//#region Parent

FrameworkElement.Instance.SetVisualParent = function (value) {
    /// <param name="value" type="UIElement"></param>
    this.SetVisualParent$UIElement(value);

    if (!this._LogicalParent && (!this._VisualParent || this._VisualParent instanceof FrameworkElement)) {
        this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(this._VisualParent);
        if (this._IsLoaded)
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    }
};
FrameworkElement.Instance._SetLogicalParent = function (value, error) {
    if (Nullstone.RefEquals(this._LogicalParent, value))
        return;

    if (false/* TODO: IsShuttingDown */) {
        this._LogicalParent = null;
        return;
    }

    if (value && this._LogicalParent && !Nullstone.RefEquals(this._LogicalParent, value)) {
        error.SetErrored(BError.InvalidOperation, "Element is a child of another element");
        return;
    }

    var oldParent = this._LogicalParent;
    this._LogicalParent = value;
    this._OnLogicalParentChanged(oldParent, value);
};
FrameworkElement.Instance._GetLogicalParent = function () {
    return this._LogicalParent;
};
FrameworkElement.Instance._OnLogicalParentChanged = function (oldParent, newParent) {
    if (false/* TODO: this._IsDisposing() */) {
    } else {
        var visualParent;
        if (newParent && newParent instanceof FrameworkElement)
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(newParent);
        else if ((visualParent = this.GetVisualParent()) && visualParent instanceof FrameworkElement)
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(visualParent);
        else
            this._Providers[_PropertyPrecedence.InheritedDataContext].SetDataSource(null);
        if (this._IsLoaded)
            this._Providers[_PropertyPrecedence.InheritedDataContext].EmitChanged();
    }
};

//#endregion

//#region Focus

FrameworkElement.Instance._HasFocus = function () {
    for (var doh = Nullstone.As(FocusManager.GetFocusedElement(), DependencyObject); doh != null; doh = VisualTreeHelper.GetParent(doh)) {
        if (Nullstone.RefEquals(doh, this))
            return true;
    }
    return false;
};

//#endregion

FrameworkElement.Instance.ApplyChange = function (change) {
    var propd = change.Property;
    if (propd.OwnerType !== FrameworkElement) {
        this.ApplyChange$UIElement(change);
        return;
    }

    var rootEl = this.GetRootHtmlElement();
    if (propd._ID === FrameworkElement.CursorProperty._ID) {
        rootEl.style.cursor = change.NewValue;
    } else if (propd._ID === FrameworkElement.WidthProperty._ID) {
        rootEl.style.width = change.NewValue;
    } else if (propd._ID === FrameworkElement.HeightProperty._ID) {
        rootEl.style.height = change.NewValue;
    } else if (propd._ID === FrameworkElement.MinWidthProperty._ID) {
    } else if (propd._ID === FrameworkElement.MinHeightProperty._ID) {
    } else if (propd._ID === FrameworkElement.MaxWidthProperty._ID) {
    } else if (propd._ID === FrameworkElement.MaxHeightProperty._ID) {
    }
};

//#endregion

Nullstone.FinishCreate(FrameworkElement);
//#endregion