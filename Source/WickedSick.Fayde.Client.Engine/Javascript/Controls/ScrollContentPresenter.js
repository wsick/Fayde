/// <reference path="ContentPresenter.js"/>
/// CODE
/// <reference path="ScrollViewer.js"/>
/// <reference path="../Media/RectangleGeometry.js"/>
/// <reference path="Primitives/IScrollInfo.js"/>
/// <reference path="Primitives/ScrollData.js"/>
/// <reference path="../Runtime/Utils.js"/>

//#region ScrollContentPresenter
var ScrollContentPresenter = Nullstone.Create("ScrollContentPresenter", ContentPresenter, null, [IScrollInfo]);

ScrollContentPresenter.Instance.Init = function () {
    this.Init$ContentPresenter();
    this.$IsClipPropertySet = false;
    this.$ScrollData = new ScrollData();
    this.$ScrollInfo = null;
};

//#region Properties

ScrollContentPresenter.Instance.GetIsScrollClient = function () {
    ///<returns type="Boolean"></returns>
    return Nullstone.RefEquals(this.$ScrollInfo, this);
};

ScrollContentPresenter.Instance.GetScrollOwner = function () {
    ///<returns type="ScrollViewer"></returns>
    if (this.GetIsScrollClient())
        return this.$ScrollData.ScrollOwner;
    return null;
};
ScrollContentPresenter.Instance.SetScrollOwner = function (value) {
    ///<param name="value" type="ScrollViewer"></param>
    if (this.GetIsScrollClient())
        this.$ScrollData.ScrollOwner = value;
};

ScrollContentPresenter.Instance.GetCanHorizontallyScroll = function () {
    /// <returns type="Boolean" />
    if (this.GetIsScrollClient())
        return this.$ScrollData.CanHorizontallyScroll;
    return false;
};
ScrollContentPresenter.Instance.SetCanHorizontallyScroll = function (value) {
    /// <param name="value" type="Boolean"></param>
    if (this.GetIsScrollClient() && this.$ScrollData.CanHorizontallyScroll !== value) {
        this.$ScrollData.CanHorizontallyScroll = value;
        this._InvalidateMeasure();
    }
};
ScrollContentPresenter.Instance.GetCanVerticallyScroll = function () {
    /// <returns type="Boolean" />
    if (this.GetIsScrollClient())
        return this.$ScrollData.CanVerticallyScroll;
    return false;
};
ScrollContentPresenter.Instance.SetCanVerticallyScroll = function (value) {
    /// <param name="value" type="Boolean"></param>
    if (this.GetIsScrollClient() && this.$ScrollData.CanVerticallyScroll !== value) {
        this.$ScrollData.CanVerticallyScroll = value;
        this._InvalidateMeasure();
    }
};

ScrollContentPresenter.Instance.GetExtentWidth = function () {
    ///<returns type="Number"></returns>
    if (this.GetIsScrollClient())
        return this.$ScrollData.Extent.Width;
    return 0;
};
ScrollContentPresenter.Instance.GetExtentHeight = function () {
    ///<returns type="Number"></returns>
    if (this.GetIsScrollClient())
        return this.$ScrollData.Extent.Height;
    return 0;
};

ScrollContentPresenter.Instance.GetHorizontalOffset = function () {
    /// <returns type="Number" />
    if (this.GetIsScrollClient())
        return this.$ScrollData.ComputedOffset.X;
    return 0;
};
ScrollContentPresenter.Instance.GetVerticalOffset = function () {
    /// <returns type="Number" />
    if (this.GetIsScrollClient())
        return this.$ScrollData.ComputedOffset.Y;
    return 0;
};

ScrollContentPresenter.Instance.GetViewportHeight = function () {
    ///<returns type="Number"></returns>
    if (this.GetIsScrollClient())
        return this.$ScrollData.Viewport.Height;
    return 0;
};
ScrollContentPresenter.Instance.GetViewportWidth = function () {
    ///<returns type="Number"></returns>
    if (this.GetIsScrollClient())
        return this.$ScrollData.Viewport.Width;
    return 0;
};

//#endregion

//#region Measure

ScrollContentPresenter.Instance.MeasureOverride = function (constraint) {
    /// <param name="constraint" type="Size"></param>
    var child;
    if (VisualTreeHelper.GetChildrenCount(this) === 0)
        child = null;
    else
        child = Nullstone.As(VisualTreeHelper.GetChild(this, 0), UIElement);

    var size = new Size(0, 0);
    if (child != null) {
        if (this.GetIsScrollClient()) {
            var size1 = constraint;
            var fe = Nullstone.As(child, FrameworkElement);
            if (this.$ScrollData.CanHorizontallyScroll || fe != null && fe.FlowDirection !== this.GetFlowDirection())
                size1.Width = Number.POSITIVE_INFINITY;
            if (this.$ScrollData.CanVerticallyScroll)
                size1.Height = Number.POSITIVE_INFINITY;

            child.Measure(size1);
            size = child.DesiredSize;
        } else {
            size = base.MeasureOverride(constraint);
        }
    }

    if (this.GetIsScrollClient())
        this._VerifyScrollData(constraint, size);

    size.Width = Math.min(constraint.Width, size.Width);
    size.Height = Math.min(constraint.Height, size.Height);
    return size;
};

