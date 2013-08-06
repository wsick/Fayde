/// CODE
/// <reference path="ResourceDictionary.ts" />
/// <reference path="../Markup/JsonParser.ts" />

module Fayde {
    export class Theme {
        Name: string;
        Json: any;
        private _ResourceDictionary: ResourceDictionary;
        constructor(name: string, json: any) {
            this.Name = name;
            this.Json = json;
        }

        get ResourceDictionary(): ResourceDictionary {
            if (!this._ResourceDictionary) {
                this._ResourceDictionary = new ResourceDictionary();
                JsonParser.ParseResourceDictionary(this._ResourceDictionary, this.Json);
            }
            return this._ResourceDictionary;
        }
    }
}