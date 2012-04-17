/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

//#region BindingMarkup
var BindingMarkup = Nullstone.Create("BindingMarkup", Markup, 1);

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
    return new BindingExpression(this._BuildBinding(), target, propd);
};
BindingMarkup.Instance._BuildBinding = function () {
    /// <returns type="Binding" />
    var b = new Binding(this._Data.Path);
    if (this._Data.FallbackValue !== undefined)
        b.SetFallbackValue(this._Data.FallbackValue);
    if (this._Data.Mode !== undefined)
        b.SetMode(this._Data.Mode);
    return b;
};

Nullstone.FinishCreate(BindingMarkup);
//#endregion