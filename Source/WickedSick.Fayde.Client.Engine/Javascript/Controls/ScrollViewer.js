/// <reference path="ContentControl.js"/>
/// CODE
/// <reference path="Primitives/IScrollInfo.js"/>
/// <reference path="ScrollContentPresenter.js"/>

//#region ScrollViewer
var ScrollViewer = Nullstone.Create("ScrollViewer", ContentControl);

ScrollViewer.Instance.Init = function () {
};

//#region Dependency Properties

ScrollViewer.HorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterAttachedCore("HorizontalScrollBarVisibility", function () { return ScrollBarVisibility; }, ScrollViewer, ScrollBarVisibility.Disabled);
ScrollViewer.Instance.GetHorizontalScrollBarVisibility = function () {
    ///<returns type="ScrollBarVisibility"></returns>
    return this.GetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty);
};
ScrollViewer.Instance.SetHorizontalScrollBarVisibility = function (value) {
    ///<param name="value" type="ScrollBarVisibility"></param>
    this.SetValue(ScrollViewer.HorizontalScrollBarVisibilityProperty, value);
};

ScrollViewer.VerticalScrollBarVisibilityProperty = DependencyProperty.RegisterAttachedCore("VerticalScrollBarVisibility", function () { return ScrollBarVisibility; }, ScrollViewer, ScrollBarVisibility.Disabled);
ScrollViewer.Instance.GetVerticalScrollBarVisibility = function () {
    ///<returns type="ScrollBarVisibility"></returns>
    return this.GetValue(ScrollViewer.VerticalScrollBarVisibilityProperty);
};
ScrollViewer.Instance.SetVerticalScrollBarVisibility = function (value) {
    ///<param name="value" type="ScrollBarVisibility"></param>
    this.SetValue(ScrollViewer.VerticalScrollBarVisibilityProperty, value);
};


ScrollViewer.HorizontalOffsetProperty = DependencyProperty.RegisterReadOnlyCore("HorizontalOffset", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetHorizontalOffset = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.HorizontalOffsetProperty);
};
ScrollViewer.Instance.SetHorizontalOffset = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.HorizontalOffsetProperty, value);
};

ScrollViewer.ViewportWidthProperty = DependencyProperty.RegisterReadOnlyCore("ViewportWidth", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetViewportWidth = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.ViewportWidthProperty);
};
ScrollViewer.Instance.SetViewportWidth = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.ViewportWidthProperty, value);
};

ScrollViewer.ScrollableWidthProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableWidth", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetScrollableWidth = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.ScrollableWidthProperty);
};
ScrollViewer.Instance.SetScrollableWidth = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.ScrollableWidthProperty, value);
};

ScrollViewer.ExtentWidthProperty = DependencyProperty.RegisterReadOnlyCore("ExtentWidth", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetExtentWidth = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.ExtentWidthProperty);
};
ScrollViewer.Instance.SetExtentWidth = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.ExtentWidthProperty, value);
};

ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterReadOnlyCore("ComputedHorizontalScrollBarVisibility", function () { return Visibility; }, ScrollViewer);
ScrollViewer.Instance.GetComputedHorizontalScrollBarVisibility = function () {
    ///<returns type="Visibility"></returns>
    return this.GetValue(ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty);
};
ScrollViewer.Instance.SetComputedHorizontalScrollBarVisibility = function (value) {
    ///<param name="value" type="Visibility"></param>
    this.SetValue(ScrollViewer.ComputedHorizontalScrollBarVisibilityProperty, value);
};


ScrollViewer.VerticalOffsetProperty = DependencyProperty.RegisterReadOnlyCore("VerticalOffset", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetVerticalOffset = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.VerticalOffsetProperty);
};
ScrollViewer.Instance.SetVerticalOffset = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.VerticalOffsetProperty, value);
};

ScrollViewer.ViewportHeightProperty = DependencyProperty.RegisterReadOnlyCore("ViewportHeight", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetViewportHeight = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.ViewportHeightProperty);
};
ScrollViewer.Instance.SetViewportHeight = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.ViewportHeightProperty, value);
};

ScrollViewer.ScrollableHeightProperty = DependencyProperty.RegisterReadOnlyCore("ScrollableHeight", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetScrollableHeight = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.ScrollableHeightProperty);
};
ScrollViewer.Instance.SetScrollableHeight = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.ScrollableHeightProperty, value);
};

