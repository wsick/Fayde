/// <reference path="../Runtime/Nullstone.ts" />
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
            this._AncestorListeners = [];
            this._MentorNode = null;
            this._LogicalChildren = [];
            this.IsAttached = false;
            this.XObject = xobj;
        }
        Object.defineProperty(XamlNode.prototype, "MentorNode", {
            get: function () {
                return this._MentorNode;
            },
            enumerable: true,
            configurable: true
        });
        XamlNode.prototype.SetMentorNode = function (mentorNode) {
            if(this instanceof Fayde.FENode) {
                return;
            }
            if(this._MentorNode === mentorNode) {
                return;
            }
            var oldNode = mentorNode;
            this._MentorNode = mentorNode;
            this.OnMentorChanged(oldNode, mentorNode);
        };
        XamlNode.prototype.OnMentorChanged = function (oldMentorNode, newMentorNode) {
            var ls = this._AncestorListeners;
            var len = ls.length;
            for(var i = 0; i < len; i++) {
                ls[i].MentorChanged(oldMentorNode, newMentorNode);
            }
            var children = this._LogicalChildren;
            len = children.length;
            for(var i = 0; i < len; i++) {
                children[i].SetMentorNode(newMentorNode);
            }
        };
        XamlNode.prototype.MonitorAncestors = function (listener) {
            this._AncestorListeners.push(listener);
        };
        XamlNode.prototype.UnmonitorAncestors = function (listener) {
            var index = this._AncestorListeners.indexOf(listener);
            if(index > -1) {
                this._AncestorListeners.splice(index, 1);
            }
        };
        XamlNode.prototype.FindName = function (name) {
            var scope = this.FindNameScope();
            if(scope) {
                return scope.FindName(name);
            }
            if(this.ParentNode) {
                this.ParentNode.FindName(name);
            }
            return undefined;
        };
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
            if(this.IsAttached === value) {
                return;
            }
            this.IsAttached = value;
            this.OnIsAttachedChanged(value);
        };
        XamlNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
        };
        XamlNode.prototype.AttachTo = function (parentNode, error) {
            var curNode = parentNode;
            var data = {
                ParentNode: parentNode,
                ChildNode: this,
                Name: ""
            };
            while(curNode) {
                if(curNode === this) {
                    error.Message = "Cycle found.";
                    error.Data = data;
                    error.Number = BError.Attach;
                    return false;
                }
                curNode = curNode.ParentNode;
            }
            if(this.ParentNode) {
                if(this.ParentNode === parentNode) {
                    return true;
                }
                error.Message = "Element is already a child of another element.";
                error.Data = data;
                error.Number = BError.Attach;
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
                        data.Name = name;
                        error.Data = data;
                        error.Number = BError.Attach;
                        return false;
                    }
                    parentScope.RegisterName(name, this);
                }
                this._OwnerNameScope = parentScope;
            }
            var old = this.ParentNode;
            this.ParentNode = parentNode;
            this.OnParentChanged(old, parentNode);
            parentNode._LogicalChildren.push(this);
            this.SetIsAttached(parentNode.IsAttached);
            return true;
        };
        XamlNode.prototype.Detach = function () {
            var name = this.Name;
            if(name && !this.NameScope) {
                var ns = this.FindNameScope();
                if(ns) {
                    ns.UnregisterName(this.Name);
                }
            }
            this.SetIsAttached(false);
            this._OwnerNameScope = null;
            var old = this.ParentNode;
            var index = old._LogicalChildren.indexOf(this);
            if(index > -1) {
                old._LogicalChildren.splice(index, 1);
            }
            this.ParentNode = null;
            if(old != null) {
                this.OnParentChanged(old, null);
            }
        };
        XamlNode.prototype.OnParentChanged = function (oldParentNode, newParentNode) {
            if(this instanceof Fayde.FENode) {
                this.SetMentorNode(this);
            } else if(newParentNode instanceof Fayde.FENode) {
                this.SetMentorNode(newParentNode);
            } else if(newParentNode._MentorNode) {
                this.SetMentorNode(newParentNode._MentorNode);
            }
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
    Nullstone.RegisterType(XamlNode, "XamlNode");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=XamlNode.js.map
