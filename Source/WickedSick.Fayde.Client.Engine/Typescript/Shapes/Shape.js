var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Media/Brush.ts" />
    /// <reference path="../Media/Enums.ts" />
    /// <reference path="Enums.ts" />
    /// <reference path="DoubleCollection.ts" />
    /// <reference path="Rectangle.ts" />
    /// <reference path="Ellipse.ts" />
    /// <reference path="Line.ts" />
    (function (Shapes) {
        var ShapeNode = (function (_super) {
            __extends(ShapeNode, _super);
            function ShapeNode(xobj) {
                        _super.call(this, xobj);
            }
            ShapeNode.prototype._CanFindElement = function () {
                var shape = this.XObject;
                return (shape)._Fill != null || (shape)._Stroke != null;
            };
            ShapeNode.prototype._InsideObject = function (ctx, lu, x, y) {
                if(!this._InsideLayoutClip(lu, x, y)) {
                    return false;
                }
                if(!this._InsideClip(ctx, lu, x, y)) {
                    return false;
                }
                var p = new Point(x, y);
                lu.TransformPoint(p);
                x = p.X;
                y = p.Y;
                var shape = this.XObject;
                if(!rect.containsPointXY(this.GetStretchExtents(shape, lu), x, y)) {
                    return false;
                }
                return shape._InsideShape(ctx, lu, x, y);
            };
            ShapeNode.prototype.ComputeBounds = function (baseComputer, lu) {
                this.IntersectBaseBoundsWithClipPath(lu, lu.Bounds, this.GetStretchExtents(this.XObject, lu), lu.AbsoluteXform);
                rect.copyTo(lu.Bounds, lu.BoundsWithChildren);
                lu.ComputeGlobalBounds();
                lu.ComputeSurfaceBounds();
            };
            ShapeNode.prototype.IntersectBaseBoundsWithClipPath = function (lu, dest, baseBounds, xform) {
                var isClipEmpty = rect.isEmpty(lu.ClipBounds);
                var isLayoutClipEmpty = rect.isEmpty(lu.LayoutClipBounds);
                if((!isClipEmpty || !isLayoutClipEmpty) && !lu.TotalIsRenderVisible) {
                    rect.clear(dest);
                    return;
                }
                rect.copyGrowTransform(dest, baseBounds, lu.EffectPadding, xform);
                if(!isClipEmpty) {
                    rect.intersection(dest, lu.ClipBounds);
                }
                if(!isLayoutClipEmpty) {
                    rect.intersection(dest, lu.LayoutClipBounds);
                }
            };
            ShapeNode.prototype.UpdateStretch = function () {
                var lu = this.LayoutUpdater;
                rect.clear(lu.Extents);
                rect.clear(lu.ExtentsWithChildren);
            };
            ShapeNode.prototype.GetStretchExtents = function (shape, lu) {
                if(rect.isEmpty(lu.Extents)) {
                    rect.copyTo(shape._ComputeStretchBounds(), lu.Extents);
                    rect.copyTo(lu.Extents, lu.ExtentsWithChildren);
                }
                return lu.Extents;
            };
            return ShapeNode;
        })(Fayde.FENode);
        Shapes.ShapeNode = ShapeNode;        
        function isSignificant(dx, x) {
            return Math.abs(x) < 0.000019 && (Math.abs(dx) * x - x) > 1.0;
        }
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape() {
                _super.apply(this, arguments);

                this._ShapeFlags = Shapes.ShapeFlags.None;
                this._StretchXform = mat3.identity();
                this._NaturalBounds = new rect();
                this._Path = null;
                this._Fill = null;
                this._Stroke = null;
            }
            Shape.prototype.CreateNode = function () {
                return new ShapeNode(this);
            };
            Shape.FillProperty = DependencyProperty.Register("Fill", function () {
                return Fayde.Media.Brush;
            }, Shape, undefined, function (d, args) {
                return (d)._FillChanged(args);
            });
            Shape.StretchProperty = DependencyProperty.Register("Stretch", function () {
                return new Enum(Fayde.Media.Stretch);
            }, Shape, Fayde.Media.Stretch.None, function (d, args) {
                return (d)._StretchChanged(args);
            });
            Shape.StrokeProperty = DependencyProperty.Register("Stroke", function () {
                return Fayde.Media.Brush;
            }, Shape, undefined, function (d, args) {
                return (d)._StrokeChanged(args);
            });
            Shape.StrokeThicknessProperty = DependencyProperty.Register("StrokeThickness", function () {
                return Number;
            }, Shape, 1.0, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.StrokeDashArrayProperty = DependencyProperty.Register("StrokeDashArray", function () {
                return Shapes.DoubleCollection;
            }, Shape, undefined, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.StrokeDashCapProperty = DependencyProperty.Register("StrokeDashCap", function () {
                return new Enum(Shapes.PenLineCap);
            }, Shape, Shapes.PenLineCap.Flat, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.StrokeDashOffsetProperty = DependencyProperty.Register("StrokeDashOffset", function () {
                return Number;
            }, Shape, 0.0, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.StrokeEndLineCapProperty = DependencyProperty.Register("StrokeEndLineCap", function () {
                return new Enum(Shapes.PenLineCap);
            }, Shape, Shapes.PenLineCap.Flat, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.StrokeLineJoinProperty = DependencyProperty.Register("StrokeLineJoin", function () {
                return new Enum(Shapes.PenLineJoin);
            }, Shape, Shapes.PenLineJoin.Miter, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.StrokeMiterLimitProperty = DependencyProperty.Register("StrokeMiterLimit", function () {
                return Number;
            }, Shape, 10.0, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.StrokeStartLineCapProperty = DependencyProperty.Register("StrokeStartLineCap", function () {
                return new Enum(Shapes.PenLineCap);
            }, Shape, Shapes.PenLineCap.Flat, function (d, args) {
                return (d)._InvalidateNaturalBounds();
            });
            Shape.prototype._InsideShape = function (ctx, lu, x, y) {
                if(this._ShapeFlags & Shapes.ShapeFlags.Empty) {
                    return false;
                }
                var ret = false;
                var area = this.XamlNode.GetStretchExtents(this, lu);
                ctx.Save();
                ctx.PreTransformMatrix(this._StretchXform);
                if(this._Fill != null) {
                    this._DrawPath(ctx);
                    if(ctx.IsPointInPath(new Point(x, y))) {
                        ret = true;
                    }
                }
                if(!ret && this._Stroke != null) {
                    NotImplemented("Shape._InsideShape-Stroke");
                }
                ctx.Restore();
                return ret;
            };
            Shape.prototype._MeasureOverride = function (availableSize, error) {
                var shapeBounds = this._GetNaturalBounds();
                if(!shapeBounds) {
                    return new size();
                }
                var sx = 0.0;
                var sy = 0.0;
                var desired;
                if(this instanceof Shapes.Rectangle || this instanceof Shapes.Ellipse) {
                    desired = new size();
                } else {
                    desired = size.clone(availableSize);
                }
                var stretch = this.Stretch;
                if(stretch === Fayde.Media.Stretch.None) {
                    return size.fromRaw(shapeBounds.X + shapeBounds.Width, shapeBounds.Y + shapeBounds.Height);
                }
                if(!isFinite(availableSize.Width)) {
                    desired.Width = shapeBounds.Width;
                }
                if(!isFinite(availableSize.Height)) {
                    desired.Height = shapeBounds.Height;
                }
                if(shapeBounds.Width > 0) {
                    sx = desired.Width / shapeBounds.Width;
                }
                if(shapeBounds.Height > 0) {
                    sy = desired.Height / shapeBounds.Height;
                }
                if(!isFinite(availableSize.Width)) {
                    sx = sy;
                }
                if(!isFinite(availableSize.Height)) {
                    sy = sx;
                }
                switch(stretch) {
                    case Fayde.Media.Stretch.Uniform:
                        sx = sy = Math.min(sx, sy);
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        sx = sy = Math.max(sx, sy);
                        break;
                    case Fayde.Media.Stretch.Fill:
                        if(!isFinite(availableSize.Width)) {
                            sx = 1.0;
                        }
                        if(!isFinite(availableSize.Height)) {
                            sy = 1.0;
                        }
                        break;
                    default:
                        break;
                }
                desired.Width = shapeBounds.Width * sx;
                desired.Height = shapeBounds.Height * sy;
                return desired;
            };
            Shape.prototype._ArrangeOverride = function (finalSize, error) {
                var sx = 1.0;
                var sy = 1.0;
                var shapeBounds = this._GetNaturalBounds();
                if(!shapeBounds) {
                    return new size();
                }
                this._InvalidateStretch();
                var arranged;
                var stretch = this.Stretch;
                if(stretch === Fayde.Media.Stretch.None) {
                    arranged = size.fromRaw(Math.max(finalSize.Width, shapeBounds.X + shapeBounds.Width), Math.max(finalSize.Height, shapeBounds.Y + shapeBounds.Height));
                } else {
                    arranged = size.clone(finalSize);
                }
                if(shapeBounds.Width === 0) {
                    shapeBounds.Width = arranged.Width;
                }
                if(shapeBounds.Height === 0) {
                    shapeBounds.Height = arranged.Height;
                }
                if(shapeBounds.Width !== arranged.Width) {
                    sx = arranged.Width / shapeBounds.Width;
                }
                if(shapeBounds.Height !== arranged.Height) {
                    sy = arranged.Height / shapeBounds.Height;
                }
                switch(stretch) {
                    case Fayde.Media.Stretch.Uniform:
                        sx = sy = Math.min(sx, sy);
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        sx = sy = Math.max(sx, sy);
                        break;
                    default:
                        break;
                }
                arranged.Width = shapeBounds.Width * sx;
                arranged.Height = shapeBounds.Height * sy;
                return arranged;
            };
            Shape.prototype.Render = function (ctx, lu, region) {
                if(this._ShapeFlags & Shapes.ShapeFlags.Empty) {
                    return;
                }
                var area = this.XamlNode.GetStretchExtents(this, lu);
                ctx.Save();
                ctx.PreTransformMatrix(this._StretchXform);
                this._DrawPath(ctx);
                if(this._Fill != null) {
                    ctx.Fill(this._Fill, area);
                }
                if(this._Stroke != null) {
                    ctx.Stroke(this._Stroke, this.StrokeThickness, area);
                }
                ctx.Restore();
            };
            Shape.prototype._GetFillRule = function () {
                return Shapes.FillRule.NonZero;
            };
            Shape.prototype._BuildPath = function () {
            };
            Shape.prototype._DrawPath = function (ctx) {
                this._Path.DrawRenderCtx(ctx);
            };
            Shape.prototype.ComputeActualSize = function (baseComputer, lu) {
                var desired = baseComputer.call(this);
                var node = this.XamlNode;
                var lu = node.LayoutUpdater;
                var shapeBounds = this._GetNaturalBounds();
                var sx = 1.0;
                var sy = 1.0;
                var visualParentNode = node.VisualParentNode;
                if(visualParentNode != null && !(visualParentNode instanceof Fayde.Controls.CanvasNode)) {
                    if(lu.PreviousConstraint !== undefined || lu.LayoutSlot !== undefined) {
                        return desired;
                    }
                }
                if(!node.IsAttached) {
                    return desired;
                }
                if(shapeBounds.Width <= 0 && shapeBounds.Height <= 0) {
                    return desired;
                }
                var stretch = this.Stretch;
                if(stretch === Fayde.Media.Stretch.None && shapeBounds.Width > 0 && shapeBounds.Height > 0) {
                    return size.fromRect(shapeBounds);
                }
                if(!isFinite(desired.Width)) {
                    desired.Width = shapeBounds.Width;
                }
                if(!isFinite(desired.Height)) {
                    desired.Height = shapeBounds.Height;
                }
                if(shapeBounds.Width > 0) {
                    sx = desired.Width / shapeBounds.Width;
                }
                if(shapeBounds.Height > 0) {
                    sy = desired.Height / shapeBounds.Height;
                }
                switch(stretch) {
                    case Fayde.Media.Stretch.Uniform:
                        sx = sy = Math.min(sx, sy);
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        sx = sy = Math.max(sx, sy);
                        break;
                    default:
                        break;
                }
                desired.Width = Math.min(desired.Width, shapeBounds.Width * sx);
                desired.Height = Math.min(desired.Height, shapeBounds.Height * sy);
                return desired;
            };
            Shape.prototype._ComputeStretchBounds = function () {
                var shapeBounds = this._GetNaturalBounds();
                if(!shapeBounds || shapeBounds.Width <= 0.0 || shapeBounds.Height <= 0.0) {
                    this._ShapeFlags = Shapes.ShapeFlags.Empty;
                    return new rect();
                }
                var specified = size.fromRaw(this.Width, this.Height);
                var autoDim = isNaN(specified.Width);
                var framework = size.fromRaw(this.ActualWidth, this.ActualHeight);
                if(specified.Width <= 0.0 || specified.Height <= 0.0) {
                    this._ShapeFlags = Shapes.ShapeFlags.Empty;
                    return new rect();
                }
                var node = this.XamlNode;
                var lu = node.LayoutUpdater;
                var vpNode = node.VisualParentNode;
                if(vpNode instanceof Fayde.Controls.CanvasNode) {
                    framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
                    framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
                    if(!isNaN(specified.Width)) {
                        framework.Width = specified.Width;
                    }
                    if(!isNaN(specified.Height)) {
                        framework.Height = specified.Height;
                    }
                } else if(!lu.PreviousConstraint) {
                    framework.Width = framework.Width === 0.0 ? shapeBounds.Width : framework.Width;
                    framework.Height = framework.Height === 0.0 ? shapeBounds.Height : framework.Height;
                }
                var stretch = this.Stretch;
                if(stretch === Fayde.Media.Stretch.None) {
                    rect.transform(shapeBounds, this._StretchXform);
                    return shapeBounds;
                }
                if(framework.Width === 0.0 || framework.Height === 0.0) {
                    this._ShapeFlags = Shapes.ShapeFlags.Empty;
                    return new rect();
                }
                var logicalBounds = this._ComputeShapeBoundsImpl(true, null);
                var adjX = logicalBounds.Width !== 0.0;
                var adjY = logicalBounds.Height !== 0.0;
                var diffX = shapeBounds.Width - logicalBounds.Width;
                var diffY = shapeBounds.Height - logicalBounds.Height;
                var sw = adjX ? (framework.Width - diffX) / logicalBounds.Width : 1.0;
                var sh = adjY ? (framework.Height - diffY) / logicalBounds.Height : 1.0;
                var center = false;
                switch(stretch) {
                    case Fayde.Media.Stretch.Fill:
                        center = true;
                        break;
                    case Fayde.Media.Stretch.Uniform:
                        sw = sh = (sw < sh) ? sw : sh;
                        center = true;
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        sw = sh = (sw > sh) ? sw : sh;
                        break;
                }
                if((adjX && isSignificant(sw - 1, shapeBounds.Width)) || (adjY && isSignificant(sh - 1, shapeBounds.Height))) {
                    var temp = mat3.createScale(adjX ? sw : 1.0, adjY ? sh : 1.0);
                    var stretchBounds = this._ComputeShapeBoundsImpl(false, temp);
                    if(stretchBounds.Width !== shapeBounds.Width && stretchBounds.Height !== shapeBounds.Height) {
                        sw *= adjX ? (framework.Width - stretchBounds.Width + logicalBounds.Width * sw) / (logicalBounds.Width * sw) : 1.0;
                        sh *= adjY ? (framework.Height - stretchBounds.Height + logicalBounds.Height * sh) / (logicalBounds.Height * sh) : 1.0;
                        switch(stretch) {
                            case Fayde.Media.Stretch.Uniform:
                                sw = sh = (sw < sh) ? sw : sh;
                                break;
                            case Fayde.Media.Stretch.UniformToFill:
                                sw = sh = (sw > sh) ? sw : sh;
                                break;
                        }
                    }
                }
                var x = (!autoDim || adjX) ? shapeBounds.X : 0;
                var y = (!autoDim || adjY) ? shapeBounds.Y : 0;
                var st = this._StretchXform;
                if(!(this instanceof Shapes.Line) || !autoDim) {
                    mat3.translate(st, -x, -y);
                }
                mat3.translate(st, adjX ? -shapeBounds.Width * 0.5 : 0.0, adjY ? -shapeBounds.Height * 0.5 : 0.0);
                mat3.scale(st, adjX ? sw : 1.0, adjY ? sh : 1.0);
                if(center) {
                    mat3.translate(st, adjX ? framework.Width * 0.5 : 0, adjY ? framework.Height * 0.5 : 0);
                } else {
                    mat3.translate(st, adjX ? (logicalBounds.Width * sw + diffX) * 0.5 : 0, adjY ? (logicalBounds.Height * sh + diffY) * 0.5 : 0);
                }
                this._StretchXform = st;
                rect.transform(shapeBounds, this._StretchXform);
                return shapeBounds;
            };
            Shape.prototype._GetNaturalBounds = function () {
                if(!this._NaturalBounds) {
                    return;
                }
                if(rect.isEmpty(this._NaturalBounds)) {
                    this._NaturalBounds = this._ComputeShapeBoundsImpl(false);
                }
                return this._NaturalBounds;
            };
            Shape.prototype._ComputeShapeBounds = function (logical) {
                return this._ComputeShapeBoundsImpl(logical, null);
            };
            Shape.prototype._ComputeShapeBoundsImpl = function (logical, matrix) {
                var thickness = (logical || !this._Stroke) ? 0.0 : this.StrokeThickness;
                if(!this._Path) {
                    this._BuildPath();
                }
                if(this._ShapeFlags & Shapes.ShapeFlags.Empty) {
                    return new rect();
                }
                if(logical) {
                } else if(thickness > 0) {
                } else {
                }
                NotImplemented("Shape._ComputeShapeBoundsImpl");
                return new rect();
            };
            Shape.prototype._InvalidateStretch = function () {
                this.XamlNode.UpdateStretch();
                this._StretchXform = mat3.identity();
                this._InvalidatePathCache();
            };
            Shape.prototype._InvalidatePathCache = function (free) {
                this._Path = null;
                if(!free) {
                    this.XamlNode.LayoutUpdater.UpdateBounds(true);
                }
            };
            Shape.prototype._InvalidateNaturalBounds = function () {
                rect.clear(this._NaturalBounds);
                this._InvalidateStretch();
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            Shape.prototype._FillChanged = function (args) {
                var oldFill = args.OldValue;
                var newFill = args.NewValue;
                if(oldFill) {
                    oldFill.Unlisten(this);
                }
                if(newFill) {
                    newFill.Listen(this);
                }
                if(this._Fill || newFill) {
                    this._InvalidateNaturalBounds();
                }
                this._Fill = newFill;
            };
            Shape.prototype._StrokeChanged = function (args) {
                var oldStroke = args.OldValue;
                var newStroke = args.NewValue;
                if(oldStroke) {
                    oldStroke.Unlisten(this);
                }
                if(newStroke) {
                    newStroke.Listen(this);
                }
                if(this._Stroke || newStroke) {
                    this._InvalidateNaturalBounds();
                }
                this._Stroke = newStroke;
            };
            Shape.prototype.BrushChanged = function (newBrush) {
                this.XamlNode.LayoutUpdater.Invalidate();
                //this._InvalidateSurfaceCache();
                            };
            Shape.prototype._StretchChanged = function (args) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
                this._InvalidateStretch();
            };
            Shape.prototype._WidthChanged = function (args) {
                _super.prototype._WidthChanged.call(this, args);
                this._InvalidateStretch();
            };
            Shape.prototype._HeightChanged = function (args) {
                _super.prototype._HeightChanged.call(this, args);
                this._InvalidateStretch();
            };
            return Shape;
        })(Fayde.FrameworkElement);
        Shapes.Shape = Shape;        
        Nullstone.RegisterType(Shape, "Shape");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Shape.js.map
