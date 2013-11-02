/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Input {
    export enum TouchAction {
        Down,
        Move,
        Up
    }
    Fayde.RegisterEnum(TouchAction, {
        Name: "TouchAction",
        Namespace: "Fayde.Input",
        XmlNamespace: Fayde.XMLNS
    });

    export class TouchPoint {
        Action: TouchAction;
        Bounds: rect;
        Position: Point;
        Size: size;
        constructor(action: TouchAction, bounds: rect, position: Point, size: size) {
            Object.defineProperty(this, "Action", { value: action, writable: false });
            Object.defineProperty(this, "Bounds", { value: bounds, writable: false });
            Object.defineProperty(this, "Position", { value: position, writable: false });
            Object.defineProperty(this, "Size", { value: size, writable: false });
        }
    }
    Fayde.RegisterType(TouchPoint, {
        Name: "TouchPoint",
        Namespace: "Fayde.Input",
        XmlNamespace: Fayde.XMLNS
    });
}