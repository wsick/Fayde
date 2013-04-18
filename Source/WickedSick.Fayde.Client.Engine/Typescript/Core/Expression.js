/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />
var Fayde;
(function (Fayde) {
    var Expression = (function () {
        function Expression() { }
        Expression.prototype.GetValue = function (propd) {
        };
        Expression.prototype.OnAttached = function (dobj) {
            this.IsAttached = true;
        };
        Expression.prototype.OnDetached = function (dobj) {
            this.IsAttached = false;
        };
        return Expression;
    })();
    Fayde.Expression = Expression;    
    Nullstone.RegisterType(Expression, "Expression");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Expression.js.map
