var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    (function (Controls) {
        var BorderNode = (function (_super) {
            __extends(BorderNode, _super);
            function BorderNode(xobj) {
                        _super.call(this, xobj);
                this.LayoutUpdater.SetContainerMode(true);
            }
            BorderNode.prototype._CanFindElement = function () {
                var xobj = this.XObject;
                return xobj.Background != null || xobj.BorderBrush != null;
            };
            return BorderNode;
        })(Fayde.FENode);
        Controls.BorderNode = BorderNode;        
        Nullstone.RegisterType(BorderNode, "BorderNode");
        var Border = (function (_super) {
            __extends(Border, _super);
            function Border() {
                _super.apply(this, arguments);

            }
            Border.prototype.CreateNode = function () {
                return new BorderNode(this);
            };
            Border.BackgroundProperty = DependencyProperty.RegisterCore("Background", function () {
                return Fayde.Media.Brush;
            }, Border, undefined, function (d, args) {
                return (d)._BackgroundChanged(args);
            });
            Border.BorderBrushProperty = DependencyProperty.RegisterCore("BorderBrush", function () {
                return Fayde.Media.Brush;
            }, Border, undefined, function (d, args) {
                return (d)._BorderBrushChanged(args);
            });
            Border.BorderThicknessProperty = DependencyProperty.RegisterFull("BorderThickness", function () {
                return Thickness;
            }, Border, undefined, function (d, args) {
                return (d)._BorderThicknessChanged(args);
            });
            Border.ChildProperty = DependencyProperty.RegisterCore("Child", function () {
                return Fayde.UIElement;
            }, Border, undefined, function (d, args) {
                return (d)._ChildChanged(args);
            });
            Border.CornerRadiusProperty = DependencyProperty.RegisterFull("CornerRadius", function () {
                return CornerRadius;
            }, Border);
            Border.PaddingProperty = DependencyProperty.RegisterFull("Padding", function () {
                return Thickness;
            }, Border, undefined, function (d, args) {
                return (d)._PaddingChanged(args);
            });
            Border.Annotations = {
                ContentProperty: Border.ChildProperty
            };
            Border.prototype._MeasureOverride = function (availableSize, error) {
                var border = this.Padding.Plus(this.BorderThickness);
                var desired = new size();
                availableSize = size.shrinkByThickness(size.clone(availableSize), border);
                var child = this.Child;
                if(child) {
                    var lu = child.XamlNode.LayoutUpdater;
                    lu._Measure(availableSize, error);
                    desired = size.clone(lu.DesiredSize);
                }
                size.growByThickness(desired, border);
                size.min(desired, availableSize);
                return desired;
            };
            Border.prototype._ArrangeOverride = function (finalSize, error) {
                var child = this.Child;
                if(child) {
                    var border = this.Padding.Plus(this.BorderThickness);
                    var childRect = rect.fromSize(finalSize);
                    rect.shrinkByThickness(childRect, border);
                    child.XamlNode.LayoutUpdater._Arrange(childRect, error);
                    /*
                    arranged = size.fromRect(childRect);
                    size.growByThickness(arranged, border);
                    size.max(arranged, finalSize);
                    */
                                    }
                return finalSize;
            };
            Border.prototype._ChildChanged = function (args) {
                var olduie = args.OldValue;
                var newuie = args.NewValue;
                var node = this.XamlNode;
                var error = new BError();
                if(olduie instanceof Fayde.UIElement) {
                    node.DetachVisualChild(olduie, error);
                }
                if(newuie instanceof Fayde.UIElement) {
                    node.AttachVisualChild(newuie, error);
                }
                if(error.Message) {
                    error.ThrowException();
                }
                var lu = node.LayoutUpdater;
                lu.UpdateBounds();
                lu.InvalidateMeasure();
            };
            Border.prototype._BackgroundChanged = function (args) {
                var oldBrush = args.OldValue;
                var newBrush = args.NewValue;
                if(oldBrush) {
                    oldBrush.Unlisten(this);
                }
                if(newBrush) {
                    newBrush.Listen(this);
                }
                this.BrushChanged(newBrush);
            };
            Border.prototype._BorderBrushChanged = function (args) {
                var oldBrush = args.OldValue;
                var newBrush = args.NewValue;
                if(oldBrush) {
                    oldBrush.Unlisten(this);
                }
                if(newBrush) {
                    newBrush.Listen(this);
                }
                this.BrushChanged(newBrush);
            };
            Border.prototype._BorderThicknessChanged = function (args) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            Border.prototype._PaddingChanged = function (args) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            Border.prototype.BrushChanged = function (newBrush) {
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            Border.prototype.Render = function (ctx, lu, region) {
                var borderBrush = this.BorderBrush;
                var extents = lu.Extents;
                var backgroundBrush = this.Background;
                if(!backgroundBrush && !borderBrush) {
                    return;
                }
                if(rect.isEmpty(extents)) {
                    return;
                }
                var thickness = this.BorderThickness;
                var fillOnly = !borderBrush || thickness.IsEmpty();
                if(fillOnly && !backgroundBrush) {
                    return;
                }
                ctx.Save();
                lu._RenderLayoutClip(ctx);
                if(fillOnly) {
                    this._RenderFillOnly(ctx, extents, backgroundBrush, thickness, this.CornerRadius);
                } else if(thickness.IsBalanced()) {
                    this._RenderBalanced(ctx, extents, backgroundBrush, borderBrush, thickness, this.CornerRadius);
                } else {
                    this._RenderUnbalanced(ctx, extents, backgroundBrush, borderBrush, thickness, this.CornerRadius);
                }
                ctx.Restore();
            };
            Border.prototype._RenderFillOnly = function (ctx, extents, backgroundBrush, thickness, cornerRadius) {
                var fillExtents = rect.clone(extents);
                if(!thickness.IsEmpty()) {
                    rect.shrinkByThickness(fillExtents, thickness);
                }
                if(cornerRadius.IsZero()) {
                    ctx.FillRect(backgroundBrush, fillExtents);
                    return;
                }
                var rawPath = new Fayde.Shapes.RawPath();
                rawPath.RoundedRectFull(fillExtents.X, fillExtents.Y, fillExtents.Width, fillExtents.Height, cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
                rawPath.DrawRenderCtx(ctx);
                ctx.Fill(backgroundBrush, fillExtents);
            };
            Border.prototype._RenderBalanced = function (ctx, extents, backgroundBrush, borderBrush, thickness, cornerRadius) {
                //Stroke renders half-out/half-in the path, Border control needs to fit within the given extents so we need to shrink by half the border thickness
                var full = thickness.Left;
                var half = full * 0.5;
                var strokeExtents = rect.clone(extents);
                rect.shrinkBy(strokeExtents, half, half, half, half);
                var fillExtents = rect.clone(extents);
                rect.shrinkBy(fillExtents, full, full, full, full);
                if(cornerRadius.IsZero()) {
                    //Technically this fills outside it's fill extents, we may need to do something different for a transparent border brush
                    if(backgroundBrush) {
                        ctx.StrokeAndFillRect(borderBrush, thickness.Left, strokeExtents, backgroundBrush, fillExtents);
                    } else {
                        ctx.Rect(fillExtents);
                        ctx.Stroke(borderBrush, thickness.Left, extents);
                    }
                } else {
                    var rawPath = new Fayde.Shapes.RawPath();
                    rawPath.RoundedRectFull(strokeExtents.X, strokeExtents.Y, strokeExtents.Width, strokeExtents.Height, cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
                    rawPath.DrawRenderCtx(ctx);
                    if(backgroundBrush) {
                        ctx.Fill(backgroundBrush, fillExtents);
                    }
                    ctx.Stroke(borderBrush, thickness.Left, extents);
                }
            };
            Border.prototype._RenderUnbalanced = function (ctx, extents, backgroundBrush, borderBrush, thickness, cornerRadius) {
                var hasCornerRadius = !cornerRadius.IsZero();
                var innerExtents = rect.clone(extents);
                rect.shrinkByThickness(innerExtents, thickness);
                var innerPath = new Fayde.Shapes.RawPath();
                var outerPath = new Fayde.Shapes.RawPath();
                if(hasCornerRadius) {
                    outerPath.RoundedRectFull(0, 0, extents.Width, extents.Height, cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
                    innerPath.RoundedRectFull(innerExtents.X - extents.X, innerExtents.Y - extents.Y, innerExtents.Width, innerExtents.Height, cornerRadius.TopLeft, cornerRadius.TopRight, cornerRadius.BottomRight, cornerRadius.BottomLeft);
                } else {
                    outerPath.Rect(0, 0, extents.Width, extents.Height);
                    innerPath.Rect(innerExtents.X - extents.X, innerExtents.Y - extents.Y, innerExtents.Width, innerExtents.Height);
                }
                var tmpCanvas = document.createElement("canvas");
                tmpCanvas.width = extents.Width;
                tmpCanvas.height = extents.Height;
                var tmpCtx = tmpCanvas.getContext("2d");
                outerPath.DrawCanvasCtx(tmpCtx);
                borderBrush.SetupBrush(tmpCtx, extents);
                tmpCtx.fillStyle = borderBrush.ToHtml5Object();
                tmpCtx.fill();
                tmpCtx.globalCompositeOperation = "xor";
                innerPath.DrawCanvasCtx(tmpCtx);
                tmpCtx.fill();
                ctx.CanvasContext.drawImage(tmpCanvas, extents.X, extents.Y);
                //DrawDebug("Draw Image (Border)");
                innerPath.DrawRenderCtx(ctx);
                if(backgroundBrush) {
                    ctx.Fill(backgroundBrush, innerExtents);
                }
            };
            return Border;
        })(Fayde.FrameworkElement);
        Controls.Border = Border;        
        Nullstone.RegisterType(Border, "Border");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Border.js.map
