/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js" />
/// CODE
/// <reference path="../Core/DependencyProperty.js" />
/// <reference path="Canvas.js" />
/// <reference path="../Engine/Dirty.js"/>
/// <reference path="../Engine/App.js"/>
/// <reference path="../Core/Collections/Collection.js"/>
/// <reference path="../Media/Geometry.js"/>
/// <reference path="../Media/Brush.js"/>
/// <reference path="RequestBringIntoViewEventArgs.js"/>
/// <reference path="../Media/MatrixTransform.js"/>
/// <reference path="Enums.js"/>

//#region UIElement
var UIElement = Nullstone.Create("UIElement", DependencyObject);

UIElement.Instance.Init = function () {
    this.Init$DependencyObject();

    this.Unloaded = new MulticastEvent();
    this.Loaded = new MulticastEvent();
    this.Invalidated = new MulticastEvent();

    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);

    this._Flags = UIElementFlags.RenderVisible | UIElementFlags.HitTestVisible;

    this._HiddenDesire = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    this._Bounds = new Rect();
    this._GlobalBounds = new Rect();
    this._SurfaceBounds = new Rect();

    this._DirtyFlags = _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
    this._UpDirtyNode = this._DownDirtyNode = null;
    this._ForceInvalidateOfNewBounds = false;
    this._DirtyRegion = new Rect();
    this._DesiredSize = new Size();
    this._RenderSize = new Size();

    this._ComputeLocalTransform();
    this._ComputeLocalProjection();
    this._ComputeTotalRenderVisibility();
    this._ComputeTotalHitTestVisibility();

    this.MouseMove = new MulticastEvent();
    this.MouseMove.Subscribe(this.OnMouseMove, this);

    this.MouseLeftButtonDown = new MulticastEvent();
    this.MouseLeftButtonDown.Subscribe(this.OnMouseLeftButtonDown, this);

    this.MouseLeftButtonUp = new MulticastEvent();
    this.MouseLeftButtonUp.Subscribe(this.OnMouseLeftButtonUp, this);

    this.MouseRightButtonDown = new MulticastEvent();
    this.MouseRightButtonDown.Subscribe(this.OnMouseRightButtonDown, this);

    this.MouseRightButtonUp = new MulticastEvent();
    this.MouseRightButtonUp.Subscribe(this.OnMouseRightButtonUp, this);

    this.MouseEnter = new MulticastEvent();
    this.MouseEnter.Subscribe(this.OnMouseEnter, this);

    this.MouseLeave = new MulticastEvent();
    this.MouseLeave.Subscribe(this.OnMouseLeave, this);

    this.LostMouseCapture = new MulticastEvent();
    this.LostMouseCapture.Subscribe(this.OnLostMouseCapture, this);

    this.GotFocus = new MulticastEvent();
    this.GotFocus.Subscribe(this.OnGotFocus, this);

    this.LostFocus = new MulticastEvent();
    this.LostFocus.Subscribe(this.OnLostFocus, this);

    this.KeyDown = new MulticastEvent();
    this.KeyDown.Subscribe(this.OnKeyDown, this);

    this.KeyUp = new MulticastEvent();
    this.KeyUp.Subscribe(this.OnKeyUp, this);

    this.RequestBringIntoView = new MulticastEvent();
};

//#region Dependency Properties

UIElement.ClipProperty = DependencyProperty.Register("Clip", function () { return Geometry; }, UIElement);
UIElement.Instance.GetClip = function () {
    return this.$GetValue(UIElement.ClipProperty);
};
UIElement.Instance.SetClip = function (value) {
    this.$SetValue(UIElement.ClipProperty, value);
};

//UIElement.CacheModeProperty;
//UIElement.EffectProperty;
//UIElement.ProjectionProperty;

UIElement.IsHitTestVisibleProperty = DependencyProperty.Register("IsHitTestVisible", function () { return Boolean; }, UIElement, true);
UIElement.Instance.GetIsHitTestVisible = function () {
    return this.$GetValue(UIElement.IsHitTestVisibleProperty);
};
UIElement.Instance.SetIsHitTestVisible = function (value) {
    this.$SetValue(UIElement.IsHitTestVisibleProperty, value);
};

