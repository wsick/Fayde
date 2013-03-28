/// <reference path="DependencyObject.js" />
/// <reference path="../Flags.js"/>
/// CODE
/// <reference path="UpdateMetrics.js"/>
/// <reference path="../Core/DependencyProperty.js" />
/// <reference path="../Controls/Canvas.js" />
/// <reference path="../Engine/Dirty.js"/>
/// <reference path="../Engine/App.js"/>
/// <reference path="../Core/Collections/InternalCollection.js"/>
/// <reference path="../Media/Geometry.js"/>
/// <reference path="../Media/Brush.js"/>
/// <reference path="RequestBringIntoViewEventArgs.js"/>
/// <reference path="../Media/MatrixTransform.js"/>
/// <reference path="Enums.js"/>
/// <reference path="../Engine/RenderContext.js"/>
/// <reference path="../Primitives/Thickness.js"/>
/// <reference path="Triggers.js"/>
/// <reference path="../Media/CacheMode.js"/>
/// <reference path="../Media/Projection.js"/>
/// <reference path="UIElementMetrics.js"/>
/// <reference path="../Primitives.js"/>
/// <reference path="Xformer.js"/>

(function (Fayde) {
    //#region UIElementFlags

    var UIElementFlags = {
        None: 0,

        RenderVisible: 0x02,
        HitTestVisible: 0x04,
        TotalRenderVisible: 0x08,
        TotalHitTestVisible: 0x10,

        DirtyArrangeHint: 0x800,
        DirtyMeasureHint: 0x1000,
        DirtySizeHint: 0x2000,

        RenderProjection: 0x4000
    };
    Fayde.UIElementFlags = UIElementFlags;

    //#endregion

    var useProjections = Fayde.UseProjections;

    var UIElement = Nullstone.Create("UIElement", Fayde.DependencyObject);

    UIElement.Instance.Init = function () {
        this.Init$DependencyObject();

        this.Unloaded = new MulticastEvent();
        this.Loaded = new MulticastEvent();
        this.Invalidated = new MulticastEvent();

        this.AddProvider(new Fayde._InheritedPropertyValueProvider(this));

        this.InitSpecific();
        this._LayoutInformation = new Fayde.LayoutInformation();
        this._Xformer = new Fayde.Xformer();
        this._Xformer.ComputeLocalTransform(this);
        this._Xformer.ComputeLocalProjection(this);
        this._UpdateMetrics = Fayde.CreateUpdateMetrics();
        this._UpdatePass = Fayde.CreateUpdatePass(this, this._MeasureOverride, this._ArrangeOverride);

        this._Flags = UIElementFlags.RenderVisible | UIElementFlags.HitTestVisible;

        this._HiddenDesire = size.createNegativeInfinite();

        this._DirtyFlags = _Dirty.Measure;
        this._PropagateFlagUp(UIElementFlags.DirtyMeasureHint);
        this._UpDirtyNode = this._DownDirtyNode = null;
        this._ForceInvalidateOfNewBounds = false;
        this._DesiredSize = new size();
        this._RenderSize = new size();

        this._DirtyRegion = new rect();

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
        this.MouseLeave = new MulticastEvent();

        this.MouseWheel = new MulticastEvent();
        this.MouseWheel.Subscribe(this.OnMouseWheel, this);

        this.LostMouseCapture = new MulticastEvent();
        this.LostMouseCapture.Subscribe(this.OnLostMouseCapture, this);

        this.GotFocus = new MulticastEvent();
        this.LostFocus = new MulticastEvent();

        this.KeyDown = new MulticastEvent();
        this.KeyUp = new MulticastEvent();

        this.RequestBringIntoView = new MulticastEvent();

        this.VisualParentChanged = new MulticastEvent();

        this.CreateHtmlObject();
    };
    UIElement.Instance.InitSpecific = function () {
        this._Metrics = new Fayde.UIElementMetrics();
    };

    //#region Properties

    UIElement.AllowDropProperty = DependencyProperty.Register("AllowDrop", function () { return Boolean; }, UIElement);
    UIElement.CacheModeProperty = DependencyProperty.Register("CacheMode", function () { return Fayde.Media.CacheMode; }, UIElement);
    UIElement.ClipProperty = DependencyProperty.RegisterCore("Clip", function () { return Fayde.Media.Geometry; }, UIElement);
    UIElement.EffectProperty = DependencyProperty.Register("Effect", function () { return Fayde.Media.Effects.Effect; }, UIElement);
    UIElement.IsHitTestVisibleProperty = DependencyProperty.RegisterCore("IsHitTestVisible", function () { return Boolean; }, UIElement, true);
    UIElement.OpacityMaskProperty = DependencyProperty.RegisterCore("OpacityMask", function () { return Fayde.Media.Brush; }, UIElement);
    UIElement.OpacityProperty = DependencyProperty.RegisterCore("Opacity", function () { return Number; }, UIElement, 1.0, function (d, args) { d._UpdateMetrics.Opacity = args.NewValue; });
    if (useProjections)
        UIElement.ProjectionProperty = DependencyProperty.Register("Projection", function () { return Fayde.Media.Projection; }, UIElement);
    UIElement.RenderTransformProperty = DependencyProperty.Register("RenderTransform", function () { return Fayde.Media.Transform; }, UIElement);
    UIElement.RenderTransformOriginProperty = DependencyProperty.Register("RenderTransformOrigin", function () { return Point; }, UIElement, new Point());
    UIElement.ResourcesProperty = DependencyProperty.RegisterFull("Resources", function () { return Fayde.ResourceDictionary; }, UIElement, undefined, undefined, { GetValue: function () { return new Fayde.ResourceDictionary(); } });
    UIElement.TriggersProperty = DependencyProperty.RegisterFull("Triggers", function () { return Fayde.TriggerCollection; }, UIElement, undefined, undefined, { GetValue: function () { return new Fayde.TriggerCollection(); } });
    UIElement.UseLayoutRoundingProperty = DependencyProperty.RegisterInheritable("UseLayoutRounding", function () { return Boolean; }, UIElement, true, function (d, args) { d._UpdateMetrics.UseLayoutRounding = args.NewValue; }, undefined, _Inheritable.UseLayoutRounding);
    UIElement.VisibilityProperty = DependencyProperty.RegisterCore("Visibility", function () { return new Enum(Fayde.Visibility); }, UIElement, Fayde.Visibility.Visible, function (d, args) { d._UpdateMetrics.Visibility = args.NewValue; });
    UIElement.TagProperty = DependencyProperty.Register("Tag", function () { return Object; }, UIElement);

    UIElement.IsFixedWidthProperty = DependencyProperty.Register("IsFixedWidth", function () { return Boolean; }, UIElement, false);
    UIElement.IsFixedHeightProperty = DependencyProperty.Register("IsFixedHeight", function () { return Boolean; }, UIElement, false);

    UIElement.IsMouseOverProperty = DependencyProperty.RegisterReadOnlyCore("IsMouseOver", function () { return Boolean; }, UIElement);

    Nullstone.AutoProperties(UIElement, [
        UIElement.AllowDropProperty,
        UIElement.CacheModeProperty,
        UIElement.ClipProperty,
        UIElement.EffectProperty,
        UIElement.IsHitTestVisibleProperty,
        UIElement.OpacityMaskProperty,
        UIElement.OpacityProperty,
        UIElement.RenderTransformProperty,
        UIElement.RenderTransformOriginProperty,
        UIElement.ResourcesProperty,
        UIElement.TriggersProperty,
        UIElement.UseLayoutRoundingProperty,
        UIElement.VisibilityProperty,
        UIElement.TagProperty,
        UIElement.IsFixedWidthProperty,
        UIElement.IsFixedHeightProperty
    ]);

    if (useProjections)
        Nullstone.AutoProperty(UIElement, UIElement.ProjectionProperty);

    Nullstone.AutoPropertiesReadOnly(UIElement, [
        UIElement.IsMouseOverProperty
    ]);

    Nullstone.AutoProperties(UIElement, [
        "_SubtreeObject"
    ]);
    Nullstone.Property(UIElement, "RenderSize", {
        get: function () { return this._RenderSize; }
    });

    //#endregion

    UIElement.Instance.BringIntoView = function (irect) {
        if (!irect) irect = new rect();
        var args = new Fayde.RequestBringIntoViewEventArgs(this, irect);

        var cur = this;
        while (cur && !args.Handled) {
            cur.RequestBringIntoView.Raise(this, args);
            cur = Fayde.VisualTreeHelper.GetParent(cur);
        }
    };
    UIElement.Instance.SetVisualParent = function (value) {
        /// <param name="value" type="UIElement"></param>
        this._VisualParent = value;
        this._UpdatePass.VisualParent = value;
        this.VisualParentChanged.Raise(this, new EventArgs());
    };
    UIElement.Instance.GetVisualParent = function () {
        /// <returns type="UIElement" />
        return this._VisualParent;
    };
    UIElement.Instance.GetVisualRoot = function () {
        var visualParent = this.GetVisualParent();
        if (visualParent)
            return visualParent.GetVisualRoot();
        return visualParent;
    };
    UIElement.Instance.IsLayoutContainer = function () { return false; };
    UIElement.Instance.IsContainer = function () { return this.IsLayoutContainer(); };
    UIElement.Instance.IsAncestorOf = function (el) {
        /// <param name="el" type="UIElement"></param>
        var parent = el;
        while (parent && !Nullstone.RefEquals(parent, this))
            parent = Fayde.VisualTreeHelper.GetParent(parent);
        return Nullstone.RefEquals(parent, this);
    };
    UIElement.Instance.TransformToVisual = function (uie) {
        /// <param name="uie" type="UIElement"></param>
        var visual = this;
        var ok = false;
        var surface = App.Instance.MainSurface;
        if (this._IsAttached) {
            while (visual) {
                if (surface._IsTopLevel(visual))
                    ok = true;
                visual = visual.GetVisualParent();
            }
        }

        if (!ok || (uie && !uie._IsAttached)) {
            throw new ArgumentException("UIElement not attached.");
        }

        if (uie && !surface._IsTopLevel(uie)) {
            ok = false;
            visual = uie.GetVisualParent();
            if (visual && uie._IsAttached) {
                while (visual) {
                    if (surface._IsTopLevel(visual))
                        ok = true;
                    visual = visual.GetVisualParent();
                }
            }
            if (!ok) {
                throw new ArgumentException("UIElement not attached.");
            }
        }

        return this._Xformer.TransformToVisual(uie);
    };

    //#region Invalidation

    UIElement.Instance._CacheInvalidateHint = function () {
        //Intentionally empty
    };
    UIElement.Instance._FullInvalidate = function (renderTransform) {
        this._Invalidate();
        if (renderTransform) {
            this._UpdateTransform();
            this._UpdateProjection();
        }
        this._UpdateBounds(true);
    };
    UIElement.Instance._Invalidate = function (irect) {
        if (!irect)
            irect = this.GetBounds();
        if (!this._GetRenderVisible() || this._IsOpacityInvisible())
            return;

        if (this._IsAttached) {
            App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Invalidate);
            this._InvalidateBitmapCache();
            if (false) {
                //TODO: Render Intermediate not implemented
                rect.union(this._DirtyRegion, this._GetSubtreeBounds());
            } else {
                rect.union(this._DirtyRegion, irect);
            }
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
    UIElement.Instance._InvalidateClip = function () {
        this._Metrics.UpdateClipBounds(this.Clip);
        this._InvalidateParent(this._GetSubtreeBounds());
        this._UpdateBounds(true);
        this._ComputeComposite();
    };
    UIElement.Instance._InvalidateEffect = function () {
        var changed = this._Metrics.ComputeEffectPadding(this.Effect);
        this._InvalidateParent(this._GetSubtreeBounds());
        if (changed)
            this._UpdateBounds();
        this._ComputeComposite();
    };
    UIElement.Instance._InvalidateBitmapCache = function () {
        //NotImplemented("UIElement._InvalidateBitmapCache");
    };

    //#endregion

    UIElement.Instance._ComputeComposite = function () {
        //NotImplemented("UIElement._ComputeComposite");
    };

    //#region Transforms

    UIElement.Instance._UpdateTransform = function () {
        if (this._IsAttached)
            App.Instance.MainSurface._AddDirtyElement(this, _Dirty.LocalTransform);
    };
    UIElement.Instance._UpdateProjection = function () {
        if (this._IsAttached)
            App.Instance.MainSurface._AddDirtyElement(this, _Dirty.LocalProjection);
    };
    UIElement.Instance._TransformBounds = function (old, current) {
        this._Metrics.TransformBounds(this, old, current);
    };
    UIElement.Instance._GetSizeForBrush = function () {
        AbstractMethod("UIElement._GetSizeForBrush");
    };
    UIElement.Instance._GetTransformOrigin = function () {
        return new Point(0, 0);
    };

    //#endregion

    //#region Bounds

    UIElement.Instance._GetOriginPoint = function () {
        return new Point(0.0, 0.0);
    };
    UIElement.Instance._UpdateBounds = function (forceRedraw) {
        if (this._IsAttached)
            App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Bounds);
        this._ForceInvalidateOfNewBounds = this._ForceInvalidateOfNewBounds || forceRedraw;
    };

    UIElement.Instance.GetBounds = function () {
        return this._Metrics.Surface;

    };
    UIElement.Instance._ComputeBounds = function () {
        this._Metrics.ComputeBounds(this);
    };
    UIElement.Instance._GetSubtreeExtents = function () {
        return this._Metrics.SubtreeExtents;
    };
    UIElement.Instance._GetGlobalBounds = function () {
        return this._Metrics.GlobalBounds;
    };
    UIElement.Instance._ComputeGlobalBounds = function () {
        this._Metrics.ComputeGlobalBounds(this);
    };
    UIElement.Instance._GetSubtreeBounds = function () {
        return this._Metrics.SubtreeBounds;
    };
    UIElement.Instance._ComputeSurfaceBounds = function () {
        this._Metrics.ComputeGlobalBounds(this);
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
        this._TotalOpacity = this.Opacity;

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
        uielist.Prepend(new Fayde.UIElementNode(this));
    };
    UIElement.Instance._InsideObject = function (ctx, x, y) {
        return this._InsideClip(ctx, x, y);
    };
    UIElement.Instance._InsideClip = function (ctx, x, y) {
        var clip = this.Clip;
        if (!clip)
            return true;

        var np = new Point(x, y);
        this._TransformPoint(np);

        if (!rect.containsPoint(clip.GetBounds(), np))
            return false;

        return ctx.IsPointInClipPath(clip, np);
    };
    UIElement.Instance._TransformPoint = function (p) {
        return this._Xformer.TransformPoint(p);
    };
    UIElement.Instance._CanFindElement = function () {
        return false;
    };

    //#endregion

    //#region Measure/Arrange

    UIElement.Instance._DoMeasureWithError = function (error) {
        this._UpdatePass.DoMeasure(error);
    };
    UIElement.Instance.Measure = function (availableSize) {
        var error = { Message: null };
        var pass = this._Measure(availableSize, error);
        if (error.Message)
            throw new Exception(pass.Error);
    };
    UIElement.Instance._Measure = function (availableSize, error) {
        this._UpdatePass.Measure(availableSize, error);
    }
    UIElement.Instance._MeasureOverride = function (availableSize, pass, error) { };
    UIElement.Instance._DoArrangeWithError = function (error) {
        this._UpdatePass.DoArrange(error);
    };
    UIElement.Instance.Arrange = function (finalRect) {
        var error = { Message: null };
        var pass = this._Arrange(finalRect, error);
        if (error.Message)
            throw new Exception(error.Message);
    };
    UIElement.Instance._Arrange = function (finalRect, error) {
        this._UpdatePass.Arrange(finalRect, error);
    };
    UIElement.Instance._ArrangeOverride = function (finalRect, pass, error) { };

    //#endregion

    //#region Render

    UIElement.Instance._DoRender = function (ctx, parentRegion) {
        /// <param name="ctx" type="_RenderContext"></param>
        if (!this._GetRenderVisible() || this._IsOpacityInvisible())
            return;

        var region = new rect();
        if (false) {
            //TODO: Render to intermediate
        } else {
            rect.copyTo(this._GetSubtreeExtents(), region);
            rect.transform(region, this._Xformer.RenderXform);
            rect.transform(region, ctx.CurrentTransform);
            rect.roundOut(region);
            rect.intersection(region, parentRegion);
        }

        if (rect.isEmpty(region))
            return;

        ctx.Save();

        ctx.Transform(this._Xformer.RenderXform);
        ctx.CanvasContext.globalAlpha = this._TotalOpacity;

        var canvasCtx = ctx.CanvasContext;
        var clip = this.Clip;
        if (clip) {
            clip.Draw(ctx);
            canvasCtx.clip();
        }

        if (window.RenderDebug) {
            RenderDebug.Count++;
            RenderDebug(this.__DebugToString());
        }

        var effect = this.Effect;
        if (effect) {
            canvasCtx.save();
            effect.PreRender(ctx);
        }
        this._Render(ctx, region);
        if (effect) {
            canvasCtx.restore();
        }

        var walker = Fayde._VisualTreeWalker.ZForward(this);
        var child;
        if (window.RenderDebug) RenderDebug.Indent();
        while (child = walker.Step()) {
            child._DoRender(ctx, region);
        }
        if (window.RenderDebug) RenderDebug.Unindent();

        ctx.Restore();
    };
    UIElement.Instance._Render = function (ctx, region) { };

    //#endregion

    //#region Loaded

    UIElement.Instance._SetIsLoaded = function (value) {
        if (this._IsLoaded !== value) {
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
            iter = this.Resources.GetIterator();
            while (iter.Next()) {
                v = iter.GetCurrent();
                v = Nullstone.As(v, Fayde.FrameworkElement);
                if (v)
                    v._SetIsLoaded(loaded);
            }
        }

        var walker = new Fayde._VisualTreeWalker(this);
        var element;
        while (element = walker.Step()) {
            element._SetIsLoaded(loaded);
        }

        if (this._IsLoaded) {
            iter = this.Resources.GetIterator();
            while (iter.Next()) {
                v = iter.GetCurrent();
                v = Nullstone.As(v, Fayde.FrameworkElement);
                if (v)
                    v._SetIsLoaded(loaded);
            }
            //WTF: AddAllLoadedHandlers
            this.Loaded.RaiseAsync(this, new EventArgs());
        }
    };

    //#endregion

    //#region Visual Tree Changes

    UIElement.Instance._OnIsAttachedChanged = function (value) {
        this._UpdatePass.IsAttached = value;
        this._UpdateTotalRenderVisibility();

        var subtree = this._SubtreeObject;
        if (subtree) {
            if (!Fayde.IsCanvasEnabled) {
                this.IsFixedWidth = this.CalculateIsFixedWidth();
                this.IsFixedHeight = this.CalculateIsFixedHeight();
            }
            subtree._SetIsAttached(value);
        }

        this._OnIsAttachedChanged$DependencyObject(value);

        if (!value) {
            this._CacheInvalidateHint();

            var surface = App.Instance.MainSurface;
            if (surface) {
                surface._RemoveDirtyElement(this);
                if (Nullstone.RefEquals(surface._FocusedElement, this))
                    surface._FocusElement(null);
            }
        } else {
            //TODO: revisit this, this was perhaps only an issue because the grid isn't coded right
            //this.OnHtmlAttached();
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

        var emptySlot = new rect();
        Fayde.LayoutInformation.SetLayoutSlot(item, emptySlot);
        Fayde.LayoutInformation.SetLayoutClip(item, undefined);

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
        while (o && !(o instanceof Fayde.FrameworkElement))
            o = o.GetMentor();
        item.SetMentor(o);

        this._UpdateBounds(true);

        this._InvalidateMeasure();
        Fayde.LayoutInformation.SetLayoutClip(this, undefined);
        this._UpdateMetrics.PreviousConstraint = undefined;
        item._RenderSize = new size();
        item._UpdateTransform();
        item._UpdateProjection();
        item._InvalidateMeasure();
        item._InvalidateArrange();
        if (item._HasFlag(UIElementFlags.DirtySizeHint) || item._UpdateMetrics.LastRenderSize !== undefined)
            item._PropagateFlagUp(UIElementFlags.DirtySizeHint);

        if (!Fayde.IsCanvasEnabled) {
            if (this._IsAttached) {
                item.IsFixedWidth = item.CalculateIsFixedWidth();
                item.IsFixedHeight = item.CalculateIsFixedHeight();
            }
        }
    }
    UIElement.Instance._OnParentChanged = function (parent) {
        this._UpdatePass.Parent = parent;
    };

    //#endregion

    //#region Dirty Updates

    UIElement.Instance._ComputeXformer = function (visualParent) {
        var xformer = this._Xformer;
        var dirtyEnum = _Dirty;
        if (this._DirtyFlags & dirtyEnum.LocalTransform) {
            this._DirtyFlags &= ~dirtyEnum.LocalTransform;
            this._DirtyFlags |= dirtyEnum.Transform;
            //DirtyDebug("ComputeLocalTransform: [" + this.__DebugToString() + "]");
            xformer.ComputeLocalTransform(this);
            //DirtyDebug("--> " + xformer.LocalXform._Elements.toString());
        }
        if (this._DirtyFlags & dirtyEnum.LocalProjection) {
            this._DirtyFlags &= ~dirtyEnum.LocalProjection;
            this._DirtyFlags |= dirtyEnum.Transform;
            //DirtyDebug("ComputeLocalProjection: [" + this.__DebugToString() + "]");
            xformer.ComputeLocalProjection(this);
        }
        if (this._DirtyFlags & dirtyEnum.Transform) {
            this._DirtyFlags &= ~dirtyEnum.Transform;
            //DirtyDebug("ComputeTransform: [" + this.__DebugToString() + "]");
            xformer.ComputeTransform(this);
            //DirtyDebug("--> " + xformer.AbsoluteProjection._Elements.slice(0, 8).toString());
            if (visualParent)
                visualParent._UpdateBounds();
            return true;
        }
        return false;
    };
    UIElement.Instance._UpdateLayer = function (pass, error) {
        //Intentionally empty
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

    UIElement.Instance.__DebugDownDirtyFlags = function () {
        var t = new String();
        if (this._DirtyFlags & _Dirty.ChildrenZIndices)
            t = t.concat("[ChildrenZIndices]");
        if (this._DirtyFlags & _Dirty.Clip)
            t = t.concat("[Clip]");
        if (this._DirtyFlags & _Dirty.Transform)
            t = t.concat("[Transform]");
        if (this._DirtyFlags & _Dirty.LocalTransform)
            t = t.concat("[LocalTransform]");
        if (this._DirtyFlags & _Dirty.LocalProjection)
            t = t.concat("[LocalProjection]");
        if (this._DirtyFlags & _Dirty.RenderVisibility)
            t = t.concat("[RenderVisibility]");
        if (this._DirtyFlags & _Dirty.HitTestVisibility)
            t = t.concat("[HitTestVisibility]");
        return t;
    };
    UIElement.Instance.__DebugUpDirtyFlags = function () {
        var t = new String();
        if (this._DirtyFlags & _Dirty.Bounds)
            t = t.concat("[Bounds]");
        if (this._DirtyFlags & _Dirty.NewBounds)
            t = t.concat("[NewBounds]");
        if (this._DirtyFlags & _Dirty.Invalidate)
            t = t.concat("[Invalidate]");
        return t;
    };

    //#endregion

    //#region Property Changed

    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        UIElement.Instance._OnPropertyChanged = function (args, error) {
            var propd = args.Property;
            if (propd.OwnerType !== UIElement) {
                this._OnPropertyChanged$DependencyObject(args, error);
                return;
            }

            var ivprop = false;
            switch (propd._ID) {
                case UIElement.OpacityProperty._ID:
                case UIElement.VisibilityProperty._ID:
                    ivprop = true;
                    break;
                case UIElement.IsFixedHeightProperty._ID:
                    ivprop = true;
                    this.InvalidateChildrenFixedHeight();
                    break;
                case UIElement.IsFixedWidthProperty._ID:
                    ivprop = true;
                    this.InvalidateChildrenFixedWidth();
                    break;
                case UIElement.UseLayoutRoundingProperty._ID:
                    this._UpdateMetrics.UseLayoutRounding = args.NewValue ? 1 : 0;
                    break;
                default:
                    break;
            }
            if (ivprop)
                this.InvalidateProperty(propd, args.OldValue, args.NewValue);
            this.PropertyChanged.Raise(this, args);
        };
    }
    //#else
    if (Fayde.IsCanvasEnabled) {
        UIElement.Instance._OnPropertyChanged = function (args, error) {
            var propd = args.Property;
            if (propd.OwnerType !== UIElement) {
                this._OnPropertyChanged$DependencyObject(args, error);
                return;
            }

            if (propd._ID === UIElement.OpacityProperty._ID) {
                this._InvalidateVisibility();
            } else if (propd._ID === UIElement.VisibilityProperty._ID) {
                if (args.NewValue === Fayde.Visibility.Visible)
                    this._Flags |= UIElementFlags.RenderVisible;
                else
                    this._Flags &= ~UIElementFlags.RenderVisible;
                this._InvalidateVisibility();
                this._InvalidateMeasure();
                var parent = this.GetVisualParent();
                if (parent)
                    parent._InvalidateMeasure();
                App.Instance.MainSurface._RemoveFocus(this);
            } else if (propd._ID === UIElement.IsHitTestVisibleProperty._ID) {
                if (args.NewValue === true) {
                    this._Flags |= UIElementFlags.HitTestVisible;
                } else {
                    this._Flags &= ~UIElementFlags.HitTestVisible;
                }
                this._UpdateTotalHitTestVisibility();
            } else if (propd._ID === UIElement.ClipProperty._ID) {
                this._InvalidateClip();
            } else if (propd._ID === UIElement.OpacityMaskProperty._ID) {
                //TODO: OpacityMaskProperty
            } else if (propd._ID === UIElement.RenderTransformProperty._ID
                || args.Property._ID === UIElement.RenderTransformOriginProperty._ID) {
                this._UpdateTransform();
            } else if (propd._ID === UIElement.TriggersProperty._ID) {
                var triggers = args.OldValue;
                if (triggers) {
                    var count = triggers.GetCount();
                    for (var i = 0; i < count; i++) {
                        triggers.GetValueAt(i)._RemoveTarget(this);
                    }
                }
                triggers = args.NewValue;
                if (triggers) {
                    var count = triggers.GetCount();
                    for (var i = 0; i < count; i++) {
                        triggers.GetValueAt(i)._SetTarget(this);
                    }
                }
            } else if (propd._ID === UIElement.UseLayoutRoundingProperty._ID) {
                this._UpdateMetrics.UseLayoutRounding = args.NewValue ? 1 : 0;
                this._InvalidateMeasure();
                this._InvalidateArrange();
            } else if (propd._ID === UIElement.EffectProperty._ID) {
                var oldEffect = args.OldValue != null;
                var newEffect = args.NewValue != null;
                this._InvalidateEffect();
                if (oldEffect !== newEffect && this._IsAttached)
                    App.Instance.MainSurface._AddDirtyElement(this, _Dirty.Transform);
            } else if (useProjections && propd._ID === UIElement.ProjectionProperty._ID) {
                this._UpdateProjection();
            } else if (propd._ID === UIElement.CacheModeProperty._ID) {
                //TODO: CacheModeProperty
            }
            this.PropertyChanged.Raise(this, args);
        };
        UIElement.Instance._OnSubPropertyChanged = function (propd, sender, args) {
            if (propd._ID === UIElement.ClipProperty._ID) {
                this._InvalidateClip();
            } else if (propd._ID === UIElement.EffectProperty._ID) {
                this._InvalidateEffect();
            }
            this._OnSubPropertyChanged$DependencyObject(propd, sender, args);
        };
        UIElement.Instance._OnCollectionChanged = function (col, args) {
            if (this._PropertyHasValueNoAutoCreate(UIElement.TriggersProperty, col)) {
                if (args.IsAdd) {
                    args.NewValue._SetTarget(this);
                } else if (args.IsReplace) {
                    args.OldValue._RemoveTarget(this);
                    args.NewValue._SetTarget(this);
                } else if (args.IsRemove) {
                    args.OldValue._RemoveTarget(this);
                } else if (args.IsClearing) {
                    var count = col.GetCount();
                    for (var i = 0; i < count; i++) {
                        col.GetValueAt(i)._RemoveTarget(this);
                    }
                }
            } else if (this._PropertyHasValueNoAutoCreate(UIElement.ResourcesProperty, col)) {
                //TODO: ResourcesProperty
            } else {
                this._OnCollectionChanged$DependencyObject(col, args);
            }
        };
    }
    //#endif

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

    UIElement.Instance._EmitEvent = function (type, button, args) {
        if (type === "up") {
            if (Surface.IsLeftButton(button)) {
                //HUDUpdate("clicky", "MouseLeftButtonUp " + absolutePos.toString());
                this.MouseLeftButtonUp.Raise(this, args);
            } else if (Surface.IsRightButton(button)) {
                //HUDUpdate("clicky", "MouseRightButtonUp " + absolutePos.toString());
                this.MouseRightButtonUp.Raise(this, args);
            }
        } else if (type === "down") {
            if (Surface.IsLeftButton(button)) {
                //HUDUpdate("clicky", "MouseLeftButtonDown " + absolutePos.toString());
                this.MouseLeftButtonDown.Raise(this, args);
            } else if (Surface.IsRightButton(button)) {
                //HUDUpdate("clicky", "MouseRightButtonDown " + absolutePos.toString());
                this.MouseRightButtonDown.Raise(this, args);
            }
        } else if (type === "leave") {
            this.$SetValueInternal(UIElement.IsMouseOverProperty, false);
            this.OnMouseLeave(args);
            this.MouseLeave.Raise(this, args);
        } else if (type === "enter") {
            this.$SetValueInternal(UIElement.IsMouseOverProperty, true);
            this.OnMouseEnter(args);
            this.MouseEnter.Raise(this, args);
        } else if (type === "move") {
            this.MouseMove.Raise(this, args);
        } else if (type === "wheel") {
            this.MouseWheel.Raise(this, args);
        } else {
            return false;
        }
        return args.Handled;
    };

    UIElement.Instance.OnMouseMove = function (sender, e) { };
    UIElement.Instance.OnMouseLeftButtonDown = function (sender, e) { };
    UIElement.Instance.OnMouseLeftButtonUp = function (sender, e) { };
    UIElement.Instance.OnMouseRightButtonDown = function (sender, e) { };
    UIElement.Instance.OnMouseRightButtonUp = function (sender, e) { };
    UIElement.Instance.OnMouseEnter = function (e) { };
    UIElement.Instance.OnMouseLeave = function (e) { };
    UIElement.Instance.OnMouseWheel = function (sender, e) { };

    UIElement.Instance._EmitLostMouseCapture = function (absolutePos) {
        this.LostMouseCapture.Raise(this, new Fayde.Input.MouseEventArgs(absolutePos));
    };
    UIElement.Instance.OnLostMouseCapture = function (sender, e) { };

    //#endregion

    //#region Keyboard

    UIElement.Instance._EmitKeyDown = function (args) {
        this.OnKeyDown(args);
        this.KeyDown.Raise(this, args);
    };
    UIElement.Instance._EmitKeyUp = function (args) {
        this.OnKeyUp(args);
        this.KeyUp.Raise(this, args);
    };

    UIElement.Instance.OnKeyDown = function (args) { };
    UIElement.Instance.OnKeyUp = function (args) { };

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
        var e = new Fayde.RoutedEventArgs();
        this.OnGotFocus(e);
        this.GotFocus.Raise(this, e);
    };
    UIElement.Instance.OnGotFocus = function (e) { };

    UIElement.Instance._EmitLostFocus = function () {
        var e = new Fayde.RoutedEventArgs();
        this.OnLostFocus(e);
        this.LostFocus.Raise(this, e);
    };
    UIElement.Instance.OnLostFocus = function (e) { };

    //#endregion

    UIElement.Instance.CreateHtmlObject = function () { };
    //#if !ENABLE_CANVAS
    if (!Fayde.IsCanvasEnabled) {
        UIElement.Instance.ApplyHtmlChange = function (change) {
            //change.Property;
            //change.OldValue;
            //change.NewValue;
            var rootEl = this.GetRootHtmlElement();
            var propd = change.Property;
            if (propd._ID === UIElement.OpacityProperty._ID) {
                var contentEl = rootEl.firstChild;
                contentEl.style.opacity = change.NewValue;
                contentEl.style.filter = "alpha(opacity = " + change.NewValue * 100 + ")";
            } else if (propd._ID === UIElement.VisibilityProperty._ID) {
                if (change.NewValue === Fayde.Visibility.Collapsed) {
                    rootEl.style.display = "none";
                } else if (change.NewValue === Fayde.Visibility.Visible) {
                    rootEl.style.display = this.GetHtmlDefaultDisplay();
                }
            } else if (propd._ID === UIElement.IsHitTestVisibleProperty._ID) {
            } else if (propd._ID === UIElement.ClipProperty._ID) {
            } else if (propd._ID === UIElement.OpacityMaskProperty._ID) {
            } else if (propd._ID === UIElement.RenderTransformProperty._ID
                || propd._ID === UIElement.RenderTransformOriginProperty._ID) {
            } else if (propd._ID === UIElement.TriggersProperty._ID) {
            } else if (propd._ID === UIElement.UseLayoutRoundingProperty._ID) {
            } else if (propd._ID === UIElement.EffectProperty._ID) {
            } else if (useProjections && propd._ID === UIElement.ProjectionProperty._ID) {
            } else if (propd._ID === UIElement.CacheModeProperty._ID) {
            }
        };
        UIElement.Instance.CreateHtmlObject = function () {
            this._HtmlEl = this.CreateHtmlObjectImpl();
        };
        UIElement.Instance.CreateHtmlObjectImpl = function () {
            return null;
        };
        UIElement.Instance.GetRootHtmlElement = function () {
            if (!this._HtmlEl)
                this.CreateHtmlObject();
            return this._HtmlEl;
        };
        UIElement.Instance.OnHtmlAttached = function () {
            var subtree = this._SubtreeObject;
            if (subtree) {
                this.GetRootHtmlElement().appendChild(subtree.GetRootHtmlElement());
                subtree.OnHtmlAttached();
            }
        };
        UIElement.Instance.OnHtmlDetached = function () {
            var subtree = this._SubtreeObject;
            if (subtree) {
                subtree.OnHtmlDetached();
                this.GetRootHtmlElement().removeChild(subtree.GetRootHtmlElement());
            }
        };
        UIElement.Instance.GetHtmlDefaultDisplay = function () {
            return "";
        }

        UIElement.Instance.GetIsFixedWidth = function (child) {
            return this.IsFixedWidth;
        };
        UIElement.Instance.GetIsFixedHeight = function (child) {
            return this.IsFixedHeight;
        };
        UIElement.Instance.GetParentIsFixedWidth = function () {
            var vp = this.GetVisualParent();
            if (vp) return vp.GetIsFixedWidth(this);
            else return true;
        };
        UIElement.Instance.GetParentIsFixedHeight = function () {
            var vp = this.GetVisualParent();
            if (vp) return vp.GetIsFixedHeight(this);
            else return true;
        };
        UIElement.Instance.InvalidateChildrenFixedWidth = function () {
            var subtree = this._SubtreeObject;
            if (subtree) {
                if (subtree instanceof Fayde.InternalCollection) {
                    var len = subtree.GetCount();
                    for (var i = 0; i < len; i++) {
                        var item = subtree.GetValueAt(i);
                        item.IsFixedWidth = item.CalculateIsFixedWidth();
                    }
                } else if (subtree instanceof UIElement) {
                    subtree.IsFixedWidth = subtree.CalculateIsFixedWidth();
                }
            }
        };
        UIElement.Instance.InvalidateChildrenFixedHeight = function () {
            var subtree = this._SubtreeObject;
            if (subtree) {
                if (subtree instanceof Fayde.InternalCollection) {
                    var len = subtree.GetCount();
                    for (var i = 0; i < len; i++) {
                        var item = subtree.GetValueAt(i);
                        item.IsFixedHeight = item.CalculateIsFixedHeight();
                    }
                } else if (subtree instanceof UIElement) {
                    subtree.IsFixedHeight = subtree.CalculateIsFixedHeight();
                }
            }
        };
        UIElement.Instance.CalculateIsFixedWidth = function () { return false; };
        UIElement.Instance.CalculateIsFixedHeight = function () { return false; };
    }
    //#endif

    UIElement.Instance._IsOpacityInvisible = function () {
        return this._TotalOpacity * 255 < .5;
    };
    UIElement.Instance._IsOpacityTranslucent = function () {
        return this._TotalOpacity * 255 < 245.5;
    };

    UIElement.Instance.__DebugToString = function () {
        return this._ID + ":" + this.constructor._TypeName + ":" + this.Name;
    };

    Fayde.UIElement = Nullstone.FinishCreate(UIElement);
})(Nullstone.Namespace("Fayde"));