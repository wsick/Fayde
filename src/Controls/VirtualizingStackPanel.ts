/// <reference path="VirtualizingPanel.ts" />

module Fayde.Controls {
    var LineDelta = 14.7;
    var Wheelitude = 3;

    import VirtualizingStackPanelUpdater = minerva.controls.virtualizingstackpanel.VirtualizingStackPanelUpdater;

    export class VirtualizingStackPanel extends VirtualizingPanel implements Primitives.IScrollInfo {
        CreateLayoutUpdater() {
            var updater = new VirtualizingStackPanelUpdater();
            updater.assets.scrollData = this._ScrollData = new Primitives.ScrollData();
            return updater;
        }

        private _ScrollData: Primitives.ScrollData;

        get ScrollOwner(): ScrollViewer { return this._ScrollData.scrollOwner; }
        set ScrollOwner(value: ScrollViewer) { this._ScrollData.scrollOwner = value; }
        get CanHorizontallyScroll(): boolean { return this._ScrollData.canHorizontallyScroll;; }
        set CanHorizontallyScroll(value: boolean) {
            var sd = this._ScrollData;
            if (sd.canHorizontallyScroll !== value) {
                sd.canHorizontallyScroll = value;
                this.XamlNode.LayoutUpdater.invalidateMeasure();
            }
        }
        get CanVerticallyScroll(): boolean { return this._ScrollData.canVerticallyScroll; }
        set CanVerticallyScroll(value: boolean) {
            var sd = this._ScrollData;
            if (sd.canVerticallyScroll !== value) {
                sd.canVerticallyScroll = value;
                this.XamlNode.LayoutUpdater.invalidateMeasure();
            }
        }
        get ExtentWidth(): number { return this._ScrollData.extentWidth; }
        get ExtentHeight(): number { return this._ScrollData.extentHeight; }
        get ViewportWidth(): number { return this._ScrollData.viewportWidth; }
        get ViewportHeight(): number { return this._ScrollData.viewportHeight; }
        get HorizontalOffset(): number { return this._ScrollData.offsetX; }
        get VerticalOffset(): number { return this._ScrollData.offsetY; }
        LineUp (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(sd.offsetY - LineDelta);
            return this.SetVerticalOffset(sd.offsetY - 1);
        }
        LineDown (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(sd.offsetY + LineDelta);
            return this.SetVerticalOffset(sd.offsetY + 1);
        }
        LineLeft (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(sd.offsetX - LineDelta);
            return this.SetHorizontalOffset(sd.offsetX - 1);
        }
        LineRight (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(sd.offsetX + LineDelta);
            return this.SetHorizontalOffset(sd.offsetX + 1);
        }
        MouseWheelUp (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(sd.offsetY - LineDelta * Wheelitude);
            return this.SetVerticalOffset(sd.offsetY - Wheelitude);
        }
        MouseWheelDown (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Horizontal)
                return this.SetVerticalOffset(sd.offsetY + LineDelta * Wheelitude);
            return this.SetVerticalOffset(sd.offsetY + Wheelitude);
        }
        MouseWheelLeft (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(sd.offsetX - LineDelta * Wheelitude);
            return this.SetHorizontalOffset(sd.offsetX - Wheelitude);
        }
        MouseWheelRight (): boolean {
            var sd = this._ScrollData;
            if (this.Orientation === Fayde.Orientation.Vertical)
                return this.SetHorizontalOffset(sd.offsetX + LineDelta * Wheelitude);
            return this.SetHorizontalOffset(sd.offsetX + Wheelitude);
        }
        PageUp (): boolean {
            var sd = this._ScrollData;
            return this.SetVerticalOffset(sd.offsetY - sd.viewportHeight);
        }
        PageDown (): boolean {
            var sd = this._ScrollData;
            return this.SetVerticalOffset(sd.offsetY + sd.viewportHeight);
        }
        PageLeft (): boolean {
            var sd = this._ScrollData;
            return this.SetHorizontalOffset(sd.offsetX - sd.viewportWidth);
        }
        PageRight (): boolean {
            var sd = this._ScrollData;
            return this.SetHorizontalOffset(sd.offsetX + sd.viewportWidth);
        }

        MakeVisible (uie: UIElement, rectangle: minerva.Rect): minerva.Rect {
            var exposed = new minerva.Rect();
            var sd = this._ScrollData;

            var uin = uie.XamlNode;
            var isVertical = this.Orientation === Orientation.Vertical;
            var enumerator = this.Children.getEnumerator();
            while (enumerator.moveNext()) {
                var child = enumerator.current;
                var childNode = child.XamlNode;
                var childRenderSize = childNode.LayoutUpdater.assets.renderSize;
                if (uin === childNode) {
                    if (isVertical) {
                        if (rectangle.x !== sd.offsetX)
                            this.SetHorizontalOffset(rectangle.x);

                        exposed.width = Math.min(childRenderSize.width, sd.viewportWidth);
                        exposed.height = childRenderSize.height;
                        exposed.x = sd.offsetX;
                    } else {
                        if (rectangle.y !== sd.offsetY)
                            this.SetVerticalOffset(rectangle.y);

                        exposed.height = Math.min(childRenderSize.height, sd.viewportHeight);
                        exposed.width = childRenderSize.width;
                        exposed.y = sd.offsetY;
                    }
                    return exposed;
                }

                if (isVertical)
                    exposed.y += childRenderSize.height;
                else
                    exposed.x += childRenderSize.width;
            }

            throw new ArgumentException("Visual is not a child of this Panel");
        }

