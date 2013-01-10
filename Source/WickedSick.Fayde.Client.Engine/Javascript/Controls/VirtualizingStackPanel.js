/// <reference path="VirtualizingPanel.js"/>
/// <reference path="Primitives/IScrollInfo.js"/>
/// CODE
/// <reference path="Enums.js"/>
/// <reference path="Primitives/ItemsChangedEventArgs.js"/>

//#region VirtualizingStackPanel
var VirtualizingStackPanel = Nullstone.Create("VirtualizingStackPanel", VirtualizingPanel, 0, [IScrollInfo]);

VirtualizingStackPanel.Instance.Init = function () {
    this.Init$VirtualizingPanel();
    this.CleanUpVirtualizedItemEvent = new MulticastEvent();

    this._CanHorizontallyScroll = false;
    this._CanVerticallyScroll = false;

    this._ExtentWidth = 0;
    this._ExtentHeight = 0;

    this._ViewportWidth = 0;
    this._ViewportHeight = 0;

    this._HorizontalOffset = 0;
    this._VerticalOffset = 0;
};

//#region Properties

VirtualizingStackPanel.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Orientation); }, VirtualizingStackPanel, Orientation.Vertical, function (d, args) { d._InvalidateMeasure(); });

Nullstone.AutoProperties(VirtualizingStackPanel, [
    VirtualizingStackPanel.OrientationProperty
]);

VirtualizingStackPanel.IsVirtualizingProperty = DependencyProperty.RegisterAttached("IsVirtualizing", function () { return Boolean; }, VirtualizingStackPanel, false);
VirtualizingStackPanel.GetIsVirtualizing = function (d) {
    ///<returns type="Boolean"></returns>
    if (d == null)
        throw new ArgumentNullException("d");
    return d.$GetValue(VirtualizingStackPanel.IsVirtualizingProperty);
};
VirtualizingStackPanel.SetIsVirtualizing = function (d, value) {
    ///<param name="value" type="Boolean"></param>
    if (d == null)
        throw new ArgumentNullException("d");
    d.$SetValue(VirtualizingStackPanel.IsVirtualizingProperty, value);
};

VirtualizingStackPanel.VirtualizationModeProperty = DependencyProperty.RegisterAttached("VirtualizationMode", function () { return new Enum(VirtualizationMode); }, VirtualizingStackPanel, VirtualizationMode.Recycling);
VirtualizingStackPanel.GetVirtualizationMode = function (d) {
    if (d == null)
        throw new ArgumentNullException("d");
    return d.$GetValue(VirtualizingStackPanel.VirtualizationModeProperty);
};
VirtualizingStackPanel.SetVirtualizationMode = function (d, value) {
    if (d == null)
        throw new ArgumentNullException("d");
    d.$SetValue(VirtualizingStackPanel.VirtualizationModeProperty, value);
};

//#endregion

//#region IScrollInfo Members

VirtualizingStackPanel.Instance.GetCanHorizontallyScroll = function () { return this._CanHorizontallyScroll; };
VirtualizingStackPanel.Instance.SetCanHorizontallyScroll = function (value) {
    this._CanHorizontallyScroll = value;
    this._InvalidateMeasure();
};

VirtualizingStackPanel.Instance.GetCanVerticallyScroll = function () { return this._CanVerticallyScroll; };
VirtualizingStackPanel.Instance.SetCanVerticallyScroll = function (value) {
    this._CanVerticallyScroll = value;
    this._InvalidateMeasure();
};

VirtualizingStackPanel.Instance.GetExtentWidth = function () { return this._ExtentWidth; };
VirtualizingStackPanel.Instance.GetExtentHeight = function () { return this._ExtentHeight; };

VirtualizingStackPanel.Instance.GetViewportWidth = function () { return this._ViewportWidth; };
VirtualizingStackPanel.Instance.GetViewportHeight = function () { return this._ViewportHeight; };

