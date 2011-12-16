/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="DependencyProperty.js" />

//UIElement.ClipProperty;
//UIElement.CacheModeProperty;
//UIElement.EffectProperty;
//UIElement.ProjectionProperty;
//UIElement.IsHitTestVisibleProperty;
//UIElement.OpacityMaskProperty;
//UIElement.OpacityProperty;
//UIElement.RenderTransformOriginProperty;
//UIElement.VisibilityProperty;
UIElement.UseLayoutRoundingProperty = DependencyProperty.Register("UseLayoutRounding", UIElement);
//UIElement.AllowDropProperty;
//UIElement.CursorProperty = DependencyProperty.Register("Cursor", UIElement, CursorType.Default, null, UIElement._CoerceCursor);
//UIElement.ResourcesProperty;
//UIElement.TagProperty;
//UIElement.TriggersProperty;

UIElement.prototype = new DependencyObject();
UIElement.prototype.constructor = UIElement;
function UIElement() {
    DependencyObject.call(this);
    this._Parent = null;
    this._DesiredSize = null;
    var uie = this;
    this._DirtyFlags = {
        Measure: false,
        Arrange: false,
        Size: false,
        SetMeasureDirty: function () {
            this.Measure = true;
            if (uie.GetVisualParent())
                uie.GetVisualParent().SetMeasureDirty();
        },
        SetArrangeDirty: function () {
            this.Arrange = true;
            if (uie.GetVisualParent())
                uie.GetVisualParent().SetArrangeDirty();
        },
        SetSizeDirty: function () {
            this.Size = true;
            if (uie.GetVisualParent())
                uie.GetVisualParent().SetSizeDirty();
        }
    };
}
UIElement.prototype.GetUseLayoutRounding = function () {
    return this.GetValue(UIElement.UseLayoutRoundingProperty);
};
UIElement.prototype.SetUseLayoutRounding = function (value) {
    this.SetValue(UIElement.UseLayoutRoundingProperty, value);
};
UIElement.prototype.GetVisualParent = function () {
    return this._Parent; //UIElement
};
UIElement.prototype.IsLayoutContainer = function () {
    return false;
};
UIElement.prototype.IsContainer = function () {
    return this.IsLayoutContainer();
};
UIElement.prototype.InvalidateMeasure = function () {
    this._DirtyFlags.SetMeasureDirty();
    //TODO: Alert redraw necessary
};
UIElement.prototype.InvalidateArrange = function () {
    this._DirtyFlags.SetArrangeDirty();
    //TODO: Alert redraw necessary
};
UIElement.prototype._ComputeBounds = function () {
    AbstractMethod();
};
UIElement.prototype._DoMeasureWithError = function (error) {
    var lastSize = GetPreviousConstraint(this);
    var parent = this.GetVisualParent();
    var infinite = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

    if (!this._IsAttached && !last && !parent && this.IsLayoutContainer()) {
        last = infinite;
    }

    if (last) {
        var previousDesired = this.GetDesiredSize();
        this._MeasureWithError(last, error);
        if (previousDesired == this.GetDesiredSize())
            return;
    }

    if (parent)
        parent.InvalidateMeasure();

    this._DirtyFlags.Measure = true;
};
UIElement.prototype._MeasureWithError = function (availableSize, error) { };
UIElement.prototype._DoArrangeWithError = function (error) {
    var lastVal = this.ReadLocalValue(LayoutSlotProperty);
    var lastRect = lastVal.IsNull() ? null : lastVal.AsRect();
    var previousRenderSize = new Size();
    var parent = this.GetVisualParent();

    if (!parent) {
        var desired = new Size();
        var available = new Size();
        var surface = MainSurface;

        if (this.IsLayoutContainer()) {
            desired = this.GetDesiredSize();
            if (this._IsAttached && surface.IsTopLevel(this) && !this.GetParent()) {
                var measure = GetPreviousConstraint(this);
                if (measure)
                    desired = desired.Max(GetPreviousConstraint(this));
                else
                    desired = new Size(surface.GetWindow().GetWidth(), surface.GetWindow().GetHeight());
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
            parent.InvalidateArrange();
    }
};
UIElement.prototype._ArrangeWithError = function (finalRect, error) { };

// STATICS
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