        SetHorizontalOffset (offset: number): boolean {
            var sd = this._ScrollData;
            if (offset < 0 || sd.viewportWidth >= sd.extentWidth)
                offset = 0;
            else if ((offset + sd.viewportWidth) >= sd.extentWidth)
                offset = sd.extentWidth - sd.viewportWidth;

            if (sd.offsetX === offset)
                return false;
            sd.offsetX = offset;

            if (this.Orientation === Fayde.Orientation.Horizontal)
                this.XamlNode.LayoutUpdater.invalidateMeasure();
            else
                this.XamlNode.LayoutUpdater.invalidateArrange();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner)
                scrollOwner.InvalidateScrollInfo();
            return true;
        }
        SetVerticalOffset (offset: number): boolean {
            var sd = this._ScrollData;
            if (offset < 0 || sd.viewportHeight >= sd.extentHeight)
                offset = 0;
            else if ((offset + sd.viewportHeight) >= sd.extentHeight)
                offset = sd.extentHeight - sd.viewportHeight;

            if (sd.offsetY === offset)
                return false;
            sd.offsetY = offset;

            if (this.Orientation === Fayde.Orientation.Vertical)
                this.XamlNode.LayoutUpdater.invalidateMeasure();
            else
                this.XamlNode.LayoutUpdater.invalidateArrange();

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner)
                scrollOwner.InvalidateScrollInfo();
            return true;
        }

        static OrientationProperty = DependencyProperty.Register("Orientation", () => new Enum(Orientation), VirtualizingStackPanel, Orientation.Vertical);
        Orientation: Orientation;

        //TODO: Implement measure/arrange
        /*
         MeasureOverride(availableSize: minerva.Size): minerva.Size {
         var index: number;
         var constraint = new minerva.Size(availableSize.width, availableSize.height);
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

         var ic = this.ItemsControl;
         var icm = ic.ItemContainersManager;
         var children = this.Children;
         //Dispose and remove containers that are before offset
         var old = icm.DisposeContainers(0, index);
         for (var i = 0, len = old.length; i < len; i++) {
         children.Remove(old[i]);
         }

         var measured = new minerva.Size();
         var viscount = 0;
         var count = ic.Items.Count;
         for (var generator = icm.CreateGenerator(index, count); generator.Generate();) {
         var child = <UIElement>generator.Current;
         if (generator.IsCurrentNew) {
         children.Insert(generator.GenerateIndex, child);
         ic.PrepareContainerForItem(child, generator.CurrentItem);
         }
         viscount++;

         child.Measure(minerva.Size.copyTo(constraint));
         var desired = child.DesiredSize;

         if (!isHorizontal) {
         measured.Width = Math.max(measured.Width, desired.Width);
         measured.Height += desired.Height;
         if (measured.Height > availableSize.height)
         break;
         } else {
         measured.Height = Math.max(measured.Height, desired.Height);
         measured.Width += desired.Width;
         if (measured.Width > availableSize.Width)
         break;
         }
         }

         //Dispose and remove containers that are after visible
         old = icm.DisposeContainers(index + viscount, count - (index + viscount));
         for (var i = 0, len = old.length; i < len; i++) {
         children.Remove(old[i]);
         }

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
         */
        /*
         ArrangeOverride(finalSize: size): size {
         var arranged = size.copyTo(finalSize);
         var isHorizontal = this.Orientation === Orientation.Horizontal;
         if (!isHorizontal)
         arranged.Height = 0;
         else
         arranged.Width = 0;

         var enumerator = this.Children.getEnumerator();
         while (enumerator.moveNext()) {
         var child = enumerator.current;
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
         */

        OnItemsAdded (index: number, newItems: any[]) {
            super.OnItemsAdded(index, newItems);

            var isHorizontal = this.Orientation === Orientation.Horizontal;
            var offset = isHorizontal ? this.HorizontalOffset : this.VerticalOffset;
            if (index <= offset)
                isHorizontal ? this.SetHorizontalOffset(offset + newItems.length) : this.SetVerticalOffset(offset + newItems.length);

            var scrollOwner = this.ScrollOwner;
            if (scrollOwner)
                scrollOwner.InvalidateScrollInfo();
        }

        OnItemsRemoved (index: number, oldItems: any[]) {
            super.OnItemsRemoved(index, oldItems);

            var ic = this.ItemsControl;
            if (ic) {
                var icm = ic.ItemContainersManager;
                var children = this.Children;
                for (var i = 0, len = oldItems.length; i < len; i++) {
                    var oldItem = oldItems[i];
                    var container = icm.ContainerFromItem(oldItem);
                    if (container)
                        children.Remove(container);
                }
            }

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

    module reactions {
        UIReaction<minerva.Orientation>(VirtualizingStackPanel.OrientationProperty, (upd, ov, nv) => upd.invalidateMeasure(), false);
    }
}