//#endregion

//#region Arrange

ScrollContentPresenter.Instance.ArrangeOverride = function (arrangeSize) {
    /// <param name="arrangeSize" type="Size"></param>

    var child;
    if (this.GetTemplateOwner() != null)
        this._UpdateClip(arrangeSize);
    if (VisualTreeHelper.GetChildrenCount(this) === 0)
        child = null;
    else
        child = Nullstone.As(VisualTreeHelper.GetChild(this, 0), UIElement);

    if (this.GetIsScrollClient())
        this._VerifyScrollData(arrangeSize, this.$ScrollData.Extent);

    if (child != null) {
        var rect = new Rect(0, 0, child._DesiredSize.Width, child._DesiredSize.Height);
        if (this.GetIsScrollClient()) {
            rect.X = -this.$ScrollData.ComputedOffset.X;
            rect.Y = -this.$ScrollData.ComputedOffset.Y;
        }
        rect.Width = Math.max(rect.Width, arrangeSize.Width);
        rect.Height = Math.max(rect.Height, arrangeSize.Height);
        child.Arrange(rect);
    }
    return arrangeSize;
};

//#endregion

ScrollContentPresenter.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentPresenter();
    this._HookupScrollingComponents();
};

ScrollContentPresenter.Instance.MakeVisible = function (visual, rectangle) {
    /// <param name="visual" type="UIElement"></param>
    /// <param name="rectangle" type="Rect">Description</param>
    if (rectangle.IsEmpty() || visual == null || Nullstone.RefEquals(visual, this) || !this.IsAncestorOf(visual))
        return new Rect();

    var generalTransform = visual.TransformToVisual(this);
    var point = generalTransform.Transform(new Point(rectangle.X, rectangle.Y));
    rectangle.X = point.X;
    rectangle.Y = point.Y;
    if (!this.GetIsScrollClient())
        return rectangle;

    var rect = new Rect(this.GetHorizontalOffset(), this.GetVerticalOffset(), this.GetViewportWidth(), this.GetViewportHeight());
    rectangle.X += rect.X;
    rectangle.Y += rect.Y;
    var num = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(rect.X, rect.GetRight(), rectangle.X, rectangle.GetRight());
    var num1 = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(rect.Y, rect.GetBottom(), rectangle.Y, rectangle.GetBottom());
    this.SetHorizontalOffset(num);
    this.SetVerticalOffset(num1);
    rect.X = num;
    rect.Y = num1;
    rectangle = rectangle.Intersection(rect)
    if (!rectangle.IsEmpty()) {
        rectangle.X -= rect.X;
        rectangle.Y -= rect.Y;
    }
    return rectangle;
};

//#region Line

ScrollContentPresenter.Instance.LineUp = function () {
    if (this.GetIsScrollClient())
        this.SetVerticalOffset(this.GetVerticalOffset() + 16);
};
ScrollContentPresenter.Instance.LineDown = function () {
    if (this.GetIsScrollClient())
        this.SetVerticalOffset(this.GetVerticalOffset() - 16);
};
ScrollContentPresenter.Instance.LineLeft = function () {
    if (this.GetIsScrollClient())
        this.SetHorizontalOffset(this.GetHorizontalOffset() - 16);
};
ScrollContentPresenter.Instance.LineRight = function () {
    if (this.GetIsScrollClient())
        this.SetHorizontalOffset(this.GetHorizontalOffset() + 16);
};

//#endregion

//#region Mouse Wheel

ScrollContentPresenter.Instance.MouseWheelUp = function () {
    if (this.GetIsScrollClient())
        this.SetVerticalOffset(this.GetVerticalOffset() + 48);
};
ScrollContentPresenter.Instance.MouseWheelDown = function () {
    if (this.GetIsScrollClient())
        this.SetVerticalOffset(this.GetVerticalOffset() - 48);
};
ScrollContentPresenter.Instance.MouseWheelLeft = function () {
    if (this.GetIsScrollClient())
        this.SetHorizontalOffset(this.GetHorizontalOffset() - 48);
};
ScrollContentPresenter.Instance.MouseWheelRight = function () {
    if (this.GetIsScrollClient())
        this.SetHorizontalOffset(this.GetHorizontalOffset() + 48);
};

//#endregion

//#region Page

ScrollContentPresenter.Instance.PageUp = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() - this.GetViewportHeight());
};
ScrollContentPresenter.Instance.PageDown = function () {
    this.SetVerticalOffset(this.GetVerticalOffset() + this.GetViewportHeight());
};
ScrollContentPresenter.Instance.PageLeft = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() - this.GetViewportWidth());
};
ScrollContentPresenter.Instance.PageRight = function () {
    this.SetHorizontalOffset(this.GetHorizontalOffset() + this.GetViewportWidth());
};

//#endregion

