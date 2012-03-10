/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

//#region TemplateBindingMarkup
var TemplateBindingMarkup = Nullstone.Create("TemplateBindingMarkup", Markup, 1);

TemplateBindingMarkup.Instance.Init = function (path) {
    this.Path = path;
};

TemplateBindingMarkup.Instance.Transmute = function (target, propd, templateBindingSource) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="templateBindingSource" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
    return new TemplateBindingExpression(sourcePropd, propd);
};

Nullstone.FinishCreate(TemplateBindingMarkup);
//#endregion