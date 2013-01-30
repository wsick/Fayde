/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE
/// <reference path="../Core/TemplateBindingExpression.js"/>

(function (Fayde) {
    var TemplateBindingMarkup = Nullstone.Create("TemplateBindingMarkup", Fayde.Markup, 1);

    TemplateBindingMarkup.Instance.Init = function (path) {
        this.Path = path;
    };

    TemplateBindingMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
        /// <param name="target" type="DependencyObject"></param>
        /// <param name="propd" type="DependencyProperty"></param>
        /// <param name="propName" type="String"></param>
        /// <param name="templateBindingSource" type="DependencyObject"></param>
        var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
        return new Fayde.TemplateBindingExpression(sourcePropd, propd);
    };

    Fayde.TemplateBindingMarkup = Nullstone.FinishCreate(TemplateBindingMarkup);
})(Nullstone.Namespace("Fayde"));