/// <reference path="Shape.ts" />
/// CODE

module Fayde.Shapes {
    declare var NotImplemented;

    export class Rectangle extends Shape {
        private _Path: RawPath; //defined in Shape
        private _ShapeFlags: ShapeFlags; //defined in Shape
        private _Stroke: Media.Brush; //defined in Shape

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

        private _BuildPath(): Shapes.RawPath {
            var stretch = this.Stretch;
            var t = this._Stroke != null ? this.StrokeThickness : 0.0;
            var irect = new rect();
            irect.Width = this.ActualWidth;
            irect.Height = this.ActualHeight;

            switch (stretch) {
                case Media.Stretch.None:
                    irect.Width = irect.Height = 0;
                    break;
                case Media.Stretch.Uniform:
                    irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                    break;
                case Media.Stretch.UniformToFill:
                    irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                    break;
                case Media.Stretch.Fill:
                    break;
            }

            if (irect.Width === 0)
                irect.X = t * 0.5;
            if (irect.Height === 0)
                irect.Y = t * 0.5;

            var ta;
            if (t >= irect.Width || t >= irect.Height) {
                ta = t * 0.001;
                rect.growBy(irect, ta, ta, ta, ta);
                this._ShapeFlags = ShapeFlags.Degenerate;
            } else {
                ta = -t * 0.5;
                rect.growBy(irect, ta, ta, ta, ta);
                this._ShapeFlags = ShapeFlags.Normal;
            }

            var radiusX = Math.min(Math.abs(this.RadiusX), irect.Width / 2.0);
            if (isNaN(radiusX)) radiusX = 0;
            var radiusY = Math.min(Math.abs(this.RadiusY), irect.Height / 2.0);
            if (isNaN(radiusY)) radiusX = 0;

            var path = new RawPath();
            path.RoundedRect(irect.X, irect.Y, irect.Width, irect.Height, radiusX, radiusY);
            return path;
        }

        private _ComputeShapeBounds(logical: bool): rect {
            var irect = new rect();
            irect.Width = this.ActualWidth;
            irect.Height = this.ActualHeight;
            this._ShapeFlags = ShapeFlags.Normal;

            var width = this.Width;
            var height = this.Height;
            if (irect.Width < 0.0 || irect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
                this._ShapeFlags = ShapeFlags.Empty;
                return new rect();
            }

            var node = this.XamlNode;
            var vpNode = node.VisualParentNode;
            if (vpNode instanceof Controls.CanvasNode) {
                if (isNaN(width) !== isNaN(height)) {
                    this._ShapeFlags = ShapeFlags.Empty;
                    return new rect();
                }
            }

            var t = this._Stroke != null ? this.StrokeThickness : 0.0;
            switch (this.Stretch) {
                case Media.Stretch.None:
                    irect.Width = irect.Height = 0.0;
                    break;
                case Media.Stretch.Uniform:
                    irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                    break;
                case Media.Stretch.UniformToFill:
                    irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                    break;
                case Media.Stretch.Fill:
                    break;
            }

            if (irect.Width === 0)
                irect.X = t * 0.5;
            if (irect.Height === 0)
                irect.Y = t * 0.5;

            if (t >= irect.Width || t >= irect.Height) {
                var g = t * 0.5005;
                rect.growBy(irect, g, g, g, g);
                this._ShapeFlags = ShapeFlags.Degenerate;
            } else {
                this._ShapeFlags = ShapeFlags.Normal;
            }

            return irect;
        }
        private _ComputeShapeBoundsImpl(logical: bool, matrix?): rect {
            var r = new rect();
            if (logical) {
                r.Width = 1.0;
                r.Height = 1.0;
            }
            return r;
        }
        private _ComputeStretchBounds(): rect { return this._ComputeShapeBounds(false); }

        private _RadiusChanged(args: IDependencyPropertyChangedEventArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateMeasure();
            this._InvalidatePathCache();
            lu.Invalidate();
        }
    }
    Nullstone.RegisterType(Rectangle, "Rectangle");
}