/// <reference path="ContentPresenter.js"/>
/// CODE
/// <reference path="ScrollViewer.js"/>
/// <reference path="../Media/RectangleGeometry.js"/>
/// <reference path="Primitives/IScrollInfo.js"/>

//#region ScrollContentPresenter
var ScrollContentPresenter = Nullstone.Create("ScrollContentPresenter", ContentPresenter, null, [IScrollInfo]);

ScrollContentPresenter.Instance.Init = function () {
    this.$LineDelta = 16.0;
    this.$CachedOffset = new Point();
    this.$Viewport = new Size();
    this.$Extents = new Size();
};

//#region Properties

ScrollContentPresenter.Instance.GetScrollOwner = function () {
    ///<returns type="ScrollViewer"></returns>
    return this._ScrollOwner;
};
ScrollContentPresenter.Instance.SetScrollOwner = function (value) {
    ///<param name="value" type="ScrollViewer"></param>
    this._ScrollOwner = value;
};

ScrollContentPresenter.Instance.GetClippingRectangle = function () {
    if (!this._ClippingRectangle) {
        this._ClippingRectangle = new RectangleGeometry();
        this.SetClip(this._ClippingRectangle);
    }
    return this._ClippingRectangle;
};

ScrollContentPresenter.Instance.GetCanHorizontallyScroll = function () {
    /// <returns type="Boolean" />
    return this.$CanHorizontallyScroll;
};
ScrollContentPresenter.Instance.SetCanHorizontallyScroll = function (value) {
    /// <param name="value" type="Boolean"></param>
    this.$CanHorizontallyScroll = value;
};

ScrollContentPresenter.Instance.GetCanVerticallyScroll = function () {
    /// <returns type="Boolean" />
    return this.$CanVerticallyScroll;
};
ScrollContentPresenter.Instance.SetCanVerticallyScroll = function (value) {
    /// <param name="value" type="Boolean"></param>
    this.$CanVerticallyScroll = value;
};

ScrollContentPresenter.Instance.GetHorizontalOffset = function () {
    /// <returns type="Number" />
    return this.$HorizontalOffset;
};
ScrollContentPresenter.Instance.SetHorizontalOffset = function (value) {
    /// <param name="value" type="Number"></param>
    if (!this.GetCanHorizontallyScroll() || this.$CachedOffset.X === value)
        return;
    this.$CachedOffset.X = value;
    this._InvalidateArrange();
};

ScrollContentPresenter.Instance.GetVerticalOffset = function () {
    /// <returns type="Number" />
    return this.$VerticalOffset;
};
ScrollContentPresenter.Instance.SetVerticalOffset = function (value) {
    /// <param name="value" type="Number"></param>
    if (!this.GetCanVerticallyScroll() || this.$CachedOffset.Y === value)
        return;
    this.$CachedOffset.Y = value;
    this._InvalidateArrange();
};

//#endregion

//#region Measure

ScrollContentPresenter.Instance.MeasureOverride = function (constraint) {
    if (this.GetScrollOwner() == null || this._ContentRoot == null)
        return this._MeasureOverrideWithError(constraint, new BError());
    var ideal = new Size(
        this.SetCanHorizontallyScroll() ? Number.POSITIVE_INFINITY : constraint.Width,
        this.SetCanVerticallyScroll() ? Number.POSITIVE_INFINITY : constraint.Height);

    this._ContentRoot.Measure(ideal);
    this._UpdateExtents(constraint, this._ContentRoot._DesiredSize);

    return constraint.Min(this.$Extents);
};

//#endregion

//#region Arrange