ScrollContentPresenter.Instance.SetHorizontalOffset = function (offset) {
    if (this.GetCanHorizontallyScroll()) {
        var num = ScrollContentPresenter._ValidateInputOffset(offset);
        if (!DoubleUtil.AreClose(this.$ScrollData.Offset.X, num)) {
            this.$ScrollData.Offset.X = num;
            this._InvalidateArrange();
        }
    }
};
ScrollContentPresenter.Instance.SetVerticalOffset = function (offset) {
    if (this.GetCanVerticallyScroll()) {
        var num = ScrollContentPresenter._ValidateInputOffset(offset);
        if (!DoubleUtil.AreClose(this.$ScrollData.Offset.Y, num)) {
            this.$ScrollData.Offset.Y = num;
            this._InvalidateArrange();
        }
    }
};

ScrollContentPresenter.Instance._UpdateClip = function (arrangeSize) {
    /// <param name="arrangeSize" type="Size"></param>
    if (!this.$IsClipPropertySet) {
        this.$ClippingRectangle = new RectangleGeometry();
        this.SetClip(this.$ClippingRectangle);
        this.$IsClipPropertySet = true;
    }

    if (Nullstone.As(this.GetTemplateOwner(), ScrollViewer) == null || Nullstone.As(this.GetContent(), _TextBoxView) == null && Nullstone.As(this.GetContent(), _RichTextBoxView) == null) {
        //owned by ScrollViewer, TextBoxView, or RichTextBoxView
        this.$ClippingRectangle.SetRect(new Rect(0, 0, arrangeSize.Width, arrangeSize.Height));
    } else {
        this.$ClippingRectangle.SetRect(this._CalculateTextBoxClipRect(arrangeSize));
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

    if (richtextbox != null) {
        textWrapping = richtextbox.GetTextWrapping();
        horizontalScrollBarVisibility = richtextbox.GetHorizontalScrollBarVisibility();
    } else if (textbox != null) {
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

ScrollContentPresenter.Instance._HookupScrollingComponents = function () {
    var templatedParent = Nullstone.As(this.GetTemplateOwner(), ScrollViewer);
    if (templatedParent == null) {
        if (this.$ScrollInfo != null) {
            if (this.$ScrollInfo.GetScrollOwner() != null) {
                this.$ScrollInfo.ScrollOwner.SetScrollInfo(null);
            }
            this.$ScrollInfo.SetScrollOwner(null);
            this.$ScrollInfo = null;
            this.$ScrollData = new ScrollData();
        }
    } else {
        var content = Nullstone.As(this.GetContent(), IScrollInfo);
        if (content == null) {
            var itemsPresenter = Nullstone.As(this.GetContent(), ItemsPresenter);
            if (itemsPresenter != null) {
                itemsPresenter.ApplyTemplateInternal();
                var childrenCount = VisualTreeHelper.GetChildrenCount(itemsPresenter);
                if (childrenCount > 0) {
                    content = Nullstone.As(VisualTreeHelper.GetChild(itemsPresenter, 0), IScrollInfo);
                }
            }
        }

        if (content == null)
            content = this;

        if (!Nullstone.RefEquals(content, this.$ScrollInfo) && this.$ScrollInfo != null) {
            if (!this.GetIsScrollClient())
                this.$ScrollInfo.SetScrollOwner(null);
            else
                this.$ScrollData = new ScrollData();
        }

        if (content != null) {
            this.$ScrollInfo = content;
            content.SetScrollOwner(templatedParent);
            templatedParent.SetScrollInfo(content);
        }
    }
};
ScrollContentPresenter.Instance._VerifyScrollData = function (viewport, extent) {
    /// <param name="viewport" type="Size"></param>
    /// <param name="extent" type="Size"></param>
    var flag = Size.Equals(viewport, this.$ScrollData.Viewport);
    flag = flag && Size.Equals(extent, this.$ScrollData.Extent);
    this.$ScrollData.Viewport = viewport;
    this.$ScrollData.Extent = extent;
    flag = flag && this._CoerceOffsets(); 
    if (!flag && this.GetScrollOwner() != null) {
        this.GetScrollOwner().InvalidateScrollInfo();
    }
};
ScrollContentPresenter.Instance._CoerceOffsets = function () {
    /// <returns type="Boolean" />
    var compOffset = new Point(
        ScrollContentPresenter._CoerceOffset(this.$ScrollData.Offset.X, this.$ScrollData.Extent.Width, this.$ScrollData.Viewport.Width),
        ScrollContentPresenter._CoerceOffset(this.$ScrollData.Offset.Y, this.$ScrollData.Extent.Height, this.$ScrollData.Viewport.Height));
    var flag = PointUtil.AreClose(this.$ScrollData.ComputedOffset, compOffset);
    this.$ScrollData.ComputedOffset = compOffset;
    return flag;
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
ScrollContentPresenter._CoerceOffset = function (offset, extent, viewport) {
    offset = Math.min(offset, extent - viewport);
    if (offset < 0)
        offset = 0;
    return offset;
};
ScrollContentPresenter._ValidateInputOffset = function (offset) {
    if (!isNaN(offset))
        return Math.max(0, offset);
    throw new ArgumentException("Offset is not a number.");
};

Nullstone.FinishCreate(ScrollContentPresenter);
//#endregion