/// <reference path="ContentPresenter.ts" />
/// <reference path="Primitives/IScrollInfo.ts" />

module Fayde.Controls {
    export class ScrollContentPresenter extends ContentPresenter implements Primitives.IScrollInfo {
        private _ScrollData: Primitives.ScrollData = new Primitives.ScrollData();
        private _IsClipPropertySet: boolean = false;
        private _ClippingRectangle: Media.RectangleGeometry = null;

        get ScrollOwner(): ScrollViewer { return this._ScrollData.ScrollOwner; }
        set ScrollOwner(value: ScrollViewer) { this._ScrollData.ScrollOwner = value; }
        get CanHorizontallyScroll(): boolean { return this._ScrollData.CanHorizontallyScroll;; }
        set CanHorizontallyScroll(value: boolean) {
            var sd = this._ScrollData;
            if (sd.CanHorizontallyScroll !== value) {
                sd.CanHorizontallyScroll = value;
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            }
        }
        get CanVerticallyScroll(): boolean { return this._ScrollData.CanVerticallyScroll; }
        set CanVerticallyScroll(value: boolean) {
            var sd = this._ScrollData;
            if (sd.CanVerticallyScroll !== value) {
                sd.CanVerticallyScroll = value;
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            }
        }
        get ExtentWidth(): number { return this._ScrollData.ExtentWidth; }
        get ExtentHeight(): number { return this._ScrollData.ExtentHeight; }
        get ViewportWidth(): number { return this._ScrollData.ViewportWidth; }
        get ViewportHeight(): number { return this._ScrollData.ViewportHeight; }
        get HorizontalOffset(): number { return this._ScrollData.OffsetX; }
        get VerticalOffset(): number { return this._ScrollData.OffsetY; }
        LineUp(): boolean { return this.SetVerticalOffset(this._ScrollData.OffsetY - 16); }
        LineDown(): boolean { return this.SetVerticalOffset(this._ScrollData.OffsetY + 16); }
        LineLeft(): boolean { return this.SetHorizontalOffset(this._ScrollData.OffsetX - 16); }
        LineRight(): boolean { return this.SetHorizontalOffset(this._ScrollData.OffsetX + 16); }
        MouseWheelUp(): boolean { return this.SetVerticalOffset(this._ScrollData.OffsetY - 48); }
        MouseWheelDown(): boolean { return this.SetVerticalOffset(this._ScrollData.OffsetY + 48); }
        MouseWheelLeft(): boolean { return this.SetHorizontalOffset(this._ScrollData.OffsetX - 48); }
        MouseWheelRight(): boolean { return this.SetHorizontalOffset(this._ScrollData.OffsetX + 48); }
        PageUp(): boolean { return this.SetVerticalOffset(this._ScrollData.OffsetY - this._ScrollData.ViewportHeight); }
        PageDown(): boolean { return this.SetVerticalOffset(this._ScrollData.OffsetY + this._ScrollData.ViewportHeight); }
        PageLeft(): boolean { return this.SetHorizontalOffset(this._ScrollData.OffsetX - this._ScrollData.ViewportWidth); }
        PageRight(): boolean { return this.SetHorizontalOffset(this._ScrollData.OffsetX + this._ScrollData.ViewportWidth); }
        MakeVisible(uie: UIElement, rectangle: rect): rect {
            if (rect.isEmpty(rectangle) || !uie || uie === this || !this.XamlNode.IsAncestorOf(uie.XamlNode))
                return new rect();
            
            var generalTransform = uie.TransformToVisual(this);
            var point = generalTransform.Transform(new Point(rectangle.X, rectangle.Y));
            rectangle = rect.copyTo(rectangle);
            rectangle.X = point.X;
            rectangle.Y = point.Y;
            return rectangle;

            var irect = new rect();
            rect.set(irect, this.HorizontalOffset, this.VerticalOffset, this.ViewportWidth, this.ViewportHeight);
            rectangle.X += irect.X;
            rectangle.Y += irect.Y;
            var num = computeScrollOffsetWithMinimalScroll(irect.X, irect.X + irect.Width, rectangle.X, rectangle.X + rectangle.Width);
            var num1 = computeScrollOffsetWithMinimalScroll(irect.Y, irect.Y + irect.Height, rectangle.Y, rectangle.Y + rectangle.Height);
            this.SetHorizontalOffset(num);
            this.SetVerticalOffset(num1);
            irect.X = num;
            irect.Y = num1;
            rect.intersection(rectangle, irect);
            if (!rect.isEmpty(rectangle)) {
                rectangle.X -= irect.X;
                rectangle.Y -= irect.Y;
            }
            return rectangle;
        }
        SetHorizontalOffset(offset: number): boolean {
            if (isNaN(offset))
                throw new ArgumentException("Offset is not a number.");
            if (!this.CanHorizontallyScroll)
                return false;

            var sd = this._ScrollData;
            offset = Math.max(0, Math.min(offset, sd.ExtentWidth - sd.ViewportWidth));
            if (NumberEx.AreClose(this._ScrollData.OffsetX, offset))
                return false;

            this._ScrollData.CachedOffsetX = offset;
            this.XamlNode.LayoutUpdater.InvalidateArrange();
            return true;
        }
        SetVerticalOffset(offset: number): boolean {
            if (isNaN(offset))
                throw new ArgumentException("Offset is not a number.");
            if (!this.CanVerticallyScroll)
                return false;
            
            var sd = this._ScrollData;
            offset = Math.max(0, Math.min(offset, sd.ExtentHeight - sd.ViewportHeight));
            if (NumberEx.AreClose(this._ScrollData.OffsetY, offset))
                return false;

            this._ScrollData.CachedOffsetY = offset;
            this.XamlNode.LayoutUpdater.InvalidateArrange();
            return true;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            var sv: ScrollViewer;
            if (this.TemplateOwner instanceof ScrollViewer)
                sv = <ScrollViewer>this.TemplateOwner;
            else
                return;

            var content = this.Content;
            var info = Primitives.IScrollInfo_.As(content);
            if (!info && content instanceof ItemsPresenter) {
                var ip = <ItemsPresenter>content;
                var err = new BError();
                ip.XamlNode.ApplyTemplateWithError(err);
                if (err.Message)
                    err.ThrowException();
                info = Primitives.IScrollInfo_.As(ip.Panel);
            }

            if (!info)
                info = this;

            info.CanHorizontallyScroll = sv.HorizontalScrollBarVisibility !== ScrollBarVisibility.Disabled;
            info.CanVerticallyScroll = sv.VerticalScrollBarVisibility !== ScrollBarVisibility.Disabled;
            info.ScrollOwner = sv;
            sv.ScrollInfo = info;
            sv.InvalidateScrollInfo();
        }
        private _UpdateClip(arrangeSize: size) {
            if (!this._IsClipPropertySet) {
                this._ClippingRectangle = new Media.RectangleGeometry();
                this.Clip = this._ClippingRectangle;
                this._IsClipPropertySet = true;
            }

            var content;
            if (this.TemplateOwner instanceof Controls.ScrollViewer && (content = this.Content) && (content instanceof Controls.Internal.TextBoxView || content instanceof Controls._RichTextBoxView)) {
                //ScrollViewer inside TextBox/RichTextBox
                this._ClippingRectangle.Rect = this._CalculateTextBoxClipRect(arrangeSize);
            } else {
                this._ClippingRectangle.Rect = rect.fromSize(arrangeSize);
            }
        }
        private _CalculateTextBoxClipRect(arrangeSize: size): rect {
            var left = 0;
            var right = 0;
            var sd = this._ScrollData;
            var width = sd.ExtentWidth;
            var num = sd.ViewportWidth;
            var x = sd.OffsetX;
            var templatedParent: ScrollViewer;
            if (this.TemplateOwner instanceof ScrollViewer)
                templatedParent = <ScrollViewer>this.TemplateOwner;

            var to = templatedParent.TemplateOwner;
            var textWrapping = TextWrapping.NoWrap;
            var horizontalScrollBarVisibility = ScrollBarVisibility.Disabled;
            if (to instanceof TextBox) {
                var textbox = <TextBox>to;
                textWrapping = textbox.TextWrapping;
                horizontalScrollBarVisibility = textbox.HorizontalScrollBarVisibility;
            } else if (to instanceof RichTextBox) {
                var richtextbox = <RichTextBox>to;
                textWrapping = richtextbox.TextWrapping;
                horizontalScrollBarVisibility = richtextbox.HorizontalScrollBarVisibility;
            }

            var padding = templatedParent.Padding;
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
            var r = new rect();
            rect.set(r, -left, 0, arrangeSize.Width + left + right, arrangeSize.Height);
            return r;
        }

