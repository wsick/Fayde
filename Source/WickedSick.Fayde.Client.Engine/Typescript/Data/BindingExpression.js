var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="BindingExpressionBase.ts" />
    /// CODE
    (function (Data) {
        var BindingExpression = (function (_super) {
            __extends(BindingExpression, _super);
            function BindingExpression(binding, target, propd) {
                        _super.call(this, binding, target, propd);
            }
            return BindingExpression;
        })(Data.BindingExpressionBase);
        Data.BindingExpression = BindingExpression;        
        Nullstone.RegisterType(BindingExpression, "BindingExpression");
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BindingExpression.js.map
