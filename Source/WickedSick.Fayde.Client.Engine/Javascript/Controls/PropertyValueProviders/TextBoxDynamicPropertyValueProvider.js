/// <reference path="TextBoxBaseDynamicPropertyValueProvider.js"/>
/// CODE
/// <reference path="../TextBox.js"/>

(function (namespace) {
    var _TextBoxDynamicPropertyValueProvider = Nullstone.Create("_TextBoxDynamicPropertyValueProvider", namespace._TextBoxBaseDynamicPropertyValueProvider, 2);

    _TextBoxDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
        this.Init$_TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence,
            namespace.TextBox.SelectionForegroundProperty, namespace.TextBox.SelectionBackgroundProperty, namespace.TextBox.BaselineOffsetProperty);
    };

    namespace._TextBoxDynamicPropertyValueProvider = Nullstone.FinishCreate(_TextBoxDynamicPropertyValueProvider);
})(Nullstone.Namespace("Fayde.Controls"));