/// CODE
/// <reference path="../Engine/Exceptions.ts" />
var Fayde;
(function (Fayde) {
    var NameScope = (function () {
        function NameScope(isRoot) {
            this.IsRoot = false;
            this.XNodes = {
            };
            if(isRoot) {
                this.IsRoot = isRoot;
            }
        }
        NameScope.prototype.FindName = function (name) {
            return this.XNodes[name];
        };
        NameScope.prototype.RegisterName = function (name, xnode) {
            var existing = this.XNodes[name];
            if(existing && existing !== xnode) {
                throw new InvalidOperationException("Name is already registered.");
            }
            //TODO: Add Handler - Destroyed Event (xnode)
            this.XNodes[name] = xnode;
        };
        NameScope.prototype.UnregisterName = function (name) {
            //var xnode = this.XNodes[name];
            //TODO: Remove Handler - Destroyed Event (xnode)
            this.XNodes[name] = undefined;
        };
        NameScope.prototype.Absorb = function (otherNs) {
            var on = otherNs.XNodes;
            for(var name in on) {
                this.RegisterName(name, on[name]);
            }
        };
        return NameScope;
    })();
    Fayde.NameScope = NameScope;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=NameScope.js.map
