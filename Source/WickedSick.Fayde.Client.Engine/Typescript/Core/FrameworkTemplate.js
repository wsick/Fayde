var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="XamlObject.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var FrameworkTemplate = (function (_super) {
        __extends(FrameworkTemplate, _super);
        function FrameworkTemplate() {
            _super.apply(this, arguments);

        }
        FrameworkTemplate.prototype.GetVisualTree = function (bindingSource) {
            var error = new BError();
            var vt = this._GetVisualTreeWithError(bindingSource, error);
            if(error.Message) {
                error.ThrowException();
            }
            return vt;
        };
        FrameworkTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
            error.Message = "Abstract Method";
            return undefined;
        };
        return FrameworkTemplate;
    })(Fayde.XamlObject);
    Fayde.FrameworkTemplate = FrameworkTemplate;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkTemplate.js.map
