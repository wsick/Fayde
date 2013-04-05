/// <reference path="XamlNode.ts" />
/// CODE

module Fayde {
    export class XamlObject {
        XamlNode: Fayde.XamlNode;
        constructor() {
            this.XamlNode = new XamlNode(this);
        }
        get Name() { return this.XamlNode.Name; }
    }
}