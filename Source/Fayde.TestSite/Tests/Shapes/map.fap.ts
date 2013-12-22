/// <reference path="../../../jsbin/Fayde.d.ts" />

module Fayde.TestSite.Tests.Shapes {
    export class App extends Fayde.Application {
        constructor() {
            super();
            this.Loaded.Subscribe(this._Load, this);
        }

        private _Load(sender, e: EventArgs) {
            var canvas = <Fayde.Controls.Canvas>this.RootVisual;
            var enumerator = canvas.Children.GetEnumerator();
            while (enumerator.MoveNext()) {
                var cur = <Fayde.Shapes.Path>enumerator.Current;
                cur.MouseEnter.Subscribe(this._MouseEnter, this);
                cur.MouseLeave.Subscribe(this._MouseLeave, this);
            }
        }

        private _MouseEnter(sender, e: Input.MouseEventArgs) {
            var path = <Fayde.Shapes.Path>sender;
            path.StrokeThickness = 10;
            Fayde.Controls.Canvas.SetZIndex(path, 9999);
        }
        private _MouseLeave(sender, e: Input.MouseEventArgs) {
            var path = <Fayde.Shapes.Path>sender;
            path.StrokeThickness = 2;
            Fayde.Controls.Canvas.SetZIndex(path, 0);
        }
    }
    Fayde.RegisterType(App, {
        Name: "App",
        Namespace: "Fayde.TestSite.Tests",
        XmlNamespace: "http://schemas.wsick.com/fayde/tests"
    });
}