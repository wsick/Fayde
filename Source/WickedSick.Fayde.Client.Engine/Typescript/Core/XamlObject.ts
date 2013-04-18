/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="XamlNode.ts" />
/// <reference path="DependencyObject.ts" />

module Fayde {
    export class XamlObject {
        XamlNode: Fayde.XamlNode;
        TemplateOwner: DependencyObject = null;
        constructor() {
            this.XamlNode = this.CreateNode();
        }
        CreateNode(): XamlNode {
            return new XamlNode(this);
        }
        get Name() { return this.XamlNode.Name; }
    }
    Nullstone.RegisterType(XamlObject, "XamlObject");
}