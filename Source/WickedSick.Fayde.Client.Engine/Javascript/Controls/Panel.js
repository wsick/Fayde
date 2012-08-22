/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js" />
/// CODE
/// <reference path="../Primitives/Brush.js"/>

//#region Panel
var Panel = Nullstone.Create("Panel", FrameworkElement);

//#region Dependency Properties

Panel.BackgroundProperty = DependencyProperty.Register("Background", function () { return Brush; }, Panel);
Panel._CreateChildren = {
    GetValue: function (propd, obj) {
        var col = new UIElementCollection();
        col._SetIsSecondaryParent(true);
        if (obj)
            obj._SetSubtreeObject(col);
        return col;
    }
};
Panel.ChildrenProperty = DependencyProperty.RegisterFull("Children", function () { return UIElementCollection; }, Panel, undefined, Panel._CreateChildren);
Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemsHost", function () { return Boolean; }, Panel, false);

Nullstone.AutoProperties(Panel, [
    Panel.BackgroundProperty,
    Panel.ChildrenProperty,
    Panel.IsItemsHostProperty
]);

//#endregion

//#region Instance Methods

Panel.Instance.IsLayoutContainer = function () { return true; };
Panel.Instance.IsContainer = function () { return true; };
Panel.Instance._ComputeBounds = function () {
    this._Extents = this._ExtentsWithChildren = this._Bounds = this._BoundsWithChildren = new Rect();

    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.Logical);
    var item;
    while (item = walker.Step()) {
        if (!item._GetRenderVisible())
            continue;
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
    }

    if (this.Background) {
        this._Extents = new Rect(0, 0, this.ActualWidth, this.ActualHeight);
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(this._Extents);
    }

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents.GrowByThickness(this._EffectPadding), false).Transform(this._AbsoluteXform);
    this._BoundsWithChildren = this._IntersectBoundsWithClipPath(this._ExtentsWithChildren.GrowByThickness(this._EffectPadding), false).Transform(this._AbsoluteXform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
Panel.Instance._GetCoverageBounds = function () {
    var background = this.Background;
    if (background && background.IsOpaque())
        return this._Bounds;
    return new Rect();
};
Panel.Instance._ShiftPosition = function (point) {
    var dx = point.X - this._Bounds.X;
    var dy = point.Y - this._Bounds.Y;

    this._ShiftPosition$FrameworkElement(point);

    this._BoundsWithChildren.X += dx;
    this._BoundsWithChildren.Y += dy;
};
Panel.Instance._EmptyBackground = function () {
    return this.Background == null;
};
Panel.Instance._MeasureOverrideWithError = function (availableSize, error) {
    Info("Panel._MeasureOverrideWithError [" + this._TypeName + "]");
    var result = new Size(0, 0);
    return result;
};
Panel.Instance._Render = function (ctx, region) {
    /// <param name="ctx" type="_RenderContext"></param>
    var background = this.Background;
    if (!background)
        return;
    var framework = new Size(this.ActualWidth, this.ActualHeight);
    framework = this._ApplySizeConstraints(framework);
    if (framework.Width <= 0 || framework.Height <= 0)
        return;
    var area = new Rect(0, 0, framework.Width, framework.Height);

    ctx.Save();
    this._RenderLayoutClip(ctx);
    ctx.FillRect(background, area);
    ctx.Restore();
};

Panel.Instance._CanFindElement = function () { return this.Background != null; }
Panel.Instance._InsideObject = function (ctx, x, y) {
    if (this.Background)
        return this._InsideObject$FrameworkElement(ctx, x, y);
    return false;
};

Panel.Instance._ElementAdded = function (item) {
    this._ElementAdded$FrameworkElement(item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};
Panel.Instance._ElementRemoved = function (item) {
    this._ElementRemoved$FrameworkElement(item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};

Panel.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Panel) {
        this._OnPropertyChanged$FrameworkElement(args, error);
        return;
    }
    if (args.Property == Panel.BackgroundProperty) {
        this._UpdateBounds();
        this._Invalidate();
    } else if (args.Property == Panel.ChildrenProperty) {
        var collection;
        var count;
        var i;
        this._SetSubtreeObject(args.NewValue ? args.NewValue : null);
        if (args.OldValue) {
            collection = args.OldValue;
            count = collection.GetCount();
            for (i = 0; i < count; i++) {
                this._ElementRemoved(collection.GetValueAt(i));
            }
        }
        if (args.NewValue) {
            collection = args.NewValue;
            count = collection.GetCount();
            for (i = 0; i < count; i++) {
                this._ElementAdded(collection.GetValueAt(i));
            }
        }
        this._UpdateBounds();
    }
    this.PropertyChanged.Raise(this, args);
};
Panel.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd && propd._ID === Panel.BackgroundProperty._ID) {
        this._Invalidate();
    } else {
        this._OnSubPropertyChanged$FrameworkElement(propd, sender, args);
    }
};
Panel.Instance._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        var error = new BError();
        switch (args.Action) {
            case CollectionChangedArgs.Action.Replace:
                if (args.OldValue instanceof FrameworkElement)
                    args.OldValue._SetLogicalParent(null, error);
                this._ElementRemoved(args.OldValue);
                //NOTE: falls into add on purpose
            case CollectionChangedArgs.Action.Add:
                if (args.NewValue instanceof FrameworkElement)
                    args.NewValue._SetLogicalParent(this, error);
                this._ElementAdded(args.NewValue);
                break;
            case CollectionChangedArgs.Action.Remove:
                if (args.OldValue instanceof FrameworkElement)
                    args.OldValue._SetLogicalParent(null, error);
                this._ElementRemoved(args.OldValue);
                break;
            case CollectionChangedArgs.Action.Clearing:
                break;
            case CollectionChangedArgs.Action.Cleared:
                break;
        }
    } else {
        this._OnCollectionChanged$FrameworkElement(sender, args);
    }
};
Panel.Instance._OnCollectionItemChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        if (args.Property._ID === Canvas.ZIndexProperty._ID || args.Property._ID === Canvas.ZProperty._ID) {
            args.Item._Invalidate();
            if (this._IsAttached) {
                App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
            }
            return;
        }
    }
    this._OnCollectionItemChanged$FrameworkElement(sender, args);
};
Panel.Instance._OnIsAttachedChanged = function (value) {
    this._OnIsAttachedChanged$FrameworkElement(value);
    if (value) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};

//#endregion

//#region Annotations

Panel.Annotations = {
    ContentProperty: Panel.ChildrenProperty
};

//#endregion

Nullstone.FinishCreate(Panel);
//#endregion