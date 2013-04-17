var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Markup.ts" />
/// CODE
/// <reference path="../Core/TemplateBindingExpression.ts" />
var Fayde;
(function (Fayde) {
    var TemplateBindingMarkup = (function (_super) {
        __extends(TemplateBindingMarkup, _super);
        function TemplateBindingMarkup(path) {
                _super.call(this);
            this.Path = path;
        }
        TemplateBindingMarkup.prototype.Transmute = function (target, propd, propName, templateBindingSource) {
            var sourcePropd = DependencyProperty.GetDependencyProperty((templateBindingSource).constructor, this.Path);
            return new Fayde.TemplateBindingExpression(sourcePropd, propd, propName);
        };
        return TemplateBindingMarkup;
    })(Fayde.Markup);
    Fayde.TemplateBindingMarkup = TemplateBindingMarkup;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TemplateBindingMarkup.js.map
