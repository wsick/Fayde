/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="FrameworkTemplate.js"/>
/// CODE
/// <reference path="NameScope.js"/>
/// <reference path="../Markup/JsonParser.js"/>

//#region DataTemplate
var DataTemplate = Nullstone.Create("DataTemplate", FrameworkTemplate, 1);

DataTemplate.Instance.Init = function (json) {
    this._TempJson = json;
};

DataTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
    /// <param name="templateBindingSource" type="FrameworkElement"></param>
    /// <returns type="DependencyObject" />
    if (this._TempJson) {
        var namescope = new NameScope();
        var parser = new JsonParser();
        parser._TemplateBindingSource = templateBindingSource;
        var root = parser.CreateObject(this._TempJson, namescope);
        NameScope.SetNameScope(root, namescope);
        return root;
    }
    return this._GetVisualTreeWithError$FrameworkTemplate(templateBindingSource, error);
};

Nullstone.FinishCreate(DataTemplate);
//#endregion