UIElement.OpacityMaskProperty = DependencyProperty.Register("OpacityMask", function () { return Brush; }, UIElement);
UIElement.Instance.GetOpacityMask = function () {
    return this.$GetValue(UIElement.OpacityMaskProperty);
};
UIElement.Instance.SetOpacityMask = function (value) {
    this.$SetValue(UIElement.OpacityMaskProperty, value);
};

UIElement.OpacityProperty = DependencyProperty.Register("Opacity", function () { return Number; }, UIElement, 1.0);
UIElement.Instance.GetOpacity = function () {
    return this.$GetValue(UIElement.OpacityProperty);
};
UIElement.Instance.SetOpacity = function (value) {
    this.$SetValue(UIElement.OpacityProperty, value);
};

//UIElement.RenderTransformOriginProperty;
//UIElement.AllowDropProperty;

UIElement.CursorProperty = DependencyProperty.RegisterFull("Cursor", function () { return new Enum(CursorType); }, UIElement, CursorType.Default, null); //, UIElement._CoerceCursor);
UIElement.Instance.GetCursor = function () {
    return this.$GetValue(UIElement.CursorProperty);
};
UIElement.Instance.SetCursor = function (value) {
    this.$SetValue(UIElement.CursorProperty, value);
};

UIElement.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return ResourceDictionary; }, UIElement, null, { GetValue: function () { return new ResourceDictionary(); } });
UIElement.Instance.GetResources = function () {
    /// <returns type="ResourceDictionary" />
    return this.$GetValue(UIElement.ResourcesProperty);
};

UIElement.TriggersProperty = DependencyProperty.RegisterFull("Triggers", function () { return Object; }, UIElement/*, null, { GetValue: function () { } }*/);
UIElement.Instance.GetTriggers = function () {
    return this.$GetValue(UIElement.TriggersProperty);
};

UIElement.UseLayoutRoundingProperty = DependencyProperty.Register("UseLayoutRounding", function () { return Boolean; }, UIElement);
UIElement.Instance.GetUseLayoutRounding = function () {
    return this.$GetValue(UIElement.UseLayoutRoundingProperty);
};
UIElement.Instance.SetUseLayoutRounding = function (value) {
    this.$SetValue(UIElement.UseLayoutRoundingProperty, value);
};

UIElement.VisibilityProperty = DependencyProperty.Register("Visibility", function () { return new Enum(Visibility); }, UIElement, Visibility.Visible);
UIElement.Instance.GetVisibility = function () {
    return this.$GetValue(UIElement.VisibilityProperty);
};
UIElement.Instance.SetVisibility = function (value) {
    this.$SetValue(UIElement.VisibilityProperty, value);
};

UIElement.TagProperty = DependencyProperty.Register("Tag", function () { return Object; }, UIElement);
UIElement.Instance.GetTag = function () {
    return this.$GetValue(UIElement.TagProperty);
};
UIElement.Instance.SetTag = function (value) {
    this.$SetValue(UIElement.TagProperty, value);
};

//#endregion

