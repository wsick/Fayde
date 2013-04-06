/// <reference path="../Runtime/IEnumerator.ts" />
/// CODE
/// <reference path="Style.ts" />
var Fayde;
(function (Fayde) {
    var VisualTreeWalker = (function () {
        function VisualTreeWalker() { }
        VisualTreeWalker.Logical = function Logical(xnode) {
            return undefined;
        };
        return VisualTreeWalker;
    })();
    Fayde.VisualTreeWalker = VisualTreeWalker;    
    var DeepStyleWalker = (function () {
        function DeepStyleWalker() { }
        DeepStyleWalker.prototype.Step = function () {
        };
        DeepStyleWalker.Single = function Single(style) {
            var walker = new DeepStyleWalker();
            return walker;
        };
        DeepStyleWalker.Multiple = function Multiple(styles) {
            var walker = new DeepStyleWalker();
            return walker;
        };
        return DeepStyleWalker;
    })();
    Fayde.DeepStyleWalker = DeepStyleWalker;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Walkers.js.map
