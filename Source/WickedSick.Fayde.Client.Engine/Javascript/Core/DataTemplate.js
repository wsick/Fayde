/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="FrameworkTemplate.js"/>
/// CODE
/// <reference path="NameScope.js"/>
/// <reference path="../Markup/JsonParser.js"/>

(function (namespace) {
    var DataTemplate = Nullstone.Create("DataTemplate", namespace.FrameworkTemplate, 1);

    DataTemplate.Instance.Init = function (json) {
        this.Init$FrameworkTemplate();
        this._TempJson = json;
    };

    DataTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
        /// <param name="templateBindingSource" type="FrameworkElement"></param>
        /// <returns type="DependencyObject" />
        if (this._TempJson) {
            var namescope = new Fayde.NameScope();
            var root = Fayde.JsonParser.Parse(this._TempJson, templateBindingSource, namescope);
            Fayde.NameScope.SetNameScope(root, namescope);
            return root;
        }
        return this._GetVisualTreeWithError$FrameworkTemplate(templateBindingSource, error);
    };

    namespace.DataTemplate = Nullstone.FinishCreate(DataTemplate);
})(Nullstone.Namespace("Fayde"));