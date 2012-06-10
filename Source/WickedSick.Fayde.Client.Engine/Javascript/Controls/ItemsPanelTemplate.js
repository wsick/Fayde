/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkTemplate.js"/>
/// CODE

//#region ItemsPanelTemplate
var ItemsPanelTemplate = Nullstone.Create("ItemsPanelTemplate", FrameworkTemplate, 1);

ItemsPanelTemplate.Instance.Init = function (json) {
    this.Init$FrameworkTemplate();
    this._TempJson = json;
};

ItemsPanelTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
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

Nullstone.FinishCreate(ItemsPanelTemplate);
//#endregion