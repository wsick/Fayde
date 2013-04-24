var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    (function (Data) {
        var BindingBase = (function () {
            function BindingBase() {
                this._IsSealed = false;
                this._StringFormat = undefined;
                this._FallbackValue = undefined;
                this._TargetNullValue = undefined;
            }
            Object.defineProperty(BindingBase.prototype, "StringFormat", {
                get: function () {
                    return this._StringFormat;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._StringFormat = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingBase.prototype, "FallbackValue", {
                get: function () {
                    return this._FallbackValue;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._FallbackValue = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingBase.prototype, "TargetNullValue", {
                get: function () {
                    return this._TargetNullValue;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._TargetNullValue = value;
                },
                enumerable: true,
                configurable: true
            });
            BindingBase.prototype.CheckSealed = function () {
                if(this._IsSealed) {
                    throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
                }
            };
            BindingBase.prototype.Seal = function () {
                this._IsSealed = true;
            };
            return BindingBase;
        })();
        Data.BindingBase = BindingBase;        
        Nullstone.RegisterType(BindingBase, "BindingBase");
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BindingBase.js.map
