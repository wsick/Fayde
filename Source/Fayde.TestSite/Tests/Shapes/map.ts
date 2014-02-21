/// <reference path="../../../jsbin/Fayde.d.ts" />

import MouseEventArgs = Fayde.Input.MouseEventArgs;
import TouchEventArgs = Fayde.Input.TouchEventArgs;

class Map extends Fayde.Application {
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
            cur.TouchDown.Subscribe(this._TouchDown, this);
            cur.TouchUp.Subscribe(this._TouchUp, this);
            cur.TouchEnter.Subscribe(this._TouchEnter, this);
            cur.TouchLeave.Subscribe(this._TouchLeave, this);
        }
    }

    private _MouseEnter(sender, e: MouseEventArgs) {
        this.HighlightShape(sender);
    }
    private _MouseLeave(sender, e: MouseEventArgs) {
        this.UnhighlightShape(sender);
    }
    private _TouchEnter(sender, e: TouchEventArgs) {
        this.HighlightShape(sender);
    }
    private _TouchLeave(sender, e: TouchEventArgs) {
        this.UnhighlightShape(sender);
    }
    private _TouchDown(sender, e: TouchEventArgs) {
        this.HighlightShape(sender);
    }
    private _TouchUp(sender, e: TouchEventArgs) {
        this.UnhighlightShape(sender);
    }

    private HighlightShape(shape: Fayde.Shapes.Shape) {
        shape.StrokeThickness = 10;
        Fayde.Controls.Canvas.SetZIndex(shape, 9999);
    }
    private UnhighlightShape(shape: Fayde.Shapes.Shape) {
        shape.StrokeThickness = 2;
        Fayde.Controls.Canvas.SetZIndex(shape, 0);
    }
}
export = Map;