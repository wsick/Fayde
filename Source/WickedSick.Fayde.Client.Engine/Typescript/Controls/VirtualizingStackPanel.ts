/// <reference path="VirtualizingPanel.ts" />
/// CODE
/// <reference path="ScrollViewer.ts" />
/// <reference path="Primitives/IScrollInfo.ts" />

module Fayde.Controls {
    var LineDelta = 14.7;
    var Wheelitude = 3;

    export enum VirtualizationMode {
        Standard = 0,
        Recycling = 1,
    }
    export interface ICancelable {
        Cancel: bool;
    }

    export class CleanUpVirtualizedItemEventArgs extends RoutedEventArgs implements ICancelable {
        Cancel: bool = false;
        constructor(public UIElement: UIElement, public Value: any) {
            super();
        }
    }

    export class VirtualizingStackPanel extends VirtualizingPanel implements Primitives.IScrollInfo, IMeasurableHidden, IArrangeableHidden {
        private _CanHorizontallyScroll: bool = false;
        private _CanVerticallyScroll: bool = false;
        private _HorizontalOffset: number = 0;
        private _VerticalOffset: number = 0;
        private _ExtentWidth: number = 0;
        private _ExtentHeight: number = 0;
        private _ViewportWidth: number = 0;
        private _ViewportHeight: number = 0;
        
        ScrollOwner: ScrollViewer;
        get CanHorizontallyScroll() { return this._CanHorizontallyScroll; }
        set CanHorizontallyScroll(value: bool) { this._CanHorizontallyScroll = value; this.XamlNode.LayoutUpdater.InvalidateMeasure(); }
        get CanVerticallyScroll() { return this._CanVerticallyScroll; }
        set CanVerticallyScroll(value: bool) { this._CanVerticallyScroll = value; this.XamlNode.LayoutUpdater.InvalidateMeasure(); }
        get ExtentWidth() { return this._ExtentWidth; }
        get ExtentHeight() { return this._ExtentHeight; }
        get ViewportWidth() { return this._ViewportWidth; }
        get ViewportHeight() { return this._ViewportHeight; }
        get HorizontalOffset() { return this._HorizontalOffset; }
        get VerticalOffset() { return this._VerticalOffset; }
        LineUp() {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                this.SetVerticalOffset(this._VerticalOffset - LineDelta);
            else
                this.SetVerticalOffset(this._VerticalOffset - 1);
        }
        LineDown() {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                this.SetVerticalOffset(this._VerticalOffset + LineDelta);
            else
                this.SetVerticalOffset(this._VerticalOffset + 1);
        }
        LineLeft() {
            if (this.Orientation === Fayde.Orientation.Vertical)
                this.SetHorizontalOffset(this._HorizontalOffset - LineDelta);
            else
                this.SetHorizontalOffset(this._HorizontalOffset - 1);
        };
        LineRight() {
            if (this.Orientation === Fayde.Orientation.Vertical)
                this.SetHorizontalOffset(this._HorizontalOffset + LineDelta);
            else
                this.SetHorizontalOffset(this._HorizontalOffset + 1);
        }
        MouseWheelUp() {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                this.SetVerticalOffset(this._VerticalOffset - LineDelta * Wheelitude);
            else
                this.SetVerticalOffset(this._VerticalOffset - Wheelitude);
        }
        MouseWheelDown() {
            if (this.Orientation === Fayde.Orientation.Horizontal)
                this.SetVerticalOffset(this._VerticalOffset + LineDelta * Wheelitude);
            else
                this.SetVerticalOffset(this._VerticalOffset + Wheelitude);
        }
        MouseWheelLeft() {
            if (this.Orientation === Fayde.Orientation.Vertical)
                this.SetHorizontalOffset(this._HorizontalOffset - LineDelta * Wheelitude);
            else
                this.SetHorizontalOffset(this._HorizontalOffset - Wheelitude);
        }
        MouseWheelRight() {
            if (this.Orientation === Fayde.Orientation.Vertical)
                this.SetHorizontalOffset(this._HorizontalOffset + LineDelta * Wheelitude);
            else
                this.SetHorizontalOffset(this._HorizontalOffset + Wheelitude);
        }
        PageUp() { this.SetVerticalOffset(this._VerticalOffset - this._ViewportHeight); }
        PageDown() { this.SetVerticalOffset(this._VerticalOffset + this._ViewportHeight); }
        PageLeft() { this.SetHorizontalOffset(this._HorizontalOffset - this._ViewportWidth); }
        PageRight() { this.SetHorizontalOffset(this._HorizontalOffset + this._ViewportWidth); }
        MakeVisible(uie: UIElement, rectangle: rect): rect {
            var exposed = new rect();

            var uin = uie.XamlNode;
            var isVertical = this.Orientation === Orientation.Vertical;
            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = <UINode>enumerator.Current;
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
        SetHorizontalOffset(offset: number) {
            if (offset < 0 || this._ViewportWidth >= this._ExtentWidth)
                offset = 0;
            else if ((offset + this._ViewportWidth) >= this._ExtentWidth)
                offset = this._ExtentWidth - this._ViewportWidth;

            if (this._HorizontalOffset === offset)
                return;
            this._HorizontalOffset = offset;

            if (this.Orientation === Fayde.Orientation.Horizontal)
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            else
                this.XamlNode.LayoutUpdater.InvalidateArrange();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner) scrollOwner.InvalidateScrollInfo();
        }
        SetVerticalOffset(offset: number) {
            if (offset < 0 || this._ViewportHeight >= this._ExtentHeight)
                offset = 0;
            else if ((offset + this._ViewportHeight) >= this._ExtentHeight)
                offset = this._ExtentHeight - this._ViewportHeight;

            if (this._VerticalOffset == offset)
                return;
            this._VerticalOffset = offset;

            if (this.Orientation === Fayde.Orientation.Vertical)
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            else
                this.XamlNode.LayoutUpdater.InvalidateArrange();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner) scrollOwner.InvalidateScrollInfo();
        }


