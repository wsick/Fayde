var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="Setter.ts" />
var Fayde;
(function (Fayde) {
    var Style = (function (_super) {
        __extends(Style, _super);
        function Style() {
            _super.apply(this, arguments);

            this._IsSealed = false;
        }
        Style.prototype.Seal = function () {
            if(this._IsSealed) {
                return;
            }
            this.Setters._Seal(this.TargetType);
            this._IsSealed = true;
            var base = this.BasedOn;
            if(base) {
                base.Seal();
            }
        };
        return Style;
    })(Fayde.XamlObject);
    Fayde.Style = Style;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Style.js.map
