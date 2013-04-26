/// <reference path="../Core/DependencyObject.ts" />
/// CODE

module Fayde.Media {
    export class Projection extends DependencyObject {
        GetDistanceFromXYPlane(objectSize: ISize): number {
            //TODO: Implement
            return NaN;
        }
        GetTransform(): number[] {
            //TODO: Implement
            return undefined;
        }
    }
    Nullstone.RegisterType(Projection, "Projection");
}