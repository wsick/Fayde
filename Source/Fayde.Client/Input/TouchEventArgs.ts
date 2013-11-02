/// <reference path="../Core/RoutedEventArgs.ts" />

module Fayde.Input {
    export class TouchEventArgs extends RoutedEventArgs {
        AbsolutePos: Point;
        private _Device: ITouchDevice;
        constructor(pos: Point, device: ITouchDevice) {
            super();
            this._Device = device;
            Object.defineProperty(this, "AbsolutePos", { value: pos, writable: false });
        }

        GetTouchPoint(relativeTo: UIElement): TouchPoint {
            return this._Device.GetTouchPoint(relativeTo);
        }
    }
    Fayde.RegisterType(TouchEventArgs, {
        Name: "TouchEventArgs",
        Namespace: "Fayde.Input",
        XmlNamespace: Fayde.XMLNS
    });
}