VirtualizingStackPanel.Instance.GetHorizontalOffset = function () { return this._HorizontalOffset; };
VirtualizingStackPanel.Instance.SetHorizontalOffset = function (offset) {
    if (offset < 0 || this._ViewportWidth >= this._ExtentWidth)
        offset = 0;
    else if ((offset + this._ViewportWidth) >= this._ExtentWidth)
        offset = this._ExtentWidth - this._ViewportWidth;

    if (this._HorizontalOffset === offset)
        return;
    this._HorizontalOffset = offset;

    if (this.Orientation === Orientation.Horizontal)
        this._InvalidateMeasure();
    else
        this._InvalidateArrange();

    var scrollOwner = this.GetScrollOwner();
    if (scrollOwner)
        scrollOwner._InvalidateScrollInfo();
};

VirtualizingStackPanel.Instance.GetVerticalOffset = function () { return this._VerticalOffset; };
VirtualizingStackPanel.Instance.SetVerticalOffset = function (offset) {
    if (offset < 0 || this._ViewportHeight >= this._ExtentHeight)
        offset = 0;
    else if ((offset + this._ViewportHeight) >= this._ExtentHeight)
        offset = this._ExtentHeight - this._ViewportHeight;

    if (this._VerticalOffset == offset)
        return;
    this._VerticalOffset = offset;

    if (this.Orientation === Orientation.Vertical)
        this._InvalidateMeasure();
    else
        this._InvalidateArrange();

    var scrollOwner = this.GetScrollOwner();
    if (scrollOwner)
        scrollOwner._InvalidateScrollInfo();
};

VirtualizingStackPanel.Instance.GetScrollOwner = function () { return this._ScrollOwner; };
VirtualizingStackPanel.Instance.SetScrollOwner = function (value) { this._ScrollOwner = value; };

VirtualizingStackPanel.Instance.LineUp = function () {
    if (this.Orientation === Orientation.Horizontal)
        this.SetVerticalOffset(this._VerticalOffset - VirtualizingStackPanel.LineDelta);
    else
        this.SetVerticalOffset(this._VerticalOffset - 1);
};
VirtualizingStackPanel.Instance.LineDown = function () {
    if (this.Orientation === Orientation.Horizontal)
        this.SetVerticalOffset(this._VerticalOffset + VirtualizingStackPanel.LineDelta);
    else
        this.SetVerticalOffset(this._VerticalOffset + 1);
};
VirtualizingStackPanel.Instance.LineLeft = function () {
    if (this.Orientation === Orientation.Vertical)
        this.SetHorizontalOffset(this._HorizontalOffset - VirtualizingStackPanel.LineDelta);
    else
        this.SetHorizontalOffset(this._HorizontalOffset - 1);
};
VirtualizingStackPanel.Instance.LineRight = function () {
    if (this.Orientation === Orientation.Vertical)
        this.SetHorizontalOffset(this._HorizontalOffset + VirtualizingStackPanel.LineDelta);
    else
        this.SetHorizontalOffset(this._HorizontalOffset + 1);
};

VirtualizingStackPanel.Instance.MouseWheelUp = function () {
    if (this.Orientation === Orientation.Horizontal)
        this.SetVerticalOffset(this._VerticalOffset - VirtualizingStackPanel.LineDelta * VirtualizingStackPanel.Wheelitude);
    else
        this.SetVerticalOffset(this._VerticalOffset - VirtualizingStackPanel.Wheelitude);
};
VirtualizingStackPanel.Instance.MouseWheelDown = function () {
    if (this.Orientation === Orientation.Horizontal)
        this.SetVerticalOffset(this._VerticalOffset + VirtualizingStackPanel.LineDelta * VirtualizingStackPanel.Wheelitude);
    else
        this.SetVerticalOffset(this._VerticalOffset + VirtualizingStackPanel.Wheelitude);
};
VirtualizingStackPanel.Instance.MouseWheelLeft = function () {
    if (this.Orientation === Orientation.Vertical)
        this.SetHorizontalOffset(this._HorizontalOffset - VirtualizingStackPanel.LineDelta * VirtualizingStackPanel.Wheelitude);
    else
        this.SetHorizontalOffset(this._HorizontalOffset - VirtualizingStackPanel.Wheelitude);
};
VirtualizingStackPanel.Instance.MouseWheelRight = function () {
    if (this.Orientation === Orientation.Vertical)
        this.SetHorizontalOffset(this._HorizontalOffset + VirtualizingStackPanel.LineDelta * VirtualizingStackPanel.Wheelitude);
    else
        this.SetHorizontalOffset(this._HorizontalOffset + VirtualizingStackPanel.Wheelitude);
};

