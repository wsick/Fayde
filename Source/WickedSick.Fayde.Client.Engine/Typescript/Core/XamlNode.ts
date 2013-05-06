/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="XamlObject.ts" />
/// <reference path="NameScope.ts" />
/// <reference path="../Runtime/BError.ts" />
/// <reference path="../Runtime/Enumerable.ts" />

module Fayde {
    export enum VisualTreeDirection {
        Logical = 0,
        LogicalReverse = 1,
        ZFoward = 2,
        ZReverse = 3,
    }

    export interface IDataContextMonitor {
        Callback: (newDataContext: any) => void;
        Detach();
    }
    export interface IIsAttachedMonitor {
        Callback: (newIsAttached: bool) => void;
        Detach();
    }
    export interface IShareableHidden {
        IsShareable: bool;
    }

    export class XamlNode implements IShareableHidden {
        XObject: XamlObject;
        ParentNode: XamlNode = null;
        Name: string = "";
        NameScope: NameScope = null;
        private IsShareable: bool = false;
        private _OwnerNameScope: NameScope = null;
        private _LogicalChildren: XamlNode[] = [];

        private _DCMonitors: IDataContextMonitor[] = null;
        private _IAMonitors: IIsAttachedMonitor[] = null;

        constructor(xobj: XamlObject) {
            this.XObject = xobj;
        }

        private _DataContext: any = undefined;
        get DataContext(): any { return this._DataContext; }
        set DataContext(value: any) {
            var old = this._DataContext;
            if (old === value)
                return;
            this._DataContext = value;
            this.OnDataContextChanged(old, value);
        }
        OnDataContextChanged(oldDataContext: any, newDataContext: any) {
            var childNodes = this._LogicalChildren;
            var len = childNodes.length;
            var childNode: XamlNode = null;
            for (var i = 0; i < len; i++) {
                childNode = childNodes[i];
                childNode.DataContext = newDataContext;
            }

            var monitors = this._DCMonitors;
            if (!monitors) return;
            len = monitors.length;
            for (var i = 0; i < len; i++) {
                monitors[i].Callback(newDataContext);
            }
        }
        MonitorDataContext(func: (newDataContext: any) => void): IDataContextMonitor {
            var monitors = this._DCMonitors;
            if (!monitors) this._DCMonitors = monitors = [];
            var monitor: IDataContextMonitor = {
                Callback: func,
                Detach: null
            };
            monitor.Detach = function () {
                var index = monitors.indexOf(monitor);
                if (index > -1) monitors.splice(index, 1);
            };
            this._DCMonitors.push(monitor);
            return monitor;
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
        OnIsAttachedChanged(newIsAttached: bool) {
            var childNodes = this._LogicalChildren;
            var len = childNodes.length;
            var childNode: XamlNode = null;
            for (var i = 0; i < len; i++) {
                childNode = childNodes[i];
                childNode.SetIsAttached(newIsAttached);
            }

            var monitors = this._IAMonitors;
            if (!monitors) return;
            len = monitors.length;
            for (var i = 0; i < len; i++) {
                monitors[i].Callback(newIsAttached);
            }
        }
        MonitorIsAttached(func: (newIsAttached: bool) => void ): IIsAttachedMonitor {
            var monitors = this._IAMonitors;
            if (!monitors) this._IAMonitors = monitors = [];
            var monitor: IIsAttachedMonitor = {
                Callback: func,
                Detach: null
            };
            monitor.Detach = function () {
                var index = monitors.indexOf(monitor);
                if (index > -1) monitors.splice(index, 1);
            };
            this._IAMonitors.push(monitor);
            return monitor;
        }

        AttachTo(parentNode: XamlNode, error: BError): bool {
            if (this.ParentNode && this.IsShareable)
                return true;
            var data = {
                ParentNode: parentNode,
                ChildNode: this,
                Name: ""
            };
            var curNode = parentNode;
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
            
            parentNode._LogicalChildren.push(this);
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
            if (old) {
                var index = old._LogicalChildren.indexOf(this);
                if (index > -1) old._LogicalChildren.splice(index, 1);
                this.OnParentChanged(old, null);
            }
        }
        OnParentChanged(oldParentNode: XamlNode, newParentNode: XamlNode) { }

        GetInheritedEnumerator(): IEnumerator { return undefined; }
        GetVisualTreeEnumerator(direction?: VisualTreeDirection): IEnumerator { return undefined; }
    }
    Nullstone.RegisterType(XamlNode, "XamlNode");
}