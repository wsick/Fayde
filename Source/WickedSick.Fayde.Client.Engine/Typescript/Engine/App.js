/// CODE
/// <reference path="Surface.ts" />
/// <reference path="../Core/ResourceDictionary.ts" />
var App = (function () {
    function App() {
        this._IsRunning = false;
        this._Storyboards = [];
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
    App.prototype._Tick = function (lastTime, nowTime) {
        this.ProcessStoryboards(lastTime, nowTime);
        this.Update();
        this.Render();
    };
    App.prototype.ProcessStoryboards = function (lastTime, nowTime) {
        var sbs = this._Storyboards;
        var len = sbs.length;
        for(var i = 0; i < len; i++) {
            sbs[i].Update(nowTime);
        }
    };
    App.prototype.Update = function () {
        if(this._IsRunning) {
            return;
        }
        //var startLayoutTime;
        //var isLayoutPassTimed;
        //if (isLayoutPassTimed = (this._DebugFunc[3] != null))
        //startLayoutTime = new Date().getTime();
        this._IsRunning = true;
        //try {
        var updated = this.MainSurface.ProcessDirtyElements();
        //} catch (err) {
        //Fatal("An error occurred processing dirty elements: " + err.toString());
        //}
        this._IsRunning = false;
        //if (updated && isLayoutPassTimed)
        //this._NotifyDebugLayoutPass(new Date().getTime() - startLayoutTime);
            };
    App.prototype.Render = function () {
        this.MainSurface.Render();
    };
    return App;
})();
//@ sourceMappingURL=App.js.map