VirtualizingStackPanel.Instance.PageUp = function () { this.SetVerticalOffset(this._VerticalOffset - this._ViewportHeight); };
VirtualizingStackPanel.Instance.PageDown = function () { this.SetVerticalOffset(this._VerticalOffset + this._ViewportHeight); };
VirtualizingStackPanel.Instance.PageLeft = function () { this.SetHorizontalOffset(this._HorizontalOffset - this._ViewportWidth); };
VirtualizingStackPanel.Instance.PageRight = function () { this.SetHorizontalOffset(this._HorizontalOffset + this._ViewportWidth); };

VirtualizingStackPanel.Instance.MakeVisible = function (uie, rectangle) {
    var exposed = new Rect();

    var orientation = this.Orientation;
    var children = this.Children;
    var len = children.GetCount();
    for (var i = 0; i < len; i++) {
        var child = children.GetValueAt(i);
        if (Nullstone.RefEquals(uie, child)) {
            if (orientation === Orientation.Vertical) {
                if (rectangle.X !== this._HorizontalOffset)
                    this.SetHorizontalOffset(rectangle.X);

                exposed.Width = Math.min(child.RenderSize.Width, this._ViewportWidth);
                exposed.Height = child.RenderSize.Height;
                exposed.X = this._HorizontalOffset;
            } else {
                if (rectangle.Y !== this._VerticalOffset)
                    this.SetVerticalOffset(rectangle.Y);

                exposed.Height = Math.min(child.RenderSize.Height, this._ViewportHeight);
                exposed.Width = child.RenderSize.Width;
                exposed.Y = this._VerticalOffset;
            }
            return exposed;
        }

        if (this.Orientation === Orientation.Vertical)
            exposed.Y += child.RenderSize.Height;
        else
            exposed.X += child.RenderSize.Width;
    }

    throw new ArgumentException("Visual is not a child of this Panel");
};

//#endregion

//#region Measure