UIElement.Instance.BringIntoView = function (rect) {
    if (rect == null) rect = new Rect();
    var args = new RequestBringIntoViewEventArgs(this, rect);

    var cur = this;
    while (cur != null && !args.Handled) {
        cur.RequestBringIntoView.Raise(this, args);
        cur = VisualTreeHelper.GetParent(cur);
    }
};
UIElement.Instance.SetVisualParent = function (value) {
    /// <param name="value" type="UIElement"></param>
    this._VisualParent = value;
};
UIElement.Instance.GetVisualParent = function () {
    /// <returns type="UIElement" />
    return this._VisualParent;
};
UIElement.Instance.IsLayoutContainer = function () { return false; };
UIElement.Instance.IsContainer = function () { return this.IsLayoutContainer(); };
UIElement.Instance.IsAncestorOf = function (el) {
    /// <param name="el" type="UIElement"></param>
    var parent = el;
    while (parent != null && !Nullstone.RefEquals(parent, this))
        parent = VisualTreeHelper.GetParent(parent);
    return Nullstone.RefEquals(parent, this);
};
UIElement.Instance.TransformToVisual = function (uie) {
    /// <param name="uie" type="UIElement"></param>
    var visual = this;
    var ok = false;
    var surface = App.Instance.MainSurface;
    if (this._IsAttached) {
        while (visual != null) {
            if (surface._IsTopLevel(visual))
                ok = true;
            visual = visual.GetVisualParent();
        }
    }

    if (!ok || (uie != null && !uie._IsAttached)) {
        throw new ArgumentException("UIElement not attached.");
        return null;
    }

    if (uie != null && !surface._IsTopLevel(uie)) {
        ok = false;
        visual = uie.GetVisualParent();
        if (visual != null && uie._IsAttached) {
            while (visual != null) {
                if (surface._IsTopLevel(visual))
                    ok = true;
                visual = visual.GetVisualParent();
            }
        }
        if (!ok) {
            throw new ArgumentException("UIElement not attached.");
            return null;
        }
    }

    //1. invert transform from input element to top level
    //2. transform back down to this element
    var result;
    var thisProjection;
    if (!this._CachedTransform || !(thisProjection = this._CachedTransform.Normal))
        throw new Exception("Cannot find transform.");
    if (uie != null) {
        var inverse;
        if (!uie._CachedTransform || !(inverse = uie._CachedTransform.Inverse))
            throw new Exception("Cannot find transform.");
        result = inverse.MultiplyMatrix(thisProjection);
    } else {
        result = thisProjection.Copy();
    }

    var mt = new MatrixTransform();
    mt.SetMatrix(result);
    return mt;
};

//#region Invalidation

UIElement.Instance._CacheInvalidateHint = function () {
};
UIElement.Instance._FullInvalidate = function (renderTransform) {
    this._Invalidate();
    if (renderTransform) {
        this._UpdateTransform();
        this._UpdateProjection();
    }
    this._UpdateBounds(true);
};
UIElement.Instance._Invalidate = function (rect) {
    if (!rect)
        rect = this._SurfaceBounds;
    if (!this._GetRenderVisible() || UIElement._IsOpacityInvisible(this._TotalOpacity))
        return;

    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Invalidate);
        //WTF: Invalidate bitmap cache
        //TODO: Render Intermediate not implemented
        this._DirtyRegion = this._DirtyRegion.Union(rect);
        this._OnInvalidated();
    }
};
UIElement.Instance._InvalidateMeasure = function () {
    this._DirtyFlags |= _Dirty.Measure;
    this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
    //TODO: Alert redraw necessary
};
UIElement.Instance._InvalidateArrange = function () {
    this._DirtyFlags |= _Dirty.Arrange;
    this._PropagateFlagUp(UIElementFlags.DirtyArrangeHint);
    //TODO: Alert redraw necessary
};
UIElement.Instance._InvalidateVisibility = function () {
    this._UpdateTotalRenderVisibility();
    this._InvalidateParent(this._GetSubtreeBounds());
};
UIElement.Instance._InvalidateSubtreePaint = function () {
    this._Invalidate(this._GetSubtreeBounds());
};
UIElement.Instance._InvalidateParent = function (r) {
    var visualParent = this.GetVisualParent();
    if (visualParent)
        visualParent._Invalidate(r);
    else if (this._IsAttached)
        App.Instance.MainSurface._Invalidate(r);
};

//#endregion

//#region Updates/Computes

UIElement.Instance._UpdateBounds = function (forceRedraw) {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Bounds);
    this._ForceInvalidateOfNewBounds = this._ForceInvalidateOfNewBounds || forceRedraw;
};
UIElement.Instance._UpdateTransform = function () {
    //NotImplemented("UIElement._UpdateTransform()");
};
UIElement.Instance._UpdateProjection = function () {
    //NotImplemented("UIElement._UpdateProjection()");
};
UIElement.Instance._ComputeBounds = function () {
    AbstractMethod("UIElement._ComputeBounds()");
};
UIElement.Instance._ComputeGlobalBounds = function () {
    this._GlobalBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._LocalProjection);
};
UIElement.Instance._ComputeSurfaceBounds = function () {
    this._SurfaceBounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteProjection);
};
UIElement.Instance._ComputeLocalTransform = function () {
    //NotImplemented("UIElement._ComputeLocalTransform");
};
UIElement.Instance._ComputeLocalProjection = function () {
    //NotImplemented("UIElement._ComputeLocalProjection");
};
UIElement.Instance._IntersectBoundsWithClipPath = function (unclipped, transform) {
    var clip = this.GetClip();
    var layoutClip = transform ? null : LayoutInformation.GetLayoutClip(this);
    var box;

    if (!clip && !layoutClip)
        return unclipped;
    if (clip)
        box = clip.GetBounds();
    else
        box = layoutClip.GetBounds();

    if (layoutClip)
        box = box.Intersection(layoutClip.GetBounds());

    if (!this._GetRenderVisible())
        box = new Rect(0, 0, 0, 0);

    //if (transform)
    //    box = box.Transform(this._AbsoluteTransform);

    return box.Intersection(unclipped);
};