        MeasureOverride(availableSize: size): size {
            var scrollOwner = this.ScrollOwner;

            var cr = this.XamlNode.ContentRoot;
            if (!scrollOwner || !cr)
                return super.MeasureOverride(availableSize);

            var ideal = size.createInfinite();
            if (!this.CanHorizontallyScroll)
                ideal.Width = availableSize.Width;
            if (!this.CanVerticallyScroll)
                ideal.Height = availableSize.Height;

            cr.Measure(ideal);
            var crds = cr.DesiredSize;
            this._UpdateExtents(availableSize, crds.Width, crds.Height);

            var desired = size.copyTo(availableSize);
            var sd = this._ScrollData;
            desired.Width = Math.min(desired.Width, sd.ExtentWidth);
            desired.Height = Math.min(desired.Height, sd.ExtentHeight);
            return desired;
        }
        ArrangeOverride(finalSize: size): size {
            var scrollOwner = this.ScrollOwner;
            var cr = this.XamlNode.ContentRoot;
            if (!scrollOwner || !cr)
                return super.ArrangeOverride(finalSize);

            if (this._ClampOffsets())
                scrollOwner.InvalidateScrollInfo();

            var desired = cr.DesiredSize;
            var start = new Point(-this.HorizontalOffset, -this.VerticalOffset);

            var offerSize = size.copyTo(desired);
            size.max(offerSize, finalSize);
            var childRect = rect.fromSize(offerSize);
            childRect.X = start.X;
            childRect.Y = start.Y;
            cr.Arrange(childRect);
            this._UpdateClip(finalSize);
            var sd = this._ScrollData;
            this._UpdateExtents(finalSize, sd.ExtentWidth, sd.ExtentHeight);
            return finalSize;
        }