ScrollContentPresenter.Instance.ArrangeOverride = function (arrangeSize) {
    if (this.GetScrollOwner() == null || this._ContentRoot == null)
        return this._ArrangeOverrideWithError(arrangeSize, new BError());

    if (this._ClampOffsets())
        this.GetScrollOwner().InvalidateScrollInfo();

    var desired = this._ContentRoot._DesiredSize;
    var start = new Point(-this.$HorizontalOffset, -this.$VerticalOffset);

    var ars = desired.Max(arrangeSize);
    this._ContentRoot.Arrange(new Rect(start.X, start.Y, ars.Width, ars.Height));
    this.GetClippingRectangle().SetRect(new Rect(0, 0, arrangeSize.Width, arrangeSize.Height));
    this._UpdateExtents(arrangeSize, this.$Extents);
    return arrangeSize;
};

//#endregion

ScrollContentPresenter.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentPresenter();
    var sv = Nullstone.As(this.GetTemplateOwner(), ScrollViewer);
    if (sv == null)
        return;

    var content = this.GetContent();
    var info = Nullstone.As(content, IScrollInfo);
    if (info == null) {
        var presenter = Nullstone.As(content, ItemsPresenter);
        if (presenter != null) {
            if (presenter._ElementRoot == null) {
                presenter.ApplyTemplate();
            }
            info = Nullstone.As(presenter._ElementRoot, IScrollInfo);
        }
    }
    if (!info)
        info = this;
    info.SetCanHorizontallyScroll(sv.GetHorizontalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    info.SetCanVerticallyScroll(sv.GetVerticalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    info.SetScrollOwner(sv);
    sv.SetScrollInfo(info);
    sv.InvalidateScrollInfo();
};

ScrollContentPresenter.Instance._ClampOffsets = function () {
    /// <returns type="Boolean" />
    var changed = false;
    var result = this.GetCanHorizontallyScroll() ? Math.min(this.$CachedOffset.X, this.$Extents.Width - this.$Viewport.Width) : 0;
    result = Math.max(0, result);
    if (result !== this.$HorizontalOffset) {
        this.$HorizontalOffset = result;
        changed = true;
    }

    result = this.GetCanVerticallyScroll() ? Math.min(this.$CachedOffset.Y, this.$Extents.Height - this.$Viewport.Height) : 0;
    result = Math.max(0, result);
    if (result !== this.$VerticalOffset) {
        this.$VerticalOffset = result;
        changed = true;
    }
    return changed;
};
ScrollContentPresenter.Instance._UpdateExtents = function (viewport, extents) {
    /// <param name="viewport" type="Size"></param>
    /// <param name="extents" type="Size"></param>
    var changed = !Size.Equals(this.$Viewport, viewport) || !Size.Equals(this.$Extents, extents);
    this.$Viewport = viewport;
    this.$Extents = extents;

    changed |= this._ClampOffsets();
    if (changed)
        this.GetScrollOwner().InvalidateScrollInfo();
};

//#region Line

ScrollContentPresenter.Instance.LineUp = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() + this.$LineDelta);
};
ScrollContentPresenter.Instance.LineDown = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() - this.$LineDelta);
};
ScrollContentPresenter.Instance.LineLeft = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() - this.$LineDelta);
};
ScrollContentPresenter.Instance.LineRight = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() + this.$LineDelta);
};

//#endregion

//#region Mouse Wheel

ScrollContentPresenter.Instance.MouseWheelUp = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() + this.$LineDelta);
};
ScrollContentPresenter.Instance.MouseWheelDown = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() - this.$LineDelta);
};
ScrollContentPresenter.Instance.MouseWheelLeft = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() - this.$LineDelta);
};
ScrollContentPresenter.Instance.MouseWheelRight = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() + this.$LineDelta);
};

//#endregion

//#region Page

ScrollContentPresenter.Instance.PageUp = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() - this.$Viewport.Height);
};
ScrollContentPresenter.Instance.PageDown = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() + this.$Viewport.Height);
};
ScrollContentPresenter.Instance.PageLeft = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() - this.$Viewport.Width);
};
ScrollContentPresenter.Instance.PageRight = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() + this.$Viewport.Width);
};

//#endregion

Nullstone.FinishCreate(ScrollContentPresenter);
//#endregion