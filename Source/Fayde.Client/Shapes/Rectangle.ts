/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class Rectangle extends Shape {
        CreateLayoutUpdater(node: UINode) { return new RectangleLayoutUpdater(node); }
        /* RadiusX/RadiusY Notes
        For the rectangle to have rounded corners, both the RadiusX and RadiusY properties must be nonzero.
        A value greater than or equal to zero and less than or equal to half the rectangle's width that describes the x-radius of the ellipse is used to round the corners of the rectangle. 
        Values greater than half the rectangle's width are treated as though equal to half the rectangle's width. Negative values are treated as positive values.
        */
        static RadiusXProperty: DependencyProperty = DependencyProperty.Register("RadiusX", () => Number, Rectangle, 0.0, (d, args) => (<Rectangle>d)._RadiusChanged(args));
        static RadiusYProperty: DependencyProperty = DependencyProperty.Register("RadiusY", () => Number, Rectangle, 0.0, (d, args) => (<Rectangle>d)._RadiusChanged(args));
        RadiusX: number;
        RadiusY: number;

        constructor() {
            super();
            this.Stretch = Media.Stretch.Fill;
        }

        private _RadiusChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = <RectangleLayoutUpdater>this.XamlNode.LayoutUpdater;
            lu[args.Property.Name] = args.NewValue;
            lu.InvalidateMeasure();
            lu.InvalidatePathCache();
            lu.Invalidate();
        }
    }
    Fayde.RegisterType(Rectangle, {
        Name: "Rectangle",
        Namespace: "Fayde.Shapes",
        XmlNamespace: Fayde.XMLNS
    });

    export class RectangleLayoutUpdater extends ShapeLayoutUpdater {
        RadiusX: number = 0;
        RadiusY: number = 0;

        MeasureOverride(availableSize: size, error: BError): size {
            return super.MeasureOverride(new size(), error);
        }

        ComputeStretchBounds(): rect {
            return this.ComputeShapeBounds(false);
        }
        ComputeShapeBounds(logical: boolean): rect {
            var bounds = new rect();
            bounds.Width = this.ActualWidth;
            bounds.Height = this.ActualHeight;
            this.SFlags = ShapeFlags.Normal;

            var node = this.Node;
            var shape = <Shape>node.XObject;
            var width = shape.Width;
            var height = shape.Height;
            if (bounds.Width < 0.0 || bounds.Height < 0.0 || width <= 0.0 || height <= 0.0) {
                this.SFlags = ShapeFlags.Empty;
                return new rect();
            }

            var vpNode = node.VisualParentNode;
            if (vpNode instanceof Controls.CanvasNode) {
                if (isNaN(width) !== isNaN(height)) {
                    this.SFlags = ShapeFlags.Empty;
                    return new rect();
                }
            }

            var t = !!this.Stroke ? this.StrokeThickness : 0.0;
            switch (this.Stretch) {
                case Media.Stretch.None:
                    bounds.Width = bounds.Height = 0.0;
                    break;
                case Media.Stretch.Uniform:
                    bounds.Width = bounds.Height = Math.min(bounds.Width, bounds.Height);
                    break;
                case Media.Stretch.UniformToFill:
                    bounds.Width = bounds.Height = Math.max(bounds.Width, bounds.Height);
                    break;
                case Media.Stretch.Fill:
                    break;
            }

            if (bounds.Width === 0)
                bounds.X = t * 0.5;
            if (bounds.Height === 0)
                bounds.Y = t * 0.5;

            if (t >= bounds.Width || t >= bounds.Height) {
                var g = t * 0.5005;
                rect.growBy(bounds, g, g, g, g);
                this.SFlags = ShapeFlags.Degenerate;
            } else {
                this.SFlags = ShapeFlags.Normal;
            }

            return bounds;
        }

        BuildPath(): Fayde.Path.RawPath {
            var t = !!this.Stroke ? this.StrokeThickness : 0.0;

            var bounds = new rect();
            bounds.Width = this.ActualWidth;
            bounds.Height = this.ActualHeight;

            switch (this.Stretch) {
                case Media.Stretch.None:
                    bounds.Width = bounds.Height = 0;
                    break;
                case Media.Stretch.Uniform:
                    bounds.Width = bounds.Height = Math.min(bounds.Width, bounds.Height);
                    break;
                case Media.Stretch.UniformToFill:
                    bounds.Width = bounds.Height = Math.max(bounds.Width, bounds.Height);
                    break;
                case Media.Stretch.Fill:
                    break;
            }

            if (bounds.Width === 0)
                bounds.X = t * 0.5;
            if (bounds.Height === 0)
                bounds.Y = t * 0.5;

            var ta;
            if (t >= bounds.Width || t >= bounds.Height) {
                ta = t * 0.001;
                rect.growBy(bounds, ta, ta, ta, ta);
                this.SFlags = ShapeFlags.Degenerate;
            } else {
                ta = -t * 0.5;
                rect.growBy(bounds, ta, ta, ta, ta);
                this.SFlags = ShapeFlags.Normal;
            }

            var radiusX = Math.min(Math.abs(this.RadiusX), bounds.Width / 2.0);
            if (isNaN(radiusX)) radiusX = 0;
            var radiusY = Math.min(Math.abs(this.RadiusY), bounds.Height / 2.0);
            if (isNaN(radiusY)) radiusX = 0;

            var path = new Fayde.Path.RawPath();
            path.RoundedRect(bounds.X, bounds.Y, bounds.Width, bounds.Height, radiusX, radiusY);
            return path;
        }
    }
}