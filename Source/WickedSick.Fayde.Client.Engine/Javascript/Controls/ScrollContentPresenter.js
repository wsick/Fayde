/// <reference path="ContentPresenter.js"/>
/// CODE
/// <reference path="ScrollViewer.js"/>
/// <reference path="../Media/RectangleGeometry.js"/>
/// <reference path="Primitives/IScrollInfo.js"/>
/// <reference path="Primitives/ScrollData.js"/>
/// <reference path="../Runtime/Utils.js"/>

//#region ScrollContentPresenter
var ScrollContentPresenter = Nullstone.Create("ScrollContentPresenter", ContentPresenter, 0, [IScrollInfo]);

ScrollContentPresenter.Instance.Init = function () {
    this.Init$ContentPresenter();
    this.$IsClipPropertySet = false;
    this.$ScrollData = new ScrollData();
};

//#region Properties

ScrollContentPresenter.Instance.GetScrollOwner = function () {
    ///<returns type="ScrollViewer"></returns>
    return this.$ScrollData.ScrollOwner;
};
ScrollContentPresenter.Instance.SetScrollOwner = function (value) {
    ///<param name="value" type="ScrollViewer"></param>
    this.$ScrollData.ScrollOwner = value;
};

ScrollContentPresenter.Instance.GetCanHorizontallyScroll = function () {
    /// <returns type="Boolean" />
    return this.$ScrollData.CanHorizontallyScroll;
};
ScrollContentPresenter.Instance.SetCanHorizontallyScroll = function (value) {
    /// <param name="value" type="Boolean"></param>
    if (this.$ScrollData.CanHorizontallyScroll !== value) {
        this.$ScrollData.CanHorizontallyScroll = value;
        this._InvalidateMeasure();
    }
};
ScrollContentPresenter.Instance.GetCanVerticallyScroll = function () {
    /// <returns type="Boolean" />
    return this.$ScrollData.CanVerticallyScroll;
};
ScrollContentPresenter.Instance.SetCanVerticallyScroll = function (value) {
    /// <param name="value" type="Boolean"></param>
    if (this.$ScrollData.CanVerticallyScroll !== value) {
        this.$ScrollData.CanVerticallyScroll = value;
        this._InvalidateMeasure();
    }
};

ScrollContentPresenter.Instance.GetExtentWidth = function () {
    ///<returns type="Number"></returns>
    return this.$ScrollData.Extent.Width;
};
ScrollContentPresenter.Instance.GetExtentHeight = function () {
    ///<returns type="Number"></returns>
    return this.$ScrollData.Extent.Height;
};

ScrollContentPresenter.Instance.GetHorizontalOffset = function () {
    /// <returns type="Number" />
    return this.$ScrollData.Offset.X;
};
ScrollContentPresenter.Instance.GetVerticalOffset = function () {
    /// <returns type="Number" />
    return this.$ScrollData.Offset.Y;
};

ScrollContentPresenter.Instance.GetViewportHeight = function () {
    ///<returns type="Number"></returns>
    return this.$ScrollData.Viewport.Height;
};
ScrollContentPresenter.Instance.GetViewportWidth = function () {
    ///<returns type="Number"></returns>
    return this.$ScrollData.Viewport.Width;
};

//#endregion

ScrollContentPresenter.Instance.ChangeHorizontalOffset = function (offset) {
    if (!this.GetCanHorizontallyScroll())
        return;
    var valid = ScrollContentPresenter._ValidateInputOffset(offset);
    if (DoubleUtil.AreClose(this.$ScrollData.Offset.X, valid))
        return;

    this.$ScrollData.CachedOffset.X = num;
    this._InvalidateArrange();
};
ScrollContentPresenter.Instance.ChangeVerticalOffset = function (offset) {
    if (!this.GetCanVerticallyScroll())
        return;

    var valid = ScrollContentPresenter._ValidateInputOffset(offset);
    if (DoubleUtil.AreClose(this.$ScrollData.Offset.Y, valid))
        return;

    this.$ScrollData.CachedOffset.Y = valid;
    this._InvalidateArrange();
};
ScrollContentPresenter._ValidateInputOffset = function (offset) {
    if (!isNaN(offset))
        return Math.max(0, offset);
    throw new ArgumentException("Offset is not a number.");
};

//#region Measure

ScrollContentPresenter.Instance.MeasureOverride = function (constraint) {
    /// <param name="constraint" type="Size"></param>
    var scrollOwner = this.GetScrollOwner();
    if (scrollOwner == null || this._ContentRoot == null)
        return this._MeasureOverrideWithError(constraint);

    var ideal = new Size(this.GetCanHorizontallyScroll() ? Number.POSITIVE_INFINITY : constraint.Width,
        this.GetCanVerticallyScroll() ? Number.POSITIVE_INFINITY : constraint.Height);

    this._ContentRoot.Measure(ideal);
    this._UpdateExtents(constraint, this._ContentRoot._DesiredSize);

    return constraint.Min(this.$ScrollData.Extent);
};

