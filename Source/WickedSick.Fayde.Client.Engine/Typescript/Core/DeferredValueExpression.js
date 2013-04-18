var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Expression.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var DeferredValueExpression = (function (_super) {
        __extends(DeferredValueExpression, _super);
        function DeferredValueExpression() {
            _super.apply(this, arguments);

        }
        DeferredValueExpression.prototype.GetValue = function (propd) {
            return undefined;
        };
        return DeferredValueExpression;
    })(Fayde.Expression);
    Fayde.DeferredValueExpression = DeferredValueExpression;    
    Nullstone.RegisterType(DeferredValueExpression, "DeferredValueExpression");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=DeferredValueExpression.js.map