ScrollViewer.ExtentHeightProperty = DependencyProperty.RegisterReadOnlyCore("ExtentHeight", function () { return Number; }, ScrollViewer);
ScrollViewer.Instance.GetExtentHeight = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollViewer.ExtentHeightProperty);
};
ScrollViewer.Instance.SetExtentHeight = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollViewer.ExtentHeightProperty, value);
};

ScrollViewer.ComputedVerticalScrollBarVisibilityProperty = DependencyProperty.RegisterReadOnlyCore("ComputedVerticalScrollBarVisibility", function () { return Visibility; }, ScrollViewer);
ScrollViewer.Instance.GetComputedVerticalScrollBarVisibility = function () {
    ///<returns type="Visibility"></returns>
    return this.GetValue(ScrollViewer.ComputedVerticalScrollBarVisibilityProperty);
};
ScrollViewer.Instance.SetComputedVerticalScrollBarVisibility = function (value) {
    ///<param name="value" type="Visibility"></param>
    this.SetValue(ScrollViewer.ComputedVerticalScrollBarVisibilityProperty, value);
};

//#endregion

//#region Properties

ScrollViewer.Instance.GetScrollInfo = function () {
    ///<returns type="IScrollInfo"></returns>
    return this._ScrollInfo;
};
ScrollViewer.Instance.SetScrollInfo = function (value) {
    ///<param name="value" type="IScrollInfo"></param>
    this._ScrollInfo = value;
};

//#endregion

ScrollViewer.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ContentControl();
    this.$ElementScrollContentPresenter = Nullstone.As(this.GetTemplateChild(ScrollViewer.ElementScrollContentPresenterName), ScrollContentPresenter);
    this.$ElementHorizontalScrollBar = Nullstone.As(this.GetTemplateChild(ScrollViewer.ElementHorizontalScrollBarName), ScrollBar);
    if (this.$ElementHorizontalScrollBar != null) {
        this.$ElementHorizontalScrollBar.Scroll.Subscribe(function (sender, e) { this._HandleScroll(Orientation.Horizontal, e); }, this);
    }
    this.$ElementVerticalScrollBar = Nullstone.As(this.GetTemplateChild(ScrollViewer.ElementVerticalScrollBarName), ScrollBar);
    if (this.$ElementVerticalScrollBar != null) {
        this.$ElementVerticalScrollBar.Scroll.Subscribe(function (sender, e) { this._HandleScroll(Orientation.Vertical, e); }, this);
    }
    this._UpdateScrollBarVisibility();
};


ScrollViewer.Instance.ScrollToHorizontalOffset = function (offset) {
    this._SetScrollOffset(Orientation.Horizontal, offset);
};
ScrollViewer.Instance.ScrollToVerticalOffset = function (offset) {
    this._SetScrollOffset(Orientation.Vertical, offset);
};
ScrollViewer.Instance._ScrollInDirection = function (key) {
    var info = this.GetScrollInfo();
    if (info == null)
        return;
    switch (key) {
        case Keys.Up:
            info.LineUp();
            break;
        case Keys.Down:
            info.LineDown();
            break;
        case Keys.Left:
            info.LineLeft();
            break;
        case Keys.Right:
            info.LineRight();
            break;
    }
};
ScrollViewer.Instance._SetScrollOffset = function (orientation, value) {
    var info = this.GetScrollInfo();
    if (info == null)
        return;
    var scrollable = (orientation === Orientation.Horizontal) ? this.GetScrollableWidth() : this.GetScrollableHeight();
    var clamped = Math.min(scrollable, Math.max(value, 0));
    if (orientation === Orientation.Horizontal)
        info.SetHorizontalOffset(clamped);
    else
        info.SetVerticalOffset(clamped);
    this._UpdateScrollBar(orientation, clamped);
};
ScrollViewer.Instance._UpdateScrollBar = function (orientation, value) {
    if (orientation === Orientation.Horizontal) {
        this.SetHorizontalOffset(value);
        //this.RaiseOffsetChanged(info.GetHorizontalOffset(), AutomationOrientation.Horizontal);
    } else {
        this.SetVerticalOffset(value);
        //this.RaiseOffsetChanged(info.GetVerticalOffset(), AutomationOrientation.Vertical);
    }
};
ScrollViewer.Instance._InvalidateScrollInfo = function () {
};
ScrollViewer.Instance._UpdateScrollBarVisibility = function () {
};

Nullstone.FinishCreate(ScrollViewer);
//#endregion