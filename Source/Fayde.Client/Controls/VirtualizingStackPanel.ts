/// <reference path="VirtualizingPanel.ts" />

module Fayde.Controls {
    var LineDelta = 14.7;
    var Wheelitude = 3;

    export class VirtualizingStackPanel extends VirtualizingPanel implements Primitives.IScrollInfo {
        private _CanHorizontallyScroll: boolean = false;
        private _CanVerticallyScroll: boolean = false;
        private _HorizontalOffset: number = 0;
        private _VerticalOffset: number = 0;
        private _ExtentWidth: number = 0;
        private _ExtentHeight: number = 0;
        private _ViewportWidth: number = 0;
        private _ViewportHeight: number = 0;

        ScrollOwner: ScrollViewer;
        get CanHorizontallyScroll() { return this._CanHorizontallyScroll; }
        set CanHorizontallyScroll(value: boolean) { this._CanHorizontallyScroll = value; this.XamlNode.LayoutUpdater.InvalidateMeasure(); }
        get CanVerticallyScroll() { return this._CanVerticallyScroll; }
        set CanVerticallyScroll(value: boolean) { this._CanVerticallyScroll = value; this.XamlNode.LayoutUpdater.InvalidateMeasure(); }
        get ExtentWidth() { return this._ExtentWidth; }
        get ExtentHeight() { return this._ExtentHeight; }
        get ViewportWidth() { return this._ViewportWidth; }
        get ViewportHeight() { return this._ViewportHeight; }
        get HorizontalOffset() { return this._HorizontalOffset; }
        get VerticalOffset() { return this._VerticalOffset; }
        LineUp(): boolean {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(this._VerticalOffset - LineDelta);
            return this.SetVerticalOffset(this._VerticalOffset - 1);
        }
        LineDown(): boolean {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(this._VerticalOffset + LineDelta);
            return this.SetVerticalOffset(this._VerticalOffset + 1);
        }
        LineLeft(): boolean {
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(this._HorizontalOffset - LineDelta);
            return this.SetHorizontalOffset(this._HorizontalOffset - 1);
        }
        LineRight(): boolean {
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(this._HorizontalOffset + LineDelta);
            return this.SetHorizontalOffset(this._HorizontalOffset + 1);
        }
        MouseWheelUp(): boolean {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(this._VerticalOffset - LineDelta * Wheelitude);
            return this.SetVerticalOffset(this._VerticalOffset - Wheelitude);
        }
        MouseWheelDown(): boolean {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(this._VerticalOffset + LineDelta * Wheelitude);
            return this.SetVerticalOffset(this._VerticalOffset + Wheelitude);
        }
        MouseWheelLeft(): boolean {
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(this._HorizontalOffset - LineDelta * Wheelitude);
            return this.SetHorizontalOffset(this._HorizontalOffset - Wheelitude);
        }
        MouseWheelRight(): boolean {
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(this._HorizontalOffset + LineDelta * Wheelitude);
            return this.SetHorizontalOffset(this._HorizontalOffset + Wheelitude);
        }
        PageUp(): boolean { return this.SetVerticalOffset(this._VerticalOffset - this._ViewportHeight); }
        PageDown(): boolean { return this.SetVerticalOffset(this._VerticalOffset + this._ViewportHeight); }
        PageLeft(): boolean { return this.SetHorizontalOffset(this._HorizontalOffset - this._ViewportWidth); }
        PageRight(): boolean { return this.SetHorizontalOffset(this._HorizontalOffset + this._ViewportWidth); }
        MakeVisible(uie: UIElement, rectangle: rect): rect {
            var exposed = new rect();

            var uin = uie.XamlNode;
            var isVertical = this.Orientation === Orientation.Vertical;
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var child = enumerator.Current;
                var childNode = child.XamlNode;
                var childRenderSize = childNode.LayoutUpdater.RenderSize;
                if (uin === childNode) {
                    if (isVertical) {
                        if (rectangle.X !== this._HorizontalOffset)
                            this.SetHorizontalOffset(rectangle.X);

                        exposed.Width = Math.min(childRenderSize.Width, this._ViewportWidth);
                        exposed.Height = childRenderSize.Height;
                        exposed.X = this._HorizontalOffset;
                    } else {
                        if (rectangle.Y !== this._VerticalOffset)
                            this.SetVerticalOffset(rectangle.Y);

                        exposed.Height = Math.min(childRenderSize.Height, this._ViewportHeight);
                        exposed.Width = childRenderSize.Width;
                        exposed.Y = this._VerticalOffset;
                    }
                    return exposed;
                }

                if (isVertical)
                    exposed.Y += childRenderSize.Height;
                else
                    exposed.X += childRenderSize.Width;
            }

