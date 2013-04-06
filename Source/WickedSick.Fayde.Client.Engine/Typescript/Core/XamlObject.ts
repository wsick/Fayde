/// CODE
/// <reference path="XamlNode.ts" />

module Fayde {
    export class XamlObject {
        XamlNode: Fayde.XamlNode;
        constructor() {
            this.XamlNode = this.CreateNode();
        }
        CreateNode(): XamlNode {
            return new XamlNode(this);
        }
        get Name() { return this.XamlNode.Name; }
    }
}