/// <reference path="Markup.js"/>
/// CODE

//#region BindingMarkup

function BindingMarkup(data) {
    Markup.call(this);
    if (!data)
        data = {};
    this._Data = data;
}
BindingMarkup.InheritFrom(Markup);

BindingMarkup.prototype.Transmute = function (target, propd, templateBindingSource) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="templateBindingSource" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    return new BindingExpression(this._BuildBinding(), target, propd);
};
BindingMarkup.prototype._BuildBinding = function () {
    /// <returns type="Binding" />
    var b = new Binding(this._Data.Path);
    if (this._Data.FallbackValue !== undefined)
        b.SetFallbackValue(this._Data.FallbackValue);
    if (this._Data.Mode !== undefined)
        b.SetMode(this._Data.Mode);
    return b;
};

//#endregion