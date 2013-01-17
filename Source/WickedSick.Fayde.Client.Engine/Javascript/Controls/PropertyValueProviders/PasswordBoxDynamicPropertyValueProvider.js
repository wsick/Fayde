/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="PasswordBox.js"/>

(function (namespace) {
    var _PasswordBoxDynamicPropertyValueProvider = Nullstone.Create("_PasswordBoxDynamicPropertyValueProvider", _TextBoxBaseDynamicPropertyValueProvider, 2);

    _PasswordBoxDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
        this.Init$_TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence,
            PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
    };

    namespace._PasswordBoxDynamicPropertyValueProvider = Nullstone.FinishCreate(_PasswordBoxDynamicPropertyValueProvider);
})(window);