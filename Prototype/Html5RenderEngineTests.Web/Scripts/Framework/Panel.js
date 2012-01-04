/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="FrameworkElement.js" />
/// <reference path="LayoutInformation.js"/>

Panel.prototype = new FrameworkElement;
Panel.prototype.constructor = Panel;
function Panel() {
    FrameworkElement.call(this);
}

//#region DEPENDENCY PROPERTIES

Panel.BackgroundProperty = DependencyProperty.Register("Background", Panel);
Panel.prototype.GetBackground = function () {
    return this.GetValue(Panel.BackgroundProperty);
};
Panel.prototype.SetBackground = function (value) {
    this.SetValue(Panel.BackgroundProperty, value);
};

Panel._CreateChildren = {
    GetValue: function (propd, obj) {
        var col = new UIElementCollection();
        col._SetIsSecondaryParent(true);
        if (obj)
            obj._SetSubtreeObject(col);
        return col;
    }
};
Panel.ChildrenProperty = DependencyProperty.Register("Children", Panel, null, Panel._CreateChildren);
Panel.prototype.GetChildren = function () {
    return this.GetValue(Panel.ChildrenProperty);
};
Panel.prototype.SetChildren = function (value) {
    this.SetValue(Panel.ChildrenProperty, value);
};

Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemsHost", Panel, false);
Panel.prototype.GetIsItemsHost = function () {
    return this.GetValue(Panel.IsItemsHostProperty);
};
Panel.prototype.SetIsItemsHost = function (value) {
    this.SetValue(Panel.IsItemsHostProperty, value);
};

//#endregion

//#region INSTANCE METHODS

Panel.prototype.CanFindElement = function () { return this.GetBackground() != null; }
Panel.prototype.IsLayoutContainer = function () { return true; };
Panel.prototype.IsContainer = function () { return true; };
Panel.prototype._ComputeBounds = function () {
    this._Extents = this._ExtentsWithChildren = this._Bounds = this._BoundsWithChildren = new Rect();

    var walker = new _VisualTreeWalker(this, _VisualTreeWalkerDirection.Logical);
    var item;
    while (item = walker.Step()) {
        if (!item._GetRenderVisible())
            continue;
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(item._GetGlobalBounds());
    }

    if (this.GetBackground()) {
        this._Extents = new Rect(0, 0, this.GetActualWidth(), this.GetActualHeight());
        this._ExtentsWithChildren = this._ExtentsWithChildren.Union(this._Extents);
    }

    this._Bounds = this._IntersectBoundsWithClipPath(this._Extents/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteTransform);
    this._BoundsWithChildren = this._IntersectBoundsWithClipPath(this._ExtentsWithChildren/*.GrowByThickness(this._EffectPadding)*/, false); //.Transform(this._AbsoluteTransform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
Panel.prototype._GetCoverageBounds = function () {
    var background = this.GetBackground();
    if (background && background.IsOpaque())
        return this._Bounds;
    return new Rect();
};
Panel.prototype._ShiftPosition = function (point) {
    var dx = point.X - this._Bounds.X;
    var dy = point.Y - this._Bounds.Y;

    FrameworkElement.prototype._ShiftPosition.call(this, point);

    this._BoundsWithChildren.X += dx;
    this._BoundsWithChildren.Y += dy;
};
Panel.prototype._InsideObject = function (x, y) {
    if (this.GetBackground())
        return FrameworkElement.prototype._InsideObject.call(this, x, y);
    return false;
};
Panel.prototype._EmptyBackground = function () {
    return this.GetBackground() == null;
};
Panel.prototype._MeasureOverrideWithEror = function (availableSize, error) {
    Info("Panel._MeasureOverrideWithEror [" + this._TypeName + "]");
    var result = new Size(0, 0);
    return result;
};
Panel.prototype._Render = function (ctx, region) {
    var background = this.GetBackground();
    if (!background)
        return;
    var framework = new Size(this.GetActualWidth(), this.GetActualHeight());
    framework = this._ApplySizeConstraints(framework);
    if (framework.Width <= 0 || framework.Height <= 0)
        return;
    var area = new Rect(0, 0, framework.Width, framework.Height);

    if (!this._HasLayoutClip() && false/* TODO: IsIntegerTranslation */) {
        //TODO:
    } else {
        ctx.Save();
        this._RenderLayoutClip(ctx);
        ctx.Fill(area, background);
        ctx.Restore();
    }
};

Panel.prototype._ElementAdded = function (item) {
    FrameworkElement.prototype._ElementAdded.call(this, item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};
Panel.prototype._ElementRemoved = function (item) {
    FrameworkElement.prototype._ElementRemoved.call(this, item);
    if (this._IsAttached) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};

Panel.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== Panel) {
        FrameworkElement.prototype._OnPropertyChanged.call(this, args, error);
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
Panel.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property && args.Property == Panel.BackgroundProperty) {
        this._Invalidate();
    } else {
        FrameworkElement.prototype._OnSubPropertyChanged.call(this, sender, args);
    }
};
Panel.prototype._OnCollectionChanged = function (sender, args) {
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
        FrameworkElement.prototype._OnCollectionChanged.call(this, sender, args);
    }
};
Panel.prototype._OnCollectionItemChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Panel.ChildrenProperty, sender)) {
        if (args.Property == Canvas.ZIndexProperty || args.Property == Canvas.ZProperty) {
            args.Item._Invalidate();
            if (this._IsAttached) {
                App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
            }
            return;
        }
    }
    FrameworkElement.prototype._OnCollectionItemChanged.call(this, sender, args);
};
Panel.prototype._OnIsAttachedChanged = function (value) {
    FrameworkElement.prototype._OnIsAttachedChanged.call(this, value);
    if (value) {
        App.Instance.MainSurface._AddDirtyElement(this, _Dirty.ChildrenZIndices);
    }
};

//#endregion