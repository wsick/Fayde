/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Media {
    export interface IMatrixChangedListener {
        Callback: (newMatrix: Matrix) => void;
        Detach();
    }

    export class Matrix {
        _Raw: number[];
        private _Inverse: Matrix = null;

        constructor(raw?: number[]) {
            this._Raw = raw;
        }

        get M11() { return this._Raw[0]; }
        set M11(val: number) { this._Raw[0] = val; this._OnChanged(); }

        get M12() { return this._Raw[1]; }
        set M12(val: number) { this._Raw[1] = val; this._OnChanged(); }

        get M21() { return this._Raw[3]; }
        set M21(val: number) { this._Raw[3] = val; this._OnChanged(); }

        get M22() { return this._Raw[4]; }
        set M22(val: number) { this._Raw[4] = val; this._OnChanged(); }

        get OffsetX() { return this._Raw[2]; }
        set OffsetX(val: number) { this._Raw[2] = val; this._OnChanged(); }

        get OffsetY() { return this._Raw[5]; }
        set OffsetY(val: number) { this._Raw[5] = val; this._OnChanged(); }

        get Inverse(): Matrix {
            var inverse = this._Inverse;
            if (!inverse) {
                inverse = new Matrix();
                inverse._Raw = mat3.inverse(this._Raw, mat3.identity());
                if (!inverse._Raw)
                    return undefined;
                this._Inverse = inverse;
            }
            return inverse;
        }

        private _Listeners: IMatrixChangedListener[] = [];
        Listen(func: (newMatrix: Matrix) => void ): IMatrixChangedListener {
            var listeners = this._Listeners;
            var listener = {
                Callback: func,
                Detach: () => {
                    var index = listeners.indexOf(listener);
                    if (index > -1)
                        listeners.splice(index, 1);
                }
            };
            listeners.push(listener);
            return listener;
        }
        private _OnChanged() {
            this._Inverse = null;
            var listeners = this._Listeners;
            var len = listeners.length;
            for (var i = 0; i < len; i++) {
                listeners[i].Callback(this);
            }
        }

        toString(): string { return mat3.str(this._Raw); }
    }
    Fayde.RegisterType(Matrix, {
    	Name: "Matrix",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
}