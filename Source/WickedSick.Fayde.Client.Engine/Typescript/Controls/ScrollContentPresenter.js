var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ContentPresenter.ts" />
    /// <reference path="Primitives/IScrollInfo.ts" />
    /// CODE
    /// <reference path="ItemsPresenter.ts" />
    /// <reference path="Primitives/ScrollData.ts" />
    /// <reference path="Enums.ts" />
    /// <reference path="TextBox.ts" />
    /// <reference path="TextBoxView.ts" />
    /// <reference path="RichTextBox.ts" />
    (function (Controls) {
        var ScrollContentPresenter = (function (_super) {
            __extends(ScrollContentPresenter, _super);
            function ScrollContentPresenter() {
                _super.apply(this, arguments);

                this._ScrollData = new Controls.Primitives.ScrollData();
                this._IsClipPropertySet = false;
                this._ClippingRectangle = null;
            }
            Object.defineProperty(ScrollContentPresenter.prototype, "ScrollOwner", {
                get: function () {
                    return this._ScrollData.ScrollOwner;
                },
                set: function (value) {
                    this._ScrollData.ScrollOwner = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "CanHorizontallyScroll", {
                get: function () {
                    return this._ScrollData.CanHorizontallyScroll;
                    ;
                },
                set: function (value) {
                    var sd = this._ScrollData;
                    if(sd.CanHorizontallyScroll !== value) {
                        sd.CanHorizontallyScroll = value;
                        this.XamlNode.LayoutUpdater.InvalidateMeasure();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "CanVerticallyScroll", {
                get: function () {
                    return this._ScrollData.CanVerticallyScroll;
                },
                set: function (value) {
                    var sd = this._ScrollData;
                    if(sd.CanVerticallyScroll !== value) {
                        sd.CanVerticallyScroll = value;
                        this.XamlNode.LayoutUpdater.InvalidateMeasure();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "ExtentWidth", {
                get: function () {
                    return this._ScrollData.ExtentWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "ExtentHeight", {
                get: function () {
                    return this._ScrollData.ExtentHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "ViewportWidth", {
                get: function () {
                    return this._ScrollData.ViewportWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "ViewportHeight", {
                get: function () {
                    return this._ScrollData.ViewportHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "HorizontalOffset", {
                get: function () {
                    return this._ScrollData.OffsetX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScrollContentPresenter.prototype, "VerticalOffset", {
                get: function () {
                    return this._ScrollData.OffsetY;
                },
                enumerable: true,
                configurable: true
            });
            ScrollContentPresenter.prototype.LineUp = function () {
                this.SetVerticalOffset(this._ScrollData.OffsetY - 16);
            };
            ScrollContentPresenter.prototype.LineDown = function () {
                this.SetVerticalOffset(this._ScrollData.OffsetY + 16);
            };
            ScrollContentPresenter.prototype.LineLeft = function () {
                this.SetHorizontalOffset(this._ScrollData.OffsetX - 16);
            };
            ScrollContentPresenter.prototype.LineRight = function () {
                this.SetHorizontalOffset(this._ScrollData.OffsetX + 16);
            };
            ScrollContentPresenter.prototype.MouseWheelUp = function () {
                this.SetVerticalOffset(this._ScrollData.OffsetY - 48);
            };
            ScrollContentPresenter.prototype.MouseWheelDown = function () {
                this.SetVerticalOffset(this._ScrollData.OffsetY + 48);
            };
            ScrollContentPresenter.prototype.MouseWheelLeft = function () {
                this.SetHorizontalOffset(this._ScrollData.OffsetX - 48);
            };
            ScrollContentPresenter.prototype.MouseWheelRight = function () {
                this.SetHorizontalOffset(this._ScrollData.OffsetX + 48);
            };
            ScrollContentPresenter.prototype.PageUp = function () {
                this.SetVerticalOffset(this._ScrollData.OffsetY - this._ScrollData.ViewportHeight);
            };
            ScrollContentPresenter.prototype.PageDown = function () {
                this.SetVerticalOffset(this._ScrollData.OffsetY + this._ScrollData.ViewportHeight);
            };
            ScrollContentPresenter.prototype.PageLeft = function () {
                this.SetHorizontalOffset(this._ScrollData.OffsetX - this._ScrollData.ViewportWidth);
            };
            ScrollContentPresenter.prototype.PageRight = function () {
                this.SetHorizontalOffset(this._ScrollData.OffsetX + this._ScrollData.ViewportWidth);
            };
            ScrollContentPresenter.prototype.MakeVisible = function (uie, rectangle) {
                if(rect.isEmpty(rectangle) || !uie || uie === this || !this.XamlNode.IsAncestorOf(uie.XamlNode)) {
                    return new rect();
                }
                var generalTransform = uie.TransformToVisual(this);
                var point = generalTransform.Transform(new Point(rectangle.X, rectangle.Y));
                rectangle = rect.clone(rectangle);
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
                if(!rect.isEmpty(rectangle)) {
                    rectangle.X -= irect.X;
                    rectangle.Y -= irect.Y;
                }
                return rectangle;
            };
            ScrollContentPresenter.prototype.SetHorizontalOffset = function (offset) {
                if(!this.CanHorizontallyScroll) {
                    return;
                }
                var valid = validateInputOffset(offset);
                if(areNumbersClose(this._ScrollData.OffsetX, valid)) {
                    return;
                }
                this._ScrollData.CachedOffsetX = valid;
                this.XamlNode.LayoutUpdater.InvalidateArrange();
            };
            ScrollContentPresenter.prototype.SetVerticalOffset = function (offset) {
                if(!this.CanVerticallyScroll) {
                    return;
                }
                var valid = validateInputOffset(offset);
                if(areNumbersClose(this._ScrollData.OffsetY, valid)) {
                    return;
                }
                this._ScrollData.CachedOffsetY = valid;
                this.XamlNode.LayoutUpdater.InvalidateArrange();
            };
            ScrollContentPresenter.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                var sv;
                if(this.TemplateOwner instanceof Controls.ScrollViewer) {
                    sv = this.TemplateOwner;
                } else {
                    return;
                }
                var content = this.Content;
                var info;
                if(Nullstone.ImplementsInterface(content, Controls.Primitives.IScrollInfo_)) {
                    info = content;
                }
                if(!info) {
                    if(content instanceof Controls.ItemsPresenter) {
                        var presenter = content;
                        var er = presenter.ElementRoot;
                        if(Nullstone.ImplementsInterface(er, Controls.Primitives.IScrollInfo_)) {
                            info = er;
                        }
                    }
                }
                if(!info) {
                    info = this;
                }
                info.CanHorizontallyScroll = sv.HorizontalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                info.CanVerticallyScroll = sv.VerticalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled;
                info.ScrollOwner = sv;
                sv.ScrollInfo = info;
                sv.InvalidateScrollInfo();
            };
            ScrollContentPresenter.prototype._MeasureOverride = function (availableSize, error) {
                var scrollOwner = this.ScrollOwner;
                var cr = this.XamlNode.ContentRoot;
                if(!scrollOwner || !cr) {
                    return (_super.prototype)._MeasureOverride.call(this, availableSize, error);
                }
                var ideal = size.createInfinite();
                if(!this.CanHorizontallyScroll) {
                    ideal.Width = availableSize.Width;
                }
                if(!this.CanVerticallyScroll) {
                    ideal.Height = availableSize.Height;
                }
                cr.Measure(ideal);
                var crds = cr.DesiredSize;
                this._UpdateExtents(availableSize, crds.Width, crds.Height);
                var desired = size.clone(availableSize);
                var sd = this._ScrollData;
                desired.Width = Math.min(desired.Width, sd.ExtentWidth);
                desired.Height = Math.min(desired.Height, sd.ExtentHeight);
                return desired;
            };
            ScrollContentPresenter.prototype._ArrangeOverride = function (finalSize, error) {
                var scrollOwner = this.ScrollOwner;
                var cr = this.XamlNode.ContentRoot;
                if(!scrollOwner || !cr) {
                    return (_super.prototype)._ArrangeOverride.call(this, finalSize, error);
                }
                if(this._ClampOffsets()) {
                    scrollOwner.InvalidateScrollInfo();
                }
                var desired = cr.DesiredSize;
                var start = new Point(-this.HorizontalOffset, -this.VerticalOffset);
                var offerSize = size.clone(desired);
                size.max(offerSize, finalSize);
                var childRect = rect.fromSize(offerSize);
                childRect.X = start.X;
                childRect.Y = start.Y;
                cr.Arrange(childRect);
                this._UpdateClip(finalSize);
                var sd = this._ScrollData;
                this._UpdateExtents(finalSize, sd.ExtentWidth, sd.ExtentHeight);
                return finalSize;
            };
            ScrollContentPresenter.prototype._UpdateExtents = function (viewport, extentWidth, extentHeight) {
                var sd = this._ScrollData;
                var changed = sd.ViewportWidth !== viewport.Width || sd.ViewportHeight !== viewport.Height || sd.ExtentWidth !== extentWidth || sd.ExtentHeight !== extentHeight;
                sd.ViewportWidth = viewport.Width;
                sd.ViewportHeight = viewport.Height;
                sd.ExtentWidth = extentWidth;
                sd.ExtentHeight = extentHeight;
                if(this._ClampOffsets()) {
                    changed = true;
                }
                if(changed) {
                    this.ScrollOwner.InvalidateScrollInfo();
                }
            };
            ScrollContentPresenter.prototype._ClampOffsets = function () {
                var changed = false;
                var sd = this._ScrollData;
                var result = this.CanHorizontallyScroll ? Math.min(sd.CachedOffsetX, sd.ExtentWidth - sd.ViewportWidth) : 0;
                result = Math.max(0, result);
                if(!areNumbersClose(result, this.HorizontalOffset)) {
                    sd.OffsetX = result;
                    changed = true;
                }
                result = this.CanVerticallyScroll ? Math.min(sd.CachedOffsetY, sd.ExtentHeight - sd.ViewportHeight) : 0;
                result = Math.max(0, result);
                if(!areNumbersClose(result, this.VerticalOffset)) {
                    sd.OffsetY = result;
                    changed = true;
                }
                return changed;
            };
            ScrollContentPresenter.prototype._UpdateClip = function (arrangeSize) {
                if(!this._IsClipPropertySet) {
                    this._ClippingRectangle = new Fayde.Media.RectangleGeometry();
                    this.Clip = this._ClippingRectangle;
                    this._IsClipPropertySet = true;
                }
                var content;
                if(this.TemplateOwner instanceof Fayde.Controls.ScrollViewer && (content = this.Content) && (content instanceof Fayde.Controls.Internal.TextBoxView || content instanceof Fayde.Controls._RichTextBoxView)) {
                    //ScrollViewer inside TextBox/RichTextBox
                    this._ClippingRectangle.Rect = this._CalculateTextBoxClipRect(arrangeSize);
                } else {
                    this._ClippingRectangle.Rect = rect.fromSize(arrangeSize);
                }
            };
            ScrollContentPresenter.prototype._CalculateTextBoxClipRect = function (arrangeSize) {
                var left = 0;
                var right = 0;
                var sd = this._ScrollData;
                var width = sd.ExtentWidth;
                var num = sd.ViewportWidth;
                var x = sd.OffsetX;
                var templatedParent;
                if(this.TemplateOwner instanceof Controls.ScrollViewer) {
                    templatedParent = this.TemplateOwner;
                }
                var to = templatedParent.TemplateOwner;
                var textWrapping = Controls.TextWrapping.NoWrap;
                var horizontalScrollBarVisibility = Controls.ScrollBarVisibility.Disabled;
                if(to instanceof Controls.TextBox) {
                    var textbox = to;
                    textWrapping = textbox.TextWrapping;
                    horizontalScrollBarVisibility = textbox.HorizontalScrollBarVisibility;
                } else if(to instanceof Controls.RichTextBox) {
                    var richtextbox = to;
                    textWrapping = richtextbox.TextWrapping;
                    horizontalScrollBarVisibility = richtextbox.HorizontalScrollBarVisibility;
                }
                var padding = templatedParent.Padding;
                if(textWrapping !== Controls.TextWrapping.Wrap) {
                    if(num > width || x === 0) {
                        left = padding.Left + 1;
                    }
                    if(num > width || horizontalScrollBarVisibility !== Controls.ScrollBarVisibility.Disabled && Math.abs(width - x + num) <= 1) {
                        right = padding.Right + 1;
                    }
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
            return ScrollContentPresenter;
        })(Controls.ContentPresenter);
        Controls.ScrollContentPresenter = ScrollContentPresenter;        
        Nullstone.RegisterType(ScrollContentPresenter, "ScrollContentPresenter", [
            Controls.Primitives.IScrollInfo_
        ]);
        function validateInputOffset(offset) {
            if(!isNaN(offset)) {
                return Math.max(0, offset);
            }
            throw new ArgumentException("Offset is not a number.");
        }
        function areNumbersClose(val1, val2) {
            if(val1 === val2) {
                return true;
            }
            var num1 = (Math.abs(val1) + Math.abs(val2) + 10) * 1.11022302462516e-16;
            var num2 = val1 - val2;
            return -num1 < num2 && num1 > num2;
        }
        function isNumberLessThan(val1, val2) {
            if(val1 >= val2) {
                return false;
            }
            return !areNumbersClose(val1, val2);
        }
        function isNumberGreaterThan(val1, val2) {
            if(val1 <= val2) {
                return false;
            }
            return !areNumbersClose(val1, val2);
        }
        function computeScrollOffsetWithMinimalScroll(topView, bottomView, topChild, bottomChild) {
            var flag = isNumberLessThan(topChild, topView) && isNumberLessThan(bottomChild, bottomView);
            var flag1 = isNumberGreaterThan(topChild, topView) && isNumberGreaterThan(bottomChild, bottomView);
            var flag4 = (bottomChild - topChild) > (bottomView - topView);
            if((!flag || flag4) && (!flag1 || !flag4)) {
                if(flag || flag1) {
                    return bottomChild - bottomView - topView;
                }
                return topView;
            }
            return topChild;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ScrollContentPresenter.js.map
