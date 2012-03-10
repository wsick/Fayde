/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

//#region FrameworkTemplate
var FrameworkTemplate = Nullstone.Create("FrameworkTemplate", DependencyObject);

FrameworkTemplate.Instance.GetVisualTree = function (bindingSource) {
    /// <param name="bindingSource" type="DependencyObject"></param>
    /// <returns type="DependencyObject" />
    var error = new BError();
    return this._GetVisualTreeWithError(bindingSource, error);
};
FrameworkTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
    /// <param name="templateBindingSource" type="FrameworkElement"></param>
    NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
};

Nullstone.FinishCreate(FrameworkTemplate);
//#endregion