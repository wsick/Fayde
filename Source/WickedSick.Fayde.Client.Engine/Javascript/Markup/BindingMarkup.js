/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

(function (Fayde) {
    var BindingMarkup = Nullstone.Create("BindingMarkup", Fayde.Markup, 1);

    BindingMarkup.Instance.Init = function (data) {
        if (!data)
            data = {};
        this._Data = data;
    };

    BindingMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
        /// <param name="target" type="DependencyObject"></param>
        /// <param name="propd" type="DependencyProperty"></param>
        /// <param name="propName" type="String"></param>
        /// <param name="templateBindingSource" type="DependencyObject"></param>
        return new Fayde.Data.BindingExpression(this._BuildBinding(), target, propd);
    };
    BindingMarkup.Instance._BuildBinding = function () {
        /// <returns type="Binding" />
        var b = new Fayde.Data.Binding(this._Data.Path);
        if (this._Data.FallbackValue !== undefined)
            b.FallbackValue = this._Data.FallbackValue;
        if (this._Data.Mode !== undefined)
            b.Mode = this._Data.Mode;
        if (this._Data.StringFormat !== undefined)
            b.StringFormat = this._Data.StringFormat;
        return b;
    };

    Fayde.BindingMarkup = Nullstone.FinishCreate(BindingMarkup);
})(Nullstone.Namespace("Fayde"));