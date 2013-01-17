/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

(function (namespace) {
    var TemplateBindingMarkup = Nullstone.Create("TemplateBindingMarkup", Markup, 1);

    TemplateBindingMarkup.Instance.Init = function (path) {
        this.Path = path;
    };

    TemplateBindingMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
        /// <param name="target" type="DependencyObject"></param>
        /// <param name="propd" type="DependencyProperty"></param>
        /// <param name="propName" type="String"></param>
        /// <param name="templateBindingSource" type="DependencyObject"></param>
        var sourcePropd = DependencyProperty.GetDependencyProperty(templateBindingSource.constructor, this.Path);
        return new TemplateBindingExpression(sourcePropd, propd);
    };

    namespace.TemplateBindingMarkup = Nullstone.FinishCreate(TemplateBindingMarkup);
})(window);