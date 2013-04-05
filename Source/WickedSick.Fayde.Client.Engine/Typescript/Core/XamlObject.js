/// CODE
/// <reference path="XamlNode.ts" />
var Fayde;
(function (Fayde) {
    var XamlObject = (function () {
        function XamlObject() {
            this.XamlNode = new Fayde.XamlNode(this);
        }
        Object.defineProperty(XamlObject.prototype, "Name", {
            get: function () {
                return this.XamlNode.Name;
            },
            enumerable: true,
            configurable: true
        });
        return XamlObject;
    })();
    Fayde.XamlObject = XamlObject;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=XamlObject.js.map
