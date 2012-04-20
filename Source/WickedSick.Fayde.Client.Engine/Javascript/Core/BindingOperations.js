/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region BindingOperations

var BindingOperations = {
    SetBinding: function (target, dp, binding) {
        /// <param name="target" type="DependencyObject"></param>
        /// <param name="dp" type="DependencyProperty"></param>
        /// <param name="binding" type="BindingBase"></param>
        /// <returns type="BindingExpressionBase" />
        if (target == null)
            throw new ArgumentNullException("target");
        if (dp == null)
            throw new ArgumentNullException("dp");
        if (binding == null)
            throw new ArgumentNullException("binding");

        var e = new BindingExpression(binding, target, dp);
        target.$SetValue(dp, e);
        return e;
    }
};

//#endregion