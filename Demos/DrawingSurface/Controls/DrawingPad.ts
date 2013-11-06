/// <reference path="../scripts/Fayde.d.ts" />

module DrawingSurface {
    export class DrawingPad extends Fayde.Controls.Canvas {
        private _Fingers: DrawingFinger[] = [];
        constructor() {
            super();
            this.Background = Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Transparent);
        }
        OnTouchDown(e: Fayde.Input.TouchEventArgs) {
            var finger = new DrawingFinger(e.Device);
            this._Fingers.push(finger);
            finger.Attach(this);
            var tp = e.GetTouchPoint(this);
            console.log(tp.Position.toString());
            finger.Start(tp.Position);
        }
        OnTouchUp(e: Fayde.Input.TouchEventArgs) {
            var finger = this._Fingers.filter(f => f.Device === e.Device)[0];
            if (!finger)
                return;
            var index = this._Fingers.indexOf(finger);
            this._Fingers.splice(index, 1);
            var tp = e.GetTouchPoint(this);
            finger.End(tp.Position);
        }
        OnTouchMove(e: Fayde.Input.TouchEventArgs) {
            var finger = this._Fingers.filter(f => f.Device === e.Device)[0];
            if (!finger)
                return;
            var tp = e.GetTouchPoint(this);
            console.log(tp.Position.toString());
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
        private _Figure: Fayde.Media.PathFigure;
        constructor(device: Fayde.Input.ITouchDevice) {
            this.Device = device;
            var path = this.Path = new Fayde.Shapes.Path();
            path.Stroke = Fayde.Media.SolidColorBrush.FromColor(Color.KnownColors.Black);
            path.StrokeThickness = 4.0;
            var geom = path.Data = new Fayde.Media.PathGeometry();
            geom.Figures.Add(this._Figure = new Fayde.Media.PathFigure());
        }

        Attach(pad: DrawingPad) {
            pad.Children.Add(this.Path);
        }

        Start(pos: Point) {
            this._Figure.StartPoint = pos;
        }
        Move(pos: Point) {
            var figure = this._Figure;
            var segment = new Fayde.Media.LineSegment();
            segment.Point = pos;
            figure.Segments.Add(segment);
        }
        End(pos: Point) {
            this.Move(pos);
        }
    }
}