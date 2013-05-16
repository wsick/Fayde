var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Inline.ts" />
    /// CODE
    (function (Documents) {
        var Run = (function (_super) {
            __extends(Run, _super);
            function Run() {
                _super.apply(this, arguments);

            }
            Run.FlowDirectionProperty = Fayde.InheritableOwner.FlowDirectionProperty;
            Run.TextProperty = DependencyProperty.Register("Text", function () {
                return String;
            }, Run);
            Run.prototype._SerializeText = function () {
                return this.Text;
            };
            return Run;
        })(Documents.Inline);
        Documents.Run = Run;        
        Nullstone.RegisterType(Run, "Run");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Run.js.map