//#endregion

//#region Arrange

ScrollContentPresenter.Instance.ArrangeOverride = function (arrangeSize) {
    /// <param name="arrangeSize" type="Size"></param>
    var scrollOwner = this.GetScrollOwner();
    if (!scrollOwner || !this._ContentRoot)
        return this._ArrangeOverrideWithError(arrangeSize);

    if (this._ClampOffsets())
        scrollOwner._InvalidateScrollInfo();

    var desired = this._ContentRoot._DesiredSize;
    var start = new Point(-this.GetHorizontalOffset(), -this.GetVerticalOffset());

    var offerSize = desired.Max(arrangeSize);
    this._ContentRoot.Arrange(new Rect(start.X, start.Y, offerSize.Width, offerSize.Height));
    this._UpdateClip(arrangeSize);
    this._UpdateExtents(arrangeSize, this.$ScrollData.Extent);
    return arrangeSize;
};

//#endregion

ScrollContentPresenter.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentPresenter();

    var sv = Nullstone.As(this.GetTemplateOwner(), ScrollViewer);
    if (!sv)
        return;

    var content = this.GetContent();
    var info = Nullstone.As(content, IScrollInfo);
    if (!info) {
        var presenter = Nullstone.As(content, ItemsPresenter);
        if (presenter) {
            if (!presenter._ElementRoot)
                presenter.ApplyTemplate();
            info = Nullstone.As(presenter._ElementRoot, IScrollInfo);
        }
    }

    if (!info)
        info = this;

    info.SetCanHorizontallyScroll(sv.GetHorizontalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    info.SetCanVerticallyScroll(sv.GetVerticalScrollBarVisibility() !== ScrollBarVisibility.Disabled);
    info.SetScrollOwner(sv);
    sv.SetScrollInfo(info);
    sv._InvalidateScrollInfo();
};

ScrollContentPresenter.Instance.MakeVisible = function (visual, rectangle) {
    /// <param name="visual" type="UIElement"></param>
    /// <param name="rectangle" type="Rect">Description</param>
    if (rectangle.IsEmpty() || !visual || Nullstone.RefEquals(visual, this) || !this.IsAncestorOf(visual))
        return new Rect();

    var generalTransform = visual.TransformToVisual(this);
    var point = generalTransform.Transform(new Point(rectangle.X, rectangle.Y));
    rectangle.X = point.X;
    rectangle.Y = point.Y;
    return rectangle;

    var rect = new Rect(this.GetHorizontalOffset(), this.GetVerticalOffset(), this.GetViewportWidth(), this.GetViewportHeight());
    rectangle.X += rect.X;
    rectangle.Y += rect.Y;
    var num = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(rect.X, rect.GetRight(), rectangle.X, rectangle.GetRight());
    var num1 = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(rect.Y, rect.GetBottom(), rectangle.Y, rectangle.GetBottom());
    this.ChangeHorizontalOffset(num);
    this.ChangeVerticalOffset(num1);
    rect.X = num;
    rect.Y = num1;
    rectangle = rectangle.Intersection(rect)
    if (!rectangle.IsEmpty()) {
        rectangle.X -= rect.X;
        rectangle.Y -= rect.Y;
    }
    return rectangle;
};
ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll = function (topView, bottomView, topChild, bottomChild) {
    var flag = DoubleUtil.LessThan(topChild, topView) && DoubleUtil.LessThan(bottomChild, bottomView);
    var flag1 = DoubleUtil.GreaterThan(topChild, topView) && DoubleUtil.GreaterThan(bottomChild, bottomView);

    var flag4 = (bottomChild - topChild) > (bottomView - topView);
    if ((!flag || flag4) && (!flag1 || !flag4)) {
        if (flag || flag1)
            return bottomChild - bottomView - topView;
        return topView;
    }
    return topChild;
};

//#region Update/Invalidate

