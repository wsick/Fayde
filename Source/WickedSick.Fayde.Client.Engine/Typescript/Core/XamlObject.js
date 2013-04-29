/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="XamlNode.ts" />
/// <reference path="DependencyObject.ts" />
var Fayde;
(function (Fayde) {
    var XamlObject = (function () {
        function XamlObject() {
            this.TemplateOwner = null;
            this._ID = XamlObject._LastID++;
            this.XamlNode = this.CreateNode();
        }
        XamlObject._LastID = 0;
        XamlObject.prototype.CreateNode = function () {
            return new Fayde.XamlNode(this);
        };
        Object.defineProperty(XamlObject.prototype, "Name", {
            get: function () {
                return this.XamlNode.Name;
            },
            enumerable: true,
            configurable: true
        });
        XamlObject.prototype.Clone = function () {
            var xobj = new (this).constructor();
            xobj.CloneCore(this);
            return xobj;
        };
        XamlObject.prototype.CloneCore = function (source) {
        };
        return XamlObject;
    })();
    Fayde.XamlObject = XamlObject;    
    Nullstone.RegisterType(XamlObject, "XamlObject");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=XamlObject.js.map
