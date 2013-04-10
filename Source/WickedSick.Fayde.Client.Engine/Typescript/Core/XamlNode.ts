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
            if (this.IsAttached !== value)
                return;
            this.IsAttached = value;
            this.OnIsAttachedChanged(value);
        }
        OnIsAttachedChanged(newIsAttached: bool) { }

        AttachTo(parentNode: XamlNode, error: BError): bool {
            this.SetIsAttached(parentNode.IsAttached);

            var curNode = parentNode;
            while (curNode) {
                if (curNode === this) {
                    error.Message = "AddParentNode - Cycle found.";
                    return false;
                }
                curNode = curNode.ParentNode;
            }

            if (this.ParentNode) {
                error.Message = "Element is already a child of another element.";
                error.Number = BError.InvalidOperation;
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
                        error.Number = BError.Argument;
                        return false;
                    }
                    parentScope.RegisterName(name, this);
                }
                this._OwnerNameScope = parentScope;
            }

            this.ParentNode = parentNode;
            return true;
        }
        Detach() {
            var name = this.Name;
            if (name) {
                var ns = this.FindNameScope();
                if (ns) ns.UnregisterName(this.Name);
            }
            this.SetIsAttached(false);
            this._OwnerNameScope = null;
            this.ParentNode = null;
        }

        GetInheritedEnumerator(): IEnumerator { return undefined; }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator { return undefined; }
    }
}