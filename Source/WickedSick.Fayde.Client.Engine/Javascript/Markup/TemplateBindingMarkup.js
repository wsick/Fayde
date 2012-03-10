/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

//#region TemplateBindingMarkup

function TemplateBindingMarkup(path) {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this.Path = path;
}
Nullstone.Extend(TemplateBindingMarkup, "TemplateBindingMarkup", Markup);

TemplateBindingMarkup.prototype.Transmute = function (target, propd, templateBindingSource) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="templateBindingSource" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
    return new TemplateBindingExpression(sourcePropd, propd);
};

//#endregion
