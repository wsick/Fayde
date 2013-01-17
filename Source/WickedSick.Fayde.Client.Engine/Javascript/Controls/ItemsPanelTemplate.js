/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkTemplate.js"/>
/// CODE

(function (namespace) {
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
            var root = JsonParser.Parse(this._TempJson, templateBindingSource, namescope);
            NameScope.SetNameScope(root, namescope);
            return root;
        }
        return this._GetVisualTreeWithError$FrameworkTemplate(templateBindingSource, error);
    };

    namespace.ItemsPanelTemplate = Nullstone.FinishCreate(ItemsPanelTemplate);
})(window);