            throw new ArgumentException("Visual is not a child of this Panel");
        }
        SetHorizontalOffset(offset: number): boolean {
            if (offset < 0 || this._ViewportWidth >= this._ExtentWidth)
                offset = 0;
            else if ((offset + this._ViewportWidth) >= this._ExtentWidth)
                offset = this._ExtentWidth - this._ViewportWidth;

            if (this._HorizontalOffset === offset)
                return false;
            this._HorizontalOffset = offset;

            if (this.Orientation === Fayde.Orientation.Horizontal)
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            else
                this.XamlNode.LayoutUpdater.InvalidateArrange();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner)
                scrollOwner.InvalidateScrollInfo();
            return true;
        }
        SetVerticalOffset(offset: number): boolean {
            if (offset < 0 || this._ViewportHeight >= this._ExtentHeight)
                offset = 0;
            else if ((offset + this._ViewportHeight) >= this._ExtentHeight)
                offset = this._ExtentHeight - this._ViewportHeight;

            if (this._VerticalOffset === offset)
                return false;
            this._VerticalOffset = offset;

            if (this.Orientation === Fayde.Orientation.Vertical)
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            else
                this.XamlNode.LayoutUpdater.InvalidateArrange();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner)
                scrollOwner.InvalidateScrollInfo();
            return true;
        }

        static OrientationProperty: DependencyProperty = DependencyProperty.Register("Orientation", () => new Enum(Orientation), VirtualizingStackPanel, Orientation.Vertical, (d, args) => (<UIElement>d).XamlNode.LayoutUpdater.InvalidateMeasure());
        Orientation: Orientation;

        MeasureOverride(availableSize: size): size {
            var index: number;
            var constraint = availableSize.Clone();
            var scrollOwner = this.ScrollOwner;
            var isHorizontal = this.Orientation === Orientation.Horizontal;
            if (isHorizontal) {
                if (scrollOwner && this._CanVerticallyScroll)
                    constraint.Height = Number.POSITIVE_INFINITY;
                index = Math.floor(this._HorizontalOffset);
            } else {
                if (scrollOwner && this._CanHorizontallyScroll)
                    constraint.Width = Number.POSITIVE_INFINITY;
                index = Math.floor(this._VerticalOffset);
            }

            var measured = new size();
            var viscount = 0;
            var ic = this.ItemsControl;
            var count = ic.Items.Count;
            var icm = ic.ItemContainersManager;
            for (var children = this.Children, generator = icm.CreateGenerator(index, count); generator.Generate();) {
                var child = <UIElement>generator.Current;
                if (generator.IsCurrentNew) {
                    children.Insert(generator.GenerateIndex, child);
                    ic.PrepareContainerForItem(child, generator.CurrentItem);
                }
                viscount++;

                child.Measure(size.copyTo(constraint));
                var desired = child.DesiredSize;

                if (!isHorizontal) {
                    measured.Width = Math.max(measured.Width, desired.Width);
                    measured.Height += desired.Height;
                    if (measured.Height > availableSize.Height)
                        break;
                } else {
                    measured.Height = Math.max(measured.Height, desired.Height);
                    measured.Width += desired.Width;
                    if (measured.Width > availableSize.Width)
                        break;
                }
            }
            icm.DisposeContainers(0, index);
            icm.DisposeContainers(index + viscount, count - (index + viscount));

            var invalidate = false;
            if (!isHorizontal) {
                invalidate = this._ExtentHeight !== count
                || this._ExtentWidth !== measured.Width
                || this._ViewportHeight !== viscount
                || this._ViewportWidth !== constraint.Width;
                this._ExtentHeight = count;
                this._ExtentWidth = measured.Width;
                this._ViewportHeight = viscount;
                this._ViewportWidth = constraint.Width;
            } else {
                invalidate = this._ExtentHeight !== measured.Height
                || this._ExtentWidth !== count
                || this._ViewportHeight !== constraint.Height
                || this._ViewportWidth !== viscount;
                this._ExtentHeight = measured.Height;
                this._ExtentWidth = count;
                this._ViewportHeight = constraint.Height;
                this._ViewportWidth = viscount;
            }

            if (invalidate && scrollOwner != null)
                scrollOwner.InvalidateScrollInfo();

            return measured;
        }
        ArrangeOverride(finalSize: size): size {
            var arranged = size.copyTo(finalSize);
            var isHorizontal = this.Orientation === Orientation.Horizontal;
            if (!isHorizontal)
                arranged.Height = 0;
            else
                arranged.Width = 0;

            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var child = enumerator.Current;
                var desired = child.DesiredSize;
                if (!isHorizontal) {
                    desired.Width = finalSize.Width;
                    var childFinal = rect.fromSize(desired);
                    if (rect.isEmpty(childFinal)) {
                        rect.clear(childFinal);
                    } else {
                        childFinal.X = -this._HorizontalOffset;
                        childFinal.Y = arranged.Height;
                    }
                    child.Arrange(childFinal);
                    arranged.Width = Math.max(arranged.Width, desired.Width);
                    arranged.Height += desired.Height;
                } else {
                    desired.Height = finalSize.Height;
                    var childFinal = rect.fromSize(desired);
                    if (rect.isEmpty(childFinal)) {
                        rect.clear(childFinal);
                    } else {
                        childFinal.X = arranged.Width;
                        childFinal.Y = -this._VerticalOffset;
                    }
                    child.Arrange(childFinal);
                    arranged.Width += desired.Width;
                    arranged.Height = Math.max(arranged.Height, desired.Height);
                }
            }

            if (!isHorizontal)
                arranged.Height = Math.max(arranged.Height, finalSize.Height);
            else
                arranged.Width = Math.max(arranged.Width, finalSize.Width);
            return arranged;
        }

        OnItemsAdded(index: number, newItems: any[]) {
            super.OnItemsAdded(index, newItems);

            var isHorizontal = this.Orientation === Orientation.Horizontal;
            var offset = isHorizontal ? this.HorizontalOffset : this.VerticalOffset;
            if (index <= offset)
                isHorizontal ? this.SetHorizontalOffset(offset + newItems.length) : this.SetVerticalOffset(offset + newItems.length);

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner)
                scrollOwner.InvalidateScrollInfo();
        }
        OnItemsRemoved(index: number, oldItems: any[]) {
            super.OnItemsRemoved(index, oldItems);

            var isHorizontal = this.Orientation === Orientation.Horizontal;
            var offset = isHorizontal ? this.HorizontalOffset : this.VerticalOffset;

            var numBeforeOffset = Math.min(offset, index + oldItems.length) - index;
            if (numBeforeOffset > 0)
                isHorizontal ? this.SetHorizontalOffset(numBeforeOffset) : this.SetVerticalOffset(numBeforeOffset);

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner)
                scrollOwner.InvalidateScrollInfo();
        }
    }
    Fayde.RegisterType(VirtualizingStackPanel, "Fayde.Controls", Fayde.XMLNS);
    Fayde.RegisterTypeInterfaces(VirtualizingStackPanel, Primitives.IScrollInfo_);
}