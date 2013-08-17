/// <reference path="../Core/DependencyObject.ts" />
/// CODE

module Fayde.Media {
    export interface IProjectionChangedListener {
        Callback: (source: Projection) => void;
        Detach();
    }

    export class Projection extends DependencyObject {
        private _ProjectionMatrix: Matrix3D = null;
        
        _ObjectWidth: number = 1.0;
        _ObjectHeight: number = 1.0;
        SetObjectSize(size: ISize) {
            var w = Math.max(size.Width, 1.0);
            var h = Math.max(size.Height, 1.0);
            if (w !== this._ObjectWidth && h !== this._ObjectHeight) {
                this._ObjectWidth = w;
                this._ObjectHeight = h;
                this._ProjectionMatrix = null;
            }
        }
        GetDistanceFromXYPlane(): number { return NaN; }
        GetTransform(): number[] {
            var m3 = this._ProjectionMatrix;
            if (!m3)
                m3 = this._ProjectionMatrix = this.CreateProjectionMatrix();
            if (m3)
                return mat4.clone(m3._Raw);
            return mat4.identity();
        }
        CreateProjectionMatrix(): Matrix3D { return null; }

        private _Listeners: IProjectionChangedListener[] = [];
        Listen(func: (source: Projection) => void ): IProjectionChangedListener {
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
        _InvalidateProjection() {
            this._ProjectionMatrix = null;
            var listeners = this._Listeners;
            var len = listeners.length;
            for (var i = 0; i < len; i++) {
                listeners[i].Callback(this);
            }
        }
    }
    Fayde.RegisterType(Projection, {
    	Name: "Projection",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
}