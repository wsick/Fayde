/// CODE
/// <reference path="Surface.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
var App = (function () {
    function App() {
        this.MainSurface = new Surface(this);
        Object.defineProperty(this, "Resources", {
            value: new Fayde.ResourceDictionary(),
            writable: false
        });
    }
    App.Version = "0.9.4.0";
    Object.defineProperty(App.prototype, "RootVisual", {
        get: function () {
            return this.MainSurface._TopLevel;
        },
        enumerable: true,
        configurable: true
    });
    return App;
})();
//@ sourceMappingURL=App.js.map
