/// <reference path="../Core/RoutedEventArgs.ts" />

module Fayde.Input {
    export class TouchEventArgs extends RoutedEventArgs {
        private _Pos: Point;
        private _Device: ITouchDevice;
        constructor(pos: Point, device: ITouchDevice) {
            super();
            this._Pos = pos;
            this._Device = device;
        }

        GetTouchPoint(relativeTo: UIElement): TouchPoint {
            return null;
        }
        GetIntermediateTouchPoints(relativeTo: UIElement): TouchPoint[] {
            return [];
        }
    }
    Fayde.RegisterType(TouchEventArgs, {
        Name: "TouchEventArgs",
        Namespace: "Fayde.Input",
        XmlNamespace: Fayde.XMLNS
    });
}