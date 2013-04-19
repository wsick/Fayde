var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// CODE
    (function (Media) {
        var Matrix = (function () {
            function Matrix() {
                this._Inverse = null;
            }
            Object.defineProperty(Matrix.prototype, "M11", {
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
            Object.defineProperty(Matrix.prototype, "M12", {
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
            Object.defineProperty(Matrix.prototype, "M21", {
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
            Object.defineProperty(Matrix.prototype, "M22", {
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
            Object.defineProperty(Matrix.prototype, "OffsetX", {
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
            Object.defineProperty(Matrix.prototype, "OffsetY", {
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
            Object.defineProperty(Matrix.prototype, "Inverse", {
                get: function () {
                    var inverse = this._Inverse;
                    if(!inverse) {
                        var i = mat3.identity();
                        mat3.inverse(this._Raw, i);
                        if(!i) {
                            return;
                        }
                        inverse = new Matrix();
                        inverse._Raw = i;
                        this._Inverse = inverse;
                    }
                    return inverse;
                },
                enumerable: true,
                configurable: true
            });
            Matrix.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            Matrix.prototype.Unlisten = function (listener) {
                this._Listener = null;
            };
            Matrix.prototype._OnChanged = function () {
                this._Inverse = null;
                var listener = this._Listener;
                if(listener) {
                    listener.MatrixChanged(this);
                }
            };
            Matrix.prototype.toString = function () {
                return mat3.str(this._Raw);
            };
            return Matrix;
        })();
        Media.Matrix = Matrix;        
        Nullstone.RegisterType(Matrix, "Matrix");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Matrix.js.map