        private _UpdateExtents(viewport: size, extentWidth: number, extentHeight: number) {
            var sd = this._ScrollData;
            var changed = sd.ViewportWidth !== viewport.Width
                || sd.ViewportHeight !== viewport.Height
                || sd.ExtentWidth !== extentWidth
                || sd.ExtentHeight !== extentHeight;
            sd.ViewportWidth = viewport.Width;
            sd.ViewportHeight = viewport.Height;
            sd.ExtentWidth = extentWidth;
            sd.ExtentHeight = extentHeight;
            if (this._ClampOffsets())
                changed = true;
            if (changed) this.ScrollOwner.InvalidateScrollInfo();
        }
        private _ClampOffsets(): boolean {
            var changed = false;

            var sd = this._ScrollData;
            var clampX = this._ClampHorizontal(sd.CachedOffsetX);
            if (!NumberEx.AreClose(clampX, this.HorizontalOffset)) {
                sd.OffsetX = clampX;
                changed = true;
            }

            var clampY = this._ClampVertical(sd.CachedOffsetY);
            if (!NumberEx.AreClose(clampY, this.VerticalOffset)) {
                sd.OffsetY = clampY;
                changed = true;
            }
            return changed;
        }

        private _ClampHorizontal(x: number): number {
            if (!this.CanHorizontallyScroll)
                return 0;
            var sd = this._ScrollData;
            return Math.max(0, Math.min(x, sd.ExtentWidth - sd.ViewportWidth));
        }
        private _ClampVertical(y: number): number {
            if (!this.CanVerticallyScroll)
                return 0;
            var sd = this._ScrollData;
            return Math.max(0, Math.min(y, sd.ExtentHeight - sd.ViewportHeight));
        }
    }
    Fayde.RegisterType(ScrollContentPresenter, "Fayde.Controls", Fayde.XMLNS);
    Fayde.RegisterTypeInterfaces(ScrollContentPresenter, Primitives.IScrollInfo_);
    
    function computeScrollOffsetWithMinimalScroll(topView, bottomView, topChild, bottomChild) {
        var flag = NumberEx.IsLessThanClose(topChild, topView) && NumberEx.IsLessThanClose(bottomChild, bottomView);
        var flag1 = NumberEx.IsGreaterThanClose(topChild, topView) && NumberEx.IsGreaterThanClose(bottomChild, bottomView);

        var flag4 = (bottomChild - topChild) > (bottomView - topView);
        if ((!flag || flag4) && (!flag1 || !flag4)) {
            if (flag || flag1)
                return bottomChild - bottomView - topView;
            return topView;
        }
        return topChild;
    }
}