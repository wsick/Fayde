var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="TextElement.ts"/>
    /// CODE
    (function (Documents) {
        var Section = (function (_super) {
            __extends(Section, _super);
            function Section() {
                _super.apply(this, arguments);

            }
            Section.prototype.CreateNode = function () {
                var tenode = new Documents.TextElementNode(this);
                tenode.InheritedWalkProperty = Section.BlocksProperty;
                return tenode;
            };
            return Section;
        })(Documents.TextElement);
        Documents.Section = Section;        
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Section.js.map
