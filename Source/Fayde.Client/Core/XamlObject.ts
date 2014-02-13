/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde {
    export class XamlObject implements Providers.IIsPropertyInheritable {
        private static _LastID: number = 0;
        private _ID: number;
        XamlNode: Fayde.XamlNode;
        TemplateOwner: DependencyObject = null;

        constructor() {
            this._ID = XamlObject._LastID++;
            this.XamlNode = this.CreateNode();
        }
        CreateNode(): XamlNode {
            return new XamlNode(this);
        }
        get Name() { return this.XamlNode.Name; }
        get Parent(): XamlObject {
            var pn = this.XamlNode.ParentNode;
            if (!pn) return;
            return pn.XObject;
        }

        FindName(name: string): XamlObject {
            var n = <XamlNode>this.XamlNode;
            while (n) {
                var m = n.FindName(name);
                if (m)
                    return m.XObject;
                n = n.ParentNode;
            }
            return undefined;
        }

        Clone(): XamlObject {
            var xobj: XamlObject = new (<any>this).constructor();
            xobj.CloneCore(this);
            return xobj;
        }
        CloneCore(source: XamlObject) { }

        IsInheritable(propd: DependencyProperty): boolean { return false; }
    }
    Fayde.RegisterType(XamlObject, "Fayde", Fayde.XMLNS);
}