        CleanUpVirtualizedItemEvent: RoutedEvent = new RoutedEvent();

        static OrientationProperty: DependencyProperty = DependencyProperty.Register("Orientation", () => new Enum(Orientation), VirtualizingStackPanel, Orientation.Vertical, (d, args) => (<UIElement>d).XamlNode.LayoutUpdater.InvalidateMeasure());
        Orientation: Orientation;
        static IsVirtualizingProperty: DependencyProperty = DependencyProperty.RegisterAttached("IsVirtualizing", () => new Boolean, VirtualizingStackPanel, false);
        static GetIsVirtualizing(d: DependencyObject): bool { return d.GetValue(IsVirtualizingProperty); }
        static SetIsVirtualizing(d: DependencyObject, value: bool) { d.SetValue(IsVirtualizingProperty, value); }
        static VirtualizationModeProperty: DependencyProperty = DependencyProperty.RegisterAttached("VirtualizationMode", () => new Enum(VirtualizationMode), VirtualizingStackPanel, VirtualizationMode.Recycling);
        static GetVirtualizationMode(d: DependencyObject): VirtualizationMode { return d.GetValue(VirtualizationModeProperty); }
        static SetVirtualizationMode(d: DependencyObject, value: VirtualizationMode) { d.SetValue(VirtualizationModeProperty, value); }

