/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextBoxBase.js"/>
/// <reference path="../Text/Enums.js"/>
/// CODE
/// <reference path="../Core/PropertyValueProviders/Enums.js"/>
/// <reference path="PropertyValueProviders/PasswordBoxDynamicPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>

(function (namespace) {
    var _TextBoxEmitChanged = Fayde.Text._TextBoxEmitChanged;

    var PasswordBox = Nullstone.Create("PasswordBox", namespace.TextBoxBase);

    PasswordBox.Instance.Init = function () {
        this.Init$TextBoxBase();
        this.AddProvider(new namespace._PasswordBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue));
        this._EventsMask = _TextBoxEmitChanged.TEXT;
    };

    //#region Properties

    PasswordBox.SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", function () { return Fayde.Media.Brush; }, PasswordBox);
    PasswordBox.SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", function () { return Fayde.Media.Brush; }, PasswordBox);
    PasswordBox.BaselineOffsetProperty = DependencyProperty.RegisterCore("BaselineOffset", function () { return Number; }, PasswordBox);

    Nullstone.AutoProperties(PasswordBox, [
        PasswordBox.SelectionBackgroundProperty,
        PasswordBox.SelectionForegroundProperty,
        "SelectionStart",
        "SelectionLength"
    ]);

    //#endregion

    namespace.PasswordBox = Nullstone.FinishCreate(PasswordBox);
})(Nullstone.Namespace("Fayde.Controls"));