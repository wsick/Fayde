/// <reference path="GeneralTransform.ts" />
/// CODE
/// <reference path="../Primitives/RawMatrix.ts" />
/// <reference path="Matrix.ts" />

module Fayde.Media {
    export interface ITransformChangedListener {
        TransformChanged(source: Transform);
    }

    export class Transform extends GeneralTransform {
        private _Value: Matrix;
        _Listener: ITransformChangedListener = null;

        constructor() {
            super();
            (<IShareableHidden>this.XamlNode).IsShareable = true;
        }

        get Value(): Matrix {
            var val = this._Value;
            if (!val) {
                var val = new Matrix();
                val._Raw = this._BuildValue();
                this._Value = val;
            }
            return val;
        }
        get Inverse(): Transform {
            var inverse = this.Value.Inverse;
            if (inverse == null)
                return;

            var mt = new MatrixTransform();
            mt.Matrix = inverse;
            return mt;
        }
        
        Transform(p: Point): Point {
            var val = this.Value;
            var v: number[];
            if (!val || !(v = val._Raw))
                return new Point(p.X, p.Y);
            v = mat3.transformVec2(v, vec2.createFrom(p.X, p.Y));
            return new Point(v[0], v[1]);
        }
        TransformBounds(r: rect): rect {
            if (!r)
                return undefined;
            var v = this.Value;
            if (!v || !v._Raw)
                return rect.clone(r);
            return rect.transform(rect.clone(r), v._Raw);
        }
        TryTransform(inPoint: Point, outPoint: Point): bool {
            return false;
        }
        
        Listen(listener: ITransformChangedListener) { this._Listener = listener; }
        Unlisten(listener: ITransformChangedListener) { if (this._Listener === listener) this._Listener = null; }

        _InvalidateValue() {
            if (this._Value === undefined)
                return;
            this._Value = undefined;
            var listener = this._Listener;
            if (listener) listener.TransformChanged(this);
        }
        _BuildValue(): number[] {
            //Abstract Method
            return undefined;
        }
    }
    Nullstone.RegisterType(Transform, "Transform");

    export class MatrixTransform extends Transform implements IMatrixChangedListener {
        static MatrixProperty: DependencyProperty = DependencyProperty.RegisterFull("Matrix", () => Matrix, MatrixTransform, undefined, (d, args) => (<MatrixTransform>d)._MatrixChanged(args));
        Matrix: Matrix;

        _BuildValue(): number[] {
            var m = this.Matrix;
            if (m)
                return m._Raw;
            return mat3.identity();
        }

        _MatrixChanged(args: IDependencyPropertyChangedEventArgs) {
            var oldv: Matrix = args.OldValue;
            var newv: Matrix = args.NewValue;
            if (oldv)
                oldv.Unlisten(this);
            if (newv)
                newv.Listen(this);
            this.MatrixChanged(newv);
        }
        MatrixChanged(newMatrix: Matrix) {
            var listener = this._Listener;
            if (listener) listener.TransformChanged(this);
        }
    }
    Nullstone.RegisterType(MatrixTransform, "MatrixTransform");
}