VirtualizingStackPanel.Instance.MeasureOverride = function (constraint) {
    var owner = ItemsControl.GetItemsOwner(this);
    var measured = new Size(0, 0);
    var invalidate = false;
    var nvisible = 0;
    var beyond = 0;
    
    var orientation = this.Orientation;
    if (orientation === Orientation.Horizontal)
        index = this.GetHorizontalOffset();
    else
        index = this.GetVerticalOffset();

    var itemCount = owner.Items.GetCount();
    var generator = this.ItemContainerGenerator;
    if (itemCount > 0) {
        var children = this.Children;
        var childAvailable = constraint.Copy();
        if (this.GetCanHorizontallyScroll() || orientation === Orientation.Horizontal)
            childAvailable.Width = Number.POSITIVE_INFINITY;
        if (this.GetCanVerticallyScroll() || orientation === Orientation.Vertical)
            childAvailable.Height = Number.POSITIVE_INFINITY;

        var start = generator.GeneratorPositionFromIndex(index);
        var insertAt = (start.offset === 0) ? start.index : start.index + 1;

        var state = generator.StartAt(start.index, start.offset, 0, true);
        try {
            var isNewlyRealized = { Value: false };

            for (var i = 0; i < itemCount && beyond < 2; i++, insertAt++) {
                var child = generator.GenerateNext(isNewlyRealized);
                if (isNewlyRealized.Value || insertAt >= children.GetCount() || !Nullstone.RefEquals(children.GetValueAt(insertAt), child)) {
                    if (insertAt < children.GetCount())
                        this.InsertInternalChild(insertAt, child)
                    else
                        this.AddInternalChild(child);
                    generator.PrepareItemContainer(child);
                }

                child.Measure(childAvailable);
                var size = child._DesiredSize;
                nvisible++;

                if (orientation === Orientation.Vertical) {
                    measured.Width = Math.max(measured.Width, size.Width);
                    measured.Height += size.Height;

                    if (measured.Height > constraint.Height)
                        beyond++;
                } else {
                    measured.Height = Math.max(measured.Height, size.Height);
                    measured.Width += size.Width;

                    if (measured.Width > constraint.Width)
                        beyond++;
                }
            }
        } finally {
            generator.StopGeneration();
        }
    }

    VirtualizingStackPanel.SetIsVirtualizing(owner, true);

    if (nvisible > 0)
        this.RemoveUnusedContainers(index, nvisible);
    nvisible -= beyond;

    if (orientation === Orientation.Vertical) {
        if (this.GetExtentHeight() !== itemCount) {
            this._ExtentHeight = itemCount;
            invalidate = true;
        }
        if (this.GetExtentWidth() !== measured.Width) {
            this._ExtentWidth = measured.Width;
            invalidate = true;
        }
        if (this.GetViewportHeight() !== nvisible) {
            this._ViewportHeight = nvisible;
            invalidate = true;
        }
        if (this.GetViewportWidth() != constraint.Width) {
            this._ViewportWidth = constraint.Width;
            invalidate = true;
        }
    } else {
        if (this.GetExtentHeight() !== measured.Height) {
            this._ExtentHeight = measured.Height;
            invalidate = true;
        }

        if (this.GetExtentWidth() !== itemCount) {
            this._ExtentWidth = itemCount;
            invalidate = true;
        }

        if (this.GetViewportHeight() !== constraint.Height) {
            this._ViewportHeight = constraint.Height;
            invalidate = true;
        }

        if (this.GetViewportWidth() !== nvisible) {
            this._ViewportWidth = nvisible;
            invalidate = true;
        }
    }

    var scrollOwner = this.GetScrollOwner();
    if (invalidate && scrollOwner != null)
        scrollOwner._InvalidateScrollInfo();

    return measured;
};

//#endregion

//#region Arrange

VirtualizingStackPanel.Instance.ArrangeOverride = function (arrangeSize) {
    /// <param name="arrangeSize" type="Size"></param>
    var arranged = arrangeSize.Copy();
    var orientation = this.Orientation;
    if (orientation === Orientation.Vertical)
        arranged.Height = 0;
    else
        arranged.Width = 0;

    var children = this.Children;
    var len = children.GetCount();
    for (var i = 0; i < len; i++) {
        var child = children.GetValueAt(i);
        var size = child._DesiredSize;
        if (orientation === Orientation.Vertical) {
            size.Width = arrangeSize.Width;
            var childFinal = new Rect(-this.GetHorizontalOffset(), arranged.Height, size.Width, size.Height);
            if (childFinal.IsEmpty())
                childFinal = new Rect();
            child.Arrange(childFinal);
            arranged.Width = Math.max(arranged.Width, size.Width);
            arranged.Height += size.Height;
        } else {
            size.Height = arrangeSize.Height;
            var childFinal = new Rect(arranged.Width, -this.GetVerticalOffset(), size.Width, size.Height);
            if (childFinal.IsEmpty())
                childFinal = new Rect();
            child.Arrange(childFinal);
            arranged.Width += size.Width;
            arranged.Height = Math.max(arranged.Height, size.Height);
        }
    }

    if (orientation === Orientation.Vertical)
        arranged.Height = Math.max(arranged.Height, arrangeSize.Height);
    else
        arranged.Width = Math.max(arranged.Width, arrangeSize.Width);
    return arranged;
};

//#endregion

