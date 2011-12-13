/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />

function UIElement() {
    DependencyObject.apply(this);
    this._Parent = null;
    this._DesiredSize = null;
    this._DirtyFlags = {
        Measure: false,
        Arrange: false,
        Size: false,
        SetMeasureDirty: function () {
            this.Measure = true;
            if (this.GetVisualParent())
                this.GetVisualParent().SetMeasureDirty();
        },
        SetArrangeDirty: function () {
            this.Arrange = true;
            if (this.GetVisualParent())
                this.GetVisualParent().SetArrangeDirty();
        },
        SetSizeDirty: function () {
            this.Size = true;
            if (this.GetVisualParent())
                this.GetVisualParent().SetSizeDirty();
        }
    };
    this.GetDesiredSize = function () {
        return this._DesiredSize;
    };
    this.SetDesiredSize = function (value) {
        this._DesiredSize = value;
    };
    this.GetUseLayoutRounding = function () {
        return this.UseLayoutRounding; //bool
    };
    this.SetUseLayoutRounding = function (value) {
        this.UseLayoutRounding = value;
    };
    this.GetVisualParent = function () {
        return this._Parent; //UIElement
    };
    this.IsLayoutContainer = function () {
        return false;
    };
    this.IsContainer = function () {
        return this.IsLayoutContainer();
    };
    this.InvalidateMeasure = function () {
        this._DirtyFlags.SetMeasureDirty();
        //TODO: Alert redraw necessary
    };
    this.InvalidateArrange = function () {
        this._DirtyFlags.SetArrangeDirty();
        //TODO: Alert redraw necessary
    };
    this._GetVisualTreeWalker = function () {
    };
    this._GetSubtreeExtents = function () {
        return this._Extents;
    };
    this._ComputeBounds = function () {
        AbstractMethod();
    };
    this._DoMeasureWithError = function (error) {
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
    this._MeasureWithError = function (availableSize, error) { };
    this._DoArrangeWithError = function (error) {
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
    this._ArrangeWithError = function (finalRect, error) { };
}
UIElement.prototype = new DependencyObject();