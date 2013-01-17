/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    var Markup = Nullstone.Create("Markup");

    Markup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
        /// <param name="target" type="DependencyObject"></param>
        /// <param name="propd" type="DependencyProperty"></param>
        /// <param name="propName" type="String"></param>
        /// <param name="templateBindingSource" type="DependencyObject"></param>
        AbstractMethod("Markup.Transmute");
    };

    namespace.Markup = Nullstone.FinishCreate(Markup);
})(window);