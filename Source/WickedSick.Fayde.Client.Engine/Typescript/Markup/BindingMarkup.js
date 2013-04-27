var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Markup.ts" />
/// CODE
/// <reference path="../Data/BindingExpression.ts" />
var Fayde;
(function (Fayde) {
    var BindingMarkup = (function (_super) {
        __extends(BindingMarkup, _super);
        function BindingMarkup(data) {
                _super.call(this);
            if(!data) {
                data = {
                };
            }
            this._Data = data;
        }
        BindingMarkup.prototype.Transmute = function (target, propd, propName, templateBindingSource) {
            return new Fayde.Data.BindingExpression(this._BuildBinding(), target, propd);
        };
        BindingMarkup.prototype._BuildBinding = function () {
            var b = new Fayde.Data.Binding(this._Data.Path);
            if(this._Data.FallbackValue !== undefined) {
                b.FallbackValue = this._Data.FallbackValue;
            }
            if(this._Data.Mode !== undefined) {
                b.Mode = this._Data.Mode;
            }
            if(this._Data.StringFormat !== undefined) {
                b.StringFormat = this._Data.StringFormat;
            }
            //TODO: Finish
            return b;
        };
        return BindingMarkup;
    })(Fayde.Markup);
    Fayde.BindingMarkup = BindingMarkup;    
    Nullstone.RegisterType(BindingMarkup, "BindingMarkup");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BindingMarkup.js.map
