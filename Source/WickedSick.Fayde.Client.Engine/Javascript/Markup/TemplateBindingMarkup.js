/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Markup.js"/>
/// CODE

//#region TemplateBindingMarkup

function TemplateBindingMarkup(path) {
    Markup.call(this);
    this.Path = path;
}
TemplateBindingMarkup.InheritFrom(Markup);

TemplateBindingMarkup.prototype.Transmute = function (target, propd, templateBindingSource) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="templateBindingSource" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
    return new TemplateBindingExpression(sourcePropd, propd);
};

//#endregion
