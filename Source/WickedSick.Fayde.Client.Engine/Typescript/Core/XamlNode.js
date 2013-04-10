/// CODE
/// <reference path="XamlObject.ts" />
/// <reference path="NameScope.ts" />
/// <reference path="../Runtime/BError.ts" />
/// <reference path="../Runtime/Enumerable.ts" />
var Fayde;
(function (Fayde) {
    (function (VisualTreeDirection) {
        VisualTreeDirection._map = [];
        VisualTreeDirection.Logical = 0;
        VisualTreeDirection.LogicalReverse = 1;
        VisualTreeDirection.ZFoward = 2;
        VisualTreeDirection.ZReverse = 3;
    })(Fayde.VisualTreeDirection || (Fayde.VisualTreeDirection = {}));
    var VisualTreeDirection = Fayde.VisualTreeDirection;
    var XamlNode = (function () {
        function XamlNode(xobj) {
            this.ParentNode = null;
            this.Name = "";
            this.NameScope = null;
            this._OwnerNameScope = null;
            this.IsAttached = false;
            this.XObject = xobj;
        }
        XamlNode.prototype.SetName = function (name) {
            this.Name = name;
            var ns = this.FindNameScope();
            if(ns) {
                ns.RegisterName(name, this);
            }
        };
        XamlNode.prototype.FindNameScope = function () {
            if(this._OwnerNameScope) {
                return this._OwnerNameScope;
            }
            var curNode = this;
            var ns;
            while(curNode) {
                ns = curNode.NameScope;
                if(ns) {
                    this._OwnerNameScope = ns;
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
            this.OnIsAttachedChanged(value);
        };
        XamlNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
        };
        XamlNode.prototype.AttachTo = function (parentNode, error) {
            this.SetIsAttached(parentNode.IsAttached);
            var curNode = parentNode;
            while(curNode) {
                if(curNode === this) {
                    error.Message = "AddParentNode - Cycle found.";
                    return false;
                }
                curNode = curNode.ParentNode;
            }
            if(this.ParentNode) {
                error.Message = "Element is already a child of another element.";
                error.Number = BError.InvalidOperation;
                return false;
            }
            var parentScope = parentNode.FindNameScope();
            var thisScope = this.NameScope;
            if(thisScope) {
                if(!thisScope.IsRoot) {
                    parentScope.Absorb(thisScope);
                    this.NameScope = null;
                    this._OwnerNameScope = parentScope;
                }
            } else if(parentScope) {
                var name = this.Name;
                if(name) {
                    var existing = parentScope.FindName(name);
                    if(existing && existing !== this) {
                        error.Message = "Name is already registered in parent namescope.";
                        error.Number = BError.Argument;
                        return false;
                    }
                    parentScope.RegisterName(name, this);
                }
                this._OwnerNameScope = parentScope;
            }
            this.ParentNode = parentNode;
            return true;
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
            this._OwnerNameScope = null;
            this.ParentNode = null;
        };
        XamlNode.prototype.GetInheritedEnumerator = function () {
            return undefined;
        };
        XamlNode.prototype.GetVisualTreeEnumerator = function (direction) {
            return undefined;
        };
        return XamlNode;
    })();
    Fayde.XamlNode = XamlNode;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=XamlNode.js.map
