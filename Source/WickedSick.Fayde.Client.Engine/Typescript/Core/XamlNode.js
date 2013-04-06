/// CODE
/// <reference path="XamlObject.ts" />
/// <reference path="NameScope.ts" />
/// <reference path="InternalCollection.ts" />
var Fayde;
(function (Fayde) {
    var XamlNode = (function () {
        function XamlNode(xobj) {
            this.IsAttached = false;
            this.XObject = xobj;
        }
        XamlNode.prototype.FindNameScope = function () {
            var curNode = this;
            var ns;
            while(curNode) {
                ns = curNode.NameScope;
                if(ns) {
                    return ns;
                }
                curNode = curNode.ParentNode;
            }
            return undefined;
        };
        XamlNode.prototype.SetIsAttached = function (value) {
            if(this.IsAttached !== value) {
                return;
            }
            this.IsAttached = value;
        };
        XamlNode.prototype.AttachTo = function (parentNode) {
            this.SetIsAttached(parentNode.IsAttached);
            var curNode = parentNode;
            while(curNode) {
                if(curNode === this) {
                    Warn("AddParentNode - Cycle found.");
                    return;
                }
                curNode = curNode.ParentNode;
            }
            if(this.ParentNode) {
                throw new InvalidOperationException("Element is already a child of another element.");
            }
            var parentScope = parentNode.FindNameScope();
            var thisScope = this.NameScope;
            if(thisScope) {
                if(!thisScope.IsRoot) {
                    parentScope.Absorb(thisScope);
                    this.NameScope = null;
                }
            } else if(parentScope) {
                var name = this.Name;
                if(name) {
                    var existing = parentScope.FindName(name);
                    if(existing && existing !== this) {
                        throw new ArgumentException("Name is already registered in parent namescope.");
                    }
                    parentScope.RegisterName(name, this);
                }
            }
            this.ParentNode = parentNode;
        };
        XamlNode.prototype.Detach = function () {
            var name = this.Name;
            if(name) {
                var ns = this.FindNameScope();
                if(ns) {
                    ns.UnregisterName(this.Name);
                }
            }
            this.SetIsAttached(false);
            this.ParentNode = null;
        };
        XamlNode.prototype.GetInheritedWalker = function () {
            return undefined;
        };
        return XamlNode;
    })();
    Fayde.XamlNode = XamlNode;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=XamlNode.js.map