//#endregion

//#region Render Visibility

UIElement.Instance._ComputeTotalRenderVisibility = function () {
    if (this._GetActualTotalRenderVisibility())
        this._Flags |= UIElementFlags.TotalRenderVisible;
    else
        this._Flags &= ~UIElementFlags.TotalRenderVisible;
};
UIElement.Instance._UpdateTotalRenderVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.RenderVisibility);
};
UIElement.Instance._GetActualTotalRenderVisibility = function () {
    var visible = (this._Flags & UIElementFlags.RenderVisible) != 0;
    var parentVisible = true;
    this._TotalOpacity = this.GetOpacity();

    var visualParent = this.GetVisualParent();
    if (visualParent) {
        visualParent._ComputeTotalRenderVisibility();
        parentVisible = visible && visualParent._GetRenderVisible();
        this._TotalOpacity *= visualParent._TotalOpacity;
    }
    visible = visible && parentVisible;
    return visible;
};
UIElement.Instance._GetRenderVisible = function () {
    return (this._Flags & UIElementFlags.TotalRenderVisible) != 0;
};

//#endregion

//#region Total Hit Test Visibility

UIElement.Instance._ComputeTotalHitTestVisibility = function () {
    if (this._GetActualTotalHitTestVisibility())
        this._Flags |= UIElementFlags.TotalHitTestVisible;
    else
        this._Flags &= ~UIElementFlags.TotalHitTestVisible;
};
UIElement.Instance._UpdateTotalHitTestVisibility = function () {
    if (this._IsAttached)
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.HitTestVisibility);
};
UIElement.Instance._GetActualTotalHitTestVisibility = function () {
    var visible = (this._Flags & UIElementFlags.HitTestVisible) != 0;
    var visualParent;
    if (visible && (visualParent = this.GetVisualParent())) {
        visualParent._ComputeTotalRenderVisibility();
        visible = visible && visualParent._GetIsHitTestVisible();
    }
    return visible;
};

//#endregion

//#region Hit Testing

UIElement.Instance._GetIsHitTestVisible = function () {
    return (this._Flags & UIElementFlags.TotalHitTestVisible) != 0;
};
UIElement.Instance._HitTestPoint = function (ctx, p, uielist) {
    uielist.Prepend(new UIElementNode(this));
};
UIElement.Instance._InsideObject = function (ctx, x, y) {
    return this._InsideClip(ctx, x, y);
};
UIElement.Instance._InsideClip = function (ctx, x, y) {
    var clip = this.GetClip();
    if (!clip)
        return true;

    var np = new Point(x, y);
    this._TransformPoint(np);

    if (!clip.GetBounds().ContainsPoint(np))
        return false;

    return ctx.IsPointInClipPath(clip, np);
};
UIElement.Instance._TransformPoint = function (p) {
    /// <param name="p" type="Point"></param>
    var transform = this._CachedTransform;
    if (!transform)
        transform = this._GetCachedTransform();
    var inverse;
    if (!(inverse = transform.Inverse)) {
        Warn("Could not get inverse of cached transform for UIElement.");
        return;
    }
    var np = inverse.MultiplyPoint(p);
    p.X = np.X;
    p.Y = np.Y;
};
UIElement.Instance._CanFindElement = function () {
    return false;
};
UIElement.Instance._CreateOriginTransform = function () {
    /// <returns type="Matrix" />
    var visualOffset = LayoutInformation.GetVisualOffset(this);
    return Matrix.CreateTranslate(visualOffset.X, visualOffset.Y);
};
UIElement.Instance._GetCachedTransform = function () {
    if (this._CachedTransform == null) {
        var transform = this._CreateOriginTransform();
        var ancestor = { Normal: new Matrix(), Inverse: new Matrix() };
        var parent = this.GetVisualParent();
        if (parent)
            ancestor = parent._GetCachedTransform();
        this._CachedTransform = {
            Normal: transform.MultiplyMatrix(ancestor.Normal),
            Inverse: ancestor.Inverse.MultiplyMatrix(transform.GetInverse())
        };
    }
    return this._CachedTransform;
};

