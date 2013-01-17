/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="BindingBase.js"/>
/// <reference path="PropertyPath.js"/>
/// CODE
/// <reference path="RelativeSource.js"/>

(function (namespace) {
    var Binding = Nullstone.Create("Binding", BindingBase, 1);

    Binding.Instance.Init = function (path) {
        if (!path)
            path = "";

        this.Mode = BindingMode.OneWay;
        this.Path = new _PropertyPath(path);
        this.ValidatesOnNotifyDataErrors = true;
        this.UpdateSourceTrigger = UpdateSourceTrigger.Default;
    };

    //#region Properties

    Nullstone.Property(Binding, "BindsDirectlyToSource", {
        get: function () { return this._BindsDirectlyToSource; },
        set: function (value) {
            this.CheckSealed();
            this._BindsDirectlyToSource = value;
        }
    });
    Nullstone.Property(Binding, "Converter", {
        get: function () { return this._Converter; },
        set: function (value) {
            this.CheckSealed();
            this._Converter = value;
        }
    });
    Nullstone.Property(Binding, "ConverterCulture", {
        get: function () { return this._ConverterCulture; },
        set: function (value) {
            this.CheckSealed();
            this._ConverterCulture = value;
        }
    });
    Nullstone.Property(Binding, "ConverterParameter", {
        get: function () { return this._ConverterParameter; },
        set: function (value) {
            this.CheckSealed();
            this._ConverterParameter = value;
        }
    });
    Nullstone.Property(Binding, "ElementName", {
        get: function () { return this._ElementName; },
        set: function (value) {
            this.CheckSealed();
            if (this.Source || this.RelativeSource)
                throw new InvalidOperationException("ElementName cannot be set if either RelativeSource or Source is set");
            this._ElementName = value;
        }
    });
    Nullstone.Property(Binding, "Mode", {
        get: function () { return this._Mode; },
        set: function (value) {
            this.CheckSealed();
            this._Mode = value;
        }
    });
    Nullstone.Property(Binding, "NotifyOnValidationError", {
        get: function () { return this._NotifyOnValidationError; },
        set: function (value) {
            this.CheckSealed();
            this._NotifyOnValidationError = value;
        }
    });
    Nullstone.Property(Binding, "RelativeSource", {
        get: function () { return this._RelativeSource; },
        set: function (value) {
            this.CheckSealed();
            if (this.Source || this.ElementName)
                throw new InvalidOperationException("RelativeSource cannot be set if either ElementName or Source is set");
            this._RelativeSource = value;
        }
    });
    Nullstone.Property(Binding, "Path", {
        get: function () { return this._Path; },
        set: function (value) {
            this.CheckSealed();
            if (value.HasDependencyProperty)
                throw new ArgumentException("PropertyPaths which are instantiated with a DependencyProperty are not supported");
            //TODO: TypeConverter(PropertyPathConverter)
            this._Path = value;
        }
    });
    Nullstone.Property(Binding, "Source", {
        get: function () { return this._Source; },
        set: function (value) {
            this.CheckSealed();
            if (this.ElementName || this.RelativeSource)
                throw new InvalidOperationException("Source cannot be set if either ElementName or RelativeSource is set");
            this._Source = value;
        }
    });
    Nullstone.Property(Binding, "UpdateSourceTrigger", {
        get: function () { return this._UpdateSourceTrigger; },
        set: function (value) {
            this.CheckSealed();
            this._UpdateSourceTrigger = value;
        }
    });
    Nullstone.Property(Binding, "ValidatesOnExceptions", {
        get: function () { return this._ValidatesOnExceptions; },
        set: function (value) {
            this.CheckSealed();
            this._ValidatesOnExceptions = value;
        }
    });
    Nullstone.Property(Binding, "ValidatesOnDataErrors", {
        get: function () { return this._ValidatesOnDataErrors; },
        set: function (value) {
            this.CheckSealed();
            this._ValidatesOnDataErrors = value;
        }
    });
    Nullstone.Property(Binding, "ValidatesOnNotifyDataErrors", {
        get: function () { return this._ValidatesOnNotifyDataErrors; },
        set: function (value) {
            this.CheckSealed();
            this._ValidatesOnNotifyDataErrors = value;
        }
    });

    //#endregion

    namespace.Binding = Nullstone.FinishCreate(Binding);
})(window);