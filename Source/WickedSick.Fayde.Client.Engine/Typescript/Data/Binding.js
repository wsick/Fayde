var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="BindingBase.ts" />
    /// CODE
    /// <reference path="RelativeSource.ts" />
    (function (Data) {
        var Binding = (function (_super) {
            __extends(Binding, _super);
            function Binding(path) {
                        _super.call(this);
                this._BindsDirectlyToSource = false;
                this._Mode = Data.BindingMode.OneWay;
                this._NotifyOnValidationError = false;
                this._UpdateSourceTrigger = Data.UpdateSourceTrigger.Default;
                this._ValidatesOnExceptions = false;
                this._ValidatesOnDataErrors = false;
                this._ValidatesOnNotifyDataErrors = true;
                if(!path) {
                    path = "";
                }
                this._Path = new Data.PropertyPath(path);
            }
            Object.defineProperty(Binding.prototype, "BindsDirectlyToSource", {
                get: function () {
                    return this._BindsDirectlyToSource;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._BindsDirectlyToSource = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "Converter", {
                get: function () {
                    return this._Converter;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._Converter = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "ConverterParameter", {
                get: function () {
                    return this._ConverterParameter;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._ConverterParameter = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "ConverterCulture", {
                get: function () {
                    return this._ConverterCulture;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._ConverterCulture = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "ElementName", {
                get: function () {
                    return this._ElementName;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._ElementName = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "Mode", {
                get: function () {
                    return this._Mode;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._Mode = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "NotifyOnValidationError", {
                get: function () {
                    return this._NotifyOnValidationError;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._NotifyOnValidationError = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "RelativeSource", {
                get: function () {
                    return this._RelativeSource;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._RelativeSource = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "Path", {
                get: function () {
                    return this._Path;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._Path = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "Source", {
                get: function () {
                    return this._Source;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._Source = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "UpdateSourceTrigger", {
                get: function () {
                    return this._UpdateSourceTrigger;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._UpdateSourceTrigger = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "ValidatesOnExceptions", {
                get: function () {
                    return this._ValidatesOnExceptions;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._ValidatesOnExceptions = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "ValidatesOnDataErrors", {
                get: function () {
                    return this._ValidatesOnDataErrors;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._ValidatesOnDataErrors = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Binding.prototype, "ValidatesOnNotifyDataErrors", {
                get: function () {
                    return this._ValidatesOnNotifyDataErrors;
                },
                set: function (value) {
                    this.CheckSealed();
                    this._ValidatesOnNotifyDataErrors = value;
                },
                enumerable: true,
                configurable: true
            });
            return Binding;
        })(Data.BindingBase);
        Data.Binding = Binding;        
        Nullstone.RegisterType(Binding, "Binding");
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Binding.js.map
