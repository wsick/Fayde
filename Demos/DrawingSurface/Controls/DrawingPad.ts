/// <reference path="../scripts/Fayde.d.ts" />

module DrawingSurface {
    export class DrawingPad extends Fayde.Controls.Canvas {
        private _Fingers: DrawingFinger[] = [];
        constructor() {
            super();
        }
        OnTouchDown(e: Fayde.Input.TouchEventArgs) {
            var finger = this._Fingers[e.Device.Identifier] = new DrawingFinger(e.Device);
            finger.Attach(this);
            var tp = e.GetTouchPoint(this);
            finger.Start(tp.Position);
        }
        OnTouchUp(e: Fayde.Input.TouchEventArgs) {
            var finger = this._Fingers[e.Device.Identifier];
            if (!finger)
                return;
            var tp = e.GetTouchPoint(this);
            finger.End(tp.Position);
        }
        OnTouchMove(e: Fayde.Input.TouchEventArgs) {
            var finger = this._Fingers[e.Device.Identifier];
            if (!finger)
                return;
            var tp = e.GetTouchPoint(this);
            finger.Move(tp.Position);
        }
        OnTouchEnter(e: Fayde.Input.TouchEventArgs) {
        }
        OnTouchLeave(e: Fayde.Input.TouchEventArgs) {
        }
    }
    Fayde.RegisterType(DrawingPad, {
        Name: "DrawingPad",
        Namespace: "DrawingSurface",
        XmlNamespace: "http://schemas.wsick.com/demos/drawing/controls"
    });

    class DrawingFinger {
        Device: Fayde.Input.ITouchDevice;
        Path: Fayde.Shapes.Path;
        constructor(device: Fayde.Input.ITouchDevice) {
            this.Device = device;
            var path = this.Path = new Fayde.Shapes.Path();
            path.Stroke = Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Black);
            path.StrokeThickness = 4.0;
        }

        Attach(pad: DrawingPad) {
            pad.Children.Add(this.Path);
        }

        Start(pos: Point) {
            var path = this.Path;
            var geom = path.Data = new Fayde.Media.PathGeometry();
            var figure = new Fayde.Media.PathFigure();
            figure.StartPoint = pos;
            geom.Figures.Add(figure);
        }
        Move(pos: Point) {
            var geom = <Fayde.Media.PathGeometry>this.Path.Data;
            var figure = geom.Figures.GetValueAt(0);
            var segment = new Fayde.Media.LineSegment();
            segment.Point = pos;
            figure.Segments.Add(segment);
        }
        End(pos: Point) {
            var geom = <Fayde.Media.PathGeometry>this.Path.Data;
        }
    }
}