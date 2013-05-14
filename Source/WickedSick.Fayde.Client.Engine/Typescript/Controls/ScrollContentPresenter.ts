/// <reference path="ContentPresenter.ts" />
/// <reference path="Primitives/IScrollInfo.ts" />
/// CODE
/// <reference path="ItemsPresenter.ts" />
/// <reference path="Primitives/ScrollData.ts" />
/// <reference path="Enums.ts" />
/// <reference path="TextBox.ts" />
/// <reference path="TextBoxView.ts" />
/// <reference path="RichTextBox.ts" />

module Fayde.Controls {
    export class ScrollContentPresenter extends ContentPresenter implements Primitives.IScrollInfo, IMeasurableHidden, IArrangeableHidden {
        private _ScrollData: Primitives.ScrollData = new Primitives.ScrollData();
        private _IsClipPropertySet: bool = false;
        private _ClippingRectangle: Media.RectangleGeometry = null;

        get ScrollOwner(): ScrollViewer { return this._ScrollData.ScrollOwner; }
        set ScrollOwner(value: ScrollViewer) { this._ScrollData.ScrollOwner = value; }
        get CanHorizontallyScroll(): bool { return this._ScrollData.CanHorizontallyScroll;; }
        set CanHorizontallyScroll(value: bool) {
            var sd = this._ScrollData;
            if (sd.CanHorizontallyScroll !== value) {
                sd.CanHorizontallyScroll = value;
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            }
        }
        get CanVerticallyScroll(): bool { return this._ScrollData.CanVerticallyScroll; }
        set CanVerticallyScroll(value: bool) {
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
        LineUp() { this.SetVerticalOffset(this._ScrollData.OffsetY - 16); }
        LineDown() { this.SetVerticalOffset(this._ScrollData.OffsetY + 16); }
        LineLeft() { this.SetHorizontalOffset(this._ScrollData.OffsetX - 16); }
        LineRight() { this.SetHorizontalOffset(this._ScrollData.OffsetX + 16); }
        MouseWheelUp() { this.SetVerticalOffset(this._ScrollData.OffsetY - 48); }
        MouseWheelDown() { this.SetVerticalOffset(this._ScrollData.OffsetY + 48); }
        MouseWheelLeft() { this.SetHorizontalOffset(this._ScrollData.OffsetX - 48); }
        MouseWheelRight() { this.SetHorizontalOffset(this._ScrollData.OffsetX + 48); }
        PageUp() { this.SetVerticalOffset(this._ScrollData.OffsetY - this._ScrollData.ViewportHeight); }
        PageDown() { this.SetVerticalOffset(this._ScrollData.OffsetY + this._ScrollData.ViewportHeight); }
        PageLeft() { this.SetHorizontalOffset(this._ScrollData.OffsetX - this._ScrollData.ViewportWidth); }
        PageRight() { this.SetHorizontalOffset(this._ScrollData.OffsetX + this._ScrollData.ViewportWidth); }
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
        SetHorizontalOffset(offset: number) {
            if (!this.CanHorizontallyScroll)
                return;
            var valid = validateInputOffset(offset);
            if (areNumbersClose(this._ScrollData.OffsetX, valid))
                return;

            this._ScrollData.CachedOffsetX = valid;
            this.XamlNode.LayoutUpdater.InvalidateArrange();
        }
        SetVerticalOffset(offset: number) {
            if (!this.CanVerticallyScroll)
                return;

            var valid = validateInputOffset(offset);
            if (areNumbersClose(this._ScrollData.OffsetY, valid))
                return;

            this._ScrollData.CachedOffsetY = valid;
            this.XamlNode.LayoutUpdater.InvalidateArrange();
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            var sv: ScrollViewer;
            if (this.TemplateOwner instanceof ScrollViewer)
                sv = <ScrollViewer>this.TemplateOwner;
            else
                return;

            var content = this.Content;
            var info: Primitives.IScrollInfo;
            if (Nullstone.ImplementsInterface(content, Primitives.IScrollInfo_))
                info = content;
            if (!info) {
                if (content instanceof ItemsPresenter) {
                    var presenter = <ItemsPresenter>content;
                    var er = presenter.ElementRoot;
                    if (Nullstone.ImplementsInterface(er, Primitives.IScrollInfo_))
                        info = <Primitives.IScrollInfo><any>er;
                }
            }

            if (!info)
                info = this;

            info.CanHorizontallyScroll = sv.HorizontalScrollBarVisibility !== ScrollBarVisibility.Disabled;
            info.CanVerticallyScroll = sv.VerticalScrollBarVisibility !== ScrollBarVisibility.Disabled;
            info.ScrollOwner = sv;
            sv.ScrollInfo = info;
            sv.InvalidateScrollInfo();
        }

        private _MeasureOverride(availableSize: size, error: BError): size {
            var scrollOwner = this.ScrollOwner;
            var cr = this.XamlNode.ContentRoot;
            if (!scrollOwner || !cr)
                return (<IMeasurableHidden>super)._MeasureOverride.call(this, availableSize, error);

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
        private _ArrangeOverride(finalSize: size, error: BError): size {
            var scrollOwner = this.ScrollOwner;
            var cr = this.XamlNode.ContentRoot;
            if (!scrollOwner || !cr)
                return (<IArrangeableHidden>super)._ArrangeOverride.call(this, finalSize, error);

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
        private _ClampOffsets(): bool {
            var changed = false;
            
            var sd = this._ScrollData;
            var result = this.CanHorizontallyScroll ? Math.min(sd.CachedOffsetX, sd.ExtentWidth - sd.ViewportWidth) : 0;
            result = Math.max(0, result);
            if (!areNumbersClose(result, this.HorizontalOffset)) {
                sd.OffsetX = result;
                changed = true;
            }

            result = this.CanVerticallyScroll ? Math.min(sd.CachedOffsetY, sd.ExtentHeight - sd.ViewportHeight) : 0;
            result = Math.max(0, result);
            if (!areNumbersClose(result, this.VerticalOffset)) {
                sd.OffsetY = result;
                changed = true;
            }
            return changed;
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
    }
    Nullstone.RegisterType(ScrollContentPresenter, "ScrollContentPresenter", [Primitives.IScrollInfo_]);
    
    function validateInputOffset(offset: number) {
        if (!isNaN(offset))
            return Math.max(0, offset);
        throw new ArgumentException("Offset is not a number.");
    }
    function areNumbersClose(val1: number, val2: number): bool {
        if (val1 === val2)
            return true;
        var num1 = (Math.abs(val1) + Math.abs(val2) + 10) * 1.11022302462516E-16;
        var num2 = val1 - val2;
        return -num1 < num2 && num1 > num2;
    }
    function isNumberLessThan(val1: number, val2: number): bool {
        if (val1 >= val2)
            return false;
        return !areNumbersClose(val1, val2);
    }
    function isNumberGreaterThan(val1: number, val2: number): bool {
        if (val1 <= val2)
            return false;
        return !areNumbersClose(val1, val2);
    }
    function computeScrollOffsetWithMinimalScroll(topView, bottomView, topChild, bottomChild) {
        var flag = isNumberLessThan(topChild, topView) && isNumberLessThan(bottomChild, bottomView);
        var flag1 = isNumberGreaterThan(topChild, topView) && isNumberGreaterThan(bottomChild, bottomView);

        var flag4 = (bottomChild - topChild) > (bottomView - topView);
        if ((!flag || flag4) && (!flag1 || !flag4)) {
            if (flag || flag1)
                return bottomChild - bottomView - topView;
            return topView;
        }
        return topChild;
    }
}