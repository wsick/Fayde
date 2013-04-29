/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="XamlObject.ts" />
/// <reference path="NameScope.ts" />
/// <reference path="../Runtime/BError.ts" />
/// <reference path="../Runtime/Enumerable.ts" />

module Fayde {
    declare var Warn;

    export enum VisualTreeDirection {
        Logical = 0,
        LogicalReverse = 1,
        ZFoward = 2,
        ZReverse = 3,
    }

    export class XamlNode {
        XObject: XamlObject;
        ParentNode: XamlNode = null;
        Name: string = "";
        NameScope: NameScope = null;
        private _OwnerNameScope: NameScope = null;

        constructor(xobj: XamlObject) {
            this.XObject = xobj;
        }

        FindName(name: string): XamlNode {
            var scope = this.FindNameScope();
            if (scope)
                return scope.FindName(name);
            if (this.ParentNode)
                this.ParentNode.FindName(name);
            return undefined;
        }
        SetName(name: string) {
            this.Name = name;
            var ns = this.FindNameScope();
            if (ns)
                ns.RegisterName(name, this);
        }
        FindNameScope(): NameScope {
            if (this._OwnerNameScope)
                return this._OwnerNameScope;

            var curNode = this;
            var ns;
            while (curNode) {
                ns = curNode.NameScope;
                if (ns) {
                    this._OwnerNameScope = ns;
                    return ns;
                }
                curNode = curNode.ParentNode;
            }
            return undefined;
        }

        IsAttached: bool = false;
        SetIsAttached(value: bool) {
            if (this.IsAttached === value)
                return;
            this.IsAttached = value;
            this.OnIsAttachedChanged(value);
        }
        OnIsAttachedChanged(newIsAttached: bool) { }

        AttachTo(parentNode: XamlNode, error: BError): bool {
            var curNode = parentNode;
            var data = {
                ParentNode: parentNode,
                ChildNode: this,
                Name: ""
            };
            while (curNode) {
                if (curNode === this) {
                    error.Message = "Cycle found.";
                    error.Data = data;
                    error.Number = BError.Attach;
                    return false;
                }
                curNode = curNode.ParentNode;
            }

            if (this.ParentNode) {
                if (this.ParentNode === parentNode)
                    return true;
                error.Message = "Element is already a child of another element.";
                error.Data = data;
                error.Number = BError.Attach;
                return false;
            }

            var parentScope = parentNode.FindNameScope();
            var thisScope = this.NameScope;
            if (thisScope) {
                if (!thisScope.IsRoot) {
                    parentScope.Absorb(thisScope);
                    this.NameScope = null;
                    this._OwnerNameScope = parentScope;
                }
            } else if (parentScope) {
                var name = this.Name;
                if (name) {
                    var existing = parentScope.FindName(name);
                    if (existing && existing !== this) {
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
            
            this.SetIsAttached(parentNode.IsAttached);

            return true;
        }
        Detach() {
            var name = this.Name;
            if (name && !this.NameScope) {
                var ns = this.FindNameScope();
                if (ns) ns.UnregisterName(this.Name);
            }
            this.SetIsAttached(false);
            this._OwnerNameScope = null;
            var old = this.ParentNode;
            this.ParentNode = null;
            this.OnParentChanged(old, null);
        }
        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) { }

        GetInheritedEnumerator(): IEnumerator { return undefined; }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator { return undefined; }
    }
    Nullstone.RegisterType(XamlNode, "XamlNode");
}