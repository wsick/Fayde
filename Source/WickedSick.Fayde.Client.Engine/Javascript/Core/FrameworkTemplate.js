/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

//#region FrameworkTemplate

function FrameworkTemplate() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(FrameworkTemplate, "FrameworkTemplate", DependencyObject);

FrameworkTemplate.prototype.GetVisualTree = function (bindingSource) {
    /// <param name="bindingSource" type="DependencyObject"></param>
    /// <returns type="DependencyObject" />
    var error = new BError();
    return this._GetVisualTreeWithError(bindingSource, error);
};
FrameworkTemplate.prototype._GetVisualTreeWithError = function (/* FrameworkElement */templateBindingSource, error) {
    /// <param name="templateBindingSource" type="FrameworkElement"></param>
    NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
};
//#endregion
