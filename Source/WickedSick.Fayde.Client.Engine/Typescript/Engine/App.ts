/// CODE
/// <reference path="Surface.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />

class App {
    static Version: string = "0.9.4.0";
    static Instance: App;
    MainSurface: Surface;
    Resources: Fayde.ResourceDictionary;
    constructor() {
        this.MainSurface = new Surface(this);
        Object.defineProperty(this, "Resources", {
            value: new Fayde.ResourceDictionary(),
            writable: false
        });
    }
    get RootVisual(): Fayde.UIElement {
        return this.MainSurface._TopLevel;
    }
}