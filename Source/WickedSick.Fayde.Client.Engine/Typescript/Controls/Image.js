var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Media/Imaging/BitmapImage.ts" />
    /// <reference path="../Media/Enums.ts" />
    (function (Controls) {
        function computeMatrix(width, height, sw, sh, stretch, alignX, alignY) {
            var sx = width / sw;
            var sy = height / sh;
            if(width === 0) {
                sx = 1.0;
            }
            if(height === 0) {
                sy = 1.0;
            }
            if(stretch === Fayde.Media.Stretch.Fill) {
                return mat3.createScale(sx, sy);
            }
            var scale = 1.0;
            var dx = 0.0;
            var dy = 0.0;
            switch(stretch) {
                case Fayde.Media.Stretch.Uniform:
                    scale = sx < sy ? sx : sy;
                    break;
                case Fayde.Media.Stretch.UniformToFill:
                    scale = sx < sy ? sy : sx;
                    break;
                case Fayde.Media.Stretch.None:
                    break;
            }
            switch(alignX) {
                case Fayde.Media.AlignmentX.Left:
                    dx = 0.0;
                    break;
                case Fayde.Media.AlignmentX.Center:
                    dx = (width - (scale * sw)) / 2;
                    break;
                case Fayde.Media.AlignmentX.Right:
                default:
                    dx = width - (scale * sw);
                    break;
            }
            switch(alignY) {
                case Fayde.Media.AlignmentY.Top:
                    dy = 0.0;
                    break;
                case Fayde.Media.AlignmentY.Center:
                    dy = (height - (scale * sh)) / 2;
                    break;
                case Fayde.Media.AlignmentY.Bottom:
                default:
                    dy = height - (scale * sh);
                    break;
            }
            var m = mat3.createScale(scale, scale);
            mat3.translate(m, dx, dy);
            return m;
        }
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image() {
                _super.apply(this, arguments);

                this.ImageOpened = new MulticastEvent();
                this.ImageFailed = new MulticastEvent();
            }
            Image.SourceProperty = DependencyProperty.RegisterFull("Source", function () {
                return Fayde.Media.Imaging.ImageSource;
            }, Image, undefined, function (d, args) {
                return (d)._SourceChanged(args);
            });
            Image.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () {
                return new Enum(Fayde.Media.Stretch);
            }, Image, Fayde.Media.Stretch.Uniform);
            Image.prototype._MeasureOverride = function (availableSize, error) {
                var desired = size.clone(availableSize);
                var shapeBounds = new rect();
                var source = this.Source;
                var sx = 0.0;
                var sy = 0.0;
                if(source) {
                    shapeBounds.Width = source.PixelWidth;
                    shapeBounds.Height = source.PixelHeight;
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
                if(!isFinite(availableSize.Width)) {
                    sx = sy;
                }
                if(!isFinite(availableSize.Height)) {
                    sy = sx;
                }
                switch(this.Stretch) {
                    case Fayde.Media.Stretch.Uniform:
                        sx = sy = Math.min(sx, sy);
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        sx = sy = Math.max(sx, sy);
                        break;
                    case Fayde.Media.Stretch.Fill:
                        if(!isFinite(availableSize.Width)) {
                            sx = sy;
                        }
                        if(!isFinite(availableSize.Height)) {
                            sy = sx;
                        }
                        break;
                    case Fayde.Media.Stretch.None:
                        sx = sy = 1.0;
                        break;
                }
                desired.Width = shapeBounds.Width * sx;
                desired.Height = shapeBounds.Height * sy;
                return desired;
            };
            Image.prototype._ArrangeOverride = function (finalSize, error) {
                var arranged = size.clone(finalSize);
                var shapeBounds = new rect();
                var source = this.Source;
                var sx = 1.0;
                var sy = 1.0;
                if(source) {
                    shapeBounds.Width = source.PixelWidth;
                    shapeBounds.Height = source.PixelHeight;
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
                switch(this.Stretch) {
                    case Fayde.Media.Stretch.Uniform:
                        sx = sy = Math.min(sx, sy);
                        break;
                    case Fayde.Media.Stretch.UniformToFill:
                        sx = sy = Math.max(sx, sy);
                        break;
                    case Fayde.Media.Stretch.None:
                        sx = sy = 1.0;
                        break;
                    default:
                        break;
                }
                arranged.Width = shapeBounds.Width * sx;
                arranged.Height = shapeBounds.Height * sy;
                return arranged;
            };
            Image.prototype._CalculateRenderMetrics = function (source, lu) {
                var stretch = this.Stretch;
                var specified = size.fromRaw(this.ActualWidth, this.ActualHeight);
                var stretched = lu.CoerceSize(size.clone(specified));
                var adjust = !size.isEqual(specified, lu.RenderSize);
                var pixelWidth = source.PixelWidth;
                var pixelHeight = source.PixelHeight;
                if(pixelWidth === 0 || pixelHeight === 0) {
                    return null;
                }
                if(stretch !== Fayde.Media.Stretch.UniformToFill) {
                    size.min(specified, stretched);
                }
                var paint = rect.fromSize(specified);
                var image = new rect();
                image.Width = pixelWidth;
                image.Height = pixelHeight;
                if(stretch === Fayde.Media.Stretch.None) {
                    rect.union(paint, image);
                }
                var matrix = computeMatrix(paint.Width, paint.Height, image.Width, image.Height, stretch, Fayde.Media.AlignmentX.Center, Fayde.Media.AlignmentY.Center);
                if(adjust) {
                    this._MeasureOverride(specified, null);
                    rect.set(paint, (stretched.Width - specified.Width) * 0.5, (stretched.Height - specified.Height) * 0.5, specified.Width, specified.Height);
                }
                var overlap = RectOverlap.In;
                if(stretch === Fayde.Media.Stretch.UniformToFill || adjust) {
                    var bounds = rect.clone(paint);
                    rect.roundOut(bounds);
                    var box = rect.clone(image);
                    rect.transform(box, matrix);
                    rect.roundIn(box);
                    overlap = rect.rectIn(bounds, box);
                }
                return {
                    Matrix: matrix,
                    Overlap: overlap
                };
            };
            Image.prototype.Render = function (ctx, lu, region) {
                // Just to get something working, we do all the matrix transforms for stretching.
                // Eventually, we can let the html5 canvas do all the dirty work.
                var source = this.Source;
                if(!source) {
                    return;
                }
                source.Lock();
                var metrics = this._CalculateRenderMetrics(source, lu);
                if(!metrics) {
                    source.Unlock();
                    return;
                }
                ctx.Save();
                if(metrics.Overlap !== RectOverlap.In || lu._HasLayoutClip()) {
                    lu._RenderLayoutClip(ctx);
                }
                ctx.PreTransformMatrix(metrics.Matrix);
                ctx.CanvasContext.drawImage(source.Image, 0, 0);
                //DrawDebug("Image: [" + source.Image.src + "]");
                ctx.Restore();
                source.Unlock();
            };
            Image.prototype.ComputeActualSize = function (baseComputer, lu) {
                var result = baseComputer.call(lu);
                var vpNode = this.XamlNode.VisualParentNode;
                if(parent && !(parent instanceof Controls.Canvas)) {
                    if(lu.LayoutSlot !== undefined) {
                        return result;
                    }
                }
                var source = this.Source;
                if(source) {
                    var available = lu.CoerceSize(size.createInfinite());
                    result = this._MeasureOverride(available, null);
                    lu.CoerceSize(result);
                }
                return result;
            };
            Image.prototype._SourceChanged = function (args) {
                var lu = this.XamlNode.LayoutUpdater;
                var oldSource = args.OldValue;
                var newSource = args.NewValue;
                if(oldSource instanceof Fayde.Media.Imaging.BitmapSource) {
                    (oldSource).Unlisten(this);
                }
                if(newSource instanceof Fayde.Media.Imaging.BitmapSource) {
                    (newSource).Listen(this);
                } else {
                    lu.UpdateBounds();
                    lu.Invalidate();
                }
                lu.InvalidateMeasure();
            };
            Image.prototype.OnImageErrored = function (source, e) {
                this.ImageFailed.Raise(this, EventArgs.Empty);
            };
            Image.prototype.OnImageLoaded = function (source, e) {
                this.ImageOpened.Raise(this, EventArgs.Empty);
            };
            Image.prototype.ImageChanged = function (source) {
                var lu = this.XamlNode.LayoutUpdater;
                lu.InvalidateMeasure();
                lu.Invalidate();
            };
            return Image;
        })(Fayde.FrameworkElement);
        Controls.Image = Image;        
        Nullstone.RegisterType(Image, "Image");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Image.js.map