ScrollContentPresenter.Instance._UpdateExtents = function (viewport, extents) {
    /// <param name="viewport" type="Size"></param>
    /// <param name="extents" type="Size"></param>
    var changed = !Size.Equals(this.$ScrollData.Viewport, viewport)
        || !Size.Equals(this.$ScrollData.Extent, extents);
    this.$ScrollData.Viewport = viewport;
    this.$ScrollData.Extent = extents;
    changed |= this._ClampOffsets();
    if (changed)
        this.GetScrollOwner()._InvalidateScrollInfo();
};
ScrollContentPresenter.Instance._ClampOffsets = function () {
    var changed = false;

    var result = this.GetCanHorizontallyScroll() ? Math.min(this.$ScrollData.CachedOffset.X, this.GetExtentWidth() - this.GetViewportWidth()) : 0;
    result = Math.max(0, result);
    if (!DoubleUtil.AreClose(result, this.GetHorizontalOffset())) {
        this.$ScrollData.Offset.X = result;
        changed = true;
    }

    result = this.GetCanVerticallyScroll() ? Math.min(this.$ScrollData.CachedOffset.Y, this.GetExtentHeight() - this.GetViewportHeight()) : 0;
    result = Math.max(0, result);
    if (!DoubleUtil.AreClose(result, this.GetVerticalOffset())) {
        this.$ScrollData.Offset.Y = result;
        changed = true;
    }
    return changed;
};
ScrollContentPresenter.Instance._UpdateClip = function (arrangeSize) {
    /// <param name="arrangeSize" type="Size"></param>
    if (!this.$IsClipPropertySet) {
        this.$ClippingRectangle = new RectangleGeometry();
        this.SetClip(this.$ClippingRectangle);
        this.$IsClipPropertySet = true;
    }

    var content;
    if (Nullstone.Is(this.GetTemplateOwner(), ScrollViewer) && (content = this.GetContent()) && (Nullstone.Is(content, _TextBoxView) || Nullstone.Is(content, _RichTextBoxView))) {
        //ScrollViewer inside TextBox/RichTextBox
        this.$ClippingRectangle.SetRect(this._CalculateTextBoxClipRect(arrangeSize));
    } else {
        this.$ClippingRectangle.SetRect(new Rect(0, 0, arrangeSize.Width, arrangeSize.Height));
    }
};
ScrollContentPresenter.Instance._CalculateTextBoxClipRect = function (arrangeSize) {
    /// <param name="arrangeSize" type="Size"></param>
    /// <returns type="Rect" />
    var left = 0;
    var right = 0;
    var templatedParent = Nullstone.As(this.GetTemplateOwner(), ScrollViewer);
    var width = this.$ScrollData.Extent.Width;
    var num = this.$ScrollData.Viewport.Width;
    var x = this.$ScrollData.Offset.X;
    var textbox = Nullstone.As(templatedParent.GetTemplateOwner(), TextBox);
    var richtextbox = Nullstone.As(templatedParent.GetTemplateOwner(), RichTextBox);
    var textWrapping = TextWrapping.NoWrap;
    var horizontalScrollBarVisibility = ScrollBarVisibility.Disabled;

    if (richtextbox) {
        textWrapping = richtextbox.GetTextWrapping();
        horizontalScrollBarVisibility = richtextbox.GetHorizontalScrollBarVisibility();
    } else if (textbox) {
        textWrapping = textbox.GetTextWrapping();
        horizontalScrollBarVisibility = textbox.GetHorizontalScrollBarVisibility();
    }

    var padding = templatedParent.GetPadding();
    if (textWrapping !== TextWrapping.Wrap) {
        if (num > width || x === 0)
            left = padding.Left + 1;
        if (num > width || horizontalScrollBarVisibility !== ScrollBarVisibility.Disabled && Math.abs(width - x + num) <= 1)
            right = padding.Right + 1;
    } else {
        left = padding.Left + 1;
        right = padding.Right + 1;
    }
    left = Math.max(0, left);
    right = Math.max(0, right);
    return new Rect(-left, 0, arrangeSize.Width + left + right, arrangeSize.Height);
};

//#endregion

//#region Line

ScrollContentPresenter.Instance.LineUp = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() + 16);
};
ScrollContentPresenter.Instance.LineDown = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() - 16);
};
ScrollContentPresenter.Instance.LineLeft = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() - 16);
};
ScrollContentPresenter.Instance.LineRight = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() + 16);
};

//#endregion

//#region Mouse Wheel

ScrollContentPresenter.Instance.MouseWheelUp = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() + 48);
};
ScrollContentPresenter.Instance.MouseWheelDown = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() - 48);
};
ScrollContentPresenter.Instance.MouseWheelLeft = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() - 48);
};
ScrollContentPresenter.Instance.MouseWheelRight = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() + 48);
};

//#endregion

//#region Page

ScrollContentPresenter.Instance.PageUp = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() - this.GetViewportHeight());
};
ScrollContentPresenter.Instance.PageDown = function () {
    this.ChangeVerticalOffset(this.GetVerticalOffset() + this.GetViewportHeight());
};
ScrollContentPresenter.Instance.PageLeft = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() - this.GetViewportWidth());
};
ScrollContentPresenter.Instance.PageRight = function () {
    this.ChangeHorizontalOffset(this.GetHorizontalOffset() + this.GetViewportWidth());
};

//#endregion

Nullstone.FinishCreate(ScrollContentPresenter);
//#endregion