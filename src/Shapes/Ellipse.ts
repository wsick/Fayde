/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class Ellipse extends Shape {
        //CreateLayoutUpdater(node: UINode) { return new EllipseLayoutUpdater(node); }

        constructor() {
            super();
            this.Stretch = Media.Stretch.Fill;
        }
    }
    Fayde.RegisterType(Ellipse, "Fayde.Shapes", Fayde.XMLNS);

    //TODO: Implement ellipse updater
    /*
    export class EllipseLayoutUpdater extends ShapeLayoutUpdater {
        MeasureOverride(availableSize: size, error: BError): size {
            return super.MeasureOverride(new size(), error);
        }
        
        ComputeStretchBounds(): rect { return this.ComputeShapeBounds(false); }
        ComputeShapeBounds(logical: boolean): rect {
            var irect = new rect();
            irect.Width = this.ActualWidth;
            irect.Height = this.ActualHeight;
            this.SFlags = ShapeFlags.Normal;
            
            var node = this.Node;
            var ellipse = <Ellipse>node.XObject;
            var width = ellipse.Width;
            var height = ellipse.Height;
            if (irect.Width < 0.0 || irect.Height < 0.0 || width <= 0.0 || height <= 0.0) {
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

            var t = this.Stroke != null ? this.StrokeThickness : 0.0;
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

                this.SFlags = ShapeFlags.Degenerate;
            } else {
                this.SFlags = ShapeFlags.Normal;
            }

            return irect;
        }
        ComputeShapeBoundsImpl(logical: boolean, matrix?: any): rect {
            var r = new rect();
            if (logical) {
                r.Width = 1.0;
                r.Height = 1.0;
            }
            return r;
        }
        
        BuildPath(): Fayde.Path.RawPath {
            var stretch = this.Stretch;
            var t = !!this.Stroke ? this.StrokeThickness : 0.0;
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
                this.SFlags = ShapeFlags.Degenerate;
            } else {
                this.SFlags = ShapeFlags.Normal;
            }

            var ht = -t / 2;
            rect.growBy(irect, ht, ht, ht, ht);

            var path = new Fayde.Path.RawPath();
            path.Ellipse(irect.X, irect.Y, irect.Width, irect.Height);
            return path;
        }
    }
    */
}