/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class Ellipse extends Shape {
        constructor() {
            super();
            this.Stretch = Media.Stretch.Fill;
        }

        _BuildPath(): Shapes.RawPath {
            var stretch = this.Stretch;
            var t = this._Stroke != null ? this.StrokeThickness : 0.0;
            var irect = new rect();
            irect.Width = this.ActualWidth;
            irect.Height = this.ActualHeight;

            switch (stretch) {
                case Fayde.Media.Stretch.None:
                    irect.Width = irect.Height = 0;
                    break;
                case Fayde.Media.Stretch.Uniform:
                    irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                    break;
                case Fayde.Media.Stretch.UniformToFill:
                    irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                    break;
                case Fayde.Media.Stretch.Fill:
                    break;
            }

            if (t >= irect.Width || t >= irect.Height) {
                irect.Width = Math.max(irect.Width, t + t * 0.001);
                irect.Height = Math.max(irect.Height, t + t * 0.001);
                this._ShapeFlags = ShapeFlags.Degenerate;
            } else {
                this._ShapeFlags = ShapeFlags.Normal;
            }

            var ht = -t / 2;
            rect.growBy(irect, ht, ht, ht, ht);

            var path = new Fayde.Shapes.RawPath();
            path.Ellipse(irect.X, irect.Y, irect.Width, irect.Height);
            return path;
        }

        _ComputeStretchBounds(): rect { return this._ComputeShapeBounds(false); }
        _ComputeShapeBounds(logical: boolean): rect {
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
                case Fayde.Media.Stretch.None:
                    irect.Width = irect.Height = 0.0;
                    break;
                case Fayde.Media.Stretch.Uniform:
                    irect.Width = irect.Height = Math.min(irect.Width, irect.Height);
                    break;
                case Fayde.Media.Stretch.UniformToFill:
                    irect.Width = irect.Height = Math.max(irect.Width, irect.Height);
                    break;
                case Fayde.Media.Stretch.Fill:
                    break;
            }

            if (t >= irect.Width || t >= irect.Height) {
                irect.Width = Math.max(irect.Width, t + t * 0.001);
                irect.Height = Math.max(irect.Height, t + t * 0.001);

                this._ShapeFlags = ShapeFlags.Degenerate;
            } else {
                this._ShapeFlags = ShapeFlags.Normal;
            }

            return irect;
        }
        _ComputeShapeBoundsImpl(logical: boolean, matrix?: any): rect {
            var r = new rect();
            if (logical) {
                r.Width = 1.0;
                r.Height = 1.0;
            }
            return r;
        }
    }
    Fayde.RegisterType(Ellipse, {
    	Name: "Ellipse",
    	Namespace: "Fayde.Shapes",
    	XmlNamespace: Fayde.XMLNS
    });
}