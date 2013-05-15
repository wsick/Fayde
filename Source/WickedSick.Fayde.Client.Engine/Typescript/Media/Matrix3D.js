var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="../Primitives/RawMatrix.ts" />
    (function (Media) {
        var Matrix3D = (function () {
            function Matrix3D() {
                this._Inverse = null;
                this._Listeners = [];
            }
            Object.defineProperty(Matrix3D.prototype, "M11", {
                get: function () {
                    return this._Raw[0];
                },
                set: function (val) {
                    this._Raw[0] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M12", {
                get: function () {
                    return this._Raw[1];
                },
                set: function (val) {
                    this._Raw[1] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M13", {
                get: function () {
                    return this._Raw[2];
                },
                set: function (val) {
                    this._Raw[2] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M14", {
                get: function () {
                    return this._Raw[3];
                },
                set: function (val) {
                    this._Raw[3] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M21", {
                get: function () {
                    return this._Raw[4];
                },
                set: function (val) {
                    this._Raw[4] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M22", {
                get: function () {
                    return this._Raw[5];
                },
                set: function (val) {
                    this._Raw[5] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M23", {
                get: function () {
                    return this._Raw[6];
                },
                set: function (val) {
                    this._Raw[6] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M24", {
                get: function () {
                    return this._Raw[7];
                },
                set: function (val) {
                    this._Raw[7] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M31", {
                get: function () {
                    return this._Raw[8];
                },
                set: function (val) {
                    this._Raw[8] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M32", {
                get: function () {
                    return this._Raw[9];
                },
                set: function (val) {
                    this._Raw[9] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M33", {
                get: function () {
                    return this._Raw[10];
                },
                set: function (val) {
                    this._Raw[10] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M34", {
                get: function () {
                    return this._Raw[11];
                },
                set: function (val) {
                    this._Raw[11] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "OffsetX", {
                get: function () {
                    return this._Raw[12];
                },
                set: function (val) {
                    this._Raw[12] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "OffsetY", {
                get: function () {
                    return this._Raw[13];
                },
                set: function (val) {
                    this._Raw[13] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "OffsetZ", {
                get: function () {
                    return this._Raw[14];
                },
                set: function (val) {
                    this._Raw[14] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "M44", {
                get: function () {
                    return this._Raw[15];
                },
                set: function (val) {
                    this._Raw[15] = val;
                    this._OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Matrix3D.prototype, "Inverse", {
                get: function () {
                    var inverse = this._Inverse;
                    if(!inverse) {
                        var i = mat4.identity();
                        mat4.inverse(this._Raw, i);
                        if(!i) {
                            return;
                        }
                        inverse = new Matrix3D();
                        inverse._Raw = i;
                        this._Inverse = inverse;
                    }
                    return inverse;
                },
                enumerable: true,
                configurable: true
            });
            Matrix3D.prototype.Listen = function (func) {
                var listeners = this._Listeners;
                var listener = {
                    Callback: func,
                    Detach: function () {
                        var index = listeners.indexOf(listener);
                        if(index > -1) {
                            listeners.splice(index, 1);
                        }
                    }
                };
                listeners.push(listener);
                return listener;
            };
            Matrix3D.prototype._OnChanged = function () {
                this._Inverse = null;
                var listeners = this._Listeners;
                var len = listeners.length;
                for(var i = 0; i < len; i++) {
                    listeners[i].Callback(this);
                }
            };
            Matrix3D.prototype.toString = function () {
                return mat4.str(this._Raw);
            };
            return Matrix3D;
        })();
        Media.Matrix3D = Matrix3D;        
        Nullstone.RegisterType(Matrix3D, "Matrix3D");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Matrix3D.js.map
