/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Media/Imaging/BitmapImage.ts" />
/// <reference path="../Media/Enums.ts" />

module Fayde.Controls {
    function computeMatrix(width: number, height: number, sw: number, sh: number, stretch: Media.Stretch, alignX: Media.AlignmentX, alignY: Media.AlignmentY): number[] {
        var sx = width / sw;
        var sy = height / sh;
        if (width === 0)
            sx = 1.0;
        if (height === 0)
            sy = 1.0;

        if (stretch === Media.Stretch.Fill) {
            return mat3.createScale(sx, sy);
        }

        var scale = 1.0;
        var dx = 0.0;
        var dy = 0.0;
        switch (stretch) {
            case Media.Stretch.Uniform:
                scale = sx < sy ? sx : sy;
                break;
            case Media.Stretch.UniformToFill:
                scale = sx < sy ? sy : sx;
                break;
            case Media.Stretch.None:
                break;
        }

        switch (alignX) {
            case Media.AlignmentX.Left:
                dx = 0.0;
                break;
            case Media.AlignmentX.Center:
                dx = (width - (scale * sw)) / 2;
                break;
            case Media.AlignmentX.Right:
            default:
                dx = width - (scale * sw);
                break;
        }

        switch (alignY) {
            case Media.AlignmentY.Top:
                dy = 0.0;
                break;
            case Media.AlignmentY.Center:
                dy = (height - (scale * sh)) / 2;
                break;
            case Media.AlignmentY.Bottom:
            default:
                dy = height - (scale * sh);
                break;
        }
        var m = mat3.createScale(scale, scale);
        mat3.translate(m, dx, dy);
        return m;
    }
    function calculateRenderMetrics(img: Image, source: Media.Imaging.ImageSource, lu: LayoutUpdater): IImageRenderMetrics {
        var stretch = img.Stretch;
        var specified = size.fromRaw(img.ActualWidth, img.ActualHeight);
        var stretched = lu.CoerceSize(size.copyTo(specified));
        var adjust = !size.isEqual(specified, lu.RenderSize);

        var pixelWidth = source.PixelWidth;
        var pixelHeight = source.PixelHeight;
        if (pixelWidth === 0 || pixelHeight === 0)
            return null;

        if (stretch !== Fayde.Media.Stretch.UniformToFill)
            size.min(specified, stretched);

        var paint = rect.fromSize(specified);
        var image = new rect();
        image.Width = pixelWidth;
        image.Height = pixelHeight;

        if (stretch === Fayde.Media.Stretch.None)
            rect.union(paint, image);

        var matrix = computeMatrix(paint.Width, paint.Height, image.Width, image.Height,
            stretch, Fayde.Media.AlignmentX.Center, Fayde.Media.AlignmentY.Center);

        if (adjust) {
            (<IMeasurableHidden>img)._MeasureOverride(specified, null);
            rect.set(paint,
                (stretched.Width - specified.Width) * 0.5,
                (stretched.Height - specified.Height) * 0.5,
                specified.Width,
                specified.Height);
        }

        var overlap = RectOverlap.In;
        if (stretch === Fayde.Media.Stretch.UniformToFill || adjust) {
            var bounds = rect.copyTo(paint);
            rect.roundOut(bounds);
            var box = rect.copyTo(image);
            rect.transform(box, matrix);
            rect.roundIn(box);
            overlap = rect.rectIn(bounds, box);
        }

        return {
            Matrix: matrix,
            Overlap: overlap
        };
    }

    export interface IImageRenderMetrics {
        Matrix: number[];
        Overlap: number;
    }

    export class ImageNode extends FENode implements IPostInsideObject {
        XObject: Image;
        constructor(xobj: Image) {
            super(xobj);
            this.LayoutUpdater.CanHitElement = true;
        }

        PostInsideObject(ctx: RenderContext, lu:LayoutUpdater, x: number, y: number): bool {
            var img = this.XObject;
            var source = img.Source;
            if (!source)
                return false;
            var stretch = img.Stretch;
            if (stretch === Media.Stretch.Fill || stretch === Media.Stretch.UniformToFill)
                return true;
            var metrics = calculateRenderMetrics(img, source, lu);
            if (!metrics)
                return null;

            var irect = new rect();
            irect.Width = source.PixelWidth;
            irect.Height = source.PixelHeight;
            rect.transform(irect, metrics.Matrix);
            var np = new Point(x, y);
            lu.TransformPoint(np);
            return rect.containsPoint(irect, np);
        }
    }
    Nullstone.RegisterType(ImageNode, "ImageNode");

    export class Image extends FrameworkElement implements IActualSizeComputable, IMeasurableHidden, IArrangeableHidden, IRenderable, Media.Imaging.IImageChangedListener {
        XamlNode: ImageNode;
        CreateNode(): ImageNode { return new ImageNode(this); }

        private static _SourceCoercer(d: DependencyObject, propd: DependencyProperty, value: any): any {
            if (typeof value === "string")
                return new Media.Imaging.BitmapImage(new Uri(value));
            if (value instanceof Uri)
                return new Media.Imaging.BitmapImage(value);
            return value;
        }
        static SourceProperty: DependencyProperty = DependencyProperty.RegisterFull("Source", () => Media.Imaging.ImageSource, Image, undefined, (d, args) => (<Image>d)._SourceChanged(args), Image._SourceCoercer);
        // http: //msdn.microsoft.com/en-us/library/system.windows.media.stretch(v=vs.95).aspx
        static StretchProperty: DependencyProperty = DependencyProperty.RegisterCore("Stretch", () => new Enum(Media.Stretch), Image, Media.Stretch.Uniform);
        Source: Media.Imaging.ImageSource;
        Stretch: Media.Stretch;
        
