/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="PasswordBox.js"/>

(function (namespace) {
    var _PasswordBoxDynamicPropertyValueProvider = Nullstone.Create("_PasswordBoxDynamicPropertyValueProvider", namespace._TextBoxBaseDynamicPropertyValueProvider, 2);

    _PasswordBoxDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
        this.Init$_TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence,
            namespace.PasswordBox.SelectionForegroundProperty, namespace.PasswordBox.SelectionBackgroundProperty, namespace.PasswordBox.BaselineOffsetProperty);
    };

    namespace._PasswordBoxDynamicPropertyValueProvider = Nullstone.FinishCreate(_PasswordBoxDynamicPropertyValueProvider);
})(Nullstone.Namespace("Fayde.Controls"));