VirtualizingStackPanel.Instance.RemoveUnusedContainers = function (first, count) {
    var generator = this.ItemContainerGenerator;
    var owner = ItemsControl.GetItemsOwner(this);
    var mode = VirtualizingStackPanel.GetVirtualizationMode(this);

    var last = first + count - 1;

    var item;
    var args;

    var children = this.Children;
    var posIndex = children.GetCount() - 1;
    var posOffset = 0;
    while (posIndex >= 0) {
        item = generator.IndexFromGeneratorPosition(posIndex, posOffset);
        if (item < first || item > last) {
            args = new CleanUpVirtualizedItemEventArgs(children.GetValueAt(posIndex), owner.Items.GetValueAt(item));
            this.OnCleanUpVirtualizedItem(args);
            if (!args.Cancel) {
                this.RemoveInternalChildRange(posIndex, 1);
                if (mode === VirtualizationMode.Recycling)
                    generator.Recycle(posIndex, posOffset, 1);
                else
                    generator.Remove(posIndex, posOffset, 1);
            }
        }
        posIndex--;
    }
};
VirtualizingStackPanel.OnCleanUpVirtualizedItem = function (args) {
    this.CleanUpVirtualizedItemEvent.Raise(this, args);
};

//#region Overrides

VirtualizingStackPanel.Instance.OnClearChildren = function () {
    this.OnClearChildren$VirtualizingPanel();
    this._HorizontalOffset = 0;
    this._VerticalOffset = 0;

    this._InvalidateMeasure();

    var scrollOwner = this.GetScrollOwner();
    if (scrollOwner)
        scrollOwner._InvalidateScrollInfo();
};
VirtualizingStackPanel.Instance.OnItemsChanged = function (sender, args) {
    /// <param name="args" type="ItemsChangedEventArgs"></param>
    this.OnItemsChanged$VirtualizingPanel(sender, args);

    var generator = this.ItemContainerGenerator;
    var owner = ItemsControl.GetItemsOwner(this);
    var orientation = this.Orientation;
    
    var index;
    var offset;
    var viewable

    switch (args.Action) {
        case NotifyCollectionChangedAction.Add:
            var index = generator.IndexFromGeneratorPosition(args.Position.index, args.Position.offset);
            if (orientation === Orientation.Horizontal)
                offset = this.GetHorizontalOffset();
            else
                offset = this.GetVerticalOffset();

            if (index <= offset) {
                // items have been added earlier in the list than what is viewable
                offset += args.ItemCount;
            }

            if (orientation === Orientation.Horizontal)
                this.SetHorizontalOffset(offset);
            else
                this.SetVerticalOffset(offset);
            break;
        case NotifyCollectionChangedAction.Remove:
            index = generator.IndexFromGeneratorPosition(args.Position.index, args.Position.offset);
            if (orientation === Orientation.Horizontal) {
                offset = this.GetHorizontalOffset();
                viewable = this.GetViewportWidth();
            } else {
                offset = this.GetVerticalOffset();
                viewable = this.GetViewportHeight();
            }

            if (index < offset) {
                // items earlier in the list than what is viewable have been removed
                offset = Math.max(offset - args.ItemCount, 0);
            }

            // adjust for items removed in the current view and/or beyond the current view
            offset = Math.min(offset, owner.Items.GetCount() - viewable);
            offset = Math.max(offset, 0);

            if (orientation === Orientation.Horizontal)
                this.SetHorizontalOffset(offset);
            else
                this.SetVerticalOffset(offset);

            this.RemoveInternalChildRange(args.Position.index, args.Position.ItemUICount);
            break;
        case NotifyCollectionChangedAction.Replace:
            this.RemoveInternalChildRange(args.Position.index, args.ItemUICount);
            break;
        case NotifyCollectionChangedAction.Reset:
            break;
    }

    this._InvalidateMeasure();

    var scrollOwner = this.GetScrollOwner();
    if (scrollOwner)
        scrollOwner._InvalidateScrollInfo();
};

//#endregion

Nullstone.FinishCreate(VirtualizingStackPanel);
//#endregion