//#endregion

//#region Measurements

UIElement.Instance._GetGlobalBounds = function () {
    return this._GlobalBounds;
};
UIElement.Instance._GetCoverageBounds = function () {
    /// <returns type="Rect" />
    return new Rect();
};
UIElement.Instance._GetSubtreeObject = function () {
    return this._SubtreeObject;
};
UIElement.Instance._SetSubtreeObject = function (value) {
    this._SubtreeObject = value;
};
UIElement.Instance._GetSubtreeExtents = function () {
    AbstractMethod("UIElement._GetSubtreeExtents()");
};
UIElement.Instance._GetSubtreeBounds = function () {
    return this._SurfaceBounds;
};
UIElement.Instance._SetRenderSize = function (value) {
    this._RenderSize = value;
};
UIElement.Instance._GetRenderSize = function () {
    return this._RenderSize;
};
UIElement.Instance._GetOriginPoint = function () {
    return new Point(0.0, 0.0);
};

//#endregion

//#region Measure

UIElement.Instance._DoMeasureWithError = function (error) {
    var last = LayoutInformation.GetPreviousConstraint(this);
    var parent = this.GetVisualParent();
    var infinite = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

    if (!this._IsAttached && !last && !parent && this.IsLayoutContainer()) {
        last = infinite;
    }

    if (last) {
        var previousDesired = this._DesiredSize;
        this._MeasureWithError(last, error);
        if (previousDesired.Equals(this._DesiredSize))
            return;
    }

    if (parent)
        parent._InvalidateMeasure();

    this._DirtyFlags &= ~_Dirty.Measure;
};
UIElement.Instance.Measure = function (availableSize) {
    var error = new BError();
    this._MeasureWithError(availableSize, error);
};
UIElement.Instance._MeasureWithError = function (availableSize, error) { };

//#endregion

//#region Arrange

UIElement.Instance._DoArrangeWithError = function (error) {
    var last = this._ReadLocalValueImpl(LayoutInformation.LayoutSlotProperty);
    var parent = this.GetVisualParent();

    if (!parent) {
        var desired = new Size();
        var surface = App.Instance.MainSurface;

        if (this.IsLayoutContainer()) {
            desired = this._DesiredSize;
            if (this._IsAttached && surface._IsTopLevel(this) && !this._GetParent()) {
                var measure = LayoutInformation.GetPreviousConstraint(this);
                if (measure)
                    desired = desired.Max(measure);
                else
                    desired = new Size(surface.GetWidth(), surface.GetHeight());
            }
        } else {
            desired = new Size(this.GetActualWidth(), this.GetActualHeight());
        }

        viewport = new Rect(Canvas.GetLeft(this), Canvas.GetTop(this), desired.Width, desired.Height)

        last = viewport;
    }

    if (last) {
        this._ArrangeWithError(last, error);
    } else {
        if (parent)
            parent._InvalidateArrange();
    }
};
UIElement.Instance.Arrange = function (finalRect) {
    var error = new BError();
    this._ArrangeWithError(finalRect, error);
};
UIElement.Instance._ArrangeWithError = function (finalRect, error) { };

//#endregion

UIElement.Instance._ShiftPosition = function (point) {
    this._Bounds.X = point.X;
    this._Bounds.Y = point.Y;
};

//#region Render