        private _MeasureOverride(availableSize: size, error: BError): size {
            var owner = ItemsControl.GetItemsOwner(this);
            var measured = new size();
            var invalidate = false;
            var nvisible = 0;
            var beyond = 0;

            var index: number;
            var isHorizontal = this.Orientation === Orientation.Horizontal;
            if (isHorizontal)
                index = Math.floor(this._HorizontalOffset);
            else
                index = Math.floor(this._VerticalOffset);

            var itemCount = owner.Items.Count;
            var generator = this.ItemContainerGenerator;
            if (itemCount > 0) {
                var children = this.Children;
                var childAvailable = size.clone(availableSize);
                if (this._CanHorizontallyScroll || isHorizontal)
                    childAvailable.Width = Number.POSITIVE_INFINITY;
                if (this._CanVerticallyScroll || !isHorizontal)
                    childAvailable.Height = Number.POSITIVE_INFINITY;

                var start = generator.GeneratorPositionFromIndex(index);
                var insertAt = (start.offset === 0) ? start.index : start.index + 1;

                var state = generator.StartAt(start, 0, true);
                try {
                    var isNewlyRealized = { Value: false };

                    var child: UIElement;
                    var childlu: LayoutUpdater;
                    for (var i = 0; i < itemCount && beyond < 2; i++, insertAt++) {
                        child = <UIElement>generator.GenerateNext(isNewlyRealized);
                        childlu = child.XamlNode.LayoutUpdater;
                        if (isNewlyRealized.Value || insertAt >= children.Count || children.GetValueAt(insertAt) !== child) {
                            if (insertAt < children.Count)
                                this.InsertInternalChild(insertAt, child)
                            else
                                this.AddInternalChild(child);
                            generator.PrepareItemContainer(child);
                        }

                        child.Measure(childAvailable);
                        var s = childlu.DesiredSize;
                        nvisible++;

                        if (!isHorizontal) {
                            measured.Width = Math.max(measured.Width, s.Width);
                            measured.Height += s.Height;

                            if (measured.Height > availableSize.Height)
                                beyond++;
                        } else {
                            measured.Height = Math.max(measured.Height, s.Height);
                            measured.Width += s.Width;

                            if (measured.Width > availableSize.Width)
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

            if (!isHorizontal) {
                if (this._ExtentHeight !== itemCount) {
                    this._ExtentHeight = itemCount;
                    invalidate = true;
                }
                if (this._ExtentWidth !== measured.Width) {
                    this._ExtentWidth = measured.Width;
                    invalidate = true;
                }
                if (this._ViewportHeight !== nvisible) {
                    this._ViewportHeight = nvisible;
                    invalidate = true;
                }
                if (this._ViewportWidth != availableSize.Width) {
                    this._ViewportWidth = availableSize.Width;
                    invalidate = true;
                }
            } else {
                if (this._ExtentHeight !== measured.Height) {
                    this._ExtentHeight = measured.Height;
                    invalidate = true;
                }

                if (this._ExtentWidth !== itemCount) {
                    this._ExtentWidth = itemCount;
                    invalidate = true;
                }

                if (this._ViewportHeight !== availableSize.Height) {
                    this._ViewportHeight = availableSize.Height;
                    invalidate = true;
                }

                if (this._ViewportWidth !== nvisible) {
                    this._ViewportWidth = nvisible;
                    invalidate = true;
                }
            }

            var scrollOwner = this.ScrollOwner;
            if (invalidate && scrollOwner != null)
                scrollOwner.InvalidateScrollInfo();

            return measured;
        }
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var arranged = size.clone(finalSize);
            var isHorizontal = this.Orientation === Orientation.Horizontal;
            if (!isHorizontal)
                arranged.Height = 0;
            else
                arranged.Width = 0;

            var enumerator = this.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var childNode = <UINode>enumerator.Current;
                var childLu = childNode.LayoutUpdater;
                var s = childLu.DesiredSize;
                if (!isHorizontal) {
                    s.Width = finalSize.Width;
                    var childFinal = rect.fromSize(s);
                    if (rect.isEmpty(childFinal)) {
                        rect.clear(childFinal);
                    } else {
                        childFinal.X = -this._HorizontalOffset;
                        childFinal.Y = arranged.Height;
                    }
                    childLu._Arrange(childFinal, error);
                    arranged.Width = Math.max(arranged.Width, s.Width);
                    arranged.Height += s.Height;
                } else {
                    s.Height = finalSize.Height;
                    var childFinal = rect.fromSize(s);
                    if (rect.isEmpty(childFinal)) {
                        rect.clear(childFinal);
                    } else {
                        childFinal.X = arranged.Width;
                        childFinal.Y = -this._VerticalOffset;
                    }
                    childNode.XObject.Arrange(childFinal);
                    arranged.Width += s.Width;
                    arranged.Height = Math.max(arranged.Height, s.Height);
                }
            }

            if (!isHorizontal)
                arranged.Height = Math.max(arranged.Height, finalSize.Height);
            else
                arranged.Width = Math.max(arranged.Width, finalSize.Width);
            return arranged;
        }

        RemoveUnusedContainers(first: number, count: number) {
            var generator = this.ItemContainerGenerator;
            var owner = ItemsControl.GetItemsOwner(this);
            var mode = VirtualizingStackPanel.GetVirtualizationMode(this);

            var last = first + count - 1;

            var item: number;
            var args: ICancelable;
            var children = this.Children;
            var pos = { index: children.Count - 1, offset: 0 };
            while (pos.index >= 0) {
                item = generator.IndexFromGeneratorPosition(pos);
                if (item < first || item > last) {
                    var args = this.OnCleanUpVirtualizedItem(<UIElement>children.GetValueAt(pos.index), owner.Items.GetValueAt(item));
                    if (!args.Cancel) {
                        this.RemoveInternalChildRange(pos.index, 1);
                        if (mode === VirtualizationMode.Recycling)
                            generator.Recycle(pos, 1);
                        else
                            generator.Remove(pos, 1);
                    }
                }
                pos.index--;
            }
        }
        OnCleanUpVirtualizedItem(uie: UIElement, value): ICancelable {
            var args = new CleanUpVirtualizedItemEventArgs(uie, value);
            this.CleanUpVirtualizedItemEvent.Raise(this, args);
            return args;
        }
        
        OnClearChildren() {
            super.OnClearChildren();
            this._HorizontalOffset = 0;
            this._VerticalOffset = 0;

            this.XamlNode.LayoutUpdater.InvalidateMeasure();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner) scrollOwner.InvalidateScrollInfo();
        }
        OnItemsChanged(action: ItemsChangedAction, itemCount: number, itemUICount: number, oldPosition: IGeneratorPosition, position: IGeneratorPosition) {
            super.OnItemsChanged(action, itemCount, itemUICount, oldPosition, position);

            var generator = this.ItemContainerGenerator;
            var owner = ItemsControl.GetItemsOwner(this);
            var orientation = this.Orientation;

            var index;
            var offset;
            var viewable

            switch (action) {
                case ItemsChangedAction.Add:
                    var index = generator.IndexFromGeneratorPosition(position);
                    if (orientation === Fayde.Orientation.Horizontal)
                        offset = this.HorizontalOffset;
                    else
                        offset = this.VerticalOffset;

                    if (index <= offset) {
                        // items have been added earlier in the list than what is viewable
                        offset += itemCount;
                    }

                    if (orientation === Fayde.Orientation.Horizontal)
                        this.SetHorizontalOffset(offset);
                    else
                        this.SetVerticalOffset(offset);
                    break;
                case ItemsChangedAction.Remove:
                    index = generator.IndexFromGeneratorPosition(position);
                    if (orientation === Fayde.Orientation.Horizontal) {
                        offset = this.HorizontalOffset;
                        viewable = this.ViewportWidth;
                    } else {
                        offset = this.VerticalOffset;
                        viewable = this.ViewportHeight;
                    }

                    if (index < offset) {
                        // items earlier in the list than what is viewable have been removed
                        offset = Math.max(offset - itemCount, 0);
                    }

                    // adjust for items removed in the current view and/or beyond the current view
                    offset = Math.min(offset, owner.Items.Count - viewable);
                    offset = Math.max(offset, 0);

                    if (orientation === Fayde.Orientation.Horizontal)
                        this.SetHorizontalOffset(offset);
                    else
                        this.SetVerticalOffset(offset);

                    this.RemoveInternalChildRange(position.index, itemUICount);
                    break;
                case ItemsChangedAction.Replace:
                    this.RemoveInternalChildRange(position.index, itemUICount);
                    break;
                case ItemsChangedAction.Reset:
                    break;
            }

            this.XamlNode.LayoutUpdater.InvalidateMeasure();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner) scrollOwner.InvalidateScrollInfo();
        }
    }
    Nullstone.RegisterType(VirtualizingStackPanel, "VirtualizingStackPanel");
}