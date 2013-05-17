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
            this.IsShareable = false;
            this._OwnerNameScope = null;
            this._LogicalChildren = [];
            this._DCMonitors = null;
            this._IAMonitors = null;
            this._DataContext = undefined;
            this._IsEnabled = true;
            this.IsAttached = false;
            this.XObject = xobj;
        }
        Object.defineProperty(XamlNode.prototype, "DataContext", {
            get: function () {
                return this._DataContext;
            },
            set: function (value) {
                var old = this._DataContext;
                if(old === value) {
                    return;
                }
                this._DataContext = value;
                this.OnDataContextChanged(old, value);
            },
            enumerable: true,
            configurable: true
        });
        XamlNode.prototype.OnDataContextChanged = function (oldDataContext, newDataContext) {
            var childNodes = this._LogicalChildren;
            var len = childNodes.length;
            var childNode = null;
            for(var i = 0; i < len; i++) {
                childNode = childNodes[i];
                childNode.DataContext = newDataContext;
            }
            var monitors = this._DCMonitors;
            if(!monitors) {
                return;
            }
            len = monitors.length;
            for(var i = 0; i < len; i++) {
                monitors[i].Callback(newDataContext);
            }
        };
        XamlNode.prototype.MonitorDataContext = function (func) {
            var monitors = this._DCMonitors;
            if(!monitors) {
                this._DCMonitors = monitors = [];
            }
            var monitor = {
                Callback: func,
                Detach: null
            };
            monitor.Detach = function () {
                var index = monitors.indexOf(monitor);
                if(index > -1) {
                    monitors.splice(index, 1);
                }
            };
            this._DCMonitors.push(monitor);
            return monitor;
        };
        Object.defineProperty(XamlNode.prototype, "IsEnabled", {
            get: function () {
                return this._IsEnabled;
            },
            set: function (value) {
                value = value !== false;
                var old = this._IsEnabled;
                if(old === value) {
                    return;
                }
                this._IsEnabled = value;
                this.OnIsEnabledChanged(old, value);
            },
            enumerable: true,
            configurable: true
        });
        XamlNode.prototype.OnIsEnabledChanged = function (oldValue, newValue) {
            var childNodes = this._LogicalChildren;
            var len = childNodes.length;
            var childNode = null;
            for(var i = 0; i < len; i++) {
                childNode = childNodes[i];
                childNode.IsEnabled = newValue;
            }
        };
        XamlNode.prototype.FindName = function (name) {
            var scope = this.FindNameScope();
            if(scope) {
                return scope.FindName(name);
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
            var childNodes = this._LogicalChildren;
            var len = childNodes.length;
            var childNode = null;
            for(var i = 0; i < len; i++) {
                childNode = childNodes[i];
                childNode.SetIsAttached(newIsAttached);
            }
            var monitors = this._IAMonitors;
            if(!monitors) {
                return;
            }
            len = monitors.length;
            for(var i = 0; i < len; i++) {
                monitors[i].Callback(newIsAttached);
            }
        };
        XamlNode.prototype.MonitorIsAttached = function (func) {
            var monitors = this._IAMonitors;
            if(!monitors) {
                this._IAMonitors = monitors = [];
            }
            var monitor = {
                Callback: func,
                Detach: null
            };
            monitor.Detach = function () {
                var index = monitors.indexOf(monitor);
                if(index > -1) {
                    monitors.splice(index, 1);
                }
            };
            this._IAMonitors.push(monitor);
            return monitor;
        };
        XamlNode.prototype.AttachTo = function (parentNode, error) {
            if(this.ParentNode && this.IsShareable) {
                return true;
            }
            var data = {
                ParentNode: parentNode,
                ChildNode: this,
                Name: ""
            };
            var curNode = parentNode;
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
            this._OwnerNameScope = null;
            var old = this.ParentNode;
            this.ParentNode = null;
            if(old) {
                var index = old._LogicalChildren.indexOf(this);
                if(index > -1) {
                    old._LogicalChildren.splice(index, 1);
                }
                this.OnParentChanged(old, null);
            }
            this.SetIsAttached(false);
        };
        XamlNode.prototype.OnParentChanged = function (oldParentNode, newParentNode) {
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
