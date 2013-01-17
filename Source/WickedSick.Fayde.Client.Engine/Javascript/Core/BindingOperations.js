/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    namespace.BindingOperations = {
        SetBinding: function (target, dp, binding) {
            /// <param name="target" type="DependencyObject"></param>
            /// <param name="dp" type="DependencyProperty"></param>
            /// <param name="binding" type="BindingBase"></param>
            /// <returns type="BindingExpressionBase" />
            if (!target)
                throw new ArgumentNullException("target");
            if (!dp)
                throw new ArgumentNullException("dp");
            if (!binding)
                throw new ArgumentNullException("binding");

            var e = new BindingExpression(binding, target, dp);
            target.$SetValue(dp, e);
            return e;
        }
    };
})(window);