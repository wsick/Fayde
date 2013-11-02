/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Input {
    export class TouchPoint {
        Position: Point;
        RadiusX: number;
        RadiusY: number;
        RotationAngle: number;
        Force: number;
        constructor(position: Point, radiusX: number, radiusY: number, rotationAngle: number, force: number) {
            Object.defineProperty(this, "Position", { value: position, writable: false });
            Object.defineProperty(this, "RadiusX", { value: radiusX, writable: false });
            Object.defineProperty(this, "RadiusY", { value: radiusY, writable: false });
            Object.defineProperty(this, "RotationAngle", { value: rotationAngle, writable: false });
            Object.defineProperty(this, "Force", { value: force, writable: false });
        }
    }
    Fayde.RegisterType(TouchPoint, {
        Name: "TouchPoint",
        Namespace: "Fayde.Input",
        XmlNamespace: Fayde.XMLNS
    });
}