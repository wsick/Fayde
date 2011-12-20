/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="FrameworkElement.js" />

Panel.prototype = new FrameworkElement();
Panel.prototype.constructor = Panel;
function Panel() {
    FrameworkElement.call(this);
}

//////////////////////////////////////////
// DEPENDENCY PROPERTIES
//////////////////////////////////////////
Panel.BackgroundProperty = DependencyProperty.Register("Background", Panel);
Panel.prototype.GetBackground = function () {
    return this.GetValue(Panel.BackgroundProperty);
};
Panel.prototype.SetBackground = function (value) {
    this.SetValue(Panel.BackgroundProperty, value);
};

Panel.ChildrenProperty = DependencyProperty.Register("Children", Panel, Panel._CreateChildren);
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

//////////////////////////////////////////
// INSTANCE METHODS
//////////////////////////////////////////
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

    this._Bounds = UIElement._IntersectBoundsWithClipPath(this._Extents.GrowByThickness(this._EffectPadding), false); //.Transform(this._AbsoluteTransform);
    this._BoundsWithChildren = UIElement._IntersectBoundsWithClipPath(this._ExtentsWithChildren.GrowByThickness(this._EffectPadding), false); //.Transform(this._AbsoluteTransform);

    this._ComputeGlobalBounds();
    this._ComputeSurfaceBounds();
};
Panel.prototype._ShiftPosition = function (point) {
    var dx = point.X - this._Bounds.X;
    var dy = point.Y - this._Bounds.Y;

    FrameworkElement.prototype._ShiftPosition.call(this, point);

    this._BoundsWithChildren.X += dx;
    this._BoundsWithChildren.Y += dy;
};
Panel.prototype._GetCoverageBounds = function () {
    var background = this.GetBackground();
    if (background && background.IsOpaque())
        return this._Bounds;
    return new Rect();
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
    var result = new Size(0, 0);
    return result;
};
Panel.prototype._Render = function (ctx) {
};

//STATICS
Panel._CreateChildren = {
    GetValue: function (propd, obj) {
        var col = new UIElementCollection();
        col._IsSecondaryParent = true;
        if (obj)
            obj._SetSubtreeObject(col);
        return col;
    }
};