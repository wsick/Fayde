/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="XamlNode.ts" />
/// <reference path="DependencyObject.ts" />

module Fayde {
    export class XamlObject {
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

        Clone(): XamlObject {
            var xobj: XamlObject = new (<any>this).constructor();
            xobj.CloneCore(this);
            return xobj;
        }
        CloneCore(source: XamlObject) { }
    }
    Nullstone.RegisterType(XamlObject, "XamlObject");
}