        ImageOpened: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();
        ImageFailed: MulticastEvent<EventArgs> = new MulticastEvent<EventArgs>();

        _MeasureOverride(availableSize: size, error: BError): size {
            var desired = size.copyTo(availableSize);
            var shapeBounds = new rect();
            var source = this.Source;
            var sx = 0.0; 
            var sy = 0.0;

            if (source) {
                shapeBounds.Width = source.PixelWidth;
                shapeBounds.Height = source.PixelHeight;
            }

            if (!isFinite(desired.Width))
                desired.Width = shapeBounds.Width;
            if (!isFinite(desired.Height))
                desired.Height = shapeBounds.Height;

            if (shapeBounds.Width > 0)
                sx = desired.Width / shapeBounds.Width;
            if (shapeBounds.Height > 0)
                sy = desired.Height / shapeBounds.Height;

            if (!isFinite(availableSize.Width))
                sx = sy;
            if (!isFinite(availableSize.Height))
                sy = sx;

            switch (this.Stretch) {
                case Media.Stretch.Uniform:
                    sx = sy = Math.min(sx, sy);
                    break;
                case Media.Stretch.UniformToFill:
                    sx = sy = Math.max(sx, sy);
                    break;
                case Media.Stretch.Fill:
                    if (!isFinite(availableSize.Width))
                        sx = sy;
                    if (!isFinite(availableSize.Height))
                        sy = sx;
                    break;
                case Media.Stretch.None:
                    sx = sy = 1.0;
                    break;
            }

            desired.Width = shapeBounds.Width * sx;
            desired.Height = shapeBounds.Height * sy;
            return desired;
        }
        _ArrangeOverride(finalSize: size, error: BError): size {
            var arranged = size.copyTo(finalSize);
            var shapeBounds = new rect();
            var source = this.Source;
            var sx = 1.0;
            var sy = 1.0;

            if (source) {
                shapeBounds.Width = source.PixelWidth;
                shapeBounds.Height = source.PixelHeight;
            }

            if (shapeBounds.Width === 0)
                shapeBounds.Width = arranged.Width;
            if (shapeBounds.Height === 0)
                shapeBounds.Height = arranged.Height;

            if (shapeBounds.Width !== arranged.Width)
                sx = arranged.Width / shapeBounds.Width;
            if (shapeBounds.Height !== arranged.Height)
                sy = arranged.Height / shapeBounds.Height;

            switch (this.Stretch) {
                case Media.Stretch.Uniform:
                    sx = sy = Math.min(sx, sy);
                    break;
                case Media.Stretch.UniformToFill:
                    sx = sy = Math.max(sx, sy);
                    break;
                case Media.Stretch.None:
                    sx = sy = 1.0;
                    break;
                default:
                    break;
            }

            arranged.Width = shapeBounds.Width * sx;
            arranged.Height = shapeBounds.Height * sy;
            return arranged;
        }

        Render(ctx: RenderContext, lu: LayoutUpdater, region: rect) {
            // Just to get something working, we do all the matrix transforms for stretching.
            // Eventually, we can let the html5 canvas do all the dirty work.

            var source = this.Source;
            if (!source)
                return;

            source.Lock();
            var metrics = calculateRenderMetrics(this, source, lu);
            if (!metrics) {
                source.Unlock();
                return;
            }

            ctx.Save();
            if (lu.CompositeLayoutClip || metrics.Overlap !== RectOverlap.In)
                lu.RenderLayoutClip(ctx);
            ctx.PreTransformMatrix(metrics.Matrix);
            ctx.CanvasContext.drawImage(source.Image, 0, 0);
            //DrawDebug("Image: [" + source.Image.src + "]");
            ctx.Restore();

            source.Unlock();
        }
        ComputeActualSize(baseComputer: () => size, lu: LayoutUpdater) {
            var result = baseComputer.call(lu);

            var vpNode = this.XamlNode.VisualParentNode;
            if (parent && !(parent instanceof Canvas))
                if (lu.LayoutSlot !== undefined)
                    return result;
            
            var source = this.Source;
            if (source) {
                var available = lu.CoerceSize(size.createInfinite());
                result = this._MeasureOverride(available, null);
                lu.CoerceSize(result);
            }

            return result;
        }

        private _SourceChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;

            var oldSource = <Media.Imaging.ImageSource>args.OldValue;
            var newSource = <Media.Imaging.ImageSource>args.NewValue;
            if (oldSource instanceof Media.Imaging.BitmapSource)
                (<Media.Imaging.BitmapSource>oldSource).Unlisten(this);
            if (newSource instanceof Media.Imaging.BitmapSource) {
                (<Media.Imaging.BitmapSource>newSource).Listen(this);
            } else {
                lu.UpdateBounds();
                lu.Invalidate();
            }
            lu.InvalidateMeasure();
        }
        
        OnImageErrored(source: Media.Imaging.BitmapSource, e: Event) { this.ImageFailed.Raise(this, EventArgs.Empty); }
        OnImageLoaded(source: Media.Imaging.BitmapSource, e: Event) { this.ImageOpened.Raise(this, EventArgs.Empty); }
        ImageChanged(source: Media.Imaging.BitmapSource) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            lu.Invalidate();
        }
    }
    Nullstone.RegisterType(Image, "Image");
}