UIElement.Instance._DoRender = function (ctx, parentRegion) {
    var region = this._GetSubtreeExtents();
    if (!region) {
        Warn("Render Extents are empty. [" + this.constructor._TypeName + "]");
        return;
    }
    //region = region.Transform(this._RenderTransform);
    region = region.RoundOut();
    region = region.Intersection(parentRegion);
    if (UIElement._IsOpacityInvisible(this._TotalOpacity)) {
        // Info("No opacity. [" + this.constructor._TypeName + ":" + this.GetName() + "]");
        return;
    }
    if (!this._GetRenderVisible()) {
        //Info("Render invisible. [" + this.constructor._TypeName + ":" + this.GetName() + "]");
        return;
    }
    if (region.IsEmpty()) {
        //Info("Nothing to render. [" + this.constructor._TypeName + "]");
        return;
    }

    //TODO: render to intermediate not implemented
    ctx.Save();
    var transform = this._CreateOriginTransform();
    if (transform._Type !== MatrixTypes.Identity)
        ctx.Transform(transform);
    this._CachedTransform = { Normal: ctx.GetCurrentTransform(), Inverse: ctx.GetInverseTransform() };
    ctx.SetGlobalAlpha(this._TotalOpacity);
    this._Render(ctx, region);
    this._PostRender(ctx, region);
    ctx.Restore();
};
UIElement.Instance._Render = function (ctx, region) { };
UIElement.Instance._PostRender = function (ctx, region) {
    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.ZForward);
    var child;
    while (child = walker.Step()) {
        child._DoRender(ctx, region);
    }
};

//#endregion

//#region Loaded

UIElement.Instance._SetIsLoaded = function (value) {
    if (this._IsLoaded != value) {
        this._IsLoaded = value;
        this._OnIsLoadedChanged(value);
    }
};
UIElement.Instance._OnIsLoadedChanged = function (loaded) {
    var iter;
    var v;
    if (!this._IsLoaded) {
        //WTF: ClearForeachGeneration(Loaded)
        this.Unloaded.Raise(this, new EventArgs());
        iter = new CollectionIterator(this.GetResources());
        while (iter.Next()) {
            v = iter.GetCurrent();
            v = Nullstone.As(v, FrameworkElement);
            if (v != null)
                v._SetIsLoaded(loaded);
        }
    }

    var walker = new _VisualTreeWalker(this);
    var element;
    while (element = walker.Step()) {
        element._SetIsLoaded(loaded);
    }

    if (this._IsLoaded) {
        iter = new CollectionIterator(this.GetResources());
        while (iter.Next()) {
            v = iter.GetCurrent();
            v = Nullstone.As(v, FrameworkElement);
            if (v != null)
                v._SetIsLoaded(loaded);
        }
        //WTF: AddAllLoadedHandlers
        this.Loaded.RaiseAsync(this, new EventArgs());
    }
};

//#endregion

//#region Visual State Changes

UIElement.Instance._OnIsAttachedChanged = function (value) {
    if (this._SubtreeObject)
        this._SubtreeObject._SetIsAttached(value);


    this._InvalidateVisibility(); //HACK
    this._OnIsAttachedChanged$DependencyObject(value);

    if (!value) {
        this._CacheInvalidateHint();

        var surface = App.Instance.MainSurface;
        if (surface) {
            surface._RemoveDirtyElement(this);
            if (surface._FocusedElement === this)
                surface._FocusElement(null);
        }
    }
};
UIElement.Instance._OnInvalidated = function () {
    this.Invalidated.Raise(this, null);
};
UIElement.Instance._ElementRemoved = function (item) {
    this._Invalidate(item._GetSubtreeBounds());
    item.SetVisualParent(null);
    item._SetIsLoaded(false);
    item._SetIsAttached(false);
    item.SetMentor(null);

    var emptySlot = new Rect();
    LayoutInformation.SetLayoutSlot(item, emptySlot);
    item.ClearValue(LayoutInformation.LayoutClipProperty);

    this._InvalidateMeasure();

    this._Providers[_PropertyPrecedence.Inherited].ClearInheritedPropertiesOnRemovingFromTree(item);
}
UIElement.Instance._ElementAdded = function (item) {
    item.SetVisualParent(this);
    item._UpdateTotalRenderVisibility();
    item._UpdateTotalHitTestVisibility();
    item._Invalidate();

    this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(item);
    item._SetIsAttached(this._IsAttached);
    item._SetIsLoaded(this._IsLoaded);
    var o = this;
    while (o != null && !(o instanceof FrameworkElement))
        o = o.GetMentor();
    item.SetMentor(o);

    this._UpdateBounds(true);

    this._InvalidateMeasure();
    this.ClearValue(LayoutInformation.LayoutClipProperty);
    this.ClearValue(LayoutInformation.PreviousConstraintProperty);
    item._SetRenderSize(new Size(0, 0));
    item._UpdateTransform();
    item._UpdateProjection();
    item._InvalidateMeasure();
    item._InvalidateArrange();
    if (item._HasFlag(UIElementFlags.DirtySizeHint) || item._ReadLocalValueImpl(LayoutInformation.LastRenderSizeProperty))
        item._PropagateFlagUp(UIElementFlags.DirtySizeHint);
}

