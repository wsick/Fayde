/// <reference path="ContentPresenter.js"/>
/// CODE
/// <reference path="ScrollViewer.js"/>
/// <reference path="../Media/RectangleGeometry.js"/>
/// <reference path="Primitives/IScrollInfo.js"/>
/// <reference path="Primitives/ScrollData.js"/>
/// <reference path="../Runtime/Utils.js"/>

(function (namespace) {
    var ScrollContentPresenter = Nullstone.Create("ScrollContentPresenter", namespace.ContentPresenter, 0, [namespace.Primitives.IScrollInfo]);

    ScrollContentPresenter.Instance.Init = function () {
        this.Init$ContentPresenter();
        this.$IsClipPropertySet = false;
        this.$ScrollData = new namespace.Primitives.ScrollData();
    };

    //#region IScrollInfo Members

    Nullstone.Property(ScrollContentPresenter, "ScrollOwner", {
        get: function () { return this.$ScrollData.ScrollOwner; },
        set: function (value) { this.$ScrollData.ScrollOwner = value; }
    });
    Nullstone.Property(ScrollContentPresenter, "CanHorizontallyScroll", {
        get: function () { return this.$ScrollData.CanHorizontallyScroll; },
        set: function (value) {
            if (this.$ScrollData.CanHorizontallyScroll !== value) {
                this.$ScrollData.CanHorizontallyScroll = value;
                this._InvalidateMeasure();
            }
        }
    });
    Nullstone.Property(ScrollContentPresenter, "CanVerticallyScroll", {
        get: function () { return this.$ScrollData.CanVerticallyScroll; },
        set: function (value) {
            if (this.$ScrollData.CanVerticallyScroll !== value) {
                this.$ScrollData.CanVerticallyScroll = value;
                this._InvalidateMeasure();
            }
        }
    });
    Nullstone.Property(ScrollContentPresenter, "ExtentWidth", { get: function () { return this.$ScrollData.Extent.Width; } });
    Nullstone.Property(ScrollContentPresenter, "ExtentHeight", { get: function () { return this.$ScrollData.Extent.Height; } });
    Nullstone.Property(ScrollContentPresenter, "ViewportWidth", { get: function () { return this.$ScrollData.Viewport.Width; } });
    Nullstone.Property(ScrollContentPresenter, "ViewportHeight", { get: function () { return this.$ScrollData.Viewport.Height; } });
    Nullstone.Property(ScrollContentPresenter, "HorizontalOffset", { get: function () { return this.$ScrollData.Offset.X; } });
    Nullstone.Property(ScrollContentPresenter, "VerticalOffset", { get: function () { return this.$ScrollData.Offset.Y; } });

    ScrollContentPresenter.Instance.LineUp = function () {
        this.ChangeVerticalOffset(this.VerticalOffset - 16);
    };
    ScrollContentPresenter.Instance.LineDown = function () {
        this.ChangeVerticalOffset(this.VerticalOffset + 16);
    };
    ScrollContentPresenter.Instance.LineLeft = function () {
        this.ChangeHorizontalOffset(this.HorizontalOffset - 16);
    };
    ScrollContentPresenter.Instance.LineRight = function () {
        this.ChangeHorizontalOffset(this.HorizontalOffset + 16);
    };

    ScrollContentPresenter.Instance.MouseWheelUp = function () {
        this.ChangeVerticalOffset(this.VerticalOffset - 48);
    };
    ScrollContentPresenter.Instance.MouseWheelDown = function () {
        this.ChangeVerticalOffset(this.VerticalOffset + 48);
    };
    ScrollContentPresenter.Instance.MouseWheelLeft = function () {
        this.ChangeHorizontalOffset(this.HorizontalOffset - 48);
    };
    ScrollContentPresenter.Instance.MouseWheelRight = function () {
        this.ChangeHorizontalOffset(this.HorizontalOffset + 48);
    };

    ScrollContentPresenter.Instance.PageUp = function () {
        this.ChangeVerticalOffset(this.VerticalOffset - this.ViewportHeight);
    };
    ScrollContentPresenter.Instance.PageDown = function () {
        this.ChangeVerticalOffset(this.VerticalOffset + this.ViewportHeight);
    };
    ScrollContentPresenter.Instance.PageLeft = function () {
        this.ChangeHorizontalOffset(this.HorizontalOffset - this.ViewportWidth);
    };
    ScrollContentPresenter.Instance.PageRight = function () {
        this.ChangeHorizontalOffset(this.HorizontalOffset + this.ViewportWidth);
    };

    ScrollContentPresenter.Instance.MakeVisible = function (visual, rectangle) {
        /// <param name="visual" type="UIElement"></param>
        /// <param name="rectangle" type="rect"></param>
        if (rect.isEmpty(rectangle) || !visual || Nullstone.RefEquals(visual, this) || !this.IsAncestorOf(visual))
            return new rect();

        var generalTransform = visual.TransformToVisual(this);
        var point = generalTransform.Transform(new Point(rectangle.X, rectangle.Y));
        rectangle = rect.clone(rectangle);
        rectangle.X = point.X;
        rectangle.Y = point.Y;
        return rectangle;

        var irect = new rect();
        rect.set(irect, this.HorizontalOffset, this.VerticalOffset, this.ViewportWidth, this.ViewportHeight);
        rectangle.X += irect.X;
        rectangle.Y += irect.Y;
        var num = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(irect.X, irect.X + irect.Width, rectangle.X, rectangle.X + rectangle.Width);
        var num1 = ScrollContentPresenter._ComputeScrollOffsetWithMinimalScroll(irect.Y, irect.Y + irect.Height, rectangle.Y, rectangle.Y + rectangle.Height);
        this.ChangeHorizontalOffset(num);
        this.ChangeVerticalOffset(num1);
        irect.X = num;
        irect.Y = num1;
        rect.intersection(rectangle, irect);
        if (!rect.isEmpty(rectangle)) {
            rectangle.X -= irect.X;
            rectangle.Y -= irect.Y;
        }
        return rectangle;
    };

    //#endregion

    ScrollContentPresenter.Instance.ChangeHorizontalOffset = function (offset) {
        if (!this.CanHorizontallyScroll)
            return;
        var valid = ScrollContentPresenter._ValidateInputOffset(offset);
        if (DoubleUtil.AreClose(this.$ScrollData.Offset.X, valid))
            return;

        this.$ScrollData.CachedOffset.X = valid;
        this._InvalidateArrange();
    };
    ScrollContentPresenter.Instance.ChangeVerticalOffset = function (offset) {
        if (!this.CanVerticallyScroll)
            return;

        var valid = ScrollContentPresenter._ValidateInputOffset(offset);
        if (DoubleUtil.AreClose(this.$ScrollData.Offset.Y, valid))
            return;

        this.$ScrollData.CachedOffset.Y = valid;
        this._InvalidateArrange();
    };
    ScrollContentPresenter._ValidateInputOffset = function (offset) {
        if (!isNaN(offset)) {
            return Math.max(0, offset);
        }

        throw new ArgumentException("Offset is not a number.");
    };

    //#region Measure

    ScrollContentPresenter.Instance._MeasureOverride = function (constraint, pass) {
        /// <param name="constraint" type="size"></param>
        var scrollOwner = this.ScrollOwner;
        if (scrollOwner == null || this._ContentRoot == null)
            return this._MeasureOverride$ContentPresenter(constraint, pass);

        var ideal = size.createInfinite();
        if (!this.CanHorizontallyScroll)
            ideal.Width = constraint.Width;
        if (!this.CanVerticallyScroll)
            ideal.Height = constraint.Height;

        this._ContentRoot.Measure(ideal);
        this._UpdateExtents(constraint, this._ContentRoot._DesiredSize);

        var desired = size.clone(constraint);
        size.min(desired, this.$ScrollData.Extent);
        return desired;
    };

    //#endregion

    //#region Arrange

    ScrollContentPresenter.Instance.ArrangeOverride = function (arrangeSize) {
        /// <param name="arrangeSize" type="size"></param>
        var scrollOwner = this.ScrollOwner;
        if (!scrollOwner || !this._ContentRoot)
            return this._ArrangeOverrideWithError(arrangeSize, new BError());

        if (this._ClampOffsets())
            scrollOwner._InvalidateScrollInfo();

        var desired = this._ContentRoot._DesiredSize;
        var start = new Point(-this.HorizontalOffset, -this.VerticalOffset);

        var offerSize = size.clone(desired);
        size.max(offerSize, arrangeSize);
        var childRect = rect.fromSize(offerSize);
        childRect.X = start.X;
        childRect.Y = start.Y;
        this._ContentRoot.Arrange(childRect);
        this._UpdateClip(arrangeSize);
        this._UpdateExtents(arrangeSize, this.$ScrollData.Extent);
        return arrangeSize;
    };

    //#endregion

    ScrollContentPresenter.Instance.OnApplyTemplate = function () {
        this.OnApplyTemplate$ContentPresenter();

        var sv = Nullstone.As(this.TemplateOwner, namespace.ScrollViewer);
        if (!sv)
            return;

        var content = this.Content;
        var info = Nullstone.As(content, namespace.Primitives.IScrollInfo);
        if (!info) {
            var presenter = Nullstone.As(content, namespace.ItemsPresenter);
            if (presenter) {
                if (!presenter._ElementRoot)
                    presenter.ApplyTemplate();
                info = Nullstone.As(presenter._ElementRoot, namespace.Primitives.IScrollInfo);
            }
        }

        if (!info)
            info = this;

        info.CanHorizontallyScroll = sv.HorizontalScrollBarVisibility !== namespace.ScrollBarVisibility.Disabled;
        info.CanVerticallyScroll = sv.VerticalScrollBarVisibility !== namespace.ScrollBarVisibility.Disabled;
        info.ScrollOwner = sv;
        sv.SetScrollInfo(info);
        sv._InvalidateScrollInfo();
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
        /// <param name="viewport" type="size"></param>
        /// <param name="extents" type="size"></param>
        var changed = !size.isEqual(this.$ScrollData.Viewport, viewport)
            || !size.isEqual(this.$ScrollData.Extent, extents);
        this.$ScrollData.Viewport = viewport;
        this.$ScrollData.Extent = extents;
        changed |= this._ClampOffsets();
        if (changed)
            this.ScrollOwner._InvalidateScrollInfo();
    };
    ScrollContentPresenter.Instance._ClampOffsets = function () {
        var changed = false;

        var result = this.CanHorizontallyScroll ? Math.min(this.$ScrollData.CachedOffset.X, this.ExtentWidth - this.ViewportWidth) : 0;
        result = Math.max(0, result);
        if (!DoubleUtil.AreClose(result, this.HorizontalOffset)) {
            this.$ScrollData.Offset.X = result;
            changed = true;
        }

        result = this.CanVerticallyScroll ? Math.min(this.$ScrollData.CachedOffset.Y, this.ExtentHeight - this.ViewportHeight) : 0;
        result = Math.max(0, result);
        if (!DoubleUtil.AreClose(result, this.VerticalOffset)) {
            this.$ScrollData.Offset.Y = result;
            changed = true;
        }
        return changed;
    };
    ScrollContentPresenter.Instance._UpdateClip = function (arrangeSize) {
        /// <param name="arrangeSize" type="size"></param>
        if (!this.$IsClipPropertySet) {
            this.$ClippingRectangle = new Fayde.Media.RectangleGeometry();
            this.Clip = this.$ClippingRectangle;
            this.$IsClipPropertySet = true;
        }

        var content;
        if (this.TemplateOwner instanceof Fayde.Controls.ScrollViewer && (content = this.Content) && (content instanceof Fayde.Controls._TextBoxView || content instanceof Fayde.Controls._RichTextBoxView)) {
            //ScrollViewer inside TextBox/RichTextBox
            this.$ClippingRectangle.Rect = this._CalculateTextBoxClipRect(arrangeSize);
        } else {
            this.$ClippingRectangle.Rect = rect.fromSize(arrangeSize);
        }
    };
    ScrollContentPresenter.Instance._CalculateTextBoxClipRect = function (arrangeSize) {
        /// <param name="arrangeSize" type="size"></param>
        /// <returns type="rect" />
        var left = 0;
        var right = 0;
        var templatedParent = Nullstone.As(this.TemplateOwner, namespace.ScrollViewer);
        var width = this.$ScrollData.Extent.Width;
        var num = this.$ScrollData.Viewport.Width;
        var x = this.$ScrollData.Offset.X;
        var textbox = Nullstone.As(templatedParent.TemplateOwner, namespace.TextBox);
        var richtextbox = Nullstone.As(templatedParent.TemplateOwner, namespace.RichTextBox);
        var textWrapping = namespace.TextWrapping.NoWrap;
        var horizontalScrollBarVisibility = namespace.ScrollBarVisibility.Disabled;

        if (richtextbox) {
            textWrapping = richtextbox.TextWrapping;
            horizontalScrollBarVisibility = richtextbox.HorizontalScrollBarVisibility;
        } else if (textbox) {
            textWrapping = textbox.TextWrapping;
            horizontalScrollBarVisibility = textbox.HorizontalScrollBarVisibility;
        }

        var padding = templatedParent.Padding;
        if (textWrapping !== namespace.TextWrapping.Wrap) {
            if (num > width || x === 0)
                left = padding.Left + 1;
            if (num > width || horizontalScrollBarVisibility !== namespace.ScrollBarVisibility.Disabled && Math.abs(width - x + num) <= 1)
                right = padding.Right + 1;
        } else {
            left = padding.Left + 1;
            right = padding.Right + 1;
        }
        left = Math.max(0, left);
        right = Math.max(0, right);
        var r = new rect();
        rect.set(r, -left, 0, arrangeSize.Width + left + right, arrangeSize.Height);
        return r;
    };

    //#endregion

    namespace.ScrollContentPresenter = Nullstone.FinishCreate(ScrollContentPresenter);
})(Nullstone.Namespace("Fayde.Controls"));