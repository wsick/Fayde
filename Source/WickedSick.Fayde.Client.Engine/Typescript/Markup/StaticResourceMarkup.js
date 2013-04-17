var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Markup.ts" />
/// CODE
/// <reference path="../Core/StaticResourceExpression.ts" />
var Fayde;
(function (Fayde) {
    var StaticResourceMarkup = (function (_super) {
        __extends(StaticResourceMarkup, _super);
        function StaticResourceMarkup(key) {
                _super.call(this);
            this.Key = key;
        }
        StaticResourceMarkup.prototype.Transmute = function (target, propd, propName, templateBindingSource) {
            return new Fayde.StaticResourceExpression(this.Key, target, propd, propName, templateBindingSource);
        };
        return StaticResourceMarkup;
    })(Fayde.Markup);
    Fayde.StaticResourceMarkup = StaticResourceMarkup;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=StaticResourceMarkup.js.map