//#endregion

//#region Dirty Updates

UIElement.Instance._UpdateLayer = function (pass, error) {
};
UIElement.Instance._HasFlag = function (flag) { return (this._Flags & flag) == flag; };
UIElement.Instance._ClearFlag = function (flag) { this._Flags &= ~flag; };
UIElement.Instance._SetFlag = function (flag) { this._Flags |= flag; };
UIElement.Instance._PropagateFlagUp = function (flag) {
    this._SetFlag(flag);
    var el = this.GetVisualParent();
    while (el && !el._HasFlag(flag)) {
        el._SetFlag(flag);
        el = el.GetVisualParent();
    }
};

UIElement.Instance.__DebugDirtyFlags = function () {
    var t = new String();
    if (this._DirtyFlags & _Dirty.Measure)
        t = t.concat("[Measure]");
    if (this._DirtyFlags & _Dirty.Arrange)
        t = t.concat("[Arrange]");
    if (this._DirtyFlags & _Dirty.Bounds)
        t = t.concat("[Bounds]");
    if (this._DirtyFlags & _Dirty.ChildrenZIndices)
        t = t.concat("[ChildrenZIndices]");
    if (this._DirtyFlags & _Dirty.Clip)
        t = t.concat("[Clip]");
    if (this._DirtyFlags & _Dirty.Invalidate)
        t = t.concat("[Invalidate]");
    return t;
};

//#endregion

//#region Property Changed

UIElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== UIElement) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }
    if (args.Property._ID === UIElement.OpacityProperty._ID) {
        this._InvalidateVisibility();
    } else if (args.Property._ID === UIElement.VisibilityProperty._ID) {
        if (args.NewValue === Visibility.Visible)
            this._Flags |= UIElementFlags.RenderVisible;
        else
            this._Flags &= ~UIElementFlags.RenderVisible;
        this._InvalidateVisibility();
        this._InvalidateMeasure();
        var parent = this.GetVisualParent();
        if (parent != null)
            parent._InvalidateMeasure();
        App.Instance.MainSurface._RemoveFocus(this);
        
    } else if (args.Property._ID === UIElement.IsHitTestVisibleProperty._ID) {
        if (args.NewValue === true) {
            this._Flags |= UIElementFlags.HitTestVisible;
        } else {
            this._Flags &= ~UIElementFlags.HitTestVisible;
        }
        this._UpdateTotalHitTestVisibility();
    }
    //TODO: Check invalidation of some properties
    this.PropertyChanged.Raise(this, args);
};
UIElement.Instance._OnSubPropertyChanged = function (propd, sender, args) {
};

//#endregion

//#region Mouse

UIElement.Instance.CanCaptureMouse = function () { return true; };
UIElement.Instance.CaptureMouse = function () {
    if (!this._IsAttached)
        return false;
    return App.Instance.MainSurface.SetMouseCapture(this);
};
UIElement.Instance.ReleaseMouseCapture = function () {
    if (!this._IsAttached)
        return;
    App.Instance.MainSurface.ReleaseMouseCapture(this);
};

UIElement.Instance._EmitMouseEvent = function (type, button, absolutePos) {
    if (type === "up") {
        if (Surface.IsLeftButton(button))
            this._EmitMouseLeftButtonUp(absolutePos);
        else if (Surface.IsRightButton(button))
            this._EmitMouseRightButtonUp(absolutePos);
    } else if (type === "down") {
        if (Surface.IsLeftButton(button))
            this._EmitMouseLeftButtonDown(absolutePos);
        else if (Surface.IsRightButton(button))
            this._EmitMouseRightButtonDown(absolutePos);
    } else if (type === "leave") {
        this._EmitMouseLeave(absolutePos);
    } else if (type === "enter") {
        this._EmitMouseEnter(absolutePos);
    } else if (type === "move") {
        this._EmitMouseMoveEvent(absolutePos);
    }
};

