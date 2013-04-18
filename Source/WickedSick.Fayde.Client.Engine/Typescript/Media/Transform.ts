/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="Matrix.ts" />

module Fayde.Media {
    export class Transform {
        Value: Matrix;
    }
    Nullstone.RegisterType(Transform, "Transform");
}