/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="DependencyObject.js"/>
/// CODE

(function (namespace) {
    var FrameworkTemplate = Nullstone.Create("FrameworkTemplate", DependencyObject);

    FrameworkTemplate.Instance.GetVisualTree = function (bindingSource) {
        /// <param name="bindingSource" type="DependencyObject"></param>
        /// <returns type="DependencyObject" />
        var error = new BError();
        var vt = this._GetVisualTreeWithError(bindingSource, error);
        if (error.IsErrored())
            throw error.CreateException();
        return vt;
    };
    FrameworkTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
        /// <param name="templateBindingSource" type="FrameworkElement"></param>
        NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
    };

    namespace.FrameworkTemplate = Nullstone.FinishCreate(FrameworkTemplate);
})(window);