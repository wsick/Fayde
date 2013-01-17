/// <reference path="../Core/DependencyObject.js"/>
/// CODE

(function (namespace) {
    var CacheMode = Nullstone.Create("CacheMode", DependencyObject);

    CacheMode.Instance._GetTransform = function () { };

    namespace.CacheMode = Nullstone.FinishCreate(CacheMode);
})(window);