/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="BindingBase.js"/>
/// <reference path="PropertyPath.js"/>
/// CODE
/// <reference path="RelativeSource.js"/>

//#region Binding
var Binding = Nullstone.Create("Binding", BindingBase, 1);

Binding.Instance.Init = function (path) {
    this.Init$BindingBase();

    if (!path)
        path = "";

    this.SetMode(BindingMode.OneWay);

    this.SetPath(new _PropertyPath(path));
    this.SetValidatesOnNotifyDataErrors(true);
    this.SetUpdateSourceTrigger(UpdateSourceTrigger.Default);
};

//#region PROPERTIES

Binding.Instance.GetBindsDirectlyToSource = function () { return this._BindsDirectlyToSource; };
Binding.Instance.SetBindsDirectlyToSource = function (/* Boolean */value) { this.CheckSealed(); this._BindsDirectlyToSource = value; };

Binding.Instance.GetConverter = function () { return this._Converter; };
Binding.Instance.SetConverter = function (/* IValueConverter */value) { this.CheckSealed(); this._Converter = value; };

Binding.Instance.GetConverterCulture = function () { return this._ConverterCulture; };
Binding.Instance.SetConverterCulture = function (/* Culture */value) { this.CheckSealed(); this._ConverterCulture = value; };

Binding.Instance.GetConverterParameter = function () { return this._ConverterParameter; };
Binding.Instance.SetConverterParameter = function (/* Object */value) { this.CheckSealed(); this._ConverterParameter = value; };

Binding.Instance.GetElementName = function () { return this._ElementName; };
Binding.Instance.SetElementName = function (/* String */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("ElementName cannot be set if either RelativeSource or Source is set");
    this._ElementName = value;
};

Binding.Instance.GetMode = function () { return this._Mode; };
Binding.Instance.SetMode = function (/* Number */value) { this.CheckSealed(); this._Mode = value; };

Binding.Instance.GetNotifyOnValidationError = function () { return this._NotifyOnValidationError; };
Binding.Instance.SetNotifyOnValidationError = function (/* Boolean */value) { this.CheckSealed(); this._NotifyOnValidationError = value; };

Binding.Instance.GetRelativeSource = function () {
    ///<returns type="RelativeSource"></returns>
    return this._RelativeSource;
};
Binding.Instance.SetRelativeSource = function (/* RelativeSource */value) {
    this.CheckSealed();
    if (this.GetSource() != null || this.GetElementName() != null)
        throw new InvalidOperationException("RelativeSource cannot be set if either ElementName or Source is set");
    this._RelativeSource = value;
};

Binding.Instance.GetPath = function () {
    /// <returns type="_PropertyPath" />
    return this._Path;
};
//TODO: TypeConverter(PropertyPathConverter)
Binding.Instance.SetPath = function (value) {
    /// <param name="value" type="_PropertyPath"></param>
    this.CheckSealed();
    if (value.HasDependencyProperty())
        throw new ArgumentException("PropertyPaths which are instantiated with a DependencyProperty are not supported");
    this._Path = value;
};

Binding.Instance.GetSource = function () { return this._Source; };
Binding.Instance.SetSource = function (/* RefObject */value) {
    this.CheckSealed();
    if (this.GetElementName() != null || this.GetRelativeSource() != null)
        throw new InvalidOperationException("Source cannot be set if either ElementName or RelativeSource is set");
    this._Source = value;
};

Binding.Instance.GetUpdateSourceTrigger = function () { return this._UpdateSourceTrigger; };
Binding.Instance.SetUpdateSourceTrigger = function (/* Number */value) { this.CheckSealed(); this._UpdateSourceTrigger = value; };

Binding.Instance.GetValidatesOnExceptions = function () { return this._ValidatesOnExceptions; };
Binding.Instance.SetValidatesOnExceptions = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnExceptions = value; };

Binding.Instance.GetValidatesOnDataErrors = function () { return this._ValidatesOnDataErrors; };
Binding.Instance.SetValidatesOnDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnDataErrors = value; };

Binding.Instance.GetValidatesOnNotifyDataErrors = function () { return this._ValidatesOnNotifyDataErrors; };
Binding.Instance.SetValidatesOnNotifyDataErrors = function (/* Boolean */value) { this.CheckSealed(); this._ValidatesOnNotifyDataErrors = value; };

//#endregion

Nullstone.FinishCreate(Binding);
//#endregion