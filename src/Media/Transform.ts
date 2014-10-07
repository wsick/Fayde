/// <reference path="GeneralTransform.ts" />

module Fayde.Media {
    export class Transform extends GeneralTransform {
        private _Value: Matrix;

        constructor() {
            super();
            XamlNode.SetShareable(this.XamlNode);
        }

        get Value(): Matrix {
            var val = this._Value;
            if (!val) {
                this._Value = val = new Matrix();
                val._Raw = this._BuildValue();
            }
            return val;
        }
        get Inverse(): Transform {
            var inverse = this.Value.Inverse;
            if (!inverse)
                return;
            var mt = new MatrixTransform();
            mt.Matrix = inverse;
            return mt;
        }

        Transform(p: minerva.IPoint): Point {
            var val = this.Value;
            var v: number[];
            if (!val || !(v = val._Raw))
                return new Point(p.x, p.y);
            v = mat3.transformVec2(v, vec2.createFrom(p.x, p.y));
            return new Point(v[0], v[1]);
        }
        TransformBounds(r: rect): rect {
            if (!r)
                return undefined;
            var v = this.Value;
            if (!v || !v._Raw)
                return rect.copyTo(r);
            return rect.transform(rect.copyTo(r), v._Raw);
        }
        TryTransform(inPoint: minerva.IPoint, outPoint: minerva.IPoint): boolean {
            return false;
        }

        _InvalidateValue() {
            if (this._Value !== undefined)
                this._Value = undefined;
            Incite(this);
        }
        _BuildValue(): number[] {
            //Abstract Method
            return undefined;
        }
    }
    Fayde.RegisterType(Transform, "Fayde.Media", Fayde.XMLNS);

    export class MatrixTransform extends Transform {
        static MatrixProperty: DependencyProperty = DependencyProperty.RegisterFull("Matrix", () => Matrix, MatrixTransform, undefined, LReaction((dobj: MatrixTransform, nv, ov) => dobj._InvalidateValue()));
        Matrix: Matrix;

        _BuildValue(): number[] {
            var m = this.Matrix;
            if (m)
                return m._Raw;
            return mat3.identity();
        }

        Clone(): MatrixTransform {
            var xform = new MatrixTransform();
            xform.Matrix = this.Matrix.Clone();
            return xform;
        }
    }
    Fayde.RegisterType(MatrixTransform, "Fayde.Media", Fayde.XMLNS);
}