UIElement.Instance._EmitMouseMoveEvent = function (absolutePos) {
    this.MouseMove.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnMouseMove = function (sender, args) { };

UIElement.Instance._EmitMouseLeftButtonDown = function (absolutePos) {
    HUDUpdate("clicky", "MouseLeftButtonDown " + absolutePos.toString());
    this.MouseLeftButtonDown.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseLeftButtonDown = function (sender, args) { };

UIElement.Instance._EmitMouseLeftButtonUp = function (absolutePos) {
    HUDUpdate("clicky", "MouseLeftButtonUp " + absolutePos.toString());
    this.MouseLeftButtonUp.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseLeftButtonUp = function (sender, args) { };

UIElement.Instance._EmitMouseRightButtonDown = function (absolutePos) {
    HUDUpdate("clicky", "MouseRightButtonDown " + absolutePos.toString());
    this.MouseRightButtonDown.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseRightButtonDown = function (sender, args) { };

UIElement.Instance._EmitMouseRightButtonUp = function (absolutePos) {
    HUDUpdate("clicky", "MouseRightButtonUp " + absolutePos.toString());
    this.MouseRightButtonUp.Raise(this, new MouseButtonEventArgs(absolutePos));
};
UIElement.Instance.OnMouseRightButtonUp = function (sender, args) { };

UIElement.Instance._EmitMouseEnter = function (absolutePos) {
    this.MouseEnter.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnMouseEnter = function (sender, args) { };

UIElement.Instance._EmitMouseLeave = function (absolutePos) {
    this.MouseLeave.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnMouseLeave = function (sender, args) { };

UIElement.Instance._EmitLostMouseCapture = function (absolutePos) {
    this.LostMouseCapture.Raise(this, new MouseEventArgs(absolutePos));
};
UIElement.Instance.OnLostMouseCapture = function (sender, args) { };

//#endregion

//#region Keyboard

//Backspace - 8
//Enter - 13
//Left - 37
//Up - 38
//Right - 39 
//Down - 40
//Home - 36
//End - 35
//Page Up - 33
//Page Down - 34
//Insert - 45
//Delete - 46
//Esc - 27

//Shift - 16
//Ctrl - 17
//Alt - 18

UIElement.Instance._EmitKeyDown = function (args) {
    this.KeyDown.Raise(this, args);
};
UIElement.Instance._EmitKeyUp = function (args) {
    this.KeyUp.Raise(this, args);
};

UIElement.Instance.OnKeyDown = function (sender, args) {
};
UIElement.Instance.OnKeyUp = function (sender, args) {
};

//#endregion

//#region Focus

UIElement.Instance.Focus = function (recurse) {
    return false;
};

UIElement.Instance._EmitFocusChange = function (type) {
    if (type === "got")
        this._EmitGotFocus();
    else if (type === "lost")
        this._EmitLostFocus();
};

UIElement.Instance._EmitGotFocus = function () {
    this.GotFocus.Raise(this, new EventArgs());
};
UIElement.Instance.OnGotFocus = function (sender, args) { };

UIElement.Instance._EmitLostFocus = function () {
    this.LostFocus.Raise(this, new EventArgs());
};
UIElement.Instance.OnLostFocus = function (sender, args) { };

//#endregion

UIElement._IsOpacityInvisible = function (opacity) {
    return opacity * 255 < .5;
};
UIElement._IsOpacityTranslucent = function (opacity) {
    return opacity * 255 < 245.5;
};
UIElement.ZIndexComparer = function (uie1, uie2) {
    var zi1 = Canvas.GetZIndex(uie1);
    var zi2 = Canvas.GetZIndex(uie2);
    if (zi1 == zi2) {
        var z1 = Canvas.GetZ(uie1);
        var z2 = Canvas.GetZ(uie2);
        if (isNaN(z1) || isNaN(z2))
            return 0;
        return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
    }
    return zi1 - zi2;
};

Nullstone.FinishCreate(UIElement);
//#endregion